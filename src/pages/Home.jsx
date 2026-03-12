import Hero from '../components/Hero';
import About from '../components/About';
import Skills from '../components/Skills';
import Projects from '../components/Projects';
import Experience from '../components/Experience';
import GitHubSection from '../components/GitHubSection';
import Certifications from '../components/Certifications';
import EventsGallery from '../components/EventsGallery';
import Contact from '../components/Contact';
import StatsSection from '../components/StatsSection';
import WhatIDo from '../components/WhatIDo';
import BackToTop from '../components/BackToTop';

const Home = () => {
  return (
    <div className="flex flex-col gap-24 pb-24 overflow-hidden">
      <Hero />
      <StatsSection />
      <About />
      <WhatIDo />
      <Experience />
      <Skills />
      <Projects />
      <Certifications />
      <EventsGallery />
      <GitHubSection />
      <Contact />
      <BackToTop />
    </div>
  );
};

export default Home;
