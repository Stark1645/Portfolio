import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './components/About';
import WhatIDo from './components/WhatIDo';
import Experience from './components/Experience';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Certifications from './components/Certifications';
import EventsGallery from './components/EventsGallery';
import CodingProfiles from './components/CodingProfiles';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Resume from './pages/Resume';
import ScrollProgress from './components/ScrollProgress';
import BackToTop from './components/BackToTop';
import ProfessionalBackground from './components/ProfessionalBackground';
import ScrollToTop from './components/ScrollToTop';
import AnimatedPage from './components/AnimatedPage';
import { SmokeyCursor } from './components/lightswind/smokey-cursor';

function AppContent() {
  const location = useLocation();

  return (
    <div className="relative min-h-screen font-sans selection:bg-blue-500/30 flex flex-col justify-between">
      <ScrollToTop />
      <ProfessionalBackground />
      <SmokeyCursor
        className="fixed inset-0 pointer-events-none z-0 opacity-60"
        simulationResolution={96}
        dyeResolution={512}
        splatRadius={0.18}
        splatForce={4800}
        densityDissipation={3.6}
        velocityDissipation={2.0}
        pressureIterations={12}
        curl={2}
        enableShading={false}
        transparent={true}
      />
      <ScrollProgress />
      <BackToTop />
      <Navbar />
      <main className="flex-grow pt-20">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={
              <AnimatedPage>
                <div className="flex flex-col gap-6 py-6">
                  <About />
                  <WhatIDo />
                </div>
              </AnimatedPage>
            } />
            <Route path="/experience" element={<AnimatedPage><Experience /></AnimatedPage>} />
            <Route path="/skills" element={<AnimatedPage><Skills /></AnimatedPage>} />
            <Route path="/projects" element={<AnimatedPage><Projects /></AnimatedPage>} />
            <Route path="/certifications" element={<AnimatedPage><Certifications /></AnimatedPage>} />
            <Route path="/events" element={<AnimatedPage><EventsGallery /></AnimatedPage>} />
            <Route path="/profiles" element={<AnimatedPage><CodingProfiles /></AnimatedPage>} />
            <Route path="/contact" element={<AnimatedPage><Contact /></AnimatedPage>} />
            <Route path="/resume" element={<AnimatedPage><Resume /></AnimatedPage>} />
          </Routes>
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;

