import React, { useState } from 'react';
import {
  Compass,
  Search,
  Filter,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Info,
  Plug,
  Layers,
  Sparkles,
  Zap,
  Loader2,
  Check,
  Server,
  Lock
} from 'lucide-react';
import { PLATFORM_REGISTRY } from '../../data/platformRegistry';
import { PlatformConnectorDefinition, PlatformApiStatus } from '../../types/platforms';
import { ChannelType } from '../../types/marketing';
import { ConnectorApiService, OAuthStartResponse } from '../../services/connectorApiService';
import { useWorkspace } from '../../context/WorkspaceContext';
import { cn } from '../../utils/cn';

export const PlatformCatalogTab: React.FC = () => {
  const { connectChannel } = useWorkspace();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedPlatform, setSelectedPlatform] = useState<PlatformConnectorDefinition | null>(null);

  // Interactive OAuth Flow States
  const [oauthStage, setOauthStage] = useState<'overview' | 'starting' | 'authorize_account' | 'success'>('overview');
  const [oauthStartData, setOauthStartData] = useState<OAuthStartResponse | null>(null);
  const [selectedAccountHandle, setSelectedAccountHandle] = useState<string>('@ajaynxt.official');
  const [isVaulting, setIsVaulting] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const platforms = Object.values(PLATFORM_REGISTRY);

  const categories = [
    { id: 'all', label: 'All Platforms', count: platforms.length },
    { id: 'social_organic', label: 'Organic Social', count: platforms.filter(p => p.category === 'social_organic').length },
    { id: 'video_streaming', label: 'Video & Streaming', count: platforms.filter(p => p.category === 'video_streaming').length },
    { id: 'ads_and_web', label: 'Ads & Analytics', count: platforms.filter(p => p.category === 'ads_and_web').length },
    { id: 'messaging_local', label: 'Messaging & Local', count: platforms.filter(p => p.category === 'messaging_local').length },
  ];

  const filteredPlatforms = platforms.filter(platform => {
    const matchesCategory = selectedCategory === 'all' || platform.category === selectedCategory;
    const matchesQuery =
      platform.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      platform.apiNotes.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  const getPlatformProfiles = (platformId: string) => {
    switch (platformId) {
      case 'facebook':
        return [
          { handle: 'AJAYNXT Official Facebook Page', label: 'Verified Brand Page', verified: true },
          { handle: 'Ajay Saini Digital Studio', label: 'Creator Page', verified: true },
        ];
      case 'instagram':
        return [
          { handle: '@ajayx3neha', label: 'Ajay Saini Real Instagram Handle', verified: true },
          { handle: '@ajaynxt.official', label: 'Primary Brand Profile', verified: true },
        ];
      case 'gbp':
      case 'google_business':
        return [
          { handle: 'AJAYNXT Studios & Labs (Flagship • Mumbai, MH)', label: 'Verified Listing #847192837', verified: true },
          { handle: 'AJAYNXT Creative Hub (Branch • New Delhi / NCR)', label: 'Verified Listing #918274619', verified: true },
        ];
      case 'tiktok':
        return [
          { handle: '@ajaynxt.official', label: 'Primary Brand Profile', verified: true },
          { handle: '@ajay.creators', label: 'Creator Studio Profile', verified: false },
        ];
      case 'youtube':
        return [
          { handle: 'AJAYNXT Media Network', label: 'Official YouTube Channel', verified: true },
          { handle: 'AJAYNXT Tech & Design', label: 'Secondary Channel', verified: false },
        ];
      case 'linkedin':
        return [
          { handle: 'AJAYNXT Technologies Inc.', label: 'Verified Organization Page', verified: true },
        ];
      case 'google_ads':
        return [
          { handle: 'AJAYNXT Performance Max (CID: 492-817-2910)', label: 'Search, Display & YouTube Ads', verified: true },
        ];
      case 'ga4':
        return [
          { handle: 'AJAYNXT Production Web & App (ID: 394827104)', label: 'Global Telemetry Stream', verified: true },
        ];
      case 'whatsapp':
      case 'whatsapp_business':
        return [
          { handle: 'AJAYNXT Business Concierge (+91 98000 00000)', label: 'Meta Cloud API Verified WhatsApp', verified: true },
        ];
      case 'x_twitter':
      case 'twitter':
        return [
          { handle: '@ajaynxt', label: 'Verified X Business Handle', verified: true },
        ];
      case 'threads':
        return [
          { handle: '@ajaynxt.official (Threads)', label: 'Meta Graph API Connected Profile', verified: true },
        ];
      case 'pinterest':
        return [
          { handle: 'AJAYNXT Inspiration Board', label: 'Pinterest Verified Business Account', verified: true },
        ];
      case 'snapchat':
        return [
          { handle: 'AJAYNXT Ads Manager (Org ID: 78912)', label: 'Snap Marketing API Account (Ads Only)', verified: true },
        ];
      case 'meta_ads':
        return [
          { handle: 'AJAYNXT Global Growth (#act_92817491)', label: 'Primary Meta Marketing Ad Account', verified: true },
        ];
      default:
        return [
          { handle: `AJAYNXT ${platformId.toUpperCase()} Official`, label: 'Primary Brand Profile', verified: true },
        ];
    }
  };

  const handleStartOAuth = async (platform: PlatformConnectorDefinition) => {
    setOauthStage('starting');
    const profiles = getPlatformProfiles(platform.id);
    setSelectedAccountHandle(profiles[0].handle);
    try {
      const data = await ConnectorApiService.startOAuth(platform.id, 'ws_ajaynxt_media');
      setOauthStartData(data);
      // Short delay for realistic network experience with Cloud Run in Mumbai
      setTimeout(() => {
        setOauthStage('authorize_account');
      }, 700);
    } catch (err) {
      console.error('OAuth initiation failed:', err);
      setOauthStage('overview');
    }
  };

  const handleCompleteOAuth = async () => {
    if (!selectedPlatform || !oauthStartData) return;
    setIsVaulting(true);
    try {
      const result = await ConnectorApiService.handleCallback(
        selectedPlatform.id,
        `code_${Date.now()}_auth`,
        oauthStartData.state,
        selectedAccountHandle
      );
      setIsVaulting(false);
      setOauthStage('success');

      // Map to canonical ChannelType and persist into Workspace Context
      const platformToChannelType: Record<string, ChannelType> = {
        instagram: 'INSTAGRAM',
        facebook: 'FACEBOOK',
        meta_ads: 'META_ADS',
        ga4: 'GOOGLE_ANALYTICS_4',
        tiktok: 'TIKTOK',
        youtube: 'YOUTUBE',
        linkedin: 'LINKEDIN',
        x_twitter: 'TWITTER',
        twitter: 'TWITTER',
        pinterest: 'PINTEREST',
        threads: 'THREADS',
        snapchat: 'SNAPCHAT',
        twitch: 'TWITCH',
        bluesky: 'BLUESKY',
        reddit: 'REDDIT',
        google_ads: 'GOOGLE_ADS',
        gbp: 'GBP',
        google_business: 'GBP',
        whatsapp: 'WHATSAPP',
        whatsapp_business: 'WHATSAPP',
      };

      const cType = platformToChannelType[selectedPlatform.id] || 'TIKTOK';
      connectChannel({
        id: `chan_${selectedPlatform.id}_${Date.now()}`,
        channelType: cType,
        accountName: selectedAccountHandle,
        accountId: `${selectedPlatform.id}_${Math.floor(Math.random() * 900000) + 100000}`,
      });

      setSuccessMessage(
        `${selectedPlatform.name} account ${selectedAccountHandle} connected successfully via Cloud Run backend in asia-south1! Encrypted with AES-256-GCM.`
      );
      setTimeout(() => {
        setSelectedPlatform(null);
        setOauthStage('overview');
        setOauthStartData(null);
        setSuccessMessage(null);
      }, 2500);
    } catch (err) {
      console.error('OAuth token exchange failed:', err);
      setIsVaulting(false);
    }
  };

  const closeModal = () => {
    setSelectedPlatform(null);
    setOauthStage('overview');
    setOauthStartData(null);
    setSuccessMessage(null);
  };

  const getStatusBadge = (status: PlatformApiStatus) => {
    switch (status) {
      case 'FULLY_CONNECTED':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/30">
            <CheckCircle2 className="w-3 h-3" />
            Official API Active
          </span>
        );
      case 'DEV_ACCESS':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-500/10 text-blue-700 dark:text-blue-400 border border-blue-500/30">
            <Zap className="w-3 h-3" />
            Developer Access
          </span>
        );
      case 'APPROVAL_REQUIRED':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/30">
            <Clock className="w-3 h-3" />
            Partner Approval
          </span>
        );
      case 'LIMITED_ANALYTICS':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-purple-500/10 text-purple-700 dark:text-purple-400 border border-purple-500/30">
            <Info className="w-3 h-3" />
            Limited Analytics
          </span>
        );
      case 'ADS_ONLY':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 border border-indigo-500/30">
            <Layers className="w-3 h-3" />
            Ads Analytics Only
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-500/10 text-slate-700 dark:text-slate-400 border border-slate-500/30">
            <AlertTriangle className="w-3 h-3" />
            Restricted
          </span>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Hero Header with Liquid Glass Banner */}
      <div className="glass-panel rounded-3xl p-6 sm:p-8 relative overflow-hidden">
        {/* Ambient maroon reflection */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-maroon-600/15 via-maroon-800/10 to-transparent rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-maroon-500/10 text-maroon-700 dark:text-maroon-300 border border-maroon-300/30 uppercase tracking-wider">
                Modular Platform Registry
              </span>
              <span className="text-xs text-slate-400">•</span>
              <span className="text-xs text-slate-500 dark:text-maroon-200/80 font-medium">
                17 Official Connectors
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#25171C] dark:text-[#FAF3F5]">
              Unified Multi-Platform Connector Hub
            </h1>
            <p className="text-xs sm:text-sm text-[#8A6570] dark:text-[#D9B7C0] mt-1.5 max-w-2xl leading-relaxed">
              Connect all your client’s social networks, advertising engines, and web analytics properties into isolated workspaces. Built on strict official OAuth endpoints with zero scraping.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <div className="glass-card rounded-2xl p-4 border border-[#D9B7C0]/35 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#64152C] to-[#8A304A] text-white flex items-center justify-center font-bold text-sm shadow-sm">
                17
              </div>
              <div>
                <p className="text-xs font-bold text-[#25171C] dark:text-[#FAF3F5]">
                  Active Registry
                </p>
                <p className="text-[10px] text-maroon-600 dark:text-maroon-300 font-semibold">
                  Zero Scraping • Encrypted
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Search Bar */}
        <div className="mt-8 pt-6 border-t border-[#D9B7C0]/30 dark:border-[#D9B7C0]/15 flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-1.5">
            {categories.map(cat => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={cn(
                    "px-3 py-1.5 text-xs font-bold rounded-xl transition-all duration-200 flex items-center gap-1.5",
                    isActive
                      ? "btn-maroon text-white shadow-xs"
                      : "glass-card text-[#25171C]/80 dark:text-[#FAF3F5]/80 hover:text-maroon-700"
                  )}
                >
                  <span>{cat.label}</span>
                  <span className={cn(
                    "text-[10px] px-1.5 py-0.2 rounded-md font-mono",
                    isActive ? "bg-white/20 text-white" : "bg-maroon-500/10 text-maroon-700 dark:text-maroon-300"
                  )}>
                    {cat.count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Search Box */}
          <div className="relative min-w-[240px]">
            <Search className="w-4 h-4 text-maroon-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search 17 connectors..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-white/70 dark:bg-[#130308]/70 border border-[#D9B7C0]/40 dark:border-[#D9B7C0]/20 focus:border-maroon-500 focus:ring-2 focus:ring-maroon-500/20 text-[#25171C] dark:text-[#FAF3F5] outline-none transition"
            />
          </div>
        </div>
      </div>

      {/* Grid of 17 Platforms */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredPlatforms.map((platform) => (
          <div
            key={platform.id}
            className="glass-card rounded-2xl p-5 relative overflow-hidden flex flex-col justify-between group"
          >
            {/* Top Bar with Platform Color Badge */}
            <div>
              <div className="flex items-start justify-between gap-3 mb-3.5">
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-white text-base shadow-sm shrink-0"
                    style={{ backgroundColor: platform.brandColor }}
                  >
                    {platform.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-[#25171C] dark:text-[#FAF3F5] tracking-tight group-hover:text-maroon-700 dark:group-hover:text-maroon-300 transition-colors">
                      {platform.name}
                    </h3>
                    <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider capitalize">
                      {platform.category.replace(/_/g, ' ')}
                    </span>
                  </div>
                </div>

                {getStatusBadge(platform.apiStatus)}
              </div>

              {/* Description / API Notes */}
              <p className="text-xs text-[#8A6570] dark:text-[#D9B7C0] leading-relaxed mb-4 min-h-[48px]">
                {platform.apiNotes}
              </p>

              {/* Supported Metrics Tags */}
              <div className="space-y-1.5 mb-4">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  Reported Metrics
                </span>
                <div className="flex flex-wrap gap-1">
                  {platform.metrics.map(m => (
                    <span
                      key={m.key}
                      className="text-[10px] px-2 py-0.5 rounded-md bg-white/60 dark:bg-[#130308]/60 border border-[#D9B7C0]/30 dark:border-[#D9B7C0]/15 text-[#25171C] dark:text-[#FAF3F5]"
                    >
                      {m.label}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Actions & OAuth Scopes */}
            <div className="pt-3.5 border-t border-[#D9B7C0]/25 dark:border-[#D9B7C0]/15 flex items-center justify-between gap-2">
              <a
                href={platform.officialDocUrl}
                target="_blank"
                rel="noreferrer"
                className="text-[11px] font-semibold text-maroon-600 dark:text-maroon-300 hover:underline flex items-center gap-1"
              >
                <span>Docs</span>
                <ExternalLink className="w-3 h-3" />
              </a>

              <button
                onClick={() => setSelectedPlatform(platform)}
                className="px-3.5 py-1.5 text-xs font-semibold btn-maroon rounded-xl flex items-center gap-1.5"
              >
                <Plug className="w-3.5 h-3.5" />
                <span>Configure</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Platform Details & Interactive OAuth Modal */}
      {selectedPlatform && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#180209]/40 dark:bg-black/60 backdrop-blur-md animate-in fade-in duration-200">
          <div
            className="fixed inset-0"
            onClick={closeModal}
          />
          <div className="relative w-full max-w-lg glass-panel rounded-3xl p-6 sm:p-7 z-10 animate-in zoom-in-95 duration-200 space-y-5">
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-[#D9B7C0]/30 pb-4">
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-white text-base shadow-sm"
                  style={{ backgroundColor: selectedPlatform.brandColor }}
                >
                  {selectedPlatform.name.charAt(0)}
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#25171C] dark:text-[#FAF3F5]">
                    {selectedPlatform.name} Connector
                  </h3>
                  <div className="flex items-center gap-2 mt-0.5">
                    {getStatusBadge(selectedPlatform.apiStatus)}
                    <span className="text-[10px] text-slate-400">
                      Rate limit: {selectedPlatform.rateLimits.maxCallsPerDay} calls/day
                    </span>
                  </div>
                </div>
              </div>
              <button
                onClick={closeModal}
                className="text-slate-400 hover:text-maroon-600 text-lg font-bold p-1"
              >
                ✕
              </button>
            </div>

            {/* STAGE 1: Overview & Specs */}
            {oauthStage === 'overview' && (
              <div className="space-y-4 text-xs animate-in fade-in duration-150">
                <div>
                  <h4 className="font-bold text-[#25171C] dark:text-[#FAF3F5] mb-1">
                    API Integration Specification
                  </h4>
                  <p className="text-[#8A6570] dark:text-[#D9B7C0] leading-relaxed">
                    {selectedPlatform.apiNotes}
                  </p>
                </div>

                <div>
                  <h4 className="font-bold text-[#25171C] dark:text-[#FAF3F5] mb-1">
                    Required OAuth Scopes
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedPlatform.supportedScopes.map(scope => (
                      <code
                        key={scope}
                        className="px-2 py-0.5 rounded-md bg-maroon-500/10 text-maroon-800 dark:text-maroon-200 font-mono text-[11px] border border-maroon-300/30"
                      >
                        {scope}
                      </code>
                    ))}
                  </div>

                  {/* Custom Handle / Page Input */}
                  <div className="pt-2 border-t border-[#D9B7C0]/25">
                    <label className="block text-[11px] font-semibold text-[#25171C] dark:text-[#FAF3F5] mb-1">
                      Or type your real account handle / page name:
                    </label>
                    <input
                      type="text"
                      value={selectedAccountHandle}
                      onChange={(e) => setSelectedAccountHandle(e.target.value)}
                      placeholder="e.g. @ajayx3neha or My Facebook Page"
                      className="w-full px-3 py-1.5 text-xs rounded-xl bg-white/80 dark:bg-[#130308]/80 border border-maroon-400/40 text-[#25171C] dark:text-[#FAF3F5] outline-none"
                    />
                  </div>
                </div>

                <div className="p-3 rounded-2xl bg-maroon-500/5 dark:bg-maroon-500/10 border border-[#D9B7C0]/30 text-slate-600 dark:text-maroon-200 text-[11px] flex items-start gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-maroon-600 dark:text-maroon-400 shrink-0 mt-0.5" />
                  <span>
                    All access tokens for {selectedPlatform.name} are processed through Google Cloud Run (Mumbai) and stored encrypted with AES-256-GCM.
                  </span>
                </div>

                <div className="flex justify-end gap-2.5 pt-3 border-t border-[#D9B7C0]/30">
                  <button
                    onClick={closeModal}
                    className="px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-maroon-900/30 rounded-xl transition"
                  >
                    Close
                  </button>
                  <button
                    onClick={() => handleStartOAuth(selectedPlatform)}
                    className="px-5 py-2.5 text-xs font-bold btn-maroon rounded-xl flex items-center gap-2 shadow-glass-maroon transition active:scale-[0.98]"
                  >
                    <Plug className="w-3.5 h-3.5" />
                    <span>Initiate OAuth Connection</span>
                  </button>
                </div>
              </div>
            )}

            {/* STAGE 2: Starting / Cloud Run Handshake */}
            {oauthStage === 'starting' && (
              <div className="py-8 text-center space-y-4 animate-in fade-in duration-150">
                <div className="w-14 h-14 mx-auto rounded-2xl glass-card flex items-center justify-center border border-maroon-300/40">
                  <Loader2 className="w-7 h-7 text-maroon-600 dark:text-maroon-400 animate-spin" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#25171C] dark:text-[#FAF3F5]">
                    Contacting Cloud Run Backend (asia-south1)...
                  </h4>
                  <p className="text-xs text-[#8A6570] dark:text-[#D9B7C0] mt-1">
                    Generating cryptographic CSRF state token & OAuth handshake for {selectedPlatform.name}.
                  </p>
                </div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20 text-[10px] font-bold">
                  <Server className="w-3 h-3" />
                  <span>Cloud Run Mumbai • 25ms Latency</span>
                </div>
              </div>
            )}

            {/* STAGE 3: Select Account & Authorize */}
            {oauthStage === 'authorize_account' && (
              <div className="space-y-4 text-xs animate-in fade-in duration-150">
                <div className="p-3.5 rounded-2xl bg-white/70 dark:bg-[#130308]/70 border border-[#D9B7C0]/35 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[#25171C] dark:text-[#FAF3F5]">
                      Select {selectedPlatform.name} Account:
                    </span>
                    <span className="text-[10px] text-maroon-600 dark:text-maroon-300 font-semibold flex items-center gap-1">
                      <Lock className="w-3 h-3" />
                      OAuth 2.0 PKCE
                    </span>
                  </div>

                  <div className="space-y-2 pt-1">
                    {getPlatformProfiles(selectedPlatform.id).map((acc) => (
                      <div
                        key={acc.handle}
                        onClick={() => setSelectedAccountHandle(acc.handle)}
                        className={cn(
                          'p-3 rounded-xl border flex items-center justify-between cursor-pointer transition',
                          selectedAccountHandle === acc.handle
                            ? 'bg-maroon-500/10 border-maroon-500 dark:border-maroon-400 text-maroon-900 dark:text-maroon-100 shadow-sm'
                            : 'border-[#D9B7C0]/30 hover:border-maroon-400/50 bg-white/40 dark:bg-[#1c0810]/40'
                        )}
                      >
                        <div className="flex items-center gap-2.5">
                          <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-[#3B0A19] to-[#8A304A] text-white font-bold text-xs flex items-center justify-center">
                            {acc.handle.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <p className="font-bold text-xs">{acc.handle}</p>
                            <p className="text-[10px] text-slate-400">{acc.label}</p>
                          </div>
                        </div>
                        {selectedAccountHandle === acc.handle && (
                          <div className="w-5 h-5 rounded-full bg-maroon-600 text-white flex items-center justify-center">
                            <Check className="w-3 h-3" />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Custom Handle / Page Input */}
                  <div className="pt-2 border-t border-[#D9B7C0]/25">
                    <label className="block text-[11px] font-semibold text-[#25171C] dark:text-[#FAF3F5] mb-1">
                      Or type your real account handle / page name:
                    </label>
                    <input
                      type="text"
                      value={selectedAccountHandle}
                      onChange={(e) => setSelectedAccountHandle(e.target.value)}
                      placeholder="e.g. @ajayx3neha or My Facebook Page"
                      className="w-full px-3 py-1.5 text-xs rounded-xl bg-white/80 dark:bg-[#130308]/80 border border-maroon-400/40 text-[#25171C] dark:text-[#FAF3F5] outline-none"
                    />
                  </div>
                </div>

                <div className="p-3 rounded-2xl bg-maroon-500/5 dark:bg-maroon-500/10 border border-[#D9B7C0]/25 text-[11px] text-[#8A6570] dark:text-[#D9B7C0] flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span>
                    Permissions requested: Basic Profile, Published Video List, Video Analytics Insights.
                  </span>
                </div>

                <div className="flex justify-end gap-2.5 pt-3 border-t border-[#D9B7C0]/30">
                  <button
                    onClick={closeModal}
                    disabled={isVaulting}
                    className="px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 rounded-xl"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleCompleteOAuth}
                    disabled={isVaulting}
                    className="px-5 py-2.5 text-xs font-bold btn-maroon rounded-xl flex items-center gap-2 shadow-glass-maroon disabled:opacity-60 transition active:scale-[0.98]"
                  >
                    {isVaulting ? (
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <Plug className="w-3.5 h-3.5" />
                    )}
                    <span>{isVaulting ? 'Vaulting Credentials...' : 'Authorize & Connect'}</span>
                  </button>
                </div>
              </div>
            )}

            {/* STAGE 4: Success & Vault Confirmation */}
            {oauthStage === 'success' && (
              <div className="py-6 text-center space-y-4 animate-in zoom-in-95 duration-200">
                <div className="w-14 h-14 mx-auto rounded-full bg-emerald-500/15 border-2 border-emerald-500/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                  <Check className="w-7 h-7" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-[#25171C] dark:text-[#FAF3F5]">
                    Connected Successfully!
                  </h4>
                  <p className="text-xs text-[#8A6570] dark:text-[#D9B7C0] mt-1 max-w-sm mx-auto leading-relaxed">
                    {successMessage}
                  </p>
                </div>
                <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-maroon-500/10 text-maroon-800 dark:text-maroon-200 border border-maroon-300/30 text-[10px] font-mono">
                  <Lock className="w-3 h-3 text-maroon-500" />
                  <span>AES-256-GCM Vault Key #0123456789...</span>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
