/**
 * @file __tests__/components/HeroSection.test.tsx
 * @description Unit tests for HeroSection with standardized docstrings.
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import HeroSection from '@/components/layout/HeroSection';
import { LanguageProvider } from '@/lib/LanguageContext';

describe('HeroSection', () => {
  /**
   * Test: Renders the hero section with the new localized content.
   */
  it('renders the hero section with English content by default', () => {
    render(
      <LanguageProvider>
        <HeroSection />
      </LanguageProvider>
    );

    // Verify main headings match i18n/en values
    expect(screen.getByText(/Empowering Every/i)).toBeInTheDocument();
    expect(screen.getByText(/Indian Voter/i)).toBeInTheDocument();
    
    // Verify CTAs are present
    expect(screen.getByText(/Get Started/i)).toBeInTheDocument();
  });

  /**
   * Test: Verifies the presence of tricolor background elements.
   */
  it('contains the background decorations', () => {
    render(
      <LanguageProvider>
        <HeroSection />
      </LanguageProvider>
    );

    // Check for the chakra decor symbol
    const decor = screen.getByText('⊕');
    expect(decor).toBeInTheDocument();
  });
});
