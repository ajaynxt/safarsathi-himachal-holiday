import React, { useState } from 'react';
import { Sidebar, ActiveTab } from './Sidebar';
import { Topbar } from './Topbar';
import { UnifiedOverviewTab } from '../dashboard/UnifiedOverviewTab';
import { InstagramEvolutionTab } from '../dashboard/InstagramEvolutionTab';
import { MetaAdsTab } from '../dashboard/MetaAdsTab';
import { GoogleAnalyticsTab } from '../dashboard/GoogleAnalyticsTab';
import { PlatformCatalogTab } from '../dashboard/PlatformCatalogTab';
import { MultiChannelReportTab } from '../dashboard/MultiChannelReportTab';
import { ConnectedAccountsManagerTab } from '../dashboard/ConnectedAccountsManagerTab';
import { WorkspaceSettingsTab } from '../dashboard/WorkspaceSettingsTab';
import { PlatformChannelReportTab } from '../dashboard/PlatformChannelReportTab';
import { ConnectInstagramModal } from '../common/ConnectInstagramModal';
import { ConnectFacebookModal } from '../common/ConnectFacebookModal';
import { CreateWorkspaceModal } from '../common/CreateWorkspaceModal';
import { AuthModal } from '../common/AuthModal';
import { useWorkspace } from '../../context/WorkspaceContext';

interface AppShellProps {
  onToggleLanding: () => void;
  showLanding: boolean;
  onNavigateToAdmin?: () => void;
}

export const AppShell: React.FC<AppShellProps> = ({
  onToggleLanding,
  showLanding,
  onNavigateToAdmin,
}) => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('overview');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const {
    isConnectModalOpen,
    setIsConnectModalOpen,
    isConnectFacebookModalOpen,
    setIsConnectFacebookModalOpen,
    isCreateWorkspaceModalOpen,
    setIsCreateWorkspaceModalOpen,
  } = useWorkspace();

  const renderActiveView = () => {
    switch (activeTab) {
      case 'overview':
        return <UnifiedOverviewTab />;
      case 'instagram_evolution':
        return <InstagramEvolutionTab />;
      case 'meta_ads':
        return <MetaAdsTab />;
      case 'google_analytics':
        return <GoogleAnalyticsTab />;
      case 'platform_reports':
        return (
          <PlatformChannelReportTab
            onNavigateToTab={(t) => setActiveTab(t as ActiveTab)}
          />
        );
      case 'channel_tiktok':
        return (
          <PlatformChannelReportTab
            initialChannelType="TIKTOK"
            onNavigateToTab={(t) => setActiveTab(t as ActiveTab)}
          />
        );
      case 'channel_gbp':
        return (
          <PlatformChannelReportTab
            initialChannelType="GBP"
            onNavigateToTab={(t) => setActiveTab(t as ActiveTab)}
          />
        );
      case 'channel_youtube':
        return (
          <PlatformChannelReportTab
            initialChannelType="YOUTUBE"
            onNavigateToTab={(t) => setActiveTab(t as ActiveTab)}
          />
        );
      case 'channel_linkedin':
        return (
          <PlatformChannelReportTab
            initialChannelType="LINKEDIN"
            onNavigateToTab={(t) => setActiveTab(t as ActiveTab)}
          />
        );
      case 'channel_facebook':
        return (
          <PlatformChannelReportTab
            initialChannelType="FACEBOOK"
            onNavigateToTab={(t) => setActiveTab(t as ActiveTab)}
          />
        );
      case 'channel_whatsapp':
        return (
          <PlatformChannelReportTab
            initialChannelType="WHATSAPP"
            onNavigateToTab={(t) => setActiveTab(t as ActiveTab)}
          />
        );
      case 'channel_google_ads':
        return (
          <PlatformChannelReportTab
            initialChannelType="GOOGLE_ADS"
            onNavigateToTab={(t) => setActiveTab(t as ActiveTab)}
          />
        );
      case 'platforms_catalog':
        return <PlatformCatalogTab />;
      case 'reports':
        return <MultiChannelReportTab />;
      case 'connected_accounts':
        return (
          <ConnectedAccountsManagerTab
            onNavigateToTab={(t) => setActiveTab(t as ActiveTab)}
          />
        );
      case 'workspace_settings':
        return <WorkspaceSettingsTab />;
      default:
        return <UnifiedOverviewTab />;
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F1F2] dark:bg-[#130308] text-[#25171C] dark:text-[#FAF3F5] flex flex-col selection:bg-maroon-600 selection:text-white relative overflow-x-hidden font-sans">
      {/* Apple Liquid Glass Ambient Lighting Blobs */}
      <div className="fixed top-[-10%] right-[-5%] w-[500px] h-[500px] bg-gradient-to-br from-maroon-500/10 via-maroon-800/5 to-transparent rounded-full blur-3xl pointer-events-none z-0 animate-liquid-glow" />
      <div className="fixed bottom-[-10%] left-[-5%] w-[550px] h-[550px] bg-gradient-to-tr from-maroon-900/10 via-rose-300/10 to-transparent rounded-full blur-3xl pointer-events-none z-0" />

      <div className="flex-1 flex overflow-hidden relative z-10">
        {/* Sidebar */}
        <Sidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          isCollapsed={isSidebarCollapsed}
          setIsCollapsed={setIsSidebarCollapsed}
          onNavigateToAdmin={onNavigateToAdmin}
        />

        {/* Main Content Viewport */}
        <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
          {/* Topbar */}
          <Topbar
            onToggleLanding={onToggleLanding}
            showLanding={showLanding}
            onNavigateToAdmin={onNavigateToAdmin}
          />

          {/* Tab View Container */}
          <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
            {renderActiveView()}
          </main>
        </div>
      </div>

      {/* Global Interactive Modals */}
      <ConnectInstagramModal
        isOpen={isConnectModalOpen}
        onClose={() => setIsConnectModalOpen(false)}
      />
      <ConnectFacebookModal
        isOpen={isConnectFacebookModalOpen}
        onClose={() => setIsConnectFacebookModalOpen(false)}
      />
      <CreateWorkspaceModal
        isOpen={isCreateWorkspaceModalOpen}
        onClose={() => setIsCreateWorkspaceModalOpen(false)}
      />
      <AuthModal />
    </div>
  );
};
