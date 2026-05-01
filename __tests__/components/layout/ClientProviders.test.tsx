import React from 'react';
import { render, screen } from '@testing-library/react';
import ClientProviders from '@/components/layout/ClientProviders';

jest.mock('@/components/layout/FirebaseAnalyticsProvider', () => {
  return function MockFirebaseAnalyticsProvider() {
    return <div data-testid="firebase-provider" />;
  };
});

describe('ClientProviders', () => {
  it('renders children wrapped in providers', () => {
    render(
      <ClientProviders>
        <div data-testid="child-element">Hello</div>
      </ClientProviders>
    );
    expect(screen.getByTestId('firebase-provider')).toBeInTheDocument();
    expect(screen.getByTestId('child-element')).toBeInTheDocument();
  });
});
