'use client';

/**
 * @file components/layout/FirebaseAnalyticsProvider.tsx
 * @description Initializes Firebase client services on mount:
 *  - Firebase Analytics (usage tracking)
 *  - Firebase Performance Monitoring (page load & network metrics)
 */

import { useEffect } from 'react';
import { getFirebaseAnalytics, initFirebasePerformance, initFirebaseAppCheck, initFirebaseRemoteConfig, initFirebaseStorage, initFirebaseMessaging } from '@/lib/firebase';

export default function FirebaseAnalyticsProvider() {
  useEffect(() => {
    getFirebaseAnalytics().then((analytics) => {
      if (analytics) {
        console.log('[LokSaathi] Firebase Analytics initialized');
      }
    }).catch(() => {});

    initFirebasePerformance();
    initFirebaseAppCheck();
    initFirebaseRemoteConfig();
    initFirebaseStorage();
    initFirebaseMessaging();
  }, []);

  return null;
}
