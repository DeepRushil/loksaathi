/**
 * @file __tests__/app/page.test.tsx
 * @description Unit tests for the main application page with standardized docstrings.
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Page from '@/app/page';

// Mock components that use browser APIs not available in JSDOM or complex hooks
jest.mock('@/components/layout/Navbar', () => () => <div data-testid="navbar">Navbar</div>);
jest.mock('@/components/layout/HeroSection', () => () => <div data-testid="hero">Hero</div>);
jest.mock('@/components/features/ElectionTimeline', () => () => <div data-testid="timeline">Timeline</div>);
jest.mock('@/components/features/AssistantChat', () => () => <div data-testid="assistant">Assistant</div>);
jest.mock('@/components/features/PollingStationMap', () => () => <div data-testid="polling">Polling</div>);
jest.mock('@/components/features/FAQSection', () => () => <div data-testid="faq">FAQ</div>);
jest.mock('@/components/layout/Footer', () => () => <div data-testid="footer">Footer</div>);

describe('Home Page', () => {
  /**
   * Test: Renders the home page and all its core sections.
   */
  it('renders all main sections of the homepage', () => {
    render(<Page />);

    expect(screen.getByTestId('navbar')).toBeInTheDocument();
    expect(screen.getByTestId('hero')).toBeInTheDocument();
    expect(screen.getByTestId('timeline')).toBeInTheDocument();
    expect(screen.getByTestId('assistant')).toBeInTheDocument();
    expect(screen.getByTestId('polling')).toBeInTheDocument();
    expect(screen.getByTestId('faq')).toBeInTheDocument();
    expect(screen.getByTestId('footer')).toBeInTheDocument();
  });
});
