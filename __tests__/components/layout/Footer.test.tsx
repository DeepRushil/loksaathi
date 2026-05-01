import React from 'react';
import { render, screen } from '@testing-library/react';
import Footer from '@/components/layout/Footer';
import { LanguageProvider } from '@/lib/LanguageContext';

describe('Footer', () => {
  it('renders footer links and branding', () => {
    render(
      <LanguageProvider>
        <Footer />
      </LanguageProvider>
    );
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
    expect(screen.getByText(/Lok/i)).toBeInTheDocument();
    expect(screen.getByText(/Election Timeline/i)).toBeInTheDocument();
    expect(screen.getByText(/DEEP RUSHIL/i)).toBeInTheDocument();
  });
});
