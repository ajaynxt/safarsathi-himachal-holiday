import React, { useState, useMemo } from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import {
  Activity,
  Download,
  RefreshCw,
  CheckCircle2,
  Calendar,
  ExternalLink,
  Users,
  Eye,
  TrendingUp,
  Heart,
  MessageCircle,
  Share2,
  Sparkles,
  ShieldCheck,
  Film,
  MapPin,
  Phone,
  Navigation,
  Globe,
  Clock,
  ArrowUpRight,
  Filter,
  Check
} from 'lucide-react';
import { InstagramIcon } from '../common/InstagramIcon';
import { getPlatformSvg } from '../common/SocialIcons';
import { MetricCard } from '../common/MetricCard';
import { useWorkspace } from '../../context/WorkspaceContext';
import { ChannelType, ChannelConnection } from '../../types/marketing';
import { formatNumber, formatShortDate } from '../../utils/formatters';
import { cn } from '../../utils/cn';

interface PlatformChannelReportTabProps {
  initialChannelType?: ChannelType;
  onNavigateToTab?: (tab: string) => void;
}

export const PlatformChannelReportTab: React.FC<PlatformChannelReportTabProps> = ({
  initialChannelType,
  onNavigateToTab,
}) => {
  const { channels, refreshChannel } = useWorkspace();
  const [selectedChannelId, setSelectedChannelId] = useState<string>(() => {
    if (initialChannelType) {
      const match = channels.find(c => c.channelType === initialChannelType);
      if (match) return match.id;
    }
    return channels[0]?.id || 'conn_ig_pro_01';
  });

  const [dateRange, setDateRange] = useState<'7d' | '30d' | '90d'>('30d');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [refreshSuccess, setRefreshSuccess] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [exportComplete, setExportComplete] = useState(false);

  const activeChannel = useMemo(() => {
    return channels.find(c => c.id === selectedChannelId) || channels[0];
  }, [channels, selectedChannelId]);

  const handleRefresh = async () => {
    if (!activeChannel) return;
    setIsRefreshing(true);
    await refreshChannel(activeChannel.id);
    setIsRefreshing(false);
    setRefreshSuccess(true);
    setTimeout(() => setRefreshSuccess(false), 3000);
  };

  const handleExport = (format: 'pdf' | 'csv') => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      setExportComplete(true);
      setTimeout(() => setExportComplete(false), 4000);
    }, 1200);
  };

  // Generate dynamic 30-day timeline series for the active channel
  const timelineData = useMemo(() => {
    const days = dateRange === '7d' ? 7 : dateRange === '90d' ? 90 : 30;
    const items = [];
    const now = new Date();

    for (let i = days - 1; i >= 0; i--) {
      const d = new Date(now);
      d.setDate(d.getDate() - i);
      const dateStr = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

      // Varied realistic metrics based on platform
      switch (activeChannel?.channelType) {
        case 'TIKTOK':
          items.push({
            date: dateStr,
            views: Math.floor(12000 + Math.sin(i / 3) * 4500 + Math.random() * 2000),
            likes: Math.floor(1800 + Math.sin(i / 3) * 600 + Math.random() * 300),
            shares: Math.floor(320 + Math.sin(i / 3) * 120 + Math.random() * 80),
          });
          break;
        case 'YOUTUBE':
          items.push({
            date: dateStr,
            views: Math.floor(6500 + Math.sin(i / 4) * 2000 + Math.random() * 1200),
            subscribers: Math.floor(120 + Math.sin(i / 5) * 40 + Math.random() * 25),
            watchHours: Math.floor(420 + Math.sin(i / 4) * 140 + Math.random() * 60),
          });
          break;
        case 'GBP':
          items.push({
            date: dateStr,
            searches: Math.floor(380 + Math.sin(i / 3) * 120 + Math.random() * 60),
            views: Math.floor(520 + Math.sin(i / 3) * 180 + Math.random() * 90),
            actions: Math.floor(95 + Math.sin(i / 3) * 35 + Math.random() * 20),
          });
          break;
        case 'LINKEDIN':
          items.push({
            date: dateStr,
            impressions: Math.floor(2400 + Math.sin(i / 4) * 900 + Math.random() * 400),
            clicks: Math.floor(140 + Math.sin(i / 4) * 50 + Math.random() * 30),
            followers: Math.floor(45 + Math.sin(i / 6) * 15 + Math.random() * 10),
          });
          break;
        case 'WHATSAPP':
          items.push({
            date: dateStr,
            conversations: Math.floor(52 + Math.sin(i / 3) * 20 + Math.random() * 10),
            messages: Math.floor(480 + Math.sin(i / 3) * 160 + Math.random() * 80),
          });
          break;
        case 'GOOGLE_ADS':
          items.push({
            date: dateStr,
            spend: Math.floor(4500 + Math.sin(i / 4) * 1500 + Math.random() * 800),
            conversions: Math.floor(25 + Math.sin(i / 4) * 9 + Math.random() * 5),
            clicks: Math.floor(620 + Math.sin(i / 4) * 210 + Math.random() * 90),
          });
          break;
        default:
          items.push({
            date: dateStr,
            reach: Math.floor(5400 + Math.sin(i / 4) * 1800 + Math.random() * 900),
            engagement: Math.floor(820 + Math.sin(i / 4) * 260 + Math.random() * 120),
          });
          break;
      }
    }
    return items;
  }, [dateRange, activeChannel?.channelType]);

  const getPlatformIcon = (type: ChannelType) => {
    return getPlatformSvg(type, 'w-4 h-4');
  };

  return (
    <div className="space-y-6">
      {/* Top Banner: Channel Selector Pills */}
      <div className="glass-panel rounded-3xl p-4 sm:p-5 shadow-sm space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-maroon-700 dark:text-maroon-300">
              Multi-Channel Report Explorer
            </span>
            <h1 className="text-xl sm:text-2xl font-black text-[#25171C] dark:text-[#FAF3F5] tracking-tight">
              Individual Platform Reports
            </h1>
          </div>

          {/* Date Filter & Export */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center glass-card p-1 rounded-2xl border border-[#D9B7C0]/35">
              {(['7d', '30d', '90d'] as const).map((r) => (
                <button
                  key={r}
                  onClick={() => setDateRange(r)}
                  className={cn(
                    "px-3 py-1 text-xs font-bold rounded-xl transition",
                    dateRange === r
                      ? "btn-maroon text-white shadow-xs"
                      : "text-[#25171C]/70 dark:text-[#FAF3F5]/70 hover:text-maroon-700"
                  )}
                >
                  {r.toUpperCase()}
                </button>
              ))}
            </div>

            <button
              onClick={() => handleExport('pdf')}
              disabled={isExporting}
              className="px-3.5 py-1.5 text-xs font-bold btn-maroon rounded-xl flex items-center gap-1.5 shadow-glass-maroon"
            >
              {exportComplete ? <Check className="w-3.5 h-3.5" /> : <Download className="w-3.5 h-3.5" />}
              <span>{isExporting ? 'Generating...' : exportComplete ? 'Downloaded!' : 'Export PDF'}</span>
            </button>
          </div>
        </div>

        {/* Connected Channels Switcher Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1 scrollbar-none">
          {channels.map((ch) => {
            const isSelected = ch.id === selectedChannelId;
            return (
              <button
                key={ch.id}
                onClick={() => setSelectedChannelId(ch.id)}
                className={cn(
                  "flex items-center gap-2 px-3.5 py-2 rounded-2xl border text-xs font-bold whitespace-nowrap transition-all duration-200",
                  isSelected
                    ? "btn-maroon text-white shadow-glass-maroon border-maroon-700"
                    : "glass-card text-[#25171C]/80 dark:text-[#FAF3F5]/80 hover:bg-white/80 dark:hover:bg-[#200810]/80 border-[#D9B7C0]/35"
                )}
              >
                <div className={cn("p-1 rounded-lg shrink-0", isSelected ? "bg-white/20 text-white" : "bg-maroon-500/10")}>
                  {getPlatformIcon(ch.channelType)}
                </div>
                <span>{ch.accountName}</span>
                {ch.status === 'CONNECTED' && (
                  <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0 animate-pulse" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Channel Identity Card */}
      {activeChannel && (
        <div className="glass-card rounded-3xl p-6 border border-[#D9B7C0]/35 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#64152C] via-[#8A304A] to-amber-500 p-0.5 shadow-md shadow-maroon-600/20 shrink-0">
              <div className="w-full h-full rounded-[14px] bg-white dark:bg-[#1f070f] flex items-center justify-center">
                {getPlatformIcon(activeChannel.channelType)}
              </div>
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2.5">
                <h2 className="text-lg font-extrabold text-[#25171C] dark:text-[#FAF3F5]">
                  {activeChannel.accountName}
                </h2>
                <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" />
                  Live Sync Active
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-maroon-500/10 text-maroon-800 dark:text-maroon-300">
                  {activeChannel.accountId}
                </span>
              </div>
              <p className="text-xs text-[#8A6570] dark:text-[#D9B7C0] mt-1 flex items-center gap-2">
                <Clock className="w-3.5 h-3.5" />
                <span>Last Synced: {new Date(activeChannel.lastSyncedAt).toLocaleTimeString()}</span>
                <span>•</span>
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>AES-256 Encrypted Token</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="px-4 py-2 text-xs font-bold glass-card text-[#25171C] dark:text-[#FAF3F5] rounded-xl flex items-center gap-1.5 hover:text-maroon-700 transition"
            >
              <RefreshCw className={cn("w-3.5 h-3.5", isRefreshing && "animate-spin text-maroon-600")} />
              <span>{isRefreshing ? 'Syncing...' : refreshSuccess ? 'Synced!' : 'Sync Channel'}</span>
            </button>

            {/* If Instagram, Meta Ads or GA4, provide instant deep-dive jump button */}
            {activeChannel.channelType === 'INSTAGRAM' && onNavigateToTab && (
              <button
                onClick={() => onNavigateToTab('instagram_evolution')}
                className="px-4 py-2 text-xs font-bold btn-maroon rounded-xl flex items-center gap-1.5 shadow-glass-maroon"
              >
                <span>Metricool Evolution View</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            )}
            {activeChannel.channelType === 'META_ADS' && onNavigateToTab && (
              <button
                onClick={() => onNavigateToTab('meta_ads')}
                className="px-4 py-2 text-xs font-bold btn-maroon rounded-xl flex items-center gap-1.5 shadow-glass-maroon"
              >
                <span>Deep Meta Ads View</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            )}
            {activeChannel.channelType === 'GOOGLE_ANALYTICS_4' && onNavigateToTab && (
              <button
                onClick={() => onNavigateToTab('google_analytics')}
                className="px-4 py-2 text-xs font-bold btn-maroon rounded-xl flex items-center gap-1.5 shadow-glass-maroon"
              >
                <span>Deep GA4 View</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      )}

      {/* ---------------- 1. TIKTOK DEDICATED REPORT ---------------- */}
      {activeChannel?.channelType === 'TIKTOK' && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <MetricCard
              title="TikTok Followers"
              value="54,200"
              change={14.2}
              icon={Users}
              subtitle="vs. previous 30 days"
            />
            <MetricCard
              title="Total Video Plays"
              value="482,900"
              change={28.4}
              icon={Eye}
              subtitle="Total impressions across feed"
            />
            <MetricCard
              title="Total Likes & Hearts"
              value="68,400"
              change={18.5}
              icon={Heart}
              subtitle="64.2 likes per 100 views"
            />
            <MetricCard
              title="Engagement Rate"
              value="4.88%"
              change={6.2}
              icon={TrendingUp}
              subtitle="Shares, comments and duets"
            />
          </div>

          {/* TikTok Chart */}
          <div className="glass-panel rounded-3xl p-6 shadow-sm">
            <h3 className="text-sm font-bold text-[#25171C] dark:text-[#FAF3F5] mb-1">
              TikTok Video Views & Likes Evolution
            </h3>
            <p className="text-xs text-[#8A6570] dark:text-[#D9B7C0] mb-6">
              Track daily video playback volume and viewer engagement spikes.
            </p>
            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={timelineData}>
                  <defs>
                    <linearGradient id="colorTikTokViews" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#64152C" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#64152C" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#D9B7C0" opacity={0.2} />
                  <XAxis dataKey="date" stroke="#8A6570" fontSize={11} tickLine={false} />
                  <YAxis stroke="#8A6570" fontSize={11} tickLine={false} />
                  <Tooltip />
                  <Area type="monotone" dataKey="views" stroke="#64152C" strokeWidth={2.5} fillOpacity={1} fill="url(#colorTikTokViews)" name="Video Views" />
                  <Line type="monotone" dataKey="likes" stroke="#E11D48" strokeWidth={2} dot={false} name="Likes" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Top TikToks Table */}
          <div className="glass-panel rounded-3xl p-6 shadow-sm">
            <h3 className="text-base font-bold text-[#25171C] dark:text-[#FAF3F5] mb-4">
              Top Trending TikTok Videos
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-[#D9B7C0]/35 text-[#8A6570] dark:text-[#D9B7C0]">
                    <th className="pb-3 font-bold">Video Hook & Sound</th>
                    <th className="pb-3 font-bold text-right">Plays</th>
                    <th className="pb-3 font-bold text-right">Likes</th>
                    <th className="pb-3 font-bold text-right">Comments</th>
                    <th className="pb-3 font-bold text-right">Shares</th>
                    <th className="pb-3 font-bold text-right">Completion Rate</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#D9B7C0]/20">
                  {[
                    { hook: 'Hidden Snow Village in Spiti you must visit', sound: 'Original Audio - Mountain Echoes', plays: 184200, likes: 28400, comments: 1420, shares: 6420, completion: '72.4%' },
                    { hook: '3 Luxury Stays in Manali under ₹5,000', sound: 'Trending Acoustic Travel Vibes', plays: 124500, likes: 19800, comments: 940, shares: 3840, completion: '68.1%' },
                    { hook: 'What ₹15,000 gets you in Himachal', sound: 'Lofi Himachal Beats', plays: 98400, likes: 14200, comments: 680, shares: 2190, completion: '61.5%' },
                  ].map((row, idx) => (
                    <tr key={idx} className="hover:bg-maroon-500/5 transition">
                      <td className="py-3.5 pr-4">
                        <div className="font-bold text-[#25171C] dark:text-[#FAF3F5]">{row.hook}</div>
                        <div className="text-[11px] text-[#8A6570] dark:text-[#D9B7C0]">{row.sound}</div>
                      </td>
                      <td className="py-3.5 text-right font-mono font-bold">{formatNumber(row.plays)}</td>
                      <td className="py-3.5 text-right font-mono">{formatNumber(row.likes)}</td>
                      <td className="py-3.5 text-right font-mono">{formatNumber(row.comments)}</td>
                      <td className="py-3.5 text-right font-mono">{formatNumber(row.shares)}</td>
                      <td className="py-3.5 text-right font-bold text-emerald-600">{row.completion}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ---------------- 2. GOOGLE BUSINESS PROFILE (GBP) REPORT ---------------- */}
      {activeChannel?.channelType === 'GBP' && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <MetricCard
              title="Customer Actions"
              value="3,840"
              change={19.2}
              icon={Activity}
              subtitle="Calls, directions & visits"
            />
            <MetricCard
              title="Total Search & Maps Views"
              value="14,200"
              change={24.1}
              icon={Eye}
              subtitle="Local discovery queries"
            />
            <MetricCard
              title="Website Clicks"
              value="1,840"
              change={16.5}
              icon={Globe}
              subtitle="Direct visitors to booking"
            />
            <MetricCard
              title="Direction Requests"
              value="1,180"
              change={21.4}
              icon={Navigation}
              subtitle="Navigation launches"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Search vs Maps Timeline */}
            <div className="lg:col-span-2 glass-panel rounded-3xl p-6 shadow-sm">
              <h3 className="text-sm font-bold text-[#25171C] dark:text-[#FAF3F5] mb-1">
                Local Search & Maps Discovery
              </h3>
              <p className="text-xs text-[#8A6570] dark:text-[#D9B7C0] mb-6">
                Customer interactions on Google Search and Google Maps.
              </p>
              <div className="h-72 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={timelineData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#D9B7C0" opacity={0.2} />
                    <XAxis dataKey="date" stroke="#8A6570" fontSize={11} tickLine={false} />
                    <YAxis stroke="#8A6570" fontSize={11} tickLine={false} />
                    <Tooltip />
                    <Bar dataKey="views" fill="#64152C" radius={[4, 4, 0, 0]} name="Maps Views" />
                    <Bar dataKey="searches" fill="#D9B7C0" radius={[4, 4, 0, 0]} name="Search Queries" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Customer Rating & Breakdown */}
            <div className="glass-panel rounded-3xl p-6 shadow-sm flex flex-col justify-between">
              <div>
                <h3 className="text-sm font-bold text-[#25171C] dark:text-[#FAF3F5] mb-3">
                  Google Reviews & Rating
                </h3>
                <div className="text-center py-4 bg-maroon-500/5 rounded-2xl border border-maroon-300/20 mb-4">
                  <div className="text-4xl font-black text-[#64152C] dark:text-maroon-300">4.9</div>
                  <div className="flex justify-center text-amber-500 text-sm mt-1">★★★★★</div>
                  <div className="text-xs text-[#8A6570] dark:text-[#D9B7C0] mt-1">Based on 284 verified Google reviews</div>
                </div>

                <div className="space-y-2.5 text-xs">
                  <div className="flex justify-between items-center">
                    <span className="flex items-center gap-1.5"><Phone className="w-3.5 h-3.5 text-emerald-600" /> Phone Calls</span>
                    <span className="font-bold">412 calls</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="flex items-center gap-1.5"><Navigation className="w-3.5 h-3.5 text-blue-600" /> Directions</span>
                    <span className="font-bold">1,180 routes</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="flex items-center gap-1.5"><Globe className="w-3.5 h-3.5 text-maroon-600" /> Website Visits</span>
                    <span className="font-bold">1,840 clicks</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-[#D9B7C0]/35 text-[11px] text-[#8A6570] dark:text-[#D9B7C0]">
                Verified Google Business Profile API v1 connector
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ---------------- 3. YOUTUBE CHANNEL STUDIO REPORT ---------------- */}
      {activeChannel?.channelType === 'YOUTUBE' && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <MetricCard
              title="Subscribers"
              value="38,900"
              change={8.4}
              icon={Users}
              subtitle="+420 new subscribers this month"
            />
            <MetricCard
              title="Total Channel Views"
              value="218,400"
              change={19.2}
              icon={Eye}
              subtitle="Long-form videos & Shorts"
            />
            <MetricCard
              title="Watch Time (Hours)"
              value="14,280"
              change={22.1}
              icon={Clock}
              subtitle="4m 12s average duration"
            />
            <MetricCard
              title="Impressions CTR"
              value="7.8%"
              change={4.1}
              icon={TrendingUp}
              subtitle="Thumbnail click-through rate"
            />
          </div>

          <div className="glass-panel rounded-3xl p-6 shadow-sm">
            <h3 className="text-sm font-bold text-[#25171C] dark:text-[#FAF3F5] mb-1">
              YouTube Views & Watch Time Evolution
            </h3>
            <p className="text-xs text-[#8A6570] dark:text-[#D9B7C0] mb-6">
              Track viewer retention and watch hours over time.
            </p>
            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={timelineData}>
                  <defs>
                    <linearGradient id="colorYT" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#DC2626" stopOpacity={0.35} />
                      <stop offset="95%" stopColor="#DC2626" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#D9B7C0" opacity={0.2} />
                  <XAxis dataKey="date" stroke="#8A6570" fontSize={11} tickLine={false} />
                  <YAxis stroke="#8A6570" fontSize={11} tickLine={false} />
                  <Tooltip />
                  <Area type="monotone" dataKey="views" stroke="#DC2626" strokeWidth={2.5} fillOpacity={1} fill="url(#colorYT)" name="Views" />
                  <Line type="monotone" dataKey="watchHours" stroke="#64152C" strokeWidth={2} dot={false} name="Watch Hours" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

      {/* ---------------- 4. LINKEDIN COMPANY ANALYTICS ---------------- */}
      {activeChannel?.channelType === 'LINKEDIN' && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <MetricCard
              title="Page Followers"
              value="18,400"
              change={12.1}
              icon={Users}
              subtitle="Senior decision makers & partners"
            />
            <MetricCard
              title="Unique Visitors"
              value="9,840"
              change={15.4}
              icon={Eye}
              subtitle="B2B prospective clients"
            />
            <MetricCard
              title="Total Impressions"
              value="74,200"
              change={26.8}
              icon={Activity}
              subtitle="Company updates feed reach"
            />
            <MetricCard
              title="Engagement Rate"
              value="5.55%"
              change={8.9}
              icon={TrendingUp}
              subtitle="Clicks, reactions and reposts"
            />
          </div>

          <div className="glass-panel rounded-3xl p-6 shadow-sm">
            <h3 className="text-sm font-bold text-[#25171C] dark:text-[#FAF3F5] mb-1">
              LinkedIn Impressions & Engagement Dynamics
            </h3>
            <p className="text-xs text-[#8A6570] dark:text-[#D9B7C0] mb-6">
              Track professional audience reach and content click-throughs.
            </p>
            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={timelineData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#D9B7C0" opacity={0.2} />
                  <XAxis dataKey="date" stroke="#8A6570" fontSize={11} tickLine={false} />
                  <YAxis stroke="#8A6570" fontSize={11} tickLine={false} />
                  <Tooltip />
                  <Area type="monotone" dataKey="impressions" stroke="#0077B5" strokeWidth={2.5} fill="#0077B5" fillOpacity={0.15} name="Impressions" />
                  <Line type="monotone" dataKey="clicks" stroke="#64152C" strokeWidth={2} dot={false} name="Clicks" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

      {/* ---------------- 5. WHATSAPP BUSINESS CONVERSATIONS ---------------- */}
      {activeChannel?.channelType === 'WHATSAPP' && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <MetricCard
              title="Customer Conversations"
              value="1,480"
              change={22.4}
              icon={MessageCircle}
              subtitle="Active inquiry sessions"
            />
            <MetricCard
              title="Messages Sent"
              value="14,200"
              change={18.2}
              icon={Activity}
              subtitle="Booking & itinerary assistance"
            />
            <MetricCard
              title="Delivery Rate"
              value="99.4%"
              change={0.2}
              icon={CheckCircle2}
              subtitle="Meta Cloud API WhatsApp"
            />
            <MetricCard
              title="Avg Response Time"
              value="2.4 min"
              change={-15.0}
              icon={Clock}
              subtitle="Fast customer conversion"
            />
          </div>

          <div className="glass-panel rounded-3xl p-6 shadow-sm">
            <h3 className="text-sm font-bold text-[#25171C] dark:text-[#FAF3F5] mb-1">
              WhatsApp Daily Inquiries & Conversations
            </h3>
            <p className="text-xs text-[#8A6570] dark:text-[#D9B7C0] mb-6">
              Track customer support and high-ticket tour booking inquiries.
            </p>
            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={timelineData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#D9B7C0" opacity={0.2} />
                  <XAxis dataKey="date" stroke="#8A6570" fontSize={11} tickLine={false} />
                  <YAxis stroke="#8A6570" fontSize={11} tickLine={false} />
                  <Tooltip />
                  <Bar dataKey="conversations" fill="#10B981" radius={[4, 4, 0, 0]} name="Conversations" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

      {/* ---------------- 6. GOOGLE ADS CAMPAIGNS ---------------- */}
      {activeChannel?.channelType === 'GOOGLE_ADS' && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <MetricCard
              title="Ad Spend (Google)"
              value="₹1,42,800"
              change={12.4}
              icon={Activity}
              subtitle="Search & Performance Max"
            />
            <MetricCard
              title="Total Link Clicks"
              value="18,900"
              change={14.8}
              icon={TrendingUp}
              subtitle="Avg CPC: ₹7.55"
            />
            <MetricCard
              title="Conversions"
              value="742"
              change={24.2}
              icon={CheckCircle2}
              subtitle="Booking leads & inquiries"
            />
            <MetricCard
              title="Blended ROAS"
              value="4.79x"
              change={18.1}
              icon={Sparkles}
              subtitle="Conversion value ₹6,84,000"
            />
          </div>

          <div className="glass-panel rounded-3xl p-6 shadow-sm">
            <h3 className="text-sm font-bold text-[#25171C] dark:text-[#FAF3F5] mb-1">
              Google Ads Spend vs Conversions
            </h3>
            <p className="text-xs text-[#8A6570] dark:text-[#D9B7C0] mb-6">
              Daily expenditure and conversion rate efficiency.
            </p>
            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={timelineData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#D9B7C0" opacity={0.2} />
                  <XAxis dataKey="date" stroke="#8A6570" fontSize={11} tickLine={false} />
                  <YAxis stroke="#8A6570" fontSize={11} tickLine={false} />
                  <Tooltip />
                  <Area type="monotone" dataKey="spend" stroke="#EAB308" strokeWidth={2.5} fill="#EAB308" fillOpacity={0.15} name="Spend (₹)" />
                  <Line type="monotone" dataKey="conversions" stroke="#64152C" strokeWidth={2} dot={false} name="Conversions" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

      {/* ---------------- 7. INSTAGRAM ORGANIC (Evolution Preview) ---------------- */}
      {activeChannel?.channelType === 'INSTAGRAM' && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <MetricCard
              title="Total Followers"
              value="48,500"
              change={18.2}
              icon={Users}
              subtitle="Metricool Instagram Evolution"
            />
            <MetricCard
              title="Total Reach"
              value="284,500"
              change={24.8}
              icon={Eye}
              subtitle="Unique accounts reached"
            />
            <MetricCard
              title="Total Interactions"
              value="42,100"
              change={16.4}
              icon={Heart}
              subtitle="Likes, comments, saves, shares"
            />
            <MetricCard
              title="Engagement Rate"
              value="4.62%"
              change={3.8}
              icon={TrendingUp}
              subtitle="Interactions / Reach ratio"
            />
          </div>

          <div className="glass-panel rounded-3xl p-6 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6 bg-gradient-to-r from-pink-500/5 via-maroon-600/5 to-amber-500/5">
            <div>
              <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-pink-500/10 text-pink-700 dark:text-pink-300 border border-pink-400/20">
                Metricool Instagram Evolution Active
              </span>
              <h3 className="text-lg font-black text-[#25171C] dark:text-[#FAF3F5] mt-1.5">
                Full Metricool-Grade Instagram Architecture Available
              </h3>
              <p className="text-xs text-[#8A6570] dark:text-[#D9B7C0] mt-1 max-w-xl">
                Explore Community Growth, Age & City Demographics, Profile Views, Posts Table, Reels Table, Stories Metrics, and Best Time to Post Heatmap.
              </p>
            </div>
            {onNavigateToTab && (
              <button
                onClick={() => onNavigateToTab('instagram_evolution')}
                className="px-5 py-2.5 text-xs font-bold btn-maroon rounded-2xl flex items-center gap-2 shrink-0 shadow-glass-maroon"
              >
                <span>Open Full Metricool Instagram Dashboard</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
