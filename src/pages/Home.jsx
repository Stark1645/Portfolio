import { motion } from 'framer-motion';
import Hero from '../components/Hero';
import About from '../components/About';
import CodingProfiles from '../components/CodingProfiles';
import WhatIDo from '../components/WhatIDo';
import Hero3DCanvas from '../components/Hero3DCanvas';

// Section Transition Wrapper with Subtle Beam Divider & Staggered Reveal
const SectionBlock = ({ children, id, className = '', showDivider = true }) => {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={`relative w-full ${className}`}
    >
      {showDivider && (
        <div className="w-full flex items-center justify-center my-6 sm:my-10 pointer-events-none opacity-40">
          <div className="h-[1px] w-full max-w-4xl bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent" />
        </div>
      )}
      {children}
    </motion.section>
  );
};

const Home = () => {
  return (
    <div className="flex flex-col w-full relative overflow-x-hidden">
      {/* ── Global 3D WebGL Particle Canvas (Runs Seamlessly Across All Sections) ── */}
      <Hero3DCanvas />

      {/* ── 1. Hero Section with 0.0s Convergence & Parallax Exit ── */}
      <Hero />

      {/* ── 2. Seamless Section Flow ── */}
      <div id="about-section" className="relative z-20 flex flex-col gap-6 sm:gap-10 pb-20">
        <SectionBlock id="about-wrapper" showDivider={false}>
          <About />
        </SectionBlock>

        <SectionBlock id="coding-profiles-wrapper">
          <CodingProfiles />
        </SectionBlock>

        <SectionBlock id="what-i-do-wrapper">
          <WhatIDo />
        </SectionBlock>
      </div>
    </div>
  );
};

export default Home;
