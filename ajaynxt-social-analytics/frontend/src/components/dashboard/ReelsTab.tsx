import React, { useMemo } from 'react';
import { Film, Play, Heart, MessageCircle, Bookmark, Share2, Radio, TrendingUp, Sparkles, ExternalLink } from 'lucide-react';
import { MetricCard } from '../common/MetricCard';
import { getMediaItemsForAccount } from '../../data/demoData';
import { useWorkspace } from '../../context/WorkspaceContext';
import { formatNumber, formatDuration } from '../../utils/formatters';

export const ReelsTab: React.FC = () => {
  const { currentConnection } = useWorkspace();
  const mediaItems = useMemo(() => getMediaItemsForAccount(currentConnection?.username), [currentConnection?.username]);
  const reels = mediaItems.filter(m => m.mediaType === 'REEL');
  const totalPlays = reels.reduce((sum, r) => sum + r.views, 0);
  const totalReach = reels.reduce((sum, r) => sum + r.reach, 0);
  const totalSaves = reels.reduce((sum, r) => sum + r.saves, 0);
  const totalShares = reels.reduce((sum, r) => sum + r.shares, 0);
  const avgSaveRate = ((totalSaves / totalReach) * 100).toFixed(1);
  const avgShareRate = ((totalShares / totalReach) * 100).toFixed(1);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            Instagram Reels Performance
          </h1>
          <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-pink-500/10 text-pink-600 dark:text-pink-400">
            Short-Form Video Engine
          </span>
        </div>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
          Deep analytics on video plays, retention velocity, algorithmic distribution signals and save/share ratios.
        </p>
      </div>

      {/* Top Reel KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Total Reel Plays"
          value={formatNumber(totalPlays)}
          change={24.2}
          changeLabel="vs previous 30d"
          icon={Play}
          iconColor="text-pink-600 bg-pink-50 dark:bg-pink-950/60"
        />
        <MetricCard
          title="Reel Organic Reach"
          value={formatNumber(totalReach)}
          change={19.5}
          changeLabel="unique accounts reached"
          icon={Radio}
          iconColor="text-purple-600 bg-purple-50 dark:bg-purple-950/60"
        />
        <MetricCard
          title="Avg. Save Rate"
          value={`${avgSaveRate}%`}
          subtitle="Key ranking signal for explore page"
          icon={Bookmark}
          iconColor="text-amber-600 bg-amber-50 dark:bg-amber-950/60"
        />
        <MetricCard
          title="Avg. Share Rate"
          value={`${avgShareRate}%`}
          subtitle="High DM viral distribution"
          icon={Share2}
          iconColor="text-emerald-600 bg-emerald-50 dark:bg-emerald-950/60"
        />
      </div>

      {/* Reels Grid */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm">
        <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-4">
          All Published Reels ({reels.length})
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {reels.map(reel => (
            <div
              key={reel.id}
              className="border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden bg-slate-50/50 dark:bg-slate-800/20 hover:border-brand-500 transition-all flex flex-col"
            >
              <div className="relative aspect-[9/12] w-full overflow-hidden bg-slate-200 dark:bg-slate-800 group">
                <img
                  src={reel.thumbnailUrl}
                  alt={reel.caption}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 p-3 flex flex-col justify-between">
                  <div className="flex items-center justify-between">
                    <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-pink-600 text-white flex items-center gap-1">
                      <Play className="w-2.5 h-2.5 fill-current" />
                      {reel.durationSeconds}s
                    </span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500 text-white">
                      {reel.engagementRate}% ER
                    </span>
                  </div>

                  <div>
                    <div className="flex items-center gap-3 text-white text-xs mb-1 font-semibold">
                      <span className="flex items-center gap-1">
                        <Play className="w-3.5 h-3.5 fill-current text-white/80" />
                        {formatNumber(reel.views)}
                      </span>
                      <span className="flex items-center gap-1">
                        <Radio className="w-3.5 h-3.5 text-white/80" />
                        {formatNumber(reel.reach)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4 flex-1 flex flex-col justify-between">
                <p className="text-xs text-slate-800 dark:text-slate-200 line-clamp-3 font-medium mb-3">
                  {reel.caption}
                </p>

                <div className="space-y-2 pt-2 border-t border-slate-200/60 dark:border-slate-800 text-xs">
                  <div className="grid grid-cols-4 gap-1 text-center">
                    <div className="bg-slate-100 dark:bg-slate-800/60 p-1.5 rounded">
                      <Heart className="w-3.5 h-3.5 text-pink-500 mx-auto mb-0.5" />
                      <span className="font-semibold text-slate-800 dark:text-slate-200">
                        {formatNumber(reel.likes)}
                      </span>
                    </div>
                    <div className="bg-slate-100 dark:bg-slate-800/60 p-1.5 rounded">
                      <MessageCircle className="w-3.5 h-3.5 text-blue-500 mx-auto mb-0.5" />
                      <span className="font-semibold text-slate-800 dark:text-slate-200">
                        {formatNumber(reel.comments)}
                      </span>
                    </div>
                    <div className="bg-slate-100 dark:bg-slate-800/60 p-1.5 rounded">
                      <Bookmark className="w-3.5 h-3.5 text-amber-500 mx-auto mb-0.5" />
                      <span className="font-semibold text-slate-800 dark:text-slate-200">
                        {formatNumber(reel.saves)}
                      </span>
                    </div>
                    <div className="bg-slate-100 dark:bg-slate-800/60 p-1.5 rounded">
                      <Share2 className="w-3.5 h-3.5 text-emerald-500 mx-auto mb-0.5" />
                      <span className="font-semibold text-slate-800 dark:text-slate-200">
                        {formatNumber(reel.shares)}
                      </span>
                    </div>
                  </div>

                  <a
                    href={reel.permalink}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-center gap-1.5 w-full py-1.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700/80 rounded-lg text-slate-700 dark:text-slate-300 text-[11px] font-medium transition"
                  >
                    Open Reel in Instagram
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
