'use client';

/**
 * @file app/error.tsx
 * @description Global error boundary for unhandled runtime errors.
 */

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
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
      role="alert"
    >
      <span style={{ fontSize: '3rem' }}>⚠️</span>
      <h1 style={{ color: 'var(--color-text-primary)', fontSize: '1.5rem', margin: 0 }}>
        Something went wrong
      </h1>
      <p style={{ color: 'var(--color-text-secondary)', maxWidth: '400px', lineHeight: 1.6 }}>
        {error.message || 'An unexpected error occurred. Please try again.'}
      </p>
      <button
        onClick={reset}
        style={{
          padding: '0.75rem 2rem',
          background: 'var(--gradient-primary)',
          color: 'white',
          border: 'none',
          borderRadius: '999px',
          fontWeight: 600,
          cursor: 'pointer',
          fontSize: '1rem',
        }}
      >
        Try Again
      </button>
    </div>
  );
}
