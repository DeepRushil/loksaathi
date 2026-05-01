'use client';

/**
 * @file lib/LanguageContext.tsx
 * @description React Context for app-wide language state.
 * Persists choice in localStorage. Defaults to English.
 */

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { getTranslations, type Language, type Translations } from './i18n';

interface LanguageContextValue {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextValue>({
  language: 'en',
  setLanguage: () => {},
  t: getTranslations('en'),
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en');

  // Load saved preference on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('loksaathi-lang') as Language | null;
      if (saved && ['en', 'hi', 'ta', 'te', 'bn', 'mr', 'gu', 'kn'].includes(saved)) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setLanguageState(saved);
      }
    } catch {
      // localStorage not available — stay with English
    }
  }, []);

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem('loksaathi-lang', lang);
    } catch {
      // ignore
    }
  }, []);

  const t = getTranslations(language);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
