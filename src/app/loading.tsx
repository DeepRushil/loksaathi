/**
 * @file app/loading.tsx
 * @description Global loading state spinner for LokSaathi.
 * Standardized with Google-style docstrings and test accessibility.
 */

import React from 'react';

/**
 * Loading component shown during Next.js route transitions.
 * 
 * @returns {JSX.Element} The rendered loading spinner.
 */
export default function Loading(): React.ReactNode {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        gap: '1rem',
        background: 'var(--color-bg)',
      }}
      role="status"
      aria-label="Loading LokSaathi"
      data-testid="loading-spinner"
    >
      <div
        style={{
          width: '48px',
          height: '48px',
          border: '3px solid rgba(255, 107, 0, 0.2)',
          borderTopColor: '#FF6B00',
          borderRadius: '50%',
          animation: 'spin 0.8s linear infinite',
        }}
      />
      <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}>
        Loading LokSaathi…
      </p>

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
