import React, { useState } from 'react';
import {
  DollarSign,
  TrendingUp,
  Eye,
  Radio,
  MousePointer,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  ChevronDown,
  Layers,
  ShoppingBag,
  Target,
  BarChart2,
  Lock,
  IndianRupee
} from 'lucide-react';
import { MetricCard } from '../common/MetricCard';
import {
  DEMO_META_AD_ACCOUNTS,
  DEMO_META_CAMPAIGNS,
  DEMO_META_AD_SETS,
  DEMO_META_ADS
} from '../../data/marketingDemoData';
import { formatNumber } from '../../utils/formatters';
import { cn } from '../../utils/cn';

type MetaAdsFilterRange = 'today' | 'yesterday' | '7d' | '30d' | '90d' | 'custom';
type AdsViewLevel = 'campaigns' | 'adsets' | 'ads';

export const MetaAdsTab: React.FC = () => {
  const [selectedAccountId, setSelectedAccountId] = useState(DEMO_META_AD_ACCOUNTS[0].id);
  const [filterRange, setFilterRange] = useState<MetaAdsFilterRange>('30d');
  const [viewLevel, setViewLevel] = useState<AdsViewLevel>('campaigns');

  const activeAccount = DEMO_META_AD_ACCOUNTS.find((a) => a.id === selectedAccountId) || DEMO_META_AD_ACCOUNTS[0];

  const totalSpend = DEMO_META_CAMPAIGNS.reduce((acc, c) => acc + c.spend, 0);
  const totalImpressions = DEMO_META_CAMPAIGNS.reduce((acc, c) => acc + c.impressions, 0);
  const totalReach = DEMO_META_CAMPAIGNS.reduce((acc, c) => acc + c.reach, 0);
  const totalClicks = DEMO_META_CAMPAIGNS.reduce((acc, c) => acc + c.linkClicks, 0);
  const totalLeads = DEMO_META_CAMPAIGNS.reduce((acc, c) => acc + c.leads, 0);
  const totalPurchases = DEMO_META_CAMPAIGNS.reduce((acc, c) => acc + c.purchases, 0);
  const totalValue = DEMO_META_CAMPAIGNS.reduce((acc, c) => acc + c.conversionValue, 0);
  const avgCtr = (totalClicks / totalImpressions) * 100;
  const avgCpc = totalSpend / totalClicks;
  const avgCpm = (totalSpend / totalImpressions) * 1000;
  const overallRoas = totalValue / totalSpend;

  return (
    <div className="space-y-6">
      {/* Read-Only Safety Notice */}
      <div className="glass-panel rounded-2xl p-4 border border-blue-500/30 flex items-center justify-between gap-3 text-xs bg-blue-500/5">
        <div className="flex items-center gap-2.5 text-blue-900 dark:text-blue-200">
          <Lock className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
          <span>
            <strong>Read-Only Marketing API:</strong> AJAYNXT accesses campaign insights strictly for performance reporting. We never create, edit, publish, or pause your advertisements.
          </span>
        </div>
        <span className="font-mono text-[10px] bg-blue-500/20 text-blue-800 dark:text-blue-200 px-2.5 py-0.5 rounded-full font-bold whitespace-nowrap border border-blue-500/30">
          ads_read scope OK
        </span>
      </div>

      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-[#25171C] dark:text-[#FAF3F5]">
              Meta Ads Performance
            </h1>
            <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-700 dark:text-blue-300 border border-blue-400/30">
              Facebook & Instagram Ads
            </span>
          </div>
          <p className="text-xs sm:text-sm text-[#8A6570] dark:text-[#D9B7C0] mt-1 font-medium">
            Official Meta Marketing API telemetry across campaigns, ad sets, and individual ad creatives.
          </p>
        </div>

        {/* Ad Account Selector & Date Filter */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Ad Account Dropdown */}
          <select
            value={selectedAccountId}
            onChange={(e) => setSelectedAccountId(e.target.value)}
            className="px-3.5 py-1.5 glass-card rounded-xl text-xs font-semibold text-[#25171C] dark:text-[#FAF3F5] border border-[#D9B7C0]/35 focus:outline-none focus:ring-2 focus:ring-maroon-500/20"
          >
            {DEMO_META_AD_ACCOUNTS.map((acc) => (
              <option key={acc.id} value={acc.id} className="bg-white dark:bg-[#1A050E]">
                {acc.name} ({acc.id})
              </option>
            ))}
          </select>

          {/* Date range filter */}
          <div className="flex items-center glass-card p-1 rounded-xl border border-[#D9B7C0]/35 text-xs">
            {(['today', 'yesterday', '7d', '30d', '90d'] as const).map((range) => (
              <button
                key={range}
                onClick={() => setFilterRange(range)}
                className={cn(
                  "px-2.5 py-1 rounded-lg transition font-semibold capitalize",
                  filterRange === range
                    ? "btn-maroon text-white shadow-xs"
                    : "text-[#25171C]/70 dark:text-[#FAF3F5]/70 hover:text-maroon-700"
                )}
              >
                {range === '7d' ? '7D' : range === '30d' ? '30D' : range === '90d' ? '90D' : range}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Primary Ads KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Total Amount Spent"
          value={`₹${formatNumber(totalSpend)}`}
          change={12.4}
          changeLabel="budget utilization"
          icon={IndianRupee}
        />
        <MetricCard
          title="Conversion Value"
          value={`₹${formatNumber(totalValue)}`}
          change={28.6}
          changeLabel={`ROAS: ${overallRoas.toFixed(2)}x`}
          icon={ShoppingBag}
        />
        <MetricCard
          title="Link Clicks & CTR"
          value={formatNumber(totalClicks)}
          subtitle={`Avg. CTR: ${avgCtr.toFixed(2)}%`}
          icon={MousePointer}
        />
        <MetricCard
          title="Avg. Cost Per Click (CPC)"
          value={`₹${avgCpc.toFixed(2)}`}
          subtitle={`CPM: ₹${avgCpm.toFixed(2)}`}
          icon={Target}
        />
      </div>

      {/* Secondary Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 glass-card rounded-2xl p-5 border border-[#D9B7C0]/35 text-xs">
        <div>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Total Paid Reach</span>
          <p className="text-xl font-black text-[#25171C] dark:text-[#FAF3F5] mt-1">{formatNumber(totalReach)}</p>
          <span className="text-[10px] text-slate-400 font-medium">Unique accounts reached</span>
        </div>
        <div>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Total Impressions</span>
          <p className="text-xl font-black text-[#25171C] dark:text-[#FAF3F5] mt-1">{formatNumber(totalImpressions)}</p>
          <span className="text-[10px] text-slate-400 font-medium">Freq: {(totalImpressions / totalReach).toFixed(2)}x</span>
        </div>
        <div>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Inbound Leads</span>
          <p className="text-xl font-black text-maroon-700 dark:text-maroon-300 mt-1">{formatNumber(totalLeads)}</p>
          <span className="text-[10px] text-slate-400 font-medium">Cost/Lead: ₹{(totalSpend / totalLeads).toFixed(2)}</span>
        </div>
        <div>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Purchases Recorded</span>
          <p className="text-xl font-black text-emerald-600 dark:text-emerald-400 mt-1">{formatNumber(totalPurchases)}</p>
          <span className="text-[10px] text-slate-400 font-medium">Cost/Purchase: ₹{(totalSpend / totalPurchases).toFixed(2)}</span>
        </div>
      </div>

      {/* Granular Breakdown Table with Level Selector (Campaigns / Ad Sets / Ads) */}
      <div className="glass-panel rounded-3xl shadow-sm overflow-hidden">
        {/* Table Level Header */}
        <div className="p-5 border-b border-[#D9B7C0]/30 dark:border-[#D9B7C0]/15 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Breakdown Level:
            </span>
            <div className="flex items-center glass-card p-1 rounded-xl border border-[#D9B7C0]/35">
              <button
                onClick={() => setViewLevel('campaigns')}
                className={cn(
                  "px-3 py-1 text-xs font-semibold rounded-lg transition",
                  viewLevel === 'campaigns'
                    ? "btn-maroon text-white shadow-xs font-bold"
                    : "text-[#25171C]/70 dark:text-[#FAF3F5]/70 hover:text-maroon-700"
                )}
              >
                Campaigns ({DEMO_META_CAMPAIGNS.length})
              </button>
              <button
                onClick={() => setViewLevel('adsets')}
                className={cn(
                  "px-3 py-1 text-xs font-semibold rounded-lg transition",
                  viewLevel === 'adsets'
                    ? "btn-maroon text-white shadow-xs font-bold"
                    : "text-[#25171C]/70 dark:text-[#FAF3F5]/70 hover:text-maroon-700"
                )}
              >
                Ad Sets ({DEMO_META_AD_SETS.length})
              </button>
              <button
                onClick={() => setViewLevel('ads')}
                className={cn(
                  "px-3 py-1 text-xs font-semibold rounded-lg transition",
                  viewLevel === 'ads'
                    ? "btn-maroon text-white shadow-xs font-bold"
                    : "text-[#25171C]/70 dark:text-[#FAF3F5]/70 hover:text-maroon-700"
                )}
              >
                Individual Ads ({DEMO_META_ADS.length})
              </button>
            </div>
          </div>
        </div>

        {/* Level 1: Campaigns Table */}
        {viewLevel === 'campaigns' && (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-[#D9B7C0]/30 dark:border-[#D9B7C0]/15 bg-white/40 dark:bg-[#1A050E]/40 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  <th className="py-3 px-4">Status & Campaign</th>
                  <th className="py-3 px-3">Objective</th>
                  <th className="py-3 px-3 text-right">Spend</th>
                  <th className="py-3 px-3 text-right">Impressions</th>
                  <th className="py-3 px-3 text-right">Clicks</th>
                  <th className="py-3 px-3 text-right">CTR</th>
                  <th className="py-3 px-3 text-right">CPC</th>
                  <th className="py-3 px-3 text-right">Leads</th>
                  <th className="py-3 px-3 text-right">Cost/Result</th>
                  <th className="py-3 px-4 text-right">ROAS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#D9B7C0]/25 dark:divide-[#D9B7C0]/15">
                {DEMO_META_CAMPAIGNS.map((cmp) => (
                  <tr key={cmp.id} className="hover:bg-white/50 dark:hover:bg-[#200810]/50 transition-colors">
                    <td className="py-3 px-4 max-w-xs">
                      <div className="flex items-center gap-2">
                        <span
                          className={cn(
                            "w-2 h-2 rounded-full shrink-0",
                            cmp.status === 'ACTIVE' ? "bg-emerald-500 animate-pulse" : "bg-slate-400"
                          )}
                        />
                        <div className="min-w-0">
                          <span className="font-bold text-[#25171C] dark:text-[#FAF3F5] block truncate">
                            {cmp.name}
                          </span>
                          <span className="text-[10px] text-maroon-600 dark:text-maroon-300 font-mono">
                            ID: {cmp.id}
                          </span>
                        </div>
                      </div>
                    </td>

                    <td className="py-3 px-3 whitespace-nowrap">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-maroon-500/10 text-maroon-700 dark:text-maroon-300 border border-maroon-300/30">
                        {cmp.objective.replace('OUTCOME_', '')}
                      </span>
                    </td>

                    <td className="py-3 px-3 text-right font-black text-[#25171C] dark:text-[#FAF3F5]">
                      ₹{formatNumber(cmp.spend)}
                    </td>

                    <td className="py-3 px-3 text-right text-slate-600 dark:text-slate-300">
                      {formatNumber(cmp.impressions)}
                    </td>

                    <td className="py-3 px-3 text-right text-slate-600 dark:text-slate-300">
                      {formatNumber(cmp.linkClicks)}
                    </td>

                    <td className="py-3 px-3 text-right font-semibold text-[#25171C] dark:text-[#FAF3F5]">
                      {cmp.ctr}%
                    </td>

                    <td className="py-3 px-3 text-right text-slate-600 dark:text-slate-300">
                      ₹{cmp.cpc.toFixed(2)}
                    </td>

                    <td className="py-3 px-3 text-right font-bold text-maroon-700 dark:text-maroon-300">
                      {cmp.leads}
                    </td>

                    <td className="py-3 px-3 text-right text-slate-600 dark:text-slate-300">
                      ₹{cmp.costPerResult.toFixed(2)}
                    </td>

                    <td className="py-3 px-4 text-right">
                      <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/30">
                        {cmp.roas}x
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Level 2: Ad Sets */}
        {viewLevel === 'adsets' && (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-[#D9B7C0]/30 dark:border-[#D9B7C0]/15 bg-white/40 dark:bg-[#1A050E]/40 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  <th className="py-3 px-4">Ad Set Name</th>
                  <th className="py-3 px-3 text-right">Spend</th>
                  <th className="py-3 px-3 text-right">Reach</th>
                  <th className="py-3 px-3 text-right">Impressions</th>
                  <th className="py-3 px-3 text-right">Avg CPC</th>
                  <th className="py-3 px-4 text-right">Conversions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#D9B7C0]/25 dark:divide-[#D9B7C0]/15">
                {DEMO_META_AD_SETS.map((adset) => (
                  <tr key={adset.id} className="hover:bg-white/50 dark:hover:bg-[#200810]/50 transition-colors">
                    <td className="py-3 px-4 font-bold text-[#25171C] dark:text-[#FAF3F5]">
                      {adset.name}
                    </td>
                    <td className="py-3 px-3 text-right font-bold">₹{formatNumber(adset.spend)}</td>
                    <td className="py-3 px-3 text-right">{formatNumber(adset.reach)}</td>
                    <td className="py-3 px-3 text-right">{formatNumber(adset.impressions)}</td>
                    <td className="py-3 px-3 text-right">₹{adset.cpc.toFixed(2)}</td>
                    <td className="py-3 px-4 text-right font-bold text-emerald-600 dark:text-emerald-400">
                      {adset.conversions}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Level 3: Individual Ads with creative preview */}
        {viewLevel === 'ads' && (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-[#D9B7C0]/30 dark:border-[#D9B7C0]/15 bg-white/40 dark:bg-[#1A050E]/40 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  <th className="py-3 px-4">Creative & Ad Name</th>
                  <th className="py-3 px-3 text-right">Spend</th>
                  <th className="py-3 px-3 text-right">Link Clicks</th>
                  <th className="py-3 px-3 text-right">CTR</th>
                  <th className="py-3 px-4 text-right">Conversions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#D9B7C0]/25 dark:divide-[#D9B7C0]/15">
                {DEMO_META_ADS.map((ad) => (
                  <tr key={ad.id} className="hover:bg-white/50 dark:hover:bg-[#200810]/50 transition-colors">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={ad.previewUrl}
                          alt=""
                          className="w-10 h-10 rounded-xl object-cover border border-[#D9B7C0]/30 shrink-0"
                        />
                        <span className="font-bold text-[#25171C] dark:text-[#FAF3F5]">
                          {ad.name}
                        </span>
                      </div>
                    </td>
                    <td className="py-3 px-3 text-right font-bold">₹{formatNumber(ad.spend)}</td>
                    <td className="py-3 px-3 text-right">{formatNumber(ad.clicks)}</td>
                    <td className="py-3 px-3 text-right">{ad.ctr}%</td>
                    <td className="py-3 px-4 text-right font-bold text-emerald-600 dark:text-emerald-400">
                      {ad.conversions}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
