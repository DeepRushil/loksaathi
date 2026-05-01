/**
 * @file __tests__/components/features/AssistantChat.test.tsx
 * @description Unit tests for AssistantChat with standardized docstrings.
 */

import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import AssistantChat from '@/components/features/AssistantChat';
import { LanguageProvider } from '@/lib/LanguageContext';
import userEvent from '@testing-library/user-event';

// Mock global fetch for API calls
global.fetch = jest.fn();

describe('AssistantChat', () => {
  beforeEach(() => {
    (global.fetch as jest.Mock).mockClear();
    // Mock scrollIntoView as it's not implemented in JSDOM
    window.HTMLElement.prototype.scrollIntoView = jest.fn();
  });

  /**
   * Test: Component renders and displays the initial welcome message.
   */
  it('renders correctly and shows welcome message', () => {
    render(
      <LanguageProvider>
        <AssistantChat />
      </LanguageProvider>
    );
    expect(screen.getAllByText(/LokSaathi/i).length).toBeGreaterThan(0);
    expect(screen.getByPlaceholderText(/Ask about Voter ID/i)).toBeInTheDocument();
  });

  /**
   * Test: Verifies full user-assistant interaction flow.
   */
  it('handles user message and AI response', async () => {
    const user = userEvent.setup();
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => ({ response: 'This is an AI response' }),
    });

    render(
      <LanguageProvider>
        <AssistantChat />
      </LanguageProvider>
    );

    const input = screen.getByPlaceholderText(/Ask about Voter ID/i);
    await user.type(input, 'Hello LokSaathi{enter}');

    expect(screen.getByText('Hello LokSaathi')).toBeInTheDocument();
    
    await waitFor(() => {
      expect(screen.getByText('This is an AI response')).toBeInTheDocument();
    });
  });

  /**
   * Test: Verifies error handling for API failures.
   */
  it('handles API error safely', async () => {
    const user = userEvent.setup();
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: false,
      status: 500,
      json: async () => ({ error: 'Something went wrong' }),
    });

    render(
      <LanguageProvider>
        <AssistantChat />
      </LanguageProvider>
    );

    const input = screen.getByPlaceholderText(/Ask about Voter ID/i);
    await user.type(input, 'Hello{enter}');

    await waitFor(() => {
      expect(screen.getByText(/Something went wrong/i)).toBeInTheDocument();
    });
  });

  /**
   * Test: Verifies chat history clearing.
   */
  it('clears chat history', async () => {
    const user = userEvent.setup();
    render(
      <LanguageProvider>
        <AssistantChat />
      </LanguageProvider>
    );

    const clearBtn = screen.getByRole('button', { name: /Clear/i });
    await user.click(clearBtn);
    
    await waitFor(() => {
      expect(screen.getByText(/Chat history cleared!/i)).toBeInTheDocument();
    });
  });
});
