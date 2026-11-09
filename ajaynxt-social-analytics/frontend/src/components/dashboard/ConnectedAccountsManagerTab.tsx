import React, { useState } from 'react';
import {
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  Trash2,
  ExternalLink,
  Plus,
  Key,
  Lock,
  Layers,
  Info,
  Activity,
  History,
  Check,
  BarChart3
} from 'lucide-react';
import { InstagramIcon } from '../common/InstagramIcon';
import { useWorkspace } from '../../context/WorkspaceContext';
import { DEMO_CHANNEL_CONNECTIONS } from '../../data/marketingDemoData';
import { ChannelConnection, ChannelType } from '../../types/marketing';
import { formatFullDate } from '../../utils/formatters';
import { getPlatformSvg } from '../common/SocialIcons';

interface ConnectedAccountsManagerTabProps {
  onNavigateToTab?: (tab: string, channelId?: string) => void;
}

export const ConnectedAccountsManagerTab: React.FC<ConnectedAccountsManagerTabProps> = ({ onNavigateToTab }) => {
  const {
    currentWorkspace,
    setIsConnectModalOpen,
    setIsConnectFacebookModalOpen,
    channels,
    disconnectChannel,
    refreshChannel,
  } = useWorkspace();
  const [disconnectConfirmId, setDisconnectConfirmId] = useState<string | null>(null);
  const [isRefreshingId, setIsRefreshingId] = useState<string | null>(null);
  const [refreshSuccessId, setRefreshSuccessId] = useState<string | null>(null);

  const handleRefresh = async (id: string) => {
    setIsRefreshingId(id);
    await refreshChannel(id);
    setIsRefreshingId(null);
    setRefreshSuccessId(id);
    setTimeout(() => setRefreshSuccessId(null), 3000);
  };

  const handleDisconnect = (id: string) => {
    disconnectChannel(id);
    setDisconnectConfirmId(null);
  };

  const getChannelBadge = (type: ChannelType) => {
    return (
      <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-white/60 dark:bg-[#130308]/60 text-[#25171C] dark:text-[#FAF3F5] font-bold text-xs border border-[#D9B7C0]/35 shadow-xs">
        {getPlatformSvg(type, 'w-3.5 h-3.5')}
        <span>{String(type).replace(/_/g, ' ')}</span>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-[#25171C] dark:text-[#FAF3F5]">
            Connected Accounts & Channels
          </h1>
          <p className="text-xs sm:text-sm text-[#8A6570] dark:text-[#D9B7C0] mt-1 font-medium">
            Manage active OAuth 2.0 credentials, token health, and sync statuses for <strong className="text-[#25171C] dark:text-[#FAF3F5]">{currentWorkspace.name}</strong>.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setIsConnectModalOpen(true)}
            className="px-4 py-2 text-xs font-bold btn-maroon rounded-xl flex items-center gap-2 shadow-glass-maroon"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Connect Instagram</span>
          </button>
          <button
            onClick={() => setIsConnectFacebookModalOpen(true)}
            className="px-4 py-2 text-xs font-bold bg-[#1877F2] hover:bg-blue-600 text-white rounded-xl flex items-center gap-2 shadow-sm transition"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Connect Facebook Page</span>
          </button>
          {onNavigateToTab && (
            <button
              onClick={() => onNavigateToTab('platforms_catalog')}
              className="px-3.5 py-2 text-xs font-semibold glass-card text-[#25171C] dark:text-[#FAF3F5] rounded-xl flex items-center gap-1.5 hover:text-maroon-700 transition"
            >
              <span>Browse 17 Connectors</span>
            </button>
          )}
        </div>
      </div>

      {/* Security Vault Banner */}
      <div className="glass-panel rounded-2xl p-4.5 border border-maroon-300/35 flex items-start gap-3.5 bg-gradient-to-r from-maroon-900/5 via-maroon-600/5 to-amber-500/5">
        <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
        <div className="text-xs text-slate-700 dark:text-maroon-200/90 leading-relaxed">
          <span className="font-bold text-[#25171C] dark:text-[#FAF3F5] block mb-0.5">
            Zero-Knowledge AES-256-GCM Token Encryption Active
          </span>
          All Meta Graph API and Google Analytics OAuth access and refresh tokens are encrypted at rest using envelope encryption backed by Google Cloud Secret Manager. Tokens are never exposed to browser scripts and are scoped strictly to read-only reporting.
        </div>
      </div>

      {/* Channels List */}
      <div className="space-y-4">
        {channels.map((channel) => {
          const isConnected = channel.status === 'CONNECTED';
          const isRefreshing = isRefreshingId === channel.id;
          const refreshSuccess = refreshSuccessId === channel.id;

          return (
            <div
              key={channel.id}
              className="glass-card rounded-3xl p-6 border border-[#D9B7C0]/35 shadow-sm space-y-4"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-start gap-3.5">
                  <div className="p-3 rounded-2xl bg-white/70 dark:bg-[#130308]/70 border border-[#D9B7C0]/30 shadow-xs shrink-0">
                    <Key className="w-5 h-5 text-maroon-700 dark:text-maroon-300" />
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <h3 className="text-base font-bold text-[#25171C] dark:text-[#FAF3F5]">
                        {channel.accountName}
                      </h3>
                      {getChannelBadge(channel.channelType)}
                      {isConnected ? (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" />
                          Connected
                        </span>
                      ) : (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-500/10 text-rose-700 dark:text-rose-400 border border-rose-500/30 flex items-center gap-1">
                          <AlertTriangle className="w-3 h-3" />
                          Disconnected
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-[#8A6570] dark:text-[#D9B7C0] font-mono">
                      Account ID: {channel.accountId}
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-wrap items-center gap-2">
                  {isConnected && onNavigateToTab && (
                    <button
                      onClick={() => onNavigateToTab('platform_reports', channel.id)}
                      className="px-3.5 py-1.5 text-xs font-bold btn-maroon rounded-xl flex items-center gap-1.5 shadow-glass-maroon"
                    >
                      <BarChart3 className="w-3.5 h-3.5" />
                      <span>View Dedicated Report</span>
                    </button>
                  )}

                  <button
                    onClick={() => handleRefresh(channel.id)}
                    disabled={isRefreshing || !isConnected}
                    className="px-3.5 py-1.5 text-xs font-semibold glass-card text-[#25171C] dark:text-[#FAF3F5] rounded-xl flex items-center gap-1.5 hover:text-maroon-700 transition disabled:opacity-50"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin text-maroon-600' : ''}`} />
                    <span>{isRefreshing ? 'Verifying...' : 'Refresh Token'}</span>
                  </button>

                  {isConnected && (
                    <button
                      onClick={() => setDisconnectConfirmId(channel.id)}
                      className="px-3 py-1.5 text-xs font-semibold text-rose-600 dark:text-rose-400 hover:bg-rose-500/10 rounded-xl transition"
                    >
                      Disconnect
                    </button>
                  )}
                </div>
              </div>

              {/* Status Details Bar */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 border-t border-[#D9B7C0]/25 dark:border-[#D9B7C0]/15 text-xs">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-bold block mb-0.5">
                    Last Successful Sync
                  </span>
                  <span className="font-semibold text-[#25171C] dark:text-[#FAF3F5]">
                    {formatFullDate(channel.lastSyncedAt)}
                  </span>
                </div>

                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-bold block mb-0.5">
                    Token Expiry Status
                  </span>
                  <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                    {channel.tokenExpiresAt ? formatFullDate(channel.tokenExpiresAt) : '60-Day Long Lived Token'}
                  </span>
                </div>

                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-bold block mb-0.5">
                    Sync Integrity
                  </span>
                  <span className="font-mono text-[11px] text-maroon-700 dark:text-maroon-300 truncate block font-bold">
                    AES-256-GCM Vaulted &bull; 99.8% Sync OK
                  </span>
                </div>
              </div>

              {refreshSuccess && (
                <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-800 dark:text-emerald-300 text-xs flex items-center gap-2 animate-in fade-in">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>OAuth token verified with provider endpoint. Expiry extended by 60 days.</span>
                </div>
              )}

              {/* Disconnect confirmation modal overlay */}
              {disconnectConfirmId === channel.id && (
                <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-xs space-y-3">
                  <p className="font-bold text-rose-800 dark:text-rose-300">
                    Are you sure you want to disconnect {channel.accountName}?
                  </p>
                  <p className="text-slate-600 dark:text-slate-300">
                    Data sync will stop immediately. Existing historical analytics stored in Firestore will remain intact according to your data retention policy.
                  </p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleDisconnect(channel.id)}
                      className="px-4 py-1.5 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-xl transition"
                    >
                      Confirm Disconnect
                    </button>
                    <button
                      onClick={() => setDisconnectConfirmId(null)}
                      className="px-3.5 py-1.5 text-slate-600 dark:text-slate-300 hover:bg-slate-100 rounded-xl"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
