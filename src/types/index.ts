/**
 * @file types/index.ts
 * @description Centralized TypeScript type definitions for the Election Assistant.
 * Keeping all types in one file ensures consistency and easy maintenance.
 */

// ============================================================
// Chat / AI Assistant Types
// ============================================================

/** Role of a message participant in the chat interface */
export type MessageRole = 'user' | 'assistant' | 'system';

/** A single message in the chat conversation */
export interface ChatMessage {
  id: string;
  role: MessageRole;
  content: string;
  timestamp: Date;
  isLoading?: boolean;
}

/** Request payload sent to the /api/chat endpoint */
export interface ChatRequest {
  message: string;
  history: Array<{ role: MessageRole; content: string }>;
  language?: string;
}

/** Response payload from the /api/chat endpoint */
export interface ChatResponse {
  response: string;
  error?: string;
}

// ============================================================
// Election Data Types
// ============================================================

/** A single phase in the election timeline */
export interface ElectionPhase {
  id: string;
  step: number;
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  color: string;
  details: string[];
  requiredDocuments?: string[];
  deadline?: string;
  tips?: string[];
}

/** A frequently asked question with its answer */
export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: ElectionCategory;
  relatedPhaseId?: string;
}

/** Category labels for election topics */
export type ElectionCategory =
  | 'registration'
  | 'voting'
  | 'candidates'
  | 'results'
  | 'eligibility'
  | 'general';

/** A quick-start prompt chip for the chat assistant */
export interface QuickPrompt {
  id: string;
  label: string;
  prompt: string;
  icon: string;
  category: ElectionCategory;
}

// ============================================================
// Firebase / Auth Types
// ============================================================

/** Authenticated user profile (subset of Firebase User) */
export interface UserProfile {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
}

/** User's saved election checklist state */
export interface UserChecklistState {
  userId: string;
  completedSteps: string[];
  savedLocation?: string;
  lastUpdated: Date;
}

// ============================================================
// UI Component Props Types
// ============================================================

/** Props for the generic Button component */
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: string;
  rightIcon?: string;
}

/** Props for the Badge component */
export interface BadgeProps {
  label: string;
  variant?: 'default' | 'success' | 'warning' | 'info' | 'danger';
  size?: 'sm' | 'md';
}

/** Props for the Card component */
export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'glass' | 'elevated';
  padding?: 'sm' | 'md' | 'lg' | 'none';
}
