import React, { useMemo } from 'react';
import { Sparkles, Eye, Reply, ArrowRight, CornerUpRight, LogOut, CheckCircle2 } from 'lucide-react';
import { MetricCard } from '../common/MetricCard';
import { getMediaItemsForAccount } from '../../data/demoData';
import { useWorkspace } from '../../context/WorkspaceContext';
import { formatNumber } from '../../utils/formatters';

export const StoriesTab: React.FC = () => {
  const { currentConnection } = useWorkspace();
  const mediaItems = useMemo(() => getMediaItemsForAccount(currentConnection?.username), [currentConnection?.username]);
  const stories = mediaItems.filter(m => m.mediaType === 'STORY');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            Instagram Stories Analytics
          </h1>
          <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400">
            24h Ephemeral Insights
          </span>
        </div>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
          Monitor story impressions, completion rates, forward/backward taps, and reply metrics via Meta Graph API.
        </p>
      </div>

      {/* Stories KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Avg. Story Reach"
          value="8,450"
          change={8.4}
          changeLabel="vs previous period"
          icon={Eye}
          iconColor="text-amber-600 bg-amber-50 dark:bg-amber-950/60"
        />
        <MetricCard
          title="Completion Rate"
          value="87.4%"
          subtitle="Users who watched full story"
          icon={CheckCircle2}
          iconColor="text-emerald-600 bg-emerald-50 dark:bg-emerald-950/60"
        />
        <MetricCard
          title="Direct Replies"
          value="142"
          change={12.1}
          changeLabel="conversations initiated"
          icon={Reply}
          iconColor="text-blue-600 bg-blue-50 dark:bg-blue-950/60"
        />
        <MetricCard
          title="Exit Rate"
          value="12.6%"
          subtitle="Low exit signals high viewer interest"
          icon={LogOut}
          iconColor="text-rose-600 bg-rose-50 dark:bg-rose-950/60"
        />
      </div>

      {/* Active Stories List */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm">
        <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-2">
          Recent Stories Performance
        </h3>
        <p className="text-xs text-slate-400 mb-4">
          Note: Instagram Stories metrics are permanently retained in your AJAYNXT database cache even after 24 hours expire on Instagram.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {stories.map(story => (
            <div
              key={story.id}
              className="border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden bg-slate-50/50 dark:bg-slate-800/30 flex gap-4 p-4"
            >
              <div className="w-20 h-32 rounded-lg overflow-hidden shrink-0 border border-slate-300 dark:border-slate-700 bg-slate-200">
                <img
                  src={story.thumbnailUrl}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex-1 flex flex-col justify-between text-xs">
                <div>
                  <span className="text-[10px] text-amber-500 font-semibold uppercase tracking-wider">
                    Interactive Poll Story
                  </span>
                  <p className="text-slate-800 dark:text-slate-200 font-medium line-clamp-2 mt-1">
                    {story.caption}
                  </p>
                </div>

                <div className="space-y-1.5 pt-2 border-t border-slate-200/60 dark:border-slate-800">
                  <div className="flex justify-between text-slate-500">
                    <span>Reach:</span>
                    <span className="font-semibold text-slate-800 dark:text-slate-200">{formatNumber(story.reach)}</span>
                  </div>
                  <div className="flex justify-between text-slate-500">
                    <span>Impressions:</span>
                    <span className="font-semibold text-slate-800 dark:text-slate-200">{formatNumber(story.views)}</span>
                  </div>
                  <div className="flex justify-between text-slate-500">
                    <span>Direct Replies:</span>
                    <span className="font-semibold text-brand-600 dark:text-brand-400">{story.comments}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
