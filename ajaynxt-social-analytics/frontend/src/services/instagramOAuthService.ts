import { InstagramConnection } from '../types/workspace';

export interface OAuthStartResponse {
  authUrl: string;
  state: string;
  scopes: string;
  expiresInSeconds: number;
}

export interface OAuthCallbackResponse {
  success: boolean;
  connectionId: string;
  account: Partial<InstagramConnection>;
  discoveredAccountsCount: number;
}

export class InstagramOAuthService {
  private static backendUrl = import.meta.env.VITE_BACKEND_API_URL || 'http://localhost:8080/api';

  /**
   * Request Meta OAuth authorization URL from backend with one-time state token
   */
  public static async getAuthUrl(workspaceId: string, idToken: string): Promise<OAuthStartResponse> {
    const res = await fetch(`${this.backendUrl}/instagram/connect`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${idToken}`,
        'x-workspace-id': workspaceId,
      },
    });

    if (!res.ok) {
      throw new Error(`Failed to initiate Instagram OAuth: ${res.statusText}`);
    }

    return await res.json();
  }

  /**
   * Submit OAuth authorization code & CSRF state to backend for secure token exchange
   */
  public static async completeOAuth(
    workspaceId: string,
    idToken: string,
    code: string,
    state: string,
    selectedAccountId?: string
  ): Promise<OAuthCallbackResponse> {
    const res = await fetch(`${this.backendUrl}/instagram/callback`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${idToken}`,
        'x-workspace-id': workspaceId,
      },
      body: JSON.stringify({
        code,
        state,
        selectedAccountId,
      }),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({ message: res.statusText }));
      throw new Error(err.message || 'OAuth exchange failed');
    }

    return await res.json();
  }

  /**
   * Disconnect Instagram account
   */
  public static async disconnectAccount(
    workspaceId: string,
    idToken: string,
    connectionId: string
  ): Promise<boolean> {
    const res = await fetch(`${this.backendUrl}/instagram/disconnect`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${idToken}`,
        'x-workspace-id': workspaceId,
      },
      body: JSON.stringify({ connectionId }),
    });

    return res.ok;
  }
}
