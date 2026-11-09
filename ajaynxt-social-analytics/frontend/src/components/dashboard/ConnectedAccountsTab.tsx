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
  Info
} from 'lucide-react';
import { InstagramIcon } from '../common/InstagramIcon';
import { useWorkspace } from '../../context/WorkspaceContext';
import { formatFullDate } from '../../utils/formatters';

export const ConnectedAccountsTab: React.FC = () => {
  const {
    currentWorkspace,
    disconnectInstagramAccount,
    setIsConnectModalOpen,
  } = useWorkspace();

  const [disconnectConfirmId, setDisconnectConfirmId] = useState<string | null>(null);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
              Connected Instagram Channels
            </h1>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-pink-500/10 text-pink-600 dark:text-pink-400">
              Official Meta OAuth
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Manage authenticated Instagram Business & Creator accounts for workspace: <strong className="text-slate-700 dark:text-slate-300">{currentWorkspace.name}</strong>.
          </p>
        </div>

        <button
          onClick={() => setIsConnectModalOpen(true)}
          className="inline-flex items-center gap-2 px-3.5 py-2 bg-gradient-to-r from-pink-600 via-rose-500 to-amber-500 hover:from-pink-700 hover:to-amber-600 text-white text-xs font-semibold rounded-xl shadow-sm hover:shadow transition"
        >
          <Plus className="w-4 h-4" />
          Connect Instagram Professional
        </button>
      </div>

      {/* Security Guarantee Banner */}
      <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4 flex items-start gap-3 text-xs">
        <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
        <div className="text-slate-600 dark:text-slate-300">
          <span className="font-semibold text-emerald-800 dark:text-emerald-400 block mb-0.5">
            Meta Platform Terms & Privacy Guarantees
          </span>
          AJAYNXT uses official Meta Graph API v21.0 endpoints. Tokens are stored encrypted at rest with AES-256-GCM in Cloud Firestore via Google Secret Manager. We never request passwords, never scrape pages, and never expose client secrets to browser JavaScript.
        </div>
      </div>

      {/* Accounts List */}
      <div className="space-y-4">
        {currentWorkspace.connections.length === 0 ? (
          <div className="text-center py-12 bg-white dark:bg-slate-900 border border-dashed border-slate-300 dark:border-slate-800 rounded-xl p-8">
            <InstagramIcon className="w-10 h-10 text-slate-400 mx-auto mb-3" />
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
              No Instagram Accounts Connected
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto mt-1 mb-4">
              Connect an Instagram Business or Creator account associated with a Facebook Page to begin syncing analytics.
            </p>
            <button
              onClick={() => setIsConnectModalOpen(true)}
              className="px-4 py-2 bg-brand-600 hover:bg-brand-700 text-white text-xs font-medium rounded-lg"
            >
              Connect First Account
            </button>
          </div>
        ) : (
          currentWorkspace.connections.map(conn => (
            <div
              key={conn.connectionId}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-brand-500/40 shrink-0">
                    <img
                      src={conn.profilePictureUrl}
                      alt={conn.username}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                        {conn.name}
                      </h3>
                      <span className="text-xs font-semibold px-2 py-0.2 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                        {conn.status}
                      </span>
                      <span className="text-xs px-2 py-0.2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-medium">
                        {conn.accountType}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                      @{conn.username} &bull; IG User ID: <code className="font-mono text-[11px]">{conn.instagramUserId}</code>
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setDisconnectConfirmId(conn.connectionId)}
                    className="px-3 py-1.5 text-xs text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 border border-rose-200 dark:border-rose-900/60 rounded-lg font-medium transition flex items-center gap-1.5"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    Disconnect
                  </button>
                </div>
              </div>

              {/* Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 p-3 bg-slate-50 dark:bg-slate-800/40 rounded-lg text-xs">
                <div>
                  <span className="text-slate-400 block text-[11px]">Linked Facebook Page:</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">{conn.facebookPageName}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px]">Token Expiration:</span>
                  <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                    Valid (Expires {new Date(conn.tokenExpiresAt).toLocaleDateString()})
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px]">Last Graph API Sync:</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">{formatFullDate(conn.lastSyncedAt)}</span>
                </div>
              </div>

              {/* Scopes badge */}
              <div className="flex flex-wrap items-center gap-1.5 pt-2 text-[11px]">
                <span className="text-slate-400">Authorized Scopes:</span>
                {conn.scopes.map(s => (
                  <span
                    key={s}
                    className="font-mono text-[10px] px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700"
                  >
                    {s}
                  </span>
                ))}
              </div>

              {/* Disconnect Confirmation Alert if clicked */}
              {disconnectConfirmId === conn.connectionId && (
                <div className="p-3 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 rounded-lg text-xs flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2 text-rose-700 dark:text-rose-300">
                    <AlertTriangle className="w-4 h-4 shrink-0" />
                    <span>
                      Disconnect @{conn.username}? Cached historical insights will be preserved according to your data retention policy.
                    </span>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => setDisconnectConfirmId(null)}
                      className="px-2.5 py-1 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800 rounded font-medium"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => {
                        disconnectInstagramAccount(conn.connectionId);
                        setDisconnectConfirmId(null);
                      }}
                      className="px-2.5 py-1 bg-rose-600 hover:bg-rose-700 text-white rounded font-medium"
                    >
                      Confirm Disconnect
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};
