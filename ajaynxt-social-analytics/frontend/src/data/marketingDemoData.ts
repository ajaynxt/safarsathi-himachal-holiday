import {
  GA4Property,
  GA4OverviewMetrics,
  GA4TrafficSource,
  GA4LandingPage,
  GA4DeviceCategory,
  GA4CountryTraffic,
  MetaAdAccount,
  MetaAdCampaign,
  MetaAdSet,
  MetaAd,
  UnifiedMarketingOverview,
  CampaignAttributionRow,
  ChannelConnection
} from '../types/marketing';

export const DEMO_GA4_PROPERTIES: GA4Property[] = [
  {
    propertyId: 'properties/384910294',
    displayName: 'AJAYNXT Creative & Tours (Production Web)',
    accountName: 'AJAYNXT Studios Analytics',
    currencyCode: 'INR',
    timeZone: 'Asia/Kolkata',
  },
  {
    propertyId: 'properties/384910295',
    displayName: 'Himachal Heritage Booking Portal',
    accountName: 'Himachal Heritage Tours',
    currencyCode: 'INR',
    timeZone: 'Asia/Kolkata',
  }
];

export const DEMO_GA4_METRICS: GA4OverviewMetrics = {
  activeUsers: 68420,
  activeUsersChange: 18.4,
  newUsers: 54100,
  newUsersChange: 21.2,
  sessions: 92450,
  sessionsChange: 16.7,
  engagedSessions: 61840,
  engagementRate: 66.89,
  engagementRateChange: 4.8,
  pageViews: 248900,
  pageViewsChange: 19.5,
  eventCount: 784200,
  conversions: 3410, // Key events (leads, bookings, bookings confirmed)
  conversionsChange: 24.6,
  purchaseRevenue: 842500, // ₹8,42,500 in INR
  purchaseRevenueChange: 31.8,
  avgSessionDurationSeconds: 142,
};

export const DEMO_GA4_TRAFFIC_SOURCES: GA4TrafficSource[] = [
  {
    sourceMedium: 'facebook / cpc (Meta Ads)',
    sessions: 34200,
    users: 26800,
    engagementRate: 68.4,
    conversions: 1480,
    revenue: 389000,
  },
  {
    sourceMedium: 'google / organic',
    sessions: 24100,
    users: 18400,
    engagementRate: 72.1,
    conversions: 920,
    revenue: 245000,
  },
  {
    sourceMedium: 'instagram / organic',
    sessions: 16800,
    users: 13900,
    engagementRate: 64.5,
    conversions: 540,
    revenue: 128000,
  },
  {
    sourceMedium: 'direct / none',
    sessions: 11400,
    users: 8900,
    engagementRate: 58.2,
    conversions: 310,
    revenue: 58500,
  },
  {
    sourceMedium: 'newsletter / email',
    sessions: 5950,
    users: 4200,
    engagementRate: 74.8,
    conversions: 160,
    revenue: 22000,
  }
];

export const DEMO_GA4_LANDING_PAGES: GA4LandingPage[] = [
  {
    pagePath: '/packages/spiti-valley-expedition-2026',
    pageTitle: 'Spiti Valley 9-Day Roadtrip Expedition | AJAYNXT Tours',
    views: 48200,
    activeUsers: 19400,
    conversions: 840,
  },
  {
    pagePath: '/stays/luxury-cedar-cottages-manali',
    pageTitle: 'Luxury Riverfront Cedar Cottages Manali | AJAYNXT',
    views: 34100,
    activeUsers: 14200,
    conversions: 620,
  },
  {
    pagePath: '/offers/monsoon-trekking-himachal',
    pageTitle: 'Exclusive 20% Early Bird Summer Trekking Pass',
    views: 28900,
    activeUsers: 11900,
    conversions: 510,
  },
  {
    pagePath: '/blog/what-to-pack-high-altitude-himalayas',
    pageTitle: 'Ultimate Himalayan High Altitude Packing Guide 2026',
    views: 21400,
    activeUsers: 9400,
    conversions: 190,
  }
];

export const DEMO_GA4_DEVICES: GA4DeviceCategory[] = [
  { deviceCategory: 'mobile', users: 51200, sessions: 69400, percentage: 75.1 },
  { deviceCategory: 'desktop', users: 15400, sessions: 20800, percentage: 22.5 },
  { deviceCategory: 'tablet', users: 1820, sessions: 2250, percentage: 2.4 },
];

