export type PlatformCategory =
  | 'social_organic'
  | 'video_streaming'
  | 'ads_and_web'
  | 'messaging_local';

export type PlatformApiStatus =
  | 'FULLY_CONNECTED'
  | 'DEV_ACCESS'
  | 'APPROVAL_REQUIRED'
  | 'LIMITED_ANALYTICS'
  | 'ADS_ONLY'
  | 'API_UNAVAILABLE';

export interface TokenExchangeResult {
  accessToken: string;
  refreshToken?: string;
  expiresInSeconds?: number;
  accountId: string;
  accountName: string;
  scopes: string[];
}

export interface NormalizedMetric {
  key: string;
  label: string;
  value: number | string;
  unit?: string;
  comparable: boolean;
}

export interface NormalizedAnalytics {
  platformId: string;
  accountId: string;
  timeRange: { start: string; end: string };
  metrics: NormalizedMetric[];
  fetchedAt: string;
  source: 'OFFICIAL_API_V21' | 'CACHED_STORE' | 'RESTRICTED_DISCLOSURE';
  notes?: string;
}

export interface IPlatformConnector {
  id: string;
  name: string;
  category: PlatformCategory;
  apiStatus: PlatformApiStatus;
  officialDocUrl: string;
  supportedScopes: string[];
  rateLimits: {
    maxCallsPerDay: number;
    recommendedSyncFrequency: string;
  };

  /**
   * Generates official OAuth 2.0 authorization URL with CSRF protection
   */
  getAuthorizationUrl(state: string, redirectUri: string): string;

  /**
   * Exchanges OAuth authorization code for encrypted access tokens
   */
  exchangeCodeForToken(code: string, redirectUri: string): Promise<TokenExchangeResult>;

  /**
   * Synchronizes supported analytics from the official platform API
   */
  fetchAnalytics(
    decryptedToken: string,
    accountId: string,
    timeRange: { start: string; end: string }
  ): Promise<NormalizedAnalytics>;

  /**
   * Inspects API connectivity and quota health
   */
  checkHealth(): Promise<{ status: 'HEALTHY' | 'DEGRADED' | 'DOWN'; latencyMs: number; quotaRemaining?: number }>;
}
