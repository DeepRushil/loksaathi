/**
 * @file src/app/api/chat/route.ts
 * @description Serverless API route for LokSaathi AI Assistant.
 * 
 * Features:
 * - Exponential backoff for Google Gemini API.
 * - Input sanitization for security.
 * - Strict rate limiting.
 * - Standardized Google-style docstrings.
 */

import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { GoogleErrorReporting } from '@/lib/googleServices';

// ============================================================
// Constants & Configuration
// ============================================================

const MODEL_NAME = 'gemini-1.5-flash';
const MAX_MESSAGE_LENGTH = 2000;
const MAX_RETRIES = 3;
const BASE_DELAY_MS = 1000;

const SYSTEM_INSTRUCTION = `You are "LokSaathi" (लोकसाथी), a friendly, knowledgeable, and non-partisan AI assistant for Indian elections.

Your primary purpose is to help Indian citizens understand India's democratic process, including:
- How to register to vote and obtain an EPIC (Voter ID).
- How to check eligibility and link Aadhaar.
- How to find polling booths and understand EVM/VVPAT voting.
- Non-partisan candidate research (using official sources like ECI).

Guidelines:
1. Always remain neutral and non-partisan. Never tell someone who to vote for.
2. If asked about a specific candidate's merit, provide facts or direct them to the ECI affidavit portal.
3. Use simple language. Use Hindi terms where appropriate (e.g., "मतदान" for voting).
4. For technical electoral queries, refer to the Representation of the People Act and ECI guidelines.
5. If unsure, advise the user to contact the official Voter Helpline (1950) or visit nvsp.in.`;

// ============================================================
// Simple In-Memory Rate Limiter
// ============================================================

const rateLimitMap = new Map<string, { count: number; lastReset: number }>();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 20;

/**
 * Checks if a request is within rate limits.
 * @param {string} ip The client IP address.
 * @returns {boolean} True if within limits, false otherwise.
 */
function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const userData = rateLimitMap.get(ip) || { count: 0, lastReset: now };

  if (now - userData.lastReset > RATE_LIMIT_WINDOW) {
    userData.count = 0;
    userData.lastReset = now;
  }

  userData.count += 1;
  rateLimitMap.set(ip, userData);

  return userData.count <= MAX_REQUESTS_PER_WINDOW;
}

// ============================================================
// Utility Functions
// ============================================================

/**
 * Sanitizes user input to prevent common injection attacks.
 * @param {string} input The raw user message.
 * @returns {string} The sanitized message.
 */
function sanitizeInput(input: string): string {
  if (!input) return '';
  return input
    .trim()
    .slice(0, MAX_MESSAGE_LENGTH)
    .replace(/[<>]/g, ''); // Basic HTML tag stripping
}

/**
 * Validates the chat request body.
 * @param {any} body The request JSON.
 * @returns {{ valid: boolean; error?: string }} Validation result.
 */
function validateRequest(body: any): { valid: boolean; error?: string } {
  if (!body || typeof body !== 'object') {
    return { valid: false, error: 'Invalid request body' };
  }
  if (!body.message || typeof body.message !== 'string' || body.message.trim().length === 0) {
    return { valid: false, error: 'Message is required' };
  }
  if (body.history && !Array.isArray(body.history)) {
    return { valid: false, error: 'History must be an array' };
  }
  return { valid: true };
}

/**
 * Sleeps for a given duration.
 * @param {number} ms Milliseconds to sleep.
 * @returns {Promise<void>}
 */
const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// ============================================================
// Gemini API Wrapper with Exponential Backoff
// ============================================================

/**
 * Calls the Gemini API with retry logic and exponential backoff.
 * @param {string} apiKey The Google API Key.
 * @param {string} message The user's message.
 * @param {any[]} history The chat history.
 * @returns {Promise<string>} The AI response.
 */
async function callGeminiWithRetry(
  apiKey: string,
  message: string,
  history: any[] = []
): Promise<string> {
  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({
    model: MODEL_NAME,
    systemInstruction: SYSTEM_INSTRUCTION,
  });

  const chat = model.startChat({
    history: history.map((m) => ({
      role: m.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: m.content }],
    })),
  });

  let lastError: any;
  for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
    try {
      const result = await chat.sendMessage(message);
      const response = await result.response;
      return response.text();
    } catch (error: any) {
      lastError = error;
      const status = error?.status || 0;
      
      // If not a rate limit (429) or server error (500+), don't retry
      if (status !== 429 && status < 500) {
        throw error;
      }

      if (attempt < MAX_RETRIES) {
        const delay = BASE_DELAY_MS * Math.pow(2, attempt);
        console.warn(`[Gemini] Attempt ${attempt + 1} failed (Status: ${status}). Retrying in ${delay}ms...`);
        await sleep(delay);
      }
    }
  }

  throw lastError;
}

// ============================================================
// Route Handlers
// ============================================================

/**
 * GET Handler — Health Check
 */
export async function GET() {
  return NextResponse.json({ status: 'operational', timestamp: Date.now() }, { status: 200 });
}

/**
 * POST Handler — Chat Endpoint
 */
export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for') || 'unknown';

  // 1. Rate Limiting
  if (!checkRateLimit(ip)) {
    return NextResponse.json({ error: 'Too many requests. Please try again in a minute.' }, { status: 429 });
  }

  try {
    // 2. Parse & Validate
    let body;
    try {
      body = await req.json();
    } catch (e) {
      return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
    }

    const validation = validateRequest(body);
    if (!validation.valid) {
      return NextResponse.json({ error: validation.error }, { status: 400 });
    }

    // 3. Setup API Key
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.error('GEMINI_API_KEY is not configured');
      return NextResponse.json({ error: 'Gemini API is currently unavailable.' }, { status: 503 });
    }

    // 4. Sanitize Input
    const sanitizedMessage = sanitizeInput(body.message);

    // 5. Call AI Service with Resilience
    const responseText = await callGeminiWithRetry(apiKey, sanitizedMessage, body.history);

    return NextResponse.json({ response: responseText }, { status: 200 });
  } catch (error: any) {
    // 6. Report to Google Cloud Error Reporting
    GoogleErrorReporting.report(error, { ip });
    
    console.error('API Chat Error:', error);
    
    const status = error?.status === 429 ? 429 : 502;
    const message = error?.status === 429 
      ? 'AI service is currently busy. Please try again.' 
      : 'Error connecting to the AI assistant. Please try again later.';

    return NextResponse.json({ error: message }, { status });
  }
}
