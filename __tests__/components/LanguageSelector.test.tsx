import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import LanguageSelector from '@/components/ui/LanguageSelector';
import { LanguageProvider } from '@/lib/LanguageContext';

describe('LanguageSelector', () => {
  it('renders the selector with the current language', () => {
    render(
      <LanguageProvider>
        <LanguageSelector />
      </LanguageProvider>
    );

    const button = screen.getByRole('button', { name: /Language/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent('English'); // default language
  });

  it('toggles the dropdown menu when clicked', () => {
    render(
      <LanguageProvider>
        <LanguageSelector />
      </LanguageProvider>
    );

    const button = screen.getByRole('button', { name: /Language/i });
    
    // Initial state: menu is closed (aria-expanded is false)
    expect(button).toHaveAttribute('aria-expanded', 'false');

    // Click to open
    fireEvent.click(button);
    expect(button).toHaveAttribute('aria-expanded', 'true');
    
    // Verify Hindi is an option
    expect(screen.getByText('Hindi')).toBeInTheDocument();

    // Click again to close
    fireEvent.click(button);
    expect(button).toHaveAttribute('aria-expanded', 'false');
  });

  it('closes the menu when clicking outside', () => {
    render(
      <LanguageProvider>
        <LanguageSelector />
      </LanguageProvider>
    );

    const button = screen.getByRole('button', { name: /Language/i });
    fireEvent.click(button);
    expect(button).toHaveAttribute('aria-expanded', 'true');

    fireEvent.mouseDown(document.body);
    expect(button).toHaveAttribute('aria-expanded', 'false');
  });

  it('sets the language when an option is clicked', () => {
    render(
      <LanguageProvider>
        <LanguageSelector />
      </LanguageProvider>
    );

    const button = screen.getByRole('button', { name: /Language/i });
    fireEvent.click(button);
    
    const hindiOption = screen.getByText('हिन्दी').closest('button');
    fireEvent.click(hindiOption!);
    
    expect(button).toHaveAttribute('aria-expanded', 'false');
    expect(button).toHaveTextContent('हिन्दी');
  });
});
