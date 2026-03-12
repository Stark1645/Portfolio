import Hero from '../components/Hero';
import About from '../components/About';
import Skills from '../components/Skills';
import Projects from '../components/Projects';
import Experience from '../components/Experience';
import GitHubSection from '../components/GitHubSection';
import Certifications from '../components/Certifications';
import EventsGallery from '../components/EventsGallery';
import Contact from '../components/Contact';

const Home = () => {
  return (
    <div className="flex flex-col gap-24 pb-24 overflow-hidden">
      <Hero />
      <About />
      <Experience />
      <Skills />
      <Projects />
      <Certifications />
      <EventsGallery />
      <GitHubSection />
      <Contact />
    </div>
  );
};

export default Home;
