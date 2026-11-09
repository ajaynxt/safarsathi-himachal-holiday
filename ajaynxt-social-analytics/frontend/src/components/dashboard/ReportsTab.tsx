import React, { useState } from 'react';
import { FileText, Download, CheckCircle2, Calendar, Mail, Clock, Sparkles } from 'lucide-react';
import { useWorkspace } from '../../context/WorkspaceContext';

export const ReportsTab: React.FC = () => {
  const { currentWorkspace, currentConnection } = useWorkspace();
  const [reportType, setReportType] = useState<'pdf' | 'csv'>('pdf');
  const [isExporting, setIsExporting] = useState(false);
  const [exportSuccess, setExportSuccess] = useState(false);

  const [includeFollowers, setIncludeFollowers] = useState(true);
  const [includeReach, setIncludeReach] = useState(true);
  const [includeReels, setIncludeReels] = useState(true);
  const [includeContentTable, setIncludeContentTable] = useState(true);

  const handleExport = () => {
    setIsExporting(true);
    setExportSuccess(false);

    setTimeout(() => {
      setIsExporting(false);
      setExportSuccess(true);
      setTimeout(() => setExportSuccess(false), 5000);
    }, 1500);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            Executive Analytics Reports
          </h1>
          <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
            Agency Export Engine
          </span>
        </div>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
          Generate presentation-ready Instagram Evolution reports for clients and internal stakeholders.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Export Configuration Card */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm">
          <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-4">
            Custom Report Builder
          </h3>

          <div className="space-y-5">
            {/* Target Account */}
            <div>
              <label className="text-xs font-medium text-slate-700 dark:text-slate-300 block mb-1.5">
                Target Instagram Profile
              </label>
              <div className="p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-900 dark:text-white">
                  @{currentConnection?.username || 'ajaynxt.creative'}
                </span>
                <span className="text-slate-400">
                  {currentWorkspace.name}
                </span>
              </div>
            </div>

            {/* Format choice */}
            <div>
              <label className="text-xs font-medium text-slate-700 dark:text-slate-300 block mb-1.5">
                Export Format
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setReportType('pdf')}
                  className={`p-3 rounded-lg border text-left text-xs transition ${
                    reportType === 'pdf'
                      ? 'border-brand-600 bg-brand-50/50 dark:bg-brand-950/40 text-brand-600 dark:text-brand-400 font-semibold'
                      : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/40 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  <FileText className="w-4 h-4 mb-1" />
                  PDF Executive Summary
                  <p className="text-[10px] text-slate-400 font-normal mt-0.5">
                    Beautiful branded charts, KPIs and key insights
                  </p>
                </button>
                <button
                  type="button"
                  onClick={() => setReportType('csv')}
                  className={`p-3 rounded-lg border text-left text-xs transition ${
                    reportType === 'csv'
                      ? 'border-brand-600 bg-brand-50/50 dark:bg-brand-950/40 text-brand-600 dark:text-brand-400 font-semibold'
                      : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/40 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  <Download className="w-4 h-4 mb-1" />
                  Raw CSV Data Export
                  <p className="text-[10px] text-slate-400 font-normal mt-0.5">
                    Daily raw rows for Excel, Sheets, or custom BI
                  </p>
                </button>
              </div>
            </div>

            {/* Sections checklist */}
            <div>
              <label className="text-xs font-medium text-slate-700 dark:text-slate-300 block mb-1.5">
                Sections to Include
              </label>
              <div className="space-y-2 text-xs">
                {[
                  { label: 'Followers Growth & Net Gain Evolution', state: includeFollowers, set: setIncludeFollowers },
                  { label: 'Account Reach & Views Trajectory', state: includeReach, set: setIncludeReach },
                  { label: 'Reels & Short-Form Video Metrics', state: includeReels, set: setIncludeReels },
                  { label: 'Top Media Performance Grid with Engagement Rates', state: includeContentTable, set: setIncludeContentTable },
                ].map((item, idx) => (
                  <label key={idx} className="flex items-center gap-2.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={item.state}
                      onChange={e => item.set(e.target.checked)}
                      className="rounded border-slate-300 dark:border-slate-700 text-brand-600 focus:ring-brand-500 w-4 h-4"
                    />
                    <span className="text-slate-700 dark:text-slate-300">{item.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Action */}
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center gap-3">
              <button
                onClick={handleExport}
                disabled={isExporting}
                className="px-4 py-2.5 bg-brand-600 hover:bg-brand-700 disabled:opacity-50 text-white rounded-lg text-xs font-semibold shadow-sm inline-flex items-center gap-2 transition"
              >
                {isExporting ? (
                  <>
                    <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Generating Report...
                  </>
                ) : (
                  <>
                    <Download className="w-3.5 h-3.5" />
                    Download {reportType.toUpperCase()} Report
                  </>
                )}
              </button>

              {exportSuccess && (
                <div className="flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400 font-medium">
                  <CheckCircle2 className="w-4 h-4" />
                  Report downloaded successfully!
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Scheduled Automation Card */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Mail className="w-4 h-4 text-brand-500" />
              <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
                Automated Client Dispatch
              </h3>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
              Schedule white-labeled PDF performance summaries directly to client emails on the 1st of every month.
            </p>

            <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200/60 dark:border-slate-800 space-y-2 text-xs">
              <div className="flex items-center justify-between text-slate-600 dark:text-slate-300">
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  Frequency:
                </span>
                <span className="font-semibold">Monthly (1st at 08:00 AM IST)</span>
              </div>
              <div className="flex items-center justify-between text-slate-600 dark:text-slate-300">
                <span>Recipients:</span>
                <span className="font-semibold">client@company.com</span>
              </div>
              <div className="flex items-center justify-between text-slate-600 dark:text-slate-300">
                <span>Status:</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-semibold">Active Scheduled</span>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800">
            <span className="text-[11px] text-slate-400 block mb-2">
              Available on Pro Agency & Enterprise plans.
            </span>
            <button
              disabled
              className="w-full py-2 bg-slate-100 dark:bg-slate-800 text-slate-400 text-xs font-medium rounded-lg cursor-not-allowed"
            >
              Configured & Active
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