export const DEMO_GA4_COUNTRIES: GA4CountryTraffic[] = [
  { country: 'India', users: 54800, sessions: 74200, conversions: 2940 },
  { country: 'United States', users: 4800, sessions: 6400, conversions: 210 },
  { country: 'United Arab Emirates', users: 3400, sessions: 4800, conversions: 140 },
  { country: 'United Kingdom', users: 2900, sessions: 3900, conversions: 80 },
  { country: 'Australia', users: 1400, sessions: 1800, conversions: 40 },
];

// ---------------- Meta Marketing Ads Demo Data ----------------
export const DEMO_META_AD_ACCOUNTS: MetaAdAccount[] = [
  {
    id: 'act_109283746592019',
    name: 'AJAYNXT Media - Main Ad Account',
    currency: 'INR',
    timezone: 'Asia/Kolkata',
    accountStatus: 'ACTIVE',
  },
  {
    id: 'act_109283746592020',
    name: 'Himachal Heritage Tours - Client Account',
    currency: 'INR',
    timezone: 'Asia/Kolkata',
    accountStatus: 'ACTIVE',
  }
];

export const DEMO_META_CAMPAIGNS: MetaAdCampaign[] = [
  {
    id: 'cmp_12038491029101',
    name: 'Spiti Valley High Altitude Expedition - Conversions [Summer 2026]',
    status: 'ACTIVE',
    objective: 'OUTCOME_SALES',
    spend: 48500, // ₹48,500
    impressions: 482000,
    reach: 312000,
    frequency: 1.54,
    linkClicks: 14200,
    ctr: 2.95,
    cpc: 3.42,
    cpm: 100.62,
    leads: 640,
    purchases: 184,
    costPerResult: 263.58,
    conversionValue: 245000,
    roas: 5.05,
  },
  {
    id: 'cmp_12038491029102',
    name: 'Cedar Luxury Cottages Manali - Instant Lead Forms',
    status: 'ACTIVE',
    objective: 'OUTCOME_LEADS',
    spend: 28400, // ₹28,400
    impressions: 318000,
    reach: 224000,
    frequency: 1.42,
    linkClicks: 8400,
    ctr: 2.64,
    cpc: 3.38,
    cpm: 89.30,
    leads: 490,
    purchases: 88,
    costPerResult: 57.95,
    conversionValue: 128000,
    roas: 4.51,
  },
  {
    id: 'cmp_12038491029103',
    name: 'Instagram Reels Video View Retargeting - Add to Cart Warm Audience',
    status: 'ACTIVE',
    objective: 'OUTCOME_SALES',
    spend: 18200, // ₹18,200
    impressions: 194000,
    reach: 118000,
    frequency: 1.64,
    linkClicks: 6200,
    ctr: 3.20,
    cpc: 2.94,
    cpm: 93.81,
    leads: 210,
    purchases: 112,
    costPerResult: 162.50,
    conversionValue: 164000,
    roas: 9.01,
  },
  {
    id: 'cmp_12038491029104',
    name: 'Top of Funnel Video Awareness - Drone Cinematic Reels',
    status: 'PAUSED',
    objective: 'OUTCOME_AWARENESS',
    spend: 14500,
    impressions: 410000,
    reach: 298000,
    frequency: 1.38,
    linkClicks: 4100,
    ctr: 1.00,
    cpc: 3.53,
    cpm: 35.36,
    leads: 80,
    purchases: 18,
    costPerResult: 181.25,
    conversionValue: 24000,
    roas: 1.65,
  }
];

export const DEMO_META_AD_SETS: MetaAdSet[] = [
  {
    id: 'adset_01',
    campaignId: 'cmp_12038491029101',
    name: 'Trek Enthusiasts + Adventure Travel (Age 24-42)',
    status: 'ACTIVE',
    spend: 29400,
    reach: 198000,
    impressions: 310000,
    cpc: 3.20,
    conversions: 122,
  },
  {
    id: 'adset_02',
    campaignId: 'cmp_12038491029101',
    name: 'Lookalike 2% of Past Tour Bookers - Pan India',
    status: 'ACTIVE',
    spend: 19100,
    reach: 114000,
    impressions: 172000,
    cpc: 3.75,
    conversions: 62,
  }
];

export const DEMO_META_ADS: MetaAd[] = [
  {
    id: 'ad_001',
    adsetId: 'adset_01',
    name: 'Rohtang Sunset 4K Reel - High Contrast Hook',
    status: 'ACTIVE',
    previewUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400&auto=format&fit=crop&q=80',
    spend: 16400,
    clicks: 5200,
    ctr: 3.45,
    conversions: 78,
  },
  {
    id: 'ad_002',
    adsetId: 'adset_01',
    name: 'Spiti Valley 5-Tip Packing Checklist Carousel',
    status: 'ACTIVE',
    previewUrl: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=400&auto=format&fit=crop&q=80',
    spend: 13000,
    clicks: 4100,
    ctr: 2.80,
    conversions: 44,
  }
];

