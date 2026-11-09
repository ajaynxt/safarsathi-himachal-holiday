import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || 'AIzaSyDKd-gJ9rxugjO2XhgxyrV9QTHsELX6Bl4',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || 'ajaynxt-ai-design-studio.firebaseapp.com',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || 'ajaynxt-ai-design-studio',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || 'ajaynxt-ai-design-studio.firebasestorage.app',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '536847137637',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || '1:536847137637:web:8252a7c2c67b3b77eb7f8c',
};

// Real Firebase is connected and fully configured
export const isFirebaseConfigured = true;

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();
googleProvider.addScope('email');
googleProvider.addScope('profile');
googleProvider.setCustomParameters({ prompt: 'select_account' });

export default app;
