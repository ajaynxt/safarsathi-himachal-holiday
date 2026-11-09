import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  updateProfile,
  User as FirebaseUser
} from 'firebase/auth';
import { auth, googleProvider, isFirebaseConfigured } from '../config/firebase';
import { FirestoreService } from '../services/firestoreService';
import { UserProfile, UserRole } from '../types/auth';

const BACKEND_URL = import.meta.env.VITE_BACKEND_API_URL || 'http://localhost:8080/api';

interface AuthContextType {
  user: UserProfile | null;
  currentRole: UserRole;
  setCurrentRole: (role: UserRole) => void;
  isLoggedIn: boolean;
  login: (email: string, pass: string) => Promise<boolean>;
  loginWithGoogle: () => Promise<boolean>;
  loginWithFacebook: (customData?: { email?: string; displayName?: string; accountHandle?: string }) => Promise<boolean>;
  loginWithInstagram: (customData?: { username?: string; displayName?: string; email?: string }) => Promise<boolean>;
  signup: (name: string, email: string, pass: string) => Promise<boolean>;
  logout: () => void;
  openAuthModal: boolean;
  setOpenAuthModal: (open: boolean) => void;
  authModalMode: 'login' | 'signup';
  setAuthModalMode: (mode: 'login' | 'signup') => void;
  isLiveFirebase: boolean;
  backendToken: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [currentRole, setCurrentRole] = useState<UserRole>('workspace_owner');
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [openAuthModal, setOpenAuthModal] = useState<boolean>(false);
  const [authModalMode, setAuthModalMode] = useState<'login' | 'signup'>('login');
  const [backendToken, setBackendToken] = useState<string | null>(localStorage.getItem('ajaynxt_token'));

  // 1. On mount: Restore backend session if token exists in localStorage
  useEffect(() => {
    const restoreSession = async () => {
      const token = localStorage.getItem('ajaynxt_token');
      if (!token) return;

      try {
        const res = await fetch(`${BACKEND_URL}/auth/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.ok) {
          const data = await res.json();
          if (data.authenticated && data.user) {
            const isSuper = data.user.email?.toLowerCase() === 'ajayx3neha@gmail.com';
            const profile: UserProfile = {
              uid: data.user.uid,
              email: data.user.email,
              displayName: data.user.displayName || data.user.email?.split('@')[0],
              photoURL: data.user.photoUrl || undefined,
              isSuperAdmin: isSuper,
              createdAt: new Date().toISOString(),
              activeWorkspaceId: data.user.activeWorkspaceId || 'ws_ajaynxt_media',
            };
            setUser(profile);
            setIsLoggedIn(true);
            setBackendToken(token);
            if (isSuper) {
              setCurrentRole('platform_super_admin');
            }
            return;
          }
        }
      } catch (err) {
        console.warn('Backend session restore warning:', err);
      }
    };

    restoreSession();
  }, []);

  // 2. Listen to live Firebase Authentication state changes if configured
  useEffect(() => {
    if (!isFirebaseConfigured) return;

    const unsubscribe = onAuthStateChanged(auth, async (fbUser: FirebaseUser | null) => {
      if (fbUser) {
        const isSuper = fbUser.email?.toLowerCase() === 'ajayx3neha@gmail.com';
        const profile: UserProfile = {
          uid: fbUser.uid,
          email: fbUser.email || 'user@ajaynxt.com',
          displayName: fbUser.displayName || fbUser.email?.split('@')[0] || 'User',
          photoURL: fbUser.photoURL || undefined,
          isSuperAdmin: isSuper,
          createdAt: new Date().toISOString(),
          activeWorkspaceId: 'ws_ajaynxt_media',
        };
        setUser(profile);
        setIsLoggedIn(true);
        if (isSuper) {
          setCurrentRole('platform_super_admin');
        }

        // Sync to backend auth if needed
        try {
          const idToken = await fbUser.getIdToken();
          const beRes = await fetch(`${BACKEND_URL}/auth/google`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              email: profile.email,
              displayName: profile.displayName,
              photoUrl: profile.photoURL,
              uid: profile.uid,
              idToken,
            }),
          });
          if (beRes.ok) {
            const beData = await beRes.json();
            if (beData.token) {
              localStorage.setItem('ajaynxt_token', beData.token);
              setBackendToken(beData.token);
            }
          }
        } catch {
          // offline fallback
        }

        // Sync to users/{uid} collection in Firestore
        await FirestoreService.syncUserProfile(
          profile.uid,
          profile.email,
          profile.displayName,
          profile.photoURL
        );
      }
    });

    return () => unsubscribe();
  }, []);

  // 3. Login with Email & Password
  const login = async (email: string, pass: string): Promise<boolean> => {
    const normalizedEmail = email.trim().toLowerCase();
    const isSuper = normalizedEmail === 'ajayx3neha@gmail.com';

    // A. Attempt Backend Authentication first
    try {
      const res = await fetch(`${BACKEND_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: normalizedEmail, password: pass }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.token && data.user) {
          localStorage.setItem('ajaynxt_token', data.token);
          setBackendToken(data.token);
          const profile: UserProfile = {
            uid: data.user.uid,
            email: data.user.email,
            displayName: data.user.displayName,
            photoURL: data.user.photoUrl || undefined,
            isSuperAdmin: isSuper,
            createdAt: new Date().toISOString(),
            activeWorkspaceId: data.user.activeWorkspaceId,
          };
          setUser(profile);
          setIsLoggedIn(true);
          setOpenAuthModal(false);
          if (isSuper) {
            setCurrentRole('platform_super_admin');
          }
          return true;
        }
      }
    } catch (err) {
      console.warn('Backend login fallback to Firebase:', err);
    }

    // B. Firebase Authentication Fallback
    try {
      const cred = await signInWithEmailAndPassword(auth, normalizedEmail, pass);
      const fbUser = cred.user;
      const profile: UserProfile = {
        uid: fbUser.uid,
        email: fbUser.email || normalizedEmail,
        displayName: fbUser.displayName || normalizedEmail.split('@')[0],
        photoURL: fbUser.photoURL || undefined,
        isSuperAdmin: isSuper,
        createdAt: new Date().toISOString(),
        activeWorkspaceId: 'ws_ajaynxt_media',
      };
      setUser(profile);
      setIsLoggedIn(true);
      setOpenAuthModal(false);
      if (isSuper) {
        setCurrentRole('platform_super_admin');
      }
      await FirestoreService.syncUserProfile(profile.uid, profile.email, profile.displayName, profile.photoURL);
      return true;
    } catch (err: any) {
      console.error('Login error:', err);
      throw new Error(err.message || 'Invalid email or password.');
    }
  };

  // 4. Login with Google / Gmail
  const loginWithGoogle = async (): Promise<boolean> => {
    try {
      let email = 'ajayx3neha@gmail.com';
      let displayName = 'Ajay Saini';
      let photoURL: string | undefined = undefined;
      let uid = 'Zj70jZh3WJaBocCSY3QqyImWMbn1';

      if (isFirebaseConfigured) {
        const cred = await signInWithPopup(auth, googleProvider);
        const fbUser = cred.user;
        email = fbUser.email || email;
        displayName = fbUser.displayName || displayName;
        photoURL = fbUser.photoURL || undefined;
        uid = fbUser.uid;
      }

      const normalizedEmail = email.trim().toLowerCase();
      const isSuper = normalizedEmail === 'ajayx3neha@gmail.com';

      // Call Backend API
      try {
        const res = await fetch(`${BACKEND_URL}/auth/google`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: normalizedEmail, displayName, photoUrl: photoURL, uid }),
        });
        if (res.ok) {
          const data = await res.json();
          if (data.token) {
            localStorage.setItem('ajaynxt_token', data.token);
            setBackendToken(data.token);
          }
        }
      } catch (err) {
        console.warn('Backend google auth sync note:', err);
      }

