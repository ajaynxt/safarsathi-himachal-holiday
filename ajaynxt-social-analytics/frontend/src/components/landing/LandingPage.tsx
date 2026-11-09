import React, { useState } from 'react';
import {
  TrendingUp,
  ShieldCheck,
  Building2,
  Check,
  ArrowRight,
  Sparkles,
  Zap,
  BarChart3,
  Lock,
  Layers,
  ChevronDown,
  Globe,
  Radio,
  Eye,
  Server,
  Compass,
  CheckCircle2
} from 'lucide-react';
import { InstagramIcon } from '../common/InstagramIcon';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';

interface LandingPageProps {
  onEnterApp: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onEnterApp }) => {
  const { setOpenAuthModal, setAuthModalMode } = useAuth();
  const { theme, toggleTheme } = useTheme();

  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

  const plans = [
    {
      name: 'Starter Creator',
      price: billingCycle === 'monthly' ? '₹499' : '₹399',
      period: '/month',
      desc: 'For individual creators and solo brands scaling their social and web presence.',
      features: [
        '1 Instagram Professional Account',
        'Google Analytics 4 Property Sync',
        'Metricool-style Instagram Evolution curves',
        'Reels & Stories performance tracking',
        '30-day historical analytics cache',
        'Export Executive PDF Reports',
      ],
      cta: 'Start 14-Day Free Trial',
      highlight: false,
    },
    {
      name: 'Pro Agency',
      price: billingCycle === 'monthly' ? '₹1,499' : '₹1,199',
      period: '/month',
      desc: 'Designed for digital agencies managing multiple client brands with isolated workspaces.',
      features: [
        'Up to 5 Instagram Professional Accounts',
        'Meta Ads (Campaigns, Ad Sets & Ads) ROI',
        'Google Analytics 4 & UTM Attribution',
        'Isolated Multi-Tenant Workspaces',
        'Team Member role delegation (Admin / Member)',
        '90-day historical analytics cache',
        'Custom report branding & white-labeling',
      ],
      cta: 'Scale Your Agency',
      highlight: true,
    },
    {
      name: 'Enterprise Scale',
      price: billingCycle === 'monthly' ? '₹3,999' : '₹3,299',
      period: '/month',
      desc: 'High-volume agencies and global brands requiring custom connectors and audit controls.',
      features: [
        'All 17 Social & Ads Platform Connectors',
        'Unlimited Workspaces & Brand Accounts',
        'Sub-second Cloud Run dedicated execution',
        'Zero-knowledge AES-256-GCM token vault',
        'Audit logs & Firestore security enforcement',
        'Dedicated account manager in Mumbai',
      ],
      cta: 'Contact Enterprise',
      highlight: false,
    },
  ];

  const faqs = [
    {
      q: 'How does AJAYNXT connect to Instagram, Meta Ads & Google Analytics?',
      a: 'We use official OAuth 2.0 and Meta Graph API v21.0 protocols. We never ask for passwords, never scrape websites, and never store plaintext tokens. All credentials are encrypted with AES-256-GCM on Google Cloud Mumbai.',
    },
    {
      q: 'What makes the Evolution dashboard special?',
      a: 'Inspired by Metricool’s acclaimed analytics architecture, AJAYNXT visualizes your true net follower velocity, organic reach curves, and interaction ratios across Posts, Reels, and Stories in one synchronized, beautiful timeline.',
    },
    {
      q: 'How does workspace isolation protect client data?',
      a: 'Each workspace is an isolated tenant partition in Google Cloud Firestore. Users invited to Workspace A can never view, query, or inspect data from Workspace B. Role-based rules enforce authorization on every API call.',
    },
    {
      q: 'Which 17 platforms are supported?',
      a: '12 Organic Social platforms (Instagram, Facebook Pages, YouTube, TikTok, LinkedIn, X/Twitter, Pinterest, Threads, Snapchat, Twitch, Bluesky, Reddit) and 5 Ads & Web properties (Meta Ads, Google Ads, GA4, Google Business Profile, WhatsApp Business).',
    },
  ];

  return (
    <div className="min-h-screen bg-[#F7F1F2] dark:bg-[#130308] text-[#25171C] dark:text-[#FAF3F5] selection:bg-maroon-600 selection:text-white relative overflow-x-hidden font-sans">
      {/* Ambient Apple-style Liquid Glass Glows */}
      <div className="fixed top-[-10%] right-[-10%] w-[600px] h-[600px] bg-gradient-to-br from-[#64152C]/15 via-[#8A304A]/10 to-transparent rounded-full blur-3xl pointer-events-none z-0" />
      <div className="fixed top-[40%] left-[-15%] w-[600px] h-[600px] bg-gradient-to-tr from-[#3B0A19]/15 via-[#D9B7C0]/10 to-transparent rounded-full blur-3xl pointer-events-none z-0" />

      {/* Navigation Header */}
      <header className="sticky top-0 z-40 glass-panel border-b border-[#D9B7C0]/35 dark:border-[#D9B7C0]/15">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-2xl bg-gradient-to-br from-[#3B0A19] via-[#64152C] to-[#8A304A] flex items-center justify-center text-[#FAF3F5] font-extrabold text-sm shadow-glass-maroon border border-[#D9B7C0]/30">
              A
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-base tracking-tight text-[#25171C] dark:text-[#FAF3F5]">
                AJAYNXT
              </span>
              <span className="text-[9px] font-semibold text-[#8A304A] dark:text-[#D9B7C0] tracking-wider uppercase">
                Marketing Analytics
              </span>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-xs font-semibold text-[#25171C]/80 dark:text-[#FAF3F5]/80">
            <a href="#features" className="hover:text-maroon-700 dark:hover:text-maroon-300 transition">Features</a>
            <a href="#evolution" className="hover:text-maroon-700 dark:hover:text-maroon-300 transition">Metricool Evolution</a>
            <a href="#connectors" className="hover:text-maroon-700 dark:hover:text-maroon-300 transition">17 Platforms</a>
            <a href="#pricing" className="hover:text-maroon-700 dark:hover:text-maroon-300 transition">Pricing</a>
            <a href="#faq" className="hover:text-maroon-700 dark:hover:text-maroon-300 transition">FAQ</a>
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                setAuthModalMode('login');
                setOpenAuthModal(true);
              }}
              className="text-xs font-bold text-[#25171C] dark:text-[#FAF3F5] hover:text-maroon-700 px-3 py-1.5 transition"
            >
              Sign In
            </button>
            <button
              onClick={onEnterApp}
              className="px-4 py-2 text-xs font-bold btn-maroon rounded-xl flex items-center gap-1.5 shadow-glass-maroon"
            >
              <span>Launch App</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-20 pb-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center z-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-card text-xs font-bold text-maroon-800 dark:text-maroon-200 mb-8 border border-maroon-300/35">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          <span>Apple Liquid Glass Design System • AJAYNXT Maroon Identity</span>
        </div>

        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight max-w-5xl mx-auto leading-[1.1] text-[#25171C] dark:text-[#FAF3F5]">
          The Premium Analytics Suite for{' '}
          <span className="bg-gradient-to-r from-[#64152C] via-[#8A304A] to-amber-600 bg-clip-text text-transparent">
            Modern Marketing Agencies
          </span>
        </h1>

        <p className="mt-6 text-sm sm:text-base lg:text-lg text-[#8A6570] dark:text-[#D9B7C0] max-w-2xl mx-auto leading-relaxed font-medium">
          Multi-tenant social & marketing intelligence inspired by Metricool’s Evolution dashboard. Unify Instagram Organic, Meta Ads, and Google Analytics 4 in a high-end frosted glass cockpit.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={onEnterApp}
            className="px-7 py-3 text-sm font-bold btn-maroon rounded-2xl flex items-center gap-2.5 shadow-xl shadow-maroon-700/25 transition active:scale-[0.98]"
          >
            <span>Explore Live Dashboard</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          <button
            onClick={() => {
              setAuthModalMode('signup');
              setOpenAuthModal(true);
            }}
            className="px-7 py-3 text-sm font-bold glass-card rounded-2xl text-[#25171C] dark:text-[#FAF3F5] hover:text-maroon-700 border border-[#D9B7C0]/40 transition"
          >
            Create Free Workspace
          </button>
        </div>

        {/* Live Liquid Glass Dashboard Preview Card */}
        <div className="mt-16 max-w-5xl mx-auto glass-panel rounded-3xl p-4 sm:p-6 shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/90 dark:via-maroon-300/40 to-transparent pointer-events-none" />

          {/* Window Chrome */}
          <div className="flex items-center justify-between pb-4 border-b border-[#D9B7C0]/30 dark:border-[#D9B7C0]/15 mb-6 text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-rose-400/80"></span>
              <span className="w-3 h-3 rounded-full bg-amber-400/80"></span>
              <span className="w-3 h-3 rounded-full bg-emerald-400/80"></span>
              <span className="ml-2 font-mono text-[11px] text-slate-500 dark:text-maroon-300 font-medium">
                https://app.ajaynxt.com/analytics/unified
              </span>
            </div>
            <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
              GCP Mumbai • asia-south1
            </span>
          </div>

          {/* Interactive Metric Preview Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 text-left mb-6">
            <div className="glass-card rounded-2xl p-4">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                Total Ad Spend
              </span>
              <p className="text-xl sm:text-2xl font-black text-[#25171C] dark:text-[#FAF3F5]">
                ₹48,250
              </p>
              <span className="text-[10px] text-emerald-600 font-bold">
                ROAS: 4.88x
              </span>
            </div>
            <div className="glass-card rounded-2xl p-4">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                Instagram Reach
              </span>
              <p className="text-xl sm:text-2xl font-black text-[#25171C] dark:text-[#FAF3F5]">
                1.42M
              </p>
              <span className="text-[10px] text-emerald-600 font-bold">
                +18.4% vs last mo
              </span>
            </div>
            <div className="glass-card rounded-2xl p-4">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                GA4 Sessions
              </span>
              <p className="text-xl sm:text-2xl font-black text-[#25171C] dark:text-[#FAF3F5]">
                84,210
              </p>
              <span className="text-[10px] text-maroon-600 font-bold">
                68.4% Engaged
              </span>
            </div>
            <div className="glass-card rounded-2xl p-4">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                Attributed Revenue
              </span>
              <p className="text-xl sm:text-2xl font-black text-[#25171C] dark:text-[#FAF3F5]">
                ₹2,35,400
              </p>
              <span className="text-[10px] text-emerald-600 font-bold">
                542 Purchases
              </span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-gradient-to-r from-maroon-900/5 via-maroon-600/5 to-amber-500/5 border border-[#D9B7C0]/30 text-xs flex items-center justify-between text-left">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-maroon-600 text-white font-bold">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <p className="font-bold text-[#25171C] dark:text-[#FAF3F5]">
                  Live Metricool Evolution Clone Loaded
                </p>
                <p className="text-[11px] text-[#8A6570] dark:text-[#D9B7C0]">
                  Deep follower growth curves, Reels viral analytics, Stories completion, and Best Time to Post heatmap.
                </p>
              </div>
            </div>
            <button
              onClick={onEnterApp}
              className="px-4 py-2 text-xs font-bold btn-maroon rounded-xl shrink-0"
            >
              Open Live View
            </button>
          </div>
        </div>
      </section>

      {/* 17 Platforms Showcase Strip */}
      <section id="connectors" className="py-12 border-y border-[#D9B7C0]/35 dark:border-[#D9B7C0]/15 bg-white/40 dark:bg-[#1A050E]/40 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xs font-bold text-slate-400 dark:text-maroon-300 uppercase tracking-widest mb-6">
            Connected Across 17 Leading Social Networks, Ad Platforms & Analytics Engines
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            {[
              'Instagram', 'Facebook', 'YouTube', 'TikTok', 'LinkedIn', 'X (Twitter)',
              'Pinterest', 'Threads', 'Snapchat', 'Twitch', 'Bluesky', 'Reddit',
              'Meta Ads', 'Google Ads', 'GA4', 'Google Business', 'WhatsApp Business'
            ].map((name) => (
              <span
                key={name}
                className="glass-card px-3.5 py-1.5 rounded-full text-xs font-semibold text-[#25171C] dark:text-[#FAF3F5] border border-[#D9B7C0]/35"
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Section */}
      <section id="features" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-maroon-500/10 text-maroon-700 dark:text-maroon-300 border border-maroon-300/30 uppercase tracking-wider">
            Architecture Highlights
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-[#25171C] dark:text-[#FAF3F5] mt-3">
            Engineered for Precision, Speed, and Compliance
          </h2>
          <p className="mt-3 text-xs sm:text-sm text-[#8A6570] dark:text-[#D9B7C0] leading-relaxed">
            Every feature is grounded in official platform documentation and verified serverless isolation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-card rounded-3xl p-6 relative overflow-hidden">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#64152C] to-[#8A304A] text-white flex items-center justify-center mb-4 shadow-sm">
              <TrendingUp className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-[#25171C] dark:text-[#FAF3F5] mb-2">
              Metricool Evolution Clone
            </h3>
            <p className="text-xs text-[#8A6570] dark:text-[#D9B7C0] leading-relaxed">
              Mirroring Metricool's renowned Instagram dashboard architecture with Community Growth, Demographics, Posts, Reels, Stories, and Best Time to Post heatmaps.
            </p>
          </div>

          <div className="glass-card rounded-3xl p-6 relative overflow-hidden">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#64152C] to-[#8A304A] text-white flex items-center justify-center mb-4 shadow-sm">
              <Lock className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-[#25171C] dark:text-[#FAF3F5] mb-2">
              AES-256-GCM Vault & RBAC
            </h3>
            <p className="text-xs text-[#8A6570] dark:text-[#D9B7C0] leading-relaxed">
              Long-lived OAuth tokens are encrypted at rest with zero client-side exposure. Role-based access control enforces tenant boundaries across Owner, Admin, and Member roles.
            </p>
          </div>

          <div className="glass-card rounded-3xl p-6 relative overflow-hidden">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#64152C] to-[#8A304A] text-white flex items-center justify-center mb-4 shadow-sm">
              <Server className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-[#25171C] dark:text-[#FAF3F5] mb-2">
              Google Cloud Run Mumbai
            </h3>
            <p className="text-xs text-[#8A6570] dark:text-[#D9B7C0] leading-relaxed">
              Deployed in `asia-south1` with scale-to-zero serverless efficiency keeping monthly operational overhead under ₹1,000 INR while serving sub-second queries.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 bg-white/40 dark:bg-[#1A050E]/40 backdrop-blur-md border-t border-[#D9B7C0]/35 dark:border-[#D9B7C0]/15">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-black text-[#25171C] dark:text-[#FAF3F5]">
              Transparent Pricing Scaled for Growth
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-[#8A6570] dark:text-[#D9B7C0]">
              Every tier includes isolated workspaces, encrypted storage, and real-time syncing.
            </p>

            <div className="mt-6 inline-flex items-center glass-card p-1 rounded-2xl border border-[#D9B7C0]/35">
              <button
                onClick={() => setBillingCycle('monthly')}
                className={`px-4 py-1.5 text-xs font-bold rounded-xl transition ${
                  billingCycle === 'monthly'
                    ? 'btn-maroon text-white shadow-xs'
                    : 'text-[#25171C]/70 dark:text-[#FAF3F5]/70'
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingCycle('yearly')}
                className={`px-4 py-1.5 text-xs font-bold rounded-xl transition ${
                  billingCycle === 'yearly'
                    ? 'btn-maroon text-white shadow-xs'
                    : 'text-[#25171C]/70 dark:text-[#FAF3F5]/70'
                }`}
              >
                Annual (20% OFF)
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition relative ${
                  plan.highlight
                    ? 'glass-panel border-2 border-maroon-600 dark:border-maroon-400 shadow-glass-maroon'
                    : 'glass-card border border-[#D9B7C0]/35'
                }`}
              >
                {plan.highlight && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full btn-maroon text-white text-[10px] font-extrabold tracking-wider uppercase shadow-md">
                    Recommended For Agencies
                  </span>
                )}

                <div>
                  <h3 className="text-lg font-black text-[#25171C] dark:text-[#FAF3F5]">
                    {plan.name}
                  </h3>
                  <p className="text-xs text-[#8A6570] dark:text-[#D9B7C0] mt-1 mb-6">
                    {plan.desc}
                  </p>

                  <div className="flex items-baseline gap-1 mb-6">
                    <span className="text-4xl font-black text-[#25171C] dark:text-[#FAF3F5]">
                      {plan.price}
                    </span>
                    <span className="text-xs text-slate-400">{plan.period}</span>
                  </div>

                  <div className="space-y-3 pt-6 border-t border-[#D9B7C0]/30 dark:border-[#D9B7C0]/15 text-xs">
                    {plan.features.map((f, i) => (
                      <div key={i} className="flex items-center gap-2.5">
                        <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                        <span className="text-[#25171C]/80 dark:text-[#FAF3F5]/80 font-medium">{f}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={onEnterApp}
                  className={`mt-8 w-full py-2.5 rounded-xl text-xs font-bold transition ${
                    plan.highlight
                      ? 'btn-maroon text-white shadow-md'
                      : 'glass-card text-[#25171C] dark:text-[#FAF3F5] hover:text-maroon-700'
                  }`}
                >
                  {plan.cta}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl font-black text-center text-[#25171C] dark:text-[#FAF3F5] mb-12">
          Frequently Asked Questions
        </h2>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="glass-card rounded-2xl p-5 border border-[#D9B7C0]/35"
            >
              <h3 className="text-sm font-bold text-[#25171C] dark:text-[#FAF3F5] mb-2">
                {faq.q}
              </h3>
              <p className="text-xs text-[#8A6570] dark:text-[#D9B7C0] leading-relaxed">
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-[#D9B7C0]/35 dark:border-[#D9B7C0]/15 text-center text-xs text-slate-500 dark:text-maroon-300/80">
        <p>&copy; {new Date().getFullYear()} AJAYNXT Social Analytics. Built with Google Cloud Run & Official Meta Graph API v21.0.</p>
      </footer>
    </div>
  );
};
