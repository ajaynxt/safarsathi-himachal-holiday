import React from 'react';
import { ArrowUpRight, ArrowDownRight, Minus, LucideIcon } from 'lucide-react';
import { cn } from '../../utils/cn';

interface MetricCardProps {
  title: string;
  value: string | number;
  change?: number;
  changeLabel?: string;
  subtitle?: string;
  icon?: LucideIcon;
  iconColor?: string;
  trend?: 'up' | 'down' | 'neutral';
  tooltip?: string;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  change,
  changeLabel = 'vs previous period',
  subtitle,
  icon: Icon,
  iconColor,
  trend,
}) => {
  const isPositive = change !== undefined ? change > 0 : trend === 'up';
  const isNegative = change !== undefined ? change < 0 : trend === 'down';

  return (
    <div className="glass-card rounded-2xl p-5 relative overflow-hidden group">
      {/* Specular glass highlight reflection at top edge */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/80 dark:via-maroon-300/30 to-transparent pointer-events-none" />

      <div className="flex items-center justify-between mb-3.5">
        <span className="text-[11px] font-semibold text-slate-500 dark:text-maroon-300/80 uppercase tracking-wider">
          {title}
        </span>
        {Icon && (
          <div
            className={cn(
              "p-2 rounded-xl transition-all duration-300 group-hover:scale-105 border",
              iconColor || "bg-maroon-500/10 text-maroon-700 dark:text-maroon-300 border-maroon-300/25 dark:border-maroon-300/15"
            )}
          >
            <Icon className="w-4 h-4" />
          </div>
        )}
      </div>

      <div className="flex items-baseline gap-2 mb-1">
        <span className="text-2xl sm:text-3xl font-bold tracking-tight text-[#25171C] dark:text-[#FAF3F5]">
          {value}
        </span>
      </div>

      {(change !== undefined || subtitle) && (
        <div className="mt-3.5 flex items-center justify-between text-xs pt-2.5 border-t border-[#D9B7C0]/25 dark:border-[#D9B7C0]/15">
          {change !== undefined ? (
            <div className="flex items-center gap-1.5 font-medium">
              <span
                className={cn(
                  "inline-flex items-center px-1.5 py-0.5 rounded-md text-[11px] font-semibold",
                  isPositive && "text-emerald-700 bg-emerald-500/10 border border-emerald-500/20 dark:text-emerald-400",
                  isNegative && "text-rose-700 bg-rose-500/10 border border-rose-500/20 dark:text-rose-400",
                  !isPositive && !isNegative && "text-slate-600 bg-slate-500/10 border border-slate-500/20 dark:text-slate-300"
                )}
              >
                {isPositive && <ArrowUpRight className="w-3 h-3 mr-0.5" />}
                {isNegative && <ArrowDownRight className="w-3 h-3 mr-0.5" />}
                {!isPositive && !isNegative && <Minus className="w-3 h-3 mr-0.5" />}
                {isPositive ? `+${change}%` : `${change}%`}
              </span>
              <span className="text-slate-400 dark:text-maroon-200/60 text-[11px] truncate">
                {changeLabel}
              </span>
            </div>
          ) : (
            <span className="text-slate-400 dark:text-maroon-200/60 text-[11px] truncate">
              {subtitle}
            </span>
          )}
        </div>
      )}
    </div>
  );
};
