import React, { useState } from 'react';
import {
  ShieldAlert,
  Server,
  Database,
  Users,
  Building2,
  Activity,
  AlertTriangle,
  CheckCircle2,
  Lock,
  Layers,
  IndianRupee,
  Clock,
  Plug,
  ExternalLink,
  ArrowLeft,
  RefreshCw,
  LogOut
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { PLATFORM_REGISTRY } from '../../data/platformRegistry';
import { DEMO_PLATFORM_STATS, DEMO_AUDIT_LOGS, DEMO_WORKSPACES } from '../../data/demoData';
import { formatNumber, formatFullDate } from '../../utils/formatters';
import { cn } from '../../utils/cn';

interface SuperAdminStandalonePortalProps {
  onReturnToCustomerApp: () => void;
}

type AdminTab = 'overview' | 'connectors' | 'workspaces' | 'billing_storage' | 'health' | 'audit_logs';

export const SuperAdminStandalonePortal: React.FC<SuperAdminStandalonePortalProps> = ({
  onReturnToCustomerApp,
}) => {
  const { user, isLoggedIn, loginWithGoogle, logout } = useAuth();
  const [activeTab, setActiveTab] = useState<AdminTab>('overview');
  const [connectorStatus, setConnectorStatus] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    Object.keys(PLATFORM_REGISTRY).forEach((id) => {
      initial[id] = true;
    });
    return initial;
  });

  const toggleConnector = (id: string) => {
    setConnectorStatus((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const isAuthorizedSuperAdmin = user?.email?.toLowerCase() === 'ajayx3neha@gmail.com';

  // -------------------------------------------------------------
  // SECURITY GATE: ONLY ajayx3neha@gmail.com CAN ENTER
  // -------------------------------------------------------------
  if (!isLoggedIn || !isAuthorizedSuperAdmin) {
    return (
      <div className="min-h-screen bg-[#110307] text-[#FAF3F5] flex flex-col items-center justify-center p-4 selection:bg-amber-600 selection:text-white relative">
        <div className="w-full max-w-md glass-panel bg-[#200810]/80 rounded-3xl p-8 border border-amber-500/30 shadow-2xl space-y-6 text-center relative z-10 backdrop-blur-2xl">
          <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-amber-700 via-amber-600 to-amber-500 mx-auto flex items-center justify-center shadow-lg shadow-amber-600/30 border border-amber-400/30">
            <ShieldAlert className="w-8 h-8 text-white" />
          </div>

          <div>
            <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-bold border border-amber-500/30">
              ROOT SECURITY CLEARANCE REQUIRED
            </span>
            <h1 className="text-xl font-black tracking-tight mt-2 text-white">
              AJAYNXT Super Admin Portal
            </h1>
            <p className="text-xs text-amber-200/70 mt-1">
              Zero-Knowledge Multi-Tenant System Infrastructure & Connectors Gateway.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-left text-xs space-y-2">
            <div className="font-bold text-amber-300 flex items-center gap-2">
              <Lock className="w-3.5 h-3.5" />
              <span>Restricted Root Access</span>
            </div>
            <p className="text-amber-100/80 leading-relaxed text-[11px]">
              This control center is strictly restricted to authorized system administrator: <strong className="text-white">ajayx3neha@gmail.com</strong>.
            </p>
          </div>

          {isLoggedIn && !isAuthorizedSuperAdmin && (
            <div className="p-3 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs text-left">
              <div className="font-bold mb-0.5">Access Denied (403)</div>
              Signed in as <span className="font-mono text-white">{user?.email}</span>. This account does not hold platform root privileges.
            </div>
          )}

          <div className="space-y-3 pt-2">
            {!isLoggedIn ? (
              <button
                onClick={loginWithGoogle}
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white font-bold text-xs shadow-md transition flex items-center justify-center gap-2"
              >
                <span>Sign In with Google (ajayx3neha@gmail.com)</span>
              </button>
            ) : (
              <button
                onClick={logout}
                className="w-full py-2.5 px-4 rounded-xl glass-card text-rose-300 hover:bg-rose-500/10 font-bold text-xs transition flex items-center justify-center gap-2"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Switch to ajayx3neha@gmail.com</span>
              </button>
            )}

            <button
              onClick={onReturnToCustomerApp}
              className="w-full py-2.5 px-4 rounded-xl border border-white/10 text-white/70 hover:text-white font-semibold text-xs transition flex items-center justify-center gap-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Return to Customer App</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // AUTHORIZED SUPER ADMIN CONTROL CENTER FOR ajayx3neha@gmail.com
  // -------------------------------------------------------------
  const platformList = Object.values(PLATFORM_REGISTRY);

  return (
    <div className="min-h-screen bg-[#110307] text-[#FAF3F5] flex flex-col font-sans selection:bg-amber-600 selection:text-white">
      {/* Top Admin App Bar */}
      <header className="h-16 bg-[#1a050b]/90 border-b border-amber-500/20 px-4 sm:px-6 flex items-center justify-between sticky top-0 z-30 backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-amber-600 to-amber-700 flex items-center justify-center text-white shadow-md border border-amber-400/30 font-black">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-black text-sm tracking-tight text-white">
                AJAYNXT PLATFORM SUPER ADMIN
              </span>
              <span className="text-[9px] font-mono px-2 py-0.2 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold">
                ROOT ACTIVE
              </span>
            </div>
            <span className="text-[10px] text-amber-200/70 font-mono">
              Operator: ajayx3neha@gmail.com • Project: ajaynxt-ai-design-studio
            </span>
          </div>
        </div>

        {/* Right Admin Controls */}
        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-2 text-xs font-mono bg-white/5 px-3 py-1.5 rounded-xl border border-white/10">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-emerald-300 font-bold">Cloud Run asia-south1 OK</span>
            <span className="text-white/40">•</span>
            <span className="text-amber-300">Billing: rider4xr</span>
          </div>

          <button
            onClick={onReturnToCustomerApp}
            className="px-3.5 py-1.5 rounded-xl btn-maroon text-white text-xs font-bold transition flex items-center gap-1.5 shadow-md"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Open Customer App</span>
          </button>
        </div>
      </header>

      {/* Admin Navigation Pills */}
      <div className="bg-[#18040a]/80 border-b border-amber-500/15 px-4 sm:px-6 py-2.5 overflow-x-auto flex items-center gap-2">
        {[
          { id: 'overview' as AdminTab, label: 'System Overview & KPIs' },
          { id: 'connectors' as AdminTab, label: '17 Connectors Gateway (17 Active)' },
          { id: 'workspaces' as AdminTab, label: 'Multi-Tenant Workspaces' },
          { id: 'billing_storage' as AdminTab, label: 'Billing & Datastore (rider4xr)' },
          { id: 'health' as AdminTab, label: 'Cloud Run & DB Telemetry' },
          { id: 'audit_logs' as AdminTab, label: 'Zero-Knowledge Audit Logs' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition",
              activeTab === tab.id
                ? "bg-gradient-to-r from-amber-600 to-amber-700 text-white shadow-md"
                : "text-white/70 hover:text-white hover:bg-white/10"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Main Admin View Container */}
      <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full space-y-6">
        {/* 1. OVERVIEW TAB */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="glass-panel bg-[#200810]/70 rounded-3xl p-5 border border-amber-500/20">
                <span className="text-[10px] font-bold uppercase text-amber-300">Total Workspaces</span>
                <div className="text-2xl font-black mt-1 text-white">12 Tenants</div>
                <div className="text-[11px] text-emerald-400 mt-1">100% IDOR-isolated</div>
              </div>

              <div className="glass-panel bg-[#200810]/70 rounded-3xl p-5 border border-amber-500/20">
                <span className="text-[10px] font-bold uppercase text-amber-300">Active Connectors</span>
                <div className="text-2xl font-black mt-1 text-white">17 Platforms</div>
                <div className="text-[11px] text-emerald-400 mt-1">Official APIs only</div>
              </div>

              <div className="glass-panel bg-[#200810]/70 rounded-3xl p-5 border border-amber-500/20">
                <span className="text-[10px] font-bold uppercase text-amber-300">Monthly GCP Cost</span>
                <div className="text-2xl font-black mt-1 text-white">₹87.50</div>
                <div className="text-[11px] text-amber-400 mt-1">Budget Cap: ₹1,000 INR</div>
              </div>

              <div className="glass-panel bg-[#200810]/70 rounded-3xl p-5 border border-amber-500/20">
                <span className="text-[10px] font-bold uppercase text-amber-300">Billing Account</span>
                <div className="text-2xl font-black mt-1 text-white font-mono">rider4xr</div>
                <div className="text-[11px] text-emerald-400 mt-1">Firestore / Datastore OK</div>
              </div>
            </div>

            {/* Quick 17 Connectors Grid Preview */}
            <div className="glass-panel bg-[#200810]/70 rounded-3xl p-6 border border-amber-500/20">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-bold text-white">Platform Connectors Gateway Status</h3>
                <span className="text-xs font-mono text-emerald-400">17 of 17 Enabled</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                {platformList.map((p) => (
                  <div key={p.id} className="p-3 rounded-2xl bg-white/5 border border-white/10 flex flex-col justify-between">
                    <div>
                      <div className="text-xs font-bold text-white truncate">{p.name}</div>
                      <span className="text-[10px] font-mono text-amber-300/80">{p.id}</span>
                    </div>
                    <div className="flex items-center justify-between mt-3 pt-2 border-t border-white/10">
                      <span className="text-[10px] font-bold text-emerald-400">HEALTHY</span>
                      <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 2. 17 CONNECTORS TAB */}
        {activeTab === 'connectors' && (
          <div className="space-y-4">
            <div className="glass-panel bg-[#200810]/70 rounded-3xl p-6 border border-amber-500/20">
              <h3 className="text-base font-bold text-white mb-1">Global Platform Connectors Control</h3>
              <p className="text-xs text-amber-200/70 mb-4">
                Enable or disable official API connectors, inspect rate limits, and view official documentation.
              </p>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-white/10 text-amber-300/80 font-bold">
                      <th className="pb-3">Platform</th>
                      <th className="pb-3">Category</th>
                      <th className="pb-3">API Status</th>
                      <th className="pb-3">Rate Limits</th>
                      <th className="pb-3 text-right">Switch</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/10">
                    {platformList.map((p) => {
                      const enabled = connectorStatus[p.id] ?? true;
                      return (
                        <tr key={p.id} className="hover:bg-white/5 transition">
                          <td className="py-3 font-bold text-white">{p.name}</td>
                          <td className="py-3 capitalize text-white/70">{p.category.replace('_', ' ')}</td>
                          <td className="py-3">
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                              {p.apiStatus}
                            </span>
                          </td>
                          <td className="py-3 text-white/70 font-mono text-[11px]">
                            {p.rateLimits.maxCallsPerDay} calls/day ({p.rateLimits.recommendedSyncFrequency})
                          </td>
                          <td className="py-3 text-right">
                            <button
                              onClick={() => toggleConnector(p.id)}
                              className={cn(
                                "px-3 py-1 rounded-xl text-[11px] font-bold transition",
                                enabled ? "bg-emerald-600 text-white" : "bg-white/10 text-white/50"
                              )}
                            >
                              {enabled ? 'ENABLED' : 'DISABLED'}
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* 3. MULTI-TENANT WORKSPACES TAB */}
        {activeTab === 'workspaces' && (
          <div className="glass-panel bg-[#200810]/70 rounded-3xl p-6 border border-amber-500/20 space-y-4">
            <h3 className="text-base font-bold text-white mb-1">Multi-Tenant Workspaces Registry</h3>
            <p className="text-xs text-amber-200/70">
              Zero-Knowledge isolation enforced. Platform super admins can monitor quotas, member counts, and tier limits.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              {DEMO_WORKSPACES.map((ws) => (
                <div key={ws.workspaceId} className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-sm text-white">{ws.name}</h4>
                      <span className="text-[10px] font-mono text-amber-300">{ws.workspaceId}</span>
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 uppercase">
                      {ws.plan}
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-[11px] pt-2 border-t border-white/10 text-white/80">
                    <div>
                      <span className="text-white/40 block text-[10px]">MEMBERS</span>
                      <span className="font-bold">{ws.members.length} users</span>
                    </div>
                    <div>
                      <span className="text-white/40 block text-[10px]">CHANNELS</span>
                      <span className="font-bold">{ws.connections.length} active</span>
                    </div>
                    <div>
                      <span className="text-white/40 block text-[10px]">SYNC QUOTA</span>
                      <span className="font-bold">{ws.monthlySyncsUsed} / {ws.monthlySyncQuota}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 4. BILLING & DATASTORE (rider4xr) */}
        {activeTab === 'billing_storage' && (
          <div className="space-y-6">
            <div className="glass-panel bg-[#200810]/70 rounded-3xl p-6 border border-amber-500/20 space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-amber-500/20 text-amber-300">
                  <IndianRupee className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Google Cloud Billing & Datastore Integration</h3>
                  <p className="text-xs text-amber-200/70">
                    Billing Account: <strong className="text-white font-mono">rider4xr</strong>
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                  <span className="text-[10px] text-white/50 block font-bold uppercase">Billing Account ID</span>
                  <span className="text-base font-bold font-mono text-amber-300">rider4xr</span>
                  <p className="text-[10px] text-emerald-400 mt-1">Linked to GCP Project</p>
                </div>

                <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                  <span className="text-[10px] text-white/50 block font-bold uppercase">Storage Engine</span>
                  <span className="text-base font-bold text-white">Cloud Firestore</span>
                  <p className="text-[10px] text-white/70 mt-1">Multi-Region & Native Datastore</p>
                </div>

                <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                  <span className="text-[10px] text-white/50 block font-bold uppercase">Monthly Infra Cap</span>
                  <span className="text-base font-bold text-emerald-300">₹1,000 INR Max</span>
                  <p className="text-[10px] text-emerald-400 mt-1">Current: ₹87.50 (Healthy)</p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-200 leading-relaxed">
                <strong className="text-white block mb-0.5">Payment & Transaction Datastore Active:</strong>
                All payment events, workspace plan upgrades, and billing metadata are persisted directly in Firestore under the <code className="bg-emerald-900/50 px-1 py-0.5 rounded text-emerald-100 font-mono">/billing_transactions</code> collection linked to billing account <code className="bg-emerald-900/50 px-1 py-0.5 rounded text-emerald-100 font-mono">rider4xr</code>.
              </div>
            </div>
          </div>
        )}

        {/* 5. HEALTH & TELEMETRY */}
        {activeTab === 'health' && (
          <div className="glass-panel bg-[#200810]/70 rounded-3xl p-6 border border-amber-500/20 space-y-4">
            <h3 className="text-base font-bold text-white mb-1">Cloud Run asia-south1 Infrastructure</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                <span className="font-bold text-amber-300">Cloud Run Serverless Container</span>
                <div className="text-[11px] text-white/80 space-y-1">
                  <div>Region: <code className="text-emerald-400 font-mono">asia-south1 (Mumbai)</code></div>
                  <div>Min Instances: <code className="text-white font-mono">0 (Scale to Zero)</code></div>
                  <div>Max Instances: <code className="text-white font-mono">2</code></div>
                  <div>Memory: <code className="text-white font-mono">512 MiB</code></div>
                  <div>Status: <span className="text-emerald-400 font-bold">HEALTHY (HTTP 200 OK)</span></div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                <span className="font-bold text-amber-300">Zero-Knowledge Token Vault</span>
                <div className="text-[11px] text-white/80 space-y-1">
                  <div>Algorithm: <code className="text-emerald-400 font-mono">AES-256-GCM</code></div>
                  <div>Key Rotation: <code className="text-white font-mono">Automated 90-day</code></div>
                  <div>Secret Storage: <code className="text-white font-mono">GCP Secret Manager</code></div>
                  <div>Anti-IDOR Protection: <span className="text-emerald-400 font-bold">STRICTLY ENFORCED</span></div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 6. IMMUTABLE AUDIT LOGS */}
        {activeTab === 'audit_logs' && (
          <div className="glass-panel bg-[#200810]/70 rounded-3xl p-6 border border-amber-500/20 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-white">Immutable Security Audit Logs</h3>
                <p className="text-xs text-amber-200/70">Realtime append-only stream of security and administrative operations.</p>
              </div>
            </div>

            <div className="divide-y divide-white/10 text-xs font-mono">
              {DEMO_AUDIT_LOGS.map((log) => (
                <div key={log.id} className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <span className="text-amber-300 font-bold">{log.action}</span>
                    <span className="text-white/40 ml-2">by {log.actorEmail}</span>
                    <div className="text-[11px] text-white/70 font-sans mt-0.5">{log.details}</div>
                  </div>
                  <div className="text-right text-[10px] text-white/40">
                    <div>{formatFullDate(log.timestamp)}</div>
                    <div>IP: {log.ipAddress}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
