/**
 * @file __tests__/lib/firebase.test.ts
 */

import { 
  getFirebaseApp, 
  getFirebaseAnalytics, 
  initFirebasePerformance, 
  initFirebaseAppCheck, 
  initFirebaseRemoteConfig, 
  initFirebaseStorage, 
  initFirebaseMessaging 
} from '@/lib/firebase';
import * as firebaseApp from 'firebase/app';
import * as firebaseAnalytics from 'firebase/analytics';
import * as firebasePerf from 'firebase/performance';
import * as firebaseAppCheck from 'firebase/app-check';
import * as firebaseRemoteConfig from 'firebase/remote-config';
import * as firebaseStorage from 'firebase/storage';

jest.mock('firebase/app', () => ({
  initializeApp: jest.fn(),
  getApps: jest.fn(() => []),
}));
jest.mock('firebase/analytics', () => ({
  getAnalytics: jest.fn(),
  isSupported: jest.fn(() => Promise.resolve(true)),
}));
jest.mock('firebase/performance', () => ({
  getPerformance: jest.fn(),
}));
jest.mock('firebase/app-check', () => ({
  initializeAppCheck: jest.fn(),
  ReCaptchaV3Provider: jest.fn(),
}));
jest.mock('firebase/remote-config', () => ({
  getRemoteConfig: jest.fn(() => ({ settings: {} })),
}));
jest.mock('firebase/storage', () => ({
  getStorage: jest.fn(),
}));
jest.mock('firebase/messaging', () => ({
  getMessaging: jest.fn(),
  isSupported: jest.fn(() => Promise.resolve(true)),
}));

describe('Firebase', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // @ts-ignore
    delete global.window;
    process.env.NEXT_PUBLIC_FIREBASE_API_KEY = 'test';
    process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY = 'test';
  });

  it('SSR safety', async () => {
    expect(await getFirebaseAnalytics()).toBeNull();
  });

  it('init failures', async () => {
    // @ts-ignore
    global.window = {};
    jest.spyOn(console, 'warn').mockImplementation(() => {});
    jest.spyOn(console, 'error').mockImplementation(() => {});

    (firebasePerf.getPerformance as jest.Mock).mockImplementation(() => { throw new Error(); });
    expect(initFirebasePerformance()).toBeNull();

    (firebaseRemoteConfig.getRemoteConfig as jest.Mock).mockImplementation(() => { throw new Error(); });
    expect(initFirebaseRemoteConfig()).toBeNull();

    (firebaseStorage.getStorage as jest.Mock).mockImplementation(() => { throw new Error(); });
    expect(initFirebaseStorage()).toBeNull();
    
    (firebaseAnalytics.getAnalytics as jest.Mock).mockImplementation(() => { throw new Error(); });
    expect(await getFirebaseAnalytics()).toBeNull();
  });
});
