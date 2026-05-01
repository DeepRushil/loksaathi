/**
 * @file __tests__/app/common.test.tsx
 * @description Unit tests for common app components (Error, Loading, NotFound).
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Error from '@/app/error';
import Loading from '@/app/loading';
import NotFound from '@/app/not-found';
import { LanguageProvider } from '@/lib/LanguageContext';
import userEvent from '@testing-library/user-event';

describe('Common App Components', () => {
  /**
   * Test: Error component rendering and reset callback.
   */
  it('renders Error component correctly and handles reset', async () => {
    const reset = jest.fn();
    const user = userEvent.setup();
    const testError = new global.Error('Test error');
    
    render(
      <LanguageProvider>
        <Error error={testError} reset={reset} />
      </LanguageProvider>
    );
    
    expect(screen.getByText(/Something went wrong/i)).toBeInTheDocument();
    expect(screen.getByText(/Test error/i)).toBeInTheDocument();
    
    const resetBtn = screen.getByRole('button', { name: /Try again/i });
    await user.click(resetBtn);
    expect(reset).toHaveBeenCalled();
  });

  /**
   * Test: Loading component rendering.
   */
  it('renders Loading component correctly', () => {
    render(<Loading />);
    expect(screen.getByText(/Loading LokSaathi/i)).toBeInTheDocument();
  });

  /**
   * Test: NotFound component rendering.
   */
  it('renders NotFound component correctly', () => {
    render(
      <LanguageProvider>
        <NotFound />
      </LanguageProvider>
    );
    expect(screen.getByText(/404/i)).toBeInTheDocument();
  });
});
