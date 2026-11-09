import React, { useMemo } from 'react';
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';
import { Heart, MessageCircle, Bookmark, Share2, Clock, Calendar, Sparkles } from 'lucide-react';
import { MetricCard } from '../common/MetricCard';
import { useWorkspace } from '../../context/WorkspaceContext';
import { getFilteredMetrics } from '../../data/demoData';
import { formatNumber } from '../../utils/formatters';

export const EngagementTab: React.FC = () => {
  const { dateRangePreset, currentConnection } = useWorkspace();
  const days = dateRangePreset === '7d' ? 7 : dateRangePreset === '90d' ? 90 : 30;
  const { overview } = useMemo(
    () => getFilteredMetrics(days, currentConnection?.username),
    [days, currentConnection?.username]
  );

  const likesCount = Math.floor(overview.totalInteractions * 0.65);
  const savesCount = Math.floor(overview.totalInteractions * 0.18);
  const sharesCount = Math.floor(overview.totalInteractions * 0.11);
  const commentsCount = Math.floor(overview.totalInteractions * 0.06);

  const interactionTypeData = [
    { name: 'Likes', value: likesCount, color: '#ec4899' },
    { name: 'Saves (Bookmarks)', value: savesCount, color: '#f59e0b' },
    { name: 'Shares (DMs/Stories)', value: sharesCount, color: '#10b981' },
    { name: 'Comments', value: commentsCount, color: '#3b82f6' },
  ];

  const weekdayData = [
    { day: 'Mon', interactions: Math.floor(overview.totalInteractions * 0.11), reach: 38200 },
    { day: 'Tue', interactions: Math.floor(overview.totalInteractions * 0.12), reach: 41000 },
    { day: 'Wed', interactions: Math.floor(overview.totalInteractions * 0.14), reach: 44500 },
    { day: 'Thu', interactions: Math.floor(overview.totalInteractions * 0.13), reach: 42100 },
    { day: 'Fri', interactions: Math.floor(overview.totalInteractions * 0.16), reach: 52000 },
    { day: 'Sat', interactions: Math.floor(overview.totalInteractions * 0.19), reach: 64200 },
    { day: 'Sun', interactions: Math.floor(overview.totalInteractions * 0.15), reach: 58900 },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            Audience Engagement & Interactions
          </h1>
          <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-brand-500/10 text-brand-600 dark:text-brand-400">
            Interaction Composition
          </span>
        </div>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
          Analysis of user loyalty signals: saves, shares, meaningful comments, and temporal activity patterns.
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Likes"
          value={formatNumber(likesCount)}
          subtitle="65% of all interactions"
          icon={Heart}
          iconColor="text-pink-600 bg-pink-50 dark:bg-pink-950/60"
        />
        <MetricCard
          title="Saves (Bookmarks)"
          value={formatNumber(savesCount)}
          subtitle="18% save velocity"
          icon={Bookmark}
          iconColor="text-amber-600 bg-amber-50 dark:bg-amber-950/60"
        />
        <MetricCard
          title="Shares"
          value={formatNumber(sharesCount)}
          subtitle="11% viral referral rate"
          icon={Share2}
          iconColor="text-emerald-600 bg-emerald-50 dark:bg-emerald-950/60"
        />
        <MetricCard
          title="Comments"
          value={formatNumber(commentsCount)}
          subtitle="Conversational depth"
          icon={MessageCircle}
          iconColor="text-blue-600 bg-blue-50 dark:bg-blue-950/60"
        />
      </div>

      {/* Visualizations Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Interaction Breakdown Donut */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm">
          <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-1">
            Interaction Distribution by Type
          </h3>
          <p className="text-xs text-slate-400 mb-4">
            Balance between passive likes and high-intent saves & shares
          </p>

          <div className="h-[280px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={interactionTypeData}
                  cx="50%"
                  cy="50%"
                  innerRadius={65}
                  outerRadius={95}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {interactionTypeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(val: any) => [formatNumber(Number(val)), 'Total']}
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    borderColor: '#334155',
                    borderRadius: '8px',
                    fontSize: '12px',
                    color: '#fff',
                  }}
                />
                <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={{ fontSize: '11px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Weekly Rhythm */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm">
          <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-1">
            Engagement Velocity by Day of Week
          </h3>
          <p className="text-xs text-slate-400 mb-4">
            Aggregated interaction volumes across days
          </p>

          <div className="h-[280px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weekdayData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.2} vertical={false} />
                <XAxis dataKey="day" stroke="#94a3b8" fontSize={11} tickLine={false} />
                <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} tickFormatter={val => formatNumber(val)} />
                <Tooltip
                  formatter={(val: any) => [formatNumber(Number(val)), 'Interactions']}
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    borderColor: '#334155',
                    borderRadius: '8px',
                    fontSize: '12px',
                    color: '#fff',
                  }}
                />
                <Bar dataKey="interactions" fill="#6366f1" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};
