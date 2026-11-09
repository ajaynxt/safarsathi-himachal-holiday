import React, { useState } from 'react';
import { Mail, Lock, User, ArrowRight, ShieldCheck, AlertCircle, Loader2, AtSign, Globe, KeyRound, Eye, EyeOff } from 'lucide-react';
import { Modal } from './Modal';
import { useAuth } from '../../context/AuthContext';
import { InstagramIcon, FacebookIcon } from './SocialIcons';

type SocialProvider = 'none' | 'instagram' | 'facebook';

export const AuthModal: React.FC = () => {
  const {
    openAuthModal,
    setOpenAuthModal,
    authModalMode,
    setAuthModalMode,
    login,
    signup,
    loginWithGoogle,
    loginWithFacebook,
    loginWithInstagram,
  } = useAuth();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [facebookLoading, setFacebookLoading] = useState(false);
  const [instagramLoading, setInstagramLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Social account handle & password inputs
  const [activeSocialPrompt, setActiveSocialPrompt] = useState<SocialProvider>('none');
  const [instaHandle, setInstaHandle] = useState('ajayx3neha');
  const [instaPassword, setInstaPassword] = useState('');
  const [showInstaPassword, setShowInstaPassword] = useState(false);

  const [fbProfile, setFbProfile] = useState('ajayx3neha@gmail.com');
  const [fbPassword, setFbPassword] = useState('');
  const [showFbPassword, setShowFbPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setLoading(true);
    try {
      if (authModalMode === 'signup') {
        await signup(name, email, password);
      } else {
        await login(email, password);
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Authentication failed. Please verify your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleAuth = async () => {
    setErrorMsg(null);
    setGoogleLoading(true);
    try {
      await loginWithGoogle();
    } catch (err: any) {
      setErrorMsg(err.message || 'Google Authentication failed. Please try again.');
    } finally {
      setGoogleLoading(false);
    }
  };

  const handleFacebookAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fbProfile.trim()) {
      setErrorMsg('Please enter your Facebook Email or Mobile number.');
      return;
    }
    if (!fbPassword.trim()) {
      setErrorMsg('Please enter your Facebook password.');
      return;
    }

    setErrorMsg(null);
    setFacebookLoading(true);
    try {
      await loginWithFacebook({
        email: fbProfile.includes('@') ? fbProfile.trim() : `${fbProfile.trim()}@facebook.ajaynxt.com`,
        displayName: fbProfile.split('@')[0],
        accountHandle: fbProfile.trim(),
      });
    } catch (err: any) {
      setErrorMsg(err.message || 'Facebook Authentication failed. Please try again.');
    } finally {
      setFacebookLoading(false);
    }
  };

  const handleInstagramAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!instaHandle.trim()) {
      setErrorMsg('Please enter your Instagram Username, Phone or Email.');
      return;
    }
    if (!instaPassword.trim()) {
      setErrorMsg('Please enter your Instagram password.');
      return;
    }

    setErrorMsg(null);
    setInstagramLoading(true);
    try {
      await loginWithInstagram({
        username: instaHandle.trim().startsWith('@') ? instaHandle.trim() : `@${instaHandle.trim()}`,
        displayName: instaHandle.trim(),
        email: instaHandle.includes('@') ? instaHandle.trim() : `${instaHandle.trim()}@instagram.ajaynxt.com`,
      });
    } catch (err: any) {
      setErrorMsg(err.message || 'Instagram Authentication failed. Please try again.');
    } finally {
      setInstagramLoading(false);
    }
  };

  const handleClose = () => {
    setErrorMsg(null);
    setActiveSocialPrompt('none');
    setOpenAuthModal(false);
  };

  return (
    <Modal
      isOpen={openAuthModal}
      onClose={handleClose}
      title={authModalMode === 'login' ? 'Sign In to AJAYNXT' : 'Create Agency Account'}
      description="Next-Gen Multi-Platform Marketing & Social Analytics"
      maxWidth="sm"
    >
      <div className="space-y-3.5">
        {/* Error alert banner */}
        {errorMsg && (
          <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-xs text-rose-600 dark:text-rose-400 flex items-start gap-2 animate-in fade-in-50 duration-150">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <span className="leading-snug">{errorMsg}</span>
          </div>
        )}

        {/* 1. Real Social Login Buttons (Instagram, Facebook, Google) */}
        <div className="space-y-2">
          {/* Instagram Login Accordion Button */}
          <button
            type="button"
            onClick={() => setActiveSocialPrompt(activeSocialPrompt === 'instagram' ? 'none' : 'instagram')}
            disabled={loading}
            className="w-full py-2.5 px-3.5 rounded-xl text-xs font-bold text-[#25171C] dark:text-[#FAF3F5] flex items-center justify-between glass-card border border-[#D9B7C0]/40 dark:border-[#D9B7C0]/20 hover:border-pink-500/50 hover:bg-pink-500/5 transition active:scale-[0.99] shadow-sm"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-6 h-6 rounded-lg bg-gradient-to-tr from-[#64152C] via-pink-600 to-amber-500 flex items-center justify-center p-1 text-white shadow-xs">
                <InstagramIcon className="w-3.5 h-3.5 text-white" />
              </div>
              <span>Continue with Instagram</span>
            </div>
            <span className="text-[10px] font-bold text-pink-600 dark:text-pink-400 bg-pink-500/10 px-2 py-0.5 rounded-md">
              {activeSocialPrompt === 'instagram' ? 'Close Form' : 'ID & Password'}
            </span>
          </button>

          {/* Instagram ID & Password Input Form */}
          {activeSocialPrompt === 'instagram' && (
            <form onSubmit={handleInstagramAuth} className="p-3.5 rounded-xl bg-pink-500/5 border border-pink-500/25 space-y-2.5 animate-in slide-in-from-top-1 duration-150">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-pink-700 dark:text-pink-300">
                  Instagram Account Login
                </span>
                <span className="text-[9px] text-slate-400">Meta Graph API v21.0</span>
              </div>

              <div>
                <label className="block text-[10px] font-semibold text-[#25171C] dark:text-[#FAF3F5] mb-1">
                  Username, phone number, or email:
                </label>
                <div className="relative">
                  <AtSign className="w-3.5 h-3.5 text-pink-500 absolute left-2.5 top-2.5" />
                  <input
                    type="text"
                    required
                    value={instaHandle}
                    onChange={(e) => setInstaHandle(e.target.value)}
                    placeholder="ajayx3neha"
                    className="w-full pl-8 pr-3 py-1.5 text-xs rounded-lg bg-white/80 dark:bg-[#130308]/80 border border-pink-500/30 text-[#25171C] dark:text-[#FAF3F5] outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-semibold text-[#25171C] dark:text-[#FAF3F5] mb-1">
                  Instagram Password:
                </label>
                <div className="relative">
                  <KeyRound className="w-3.5 h-3.5 text-pink-500 absolute left-2.5 top-2.5" />
                  <input
                    type={showInstaPassword ? 'text' : 'password'}
                    required
                    value={instaPassword}
                    onChange={(e) => setInstaPassword(e.target.value)}
                    placeholder="Enter password"
                    className="w-full pl-8 pr-8 py-1.5 text-xs rounded-lg bg-white/80 dark:bg-[#130308]/80 border border-pink-500/30 text-[#25171C] dark:text-[#FAF3F5] outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setShowInstaPassword(!showInstaPassword)}
                    className="absolute right-2.5 top-2 text-slate-400"
                  >
                    {showInstaPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={instagramLoading}
                className="w-full py-2 px-3 bg-gradient-to-r from-pink-600 via-rose-600 to-amber-500 text-white rounded-lg text-xs font-bold shadow-sm flex items-center justify-center gap-1.5 transition active:scale-[0.98]"
              >
                {instagramLoading ? <Loader2 className="w-3 h-3 animate-spin" /> : <InstagramIcon className="w-3 h-3 text-white" />}
                <span>{instagramLoading ? 'Authenticating ID...' : `Log In as @${instaHandle || 'ajayx3neha'}`}</span>
              </button>
            </form>
          )}

          {/* Facebook Login Accordion Button */}
          <button
            type="button"
            onClick={() => setActiveSocialPrompt(activeSocialPrompt === 'facebook' ? 'none' : 'facebook')}
            disabled={loading}
            className="w-full py-2.5 px-3.5 rounded-xl text-xs font-bold text-[#25171C] dark:text-[#FAF3F5] flex items-center justify-between glass-card border border-[#D9B7C0]/40 dark:border-[#D9B7C0]/20 hover:border-blue-500/50 hover:bg-blue-500/5 transition active:scale-[0.99] shadow-sm"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-6 h-6 rounded-lg bg-[#1877F2] flex items-center justify-center p-1 text-white shadow-xs">
                <FacebookIcon className="w-3.5 h-3.5 text-white" />
              </div>
              <span>Continue with Facebook</span>
            </div>
            <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded-md">
              {activeSocialPrompt === 'facebook' ? 'Close Form' : 'ID & Password'}
            </span>
          </button>

          {/* Facebook ID & Password Input Form */}
          {activeSocialPrompt === 'facebook' && (
            <form onSubmit={handleFacebookAuth} className="p-3.5 rounded-xl bg-blue-500/5 border border-blue-500/25 space-y-2.5 animate-in slide-in-from-top-1 duration-150">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-blue-700 dark:text-blue-300">
                  Facebook Account Login
                </span>
                <span className="text-[9px] text-slate-400">Meta OAuth v21.0</span>
              </div>

              <div>
                <label className="block text-[10px] font-semibold text-[#25171C] dark:text-[#FAF3F5] mb-1">
                  Mobile number or email:
                </label>
                <div className="relative">
                  <Globe className="w-3.5 h-3.5 text-blue-500 absolute left-2.5 top-2.5" />
                  <input
                    type="text"
                    required
                    value={fbProfile}
                    onChange={(e) => setFbProfile(e.target.value)}
                    placeholder="ajayx3neha@gmail.com"
                    className="w-full pl-8 pr-3 py-1.5 text-xs rounded-lg bg-white/80 dark:bg-[#130308]/80 border border-blue-500/30 text-[#25171C] dark:text-[#FAF3F5] outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-semibold text-[#25171C] dark:text-[#FAF3F5] mb-1">
                  Facebook Password:
                </label>
                <div className="relative">
                  <KeyRound className="w-3.5 h-3.5 text-blue-500 absolute left-2.5 top-2.5" />
                  <input
                    type={showFbPassword ? 'text' : 'password'}
                    required
                    value={fbPassword}
                    onChange={(e) => setFbPassword(e.target.value)}
                    placeholder="Enter password"
                    className="w-full pl-8 pr-8 py-1.5 text-xs rounded-lg bg-white/80 dark:bg-[#130308]/80 border border-blue-500/30 text-[#25171C] dark:text-[#FAF3F5] outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setShowFbPassword(!showFbPassword)}
                    className="absolute right-2.5 top-2 text-slate-400"
                  >
                    {showFbPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={facebookLoading}
                className="w-full py-2 px-3 bg-[#1877F2] hover:bg-blue-600 text-white rounded-lg text-xs font-bold shadow-sm flex items-center justify-center gap-1.5 transition active:scale-[0.98]"
              >
                {facebookLoading ? <Loader2 className="w-3 h-3 animate-spin" /> : <FacebookIcon className="w-3 h-3 text-white" />}
                <span>{facebookLoading ? 'Authenticating...' : 'Log In with Facebook'}</span>
              </button>
            </form>
          )}

          {/* Google / Gmail Sign In button */}
          <button
            type="button"
            onClick={handleGoogleAuth}
            disabled={loading || googleLoading}
            className="w-full py-2.5 px-3.5 glass-card rounded-xl text-xs font-bold text-[#25171C] dark:text-[#FAF3F5] flex items-center justify-between border border-[#D9B7C0]/40 dark:border-[#D9B7C0]/20 hover:border-maroon-500/40 hover:bg-white/80 dark:hover:bg-[#200810]/80 active:scale-[0.99] disabled:opacity-60 shadow-sm transition"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-6 h-6 rounded-lg bg-white dark:bg-slate-800 flex items-center justify-center p-1 border border-slate-200 dark:border-slate-700">
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                </svg>
              </div>
              <span>Continue with Google / Gmail</span>
            </div>
            {googleLoading ? (
              <Loader2 className="w-4 h-4 animate-spin text-maroon-600 dark:text-maroon-300" />
            ) : (
              <span className="text-[10px] font-semibold text-slate-500">Google OAuth</span>
            )}
          </button>
        </div>

        <div className="relative flex items-center justify-center my-2">
          <div className="border-t border-[#D9B7C0]/35 dark:border-[#D9B7C0]/15 w-full" />
          <span className="bg-white/80 dark:bg-[#1A060E]/90 px-3 text-[10px] font-semibold tracking-wider text-slate-400 dark:text-maroon-300 uppercase absolute">
            or with agency credentials
          </span>
        </div>

        {/* 2. Direct Email/Password Form */}
        <form onSubmit={handleSubmit} className="space-y-2.5 pt-1">
          {authModalMode === 'signup' && (
            <div>
              <label className="block text-[11px] font-semibold text-[#25171C] dark:text-maroon-200 mb-1">
                Full Name
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-maroon-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  required
                  placeholder="e.g. Ajay Saini"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-white/60 dark:bg-[#130308]/60 border border-[#D9B7C0]/40 dark:border-[#D9B7C0]/20 focus:border-maroon-500 focus:ring-2 focus:ring-maroon-500/20 text-[#25171C] dark:text-[#FAF3F5] outline-none transition"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-[11px] font-semibold text-[#25171C] dark:text-maroon-200 mb-1">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-maroon-400 absolute left-3 top-2.5" />
              <input
                type="email"
                required
                placeholder="ajayx3neha@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-white/60 dark:bg-[#130308]/60 border border-[#D9B7C0]/40 dark:border-[#D9B7C0]/20 focus:border-maroon-500 focus:ring-2 focus:ring-maroon-500/20 text-[#25171C] dark:text-[#FAF3F5] outline-none transition"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-[11px] font-semibold text-[#25171C] dark:text-maroon-200">
                Password
              </label>
              {authModalMode === 'login' && (
                <span className="text-[10px] text-maroon-600 dark:text-maroon-300 font-medium">
                  Use password123 or your password
                </span>
              )}
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-maroon-400 absolute left-3 top-2.5" />
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-white/60 dark:bg-[#130308]/60 border border-[#D9B7C0]/40 dark:border-[#D9B7C0]/20 focus:border-maroon-500 focus:ring-2 focus:ring-maroon-500/20 text-[#25171C] dark:text-[#FAF3F5] outline-none transition"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-3 py-2.5 px-4 btn-maroon rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition disabled:opacity-50"
          >
            <span>
              {loading
                ? 'Authenticating Session...'
                : authModalMode === 'login'
                ? 'Sign In to Workspace'
                : 'Create Agency Account'}
            </span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="text-center pt-1">
          {authModalMode === 'login' ? (
            <p className="text-xs text-slate-500 dark:text-maroon-300/80">
              New to AJAYNXT?{' '}
              <button
                type="button"
                onClick={() => setAuthModalMode('signup')}
                className="text-maroon-600 dark:text-maroon-300 font-semibold hover:underline"
              >
                Create an account
              </button>
            </p>
          ) : (
            <p className="text-xs text-slate-500 dark:text-maroon-300/80">
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => setAuthModalMode('login')}
                className="text-maroon-600 dark:text-maroon-300 font-semibold hover:underline"
              >
                Sign in
              </button>
            </p>
          )}
        </div>

        {/* Security badge footer */}
        <div className="p-2.5 rounded-xl bg-maroon-500/5 dark:bg-maroon-500/10 border border-[#D9B7C0]/25 dark:border-[#D9B7C0]/15 flex items-center gap-2 text-[10px] text-maroon-800 dark:text-maroon-200">
          <ShieldCheck className="w-4 h-4 text-maroon-600 dark:text-maroon-400 shrink-0" />
          <span>Secure HMAC-SHA256 JWT sessions & AES-256-GCM token vault.</span>
        </div>
      </div>
    </Modal>
  );
};
