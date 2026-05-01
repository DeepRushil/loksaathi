'use client';

/**
 * @file components/layout/ClientProviders.tsx
 * @description Client-side providers wrapper (Language context, Firebase Analytics)
 */

import { LanguageProvider } from '@/lib/LanguageContext';
import FirebaseAnalyticsProvider from './FirebaseAnalyticsProvider';

export default function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <LanguageProvider>
      <FirebaseAnalyticsProvider />
      {children}
    </LanguageProvider>
  );
}
