/**
 * @file src/lib/firebase.ts
 * @description Centralized Firebase Client SDK initialization for LokSaathi.
 * 
 * This module ensures singletons for all Firebase services and handles SSR safety.
 * Optimized with standardized Google-style docstrings.
 */

import { initializeApp, getApps, type FirebaseApp } from 'firebase/app';
import { getAnalytics, isSupported, type Analytics } from 'firebase/analytics';
import { getPerformance, type FirebasePerformance } from 'firebase/performance';
import { initializeAppCheck, ReCaptchaV3Provider, type AppCheck } from 'firebase/app-check';
import { getRemoteConfig, type RemoteConfig } from 'firebase/remote-config';
import { getStorage, type FirebaseStorage } from 'firebase/storage';
import { getMessaging, type Messaging } from 'firebase/messaging';

// ============================================================
// Configuration
// ============================================================

/** 
 * Firebase project configuration.
 * Loaded from environment variables.
 */
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// ============================================================
// Singleton Holders
// ============================================================

let app: FirebaseApp | null = null;
let analytics: Analytics | null = null;
let performance: FirebasePerformance | null = null;
let appCheck: AppCheck | null = null;
let remoteConfig: RemoteConfig | null = null;
let storage: FirebaseStorage | null = null;
let messaging: Messaging | null = null;

// ============================================================
// Initialization Functions
// ============================================================

/**
 * Initializes and returns the Firebase app singleton.
 * Safe for both client and server (returns existing app if already initialized).
 * 
 * @returns {FirebaseApp} The initialized Firebase App instance.
 * @throws {Error} If Firebase configuration is missing.
 */
export function getFirebaseApp(): FirebaseApp {
  if (app) return app;

  const existingApps = getApps();
  if (existingApps.length > 0) {
    app = existingApps[0];
  } else {
    // Validate config exists
    if (!firebaseConfig.apiKey) {
      console.warn('[LokSaathi] Firebase API Key missing. Some services may not function.');
    }
    app = initializeApp(firebaseConfig);
  }

  return app;
}

/**
 * Initializes Firebase Analytics.
 * @returns {Promise<Analytics | null>} The Analytics instance or null if not supported/SSR.
 */
export async function getFirebaseAnalytics(): Promise<Analytics | null> {
  if (typeof window === 'undefined') return null;
  if (analytics) return analytics;

  try {
    const supported = await isSupported();
    if (supported) {
      analytics = getAnalytics(getFirebaseApp());
    }
    return analytics;
  } catch (err) {
    console.warn('[LokSaathi] Analytics failed to load:', err);
    return null;
  }
}

/**
 * Initializes Firebase Performance Monitoring.
 * @returns {FirebasePerformance | null} The Performance instance or null if SSR.
 */
export function initFirebasePerformance(): FirebasePerformance | null {
  if (typeof window === 'undefined') return null;
  if (performance) return performance;

  try {
    performance = getPerformance(getFirebaseApp());
    return performance;
  } catch (err) {
    console.warn('[LokSaathi] Performance init failed:', err);
    return null;
  }
}

/**
 * Initializes Firebase App Check with reCAPTCHA v3.
 * @returns {AppCheck | null} The App Check instance or null if SSR.
 */
export function initFirebaseAppCheck(): AppCheck | null {
  if (typeof window === 'undefined') return null;
  if (appCheck) return appCheck;

  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
  if (!siteKey) {
    console.warn('[LokSaathi] App Check site key missing.');
    return null;
  }

  try {
    appCheck = initializeAppCheck(getFirebaseApp(), {
      provider: new ReCaptchaV3Provider(siteKey),
      isTokenAutoRefreshEnabled: true,
    });
    console.log('[LokSaathi] App Check initialized');
    return appCheck;
  } catch (err) {
    console.warn('[LokSaathi] App Check init failed:', err);
    return null;
  }
}

/**
 * Initializes Firebase Remote Config.
 * @returns {RemoteConfig | null} The Remote Config instance or null if SSR.
 */
export function initFirebaseRemoteConfig(): RemoteConfig | null {
  if (typeof window === 'undefined') return null;
  if (remoteConfig) return remoteConfig;

  try {
    remoteConfig = getRemoteConfig(getFirebaseApp());
    remoteConfig.settings.minimumFetchIntervalMillis = 3600000; // 1 hour
    return remoteConfig;
  } catch (err) {
    console.warn('[LokSaathi] Remote Config init failed:', err);
    return null;
  }
}

/**
 * Initializes Firebase Storage.
 * @returns {FirebaseStorage | null} The Storage instance or null if SSR.
 */
export function initFirebaseStorage(): FirebaseStorage | null {
  if (typeof window === 'undefined') return null;
  if (storage) return storage;

  try {
    storage = getStorage(getFirebaseApp());
    return storage;
  } catch (err) {
    console.warn('[LokSaathi] Storage init failed:', err);
    return null;
  }
}

/**
 * Initializes Firebase Messaging (FCM).
 * @returns {Promise<Messaging | null>} The Messaging instance or null if not supported/SSR.
 */
export async function initFirebaseMessaging(): Promise<Messaging | null> {
  if (typeof window === 'undefined') return null;
  if (messaging) return messaging;

  try {
    const { isSupported: isMsgSupported } = await import('firebase/messaging');
    if (await isMsgSupported()) {
      messaging = getMessaging(getFirebaseApp());
    }
    return messaging;
  } catch (err) {
    console.warn('[LokSaathi] Messaging init failed:', err);
    return null;
  }
}
