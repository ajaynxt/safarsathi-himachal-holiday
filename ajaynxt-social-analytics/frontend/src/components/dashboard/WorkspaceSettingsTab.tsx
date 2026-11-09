import React, { useState } from 'react';
import {
  Users,
  Shield,
  CreditCard,
  UserPlus,
  Trash2,
  CheckCircle2,
  Lock,
  Building2,
  HardDrive
} from 'lucide-react';
import { useWorkspace } from '../../context/WorkspaceContext';
import { useAuth } from '../../context/AuthContext';
import { UserRole } from '../../types/auth';

export const WorkspaceSettingsTab: React.FC = () => {
  const { currentWorkspace, inviteMember, removeMember } = useWorkspace();
  const { currentRole, user } = useAuth();

  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState<UserRole>('workspace_member');
  const [inviteSent, setInviteSent] = useState(false);

  const canManageMembers = currentRole === 'workspace_owner' || currentRole === 'workspace_admin' || currentRole === 'platform_super_admin';

  const handleInvite = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inviteEmail.trim()) return;
    inviteMember(inviteEmail.trim(), inviteRole);
    setInviteEmail('');
    setInviteSent(true);
    setTimeout(() => setInviteSent(false), 4000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
          Workspace Settings & Team Access
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
          Manage tenant members, roles, usage limits and subscription plan for <strong className="text-slate-700 dark:text-slate-300">{currentWorkspace.name}</strong>.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Workspace Info & Subscription Plan */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm space-y-4">
          <h3 className="text-sm font-semibold text-slate-900 dark:text-white flex items-center gap-2">
            <Building2 className="w-4 h-4 text-brand-500" />
            Workspace Profile
          </h3>

          <div className="space-y-3 text-xs">
            <div>
              <span className="text-slate-400 block text-[11px]">Workspace Name:</span>
              <span className="font-semibold text-slate-800 dark:text-slate-200">{currentWorkspace.name}</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[11px]">Tenant Slug (Firestore Isolated ID):</span>
              <code className="font-mono text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded">
                {currentWorkspace.workspaceId}
              </code>
            </div>
            <div>
              <span className="text-slate-400 block text-[11px]">Current Plan:</span>
              <span className="font-bold text-brand-600 dark:text-brand-400 uppercase tracking-wide">
                {currentWorkspace.plan.replace('_', ' ')}
              </span>
            </div>
          </div>

          {/* Usage Meter */}
          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-slate-500">Monthly Sync Quota</span>
              <span className="font-semibold text-slate-800 dark:text-slate-200">
                {currentWorkspace.monthlySyncsUsed} / {currentWorkspace.monthlySyncQuota} calls
              </span>
            </div>
            <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
              <div
                className="bg-brand-600 h-full rounded-full transition-all"
                style={{ width: `${(currentWorkspace.monthlySyncsUsed / currentWorkspace.monthlySyncQuota) * 100}%` }}
              />
            </div>
            <p className="text-[10px] text-slate-400">
              Capped to maintain serverless Cloud Run & Firestore costs under monthly ₹1,000 threshold.
            </p>
          </div>
        </div>

        {/* Team Members List & Invite */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                <Users className="w-4 h-4 text-brand-500" />
                Team Members ({currentWorkspace.members.length})
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Every member's access is strictly scoped to this workspace.
              </p>
            </div>
          </div>

          {/* Invite Form */}
          {canManageMembers && (
            <form onSubmit={handleInvite} className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200/60 dark:border-slate-800 space-y-2">
              <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 block">
                Invite New Member
              </span>
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  value={inviteEmail}
                  onChange={e => setInviteEmail(e.target.value)}
                  placeholder="colleague@agency.com"
                  className="flex-1 px-3 py-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                  required
                />
                <select
                  value={inviteRole}
                  onChange={e => setInviteRole(e.target.value as UserRole)}
                  className="px-3 py-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                >
                  <option value="workspace_member">Member (Read-only)</option>
                  <option value="workspace_admin">Admin (Manage)</option>
                  <option value="workspace_owner">Owner (Full access)</option>
                </select>
                <button
                  type="submit"
                  className="px-3 py-1.5 bg-brand-600 hover:bg-brand-700 text-white rounded-lg text-xs font-medium shrink-0 flex items-center justify-center gap-1 transition"
                >
                  <UserPlus className="w-3.5 h-3.5" />
                  Send Invite
                </button>
              </div>

              {inviteSent && (
                <div className="flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400 font-medium pt-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Invitation successfully queued!
                </div>
              )}
            </form>
          )}

          {/* Members Table */}
          <div className="divide-y divide-slate-100 dark:divide-slate-800 text-xs">
            {currentWorkspace.members.map(member => (
              <div key={member.uid} className="py-3 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center font-bold text-slate-700 dark:text-slate-300 text-xs">
                    {member.displayName.charAt(0)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-slate-900 dark:text-white">
                        {member.displayName}
                      </span>
                      {member.uid === user?.uid && (
                        <span className="text-[10px] px-1.5 py-0.2 rounded bg-brand-500/10 text-brand-600 dark:text-brand-400 font-medium">
                          You
                        </span>
                      )}
                    </div>
                    <span className="text-[11px] text-slate-400">{member.email}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 capitalize border border-slate-200 dark:border-slate-700">
                    {member.role.replace(/_/g, ' ')}
                  </span>
                  {canManageMembers && member.role !== 'workspace_owner' && (
                    <button
                      onClick={() => removeMember(member.uid)}
                      className="p-1 text-slate-400 hover:text-rose-500 transition"
                      title="Remove member"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
