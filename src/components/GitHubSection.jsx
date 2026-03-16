import { motion } from 'framer-motion';
import { Github } from 'lucide-react';

const GitHubSection = () => {
  return (
    <section id="github" className="py-24 px-6 relative w-full max-w-6xl mx-auto flex flex-col items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.6 }}
        className="text-center mb-8"
      >
        <h2 className="text-4xl md:text-5xl font-extrabold text-heading mb-4 flex items-center justify-center gap-4">
          <Github className="text-heading w-10 h-10" /> 
          My <span className="gradient-text">GitHub</span> Profile
        </h2>
        <p className="text-secondary max-w-2xl mx-auto text-lg mt-6">
          Check out my open-source projects, contributions, and the code behind my work on GitHub.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-center mt-6"
      >
        <a 
          href="https://github.com/Stark1645" 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 px-10 py-4 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg transition-transform transform hover:-translate-y-1 shadow-lg shadow-blue-500/30"
        >
          View GitHub Profile <Github size={22} />
        </a>
      </motion.div>
    </section>
  );
};

export default GitHubSection;
