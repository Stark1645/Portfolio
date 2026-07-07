import { useState } from 'react';
import { motion } from 'framer-motion';
import { skillsData } from '../utils/data';
import InteractiveSkillsGraph from './InteractiveSkillsGraph';
import { Grid, Network } from 'lucide-react';

const Skills = () => {
  const [viewMode, setViewMode] = useState('grid');

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const item = {
    hidden: { opacity: 0, scale: 0.8 },
    show: { opacity: 1, scale: 1, transition: { type: 'spring', bounce: 0.4 } }
  };

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
        <p className="text-secondary max-w-2xl mx-auto mb-8 text-sm sm:text-base">
          Here is a collection of my technical skills and core competencies that I have acquired over my journey as a student and full stack developer.
        </p>

        {/* View Mode Toggle */}
        <div className="inline-flex p-1 bg-white/5 border border-white/10 rounded-xl gap-1">
          <button
            onClick={() => setViewMode('grid')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-bold transition-all duration-300 cursor-pointer ${
              viewMode === 'grid'
                ? "bg-blue-600 text-white shadow-md shadow-blue-500/25"
                : "text-secondary hover:text-white"
            }`}
          >
            <Grid size={14} /> Classic Grid
          </button>
          <button
            onClick={() => setViewMode('graph')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-bold transition-all duration-300 cursor-pointer ${
              viewMode === 'graph'
                ? "bg-blue-600 text-white shadow-md shadow-blue-500/25"
                : "text-secondary hover:text-white"
            }`}
          >
            <Network size={14} /> Interactive Physics
          </button>
        </div>
      </motion.div>

      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {Object.entries(skillsData).map(([category, skills], index) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              className="glass p-6 rounded-2xl hover:border-primary/50 transition-colors"
            >
              <h3 className="text-xl font-bold text-heading mb-4 tracking-wide border-b border-white/10 pb-2">
                {category}
              </h3>
              
              <motion.div 
                variants={container}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="flex flex-wrap gap-2.5"
              >
                {skills.map((skill) => (
                  <motion.span
                    key={skill}
                    variants={item}
                    whileHover={{ scale: 1.05, backgroundColor: 'var(--color-primary)', color: '#fff' }}
                    className="px-3 py-1.5 bg-surface text-primary border border-primary/20 rounded-lg text-xs font-semibold cursor-default transition-colors shadow-sm"
                  >
                    {skill}
                  </motion.span>
                ))}
              </motion.div>
            </motion.div>
          ))}
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <InteractiveSkillsGraph />
        </motion.div>
      )}
    </section>
  );
};

export default Skills;
