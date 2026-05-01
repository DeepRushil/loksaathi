/**
 * @file __tests__/components/features/ElectionTimeline.test.tsx
 * @description Unit tests for ElectionTimeline with standardized docstrings.
 */

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ElectionTimeline from '@/components/features/ElectionTimeline';
import { LanguageProvider } from '@/lib/LanguageContext';

describe('ElectionTimeline', () => {
  /**
   * Test: Renders all election phases correctly.
   */
  it('renders all phases of the election journey', () => {
    render(
      <LanguageProvider>
        <ElectionTimeline />
      </LanguageProvider>
    );

    // Use getAllByText for ambiguous strings
    expect(screen.getAllByText(/Electoral Journey/i).length).toBeGreaterThan(0);
    expect(screen.getByText(/Check Your Eligibility/i)).toBeInTheDocument();
    expect(screen.getByText(/Voter Registration/i)).toBeInTheDocument();
  });

  /**
   * Test: Toggles phase expansion.
   */
  it('expands a phase when clicked', () => {
    render(
      <LanguageProvider>
        <ElectionTimeline />
      </LanguageProvider>
    );

    const registrationHeader = screen.getByText(/Voter Registration/i);
    fireEvent.click(registrationHeader);

    expect(screen.getByText(/Enroll on the Electoral Roll/i)).toBeInTheDocument();
  });

  /**
   * Test: Google Wallet action.
   */
  it('triggers Google Wallet action', async () => {
    render(
      <LanguageProvider>
        <ElectionTimeline />
      </LanguageProvider>
    );

    const registrationHeader = screen.getByText(/Voter Registration/i);
    fireEvent.click(registrationHeader);

    const walletBtn = screen.getByLabelText(/Add Digital EPIC/i);
    fireEvent.click(walletBtn);
    
    // Check if alert was called (mocking window.alert if needed)
  });

  /**
   * Test: Google Calendar action.
   */
  it('triggers Google Calendar action', async () => {
    render(
      <LanguageProvider>
        <ElectionTimeline />
      </LanguageProvider>
    );

    const prepHeader = screen.getByText(/Prepare for Polling Day/i);
    fireEvent.click(prepHeader);

    const calendarBtn = screen.getByLabelText(/Add Election Reminder/i);
    fireEvent.click(calendarBtn);
  });
});
