import React, { useState, useMemo } from 'react';
import {
  Search,
  ArrowUpDown,
  Filter,
  ExternalLink,
  Film,
  Grid3X3,
  Layers,
  Sparkles,
  Heart,
  MessageCircle,
  Bookmark,
  Share2,
  Eye,
  Radio
} from 'lucide-react';
import { DEMO_MEDIA_ITEMS } from '../../data/demoData';
import { MediaItem, MediaType } from '../../types/analytics';
import { formatNumber, formatFullDate } from '../../utils/formatters';
import { cn } from '../../utils/cn';

type SortField = 'publishedAt' | 'reach' | 'views' | 'likes' | 'comments' | 'saves' | 'shares' | 'engagementRate';

export const ContentTab: React.FC = () => {
  const [mediaTypeFilter, setMediaTypeFilter] = useState<'ALL' | MediaType>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortField, setSortField] = useState<SortField>('publishedAt');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(prev => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortField(field);
      setSortOrder('desc');
    }
  };

  const filteredItems = useMemo(() => {
    return DEMO_MEDIA_ITEMS.filter(item => {
      if (mediaTypeFilter !== 'ALL' && item.mediaType !== mediaTypeFilter) {
        return false;
      }
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        return item.caption.toLowerCase().includes(query);
      }
      return true;
    }).sort((a, b) => {
      let aVal = a[sortField] || 0;
      let bVal = b[sortField] || 0;

      if (sortField === 'publishedAt') {
        aVal = new Date(a.publishedAt).getTime();
        bVal = new Date(b.publishedAt).getTime();
      }

      if (sortOrder === 'asc') {
        return aVal > bVal ? 1 : -1;
      } else {
        return aVal < bVal ? 1 : -1;
      }
    });
  }, [mediaTypeFilter, searchQuery, sortField, sortOrder]);

  const getTypeBadge = (type: MediaType) => {
    switch (type) {
      case 'REEL':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold bg-pink-500/10 text-pink-600 dark:text-pink-400">
            <Film className="w-3 h-3" />
            Reel
          </span>
        );
      case 'CAROUSEL':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold bg-amber-500/10 text-amber-600 dark:text-amber-400">
            <Layers className="w-3 h-3" />
            Carousel
          </span>
        );
      case 'STORY':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold bg-purple-500/10 text-purple-600 dark:text-purple-400">
            <Sparkles className="w-3 h-3" />
            Story
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold bg-blue-500/10 text-blue-600 dark:text-blue-400">
            <Grid3X3 className="w-3 h-3" />
            Post
          </span>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            Content & Media Performance
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Detailed performance breakdown of Feed Posts, Reels, Carousels and Stories.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400 font-medium">
            Showing {filteredItems.length} media items
          </span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Type tabs */}
        <div className="flex items-center bg-slate-100 dark:bg-slate-800/80 p-1 rounded-lg border border-slate-200 dark:border-slate-700/60 w-full md:w-auto overflow-x-auto">
          {(['ALL', 'POST', 'REEL', 'CAROUSEL', 'STORY'] as const).map(type => (
            <button
              key={type}
              onClick={() => setMediaTypeFilter(type)}
              className={cn(
                "px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition",
                mediaTypeFilter === type
                  ? "bg-white dark:bg-slate-900 text-brand-600 dark:text-brand-400 shadow-xs border border-slate-200 dark:border-slate-700"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              )}
            >
              {type === 'ALL' ? 'All Formats' : type === 'POST' ? 'Posts' : type === 'REEL' ? 'Reels' : type === 'CAROUSEL' ? 'Carousels' : 'Stories'}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search captions or hashtags..."
            className="w-full pl-9 pr-4 py-2 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-lg text-xs text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500"
          />
        </div>
      </div>

      {/* Content Table */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                <th className="py-3 px-4">Post & Caption</th>
                <th className="py-3 px-3">Type</th>
                <th
                  className="py-3 px-3 cursor-pointer hover:text-slate-900 dark:hover:text-white"
                  onClick={() => handleSort('publishedAt')}
                >
                  <div className="flex items-center gap-1">
                    Published
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th
                  className="py-3 px-3 text-right cursor-pointer hover:text-slate-900 dark:hover:text-white"
                  onClick={() => handleSort('reach')}
                >
                  <div className="flex items-center justify-end gap-1">
                    Reach
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th
                  className="py-3 px-3 text-right cursor-pointer hover:text-slate-900 dark:hover:text-white"
                  onClick={() => handleSort('views')}
                >
                  <div className="flex items-center justify-end gap-1">
                    Views
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th
                  className="py-3 px-3 text-right cursor-pointer hover:text-slate-900 dark:hover:text-white"
                  onClick={() => handleSort('likes')}
                >
                  <div className="flex items-center justify-end gap-1">
                    Likes
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th
                  className="py-3 px-3 text-right cursor-pointer hover:text-slate-900 dark:hover:text-white"
                  onClick={() => handleSort('comments')}
                >
                  <div className="flex items-center justify-end gap-1">
                    Comments
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th
                  className="py-3 px-3 text-right cursor-pointer hover:text-slate-900 dark:hover:text-white"
                  onClick={() => handleSort('saves')}
                >
                  <div className="flex items-center justify-end gap-1">
                    Saves
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th
                  className="py-3 px-3 text-right cursor-pointer hover:text-slate-900 dark:hover:text-white"
                  onClick={() => handleSort('shares')}
                >
                  <div className="flex items-center justify-end gap-1">
                    Shares
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th
                  className="py-3 px-4 text-right cursor-pointer hover:text-slate-900 dark:hover:text-white"
                  onClick={() => handleSort('engagementRate')}
                >
                  <div className="flex items-center justify-end gap-1">
                    ER %
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredItems.map(item => (
                <tr
                  key={item.id}
                  className="hover:bg-slate-50/70 dark:hover:bg-slate-800/40 transition-colors"
                >
                  {/* Media Preview & Caption */}
                  <td className="py-3 px-4 max-w-xs sm:max-w-md">
                    <div className="flex items-center gap-3">
                      <div className="relative w-12 h-12 rounded-lg overflow-hidden shrink-0 border border-slate-200 dark:border-slate-700 bg-slate-100">
                        <img
                          src={item.thumbnailUrl}
                          alt=""
                          className="w-full h-full object-cover"
                        />
                        {item.durationSeconds && (
                          <span className="absolute bottom-0.5 right-0.5 bg-black/80 text-[8px] text-white px-1 rounded font-mono">
                            {item.durationSeconds}s
                          </span>
                        )}
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs text-slate-900 dark:text-slate-100 line-clamp-2 font-medium">
                          {item.caption}
                        </p>
                        <a
                          href={item.permalink}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1 text-[10px] text-brand-600 dark:text-brand-400 hover:underline mt-0.5"
                        >
                          View on Instagram
                          <ExternalLink className="w-2.5 h-2.5" />
                        </a>
                      </div>
                    </div>
                  </td>

                  {/* Type */}
                  <td className="py-3 px-3 whitespace-nowrap">
                    {getTypeBadge(item.mediaType)}
                  </td>

                  {/* Published Date */}
                  <td className="py-3 px-3 whitespace-nowrap text-slate-500 dark:text-slate-400">
                    {formatFullDate(item.publishedAt)}
                  </td>

                  {/* Reach */}
                  <td className="py-3 px-3 text-right font-semibold text-slate-800 dark:text-slate-200">
                    {formatNumber(item.reach)}
                  </td>

                  {/* Views */}
                  <td className="py-3 px-3 text-right text-slate-600 dark:text-slate-300">
                    {formatNumber(item.views)}
                  </td>

                  {/* Likes */}
                  <td className="py-3 px-3 text-right text-slate-600 dark:text-slate-300">
                    {formatNumber(item.likes)}
                  </td>

                  {/* Comments */}
                  <td className="py-3 px-3 text-right text-slate-600 dark:text-slate-300">
                    {formatNumber(item.comments)}
                  </td>

                  {/* Saves */}
                  <td className="py-3 px-3 text-right font-medium text-amber-600 dark:text-amber-400">
                    {formatNumber(item.saves)}
                  </td>

                  {/* Shares */}
                  <td className="py-3 px-3 text-right font-medium text-emerald-600 dark:text-emerald-400">
                    {formatNumber(item.shares)}
                  </td>

                  {/* Engagement Rate */}
                  <td className="py-3 px-4 text-right">
                    <span className="inline-block px-2 py-0.5 rounded text-[11px] font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                      {item.engagementRate}%
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