// ---------------- Unified Overview & Attribution Reconciliation ----------------
export const DEMO_UNIFIED_MARKETING_OVERVIEW: UnifiedMarketingOverview = {
  totalAdSpend: 109600, // Meta Ads total spend (₹1,09,600)
  adSpendChange: 14.2,
  organicInstagramReach: 328400,
  organicReachChange: 14.8,
  organicInstagramEngagement: 14200,
  websiteSessions: 92450,
  sessionsChange: 16.7,
  websiteConversions: 3410,
  conversionsChange: 24.6,
  totalLeads: 1420,
  leadsChange: 19.8,
  totalPurchaseRevenue: 842500, // ₹8,42,500
  revenueChange: 31.8,
  blendedRoas: 7.68, // (Total revenue / Total ad spend)
  // Attribution window reconciliation
  metaReportedConversions: 402, // Meta 7-day click / 1-day view attribution
  ga4AttributedConversions: 294, // GA4 last non-direct click attribution
  attributionDeltaPercent: 26.8, // Explicitly disclosed variance
};

export const DEMO_CAMPAIGN_ATTRIBUTION_ROWS: CampaignAttributionRow[] = [
  {
    campaignName: 'Spiti Valley High Altitude Expedition',
    utmCampaign: 'spiti_summer_2026',
    metaReportedSpend: 48500,
    metaReportedConversions: 184,
    metaReportedValue: 245000,
    metaRoas: 5.05,
    ga4AttributedSessions: 18200,
    ga4AttributedConversions: 142,
    ga4AttributedRevenue: 192000,
    ga4Roas: 3.95,
  },
  {
    campaignName: 'Cedar Luxury Cottages Manali',
    utmCampaign: 'manali_cedar_leadgen',
    metaReportedSpend: 28400,
    metaReportedConversions: 88,
    metaReportedValue: 128000,
    metaRoas: 4.51,
    ga4AttributedSessions: 9400,
    ga4AttributedConversions: 68,
    ga4AttributedRevenue: 98000,
    ga4Roas: 3.45,
  },
  {
    campaignName: 'Reels Video View Retargeting - Cart Warm',
    utmCampaign: 'reels_retargeting_cart',
    metaReportedSpend: 18200,
    metaReportedConversions: 112,
    metaReportedValue: 164000,
    metaRoas: 9.01,
    ga4AttributedSessions: 6200,
    ga4AttributedConversions: 84,
    ga4AttributedRevenue: 124000,
    ga4Roas: 6.81,
  }
];

