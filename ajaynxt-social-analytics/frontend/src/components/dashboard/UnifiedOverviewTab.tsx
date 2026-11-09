import React from 'react';
import {
  TrendingUp,
  DollarSign,
  Radio,
  Eye,
  Users,
  CheckCircle2,
  Sparkles,
  ShoppingBag,
  ExternalLink,
  ArrowRight,
  Info,
  Layers,
  ArrowUpRight,
  SplitSquareVertical,
  BarChart3,
  IndianRupee
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';
import { MetricCard } from '../common/MetricCard';
import {
  DEMO_UNIFIED_MARKETING_OVERVIEW,
  DEMO_CAMPAIGN_ATTRIBUTION_ROWS,
  DEMO_GA4_TRAFFIC_SOURCES
} from '../../data/marketingDemoData';
import { formatNumber } from '../../utils/formatters';

interface UnifiedOverviewTabProps {
  onNavigateTab?: (tab: any) => void;
}

export const UnifiedOverviewTab: React.FC<UnifiedOverviewTabProps> = ({ onNavigateTab }) => {
  const overview = DEMO_UNIFIED_MARKETING_OVERVIEW;

  // Chart data blending Ad Spend vs Website Sessions vs Conversions
  const timelineData = [
    { date: 'W1', adSpend: 24500, sessions: 21400, conversions: 780, revenue: 194000 },
    { date: 'W2', adSpend: 26800, sessions: 23100, conversions: 840, revenue: 210000 },
    { date: 'W3', adSpend: 31200, sessions: 25800, conversions: 960, revenue: 238000 },
    { date: 'W4', adSpend: 27100, sessions: 22150, conversions: 830, revenue: 200500 },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-[#25171C] dark:text-[#FAF3F5]">
              Unified Marketing Overview
            </h1>
            <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-maroon-500/10 text-maroon-700 dark:text-maroon-300 border border-maroon-300/30 uppercase tracking-wider">
              Cross-Platform Intelligence
            </span>
          </div>
          <p className="text-xs sm:text-sm text-[#8A6570] dark:text-[#D9B7C0] mt-1 font-medium">
            Synchronized telemetry across Meta Ads (Paid), Instagram Organic, and Google Analytics 4 (Web).
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs px-3 py-1.5 glass-card border border-emerald-500/30 text-emerald-700 dark:text-emerald-400 rounded-xl font-bold flex items-center gap-2 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
            3 Channels Telemetry Live
          </span>
        </div>
      </div>

      {/* Row 1: High-Level Unified Marketing KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Total Meta Ad Spend"
          value={`₹${formatNumber(overview.totalAdSpend)}`}
          change={overview.adSpendChange}
          changeLabel="vs previous 30d"
          icon={IndianRupee}
        />
        <MetricCard
          title="Total Purchase Revenue"
          value={`₹${formatNumber(overview.totalPurchaseRevenue)}`}
          change={overview.revenueChange}
          changeLabel="blended web revenue"
          icon={ShoppingBag}
        />
        <MetricCard
          title="Blended Marketing ROAS"
          value={`${overview.blendedRoas}x`}
          subtitle={`₹${(overview.totalPurchaseRevenue / overview.totalAdSpend).toFixed(2)} return per ₹1 spent`}
          icon={TrendingUp}
        />
        <MetricCard
          title="GA4 Website Sessions"
          value={formatNumber(overview.websiteSessions)}
          change={overview.sessionsChange}
          changeLabel="66.9% engagement rate"
          icon={Users}
        />
      </div>

      {/* Row 2: Secondary Organic & Paid Dynamics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Organic Instagram Reach"
          value={formatNumber(overview.organicInstagramReach)}
          change={overview.organicReachChange}
          changeLabel="free organic brand reach"
          icon={Radio}
        />
        <MetricCard
          title="Organic IG Interactions"
          value={formatNumber(overview.organicInstagramEngagement)}
          subtitle="Likes, comments, saves, shares"
          icon={Sparkles}
        />
        <MetricCard
          title="Meta Ads Conversions"
          value={formatNumber(overview.metaReportedConversions)}
          subtitle="7-day click / 1-day view attribution"
          icon={CheckCircle2}
        />
        <MetricCard
          title="GA4 Key Events"
          value={formatNumber(overview.ga4AttributedConversions)}
          subtitle="Last-touch session attribution"
          icon={BarChart3}
        />
      </div>

      {/* Cross-Platform Attribution Explanation Banner */}
      <div className="glass-panel rounded-2xl p-4.5 border border-maroon-300/35 flex items-start gap-3.5 bg-gradient-to-r from-maroon-900/5 via-maroon-600/5 to-amber-500/5">
        <SplitSquareVertical className="w-5 h-5 text-maroon-700 dark:text-maroon-300 shrink-0 mt-0.5" />
        <div className="text-xs text-slate-700 dark:text-maroon-200/90 leading-relaxed">
          <span className="font-bold text-[#25171C] dark:text-[#FAF3F5] block mb-0.5">
            Cross-Platform Attribution Reconciliation Active
          </span>
          Meta Ads reports <strong>{overview.metaReportedConversions} conversions</strong> using a <em>7-day click or 1-day view attribution model</em>, while Google Analytics 4 attributes <strong>{overview.ga4AttributedConversions} conversions</strong> using a <em>data-driven last-click model</em>. This {overview.attributionDeltaPercent}% delta is expected and reconciled side-by-side in the UTM attribution audit below.
        </div>
      </div>

      {/* Main Charts: Revenue vs Ad Spend & Organic Reach Curve */}
      <div className="glass-panel rounded-3xl p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
          <div>
            <h3 className="text-base font-bold text-[#25171C] dark:text-[#FAF3F5]">
              Revenue Velocity vs Advertising Spend
            </h3>
            <p className="text-xs text-[#8A6570] dark:text-[#D9B7C0]">
              Blended weekly performance showing marketing expenditure against verified GA4 purchase revenue
            </p>
          </div>
          <div className="flex items-center gap-3 text-xs">
            <span className="flex items-center gap-1.5 font-semibold text-emerald-700 dark:text-emerald-400">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
              GA4 Revenue
            </span>
            <span className="flex items-center gap-1.5 font-semibold text-maroon-700 dark:text-maroon-300">
              <span className="w-2.5 h-2.5 rounded-full bg-[#64152C]"></span>
              Meta Ad Spend
            </span>
          </div>
        </div>

        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={timelineData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0.0} />
                </linearGradient>
                <linearGradient id="spendGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#64152C" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#64152C" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(217, 183, 192, 0.2)" />
              <XAxis dataKey="date" tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: '#8A6570' }} />
              <YAxis yAxisId="left" tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: '#8A6570' }} tickFormatter={(val) => `₹${val / 1000}k`} />
              <Tooltip
                formatter={(val: any) => [`₹${Number(val).toLocaleString()}`, '']}
                contentStyle={{
                  backgroundColor: 'rgba(26, 6, 14, 0.85)',
                  backdropFilter: 'blur(12px)',
                  borderColor: 'rgba(217, 183, 192, 0.3)',
                  borderRadius: '16px',
                  fontSize: '12px',
                  color: '#FAF3F5',
                  boxShadow: '0 8px 32px 0 rgba(0,0,0,0.4)',
                }}
              />
              <Area yAxisId="left" type="monotone" dataKey="revenue" name="GA4 Revenue (INR)" stroke="#10b981" fill="url(#revGrad)" strokeWidth={2.5} />
              <Area yAxisId="left" type="monotone" dataKey="adSpend" name="Meta Ad Spend (INR)" stroke="#64152C" fill="url(#spendGrad)" strokeWidth={2.5} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Campaign Attribution & UTM Cross-Platform Table */}
      <div className="glass-panel rounded-3xl overflow-hidden shadow-sm">
        <div className="p-5 border-b border-[#D9B7C0]/30 dark:border-[#D9B7C0]/15 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="text-sm font-bold text-[#25171C] dark:text-[#FAF3F5]">
              Campaign Performance vs UTM Website Attribution
            </h3>
            <p className="text-xs text-[#8A6570] dark:text-[#D9B7C0] mt-0.5">
              Side-by-side comparison of Meta Marketing API metrics vs GA4-tracked website outcomes
            </p>
          </div>
          {onNavigateTab && (
            <button
              onClick={() => onNavigateTab('meta_ads')}
              className="text-xs text-maroon-700 dark:text-maroon-300 hover:underline font-bold"
            >
              Manage Meta Ads &rarr;
            </button>
          )}
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-[#D9B7C0]/30 dark:border-[#D9B7C0]/15 bg-white/40 dark:bg-[#1A050E]/40 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                <th className="py-3 px-4">Campaign Name & UTM Tag</th>
                <th className="py-3 px-3 text-right">Meta Ad Spend</th>
                <th className="py-3 px-3 text-right">Meta Conversions</th>
                <th className="py-3 px-3 text-right">Meta ROAS</th>
                <th className="py-3 px-3 text-right">GA4 Sessions</th>
                <th className="py-3 px-3 text-right">GA4 Conversions</th>
                <th className="py-3 px-3 text-right">GA4 Revenue</th>
                <th className="py-3 px-4 text-right">GA4 ROAS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#D9B7C0]/25 dark:divide-[#D9B7C0]/15">
              {DEMO_CAMPAIGN_ATTRIBUTION_ROWS.map((row, idx) => (
                <tr key={idx} className="hover:bg-white/50 dark:hover:bg-[#200810]/50 transition-colors">
                  <td className="py-3 px-4 max-w-xs">
                    <span className="font-bold text-[#25171C] dark:text-[#FAF3F5] block truncate">
                      {row.campaignName}
                    </span>
                    <code className="text-[10px] text-maroon-600 dark:text-maroon-300 font-mono">
                      utm_campaign={row.utmCampaign}
                    </code>
                  </td>

                  <td className="py-3 px-3 text-right font-bold text-[#25171C] dark:text-[#FAF3F5]">
                    ₹{formatNumber(row.metaReportedSpend)}
                  </td>

                  <td className="py-3 px-3 text-right font-medium text-maroon-700 dark:text-maroon-300">
                    {row.metaReportedConversions}
                  </td>

                  <td className="py-3 px-3 text-right font-bold text-[#25171C] dark:text-[#FAF3F5]">
                    {row.metaRoas}x
                  </td>

                  <td className="py-3 px-3 text-right text-slate-600 dark:text-slate-300">
                    {formatNumber(row.ga4AttributedSessions)}
                  </td>

                  <td className="py-3 px-3 text-right font-medium text-emerald-600 dark:text-emerald-400">
                    {row.ga4AttributedConversions}
                  </td>

                  <td className="py-3 px-3 text-right font-bold text-[#25171C] dark:text-[#FAF3F5]">
                    ₹{formatNumber(row.ga4AttributedRevenue)}
                  </td>

                  <td className="py-3 px-4 text-right">
                    <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/30">
                      {row.ga4Roas}x
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
