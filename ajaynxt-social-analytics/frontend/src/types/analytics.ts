export type MediaType = 'POST' | 'REEL' | 'CAROUSEL' | 'STORY';

export interface DailyMetric {
  date: string; // YYYY-MM-DD
  totalFollowers: number;
  followersGained: number;
  followersLost: number;
  netFollowers: number;
  following: number;
  reach: number;
  views: number;
  accountsEngaged: number;
  totalInteractions: number;
  likes: number;
  comments: number;
  saves: number;
  shares: number;
  engagementRate: number; // percentage (e.g. 4.25)
}

export interface MediaItem {
  id: string;
  caption: string;
  mediaType: MediaType;
  publishedAt: string;
  permalink: string;
  thumbnailUrl: string;
  reach: number;
  views: number;
  likes: number;
  comments: number;
  saves: number;
  shares: number;
  engagementRate: number;
  durationSeconds?: number; // for reels/videos
}

export interface AccountOverviewMetrics {
  totalFollowers: number;
  followersGrowthRate: number; // e.g. +3.4%
  followersGained: number;
  followersLost: number;
  netFollowerGrowth: number;
  following: number;
  accountReach: number;
  reachChange: number;
  views: number;
  viewsChange: number;
  accountsEngaged: number;
  engagedChange: number;
  totalInteractions: number;
  interactionsChange: number;
  overallEngagementRate: number;
}

export interface ContentSummaryMetrics {
  feedPostsCount: number;
  reelsCount: number;
  storiesCount: number;
  totalLikes: number;
  totalComments: number;
  totalSaves: number;
  totalShares: number;
  avgReachPerPost: number;
  avgReachPerReel: number;
  avgReachPerStory: number;
  avgEngagementRate: number;
}

export type DateRangePreset = '7d' | '30d' | '90d' | 'custom';

export interface DateRange {
  startDate: string;
  endDate: string;
  preset: DateRangePreset;
}
