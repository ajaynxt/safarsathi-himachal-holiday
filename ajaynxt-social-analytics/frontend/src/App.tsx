import React, { useState, useEffect } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { WorkspaceProvider } from './context/WorkspaceContext';
import { AppShell } from './components/layout/AppShell';
import { LandingPage } from './components/landing/LandingPage';
import { SuperAdminStandalonePortal } from './components/admin/SuperAdminStandalonePortal';

export const App: React.FC = () => {
  const [showLanding, setShowLanding] = useState<boolean>(false);
  const [currentRoute, setCurrentRoute] = useState<'app' | 'admin' | 'landing'>(() => {
    if (window.location.pathname === '/admin' || window.location.hash.includes('admin')) {
      return 'admin';
    }
    return 'app';
  });

  // Listen to hash / route changes
  useEffect(() => {
    const handleLocationChange = () => {
      if (window.location.pathname === '/admin' || window.location.hash.includes('admin')) {
        setCurrentRoute('admin');
      } else {
        setCurrentRoute('app');
      }
    };

    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('hashchange', handleLocationChange);
    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('hashchange', handleLocationChange);
    };
  }, []);

  const navigateTo = (route: 'app' | 'admin' | 'landing') => {
    setCurrentRoute(route);
    if (route === 'admin') {
      window.location.hash = '#/admin';
    } else {
      window.location.hash = '';
    }
  };

  return (
    <ThemeProvider>
      <AuthProvider>
        <WorkspaceProvider>
          {currentRoute === 'admin' ? (
            <SuperAdminStandalonePortal
              onReturnToCustomerApp={() => navigateTo('app')}
            />
          ) : showLanding || currentRoute === 'landing' ? (
            <LandingPage onEnterApp={() => { setShowLanding(false); navigateTo('app'); }} />
          ) : (
            <AppShell
              onToggleLanding={() => setShowLanding(true)}
              showLanding={showLanding}
              onNavigateToAdmin={() => navigateTo('admin')}
            />
          )}
        </WorkspaceProvider>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
