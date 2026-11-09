import React, { useState } from 'react';
import { Building2, Plus, Sparkles, Check } from 'lucide-react';
import { Modal } from './Modal';
import { useWorkspace } from '../../context/WorkspaceContext';
import { SubscriptionPlan } from '../../types/workspace';

interface CreateWorkspaceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CreateWorkspaceModal: React.FC<CreateWorkspaceModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { createWorkspace } = useWorkspace();
  const [workspaceName, setWorkspaceName] = useState('');
  const [plan, setPlan] = useState<SubscriptionPlan>('starter');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!workspaceName.trim()) return;
    createWorkspace(workspaceName.trim(), plan);
    setWorkspaceName('');
    onClose();
  };

  const plans: { id: SubscriptionPlan; name: string; price: string; desc: string }[] = [
    {
      id: 'starter',
      name: 'Starter Creator',
      price: '₹499/mo',
      desc: '1 Instagram Account • Daily Insights Sync',
    },
    {
      id: 'pro_agency',
      name: 'Pro Agency',
      price: '₹1,499/mo',
      desc: '5 Accounts • 5 Team Members • Client Reports',
    },
    {
      id: 'enterprise',
      name: 'Custom Enterprise',
      price: '₹4,999/mo',
      desc: 'Unlimited Accounts • Dedicated Cloud Run',
    },
  ];

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Create Isolated Workspace"
      description="Each workspace maintains segregated channels, team permissions, and Firestore collections."
      maxWidth="md"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="text-xs font-semibold text-[#25171C] dark:text-maroon-200 block mb-1.5">
            Workspace Name
          </label>
          <div className="relative">
            <Building2 className="w-4 h-4 text-maroon-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={workspaceName}
              onChange={(e) => setWorkspaceName(e.target.value)}
              placeholder="e.g. Apex Media Agency or Client Portfolio"
              className="w-full pl-9 pr-3 py-2 bg-white/60 dark:bg-[#130308]/60 border border-[#D9B7C0]/40 dark:border-[#D9B7C0]/20 rounded-xl text-xs text-[#25171C] dark:text-[#FAF3F5] focus:outline-none focus:ring-2 focus:ring-maroon-500/20 focus:border-maroon-500 transition"
              required
              autoFocus
            />
          </div>
        </div>

        <div>
          <label className="text-xs font-semibold text-[#25171C] dark:text-maroon-200 block mb-2">
            Select Subscription Tier
          </label>
          <div className="space-y-2">
            {plans.map((p) => (
              <label
                key={p.id}
                onClick={() => setPlan(p.id)}
                className={`flex items-center justify-between p-3 rounded-2xl border cursor-pointer transition ${
                  plan === p.id
                    ? 'glass-card border-maroon-600 dark:border-maroon-400 bg-maroon-500/5'
                    : 'bg-white/40 dark:bg-[#130308]/40 border-[#D9B7C0]/30 dark:border-[#D9B7C0]/15 hover:border-maroon-300'
                }`}
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-[#25171C] dark:text-[#FAF3F5]">
                      {p.name}
                    </span>
                    <span className="text-[10px] font-semibold text-maroon-700 dark:text-maroon-300">
                      {p.price}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                    {p.desc}
                  </p>
                </div>
                <div
                  className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                    plan === p.id
                      ? 'border-maroon-600 bg-maroon-600 text-white'
                      : 'border-slate-300 dark:border-slate-700'
                  }`}
                >
                  {plan === p.id && <Check className="w-2.5 h-2.5" />}
                </div>
              </label>
            ))}
          </div>
        </div>

        <div className="flex justify-end gap-2.5 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-5 py-2 text-xs font-semibold btn-maroon rounded-xl flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>Create Workspace</span>
          </button>
        </div>
      </form>
    </Modal>
  );
};
