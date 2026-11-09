import React, { useState } from 'react';
import {
  FileText,
  Download,
  CheckCircle2,
  Calendar,
  Mail,
  Clock,
  Sparkles,
  Layers,
  Activity,
  DollarSign,
  TrendingUp,
  Check
} from 'lucide-react';
import { useWorkspace } from '../../context/WorkspaceContext';

export const MultiChannelReportTab: React.FC = () => {
  const { currentWorkspace } = useWorkspace();
  const [reportFormat, setReportFormat] = useState<'pdf' | 'csv'>('pdf');
  const [dateRange, setDateRange] = useState('30d');
  const [isExporting, setIsExporting] = useState(false);
  const [exportComplete, setExportComplete] = useState(false);

  // Sections checkboxes
  const [includeInstagram, setIncludeInstagram] = useState(true);
  const [includeMetaAds, setIncludeMetaAds] = useState(true);
  const [includeGA4, setIncludeGA4] = useState(true);
  const [includeAttribution, setIncludeAttribution] = useState(true);

  const handleDownload = () => {
    setIsExporting(true);
    setExportComplete(false);
    setTimeout(() => {
      setIsExporting(false);
      setExportComplete(true);
      setTimeout(() => setExportComplete(false), 5000);
    }, 1500);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2.5">
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-[#25171C] dark:text-[#FAF3F5]">
            Unified Marketing Reports
          </h1>
          <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/30">
            Multi-Platform Engine
          </span>
        </div>
        <p className="text-xs sm:text-sm text-[#8A6570] dark:text-[#D9B7C0] mt-1 font-medium">
          Generate client-ready PDF presentations and CSV exports consolidating Meta Ads, Instagram Organic, and Google Analytics 4.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Report Configuration Card */}
        <div className="lg:col-span-2 glass-panel rounded-3xl p-6 sm:p-7 space-y-6 shadow-sm">
          <div>
            <h3 className="text-base font-bold text-[#25171C] dark:text-[#FAF3F5] mb-1">
              Report Parameters
            </h3>
            <p className="text-xs text-[#8A6570] dark:text-[#D9B7C0]">
              Customise the time window and sections to compile in this release.
            </p>
          </div>

          {/* Export Format Selector */}
          <div>
            <label className="block text-xs font-bold text-[#25171C] dark:text-maroon-200 uppercase tracking-wider mb-2">
              Deliverable Format
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setReportFormat('pdf')}
                className={`p-4 rounded-2xl border text-left transition flex items-start gap-3 ${
                  reportFormat === 'pdf'
                    ? 'glass-card border-maroon-600 dark:border-maroon-400 bg-maroon-500/5'
                    : 'glass-card border-[#D9B7C0]/35 text-[#25171C]/70'
                }`}
              >
                <div className="p-2.5 rounded-xl bg-gradient-to-tr from-[#64152C] to-[#8A304A] text-white shrink-0 shadow-sm">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#25171C] dark:text-[#FAF3F5]">
                    Executive PDF Presentation
                  </h4>
                  <p className="text-[11px] text-[#8A6570] dark:text-[#D9B7C0] mt-0.5">
                    High-res charts, KPI summary, and agency branding.
                  </p>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setReportFormat('csv')}
                className={`p-4 rounded-2xl border text-left transition flex items-start gap-3 ${
                  reportFormat === 'csv'
                    ? 'glass-card border-maroon-600 dark:border-maroon-400 bg-maroon-500/5'
                    : 'glass-card border-[#D9B7C0]/35 text-[#25171C]/70'
                }`}
              >
                <div className="p-2.5 rounded-xl bg-emerald-600 text-white shrink-0 shadow-sm">
                  <Layers className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#25171C] dark:text-[#FAF3F5]">
                    Raw Data CSV Export
                  </h4>
                  <p className="text-[11px] text-[#8A6570] dark:text-[#D9B7C0] mt-0.5">
                    Row-by-row daily metrics for Excel or BigQuery.
                  </p>
                </div>
              </button>
            </div>
          </div>

          {/* Channels Selection */}
          <div>
            <label className="block text-xs font-bold text-[#25171C] dark:text-maroon-200 uppercase tracking-wider mb-2">
              Include Channels & Attribution
            </label>
            <div className="space-y-2.5 text-xs">
              {[
                { label: 'Instagram Organic (Followers, Reach, Reels, Stories)', state: includeInstagram, set: setIncludeInstagram },
                { label: 'Meta Marketing Ads (Spend, ROAS, CPC, Purchases)', state: includeMetaAds, set: setIncludeMetaAds },
                { label: 'Google Analytics 4 (Traffic, Engaged Sessions, Conversions)', state: includeGA4, set: setIncludeGA4 },
                { label: 'UTM Campaign Attribution Reconciliation Audit', state: includeAttribution, set: setIncludeAttribution },
              ].map((item, idx) => (
                <label
                  key={idx}
                  onClick={() => item.set(!item.state)}
                  className="flex items-center gap-3 p-3 rounded-xl glass-card border border-[#D9B7C0]/30 cursor-pointer"
                >
                  <div
                    className={`w-4 h-4 rounded-md border flex items-center justify-center transition ${
                      item.state ? 'bg-maroon-600 border-maroon-600 text-white' : 'border-slate-300 dark:border-slate-700'
                    }`}
                  >
                    {item.state && <Check className="w-3 h-3" />}
                  </div>
                  <span className="font-semibold text-[#25171C] dark:text-[#FAF3F5]">
                    {item.label}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Action Trigger */}
          <div className="pt-4 border-t border-[#D9B7C0]/30 dark:border-[#D9B7C0]/15 flex items-center justify-between">
            <span className="text-xs text-slate-400 font-medium">
              Generating report for <strong>{currentWorkspace.name}</strong>
            </span>
            <button
              onClick={handleDownload}
              disabled={isExporting}
              className="px-6 py-2.5 text-xs font-bold btn-maroon rounded-xl flex items-center gap-2 shadow-glass-maroon disabled:opacity-50"
            >
              <Download className="w-4 h-4" />
              <span>{isExporting ? 'Compiling Report...' : `Export ${reportFormat.toUpperCase()} Report`}</span>
            </button>
          </div>

          {exportComplete && (
            <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-800 dark:text-emerald-300 text-xs flex items-center gap-2.5 animate-in fade-in">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>
                Report generated successfully! Download started for <strong>{currentWorkspace.name}_Marketing_Audit.{reportFormat}</strong>
              </span>
            </div>
          )}
        </div>

        {/* Right Column: Scheduled Automated Delivery Card */}
        <div className="glass-panel rounded-3xl p-6 sm:p-7 space-y-5 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Mail className="w-4 h-4 text-maroon-600 dark:text-maroon-400" />
              <h3 className="text-base font-bold text-[#25171C] dark:text-[#FAF3F5]">
                Scheduled Email Dispatch
              </h3>
            </div>
            <p className="text-xs text-[#8A6570] dark:text-[#D9B7C0] leading-relaxed">
              Automatically deliver branded white-label PDF reports to your agency clients or executives every Monday morning at 08:00 AM IST.
            </p>

            <div className="space-y-3 mt-5 text-xs">
              <div className="p-3 rounded-2xl glass-card border border-[#D9B7C0]/30">
                <span className="text-[10px] text-slate-400 font-bold uppercase block mb-1">
                  Recipient List
                </span>
                <p className="font-semibold text-[#25171C] dark:text-[#FAF3F5]">
                  client-team@brand.com, ajay@ajaynxt.com
                </p>
              </div>

              <div className="p-3 rounded-2xl glass-card border border-[#D9B7C0]/30">
                <span className="text-[10px] text-slate-400 font-bold uppercase block mb-1">
                  Frequency & Timing
                </span>
                <p className="font-semibold text-[#25171C] dark:text-[#FAF3F5]">
                  Weekly &bull; Every Monday 08:00 AM IST
                </p>
              </div>
            </div>
          </div>

          <button
            onClick={() => alert("Scheduled weekly client email automated delivery enabled via Google Cloud Scheduler!")}
            className="w-full py-2.5 text-xs font-bold glass-card rounded-xl text-maroon-700 dark:text-maroon-300 hover:text-white hover:bg-maroon-600 transition border border-maroon-300/35"
          >
            Configure Automated Schedule
          </button>
        </div>
      </div>
    </div>
  );
};
