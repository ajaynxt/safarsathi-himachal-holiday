import { WorkspaceMember } from './auth';

export type SubscriptionPlan = 'starter' | 'pro_agency' | 'enterprise';

export interface InstagramConnection {
  connectionId: string;
  instagramUserId: string;
  username: string;
  name: string;
  profilePictureUrl: string;
  accountType: 'BUSINESS' | 'CREATOR';
  facebookPageId: string;
  facebookPageName: string;
  connectedAt: string;
  lastSyncedAt: string;
  tokenExpiresAt: string;
  status: 'ACTIVE' | 'EXPIRED' | 'REVOKED' | 'DISCONNECTED';
  scopes: string[];
}

export interface Workspace {
  workspaceId: string;
  name: string;
  slug: string;
  ownerUid: string;
  createdAt: string;
  plan: SubscriptionPlan;
  connectedAccountsCount: number;
  monthlySyncQuota: number;
  monthlySyncsUsed: number;
  members: WorkspaceMember[];
  connections: InstagramConnection[];
}
