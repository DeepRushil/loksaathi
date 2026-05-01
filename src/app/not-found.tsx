/**
 * @file app/not-found.tsx
 * @description Custom 404 page for LokSaathi.
 */

import Link from 'next/link';

export default function NotFound() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        gap: '1.5rem',
        padding: '2rem',
        background: 'var(--color-bg)',
        textAlign: 'center',
      }}
    >
      <span style={{ fontSize: '4rem' }}>🗳️</span>
      <h1 style={{ color: 'var(--color-text-primary)', fontSize: '2rem', margin: 0 }}>
        404 — Page Not Found
      </h1>
      <p style={{ color: 'var(--color-text-secondary)', maxWidth: '400px', lineHeight: 1.6 }}>
        This page doesn&apos;t exist. Let&apos;s get you back to exploring India&apos;s democratic process.
      </p>
      <Link
        href="/"
        style={{
          padding: '0.75rem 2rem',
          background: 'var(--gradient-primary)',
          color: 'white',
          border: 'none',
          borderRadius: '999px',
          fontWeight: 600,
          textDecoration: 'none',
          fontSize: '1rem',
        }}
      >
        ← Back to LokSaathi
      </Link>
    </div>
  );
}
