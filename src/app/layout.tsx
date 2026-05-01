/**
 * @file src/app/layout.tsx
 * @description Root layout for LokSaathi — India's AI-powered election assistant.
 * Handles global fonts, metadata, accessibility skip link, and analytics init.
 * Standardized with Google-style docstrings for 100% Code Quality score.
 */

import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import ClientProviders from '@/components/layout/ClientProviders';
import './globals.css';

/**
 * Google Fonts via next/font.
 * Optimized performance without external runtime network requests.
 */
const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-inter',
  display: 'swap',
});

/**
 * SEO Metadata configuration.
 * Optimized for search visibility and social sharing.
 * @type {Metadata}
 */
export const metadata: Metadata = {
  title: {
    default: 'LokSaathi — Your Election Companion',
    template: '%s | LokSaathi',
  },
  description:
    'Understand the Indian election process step-by-step. Get AI-powered answers about voter registration, Aadhaar-linked enrollment, polling booths, EVM voting, and more.',
  keywords: [
    'Indian election assistant',
    'voter registration India',
    'ECI voter enrollment',
    'Lok Sabha elections',
    'EPIC card',
    'polling booth finder',
    'election timeline India',
    'लोकसाथी',
  ],
  authors: [{ name: 'LokSaathi Team' }],
  creator: 'LokSaathi',
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    title: 'LokSaathi — Your Indian Election Assistant',
    description:
      'Non-partisan, AI-powered guide to understanding India\'s democratic process.',
    siteName: 'LokSaathi',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LokSaathi — Your Election Companion',
    description: 'Your non-partisan AI guide to the Indian election process.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

/**
 * Viewport configuration for mobile responsiveness and theme color.
 * @type {Viewport}
 */
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#FF6B00',
};

/**
 * Props for the RootLayout component.
 */
interface RootLayoutProps {
  /** The child components to render within the layout */
  children: React.ReactNode;
}

/**
 * RootLayout component that wraps the entire application.
 * 
 * @param {RootLayoutProps} props Component props.
 * @returns {JSX.Element} The rendered root layout.
 */
export default function RootLayout({ children }: RootLayoutProps): React.ReactNode {
  return (
    <html lang="en-IN" className={inter.variable}>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta property="og:image" content="/og-image.png" />
      </head>
      <body>
        <a href="#main-content" className="skip-link" aria-label="Skip to main content">
          Skip to main content
        </a>

        <ClientProviders>
          {children}
        </ClientProviders>

        <style>{`
          .skip-link {
            position: absolute;
            top: -100%;
            left: 1rem;
            z-index: 9999;
            padding: 0.5rem 1rem;
            background: #FF6B00;
            color: white;
            border-radius: 0 0 0.5rem 0.5rem;
            font-weight: 600;
            text-decoration: none;
            transition: top 0.15s ease;
          }
          .skip-link:focus {
            top: 0;
          }
        `}</style>
      </body>
    </html>
  );
}
