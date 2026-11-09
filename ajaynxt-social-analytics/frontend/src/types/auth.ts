export type UserRole = 
  | 'platform_super_admin'
  | 'workspace_owner'
  | 'workspace_admin'
  | 'workspace_member';

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  photoURL?: string;
  isSuperAdmin: boolean;
  createdAt: string;
  activeWorkspaceId: string;
}

export interface WorkspaceMember {
  uid: string;
  email: string;
  displayName: string;
  role: UserRole;
  joinedAt: string;
  avatarUrl?: string;
}
