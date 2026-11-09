export type ApiAvailabilityStatus =
  | 'FULLY_CONNECTED'       // Official public API fully available and operational
  | 'DEV_ACCESS'             // Standard access / test accounts only; requires app review for public SaaS
  | 'APPROVAL_REQUIRED'      // Requires partner-level approval (e.g. LinkedIn Community Management API)
  | 'LIMITED_ANALYTICS'      // Public API provides basic profile metrics only (e.g. Threads basic display)
  | 'ADS_ONLY'               // Only marketing/advertising API available (e.g. Snapchat Marketing API)
  | 'API_UNAVAILABLE';       // Official public API unavailable or closed

export type PlatformApiStatus = ApiAvailabilityStatus;

export type PlatformCategory =
  | 'social_organic'
  | 'video_streaming'
  | 'ads_and_web'
  | 'messaging_local'
  | 'paid_advertising'
  | 'web_analytics'
  | 'messaging';

export interface MetricDefinition {
  key: string;
  label: string;
  description: string;
  format: 'number' | 'currency' | 'percentage' | 'duration';
  comparableAcrossPlatforms: boolean;
}

export interface PlatformConnectorDefinition {
  id: string;
  name: string;
  category: PlatformCategory;
  brandColor: string;
  iconName: string;
  apiStatus: ApiAvailabilityStatus;
  apiNotes: string;
  officialDocUrl: string;
  supportedScopes: string[];
  metrics: MetricDefinition[];
  rateLimits: {
    maxCallsPerDay: number;
    recommendedSyncFrequency: string;
  };
}

export interface ConnectedPlatformAccount {
  id: string;
  platformId: string;
  workspaceId: string;
  accountName: string;
  accountId: string;
  avatarUrl?: string;
  status: 'ACTIVE' | 'EXPIRED' | 'DISCONNECTED' | 'ERROR';
  connectedAt: string;
  lastSyncedAt: string;
  tokenExpiresAt: string;
  errorStatus?: string;
  syncSuccessRate: number; // percentage (e.g. 99.4)
  totalSyncs: number;
  scopes: string[];
}
