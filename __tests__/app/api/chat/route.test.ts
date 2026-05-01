/**
 * @file __tests__/app/api/chat/route.test.ts
 */

import { POST, GET } from '@/app/api/chat/route';

// Mock next/server to provide environment-safe NextRequest/NextResponse
jest.mock('next/server', () => {
  return {
    NextRequest: class {
      public headers: Map<string, string>;
      private body: any;
      constructor(url: string, init: any = {}) {
        this.headers = new Map(Object.entries(init.headers || {}));
        this.body = init.body ? JSON.parse(init.body) : {};
      }
      async json() { return this.body; }
    },
    NextResponse: {
      json: (data: any, init: any = {}) => ({
        status: init.status || 200,
        json: async () => data,
      }),
    },
  };
});

jest.mock('@google/generative-ai', () => ({
  GoogleGenerativeAI: jest.fn().mockImplementation(() => ({
    getGenerativeModel: () => ({
      startChat: () => ({
        sendMessage: async () => ({
          response: { text: () => 'Mocked' },
        }),
      }),
    }),
  })),
}));

describe('Chat API Route', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    process.env.GEMINI_API_KEY = 'test';
  });

  it('GET works', async () => {
    const res = await GET();
    const data = await res.json();
    expect(res.status).toBe(200);
    expect(data.status).toBe('operational');
  });

  it('POST success', async () => {
    const { NextRequest } = require('next/server');
    const req = new NextRequest('http://l', {
      method: 'POST',
      body: JSON.stringify({ message: 'Hi' }),
    });
    const res = await POST(req);
    const data = await res.json();
    expect(res.status).toBe(200);
    expect(data.response).toBe('Mocked');
  });
});
