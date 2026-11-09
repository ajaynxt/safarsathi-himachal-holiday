import axios from 'axios';
import { config } from '../config/environment';

export interface TokenExchangeResult {
  accessToken: string;
  expiresIn: number; // seconds
}

export interface InstagramAccountInfo {
  instagramUserId: string;
  username: string;
  name: string;
  profilePictureUrl: string;
  followersCount: number;
  followsCount: number;
  mediaCount: number;
  facebookPageId: string;
  facebookPageName: string;
}

export class MetaApiService {
  private static baseUrl = config.meta.graphBaseUrl;

  /**
   * Exchanges an authorization code from OAuth callback for a short-lived user access token.
   */
  public static async exchangeCodeForToken(code: string): Promise<string> {
    const url = `${this.baseUrl}/oauth/access_token`;
    const response = await axios.get(url, {
      params: {
        client_id: config.meta.appId,
        client_secret: config.meta.appSecret,
        redirect_uri: config.meta.redirectUri,
        code,
      },
    });

    return response.data.access_token;
  }

  /**
   * Exchanges a short-lived token for a 60-day Long-Lived User Access Token.
   */
  public static async getLongLivedToken(shortLivedToken: string): Promise<TokenExchangeResult> {
    const url = `${this.baseUrl}/oauth/access_token`;
    const response = await axios.get(url, {
      params: {
        grant_type: 'fb_exchange_token',
        client_id: config.meta.appId,
        client_secret: config.meta.appSecret,
        fb_exchange_token: shortLivedToken,
      },
    });

    return {
      accessToken: response.data.access_token,
      expiresIn: response.data.expires_in || 5184000, // defaults to 60 days in seconds
    };
  }

  /**
   * Discovers the Facebook Pages managed by the user and their associated Instagram Professional Accounts.
   */
  public static async discoverInstagramAccounts(accessToken: string): Promise<InstagramAccountInfo[]> {
    const url = `${this.baseUrl}/me/accounts`;
    const pagesResponse = await axios.get(url, {
      params: {
        access_token: accessToken,
        fields: 'id,name,instagram_business_account{id,username,name,profile_picture_url,followers_count,follows_count,media_count}',
      },
    });

    const accounts: InstagramAccountInfo[] = [];

    for (const page of pagesResponse.data.data || []) {
      const ig = page.instagram_business_account;
      if (ig && ig.id) {
        accounts.push({
          instagramUserId: ig.id,
          username: ig.username,
          name: ig.name || ig.username,
          profilePictureUrl: ig.profile_picture_url || '',
          followersCount: ig.followers_count || 0,
          followsCount: ig.follows_count || 0,
          mediaCount: ig.media_count || 0,
          facebookPageId: page.id,
          facebookPageName: page.name,
        });
      }
    }

    return accounts;
  }

  /**
   * Fetches official Instagram Account Insights (Reach, Views, Engaged Accounts, Total Interactions).
   */
  public static async getAccountInsights(
    instagramUserId: string,
    accessToken: string,
    sinceTimestamp: number,
    untilTimestamp: number
  ) {
    const url = `${this.baseUrl}/${instagramUserId}/insights`;
    const response = await axios.get(url, {
      params: {
        access_token: accessToken,
        metric: 'reach,views,accounts_engaged,total_interactions',
        period: 'day',
        since: sinceTimestamp,
        until: untilTimestamp,
      },
    });

    return response.data;
  }
}
