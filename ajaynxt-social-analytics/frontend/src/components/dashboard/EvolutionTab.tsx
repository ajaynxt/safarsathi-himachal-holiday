import React, { useState, useMemo } from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';
import {
  TrendingUp,
  Radio,
  Eye,
  Heart,
  MessageCircle,
  Bookmark,
  Share2,
  Calendar,
  Layers,
  Sparkles,
  Info
} from 'lucide-react';
import { useWorkspace } from '../../context/WorkspaceContext';
import { getFilteredMetrics } from '../../data/demoData';
import { formatNumber, formatShortDate } from '../../utils/formatters';
import { cn } from '../../utils/cn';

export const EvolutionTab: React.FC = () => {
  const { dateRangePreset, currentConnection } = useWorkspace();
  const days = dateRangePreset === '7d' ? 7 : dateRangePreset === '90d' ? 90 : 30;

  const { dailyData, overview } = useMemo(
    () => getFilteredMetrics(days, currentConnection?.username),
    [days, currentConnection?.username]
  );

  // Chart view selector: 'followers' | 'reach' | 'interactions'
  const [activeEvolutionView, setActiveEvolutionView] = useState<'followers' | 'reach' | 'interactions'>('followers');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
              Instagram Evolution
            </h1>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-brand-500/10 text-brand-600 dark:text-brand-400 border border-brand-500/20">
              Metricool-Inspired Architecture
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Chronological growth analysis, audience expansion curves, and interaction velocity over the last {days} days.
          </p>
        </div>

        {/* View Switcher Pills */}
        <div className="flex items-center bg-slate-100 dark:bg-slate-800/80 p-1 rounded-xl border border-slate-200 dark:border-slate-700/60 w-fit">
          <button
            onClick={() => setActiveEvolutionView('followers')}
            className={cn(
              "px-3 py-1.5 text-xs font-medium rounded-lg transition",
              activeEvolutionView === 'followers'
                ? "bg-white dark:bg-slate-900 text-brand-600 dark:text-brand-400 shadow-xs border border-slate-200 dark:border-slate-700"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            )}
          >
            Followers Growth
          </button>
          <button
            onClick={() => setActiveEvolutionView('reach')}
            className={cn(
              "px-3 py-1.5 text-xs font-medium rounded-lg transition",
              activeEvolutionView === 'reach'
                ? "bg-white dark:bg-slate-900 text-brand-600 dark:text-brand-400 shadow-xs border border-slate-200 dark:border-slate-700"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            )}
          >
            Reach & Views
          </button>
          <button
            onClick={() => setActiveEvolutionView('interactions')}
            className={cn(
              "px-3 py-1.5 text-xs font-medium rounded-lg transition",
              activeEvolutionView === 'interactions'
                ? "bg-white dark:bg-slate-900 text-brand-600 dark:text-brand-400 shadow-xs border border-slate-200 dark:border-slate-700"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            )}
          >
            Interactions Dynamics
          </button>
        </div>
      </div>

      {/* Top Evolution Summary Stats Bar */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-sm">
        <div>
          <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">
            Total Followers
          </span>
          <p className="text-xl font-bold text-slate-900 dark:text-white mt-0.5">
            {formatNumber(overview.totalFollowers)}
          </p>
          <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold">
            +{overview.followersGrowthRate}% in {days}d
          </span>
        </div>

        <div>
          <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">
            Net Follower Gain
          </span>
          <p className="text-xl font-bold text-indigo-600 dark:text-indigo-400 mt-0.5">
            +{formatNumber(overview.netFollowerGrowth)}
          </p>
          <span className="text-[10px] text-slate-400">
            +{overview.followersGained} / -{overview.followersLost}
          </span>
        </div>

        <div>
          <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">
            Cumulative Reach
          </span>
          <p className="text-xl font-bold text-slate-900 dark:text-white mt-0.5">
            {formatNumber(overview.accountReach)}
          </p>
          <span className="text-[10px] text-slate-400">
            Avg {formatNumber(Math.floor(overview.accountReach / days))}/day
          </span>
        </div>

        <div>
          <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">
            Total Views
          </span>
          <p className="text-xl font-bold text-slate-900 dark:text-white mt-0.5">
            {formatNumber(overview.views)}
          </p>
          <span className="text-[10px] text-slate-400">
            {(overview.views / overview.accountReach).toFixed(1)}x frequency
          </span>
        </div>

        <div className="col-span-2 lg:col-span-1">
          <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">
            Engagement Rate
          </span>
          <p className="text-xl font-bold text-brand-600 dark:text-brand-400 mt-0.5">
            {overview.overallEngagementRate}%
          </p>
          <span className="text-[10px] text-slate-400">
            {formatNumber(overview.totalInteractions)} interactions
          </span>
        </div>
      </div>

      {/* Primary Evolution Chart (Dynamic based on selected view) */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-6">
          <div>
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white flex items-center gap-2">
              {activeEvolutionView === 'followers' && 'Followers Growth & Churn Dynamics'}
              {activeEvolutionView === 'reach' && 'Daily Reach & Views Timeline'}
              {activeEvolutionView === 'interactions' && 'Interaction Types Breakdown (Likes, Comments, Saves, Shares)'}
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Day-by-day evolution captured from Instagram Graph API
            </p>
          </div>
        </div>

        {/* Chart Container */}
        <div className="h-[360px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            {activeEvolutionView === 'followers' ? (
              <AreaChart data={dailyData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="totalFollowersGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0.0} />
                  </linearGradient>
                  <linearGradient id="netFollowersGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.2} vertical={false} />
                <XAxis
                  dataKey="date"
                  tickFormatter={formatShortDate}
                  stroke="#94a3b8"
                  fontSize={11}
                  tickLine={false}
                />
                <YAxis
                  yAxisId="left"
                  stroke="#94a3b8"
                  fontSize={11}
                  tickLine={false}
                  tickFormatter={val => formatNumber(val)}
                  domain={['dataMin - 100', 'dataMax + 100']}
                />
                <YAxis
                  yAxisId="right"
                  orientation="right"
                  stroke="#94a3b8"
                  fontSize={11}
                  tickLine={false}
                  tickFormatter={val => `+${val}`}
                />
                <Tooltip
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload;
                      return (
                        <div className="bg-slate-900 border border-slate-700 p-3 rounded-lg shadow-xl text-xs text-white space-y-1.5">
                          <p className="font-semibold text-slate-300 border-b border-slate-700 pb-1">
                            {label}
                          </p>
                          <div className="flex justify-between gap-4">
                            <span className="text-slate-400">Total Followers:</span>
                            <span className="font-bold text-indigo-400">{formatNumber(data.totalFollowers)}</span>
                          </div>
                          <div className="flex justify-between gap-4">
                            <span className="text-emerald-400">Gained:</span>
                            <span className="font-semibold">+{data.followersGained}</span>
                          </div>
                          <div className="flex justify-between gap-4">
                            <span className="text-rose-400">Lost:</span>
                            <span className="font-semibold">-{data.followersLost}</span>
                          </div>
                          <div className="flex justify-between gap-4 pt-1 border-t border-slate-800">
                            <span className="text-slate-300 font-medium">Net Change:</span>
                            <span className="font-bold text-brand-400">+{data.netFollowers}</span>
                          </div>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Legend verticalAlign="top" height={36} iconType="circle" wrapperStyle={{ fontSize: '12px' }} />
                <Area
                  yAxisId="left"
                  type="monotone"
                  dataKey="totalFollowers"
                  name="Total Followers"
                  stroke="#6366f1"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#totalFollowersGradient)"
                />
                <Bar
                  yAxisId="right"
                  dataKey="netFollowers"
                  name="Daily Net Growth"
                  fill="#10b981"
                  radius={[3, 3, 0, 0]}
                  maxBarSize={16}
                />
              </AreaChart>
            ) : activeEvolutionView === 'reach' ? (
              <AreaChart data={dailyData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="reachGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#f59e0b" stopOpacity={0.0} />
                  </linearGradient>
                  <linearGradient id="viewsGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#06b6d4" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.2} vertical={false} />
                <XAxis
                  dataKey="date"
                  tickFormatter={formatShortDate}
                  stroke="#94a3b8"
                  fontSize={11}
                  tickLine={false}
                />
                <YAxis
                  stroke="#94a3b8"
                  fontSize={11}
                  tickLine={false}
                  tickFormatter={val => formatNumber(val)}
                />
                <Tooltip
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload;
                      return (
                        <div className="bg-slate-900 border border-slate-700 p-3 rounded-lg shadow-xl text-xs text-white space-y-1.5">
                          <p className="font-semibold text-slate-300 border-b border-slate-700 pb-1">
                            {label}
                          </p>
                          <div className="flex justify-between gap-4">
                            <span className="text-amber-400">Account Reach:</span>
                            <span className="font-bold">{formatNumber(data.reach)}</span>
                          </div>
                          <div className="flex justify-between gap-4">
                            <span className="text-cyan-400">Views / Plays:</span>
                            <span className="font-bold">{formatNumber(data.views)}</span>
                          </div>
                          <div className="flex justify-between gap-4">
                            <span className="text-purple-400">Accounts Engaged:</span>
                            <span className="font-semibold">{formatNumber(data.accountsEngaged)}</span>
                          </div>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Legend verticalAlign="top" height={36} iconType="circle" wrapperStyle={{ fontSize: '12px' }} />
                <Area
                  type="monotone"
                  dataKey="views"
                  name="Views / Plays"
                  stroke="#06b6d4"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#viewsGradient)"
                />
                <Area
                  type="monotone"
                  dataKey="reach"
                  name="Unique Reach"
                  stroke="#f59e0b"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#reachGradient)"
                />
              </AreaChart>
            ) : (
              <BarChart data={dailyData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.2} vertical={false} />
                <XAxis
                  dataKey="date"
                  tickFormatter={formatShortDate}
                  stroke="#94a3b8"
                  fontSize={11}
                  tickLine={false}
                />
                <YAxis
                  stroke="#94a3b8"
                  fontSize={11}
                  tickLine={false}
                  tickFormatter={val => formatNumber(val)}
                />
                <Tooltip
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload;
                      return (
                        <div className="bg-slate-900 border border-slate-700 p-3 rounded-lg shadow-xl text-xs text-white space-y-1.5">
                          <p className="font-semibold text-slate-300 border-b border-slate-700 pb-1">
                            {label}
                          </p>
                          <div className="flex justify-between gap-4">
                            <span className="text-pink-400">Likes:</span>
                            <span>{formatNumber(data.likes)}</span>
                          </div>
                          <div className="flex justify-between gap-4">
                            <span className="text-blue-400">Comments:</span>
                            <span>{formatNumber(data.comments)}</span>
                          </div>
                          <div className="flex justify-between gap-4">
                            <span className="text-amber-400">Saves:</span>
                            <span>{formatNumber(data.saves)}</span>
                          </div>
                          <div className="flex justify-between gap-4">
                            <span className="text-emerald-400">Shares:</span>
                            <span>{formatNumber(data.shares)}</span>
                          </div>
                          <div className="flex justify-between gap-4 pt-1 border-t border-slate-800">
                            <span className="text-slate-300">Total Interactions:</span>
                            <span className="font-bold text-white">{formatNumber(data.totalInteractions)}</span>
                          </div>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Legend verticalAlign="top" height={36} iconType="circle" wrapperStyle={{ fontSize: '12px' }} />
                <Bar dataKey="likes" name="Likes" fill="#ec4899" stackId="a" />
                <Bar dataKey="saves" name="Saves" fill="#f59e0b" stackId="a" />
                <Bar dataKey="shares" name="Shares" fill="#10b981" stackId="a" />
                <Bar dataKey="comments" name="Comments" fill="#3b82f6" stackId="a" />
              </BarChart>
            )}
          </ResponsiveContainer>
        </div>
      </div>

      {/* Analytical Insights & Recommendations Box */}
      <div className="bg-gradient-to-r from-brand-500/5 via-indigo-500/5 to-purple-500/5 border border-brand-500/20 rounded-xl p-5">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-lg bg-brand-500/10 text-brand-600 dark:text-brand-400 mt-0.5 shrink-0">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs font-semibold text-slate-900 dark:text-white uppercase tracking-wider">
              Evolution Intelligence & Insights
            </h4>
            <div className="mt-2 grid grid-cols-1 md:grid-cols-3 gap-3 text-xs text-slate-600 dark:text-slate-300">
              <div className="bg-white/60 dark:bg-slate-900/60 p-3 rounded-lg border border-slate-200/50 dark:border-slate-800">
                <span className="font-semibold text-slate-900 dark:text-white block mb-1">
                  Optimal Engagement Day:
                </span>
                Saturdays and Sundays generate <span className="font-semibold text-emerald-600 dark:text-emerald-400">+35% higher reach</span> due to weekend browsing cycles.
              </div>
              <div className="bg-white/60 dark:bg-slate-900/60 p-3 rounded-lg border border-slate-200/50 dark:border-slate-800">
                <span className="font-semibold text-slate-900 dark:text-white block mb-1">
                  High-Value Interaction Driver:
                </span>
                Carousels generate <span className="font-semibold text-amber-600 dark:text-amber-400">2.6x more saves</span> than static single-photo posts, signaling high educational value.
              </div>
              <div className="bg-white/60 dark:bg-slate-900/60 p-3 rounded-lg border border-slate-200/50 dark:border-slate-800">
                <span className="font-semibold text-slate-900 dark:text-white block mb-1">
                  Follower Retention:
                </span>
                Net retention efficiency sits at <span className="font-semibold text-brand-600 dark:text-brand-400">81.2%</span>, well above industry benchmarks for professional accounts.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
