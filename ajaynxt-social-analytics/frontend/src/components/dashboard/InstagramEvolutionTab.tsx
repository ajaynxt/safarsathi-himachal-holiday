import React, { useState, useMemo } from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import {
  Users,
  UserPlus,
  UserMinus,
  TrendingUp,
  Eye,
  Radio,
  Heart,
  MessageCircle,
  Bookmark,
  Share2,
  Calendar,
  Layers,
  Sparkles,
  Info,
  Clock,
  ArrowRight,
  ExternalLink,
  ChevronDown,
  Film,
  Grid3X3,
  MousePointer,
  MapPin,
  CheckCircle2,
  FileText
} from 'lucide-react';
import { MetricCard } from '../common/MetricCard';
import { InstagramIcon } from '../common/InstagramIcon';
import { useWorkspace } from '../../context/WorkspaceContext';
import { getFilteredMetrics, getMediaItemsForAccount } from '../../data/demoData';
import { formatNumber, formatShortDate, formatFullDate } from '../../utils/formatters';
import { cn } from '../../utils/cn';

export const InstagramEvolutionTab: React.FC = () => {
  const { dateRangePreset, currentConnection, setIsConnectModalOpen } = useWorkspace();
  const days = dateRangePreset === '7d' ? 7 : dateRangePreset === '90d' ? 90 : 30;

  const { dailyData, overview, contentSummary } = useMemo(
    () => getFilteredMetrics(days, currentConnection?.username),
    [days, currentConnection?.username]
  );

  const accountMedia = useMemo(
    () => getMediaItemsForAccount(currentConnection?.username),
    [currentConnection?.username]
  );

  const [activeSubSection, setActiveSubSection] = useState<'community' | 'demographics' | 'profile' | 'posts' | 'reels' | 'stories' | 'best_times'>('community');

  // Demographics mock data (Metricool clone standard)
  const ageData = [
    { range: '18-24', female: 18.4, male: 14.2 },
    { range: '25-34', female: 42.1, male: 36.8 },
    { range: '35-44', female: 24.5, male: 28.3 },
    { range: '45-54', female: 11.2, male: 14.1 },
    { range: '55+', female: 3.8, male: 6.6 },
  ];

  const cityData = [
    { city: 'New Delhi / NCR', percentage: 38.6 },
    { city: 'Mumbai', percentage: 21.2 },
    { city: 'Chandigarh', percentage: 16.8 },
    { city: 'Bengaluru', percentage: 12.5 },
    { city: 'Manali / Kullu', percentage: 8.9 },
  ];

  return (
    <div className="space-y-6">
      {/* Metricool Header Bar */}
      <div className="glass-panel rounded-3xl p-5 sm:p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#64152C] via-[#8A304A] to-amber-500 p-0.5 shadow-md shadow-maroon-600/20 shrink-0">
            <div className="w-full h-full rounded-[14px] overflow-hidden bg-white">
              <img
                src={currentConnection?.profilePictureUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80'}
                alt=""
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-extrabold text-[#25171C] dark:text-[#FAF3F5]">
                @{currentConnection?.username || 'ajaynxt.creative'}
              </h2>
              <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-maroon-500/10 text-maroon-700 dark:text-maroon-300 border border-maroon-300/30">
                Instagram Professional
              </span>
            </div>
            <p className="text-xs text-[#8A6570] dark:text-[#D9B7C0] mt-0.5 font-medium">
              Metricool Blog ID: <code className="font-mono text-maroon-700 dark:text-maroon-300">7417631</code> &bull; User ID: <code className="font-mono text-maroon-700 dark:text-maroon-300">5764153</code> &bull; Meta API: <span className="text-emerald-600 dark:text-emerald-400 font-bold">v21.0 OK</span>
            </p>
          </div>
        </div>

        {/* Section Tabs inside Instagram Evolution */}
        <div className="flex items-center glass-card p-1 rounded-2xl border border-[#D9B7C0]/35 overflow-x-auto text-xs">
          {[
            { id: 'community' as const, label: 'Community' },
            { id: 'demographics' as const, label: 'Demographics' },
            { id: 'profile' as const, label: 'Account / Profile' },
            { id: 'posts' as const, label: 'Posts' },
            { id: 'reels' as const, label: 'Reels' },
            { id: 'stories' as const, label: 'Stories' },
            { id: 'best_times' as const, label: 'Best Hours' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveSubSection(tab.id)}
              className={cn(
                "px-3 py-1.5 rounded-xl whitespace-nowrap transition-all duration-200 font-semibold",
                activeSubSection === tab.id
                  ? "btn-maroon text-white shadow-xs font-bold"
                  : "text-[#25171C]/70 dark:text-[#FAF3F5]/70 hover:text-maroon-700 hover:bg-maroon-500/10"
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* ---------------- Sub-section: Community (Followers Dynamics) ---------------- */}
      {activeSubSection === 'community' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <MetricCard
              title="Total Followers"
              value={formatNumber(overview.totalFollowers)}
              change={overview.followersGrowthRate}
              changeLabel={`net growth in ${days}d`}
              icon={Users}
            />
            <MetricCard
              title="Followers Gained"
              value={`+${formatNumber(overview.followersGained)}`}
              subtitle="Organic new audience"
              icon={UserPlus}
            />
            <MetricCard
              title="Followers Lost"
              value={`-${formatNumber(overview.followersLost)}`}
              subtitle="Audience churn"
              icon={UserMinus}
            />
            <MetricCard
              title="Net Growth Balance"
              value={`+${formatNumber(overview.netFollowerGrowth)}`}
              subtitle={`${((overview.netFollowerGrowth / overview.followersGained) * 100).toFixed(0)}% retention efficiency`}
              icon={TrendingUp}
            />
          </div>

          {/* Metricool Follower Evolution Chart */}
          <div className="glass-panel rounded-3xl p-6 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
              <div>
                <h3 className="text-base font-bold text-[#25171C] dark:text-[#FAF3F5]">
                  Followers Evolution: Cumulative vs Daily Net Gain
                </h3>
                <p className="text-xs text-[#8A6570] dark:text-[#D9B7C0]">
                  Visualizing long-term audience trajectory and day-to-day acceleration
                </p>
              </div>
            </div>

            <div className="h-[340px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={dailyData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="maroonFollowers" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8A304A" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#8A304A" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(217, 183, 192, 0.2)" vertical={false} />
                  <XAxis dataKey="date" tickFormatter={formatShortDate} stroke="#8A6570" fontSize={11} tickLine={false} />
                  <YAxis yAxisId="left" stroke="#8A6570" fontSize={11} tickLine={false} tickFormatter={(val) => formatNumber(val)} domain={['dataMin - 100', 'dataMax + 100']} />
                  <YAxis yAxisId="right" orientation="right" stroke="#8A6570" fontSize={11} tickLine={false} tickFormatter={(v) => `+${v}`} />
                  <Tooltip
                    content={({ active, payload, label }) => {
                      if (active && payload && payload.length) {
                        const d = payload[0].payload;
                        return (
                          <div className="bg-[#1A060E]/90 backdrop-blur-md border border-[#D9B7C0]/30 p-3.5 rounded-2xl shadow-xl text-xs text-white space-y-1">
                            <p className="font-bold text-[#D9B7C0] border-b border-white/10 pb-1">{label}</p>
                            <div className="flex justify-between gap-4"><span className="text-pink-300">Total Followers:</span><span className="font-bold">{formatNumber(d.totalFollowers)}</span></div>
                            <div className="flex justify-between gap-4"><span className="text-emerald-400">Gained:</span><span>+{d.followersGained}</span></div>
                            <div className="flex justify-between gap-4"><span className="text-rose-400">Lost:</span><span>-{d.followersLost}</span></div>
                            <div className="flex justify-between gap-4 pt-1 border-t border-white/10"><span className="text-slate-300 font-semibold">Net:</span><span className="font-bold text-white">+{d.netFollowers}</span></div>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Legend verticalAlign="top" height={36} iconType="circle" wrapperStyle={{ fontSize: '11px' }} />
                  <Area yAxisId="left" type="monotone" dataKey="totalFollowers" name="Total Followers (Cumulative)" stroke="#8A304A" strokeWidth={2.5} fill="url(#maroonFollowers)" />
                  <Bar yAxisId="right" dataKey="netFollowers" name="Daily Net Follower Velocity" fill="#10b981" radius={[4, 4, 0, 0]} maxBarSize={14} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

      {/* ---------------- Sub-section: Demographics ---------------- */}
      {activeSubSection === 'demographics' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="glass-panel rounded-3xl p-6 shadow-sm">
            <h3 className="text-base font-bold text-[#25171C] dark:text-[#FAF3F5] mb-1">
              Followers by Age & Gender
            </h3>
            <p className="text-xs text-[#8A6570] dark:text-[#D9B7C0] mb-4">
              57% Female / 43% Male audience composition
            </p>

            <div className="h-[260px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={ageData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(217, 183, 192, 0.2)" vertical={false} />
                  <XAxis dataKey="range" stroke="#8A6570" fontSize={11} tickLine={false} />
                  <YAxis stroke="#8A6570" fontSize={11} tickLine={false} tickFormatter={(v) => `${v}%`} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'rgba(26, 6, 14, 0.85)',
                      backdropFilter: 'blur(12px)',
                      borderColor: 'rgba(217, 183, 192, 0.3)',
                      borderRadius: '16px',
                      fontSize: '12px',
                      color: '#FAF3F5',
                    }}
                    formatter={(val: any) => [`${val}%`, '']}
                  />
                  <Legend verticalAlign="top" height={36} iconType="circle" wrapperStyle={{ fontSize: '11px' }} />
                  <Bar dataKey="female" name="Female" fill="#8A304A" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="male" name="Male" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="glass-panel rounded-3xl p-6 shadow-sm">
            <h3 className="text-base font-bold text-[#25171C] dark:text-[#FAF3F5] mb-1">
              Top Geographic Cities
            </h3>
            <p className="text-xs text-[#8A6570] dark:text-[#D9B7C0] mb-4">
              Audience location concentration
            </p>

            <div className="space-y-3.5 pt-2 text-xs">
              {cityData.map((c, i) => (
                <div key={i} className="space-y-1.5">
                  <div className="flex justify-between text-[#25171C] dark:text-[#FAF3F5] font-semibold">
                    <span className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-maroon-600 dark:text-maroon-400" />
                      {c.city}
                    </span>
                    <span className="font-bold">{c.percentage}%</span>
                  </div>
                  <div className="w-full bg-[#D9B7C0]/30 dark:bg-maroon-900/50 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-[#64152C] to-[#8A304A] h-full rounded-full"
                      style={{ width: `${c.percentage * 2.5}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ---------------- Sub-section: Account / Profile ---------------- */}
      {activeSubSection === 'profile' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <MetricCard
              title="Account Reach"
              value={formatNumber(overview.accountReach)}
              change={overview.reachChange}
              changeLabel="unique accounts reached"
              icon={Radio}
            />
            <MetricCard
              title="Total Impressions / Views"
              value={formatNumber(overview.views)}
              change={overview.viewsChange}
              changeLabel="total content views"
              icon={Eye}
            />
            <MetricCard
              title="Profile Visits"
              value="18,420"
              change={16.2}
              changeLabel="taps to view profile bio"
              icon={Users}
            />
            <MetricCard
              title="Website Clicks in Bio"
              value="4,920"
              change={22.8}
              changeLabel="link in bio referrals"
              icon={MousePointer}
            />
          </div>

          <div className="glass-panel rounded-3xl p-6 shadow-sm">
            <h3 className="text-base font-bold text-[#25171C] dark:text-[#FAF3F5] mb-4">
              Daily Reach vs Accounts Engaged Trajectory
            </h3>
            <div className="h-[280px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={dailyData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(217, 183, 192, 0.2)" vertical={false} />
                  <XAxis dataKey="date" tickFormatter={formatShortDate} stroke="#8A6570" fontSize={11} tickLine={false} />
                  <YAxis stroke="#8A6570" fontSize={11} tickLine={false} tickFormatter={(v) => formatNumber(v)} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'rgba(26, 6, 14, 0.85)',
                      backdropFilter: 'blur(12px)',
                      borderColor: 'rgba(217, 183, 192, 0.3)',
                      borderRadius: '16px',
                      fontSize: '12px',
                      color: '#FAF3F5',
                    }}
                  />
                  <Legend verticalAlign="top" height={36} iconType="circle" wrapperStyle={{ fontSize: '11px' }} />
                  <Area type="monotone" dataKey="reach" name="Unique Reach" stroke="#64152C" fill="#64152C" fillOpacity={0.2} strokeWidth={2} />
                  <Area type="monotone" dataKey="accountsEngaged" name="Engaged Accounts" stroke="#8A304A" fill="#8A304A" fillOpacity={0.2} strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

      {/* ---------------- Sub-section: Posts Table ---------------- */}
      {activeSubSection === 'posts' && (
        <div className="glass-panel rounded-3xl overflow-hidden shadow-sm">
          <div className="p-5 border-b border-[#D9B7C0]/30 dark:border-[#D9B7C0]/15 flex items-center justify-between">
            <h3 className="text-sm font-bold text-[#25171C] dark:text-[#FAF3F5]">
              Feed Posts & Carousels Performance
            </h3>
            <span className="text-xs text-slate-400">
              {accountMedia.filter((m) => m.mediaType !== 'REEL').length} posts published
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-[#D9B7C0]/30 dark:border-[#D9B7C0]/15 bg-white/40 dark:bg-[#1A050E]/40 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  <th className="py-3 px-4">Post & Caption</th>
                  <th className="py-3 px-3">Date</th>
                  <th className="py-3 px-3 text-right">Reach</th>
                  <th className="py-3 px-3 text-right">Likes</th>
                  <th className="py-3 px-3 text-right">Comments</th>
                  <th className="py-3 px-3 text-right">Saves</th>
                  <th className="py-3 px-3 text-right">Shares</th>
                  <th className="py-3 px-4 text-right">Engagement Rate</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#D9B7C0]/25 dark:divide-[#D9B7C0]/15">
                {accountMedia.filter((m) => m.mediaType !== 'REEL').map((post) => (
                  <tr key={post.id} className="hover:bg-white/50 dark:hover:bg-[#200810]/50 transition-colors">
                    <td className="py-3 px-4 max-w-sm">
                      <div className="flex items-center gap-3">
                        <img
                          src={post.thumbnailUrl}
                          alt=""
                          className="w-12 h-12 rounded-xl object-cover border border-[#D9B7C0]/30 shrink-0"
                        />
                        <span className="font-semibold text-[#25171C] dark:text-[#FAF3F5] line-clamp-2">
                          {post.caption}
                        </span>
                      </div>
                    </td>
                    <td className="py-3 px-3 text-slate-400 whitespace-nowrap">
                      {formatShortDate(post.publishedAt)}
                    </td>
                    <td className="py-3 px-3 text-right font-bold text-[#25171C] dark:text-[#FAF3F5]">
                      {formatNumber(post.reach)}
                    </td>
                    <td className="py-3 px-3 text-right">{formatNumber(post.likes)}</td>
                    <td className="py-3 px-3 text-right">{post.comments}</td>
                    <td className="py-3 px-3 text-right text-amber-600 font-semibold">{post.saves}</td>
                    <td className="py-3 px-3 text-right text-emerald-600 font-semibold">{post.shares}</td>
                    <td className="py-3 px-4 text-right font-bold text-emerald-600 dark:text-emerald-400">
                      {post.engagementRate}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ---------------- Sub-section: Reels Table ---------------- */}
      {activeSubSection === 'reels' && (
        <div className="glass-panel rounded-3xl overflow-hidden shadow-sm">
          <div className="p-5 border-b border-[#D9B7C0]/30 dark:border-[#D9B7C0]/15 flex items-center justify-between">
            <h3 className="text-sm font-bold text-[#25171C] dark:text-[#FAF3F5]">
              Instagram Reels Viral Performance
            </h3>
            <span className="text-xs text-slate-400">
              {accountMedia.filter((m) => m.mediaType === 'REEL').length} reels tracked
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-[#D9B7C0]/30 dark:border-[#D9B7C0]/15 bg-white/40 dark:bg-[#1A050E]/40 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  <th className="py-3 px-4">Reel Video</th>
                  <th className="py-3 px-3">Duration</th>
                  <th className="py-3 px-3 text-right">Video Plays</th>
                  <th className="py-3 px-3 text-right">Reach</th>
                  <th className="py-3 px-3 text-right">Likes</th>
                  <th className="py-3 px-3 text-right">Saves</th>
                  <th className="py-3 px-3 text-right">Shares</th>
                  <th className="py-3 px-4 text-right">ER %</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#D9B7C0]/25 dark:divide-[#D9B7C0]/15">
                {accountMedia.filter((m) => m.mediaType === 'REEL').map((reel) => (
                  <tr key={reel.id} className="hover:bg-white/50 dark:hover:bg-[#200810]/50 transition-colors">
                    <td className="py-3 px-4 max-w-sm">
                      <div className="flex items-center gap-3">
                        <img
                          src={reel.thumbnailUrl}
                          alt=""
                          className="w-10 h-14 rounded-xl object-cover border border-[#D9B7C0]/30 shrink-0"
                        />
                        <span className="font-semibold text-[#25171C] dark:text-[#FAF3F5] line-clamp-2">
                          {reel.caption}
                        </span>
                      </div>
                    </td>
                    <td className="py-3 px-3 font-mono text-slate-400">{reel.durationSeconds}s</td>
                    <td className="py-3 px-3 text-right font-black text-maroon-700 dark:text-maroon-300">
                      {formatNumber(reel.views)}
                    </td>
                    <td className="py-3 px-3 text-right font-semibold">{formatNumber(reel.reach)}</td>
                    <td className="py-3 px-3 text-right">{formatNumber(reel.likes)}</td>
                    <td className="py-3 px-3 text-right text-amber-600 font-semibold">{formatNumber(reel.saves)}</td>
                    <td className="py-3 px-3 text-right text-emerald-600 font-semibold">{formatNumber(reel.shares)}</td>
                    <td className="py-3 px-4 text-right font-bold text-emerald-600 dark:text-emerald-400">
                      {reel.engagementRate}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ---------------- Sub-section: Stories ---------------- */}
      {activeSubSection === 'stories' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {accountMedia.filter((m) => m.mediaType === 'STORY').map((st) => (
            <div key={st.id} className="glass-card rounded-2xl p-4 flex gap-3 text-xs">
              <img src={st.thumbnailUrl} alt="" className="w-16 h-28 rounded-xl object-cover border border-[#D9B7C0]/30 shrink-0" />
              <div className="flex-1 flex flex-col justify-between">
                <span className="font-semibold line-clamp-2 text-[#25171C] dark:text-[#FAF3F5]">{st.caption}</span>
                <div className="space-y-1 text-slate-400 pt-2 border-t border-[#D9B7C0]/25">
                  <div className="flex justify-between"><span>Reach:</span><strong className="text-[#25171C] dark:text-[#FAF3F5]">{formatNumber(st.reach)}</strong></div>
                  <div className="flex justify-between"><span>Views:</span><strong className="text-[#25171C] dark:text-[#FAF3F5]">{formatNumber(st.views)}</strong></div>
                  <div className="flex justify-between"><span>Replies:</span><strong className="text-maroon-600 dark:text-maroon-300 font-bold">{st.comments}</strong></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ---------------- Sub-section: Best Time to Post ---------------- */}
      {activeSubSection === 'best_times' && (
        <div className="glass-panel rounded-3xl p-6 shadow-sm">
          <h3 className="text-base font-bold text-[#25171C] dark:text-[#FAF3F5] mb-1 flex items-center gap-2">
            <Clock className="w-4 h-4 text-maroon-600 dark:text-maroon-300" />
            Best Time to Post (Engagement Heatmap)
          </h3>
          <p className="text-xs text-[#8A6570] dark:text-[#D9B7C0] mb-6">
            Peak user activity hours based on historical interaction density (IST)
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-3 text-center text-xs">
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
              <div key={day} className="p-3.5 rounded-2xl glass-card border border-[#D9B7C0]/35">
                <span className="font-bold text-[#25171C] dark:text-[#FAF3F5] block mb-2">{day}</span>
                <div className="space-y-1.5 text-[11px]">
                  <div className="bg-maroon-500/10 text-maroon-800 dark:text-maroon-200 p-1.5 rounded-lg font-bold border border-maroon-300/20">
                    12:30 PM
                  </div>
                  <div className="bg-purple-500/10 text-purple-800 dark:text-purple-200 p-1.5 rounded-lg font-bold border border-purple-300/20">
                    07:00 PM
                  </div>
                  <div className="bg-indigo-500/10 text-indigo-800 dark:text-indigo-200 p-1.5 rounded-lg font-bold border border-indigo-300/20">
                    09:30 PM
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
