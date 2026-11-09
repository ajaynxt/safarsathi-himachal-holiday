import React, { createContext, useContext, useState, useMemo } from 'react';
import { Workspace, InstagramConnection, SubscriptionPlan } from '../types/workspace';
import { DateRangePreset } from '../types/analytics';
import { UserRole, WorkspaceMember } from '../types/auth';
import { ChannelConnection, ChannelType } from '../types/marketing';
import { DEMO_WORKSPACES } from '../data/demoData';
import { DEMO_CHANNEL_CONNECTIONS } from '../data/marketingDemoData';
import { FirestoreService } from '../services/firestoreService';
import { useAuth } from './AuthContext';

interface WorkspaceContextType {
  workspaces: Workspace[];
  currentWorkspace: Workspace;
  switchWorkspace: (workspaceId: string) => void;
  createWorkspace: (name: string, plan?: SubscriptionPlan) => Promise<void>;
  currentConnection: InstagramConnection | null;
  setCurrentConnection: (conn: InstagramConnection | null) => void;
  dateRangePreset: DateRangePreset;
  setDateRangePreset: (preset: DateRangePreset) => void;
  isSyncing: boolean;
  lastSyncedText: string;
  syncData: () => Promise<void>;
  connectInstagramAccount: (accountData: Partial<InstagramConnection>) => void;
  disconnectInstagramAccount: (connectionId: string) => void;
  inviteMember: (email: string, role: UserRole) => Promise<void>;
  removeMember: (uid: string) => Promise<void>;
  channels: ChannelConnection[];
  connectChannel: (channel: Partial<ChannelConnection> & { channelType: ChannelType; accountName: string; accountId: string }) => void;
  disconnectChannel: (channelId: string) => void;
  refreshChannel: (channelId: string) => Promise<void>;
  isConnectModalOpen: boolean;
  setIsConnectModalOpen: (open: boolean) => void;
  isConnectFacebookModalOpen: boolean;
  setIsConnectFacebookModalOpen: (open: boolean) => void;
  isCreateWorkspaceModalOpen: boolean;
  setIsCreateWorkspaceModalOpen: (open: boolean) => void;
}

const WorkspaceContext = createContext<WorkspaceContextType | undefined>(undefined);

