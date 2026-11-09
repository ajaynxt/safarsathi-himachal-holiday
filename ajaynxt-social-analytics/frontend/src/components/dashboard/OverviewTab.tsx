import React, { useMemo } from 'react';
import {
  Users,
  UserPlus,
  UserMinus,
  TrendingUp,
  Eye,
  Radio,
  HeartHandshake,
  MessageCircle,
  Share2,
  Bookmark,
  Sparkles,
  ArrowRight,
  Info
} from 'lucide-react';
import { MetricCard } from '../common/MetricCard';
import { useWorkspace } from '../../context/WorkspaceContext';
import { getFilteredMetrics, DEMO_MEDIA_ITEMS } from '../../data/demoData';
import { formatNumber } from '../../utils/formatters';
import { ActiveTab } from '../layout/Sidebar';

interface OverviewTabProps {
  onNavigateTab: (tab: ActiveTab) => void;
}

export const OverviewTab: React.FC<OverviewTabProps> = ({ onNavigateTab }) => {
  const { dateRangePreset, currentConnection } = useWorkspace();

  const days = dateRangePreset === '7d' ? 7 : dateRangePreset === '90d' ? 90 : 30;
  const { overview, contentSummary } = useMemo(() => getFilteredMetrics(days), [days]);

  return (
    <div className="space-y-6">
      {/* Header Info */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
            Instagram Overview
            {currentConnection && (
              <span className="text-xs font-normal text-slate-500 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full">
                @{currentConnection.username}
              </span>
            )}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Official Meta Graph API v21.0 metrics for the selected {days}-day period.
          </p>
        </div>

        <button
          onClick={() => onNavigateTab('instagram_evolution')}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-brand-600 dark:text-brand-400 bg-brand-50 dark:bg-brand-950/50 hover:bg-brand-100 dark:hover:bg-brand-900/50 rounded-xl transition w-fit"
        >
          View Full Evolution Timeline
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Row 1: Follower & Growth Dynamics */}
      <div>
        <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-3">
          Follower Dynamics
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard
            title="Total Followers"
            value={formatNumber(overview.totalFollowers)}
            change={overview.followersGrowthRate}
            changeLabel={`net growth in ${days}d`}
            icon={Users}
            iconColor="text-indigo-600 bg-indigo-50 dark:bg-indigo-950/60"
          />
          <MetricCard
            title="Followers Gained"
            value={`+${formatNumber(overview.followersGained)}`}
            subtitle="New organic followers"
            icon={UserPlus}
            iconColor="text-emerald-600 bg-emerald-50 dark:bg-emerald-950/60"
          />
          <MetricCard
            title="Followers Lost"
            value={`-${formatNumber(overview.followersLost)}`}
            subtitle="Unfollows recorded"
            icon={UserMinus}
            iconColor="text-rose-600 bg-rose-50 dark:bg-rose-950/60"
          />
          <MetricCard
            title="Net Follower Growth"
            value={`+${formatNumber(overview.netFollowerGrowth)}`}
            subtitle={`${((overview.netFollowerGrowth / overview.followersGained) * 100).toFixed(0)}% retention efficiency`}
            icon={TrendingUp}
            iconColor="text-brand-600 bg-brand-50 dark:bg-brand-950/60"
          />
        </div>
      </div>

      {/* Row 2: Reach, Views & Audience Engagement */}
      <div>
        <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-3">
          Reach & Engagement
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard
            title="Account Reach"
            value={formatNumber(overview.accountReach)}
            change={overview.reachChange}
            changeLabel="vs previous period"
            icon={Radio}
            iconColor="text-amber-600 bg-amber-50 dark:bg-amber-950/60"
          />
          <MetricCard
            title="Total Views / Plays"
            value={formatNumber(overview.views)}
            change={overview.viewsChange}
            changeLabel="vs previous period"
            icon={Eye}
            iconColor="text-cyan-600 bg-cyan-50 dark:bg-cyan-950/60"
          />
          <MetricCard
            title="Accounts Engaged"
            value={formatNumber(overview.accountsEngaged)}
            change={overview.engagedChange}
            changeLabel="vs previous period"
            icon={HeartHandshake}
            iconColor="text-purple-600 bg-purple-50 dark:bg-purple-950/60"
          />
          <MetricCard
            title="Total Interactions"
            value={formatNumber(overview.totalInteractions)}
            change={overview.interactionsChange}
            changeLabel={`${overview.overallEngagementRate}% engagement rate`}
            icon={Sparkles}
            iconColor="text-pink-600 bg-pink-50 dark:bg-pink-950/60"
          />
        </div>
      </div>

      {/* Content Formats Performance Quick Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Feed Posts */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Feed Posts & Carousels
            </span>
            <span className="text-xs font-bold px-2 py-0.5 rounded bg-brand-500/10 text-brand-600 dark:text-brand-400">
              {contentSummary.feedPostsCount} published
            </span>
          </div>
          <div className="space-y-2 text-xs">
            <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800">
              <span className="text-slate-500">Avg. Reach / Post</span>
              <span className="font-semibold text-slate-800 dark:text-slate-200">
                {formatNumber(contentSummary.avgReachPerPost)}
              </span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800">
              <span className="text-slate-500">Total Likes</span>
              <span className="font-semibold text-slate-800 dark:text-slate-200">
                {formatNumber(contentSummary.totalLikes)}
              </span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-slate-500">Total Comments</span>
              <span className="font-semibold text-slate-800 dark:text-slate-200">
                {formatNumber(contentSummary.totalComments)}
              </span>
            </div>
          </div>
        </div>

        {/* Reels */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Instagram Reels
            </span>
            <span className="text-xs font-bold px-2 py-0.5 rounded bg-pink-500/10 text-pink-600 dark:text-pink-400">
              {contentSummary.reelsCount} published
            </span>
          </div>
          <div className="space-y-2 text-xs">
            <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800">
              <span className="text-slate-500">Avg. Reach / Reel</span>
              <span className="font-semibold text-slate-800 dark:text-slate-200">
                {formatNumber(contentSummary.avgReachPerReel)}
              </span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800">
              <span className="text-slate-500">Total Saves</span>
              <span className="font-semibold text-slate-800 dark:text-slate-200">
                {formatNumber(contentSummary.totalSaves)}
              </span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-slate-500">Total Shares</span>
              <span className="font-semibold text-slate-800 dark:text-slate-200">
                {formatNumber(contentSummary.totalShares)}
              </span>
            </div>
          </div>
        </div>

        {/* Stories */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Stories (24 Hours)
            </span>
            <span className="text-xs font-bold px-2 py-0.5 rounded bg-amber-500/10 text-amber-600 dark:text-amber-400">
              {contentSummary.storiesCount} stories
            </span>
          </div>
          <div className="space-y-2 text-xs">
            <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800">
              <span className="text-slate-500">Avg. Story Reach</span>
              <span className="font-semibold text-slate-800 dark:text-slate-200">
                {formatNumber(contentSummary.avgReachPerStory)}
              </span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800">
              <span className="text-slate-500">Completion Rate</span>
              <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                87.4%
              </span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-slate-500">Story Replies</span>
              <span className="font-semibold text-slate-800 dark:text-slate-200">
                142
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Top Performing Recent Media Preview */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
              Top Performing Recent Content
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Ranked by organic reach and engagement rate
            </p>
          </div>
          <button
            onClick={() => onNavigateTab('instagram_evolution')}
            className="text-xs text-brand-600 dark:text-brand-400 hover:underline font-medium"
          >
            View all content ({DEMO_MEDIA_ITEMS.length})
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {DEMO_MEDIA_ITEMS.slice(0, 4).map(item => (
            <div
              key={item.id}
              className="group border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden hover:border-brand-500 transition-all bg-slate-50/50 dark:bg-slate-800/30"
            >
              <div className="relative aspect-video w-full overflow-hidden bg-slate-200 dark:bg-slate-800">
                <img
                  src={item.thumbnailUrl}
                  alt={item.caption}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <span className="absolute top-2 left-2 px-1.5 py-0.5 rounded text-[10px] font-semibold bg-slate-900/80 text-white backdrop-blur-xs">
                  {item.mediaType}
                </span>
                <span className="absolute bottom-2 right-2 px-1.5 py-0.5 rounded text-[10px] font-semibold bg-emerald-600 text-white shadow-xs">
                  {item.engagementRate}% ER
                </span>
              </div>
              <div className="p-3">
                <p className="text-xs text-slate-700 dark:text-slate-300 line-clamp-2 mb-2 font-medium">
                  {item.caption}
                </p>
                <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 pt-2 border-t border-slate-200/60 dark:border-slate-800">
                  <span>Reach: {formatNumber(item.reach)}</span>
                  <span>Likes: {formatNumber(item.likes)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
