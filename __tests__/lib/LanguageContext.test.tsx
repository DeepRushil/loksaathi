import React from 'react';
import { render, screen } from '@testing-library/react';
import { LanguageProvider, useLanguage } from '@/lib/LanguageContext';
import userEvent from '@testing-library/user-event';

// A simple component to consume the context
function TestComponent() {
  const { language, setLanguage } = useLanguage();
  return (
    <div>
      <span data-testid="lang">{language}</span>
      <button onClick={() => setLanguage('hi')}>Set Hindi</button>
    </div>
  );
}

describe('LanguageContext', () => {
  beforeEach(() => {
    localStorage.clear();
    jest.restoreAllMocks();
  });

  it('defaults to English when localStorage is empty', () => {
    render(
      <LanguageProvider>
        <TestComponent />
      </LanguageProvider>
    );
    expect(screen.getByTestId('lang')).toHaveTextContent('en');
  });

  it('loads language from localStorage on mount', () => {
    localStorage.setItem('loksaathi-lang', 'ta');
    render(
      <LanguageProvider>
        <TestComponent />
      </LanguageProvider>
    );
    expect(screen.getByTestId('lang')).toHaveTextContent('ta');
  });

  it('ignores invalid language in localStorage', () => {
    localStorage.setItem('loksaathi-lang', 'invalid_lang');
    render(
      <LanguageProvider>
        <TestComponent />
      </LanguageProvider>
    );
    expect(screen.getByTestId('lang')).toHaveTextContent('en');
  });

  it('handles localStorage getItem throw safely', () => {
    jest.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
      throw new Error('Storage disabled');
    });
    render(
      <LanguageProvider>
        <TestComponent />
      </LanguageProvider>
    );
    expect(screen.getByTestId('lang')).toHaveTextContent('en');
  });

  it('saves language to localStorage when changed', async () => {
    render(
      <LanguageProvider>
        <TestComponent />
      </LanguageProvider>
    );
    
    await userEvent.click(screen.getByText('Set Hindi'));
    expect(screen.getByTestId('lang')).toHaveTextContent('hi');
    expect(localStorage.getItem('loksaathi-lang')).toBe('hi');
  });

  it('handles localStorage setItem throw safely', async () => {
    jest.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new Error('Storage disabled');
    });
    
    render(
      <LanguageProvider>
        <TestComponent />
      </LanguageProvider>
    );
    
    await userEvent.click(screen.getByText('Set Hindi'));
    expect(screen.getByTestId('lang')).toHaveTextContent('hi');
    // It should not throw and context still updates
  });
});
