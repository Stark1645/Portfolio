import { motion } from 'framer-motion';
import { Code2, Layout, Server, Database, Wrench, Cpu } from 'lucide-react';
import InteractiveSkillsGraph from './InteractiveSkillsGraph';
import { skillsData } from '../utils/data';

const categoryConfig = {
  Languages: {
    icon: Code2,
    gradient: 'from-blue-500/15 via-blue-500/5 to-transparent',
    borderColor: 'border-blue-500/30 hover:border-blue-500/60',
    badgeBg: 'bg-blue-500/10 text-blue-400 border-blue-500/20 hover:bg-blue-500/20',
    iconColor: 'text-blue-400'
  },
  Frontend: {
    icon: Layout,
    gradient: 'from-rose-500/15 via-rose-500/5 to-transparent',
    borderColor: 'border-rose-500/30 hover:border-rose-500/60',
    badgeBg: 'bg-rose-500/10 text-rose-400 border-rose-500/20 hover:bg-rose-500/20',
    iconColor: 'text-rose-400'
  },
  Backend: {
    icon: Server,
    gradient: 'from-emerald-500/15 via-emerald-500/5 to-transparent',
    borderColor: 'border-emerald-500/30 hover:border-emerald-500/60',
    badgeBg: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20 hover:bg-emerald-500/20',
    iconColor: 'text-emerald-400'
  },
  Database: {
    icon: Database,
    gradient: 'from-amber-500/15 via-amber-500/5 to-transparent',
    borderColor: 'border-amber-500/30 hover:border-amber-500/60',
    badgeBg: 'bg-amber-500/10 text-amber-400 border-amber-500/20 hover:bg-amber-500/20',
    iconColor: 'text-amber-400'
  },
  Tools: {
    icon: Wrench,
    gradient: 'from-purple-500/15 via-purple-500/5 to-transparent',
    borderColor: 'border-purple-500/30 hover:border-purple-500/60',
    badgeBg: 'bg-purple-500/10 text-purple-400 border-purple-500/20 hover:bg-purple-500/20',
    iconColor: 'text-purple-400'
  },
  'Core CS': {
    icon: Cpu,
    gradient: 'from-sky-500/15 via-sky-500/5 to-transparent',
    borderColor: 'border-sky-500/30 hover:border-sky-500/60',
    badgeBg: 'bg-sky-500/10 text-sky-400 border-sky-500/20 hover:bg-sky-500/20',
    iconColor: 'text-sky-400'
  }
};

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
          Technical <span className="gradient-text">Skills</span>
        </h2>
        <p className="text-secondary max-w-2xl mx-auto text-sm sm:text-base">
          An interactive, physics-driven visualization & structured domain breakdown of my core technical competencies across languages, frontend, backend, database, tools, and computer science fundamentals.
        </p>
      </motion.div>

      {/* Physics Graph */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-16"
      >
        <InteractiveSkillsGraph />
      </motion.div>

      {/* Skill Category Cards Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {Object.entries(skillsData).map(([category, skills], index) => {
          const config = categoryConfig[category] || {
            icon: Code2,
            gradient: 'from-gray-500/15 to-transparent',
            borderColor: 'border-white/10 hover:border-white/30',
            badgeBg: 'bg-white/10 text-heading border-white/10',
            iconColor: 'text-primary'
          };
          const IconComponent = config.icon;

          return (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              className={`glass rounded-2xl p-6 border transition-all duration-300 relative overflow-hidden bg-gradient-to-br ${config.gradient} ${config.borderColor} hover:-translate-y-1 shadow-lg`}
            >
              <div className="flex items-center gap-3 mb-5">
                <div className={`p-2.5 rounded-xl bg-white/5 border border-white/10 ${config.iconColor}`}>
                  <IconComponent size={22} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-heading">{category}</h3>
                  <span className="text-xs text-secondary">{skills.length} skills listed</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <span
                    key={skill}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all duration-200 ${config.badgeBg}`}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
};

export default Skills;
