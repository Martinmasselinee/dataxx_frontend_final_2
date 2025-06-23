import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import SplashScreen from './pages/SplashScreen';
import SignIn from './pages/SignIn';
import Home from './pages/Home';
import MatchDetails from './pages/MatchDetails';
import PerformanceSegmentation from './pages/PerformanceSegmentation';
import CiblageTransition from './pages/CiblageTransition';
import CiblageAnalyseExterne1 from './pages/CiblageAnalyseExterne1';
import { mockData } from './data/mock_data';
import './App.css'

// Main App Router Component
const AppRouter: React.FC = () => {
  const [showSplashScreen, setShowSplashScreen] = useState(true);
  const [hasShownSplash, setHasShownSplash] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Reset hasShownSplash when we're at the root path (logout case)
    if (location.pathname === '/') {
      setHasShownSplash(false);
    }
  }, [location.pathname]);

  useEffect(() => {
    // Always show splashscreen on app load/refresh, then go to signin
    if (!hasShownSplash) {
      const timer = setTimeout(() => {
        setShowSplashScreen(false);
        setHasShownSplash(true);
        // Always redirect to signin after splashscreen (complete flow)
        navigate(mockData.splashscreen.defaultRoute);
      }, mockData.splashscreen.duration);

      return () => clearTimeout(timer);
    }
  }, [navigate, hasShownSplash]);

  if (showSplashScreen && !hasShownSplash) {
    return <SplashScreen />;
  }

  return (
    <Routes>
      <Route path="/signin" element={<SignIn />} />
      <Route path="/home" element={<Home />} />
      <Route path="/match-details/:id" element={<MatchDetails />} />
      <Route path="/performance-segmentation" element={<PerformanceSegmentation />} />
      <Route path="/ciblage-transition" element={<CiblageTransition />} />
      <Route path="/ciblage-analyse-externe-1" element={<CiblageAnalyseExterne1 />} />
      <Route path="/" element={<SplashScreen />} />
    </Routes>
  );
};

function App() {
  return (
    <div className="App">
      <Router>
        <AppRouter />
      </Router>
    </div>
  );
}

export default App;
