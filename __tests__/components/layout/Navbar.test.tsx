/**
 * @file __tests__/components/layout/Navbar.test.tsx
 * @description Unit tests for Navbar with standardized docstrings.
 */

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Navbar from '@/components/layout/Navbar';
import { LanguageProvider } from '@/lib/LanguageContext';

describe('Navbar', () => {
  /**
   * Test: Renders the navbar and its links.
   */
  it('renders correctly and contains navigation links', () => {
    render(
      <LanguageProvider>
        <Navbar />
      </LanguageProvider>
    );

    expect(screen.getByText(/Lok/i)).toBeInTheDocument();
    expect(screen.getByText(/Saathi/i)).toBeInTheDocument();
    
    // Check for navigation links
    const timelineLinks = screen.getAllByText(/Timeline/i);
    expect(timelineLinks.length).toBeGreaterThan(0);
    
    const faqLinks = screen.getAllByText(/FAQ/i);
    expect(faqLinks.length).toBeGreaterThan(0);
  });

  /**
   * Test: Mobile menu interaction.
   */
  it('toggles mobile menu when hamburger is clicked', () => {
    render(
      <LanguageProvider>
        <Navbar />
      </LanguageProvider>
    );

    const hamburger = screen.getByLabelText(/Open menu/i);
    fireEvent.click(hamburger);

    expect(hamburger).toHaveAttribute('aria-expanded', 'true');
  });
});
