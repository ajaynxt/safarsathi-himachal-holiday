import React, { useState } from 'react';
import {
  Building2,
  ChevronDown,
  RefreshCw,
  Sun,
  Moon,
  Plus,
  LogOut,
  Sparkles,
  Globe,
  SlidersHorizontal,
  Check,
  ShieldAlert,
  User
} from 'lucide-react';
import { InstagramIcon, FacebookIcon } from '../common/SocialIcons';
import { useWorkspace } from '../../context/WorkspaceContext';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { DateRangePicker } from '../common/DateRangePicker';
import { UserRole } from '../../types/auth';
import { cn } from '../../utils/cn';

interface TopbarProps {
  onToggleLanding: () => void;
  showLanding: boolean;
  onNavigateToAdmin?: () => void;
}

export const Topbar: React.FC<TopbarProps> = ({
  onToggleLanding,
  showLanding,
  onNavigateToAdmin,
}) => {
  const {
    workspaces,
    currentWorkspace,
    switchWorkspace,
    currentConnection,
    isSyncing,
    lastSyncedText,
    syncData,
    setIsCreateWorkspaceModalOpen,
    setIsConnectModalOpen,
    setIsConnectFacebookModalOpen,
  } = useWorkspace();

  const { user, isLoggedIn, currentRole, setCurrentRole, logout, setOpenAuthModal } = useAuth();
  const { theme, toggleTheme } = useTheme();

  const [isWorkspaceMenuOpen, setIsWorkspaceMenuOpen] = useState(false);
  const [isRoleMenuOpen, setIsRoleMenuOpen] = useState(false);
  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false);

  const isSuperAdminUser = user?.email?.toLowerCase() === 'ajayx3neha@gmail.com';

  const roles: { id: UserRole; label: string; desc: string }[] = [
    { id: 'workspace_owner', label: 'Workspace Owner', desc: 'Full control over workspace & billing' },
    { id: 'workspace_admin', label: 'Workspace Admin', desc: 'Can manage members & connect channels' },
    { id: 'workspace_member', label: 'Workspace Member', desc: 'Read-only access to analytics & reports' },
  ];

  return (
    <header className="h-16 glass-panel border-b border-[#D9B7C0]/35 dark:border-[#D9B7C0]/15 px-4 sm:px-6 flex items-center justify-between gap-3 sticky top-0 z-20 backdrop-blur-xl">
      {/* Left: Workspace Selector & Channel Status */}
      <div className="flex items-center gap-3">
        {/* Workspace Switcher */}
        <div className="relative">
          <button
            onClick={() => setIsWorkspaceMenuOpen(!isWorkspaceMenuOpen)}
            className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl glass-card border border-[#D9B7C0]/40 dark:border-[#D9B7C0]/20 hover:border-maroon-400 transition text-left"
          >
            <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-[#64152C] to-[#8A304A] text-white flex items-center justify-center font-bold text-xs shadow-sm">
              <Building2 className="w-3.5 h-3.5" />
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-bold text-[#25171C] dark:text-[#FAF3F5] max-w-[140px] sm:max-w-[180px] truncate">
                {currentWorkspace.name}
              </span>
              <span className="text-[10px] text-maroon-600 dark:text-maroon-300 capitalize font-medium">
                {currentWorkspace.plan.replace('_', ' ')} tier
              </span>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 ml-1" />
          </button>

          {isWorkspaceMenuOpen && (
            <>
              <div
                className="fixed inset-0 z-30"
                onClick={() => setIsWorkspaceMenuOpen(false)}
              />
              <div className="absolute left-0 mt-2 w-72 glass-panel rounded-2xl shadow-xl z-40 p-2 animate-in zoom-in-95 duration-150">
                <p className="px-3 py-1.5 text-[10px] font-bold text-slate-400 dark:text-maroon-300 uppercase tracking-wider">
                  Switch Workspace
                </p>
                <div className="space-y-1 my-1">
                  {workspaces.map((ws) => (
                    <button
                      key={ws.workspaceId}
                      onClick={() => {
                        switchWorkspace(ws.workspaceId);
                        setIsWorkspaceMenuOpen(false);
                      }}
                      className={cn(
                        "w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs transition",
                        ws.workspaceId === currentWorkspace.workspaceId
                          ? "btn-maroon text-white font-bold shadow-xs"
                          : "text-[#25171C] dark:text-[#FAF3F5] hover:bg-white/60 dark:hover:bg-[#200810]/70"
                      )}
                    >
                      <span className="truncate">{ws.name}</span>
                      {ws.workspaceId === currentWorkspace.workspaceId && (
                        <Check className="w-3.5 h-3.5 text-white shrink-0" />
                      )}
                    </button>
                  ))}
                </div>

                <div className="pt-2 border-t border-[#D9B7C0]/30 dark:border-[#D9B7C0]/15">
                  <button
                    onClick={() => {
                      setIsWorkspaceMenuOpen(false);
                      setIsCreateWorkspaceModalOpen(true);
                    }}
                    className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-maroon-700 dark:text-maroon-300 hover:bg-maroon-500/10 transition"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Create New Workspace</span>
                  </button>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Quick Connect Buttons (Instagram & Facebook) */}
        <div className="hidden md:flex items-center gap-2">
          {currentConnection && currentConnection.status === 'ACTIVE' ? (
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl glass-card border border-emerald-500/25 dark:border-emerald-500/20 text-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <InstagramIcon className="w-3.5 h-3.5 text-maroon-600 dark:text-maroon-400" />
              <span className="font-semibold text-[#25171C] dark:text-[#FAF3F5] truncate max-w-[120px]">
                @{currentConnection.username}
              </span>
            </div>
          ) : (
            <button
              onClick={() => setIsConnectModalOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-pink-500/10 hover:bg-pink-500/20 text-pink-700 dark:text-pink-300 border border-pink-300/30 text-xs font-bold transition"
            >
              <InstagramIcon className="w-3.5 h-3.5" />
              <span>Connect Instagram</span>
            </button>
          )}

          <button
            onClick={() => setIsConnectFacebookModalOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-500/10 hover:bg-blue-500/20 text-blue-700 dark:text-blue-300 border border-blue-300/30 text-xs font-bold transition"
          >
            <FacebookIcon className="w-3.5 h-3.5" />
            <span>Connect Facebook</span>
          </button>
        </div>
      </div>

      {/* Center/Right: Sync Button, DatePicker, Theme & User */}
      <div className="flex items-center gap-2.5 sm:gap-3">
        {/* Sync Button */}
        <button
          onClick={syncData}
          disabled={isSyncing}
          className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-xl glass-card text-xs font-semibold text-[#25171C] dark:text-[#FAF3F5] hover:text-maroon-700 dark:hover:text-white transition"
          title={`Last synced: ${lastSyncedText}`}
        >
          <RefreshCw className={cn("w-3.5 h-3.5 text-maroon-600 dark:text-maroon-400", isSyncing && "animate-spin")} />
          <span>{isSyncing ? 'Syncing...' : 'Sync'}</span>
        </button>

        {/* Date Range Picker */}
        <DateRangePicker />

        {/* Theme Toggle Button */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-xl glass-card text-slate-500 dark:text-slate-400 hover:text-maroon-600 dark:hover:text-maroon-300 transition"
          title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        >
          {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </button>

        {/* User Account / Profile */}
        {isLoggedIn ? (
          <div className="relative">
            <button
              onClick={() => setIsAccountMenuOpen(!isAccountMenuOpen)}
              className="flex items-center p-0.5 rounded-full border-2 border-maroon-500/30 hover:border-maroon-600 transition"
              title="Account Menu"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#3B0A19] to-[#8A304A] text-white font-bold text-xs flex items-center justify-center overflow-hidden shadow-sm">
                {user?.photoURL ? (
                  <img src={user.photoURL} alt={user.displayName} className="w-full h-full object-cover" />
                ) : (
                  user?.displayName?.charAt(0).toUpperCase() || 'A'
                )}
              </div>
            </button>

            {isAccountMenuOpen && (
              <>
                <div
                  className="fixed inset-0 z-30"
                  onClick={() => setIsAccountMenuOpen(false)}
                />
                <div className="absolute right-0 mt-2 w-64 glass-panel rounded-2xl shadow-xl z-40 p-2 animate-in zoom-in-95 duration-150">
                  <div className="px-3 py-2.5 border-b border-[#D9B7C0]/30 dark:border-[#D9B7C0]/15">
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-xs font-bold text-[#25171C] dark:text-[#FAF3F5] truncate">
                        {user?.displayName || 'User'}
                      </p>
                      {isSuperAdminUser ? (
                        <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-amber-500/10 text-amber-800 dark:text-amber-300 border border-amber-500/20">
                          ROOT OWNER
                        </span>
                      ) : (
                        <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                          Active
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-maroon-600 dark:text-maroon-300 font-medium truncate mt-0.5">
                      {user?.email || 'user@example.com'}
                    </p>
                  </div>

                  <div className="py-1 space-y-1">
                    {/* Standalone Super Admin link ONLY for ajayx3neha@gmail.com */}
                    {isSuperAdminUser && (
                      <button
                        onClick={() => {
                          setIsAccountMenuOpen(false);
                          if (onNavigateToAdmin) {
                            onNavigateToAdmin();
                          } else {
                            window.location.hash = '#/admin';
                          }
                        }}
                        className="w-full flex items-center gap-2 px-3 py-2 text-xs font-bold text-amber-800 dark:text-amber-300 bg-amber-500/10 hover:bg-amber-500/20 rounded-xl text-left transition"
                      >
                        <ShieldAlert className="w-3.5 h-3.5 text-amber-600" />
                        <span>Standalone Super Admin</span>
                      </button>
                    )}

                    <button
                      onClick={() => {
                        setIsAccountMenuOpen(false);
                        setOpenAuthModal(true);
                      }}
                      className="w-full flex items-center gap-2 px-3 py-2 text-xs font-semibold text-[#25171C] dark:text-[#FAF3F5] hover:bg-white/60 dark:hover:bg-[#200810]/70 rounded-xl text-left transition"
                    >
                      <SlidersHorizontal className="w-3.5 h-3.5 text-maroon-500" />
                      Account Settings
                    </button>
                    <button
                      onClick={() => {
                        setIsAccountMenuOpen(false);
                        logout();
                      }}
                      className="w-full flex items-center gap-2 px-3 py-2 text-xs font-semibold text-rose-600 dark:text-rose-400 hover:bg-rose-500/10 rounded-xl text-left transition"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      Sign Out
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        ) : (
          <button
            onClick={() => setOpenAuthModal(true)}
            className="px-3 py-1.5 text-xs font-bold btn-maroon rounded-xl flex items-center gap-1.5 shadow-sm transition active:scale-[0.98]"
          >
            <User className="w-3.5 h-3.5" />
            <span>Sign In</span>
          </button>
        )}
      </div>
    </header>
  );
};
