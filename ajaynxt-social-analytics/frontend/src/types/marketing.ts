export type ChannelType =
  | 'INSTAGRAM'
  | 'FACEBOOK'
  | 'META_ADS'
  | 'GOOGLE_ANALYTICS_4'
  | 'TIKTOK'
  | 'YOUTUBE'
  | 'LINKEDIN'
  | 'TWITTER'
  | 'PINTEREST'
  | 'THREADS'
  | 'SNAPCHAT'
  | 'TWITCH'
  | 'BLUESKY'
  | 'REDDIT'
  | 'GOOGLE_ADS'
  | 'GBP'
  | 'WHATSAPP';

export interface ChannelConnection {
  id: string;
  channelType: ChannelType;
  workspaceId: string;
  accountName: string;
  accountId: string;
  status: 'CONNECTED' | 'DISCONNECTED' | 'EXPIRING' | 'ERROR';
  lastSyncedAt: string;
  tokenExpiresAt: string;
  errorStatus?: string;
  syncHistory: {
    timestamp: string;
    status: 'SUCCESS' | 'FAILED';
    recordsSynced: number;
    durationMs: number;
  }[];
}

// ---------------- Google Analytics 4 Types ----------------
export interface GA4Property {
  propertyId: string;
  displayName: string;
  accountName: string;
  currencyCode: string;
  timeZone: string;
}

export interface GA4OverviewMetrics {
  activeUsers: number;
  activeUsersChange: number;
  newUsers: number;
  newUsersChange: number;
  sessions: number;
  sessionsChange: number;
  engagedSessions: number;
  engagementRate: number; // percentage (e.g. 64.2)
  engagementRateChange: number;
  pageViews: number;
  pageViewsChange: number;
  eventCount: number;
  conversions: number; // key events
  conversionsChange: number;
  purchaseRevenue: number;
  purchaseRevenueChange: number;
  avgSessionDurationSeconds: number;
}

export interface GA4TrafficSource {
  sourceMedium: string;
  sessions: number;
  users: number;
  engagementRate: number;
  conversions: number;
  revenue: number;
}

export interface GA4LandingPage {
  pagePath: string;
  pageTitle: string;
  views: number;
  activeUsers: number;
  conversions: number;
}

export interface GA4DeviceCategory {
  deviceCategory: 'mobile' | 'desktop' | 'tablet';
  users: number;
  sessions: number;
  percentage: number;
}

export interface GA4CountryTraffic {
  country: string;
  users: number;
  sessions: number;
  conversions: number;
}

// ---------------- Meta Marketing Ads Types ----------------
export interface MetaAdAccount {
  id: string;
  name: string;
  currency: string;
  timezone: string;
  accountStatus: 'ACTIVE' | 'DISABLED' | 'UNSETTLED';
}

export interface MetaAdCampaign {
  id: string;
  name: string;
  status: 'ACTIVE' | 'PAUSED' | 'ARCHIVED';
  objective: string;
  spend: number;
  impressions: number;
  reach: number;
  frequency: number;
  linkClicks: number;
  ctr: number; // percentage (e.g. 2.45)
  cpc: number; // cost per click (e.g. 14.20)
  cpm: number; // cost per thousand (e.g. 180.50)
  leads: number;
  purchases: number;
  costPerResult: number;
  conversionValue: number;
  roas: number; // return on ad spend (e.g. 4.12)
}

export interface MetaAdSet {
  id: string;
  campaignId: string;
  name: string;
  status: 'ACTIVE' | 'PAUSED';
  spend: number;
  reach: number;
  impressions: number;
  cpc: number;
  conversions: number;
}

export interface MetaAd {
  id: string;
  adsetId: string;
  name: string;
  status: 'ACTIVE' | 'PAUSED';
  previewUrl: string;
  spend: number;
  clicks: number;
  ctr: number;
  conversions: number;
}

// ---------------- Unified Marketing & Attribution ----------------
export interface UnifiedMarketingOverview {
  totalAdSpend: number;
  adSpendChange: number;
  organicInstagramReach: number;
  organicReachChange: number;
  organicInstagramEngagement: number;
  websiteSessions: number;
  sessionsChange: number;
  websiteConversions: number;
  conversionsChange: number;
  totalLeads: number;
  leadsChange: number;
  totalPurchaseRevenue: number;
  revenueChange: number;
  blendedRoas: number;
  // Attribution reconciliation
  metaReportedConversions: number; // 7-day click, 1-day view
  ga4AttributedConversions: number; // Last non-direct click
  attributionDeltaPercent: number;
}

export interface CampaignAttributionRow {
  campaignName: string;
  utmCampaign: string;
  metaReportedSpend: number;
  metaReportedConversions: number;
  metaReportedValue: number;
  metaRoas: number;
  ga4AttributedSessions: number;
  ga4AttributedConversions: number;
  ga4AttributedRevenue: number;
  ga4Roas: number;
}
