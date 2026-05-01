/**
 * @file __tests__/components/features/PollingStationMap.test.tsx
 * @description Unit tests for PollingStationMap with standardized docstrings.
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import PollingStationMap from '@/components/features/PollingStationMap';
import { LanguageProvider } from '@/lib/LanguageContext';

describe('PollingStationMap', () => {
  /**
   * Test: Renders the map section and its components.
   */
  it('renders the polling station map section', () => {
    render(
      <LanguageProvider>
        <PollingStationMap />
      </LanguageProvider>
    );

    expect(screen.getByText(/Polling Booth/i)).toBeInTheDocument();
    expect(screen.getByText(/Near You/i)).toBeInTheDocument();
  });

  /**
   * Test: Verifies fallback UI when API key is missing.
   */
  it('shows fallback UI when API key is not provided', () => {
    render(
      <LanguageProvider>
        <PollingStationMap />
      </LanguageProvider>
    );

    expect(screen.getByText(/Map Integration Ready/i)).toBeInTheDocument();
  });
});
