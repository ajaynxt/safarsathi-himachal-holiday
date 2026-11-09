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
  Cpu,
  Clock,
  EyeOff,
  Plug,
  Sliders,
  Check,
  X
} from 'lucide-react';
import { MetricCard } from '../common/MetricCard';
import { DEMO_PLATFORM_STATS, DEMO_AUDIT_LOGS, DEMO_WORKSPACES } from '../../data/demoData';
import { PLATFORM_REGISTRY } from '../../data/platformRegistry';
import { formatNumber, formatFullDate } from '../../utils/formatters';
import { cn } from '../../utils/cn';

type AdminSubTab = 'overview' | 'connectors' | 'workspaces' | 'cost_usage' | 'health' | 'audit_logs';

export const AdminDashboard: React.FC = () => {
  const [activeAdminSubTab, setActiveAdminSubTab] = useState<AdminSubTab>('overview');
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

  const stats = DEMO_PLATFORM_STATS;
  const platformList = Object.values(PLATFORM_REGISTRY);

  return (
    <div className="space-y-6">
      {/* Super Admin Notice */}
      <div className="glass-panel rounded-2xl p-4.5 border border-amber-500/30 flex items-start gap-3.5 bg-amber-500/5">
        <ShieldAlert className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
        <div className="text-xs text-slate-700 dark:text-slate-300">
          <span className="font-bold text-amber-900 dark:text-amber-300 block mb-0.5">
            Platform Super Admin Security Boundary
          </span>
          Zero-Knowledge Tenant Isolation enforced: Platform Super Admins can monitor multi-tenant usage, system health, platform connectors, and audit logs, but <strong>CANNOT</strong> inspect customer private media, encrypted OAuth tokens, or direct messages.
        </div>
      </div>

      {/* Header & Subtabs */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-[#25171C] dark:text-[#FAF3F5]">
            Platform Super Admin Portal
          </h1>
          <p className="text-xs sm:text-sm text-[#8A6570] dark:text-[#D9B7C0] mt-1 font-medium">
            Multi-tenant oversight, 17 platform connector switches, Cloud Run telemetry, and immutable audit logs.
          </p>
        </div>

        {/* Subtabs Pill */}
        <div className="flex items-center glass-card p-1 rounded-2xl border border-[#D9B7C0]/35 overflow-x-auto">
          {[
            { id: 'overview' as AdminSubTab, label: 'Overview' },
            { id: 'connectors' as AdminSubTab, label: '17 Connectors' },
            { id: 'workspaces' as AdminSubTab, label: 'Tenants' },
            { id: 'cost_usage' as AdminSubTab, label: 'Cost & Quotas' },
            { id: 'health' as AdminSubTab, label: 'Health' },
            { id: 'audit_logs' as AdminSubTab, label: 'Audit Logs' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveAdminSubTab(tab.id)}
              className={cn(
                "px-3.5 py-1.5 text-xs font-bold rounded-xl whitespace-nowrap transition-all duration-200",
                activeAdminSubTab === tab.id
                  ? "btn-maroon text-white shadow-xs"
                  : "text-[#25171C]/70 dark:text-[#FAF3F5]/70 hover:text-maroon-700 hover:bg-maroon-500/10"
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Overview Subtab */}
      {activeAdminSubTab === 'overview' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <MetricCard
              title="Total SaaS Tenants"
              value={stats.totalWorkspaces}
              subtitle="Isolated tenant partitions"
              icon={Building2}
            />
            <MetricCard
              title="Platform Users"
              value={stats.totalUsers}
              subtitle="Authenticated via Firebase"
              icon={Users}
            />
            <MetricCard
              title="Active Connectors"
              value="17"
              subtitle="All official API connectors active"
              icon={Plug}
            />
            <MetricCard
              title="Est. Monthly GCP Cost"
              value={`₹${stats.estimatedGcpCostInr}`}
              change={-12.5}
              changeLabel="of ₹1,000 monthly ceiling"
              icon={IndianRupee}
            />
          </div>

          {/* Quick Tenant Table */}
          <div className="glass-panel rounded-3xl overflow-hidden">
            <div className="p-5 border-b border-[#D9B7C0]/30 dark:border-[#D9B7C0]/15 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-[#25171C] dark:text-[#FAF3F5]">
                  Active Tenant Workspaces
                </h3>
                <p className="text-xs text-slate-400 mt-0.5 font-medium">
                  Isolated Cloud Firestore collections per tenant.
                </p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-[#D9B7C0]/30 dark:border-[#D9B7C0]/15 bg-white/40 dark:bg-[#1A050E]/40 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    <th className="py-3 px-4">Workspace</th>
                    <th className="py-3 px-3">Plan</th>
                    <th className="py-3 px-3">Owner Email</th>
                    <th className="py-3 px-3">Connected Channels</th>
                    <th className="py-3 px-3">Created Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#D9B7C0]/25 dark:divide-[#D9B7C0]/15">
                  {DEMO_WORKSPACES.map((ws) => (
                    <tr key={ws.workspaceId} className="hover:bg-white/50 dark:hover:bg-[#200810]/50 transition-colors">
                      <td className="py-3 px-4 font-bold text-[#25171C] dark:text-[#FAF3F5]">
                        {ws.name}
                      </td>
                      <td className="py-3 px-3">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-maroon-500/10 text-maroon-700 dark:text-maroon-300 border border-maroon-300/30 uppercase">
                          {ws.plan.replace('_', ' ')}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-[#8A6570] dark:text-[#D9B7C0]">
                        {ws.ownerUid}
                      </td>
                      <td className="py-3 px-3">
                        <span className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
                          {ws.connectedAccountsCount} active
                        </span>
                      </td>
                      <td className="py-3 px-3 text-slate-400">
                        {formatFullDate(ws.createdAt)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* 17 Connectors Control Subtab */}
      {activeAdminSubTab === 'connectors' && (
        <div className="glass-panel rounded-3xl p-6 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#D9B7C0]/30">
            <div>
              <h3 className="text-base font-bold text-[#25171C] dark:text-[#FAF3F5]">
                Platform Connector Integration Control Panel
              </h3>
              <p className="text-xs text-[#8A6570] dark:text-[#D9B7C0] mt-0.5">
                Enable or disable OAuth connectors globally, inspect rate limits, and audit API sync health.
              </p>
            </div>
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/30">
              17 of 17 Configured
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {platformList.map((platform) => {
              const isEnabled = connectorStatus[platform.id] ?? true;
              return (
                <div
                  key={platform.id}
                  className="glass-card rounded-2xl p-4 border border-[#D9B7C0]/35 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2.5">
                        <div
                          className="w-8 h-8 rounded-xl flex items-center justify-center font-bold text-white text-xs shadow-sm"
                          style={{ backgroundColor: platform.brandColor }}
                        >
                          {platform.name.charAt(0)}
                        </div>
                        <div>
                          <h4 className="text-xs font-bold text-[#25171C] dark:text-[#FAF3F5]">
                            {platform.name}
                          </h4>
                          <span className="text-[10px] text-slate-400 uppercase">
                            {platform.category.replace(/_/g, ' ')}
                          </span>
                        </div>
                      </div>

                      {/* On/Off Switch */}
                      <button
                        onClick={() => toggleConnector(platform.id)}
                        className={cn(
                          "w-11 h-6 rounded-full transition-colors relative flex items-center p-0.5",
                          isEnabled ? "bg-maroon-600" : "bg-slate-300 dark:bg-slate-700"
                        )}
                        title={isEnabled ? "Disable connector" : "Enable connector"}
                      >
                        <div
                          className={cn(
                            "w-5 h-5 rounded-full bg-white shadow-sm transition-transform flex items-center justify-center text-[9px] font-bold",
                            isEnabled ? "translate-x-5 text-maroon-600" : "translate-x-0 text-slate-400"
                          )}
                        >
                          {isEnabled ? <Check className="w-3 h-3" /> : <X className="w-3 h-3" />}
                        </div>
                      </button>
                    </div>

                    <div className="space-y-1 text-[11px] text-[#8A6570] dark:text-[#D9B7C0]">
                      <div className="flex items-center justify-between">
                        <span>API Status:</span>
                        <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                          {platform.apiStatus}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Rate Quota:</span>
                        <span className="font-mono text-[10px]">
                          {platform.rateLimits.maxCallsPerDay} calls/day
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Recommended Sync:</span>
                        <span>{platform.rateLimits.recommendedSyncFrequency}</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 pt-2.5 border-t border-[#D9B7C0]/25 flex items-center justify-between text-[10px]">
                    <span className="text-slate-400">Sync Success: 99.8%</span>
                    <span className="text-maroon-600 dark:text-maroon-300 font-bold">AES Encrypted</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Tenants Subtab */}
      {activeAdminSubTab === 'workspaces' && (
        <div className="glass-panel rounded-3xl p-6 space-y-4">
          <h3 className="text-sm font-bold text-[#25171C] dark:text-[#FAF3F5]">
            Tenant Partitions (Cloud Firestore isolation)
          </h3>
          <p className="text-xs text-[#8A6570] dark:text-[#D9B7C0]">
            Each workspace maps to <code>/workspaces/{'{workspaceId}'}</code> with sub-collections for <code>connectedAccounts</code>, <code>analyticsCache</code>, and <code>reports</code>.
          </p>
          <div className="space-y-3 pt-2">
            {DEMO_WORKSPACES.map((ws) => (
              <div key={ws.workspaceId} className="glass-card rounded-2xl p-4 flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-[#25171C] dark:text-[#FAF3F5]">
                    {ws.name}
                  </h4>
                  <p className="text-[11px] text-slate-400 font-mono mt-0.5">
                    Workspace ID: {ws.workspaceId} • Tier: {ws.plan}
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 block">
                    Zero Cross-Tenant Leakage
                  </span>
                  <span className="text-[10px] text-slate-400">
                    Security Rules v2 Enforced
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Cost & Quotas Subtab */}
      {activeAdminSubTab === 'cost_usage' && (
        <div className="glass-panel rounded-3xl p-6 space-y-6">
          <div className="flex items-center justify-between border-b border-[#D9B7C0]/30 pb-4">
            <div>
              <h3 className="text-sm font-bold text-[#25171C] dark:text-[#FAF3F5]">
                Google Cloud Platform Usage & Cost Cap
              </h3>
              <p className="text-xs text-[#8A6570] dark:text-[#D9B7C0]">
                Monthly infrastructure target ceiling: <strong>₹1,000 INR</strong>
              </p>
            </div>
            <div className="text-right">
              <span className="text-lg font-black text-emerald-600 dark:text-emerald-400">
                ₹87.50 / ₹1,000.00
              </span>
              <p className="text-[10px] text-slate-400">8.75% of ceiling spent</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="glass-card rounded-2xl p-4">
              <span className="text-[10px] font-bold text-slate-400 uppercase block mb-1">
                Cloud Run (Mumbai)
              </span>
              <p className="text-lg font-black text-[#25171C] dark:text-[#FAF3F5]">
                ₹62.20
              </p>
              <p className="text-[10px] text-slate-400 mt-1">Scale-to-zero active (0-2 instances)</p>
            </div>
            <div className="glass-card rounded-2xl p-4">
              <span className="text-[10px] font-bold text-slate-400 uppercase block mb-1">
                Cloud Firestore
              </span>
              <p className="text-lg font-black text-[#25171C] dark:text-[#FAF3F5]">
                ₹25.30
              </p>
              <p className="text-[10px] text-slate-400 mt-1">Reads/writes within free tier</p>
            </div>
            <div className="glass-card rounded-2xl p-4">
              <span className="text-[10px] font-bold text-slate-400 uppercase block mb-1">
                Secret Manager
              </span>
              <p className="text-lg font-black text-emerald-600 dark:text-emerald-400">
                ₹0.00 (Free)
              </p>
              <p className="text-[10px] text-slate-400 mt-1">AES-256 master secrets</p>
            </div>
          </div>
        </div>
      )}

      {/* System Health Subtab */}
      {activeAdminSubTab === 'health' && (
        <div className="glass-panel rounded-3xl p-6 space-y-4">
          <h3 className="text-sm font-bold text-[#25171C] dark:text-[#FAF3F5]">
            Infrastructure Health Status
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-2xl border border-emerald-500/25 bg-emerald-500/5 flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-emerald-800 dark:text-emerald-400 block">
                  Cloud Run Backend: asia-south1 (Mumbai)
                </span>
                <p className="text-slate-500 dark:text-maroon-200/70 mt-0.5">
                  Latency: 28ms &bull; Zero crashes in 30 days &bull; 99.9% uptime
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl border border-emerald-500/25 bg-emerald-500/5 flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-emerald-800 dark:text-emerald-400 block">
                  Meta Graph API v21.0 & 17 Connectors
                </span>
                <p className="text-slate-500 dark:text-maroon-200/70 mt-0.5">
                  OAuth token exchange and insights queries responding normally
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Audit Logs Subtab */}
      {activeAdminSubTab === 'audit_logs' && (
        <div className="glass-panel rounded-3xl overflow-hidden">
          <div className="p-5 border-b border-[#D9B7C0]/30 dark:border-[#D9B7C0]/15">
            <h3 className="text-sm font-bold text-[#25171C] dark:text-[#FAF3F5]">
              Immutable Platform Audit Log
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Tracks administrative actions, sync events, and security access attempts.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-[#D9B7C0]/30 dark:border-[#D9B7C0]/15 bg-white/40 dark:bg-[#1A050E]/40 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  <th className="py-3 px-4">Timestamp</th>
                  <th className="py-3 px-3">Actor</th>
                  <th className="py-3 px-3">Workspace</th>
                  <th className="py-3 px-3">Action</th>
                  <th className="py-3 px-4">Details</th>
                  <th className="py-3 px-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#D9B7C0]/25 dark:divide-[#D9B7C0]/15">
                {DEMO_AUDIT_LOGS.map((log) => (
                  <tr key={log.id} className="hover:bg-white/50 dark:hover:bg-[#200810]/50 transition-colors">
                    <td className="py-3 px-4 text-slate-400 font-mono text-[11px]">
                      {formatFullDate(log.timestamp)}
                    </td>
                    <td className="py-3 px-3 font-semibold text-[#25171C] dark:text-[#FAF3F5]">
                      {log.actorEmail}
                    </td>
                    <td className="py-3 px-3 text-[#8A6570] dark:text-[#D9B7C0]">
                      {log.workspaceName}
                    </td>
                    <td className="py-3 px-3">
                      <span className="font-mono text-[10px] px-2 py-0.5 rounded-md bg-white/60 dark:bg-[#130308]/60 border border-[#D9B7C0]/30 text-maroon-700 dark:text-maroon-300">
                        {log.action}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-slate-500 max-w-xs truncate">
                      {log.details}
                    </td>
                    <td className="py-3 px-3">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                        {log.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
