import React from 'react';
import {
  LayoutDashboard,
  BarChart3,
  Globe2,
  FileText,
  Settings,
  ChevronLeft,
  ChevronRight,
  Compass,
  ShieldAlert
} from 'lucide-react';
import { getPlatformSvg } from '../common/SocialIcons';
import { useAuth } from '../../context/AuthContext';
import { cn } from '../../utils/cn';

export type ActiveTab =
  | 'overview'
  | 'instagram_evolution'
  | 'meta_ads'
  | 'google_analytics'
  | 'platform_reports'
  | 'channel_tiktok'
  | 'channel_gbp'
  | 'channel_youtube'
  | 'channel_linkedin'
  | 'channel_whatsapp'
  | 'channel_google_ads'
  | 'channel_facebook'
  | 'platforms_catalog'
  | 'reports'
  | 'connected_accounts'
  | 'workspace_settings';

interface SidebarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
  onNavigateToAdmin?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
  isCollapsed,
  setIsCollapsed,
  onNavigateToAdmin,
}) => {
  const { user } = useAuth();
  const isSuperAdminOwner = user?.email?.toLowerCase() === 'ajayx3neha@gmail.com';

  const coreMarketingNav = [
    {
      id: 'overview' as ActiveTab,
      label: 'Unified Overview',
      icon: LayoutDashboard,
      badge: 'All-in-1',
    },
    {
      id: 'platform_reports' as ActiveTab,
      label: 'Platform Reports',
      icon: BarChart3,
      badge: '1-by-1',
      badgeColor: 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-400/20',
    },
  ];

  // Dedicated Channel Deep Dives with REAL vector SVG icons!
  const channelReportsNav = [
    {
      id: 'instagram_evolution' as ActiveTab,
      label: 'Instagram Organic',
      platformKey: 'INSTAGRAM',
      badge: 'Metricool v21',
      badgeColor: 'bg-pink-500/10 text-pink-700 dark:text-pink-300 border-pink-400/20',
    },
    {
      id: 'channel_tiktok' as ActiveTab,
      label: 'TikTok Analytics',
      platformKey: 'TIKTOK',
      badge: 'Viral',
    },
    {
      id: 'channel_gbp' as ActiveTab,
      label: 'Google Business Profile',
      platformKey: 'GBP',
      badge: 'Local SEO',
      badgeColor: 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-400/20',
    },
    {
      id: 'channel_youtube' as ActiveTab,
      label: 'YouTube Studio',
      platformKey: 'YOUTUBE',
      badge: 'Video',
      badgeColor: 'bg-red-500/10 text-red-700 dark:text-red-300 border-red-400/20',
    },
    {
      id: 'channel_linkedin' as ActiveTab,
      label: 'LinkedIn Company',
      platformKey: 'LINKEDIN',
      badge: 'B2B',
      badgeColor: 'bg-blue-600/10 text-blue-700 dark:text-blue-300 border-blue-400/20',
    },
    {
      id: 'channel_facebook' as ActiveTab,
      label: 'Facebook Pages',
      platformKey: 'FACEBOOK',
      badge: 'Reach',
    },
    {
      id: 'channel_whatsapp' as ActiveTab,
      label: 'WhatsApp Business',
      platformKey: 'WHATSAPP',
      badge: 'Inquiries',
      badgeColor: 'bg-emerald-600/10 text-emerald-700 dark:text-emerald-300 border-emerald-400/20',
    },
    {
      id: 'channel_google_ads' as ActiveTab,
      label: 'Google Ads',
      platformKey: 'GOOGLEADS',
      badge: 'PMax',
      badgeColor: 'bg-yellow-500/10 text-yellow-700 dark:text-yellow-300 border-yellow-400/20',
    },
    {
      id: 'meta_ads' as ActiveTab,
      label: 'Meta Ads Manager',
      platformKey: 'METAADS',
      badge: 'ROAS',
      badgeColor: 'bg-blue-500/10 text-blue-700 dark:text-blue-300 border-blue-400/20',
    },
    {
      id: 'google_analytics' as ActiveTab,
      label: 'Google Analytics 4',
      platformKey: 'GA4',
      badge: 'Realtime',
      badgeColor: 'bg-amber-500/10 text-amber-700 dark:text-amber-300 border-amber-400/20',
    },
  ];

  const workspaceNavItems = [
    {
      id: 'connected_accounts' as ActiveTab,
      label: 'Connected Accounts',
      platformKey: 'INSTAGRAM',
      badge: 'OAuth 2.0',
    },
    {
      id: 'platforms_catalog' as ActiveTab,
      label: '17 Platforms Hub',
      icon: Compass,
      badge: 'Catalog',
    },
    {
      id: 'reports' as ActiveTab,
      label: 'Executive Reports',
      icon: FileText,
      badge: 'PDF / CSV',
    },
    {
      id: 'workspace_settings' as ActiveTab,
      label: 'Workspace Settings',
      icon: Settings,
    },
  ];

  return (
    <aside
      className={cn(
        "h-screen sticky top-0 z-30 flex flex-col glass-panel transition-all duration-300 selection:bg-maroon-600 selection:text-white",
        isCollapsed ? "w-18" : "w-68"
      )}
    >
      {/* Brand Header */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-[#D9B7C0]/35 dark:border-[#D9B7C0]/15">
        {!isCollapsed && (
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="w-9 h-9 rounded-2xl bg-gradient-to-br from-[#3B0A19] via-[#64152C] to-[#8A304A] flex items-center justify-center text-[#FAF3F5] font-black text-sm shadow-glass-maroon border border-[#D9B7C0]/30 shrink-0">
              A
            </div>
            <div className="flex flex-col truncate">
              <span className="font-extrabold text-sm tracking-tight text-[#25171C] dark:text-[#FAF3F5] truncate">
                AJAYNXT
              </span>
              <span className="text-[9px] font-semibold text-[#8A304A] dark:text-[#D9B7C0] tracking-wider uppercase truncate">
                Marketing Analytics
              </span>
            </div>
          </div>
        )}

        {isCollapsed && (
          <div className="w-9 h-9 mx-auto rounded-2xl bg-gradient-to-br from-[#3B0A19] via-[#64152C] to-[#8A304A] flex items-center justify-center text-[#FAF3F5] font-black text-sm shadow-glass-maroon border border-[#D9B7C0]/30">
            A
          </div>
        )}

        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className={cn(
            "p-1.5 rounded-xl text-slate-400 hover:text-maroon-800 dark:hover:text-maroon-200 hover:bg-maroon-500/10 transition",
            isCollapsed && "hidden"
          )}
          title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
      </div>

      {/* Nav List */}
      <div className="flex-1 overflow-y-auto py-4 px-3 space-y-6">
        {/* Section: Core Marketing */}
        <div>
          {!isCollapsed && (
            <p className="px-3 mb-2 text-[10px] font-bold text-slate-400 dark:text-maroon-300/80 uppercase tracking-wider">
              Marketing Analytics
            </p>
          )}
          <nav className="space-y-1">
            {coreMarketingNav.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  title={isCollapsed ? item.label : undefined}
                  className={cn(
                    "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all group relative",
                    isActive
                      ? "btn-maroon text-[#FAF3F5] shadow-glass-maroon font-bold"
                      : "text-[#25171C]/80 dark:text-[#FAF3F5]/80 hover:bg-white/60 dark:hover:bg-[#200810]/70 hover:text-maroon-700 dark:hover:text-[#FAF3F5]"
                  )}
                >
                  <Icon className={cn("w-4 h-4 shrink-0 transition-colors", isActive ? "text-[#FAF3F5]" : "text-[#8A6570] dark:text-[#D9B7C0] group-hover:text-maroon-600")} />
                  {!isCollapsed && (
                    <span className="flex-1 text-left truncate flex items-center justify-between gap-1.5">
                      <span>{item.label}</span>
                      {item.badge && (
                        <span className={cn("text-[9px] font-bold px-1.5 py-0.5 rounded-md border", isActive ? "bg-white/20 text-white border-white/30" : item.badgeColor || "bg-maroon-500/10 text-maroon-700 dark:text-maroon-300 border-maroon-300/20")}>
                          {item.badge}
                        </span>
                      )}
                    </span>
                  )}
                  {isActive && <span className="absolute left-0 top-2 bottom-2 w-1 bg-white/70 rounded-r-md" />}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Section: Connected Platform Reports (with SVG Icons!) */}
        <div>
          {!isCollapsed && (
            <p className="px-3 mb-2 text-[10px] font-bold text-slate-400 dark:text-maroon-300/80 uppercase tracking-wider flex items-center justify-between">
              <span>Platform Reports (1-by-1)</span>
              <span className="text-[9px] bg-maroon-500/10 text-maroon-700 dark:text-maroon-300 px-1.5 py-0.2 rounded font-bold">Vector SVG</span>
            </p>
          )}
          <nav className="space-y-1">
            {channelReportsNav.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  title={isCollapsed ? item.label : undefined}
                  className={cn(
                    "w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold transition-all group relative",
                    isActive
                      ? "btn-maroon text-[#FAF3F5] shadow-glass-maroon font-bold"
                      : "text-[#25171C]/80 dark:text-[#FAF3F5]/80 hover:bg-white/60 dark:hover:bg-[#200810]/70 hover:text-maroon-700"
                  )}
                >
                  <div className="w-4 h-4 shrink-0 flex items-center justify-center">
                    {getPlatformSvg(item.platformKey, "w-4 h-4")}
                  </div>
                  {!isCollapsed && (
                    <span className="flex-1 text-left truncate flex items-center justify-between gap-1.5">
                      <span className="truncate">{item.label}</span>
                      {item.badge && (
                        <span className={cn("text-[9px] font-bold px-1.5 py-0.5 rounded-md border shrink-0", isActive ? "bg-white/20 text-white border-white/30" : item.badgeColor || "bg-slate-200/50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-300/30")}>
                          {item.badge}
                        </span>
                      )}
                    </span>
                  )}
                  {isActive && <span className="absolute left-0 top-2 bottom-2 w-1 bg-white/70 rounded-r-md" />}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Section: Workspace Operations */}
        <div>
          {!isCollapsed && (
            <p className="px-3 mb-2 text-[10px] font-bold text-slate-400 dark:text-maroon-300/80 uppercase tracking-wider">
              Workspace & Tools
            </p>
          )}
          <nav className="space-y-1">
            {workspaceNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  title={isCollapsed ? item.label : undefined}
                  className={cn(
                    "w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold transition-all group relative",
                    isActive
                      ? "btn-maroon text-[#FAF3F5] shadow-glass-maroon font-bold"
                      : "text-[#25171C]/80 dark:text-[#FAF3F5]/80 hover:bg-white/60 dark:hover:bg-[#200810]/70 hover:text-maroon-700"
                  )}
                >
                  {item.platformKey ? (
                    <div className="w-4 h-4 shrink-0 flex items-center justify-center">
                      {getPlatformSvg(item.platformKey, "w-4 h-4")}
                    </div>
                  ) : Icon ? (
                    <Icon className={cn("w-4 h-4 shrink-0 transition-colors", isActive ? "text-[#FAF3F5]" : "text-[#8A6570] dark:text-[#D9B7C0] group-hover:text-maroon-600")} />
                  ) : null}
                  {!isCollapsed && <span className="flex-1 text-left truncate">{item.label}</span>}
                  {isActive && <span className="absolute left-0 top-2 bottom-2 w-1 bg-white/70 rounded-r-md" />}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Discreet Super Admin link ONLY for ajayx3neha@gmail.com */}
        {isSuperAdminOwner && onNavigateToAdmin && (
          <div className="pt-2 border-t border-[#D9B7C0]/20">
            <button
              onClick={onNavigateToAdmin}
              className="w-full flex items-center gap-2 px-3 py-2 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-800 dark:text-amber-300 border border-amber-500/20 text-[11px] font-bold transition"
            >
              <ShieldAlert className="w-3.5 h-3.5 text-amber-600 shrink-0" />
              {!isCollapsed && <span className="truncate">Open Super Admin Portal</span>}
            </button>
          </div>
        )}
      </div>

      {/* Collapse Toggle Footer */}
      {isCollapsed && (
        <div className="p-3 border-t border-[#D9B7C0]/35 dark:border-[#D9B7C0]/15 flex justify-center">
          <button
            onClick={() => setIsCollapsed(false)}
            className="p-1.5 rounded-xl text-slate-400 hover:text-maroon-700 dark:hover:text-maroon-200 hover:bg-maroon-500/10 transition"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Meta API v21 badge & GCP Status */}
      {!isCollapsed && (
        <div className="p-3 border-t border-[#D9B7C0]/35 dark:border-[#D9B7C0]/15 text-[11px] bg-white/40 dark:bg-[#130308]/60">
          <div className="flex items-center justify-between text-[10px] text-slate-500 dark:text-maroon-300 mb-1.5">
            <span className="font-semibold">Mumbai asia-south1</span>
            <span className="font-mono text-emerald-600 dark:text-emerald-400 font-bold">Cloud Run OK</span>
          </div>
          <div className="w-full bg-[#D9B7C0]/30 dark:bg-maroon-900/50 h-1 rounded-full overflow-hidden">
            <div className="bg-gradient-to-r from-emerald-500 to-maroon-500 h-full w-full"></div>
          </div>
        </div>
      )}
    </aside>
  );
};
