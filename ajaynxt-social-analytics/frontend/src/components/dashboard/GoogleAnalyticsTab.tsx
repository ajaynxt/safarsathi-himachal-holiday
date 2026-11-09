import React, { useState } from 'react';
import {
  Users,
  Eye,
  Activity,
  Globe,
  Smartphone,
  Monitor,
  Tablet,
  CheckCircle2,
  DollarSign,
  Clock,
  ArrowRight,
  TrendingUp,
  ShieldCheck,
  MousePointer,
  Compass,
  IndianRupee
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';
import { MetricCard } from '../common/MetricCard';
import {
  DEMO_GA4_PROPERTIES,
  DEMO_GA4_METRICS,
  DEMO_GA4_TRAFFIC_SOURCES,
  DEMO_GA4_LANDING_PAGES,
  DEMO_GA4_DEVICES,
  DEMO_GA4_COUNTRIES
} from '../../data/marketingDemoData';
import { formatNumber, formatDuration } from '../../utils/formatters';

const DEVICE_COLORS = ['#64152C', '#10b981', '#f59e0b'];

export const GoogleAnalyticsTab: React.FC = () => {
  const [selectedPropertyId, setSelectedPropertyId] = useState(DEMO_GA4_PROPERTIES[0].propertyId);
  const metrics = DEMO_GA4_METRICS;
  const activeProperty = DEMO_GA4_PROPERTIES.find((p) => p.propertyId === selectedPropertyId) || DEMO_GA4_PROPERTIES[0];

  return (
    <div className="space-y-6">
      {/* Real-time Telemetry & Least-Privilege Scope Header */}
      <div className="glass-panel rounded-2xl p-4 border border-emerald-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs bg-emerald-500/5">
        <div className="flex items-center gap-2.5">
          <span className="flex h-2.5 w-2.5 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
          </span>
          <span className="font-bold text-emerald-800 dark:text-emerald-300">
            GA4 Realtime Telemetry:
          </span>
          <span className="text-[#25171C] dark:text-[#FAF3F5] font-extrabold">
            48 Active Users on site right now
          </span>
        </div>
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          <span className="text-[11px] font-mono text-slate-500 dark:text-maroon-300 font-semibold">
            scope: analytics.readonly (Least Privilege)
          </span>
        </div>
      </div>

      {/* Header & Property Selector */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-[#25171C] dark:text-[#FAF3F5]">
              Google Analytics 4 (GA4)
            </h1>
            <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-700 dark:text-amber-300 border border-amber-400/30">
              Web & App Telemetry
            </span>
          </div>
          <p className="text-xs sm:text-sm text-[#8A6570] dark:text-[#D9B7C0] mt-1 font-medium">
            Official Google Analytics Data API (runReport & runRealtimeReport) metrics for {activeProperty.displayName}.
          </p>
        </div>

        {/* Property Selector */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400 hidden sm:inline font-medium">GA4 Property:</span>
          <select
            value={selectedPropertyId}
            onChange={(e) => setSelectedPropertyId(e.target.value)}
            className="px-3.5 py-1.5 glass-card rounded-xl text-xs font-semibold text-[#25171C] dark:text-[#FAF3F5] border border-[#D9B7C0]/35 focus:outline-none focus:ring-2 focus:ring-maroon-500/20"
          >
            {DEMO_GA4_PROPERTIES.map((p) => (
              <option key={p.propertyId} value={p.propertyId} className="bg-white dark:bg-[#1A050E]">
                {p.displayName} ({p.propertyId})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Primary GA4 KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Active Users"
          value={formatNumber(metrics.activeUsers)}
          change={metrics.activeUsersChange}
          changeLabel="vs previous 30d"
          icon={Users}
        />
        <MetricCard
          title="Total Sessions"
          value={formatNumber(metrics.sessions)}
          change={metrics.sessionsChange}
          changeLabel={`${metrics.engagedSessions.toLocaleString()} engaged`}
          icon={Activity}
        />
        <MetricCard
          title="Engagement Rate"
          value={`${metrics.engagementRate}%`}
          change={metrics.engagementRateChange}
          changeLabel={`Avg duration: ${formatDuration(metrics.avgSessionDurationSeconds)}`}
          icon={Compass}
        />
        <MetricCard
          title="Purchase Revenue"
          value={`₹${formatNumber(metrics.purchaseRevenue)}`}
          change={metrics.purchaseRevenueChange}
          changeLabel={`${metrics.conversions.toLocaleString()} key events`}
          icon={IndianRupee}
        />
      </div>

      {/* Secondary Metrics Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 glass-card rounded-2xl p-5 border border-[#D9B7C0]/35 text-xs">
        <div>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">New Users</span>
          <p className="text-xl font-black text-[#25171C] dark:text-[#FAF3F5] mt-1">{formatNumber(metrics.newUsers)}</p>
          <span className="text-[10px] text-emerald-600 font-bold">+{metrics.newUsersChange}% acquisition</span>
        </div>
        <div>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Total Page Views</span>
          <p className="text-xl font-black text-[#25171C] dark:text-[#FAF3F5] mt-1">{formatNumber(metrics.pageViews)}</p>
          <span className="text-[10px] text-slate-400 font-medium">{(metrics.pageViews / metrics.sessions).toFixed(1)} views/session</span>
        </div>
        <div>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Total Events Fired</span>
          <p className="text-xl font-black text-maroon-700 dark:text-maroon-300 mt-1">{formatNumber(metrics.eventCount)}</p>
          <span className="text-[10px] text-slate-400 font-medium">Scrolls, clicks, page_views</span>
        </div>
        <div>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Key Conversions</span>
          <p className="text-xl font-black text-emerald-600 dark:text-emerald-400 mt-1">{formatNumber(metrics.conversions)}</p>
          <span className="text-[10px] text-emerald-600 font-bold">+{metrics.conversionsChange}% vs prior period</span>
        </div>
      </div>

      {/* Grid: Traffic Sources & Devices */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Traffic Sources / Medium Table */}
        <div className="lg:col-span-2 glass-panel rounded-3xl shadow-sm overflow-hidden">
          <div className="p-5 border-b border-[#D9B7C0]/30 dark:border-[#D9B7C0]/15">
            <h3 className="text-sm font-bold text-[#25171C] dark:text-[#FAF3F5]">
              Traffic Acquisition: Source / Medium
            </h3>
            <p className="text-xs text-[#8A6570] dark:text-[#D9B7C0] mt-0.5">
              Ranked by total sessions and conversion volume
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-[#D9B7C0]/30 dark:border-[#D9B7C0]/15 bg-white/40 dark:bg-[#1A050E]/40 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  <th className="py-3 px-4">Source / Medium</th>
                  <th className="py-3 px-3 text-right">Sessions</th>
                  <th className="py-3 px-3 text-right">Users</th>
                  <th className="py-3 px-3 text-right">Engagement</th>
                  <th className="py-3 px-3 text-right">Conversions</th>
                  <th className="py-3 px-4 text-right">Revenue</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#D9B7C0]/25 dark:divide-[#D9B7C0]/15">
                {DEMO_GA4_TRAFFIC_SOURCES.map((src, i) => (
                  <tr key={i} className="hover:bg-white/50 dark:hover:bg-[#200810]/50 transition-colors">
                    <td className="py-3 px-4 font-bold text-[#25171C] dark:text-[#FAF3F5]">
                      {src.sourceMedium}
                    </td>
                    <td className="py-3 px-3 text-right font-semibold">{formatNumber(src.sessions)}</td>
                    <td className="py-3 px-3 text-right text-slate-500">{formatNumber(src.users)}</td>
                    <td className="py-3 px-3 text-right">{src.engagementRate}%</td>
                    <td className="py-3 px-3 text-right font-bold text-emerald-600 dark:text-emerald-400">
                      {src.conversions}
                    </td>
                    <td className="py-3 px-4 text-right font-bold text-[#25171C] dark:text-[#FAF3F5]">
                      ₹{formatNumber(src.revenue)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Device Category Pie Chart */}
        <div className="glass-panel rounded-3xl p-6 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold text-[#25171C] dark:text-[#FAF3F5] mb-1">
              Device Category Share
            </h3>
            <p className="text-xs text-[#8A6570] dark:text-[#D9B7C0] mb-4">
              Mobile vs Desktop browsing split
            </p>

            <div className="h-[200px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={DEMO_GA4_DEVICES}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={75}
                    paddingAngle={4}
                    dataKey="users"
                  >
                    {DEMO_GA4_DEVICES.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={DEVICE_COLORS[index % DEVICE_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(val: any) => [formatNumber(Number(val)), 'Users']}
                    contentStyle={{
                      backgroundColor: 'rgba(26, 6, 14, 0.85)',
                      backdropFilter: 'blur(12px)',
                      borderColor: 'rgba(217, 183, 192, 0.3)',
                      borderRadius: '16px',
                      fontSize: '12px',
                      color: '#FAF3F5',
                    }}
                  />
                  <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={{ fontSize: '11px' }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="pt-4 border-t border-[#D9B7C0]/30 dark:border-[#D9B7C0]/15 text-xs space-y-2">
            {DEMO_GA4_DEVICES.map((d) => (
              <div key={d.deviceCategory} className="flex justify-between items-center text-[#25171C] dark:text-[#FAF3F5]">
                <span className="capitalize font-semibold flex items-center gap-1.5">
                  {d.deviceCategory === 'mobile' && <Smartphone className="w-3.5 h-3.5 text-maroon-600" />}
                  {d.deviceCategory === 'desktop' && <Monitor className="w-3.5 h-3.5 text-emerald-600" />}
                  {d.deviceCategory === 'tablet' && <Tablet className="w-3.5 h-3.5 text-amber-600" />}
                  {d.deviceCategory}
                </span>
                <span className="font-bold">{d.percentage}% ({formatNumber(d.users)} users)</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Landing Pages Performance Table */}
      <div className="glass-panel rounded-3xl shadow-sm overflow-hidden">
        <div className="p-5 border-b border-[#D9B7C0]/30 dark:border-[#D9B7C0]/15">
          <h3 className="text-sm font-bold text-[#25171C] dark:text-[#FAF3F5]">
            Top Landing Pages & Funnel Efficiency
          </h3>
          <p className="text-xs text-[#8A6570] dark:text-[#D9B7C0] mt-0.5">
            First pages users entered and their subsequent conversion outcomes
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-[#D9B7C0]/30 dark:border-[#D9B7C0]/15 bg-white/40 dark:bg-[#1A050E]/40 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                <th className="py-3 px-4">Landing Page Title & Path</th>
                <th className="py-3 px-3 text-right">Page Views</th>
                <th className="py-3 px-3 text-right">Active Users</th>
                <th className="py-3 px-4 text-right">Key Conversions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#D9B7C0]/25 dark:divide-[#D9B7C0]/15">
              {DEMO_GA4_LANDING_PAGES.map((page, idx) => (
                <tr key={idx} className="hover:bg-white/50 dark:hover:bg-[#200810]/50 transition-colors">
                  <td className="py-3 px-4 max-w-md">
                    <span className="font-bold text-[#25171C] dark:text-[#FAF3F5] block truncate">
                      {page.pageTitle}
                    </span>
                    <code className="text-[10px] text-maroon-600 dark:text-maroon-300 font-mono">
                      {page.pagePath}
                    </code>
                  </td>
                  <td className="py-3 px-3 text-right font-bold text-[#25171C] dark:text-[#FAF3F5]">
                    {formatNumber(page.views)}
                  </td>
                  <td className="py-3 px-3 text-right text-slate-600 dark:text-slate-300">
                    {formatNumber(page.activeUsers)}
                  </td>
                  <td className="py-3 px-4 text-right font-bold text-emerald-600 dark:text-emerald-400">
                    {page.conversions}
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
