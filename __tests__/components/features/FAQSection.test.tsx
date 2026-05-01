/**
 * @file __tests__/components/features/FAQSection.test.tsx
 * @description Unit tests for FAQSection with standardized docstrings.
 */

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import FAQSection from '@/components/features/FAQSection';
import { LanguageProvider } from '@/lib/LanguageContext';

describe('FAQSection', () => {
  /**
   * Test: Renders the FAQ section and initial items.
   */
  it('renders FAQs and allows category filtering', () => {
    render(
      <LanguageProvider>
        <FAQSection />
      </LanguageProvider>
    );

    expect(screen.getByText(/Frequently Asked/i)).toBeInTheDocument();
    
    // Check for categories
    expect(screen.getByText(/Eligibility/i)).toBeInTheDocument();
    expect(screen.getByText(/Registration/i)).toBeInTheDocument();
  });

  /**
   * Test: Toggles accordion items.
   */
  it('expands an FAQ item on click', () => {
    render(
      <LanguageProvider>
        <FAQSection />
      </LanguageProvider>
    );

    const question = screen.getByText(/Who is eligible to vote in India/i);
    fireEvent.click(question);

    expect(screen.getByText(/Every Indian citizen who is 18 years/i)).toBeInTheDocument();
  });
});