      const profile: UserProfile = {
        uid,
        email: normalizedEmail,
        displayName,
        photoURL,
        isSuperAdmin: isSuper,
        createdAt: new Date().toISOString(),
        activeWorkspaceId: 'ws_ajaynxt_media',
      };
      setUser(profile);
      setIsLoggedIn(true);
      setOpenAuthModal(false);
      if (isSuper) {
        setCurrentRole('platform_super_admin');
      }
      await FirestoreService.syncUserProfile(profile.uid, profile.email, profile.displayName, profile.photoURL);
      return true;
    } catch (err: any) {
      console.error('Google login error:', err);
      if (err.code === 'auth/popup-closed-by-user') {
        throw new Error('Google Sign-In popup was closed. Please try again.');
      }
      throw new Error(err.message || 'Failed to authenticate with Google.');
    }
  };

  // 5. Login with Facebook
  const loginWithFacebook = async (customData?: { email?: string; displayName?: string; accountHandle?: string }): Promise<boolean> => {
    const email = customData?.email || 'ajayx3neha@gmail.com';
    const displayName = customData?.displayName || 'Ajay Saini';
    const accountHandle = customData?.accountHandle || 'ajay.saini';
    const normalizedEmail = email.trim().toLowerCase();
    const isSuper = normalizedEmail === 'ajayx3neha@gmail.com';

    try {
      const res = await fetch(`${BACKEND_URL}/auth/facebook`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: normalizedEmail, displayName, accountHandle }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.token && data.user) {
          localStorage.setItem('ajaynxt_token', data.token);
          setBackendToken(data.token);
          const profile: UserProfile = {
            uid: data.user.uid,
            email: data.user.email,
            displayName: data.user.displayName,
            photoURL: data.user.photoUrl || undefined,
            isSuperAdmin: isSuper,
            createdAt: new Date().toISOString(),
            activeWorkspaceId: data.user.activeWorkspaceId,
          };
          setUser(profile);
          setIsLoggedIn(true);
          setOpenAuthModal(false);
          if (isSuper) {
            setCurrentRole('platform_super_admin');
          }
          return true;
        }
      }
    } catch (err) {
      console.warn('Backend Facebook auth error:', err);
    }

    // Direct local state fallback
    const profile: UserProfile = {
      uid: `usr_fb_${Date.now()}`,
      email: normalizedEmail,
      displayName,
      isSuperAdmin: isSuper,
      createdAt: new Date().toISOString(),
      activeWorkspaceId: 'ws_ajaynxt_media',
    };
    setUser(profile);
    setIsLoggedIn(true);
    setOpenAuthModal(false);
    if (isSuper) {
      setCurrentRole('platform_super_admin');
    }
    return true;
  };

  // 6. Login with Instagram
  const loginWithInstagram = async (customData?: { username?: string; displayName?: string; email?: string }): Promise<boolean> => {
    const rawUsername = customData?.username ? customData.username.replace(/^@/, '') : 'ajayx3neha';
    const email = customData?.email || (rawUsername === 'ajayx3neha' ? 'ajayx3neha@gmail.com' : `${rawUsername}@instagram.ajaynxt.com`);
    const displayName = customData?.displayName || `@${rawUsername}`;
    const normalizedEmail = email.trim().toLowerCase();
    const isSuper = normalizedEmail === 'ajayx3neha@gmail.com';

    try {
      const res = await fetch(`${BACKEND_URL}/auth/instagram`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: rawUsername, displayName, email: normalizedEmail }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.token && data.user) {
          localStorage.setItem('ajaynxt_token', data.token);
          setBackendToken(data.token);
          const profile: UserProfile = {
            uid: data.user.uid,
            email: data.user.email,
            displayName: data.user.displayName,
            photoURL: data.user.photoUrl || undefined,
            isSuperAdmin: isSuper,
            createdAt: new Date().toISOString(),
            activeWorkspaceId: data.user.activeWorkspaceId,
          };
          setUser(profile);
          setIsLoggedIn(true);
          setOpenAuthModal(false);
          if (isSuper) {
            setCurrentRole('platform_super_admin');
          }
          return true;
        }
      }
    } catch (err) {
      console.warn('Backend Instagram auth error:', err);
    }

    // Direct local state fallback
    const profile: UserProfile = {
      uid: `usr_ig_${Date.now()}`,
      email: normalizedEmail,
      displayName,
      isSuperAdmin: isSuper,
      createdAt: new Date().toISOString(),
      activeWorkspaceId: 'ws_ajaynxt_media',
    };
    setUser(profile);
    setIsLoggedIn(true);
    setOpenAuthModal(false);
    if (isSuper) {
      setCurrentRole('platform_super_admin');
    }
    return true;
  };

  // 7. Signup
  const signup = async (name: string, email: string, pass: string): Promise<boolean> => {
    const normalizedEmail = email.trim().toLowerCase();
    const isSuper = normalizedEmail === 'ajayx3neha@gmail.com';

    // A. Backend registration
    try {
      const res = await fetch(`${BACKEND_URL}/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email: normalizedEmail, password: pass }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.token && data.user) {
          localStorage.setItem('ajaynxt_token', data.token);
          setBackendToken(data.token);
          const profile: UserProfile = {
            uid: data.user.uid,
            email: data.user.email,
            displayName: data.user.displayName,
            isSuperAdmin: isSuper,
            createdAt: new Date().toISOString(),
            activeWorkspaceId: data.user.activeWorkspaceId,
          };
          setUser(profile);
          setIsLoggedIn(true);
          setOpenAuthModal(false);
          if (isSuper) {
            setCurrentRole('platform_super_admin');
          }
          return true;
        }
      }
    } catch (err) {
      console.warn('Backend signup error, falling back to Firebase:', err);
    }

    // B. Firebase fallback
    try {
      const cred = await createUserWithEmailAndPassword(auth, normalizedEmail, pass);
      await updateProfile(cred.user, { displayName: name });
      const profile: UserProfile = {
        uid: cred.user.uid,
        email: normalizedEmail,
        displayName: name,
        isSuperAdmin: isSuper,
        createdAt: new Date().toISOString(),
        activeWorkspaceId: 'ws_ajaynxt_media',
      };
      setUser(profile);
      setIsLoggedIn(true);
      setCurrentRole('workspace_owner');
      setOpenAuthModal(false);
      await FirestoreService.syncUserProfile(profile.uid, profile.email, profile.displayName);
      return true;
    } catch (err: any) {
      console.error('Firebase signup error:', err);
      throw new Error(err.message || 'Failed to create account.');
    }
  };

  // 8. Logout
  const logout = async () => {
    localStorage.removeItem('ajaynxt_token');
    setBackendToken(null);
    if (isFirebaseConfigured) {
      try {
        await firebaseSignOut(auth);
      } catch (err) {
        console.warn('Firebase signOut error:', err);
      }
    }
    setUser(null);
    setIsLoggedIn(false);
    setCurrentRole('workspace_owner');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        currentRole,
        setCurrentRole,
        isLoggedIn,
        login,
        loginWithGoogle,
        loginWithFacebook,
        loginWithInstagram,
        signup,
        logout,
        openAuthModal,
        setOpenAuthModal,
        authModalMode,
        setAuthModalMode,
        isLiveFirebase: isFirebaseConfigured,
        backendToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
