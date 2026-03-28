// src/services/firebase.ts
'use client';

import { initializeApp, getApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getAnalytics } from 'firebase/analytics';

// Firebase configuration with environment variables
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// Validate that required env vars exist
const isValidConfig = !!(
  firebaseConfig.apiKey &&
  firebaseConfig.authDomain &&
  firebaseConfig.projectId &&
  firebaseConfig.appId
);

if (!isValidConfig && typeof window !== 'undefined') {
  console.warn('Firebase configuration is incomplete. Check your environment variables.');
}

// Initialize Firebase only once and only on client side
let app;
let auth;
let analytics;

if (typeof window !== 'undefined' && isValidConfig) {
  try {
    // Get existing app or create new one
    app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
    
    // Initialize Firebase Authentication
    auth = getAuth(app);
    
    // Initialize Firebase Analytics
    try {
      analytics = getAnalytics(app);
    } catch (error) {
      console.log('Analytics not available:', error);
    }
  } catch (error) {
    console.error('Firebase initialization error:', error);
  }
}

export { app, auth, analytics };
export default app;
