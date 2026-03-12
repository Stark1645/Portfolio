import { motion } from 'framer-motion';
import { skillsData } from '../utils/data';

const Skills = () => {
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
    <section id="skills" className="py-24 px-6 relative w-full max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl md:text-5xl font-extrabold text-heading mb-4">
          My <span className="gradient-text">Skills</span>
        </h2>
        <p className="text-secondary max-w-2xl mx-auto">
          Here is a collection of my technical skills and core competencies that I have acquired over my journey as a student and full stack developer.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {Object.entries(skillsData).map(([category, skills], index) => (
          <motion.div
            key={category}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ delay: index * 0.2, duration: 0.6 }}
            className="glass p-8 rounded-2xl hover:border-primary/50 transition-colors"
          >
            <h3 className="text-2xl font-bold text-heading mb-6 tracking-wide border-b border-white/10 pb-3">
              {category}
            </h3>
            
            <motion.div 
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="flex flex-wrap gap-3"
            >
              {skills.map((skill) => (
                <motion.span
                  key={skill}
                  variants={item}
                  whileHover={{ scale: 1.1, backgroundColor: 'var(--color-primary)', color: '#fff' }}
                  className="px-4 py-2 bg-surface text-primary border border-primary/20 rounded-lg text-sm font-semibold cursor-default transition-colors shadow-sm"
                >
                  {skill}
                </motion.span>
              ))}
            </motion.div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
