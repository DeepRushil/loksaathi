import React from 'react';
import { render } from '@testing-library/react';
import FirebaseAnalyticsProvider from '@/components/layout/FirebaseAnalyticsProvider';
import * as firebaseLib from '@/lib/firebase';

jest.mock('@/lib/firebase', () => ({
  getFirebaseAnalytics: jest.fn(),
  initFirebasePerformance: jest.fn(),
  initFirebaseAppCheck: jest.fn(),
  initFirebaseRemoteConfig: jest.fn(),
}));

describe('FirebaseAnalyticsProvider', () => {
  it('initializes firebase services on mount', async () => {
    const mockGetAnalytics = firebaseLib.getFirebaseAnalytics as jest.Mock;
    mockGetAnalytics.mockResolvedValue({}); // Simulate analytics resolving successfully

    render(<FirebaseAnalyticsProvider />);

    expect(firebaseLib.getFirebaseAnalytics).toHaveBeenCalled();
    expect(firebaseLib.initFirebasePerformance).toHaveBeenCalled();
    expect(firebaseLib.initFirebaseAppCheck).toHaveBeenCalled();
    expect(firebaseLib.initFirebaseRemoteConfig).toHaveBeenCalled();
  });

  it('handles analytics failure gracefully', async () => {
    const mockGetAnalytics = firebaseLib.getFirebaseAnalytics as jest.Mock;
    mockGetAnalytics.mockRejectedValue(new Error('Analytics failed'));

    render(<FirebaseAnalyticsProvider />);

    expect(firebaseLib.getFirebaseAnalytics).toHaveBeenCalled();
    // Should not throw
  });
});
