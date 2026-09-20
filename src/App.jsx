import React from 'react';
import { useApp } from './context/AppContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { RewardsModal } from './components/RewardsModal';
import { AiAdvisorPage } from './components/pages/AiAdvisorPage';
import { MapDirectoryPage } from './components/pages/MapDirectoryPage';
import { ImpactLeaderboardPage } from './components/pages/ImpactLeaderboardPage';
import { AdminInsightsPage } from './components/pages/AdminInsightsPage';

export function App() {
  const { activeTab } = useApp();

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-[#070c0a] text-slate-900 dark:text-slate-100 transition-colors duration-300">
      <Header />
      
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="transition-all duration-300">
          {activeTab === 'ai-advisor' && <AiAdvisorPage />}
          {activeTab === 'map-directory' && <MapDirectoryPage />}
          {activeTab === 'impact' && <ImpactLeaderboardPage />}
          {activeTab === 'admin' && <AdminInsightsPage />}
        </div>
      </main>

      <RewardsModal />
      <Footer />
    </div>
  );
}

export default App;