// ---------------- Multi-Tenant Channel Connection Status ----------------
export const DEMO_CHANNEL_CONNECTIONS: ChannelConnection[] = [
  {
    id: 'conn_ig_pro_01',
    channelType: 'INSTAGRAM',
    workspaceId: 'ws_ajaynxt_media',
    accountName: 'AJAYNXT Studios & Design',
    accountId: '@ajaynxt.creative',
    status: 'CONNECTED',
    lastSyncedAt: new Date(Date.now() - 1000 * 60 * 14).toISOString(),
    tokenExpiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 52).toISOString(),
    syncHistory: [
      { timestamp: new Date(Date.now() - 1000 * 60 * 14).toISOString(), status: 'SUCCESS', recordsSynced: 90, durationMs: 420 },
      { timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), status: 'SUCCESS', recordsSynced: 90, durationMs: 380 },
    ],
  },
  {
    id: 'conn_meta_ads_01',
    channelType: 'META_ADS',
    workspaceId: 'ws_ajaynxt_media',
    accountName: 'AJAYNXT Media - Main Ad Account',
    accountId: 'act_109283746592019',
    status: 'CONNECTED',
    lastSyncedAt: new Date(Date.now() - 1000 * 60 * 8).toISOString(),
    tokenExpiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 56).toISOString(),
    syncHistory: [
      { timestamp: new Date(Date.now() - 1000 * 60 * 8).toISOString(), status: 'SUCCESS', recordsSynced: 12, durationMs: 310 },
      { timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), status: 'SUCCESS', recordsSynced: 12, durationMs: 290 },
    ],
  },
  {
    id: 'conn_ga4_01',
    channelType: 'GOOGLE_ANALYTICS_4',
    workspaceId: 'ws_ajaynxt_media',
    accountName: 'AJAYNXT Creative & Tours (Production Web)',
    accountId: 'properties/384910294',
    status: 'CONNECTED',
    lastSyncedAt: new Date(Date.now() - 1000 * 60 * 4).toISOString(),
    tokenExpiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 180).toISOString(),
    syncHistory: [
      { timestamp: new Date(Date.now() - 1000 * 60 * 4).toISOString(), status: 'SUCCESS', recordsSynced: 180, durationMs: 510 },
      { timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), status: 'SUCCESS', recordsSynced: 180, durationMs: 490 },
    ],
  },
  {
    id: 'conn_tiktok_01',
    channelType: 'TIKTOK',
    workspaceId: 'ws_ajaynxt_media',
    accountName: 'AJAYNXT Official TikTok',
    accountId: '@ajaynxt.official',
    status: 'CONNECTED',
    lastSyncedAt: new Date(Date.now() - 1000 * 60 * 22).toISOString(),
    tokenExpiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30).toISOString(),
    syncHistory: [
      { timestamp: new Date(Date.now() - 1000 * 60 * 22).toISOString(), status: 'SUCCESS', recordsSynced: 48, durationMs: 340 },
    ],
  },
  {
    id: 'conn_gbp_01',
    channelType: 'GBP',
    workspaceId: 'ws_ajaynxt_media',
    accountName: 'AJAYNXT Studios & Labs Mumbai',
    accountId: 'locations/10928471928374',
    status: 'CONNECTED',
    lastSyncedAt: new Date(Date.now() - 1000 * 60 * 35).toISOString(),
    tokenExpiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 90).toISOString(),
    syncHistory: [
      { timestamp: new Date(Date.now() - 1000 * 60 * 35).toISOString(), status: 'SUCCESS', recordsSynced: 30, durationMs: 290 },
    ],
  },
  {
    id: 'conn_youtube_01',
    channelType: 'YOUTUBE',
    workspaceId: 'ws_ajaynxt_media',
    accountName: 'AJAYNXT Creative Labs & Tours',
    accountId: 'UCajaynxt_official_yt',
    status: 'CONNECTED',
    lastSyncedAt: new Date(Date.now() - 1000 * 60 * 18).toISOString(),
    tokenExpiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 60).toISOString(),
    syncHistory: [
      { timestamp: new Date(Date.now() - 1000 * 60 * 18).toISOString(), status: 'SUCCESS', recordsSynced: 64, durationMs: 410 },
    ],
  },
  {
    id: 'conn_linkedin_01',
    channelType: 'LINKEDIN',
    workspaceId: 'ws_ajaynxt_media',
    accountName: 'AJAYNXT Technologies & Media',
    accountId: 'urn:li:organization:92847192',
    status: 'CONNECTED',
    lastSyncedAt: new Date(Date.now() - 1000 * 60 * 42).toISOString(),
    tokenExpiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 45).toISOString(),
    syncHistory: [
      { timestamp: new Date(Date.now() - 1000 * 60 * 42).toISOString(), status: 'SUCCESS', recordsSynced: 22, durationMs: 320 },
    ],
  },
  {
    id: 'conn_facebook_01',
    channelType: 'FACEBOOK',
    workspaceId: 'ws_ajaynxt_media',
    accountName: 'AJAYNXT Tours Official Page',
    accountId: 'page_10928471928374',
    status: 'CONNECTED',
    lastSyncedAt: new Date(Date.now() - 1000 * 60 * 11).toISOString(),
    tokenExpiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 60).toISOString(),
    syncHistory: [
      { timestamp: new Date(Date.now() - 1000 * 60 * 11).toISOString(), status: 'SUCCESS', recordsSynced: 55, durationMs: 280 },
    ],
  },
  {
    id: 'conn_whatsapp_01',
    channelType: 'WHATSAPP',
    workspaceId: 'ws_ajaynxt_media',
    accountName: 'AJAYNXT Client Bookings Support',
    accountId: '+919816000000',
    status: 'CONNECTED',
    lastSyncedAt: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
    tokenExpiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 365).toISOString(),
    syncHistory: [
      { timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString(), status: 'SUCCESS', recordsSynced: 120, durationMs: 190 },
    ],
  },
  {
    id: 'conn_google_ads_01',
    channelType: 'GOOGLE_ADS',
    workspaceId: 'ws_ajaynxt_media',
    accountName: 'AJAYNXT Growth Campaigns (Search & PMax)',
    accountId: 'customers/9482041829',
    status: 'CONNECTED',
    lastSyncedAt: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
    tokenExpiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 90).toISOString(),
    syncHistory: [
      { timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString(), status: 'SUCCESS', recordsSynced: 18, durationMs: 350 },
    ],
  }
];