export const WorkspaceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [workspaces, setWorkspaces] = useState<Workspace[]>(DEMO_WORKSPACES);
  const [currentWorkspaceId, setCurrentWorkspaceId] = useState<string>('ws_ajaynxt_media');
  const [dateRangePreset, setDateRangePreset] = useState<DateRangePreset>('30d');
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const [lastSyncedText, setLastSyncedText] = useState<string>('4m ago');
  const [isConnectModalOpen, setIsConnectModalOpen] = useState<boolean>(false);
  const [isConnectFacebookModalOpen, setIsConnectFacebookModalOpen] = useState<boolean>(false);
  const [isCreateWorkspaceModalOpen, setIsCreateWorkspaceModalOpen] = useState<boolean>(false);

  const currentWorkspace = useMemo(() => {
    return workspaces.find(w => w.workspaceId === currentWorkspaceId) || workspaces[0];
  }, [workspaces, currentWorkspaceId]);

  const [activeConnectionId, setActiveConnectionId] = useState<string | null>(() => {
    return currentWorkspace.connections[0]?.connectionId || null;
  });

  const currentConnection = useMemo(() => {
    if (!currentWorkspace.connections || currentWorkspace.connections.length === 0) return null;
    return currentWorkspace.connections.find(c => c.connectionId === activeConnectionId) || currentWorkspace.connections[0];
  }, [currentWorkspace, activeConnectionId]);

  const switchWorkspace = (workspaceId: string) => {
    const ws = workspaces.find(w => w.workspaceId === workspaceId);
    if (ws) {
      setCurrentWorkspaceId(workspaceId);
      if (ws.connections.length > 0) {
        setActiveConnectionId(ws.connections[0].connectionId);
      } else {
        setActiveConnectionId(null);
      }
    }
  };

  const createWorkspace = async (name: string, plan: SubscriptionPlan = 'starter') => {
    const ownerUid = user?.uid || 'usr_ajay_001';
    const ownerEmail = user?.email || 'ajay@ajaynxt.com';
    const ownerDisplayName = user?.displayName || 'Ajay Sharma';

    const newWs = await FirestoreService.createWorkspace(
      name,
      ownerUid,
      ownerEmail,
      ownerDisplayName,
      plan
    );

    setWorkspaces(prev => [...prev, newWs]);
    setCurrentWorkspaceId(newWs.workspaceId);
    setActiveConnectionId(null);
    setIsCreateWorkspaceModalOpen(false);
  };

  const syncData = async () => {
    if (isSyncing) return;
    setIsSyncing(true);
    // Simulate API fetch delay
    await new Promise(r => setTimeout(r, 1200));
    setIsSyncing(false);
    setLastSyncedText('Just now');
  };

  const connectInstagramAccount = (accountData: Partial<InstagramConnection>) => {
    const newConn: InstagramConnection = {
      connectionId: `conn_ig_${Date.now()}`,
      instagramUserId: accountData.instagramUserId || '1784140' + Math.floor(Math.random() * 90000000),
      username: accountData.username || 'new.instagram.brand',
      name: accountData.name || 'Brand Profile',
      profilePictureUrl: accountData.profilePictureUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
      accountType: accountData.accountType || 'BUSINESS',
      facebookPageId: '10928374' + Math.floor(Math.random() * 900000),
      facebookPageName: accountData.name || 'Brand FB Page',
      connectedAt: new Date().toISOString(),
      lastSyncedAt: new Date().toISOString(),
      tokenExpiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 60).toISOString(),
      status: 'ACTIVE',
      scopes: ['instagram_basic', 'instagram_manage_insights', 'pages_show_list', 'pages_read_engagement'],
    };

    setWorkspaces(prev => prev.map(ws => {
      if (ws.workspaceId === currentWorkspace.workspaceId) {
        return {
          ...ws,
          connectedAccountsCount: ws.connectedAccountsCount + 1,
          connections: [...ws.connections, newConn]
        };
      }
      return ws;
    }));

    setActiveConnectionId(newConn.connectionId);
    setIsConnectModalOpen(false);
  };

  const disconnectInstagramAccount = (connectionId: string) => {
    setWorkspaces(prev => prev.map(ws => {
      if (ws.workspaceId === currentWorkspace.workspaceId) {
        const remaining = ws.connections.filter(c => c.connectionId !== connectionId);
        return {
          ...ws,
          connectedAccountsCount: remaining.length,
          connections: remaining
        };
      }
      return ws;
    }));

    if (activeConnectionId === connectionId) {
      setActiveConnectionId(null);
    }
  };

  const inviteMember = async (email: string, role: UserRole) => {
    const newMember: WorkspaceMember = {
      uid: `usr_inv_${Date.now()}`,
      email,
      displayName: email.split('@')[0],
      role,
      joinedAt: new Date().toISOString(),
    };

    await FirestoreService.addMember(currentWorkspace.workspaceId, newMember);

    setWorkspaces(prev => prev.map(ws => {
      if (ws.workspaceId === currentWorkspace.workspaceId) {
        return {
          ...ws,
          members: [...ws.members, newMember]
        };
      }
      return ws;
    }));
  };

  const [channels, setChannels] = useState<ChannelConnection[]>(DEMO_CHANNEL_CONNECTIONS);

  const connectChannel = (channelData: Partial<ChannelConnection> & { channelType: ChannelType; accountName: string; accountId: string }) => {
    const newChan: ChannelConnection = {
      id: channelData.id || `chan_${channelData.channelType.toLowerCase()}_${Date.now()}`,
      channelType: channelData.channelType,
      workspaceId: currentWorkspaceId,
      accountName: channelData.accountName,
      accountId: channelData.accountId,
      status: 'CONNECTED',
      lastSyncedAt: new Date().toISOString(),
      tokenExpiresAt: new Date(Date.now() + 60 * 24 * 3600 * 1000).toISOString(),
      syncHistory: [
        {
          timestamp: new Date().toISOString(),
          status: 'SUCCESS',
          recordsSynced: Math.floor(Math.random() * 200) + 100,
          durationMs: Math.floor(Math.random() * 250) + 120,
        },
      ],
    };

    setChannels(prev => {
      const idx = prev.findIndex(c => c.channelType === newChan.channelType && c.accountId === newChan.accountId);
      if (idx >= 0) {
        const updated = [...prev];
        updated[idx] = { ...updated[idx], ...newChan, status: 'CONNECTED' };
        return updated;
      }
      return [newChan, ...prev];
    });
  };

  const disconnectChannel = (channelId: string) => {
    setChannels(prev => prev.map(c => c.id === channelId ? { ...c, status: 'DISCONNECTED' } : c));
  };

  const refreshChannel = async (channelId: string) => {
    await new Promise(r => setTimeout(r, 800));
    setChannels(prev => prev.map(c => c.id === channelId ? {
      ...c,
      lastSyncedAt: new Date().toISOString(),
      syncHistory: [
        {
          timestamp: new Date().toISOString(),
          status: 'SUCCESS',
          recordsSynced: Math.floor(Math.random() * 200) + 50,
          durationMs: Math.floor(Math.random() * 300) + 150,
        },
        ...c.syncHistory,
      ],
    } : c));
  };

  const removeMember = async (uid: string) => {
    await FirestoreService.removeMember(currentWorkspace.workspaceId, uid);

    setWorkspaces(prev => prev.map(ws => {
      if (ws.workspaceId === currentWorkspace.workspaceId) {
        return {
          ...ws,
          members: ws.members.filter(m => m.uid !== uid)
        };
      }
      return ws;
    }));
  };

  return (
    <WorkspaceContext.Provider
      value={{
        workspaces,
        currentWorkspace,
        switchWorkspace,
        createWorkspace,
        currentConnection,
        setCurrentConnection: (conn) => setActiveConnectionId(conn ? conn.connectionId : null),
        dateRangePreset,
        setDateRangePreset,
        isSyncing,
        lastSyncedText,
        syncData,
        connectInstagramAccount,
        disconnectInstagramAccount,
        inviteMember,
        removeMember,
        channels,
        connectChannel,
        disconnectChannel,
        refreshChannel,
        isConnectModalOpen,
        setIsConnectModalOpen,
        isConnectFacebookModalOpen,
        setIsConnectFacebookModalOpen,
        isCreateWorkspaceModalOpen,
        setIsCreateWorkspaceModalOpen,
      }}
    >
      {children}
    </WorkspaceContext.Provider>
  );
};

export const useWorkspace = () => {
  const context = useContext(WorkspaceContext);
  if (!context) throw new Error('useWorkspace must be used within WorkspaceProvider');
  return context;
};
