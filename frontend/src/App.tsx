import React, { useCallback, useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { PortfolioData } from './types/portfolio';
import {
  fetchPortfolioData,
  getLocalPortfolioState,
} from './services/api';
import { ThreeBackground } from './components/ThreeBackground';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { CustomCursor } from './components/CustomCursor';
import { ScrollProgress } from './components/ScrollProgress';
import { AIChatbotWidget } from './components/AIChatbotWidget';
import { HomePage } from './pages/HomePage';
import { ProjectDetailPage } from './pages/ProjectDetailPage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';
import { NotFoundPage } from './pages/NotFoundPage';

export const App: React.FC = () => {
  const [portfolio, setPortfolio] = useState<PortfolioData>(() =>
    getLocalPortfolioState()
  );
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [sceneMode, setSceneMode] = useState<
    'auto' | 'sphere' | 'lattice' | 'helix' | 'torus'
  >('auto');
  const [assistantOpen, setAssistantOpen] = useState<boolean>(false);
  const [lightMode, setLightMode] = useState<boolean>(false);

  const loadPortfolio = useCallback(async () => {
    const data = await fetchPortfolioData();
    setPortfolio(data);
  }, []);

  useEffect(() => {
    loadPortfolio();
    const handleCustomUpdate = () => {
      setPortfolio(getLocalPortfolioState());
    };
    window.addEventListener('portfolio-data-updated', handleCustomUpdate);
    return () =>
      window.removeEventListener('portfolio-data-updated', handleCustomUpdate);
  }, [loadPortfolio]);

  return (
    <BrowserRouter>
      <div
        className={`min-h-screen relative transition-colors duration-300 ${
          lightMode
            ? 'bg-[#0a0f24] text-slate-100'
            : 'bg-[#05060b] text-slate-100'
        }`}
      >
        <ScrollProgress />
        <CustomCursor />
        <ThreeBackground activeSection={activeSection} sceneMode={sceneMode} />

        <Navbar
          profile={portfolio.profile}
          sceneMode={sceneMode}
          onChangeSceneMode={setSceneMode}
          onOpenAssistant={() => setAssistantOpen(true)}
          lightMode={lightMode}
          onToggleLightMode={() => setLightMode((prev) => !prev)}
        />

        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                portfolio={portfolio}
                onSectionChange={setActiveSection}
                onOpenAssistant={() => setAssistantOpen(true)}
              />
            }
          />
          <Route
            path="/projects/:slug"
            element={<ProjectDetailPage portfolio={portfolio} />}
          />
          <Route
            path="/admin"
            element={
              <AdminDashboardPage
                portfolio={portfolio}
                onRefreshPortfolio={() =>
                  setPortfolio(getLocalPortfolioState())
                }
              />
            }
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>

        <Footer profile={portfolio.profile} />

        <AIChatbotWidget
          portfolio={portfolio}
          isOpen={assistantOpen}
          onToggle={() => setAssistantOpen((prev) => !prev)}
        />
      </div>
    </BrowserRouter>
  );
};

export default App;
