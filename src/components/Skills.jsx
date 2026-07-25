import { motion } from 'framer-motion';
import InteractiveSkillsGraph from './InteractiveSkillsGraph';

const Skills = () => {
  return (
    <section id="skills" className="py-20 max-w-7xl mx-auto px-6 relative w-full">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-heading mb-4">
          My <span className="gradient-text">Skills</span>
        </h2>
        <p className="text-secondary max-w-2xl mx-auto text-sm sm:text-base">
          An interactive, physics-driven visualization of my technical skills and core competencies across languages, frontend, backend, and tools.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <InteractiveSkillsGraph />
      </motion.div>
    </section>
  );
};

export default Skills;
