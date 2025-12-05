import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import Lenis from 'lenis';
import InteractiveGrid from './components/InteractiveGrid';
import Header from './components/Header';
import Footer from './components/Footer';
import CursorSpotlight from './components/CursorSpotlight';
import GrainOverlay from './components/GrainOverlay';
import Preloader from './components/Preloader';
import Home from './pages/Home';
import ProjectPage from './pages/ProjectPage';
import Photography from './pages/Photography';
import './index.css';

function App() {
  const location = useLocation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div className="bg-dark min-h-screen text-white selection:bg-white/20 selection:text-white">
      <AnimatePresence mode="wait">
        {loading && <Preloader onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      <GrainOverlay />
      <CursorSpotlight />

      <div className="fixed inset-0 z-0 pointer-events-none">
        <InteractiveGrid />
      </div>

      <Header />

      <AnimatePresence>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/project/:id" element={<ProjectPage />} />
          <Route path="/photography" element={<Photography />} />
        </Routes>
      </AnimatePresence>

      <Footer />
    </div>
  );
}

export default App;
