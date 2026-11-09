import React from 'react';
import { Calendar } from 'lucide-react';
import { DateRangePreset } from '../../types/analytics';
import { useWorkspace } from '../../context/WorkspaceContext';
import { cn } from '../../utils/cn';

export const DateRangePicker: React.FC = () => {
  const { dateRangePreset, setDateRangePreset } = useWorkspace();

  const presets: { id: DateRangePreset; label: string }[] = [
    { id: '7d', label: '7D' },
    { id: '30d', label: '30D' },
    { id: '90d', label: '90D' },
    { id: 'custom', label: 'Custom' },
  ];

  return (
    <div className="flex items-center glass-card p-1 rounded-xl border border-[#D9B7C0]/35 dark:border-[#D9B7C0]/20">
      <div className="px-2 text-maroon-500 dark:text-maroon-300 hidden sm:flex items-center">
        <Calendar className="w-3.5 h-3.5" />
      </div>
      <div className="flex items-center gap-1">
        {presets.map((p) => {
          const isActive = dateRangePreset === p.id;
          return (
            <button
              key={p.id}
              onClick={() => setDateRangePreset(p.id)}
              className={cn(
                "px-2.5 py-1 text-xs font-semibold rounded-lg transition-all duration-200",
                isActive
                  ? "btn-maroon text-white shadow-xs"
                  : "text-[#25171C]/70 dark:text-[#FAF3F5]/70 hover:text-maroon-700 dark:hover:text-white hover:bg-maroon-500/10"
              )}
            >
              {p.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};
