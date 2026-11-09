import { PlatformConnectorDefinition } from '../types/platforms';

export const PLATFORM_REGISTRY: Record<string, PlatformConnectorDefinition> = {
  // ---------------- 1. Instagram ----------------
  instagram: {
    id: 'instagram',
    name: 'Instagram Professional',
    category: 'social_organic',
    brandColor: '#E1306C',
    iconName: 'Instagram',
    apiStatus: 'FULLY_CONNECTED',
    apiNotes: 'Official Meta Graph API v21.0. Business & Creator accounts only. 60-day Long-Lived Token support.',
    officialDocUrl: 'https://developers.facebook.com/docs/instagram-platform/instagram-graph-api',
    supportedScopes: ['instagram_basic', 'instagram_manage_insights', 'pages_show_list', 'pages_read_engagement'],
    metrics: [
      { key: 'followers_count', label: 'Followers', description: 'Lifetime follower count', format: 'number', comparableAcrossPlatforms: true },
      { key: 'reach', label: 'Account Reach', description: 'Unique accounts that saw content', format: 'number', comparableAcrossPlatforms: true },
      { key: 'views', label: 'Impressions / Views', description: 'Total video plays and feed impressions', format: 'number', comparableAcrossPlatforms: true },
      { key: 'total_interactions', label: 'Interactions', description: 'Likes + comments + saves + shares', format: 'number', comparableAcrossPlatforms: true },
    ],
    rateLimits: { maxCallsPerDay: 200, recommendedSyncFrequency: '1x per day' },
  },

  // ---------------- 2. Facebook Pages ----------------
  facebook: {
    id: 'facebook',
    name: 'Facebook Pages',
    category: 'social_organic',
    brandColor: '#1877F2',
    iconName: 'Facebook',
    apiStatus: 'FULLY_CONNECTED',
    apiNotes: 'Meta Page Insights API v21.0. Requires Page Administrator or Analyst permissions.',
    officialDocUrl: 'https://developers.facebook.com/docs/graph-api/reference/page/insights',
    supportedScopes: ['pages_show_list', 'pages_read_engagement', 'read_insights'],
    metrics: [
      { key: 'page_fans', label: 'Page Followers', description: 'Total likes and follows on page', format: 'number', comparableAcrossPlatforms: true },
      { key: 'page_impressions', label: 'Page Impressions', description: 'Total impressions across all posts', format: 'number', comparableAcrossPlatforms: true },
      { key: 'page_engaged_users', label: 'Engaged Users', description: 'People who engaged with page posts', format: 'number', comparableAcrossPlatforms: true },
      { key: 'page_post_engagements', label: 'Post Engagements', description: 'Reactions, comments, and shares', format: 'number', comparableAcrossPlatforms: true },
    ],
    rateLimits: { maxCallsPerDay: 200, recommendedSyncFrequency: '1x per day' },
  },

  // ---------------- 3. YouTube ----------------
  youtube: {
    id: 'youtube',
    name: 'YouTube Channel',
    category: 'social_organic',
    brandColor: '#FF0000',
    iconName: 'Youtube',
    apiStatus: 'FULLY_CONNECTED',
    apiNotes: 'YouTube Analytics API & YouTube Data API v3 via Google OAuth 2.0 (yt-analytics.readonly).',
    officialDocUrl: 'https://developers.google.com/youtube/analytics',
    supportedScopes: ['https://www.googleapis.com/auth/yt-analytics.readonly', 'https://www.googleapis.com/auth/youtube.readonly'],
    metrics: [
      { key: 'subscribers', label: 'Subscribers', description: 'Channel subscriber count', format: 'number', comparableAcrossPlatforms: true },
      { key: 'views', label: 'Video Views', description: 'Total video and shorts views', format: 'number', comparableAcrossPlatforms: true },
      { key: 'watchTimeHours', label: 'Watch Time', description: 'Estimated watch time in hours', format: 'duration', comparableAcrossPlatforms: false },
      { key: 'estimatedRevenue', label: 'Ad Revenue', description: 'Estimated YouTube partner earnings', format: 'currency', comparableAcrossPlatforms: false },
    ],
    rateLimits: { maxCallsPerDay: 500, recommendedSyncFrequency: '1x per day' },
  },

  // ---------------- 4. TikTok ----------------
  tiktok: {
    id: 'tiktok',
    name: 'TikTok Business',
    category: 'social_organic',
    brandColor: '#000000',
    iconName: 'Video',
    apiStatus: 'APPROVAL_REQUIRED',
    apiNotes: 'TikTok Content & Commercial API. Note: Basic Display API does not provide deep video performance analytics.',
    officialDocUrl: 'https://developers.tiktok.com/doc/tiktok-api-overview',
    supportedScopes: ['user.info.basic', 'user.info.stats', 'video.list'],
    metrics: [
      { key: 'follower_count', label: 'Followers', description: 'TikTok profile followers', format: 'number', comparableAcrossPlatforms: true },
      { key: 'video_views', label: 'Video Views', description: 'Total views across published videos', format: 'number', comparableAcrossPlatforms: true },
      { key: 'profile_views', label: 'Profile Views', description: 'Views to TikTok profile', format: 'number', comparableAcrossPlatforms: false },
      { key: 'likes', label: 'Total Likes', description: 'Hearts received across all videos', format: 'number', comparableAcrossPlatforms: true },
    ],
    rateLimits: { maxCallsPerDay: 100, recommendedSyncFrequency: '1x per day' },
  },

  // ---------------- 5. LinkedIn Company Pages ----------------
  linkedin: {
    id: 'linkedin',
    name: 'LinkedIn Organization',
    category: 'social_organic',
    brandColor: '#0A66C2',
    iconName: 'Linkedin',
    apiStatus: 'APPROVAL_REQUIRED',
    apiNotes: 'LinkedIn Community Management API. Requires approved access to LinkedIn Developer Portal and Organization Admin rights.',
    officialDocUrl: 'https://learn.microsoft.com/en-us/linkedin/marketing/community-management',
    supportedScopes: ['r_organization_social', 'rw_organization_admin'],
    metrics: [
      { key: 'firstDegreeFollowers', label: 'Followers', description: 'Company page followers', format: 'number', comparableAcrossPlatforms: true },
      { key: 'impressions', label: 'Impressions', description: 'Total feed updates impressions', format: 'number', comparableAcrossPlatforms: true },
      { key: 'clicks', label: 'Post Clicks', description: 'Clicks on articles and company links', format: 'number', comparableAcrossPlatforms: true },
      { key: 'engagementRate', label: 'Engagement Rate', description: '(Clicks + Reactions + Comments) / Impressions', format: 'percentage', comparableAcrossPlatforms: true },
    ],
    rateLimits: { maxCallsPerDay: 100, recommendedSyncFrequency: '1x per day' },
  },

  // ---------------- 6. X (Twitter) ----------------
  x_twitter: {
    id: 'x_twitter',
    name: 'X (Twitter)',
    category: 'social_organic',
    brandColor: '#14171A',
    iconName: 'Twitter',
    apiStatus: 'LIMITED_ANALYTICS',
    apiNotes: 'X API v2. Available metrics depend strictly on X Developer Tier (Free tier has read caps, Basic tier is $100/mo for tweet metrics).',
    officialDocUrl: 'https://developer.x.com/en/docs/twitter-api',
    supportedScopes: ['tweet.read', 'users.read'],
    metrics: [
      { key: 'followers_count', label: 'Followers', description: 'X account followers', format: 'number', comparableAcrossPlatforms: true },
      { key: 'tweet_impressions', label: 'Impressions', description: 'Times tweets were seen in timelines', format: 'number', comparableAcrossPlatforms: true },
      { key: 'engagements', label: 'Engagements', description: 'Retweets, likes, and replies', format: 'number', comparableAcrossPlatforms: true },
      { key: 'retweets', label: 'Reposts / RTs', description: 'Times posts were amplified', format: 'number', comparableAcrossPlatforms: true },
    ],
    rateLimits: { maxCallsPerDay: 50, recommendedSyncFrequency: '1x per day' },
  },

  // ---------------- 7. Pinterest ----------------
  pinterest: {
    id: 'pinterest',
    name: 'Pinterest Business',
    category: 'social_organic',
    brandColor: '#BD081C',
    iconName: 'Pin',
    apiStatus: 'FULLY_CONNECTED',
    apiNotes: 'Pinterest API v5 for Business. Tracks organic pin impressions, saves, and outbound clicks.',
    officialDocUrl: 'https://developers.pinterest.com/docs/api/v5/',
    supportedScopes: ['boards:read', 'pins:read', 'user_accounts:read'],
    metrics: [
      { key: 'followers', label: 'Followers', description: 'Pinterest board followers', format: 'number', comparableAcrossPlatforms: true },
      { key: 'monthly_views', label: 'Monthly Views', description: 'Monthly viewer reach', format: 'number', comparableAcrossPlatforms: true },
      { key: 'pin_impressions', label: 'Pin Impressions', description: 'Times pins appeared on screen', format: 'number', comparableAcrossPlatforms: true },
      { key: 'pin_saves', label: 'Saves (Repins)', description: 'Times ideas were saved to user boards', format: 'number', comparableAcrossPlatforms: true },
    ],
    rateLimits: { maxCallsPerDay: 150, recommendedSyncFrequency: '1x per day' },
  },

  // ---------------- 8. Threads ----------------
  threads: {
    id: 'threads',
    name: 'Threads by Meta',
    category: 'social_organic',
    brandColor: '#000000',
    iconName: 'MessageSquare',
    apiStatus: 'FULLY_CONNECTED',
    apiNotes: 'Meta Threads API. Provides official post analytics (views, likes, replies, reposts, quotes).',
    officialDocUrl: 'https://developers.facebook.com/docs/threads',
    supportedScopes: ['threads_basic', 'threads_content_publish', 'threads_read_replies'],
    metrics: [
      { key: 'followers', label: 'Followers', description: 'Threads profile followers', format: 'number', comparableAcrossPlatforms: true },
      { key: 'views', label: 'Thread Views', description: 'Total impressions across thread posts', format: 'number', comparableAcrossPlatforms: true },
      { key: 'likes', label: 'Likes', description: 'Hearts on threads', format: 'number', comparableAcrossPlatforms: true },
      { key: 'replies', label: 'Replies', description: 'Conversational responses', format: 'number', comparableAcrossPlatforms: true },
    ],
    rateLimits: { maxCallsPerDay: 100, recommendedSyncFrequency: '1x per day' },
  },

  // ---------------- 9. Snapchat ----------------
  snapchat: {
    id: 'snapchat',
    name: 'Snapchat Marketing',
    category: 'paid_advertising',
    brandColor: '#FFFC00',
    iconName: 'Ghost',
    apiStatus: 'ADS_ONLY',
    apiNotes: 'Snapchat Marketing API supports advertising metrics only. Organic Snaps are ephemeral and unavailable via public APIs.',
    officialDocUrl: 'https://marketingapi.snapchat.com/docs/',
    supportedScopes: ['snapchat-marketing-api'],
    metrics: [
      { key: 'spend', label: 'Snap Ad Spend', description: 'Advertising amount spent', format: 'currency', comparableAcrossPlatforms: true },
      { key: 'impressions', label: 'Ad Impressions', description: 'Times ads were served in stories/spotlight', format: 'number', comparableAcrossPlatforms: true },
      { key: 'swipe_ups', label: 'Swipe Ups', description: 'Direct swipe-up link actions', format: 'number', comparableAcrossPlatforms: true },
      { key: 'eCpm', label: 'eCPM', description: 'Effective cost per thousand impressions', format: 'currency', comparableAcrossPlatforms: false },
    ],
    rateLimits: { maxCallsPerDay: 100, recommendedSyncFrequency: '1x per day' },
  },

  // ---------------- 10. Twitch ----------------
  twitch: {
    id: 'twitch',
    name: 'Twitch Channel',
    category: 'social_organic',
    brandColor: '#9146FF',
    iconName: 'Tv',
    apiStatus: 'FULLY_CONNECTED',
    apiNotes: 'Twitch Helix API. Provides channel follower counts, stream duration, and viewer metrics.',
    officialDocUrl: 'https://dev.twitch.tv/docs/api/',
    supportedScopes: ['user:read:broadcast', 'channel:read:subscriptions'],
    metrics: [
      { key: 'followers', label: 'Channel Followers', description: 'Total Twitch followers', format: 'number', comparableAcrossPlatforms: true },
      { key: 'stream_views', label: 'Stream Views', description: 'Total live viewer impressions', format: 'number', comparableAcrossPlatforms: true },
      { key: 'peak_viewers', label: 'Peak Viewers', description: 'Highest concurrent viewers during stream', format: 'number', comparableAcrossPlatforms: false },
      { key: 'hours_streamed', label: 'Broadcast Hours', description: 'Total live hours broadcasted', format: 'duration', comparableAcrossPlatforms: false },
    ],
    rateLimits: { maxCallsPerDay: 100, recommendedSyncFrequency: '1x per day' },
  },

  // ---------------- 11. Bluesky ----------------
  bluesky: {
    id: 'bluesky',
    name: 'Bluesky Social',
    category: 'social_organic',
    brandColor: '#0085FF',
    iconName: 'Cloud',
    apiStatus: 'FULLY_CONNECTED',
    apiNotes: 'AT Protocol (Authenticated Transfer Protocol). Decentralized open social analytics.',
    officialDocUrl: 'https://atproto.com/guides/overview',
    supportedScopes: ['atproto'],
    metrics: [
      { key: 'followers', label: 'Followers', description: 'Bluesky network followers', format: 'number', comparableAcrossPlatforms: true },
      { key: 'posts_count', label: 'Posts Published', description: 'Skeets / posts published', format: 'number', comparableAcrossPlatforms: true },
      { key: 'likes_count', label: 'Likes Received', description: 'Likes across posts', format: 'number', comparableAcrossPlatforms: true },
      { key: 'reposts_count', label: 'Reposts', description: 'Times content was reposted', format: 'number', comparableAcrossPlatforms: true },
    ],
    rateLimits: { maxCallsPerDay: 300, recommendedSyncFrequency: '1x per day' },
  },

  // ---------------- 12. Reddit ----------------
  reddit: {
    id: 'reddit',
    name: 'Reddit Brand Profile',
    category: 'social_organic',
    brandColor: '#FF4500',
    iconName: 'Smile',
    apiStatus: 'DEV_ACCESS',
    apiNotes: 'Reddit Data API OAuth. Follows Reddit commercial API developer guidelines.',
    officialDocUrl: 'https://www.reddit.com/dev/api/',
    supportedScopes: ['identity', 'read', 'mysubreddits'],
    metrics: [
      { key: 'subscribers', label: 'Profile Followers', description: 'Subreddit or profile followers', format: 'number', comparableAcrossPlatforms: true },
      { key: 'total_karma', label: 'Brand Karma', description: 'Post and comment karma', format: 'number', comparableAcrossPlatforms: false },
      { key: 'upvotes', label: 'Net Upvotes', description: 'Upvotes received on discussions', format: 'number', comparableAcrossPlatforms: true },
      { key: 'comments_count', label: 'Comments Count', description: 'Community conversation depth', format: 'number', comparableAcrossPlatforms: true },
    ],
    rateLimits: { maxCallsPerDay: 60, recommendedSyncFrequency: '1x per day' },
  },

  // ---------------- 13. Meta Ads ----------------
  meta_ads: {
    id: 'meta_ads',
    name: 'Meta Marketing Ads',
    category: 'paid_advertising',
    brandColor: '#0081FB',
    iconName: 'BadgePercent',
    apiStatus: 'FULLY_CONNECTED',
    apiNotes: 'Meta Marketing API v21.0. Read-only campaign, ad set, and ad telemetry.',
    officialDocUrl: 'https://developers.facebook.com/docs/marketing-api',
    supportedScopes: ['ads_read', 'read_insights'],
    metrics: [
      { key: 'spend', label: 'Ad Spend', description: 'Total advertising expenditure', format: 'currency', comparableAcrossPlatforms: true },
      { key: 'impressions', label: 'Ad Impressions', description: 'Total times ads were displayed', format: 'number', comparableAcrossPlatforms: true },
      { key: 'link_clicks', label: 'Link Clicks', description: 'Clicks leading to destination', format: 'number', comparableAcrossPlatforms: true },
      { key: 'conversions', label: 'Results / Leads', description: 'Reported conversion actions', format: 'number', comparableAcrossPlatforms: true },
    ],
    rateLimits: { maxCallsPerDay: 150, recommendedSyncFrequency: '1x per day' },
  },

  // ---------------- 14. Google Ads ----------------
  google_ads: {
    id: 'google_ads',
    name: 'Google Ads',
    category: 'paid_advertising',
    brandColor: '#4285F4',
    iconName: 'Flame',
    apiStatus: 'APPROVAL_REQUIRED',
    apiNotes: 'Google Ads API. Requires approved Developer Token and Manager Account linkage.',
    officialDocUrl: 'https://developers.google.com/google-ads/api/docs/first-call/overview',
    supportedScopes: ['https://www.googleapis.com/auth/adwords'],
    metrics: [
      { key: 'cost', label: 'Google Ad Spend', description: 'Total search and display ad spend', format: 'currency', comparableAcrossPlatforms: true },
      { key: 'impressions', label: 'Search Impressions', description: 'Ad appearances in search results', format: 'number', comparableAcrossPlatforms: true },
      { key: 'clicks', label: 'Ad Clicks', description: 'Direct visits from ads', format: 'number', comparableAcrossPlatforms: true },
      { key: 'conversions', label: 'Conversions', description: 'Tracked goal completions', format: 'number', comparableAcrossPlatforms: true },
    ],
    rateLimits: { maxCallsPerDay: 200, recommendedSyncFrequency: '1x per day' },
  },

  // ---------------- 15. Google Analytics 4 ----------------
  ga4: {
    id: 'ga4',
    name: 'Google Analytics 4',
    category: 'web_analytics',
    brandColor: '#F9AB00',
    iconName: 'Activity',
    apiStatus: 'FULLY_CONNECTED',
    apiNotes: 'Google Analytics Data API. Least-privilege analytics.readonly OAuth scope.',
    officialDocUrl: 'https://developers.google.com/analytics/devguides/reporting/data/v1',
    supportedScopes: ['https://www.googleapis.com/auth/analytics.readonly'],
    metrics: [
      { key: 'activeUsers', label: 'Active Users', description: 'Distinct users who visited site', format: 'number', comparableAcrossPlatforms: true },
      { key: 'sessions', label: 'Sessions', description: 'Total browsing sessions', format: 'number', comparableAcrossPlatforms: true },
      { key: 'conversions', label: 'Key Events', description: 'Target business conversions', format: 'number', comparableAcrossPlatforms: true },
      { key: 'purchaseRevenue', label: 'Revenue', description: 'E-commerce purchase revenue', format: 'currency', comparableAcrossPlatforms: true },
    ],
    rateLimits: { maxCallsPerDay: 300, recommendedSyncFrequency: '1x per day' },
  },

  // ---------------- 16. Google Business Profile ----------------
  gbp: {
    id: 'gbp',
    name: 'Google Business Profile',
    category: 'web_analytics',
    brandColor: '#34A853',
    iconName: 'Store',
    apiStatus: 'APPROVAL_REQUIRED',
    apiNotes: 'Google Business Profile Performance API. Local search views, calls, directions, and reviews.',
    officialDocUrl: 'https://developers.google.com/my-business/content/performance-data',
    supportedScopes: ['https://www.googleapis.com/auth/business.manage'],
    metrics: [
      { key: 'profile_views', label: 'Profile Views', description: 'Views on Google Search & Maps', format: 'number', comparableAcrossPlatforms: true },
      { key: 'call_clicks', label: 'Phone Call Clicks', description: 'Direct phone inquiries', format: 'number', comparableAcrossPlatforms: true },
      { key: 'direction_requests', label: 'Direction Requests', description: 'Map navigation taps', format: 'number', comparableAcrossPlatforms: true },
      { key: 'website_clicks', label: 'Website Visits', description: 'Clicks from listing to website', format: 'number', comparableAcrossPlatforms: true },
    ],
    rateLimits: { maxCallsPerDay: 100, recommendedSyncFrequency: '1x per day' },
  },

  // ---------------- 17. WhatsApp Business ----------------
  whatsapp: {
    id: 'whatsapp',
    name: 'WhatsApp Business',
    category: 'messaging',
    brandColor: '#25D366',
    iconName: 'MessageCircle',
    apiStatus: 'FULLY_CONNECTED',
    apiNotes: 'WhatsApp Cloud API / Meta Graph API. Conversational analytics and outbound messaging telemetry.',
    officialDocUrl: 'https://developers.facebook.com/docs/whatsapp/cloud-api',
    supportedScopes: ['whatsapp_business_management', 'whatsapp_business_messaging'],
    metrics: [
      { key: 'conversations', label: 'Conversations', description: 'User-initiated support & lead chats', format: 'number', comparableAcrossPlatforms: true },
      { key: 'messages_delivered', label: 'Delivered Messages', description: 'Messages successfully delivered', format: 'number', comparableAcrossPlatforms: true },
      { key: 'messages_read', label: 'Read Receipts', description: 'Messages opened and read', format: 'number', comparableAcrossPlatforms: false },
      { key: 'response_rate', label: 'User Reply Rate', description: 'Percentage of chats with active customer replies', format: 'percentage', comparableAcrossPlatforms: false },
    ],
    rateLimits: { maxCallsPerDay: 200, recommendedSyncFrequency: '1x per day' },
  },
};
