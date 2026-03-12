import { motion } from 'framer-motion';
import { experienceData } from '../utils/data';
import { Briefcase } from 'lucide-react';

const Experience = () => {
  return (
    <section id="experience" className="py-24 px-6 relative w-full max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
          Journey & <span className="gradient-text">Experience</span>
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          A combination of my professional training, key roles, and the path I've taken throughout my degree.
        </p>
      </motion.div>

      <div className="space-y-12">
        {experienceData.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="glass flex flex-col md:flex-row gap-8 p-8 md:p-12 rounded-3xl relative overflow-hidden group hover:border-blue-500/30 transition-all"
          >
            <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-blue-500 to-purple-500 group-hover:w-4 transition-all" />
            
            <div className="md:w-1/3 space-y-4">
              <div className="w-16 h-16 bg-blue-500/20 rounded-2xl flex items-center justify-center text-blue-400">
                <Briefcase size={32} />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white mb-1">{item.role}</h3>
                <p className="text-blue-400 font-semibold">{item.company}</p>
                <p className="text-gray-500 text-sm mt-1">{item.duration}</p>
              </div>
            </div>

            <div className="md:w-2/3 space-y-6">
              <p className="text-lg text-gray-300 leading-relaxed">
                {item.description}
              </p>
              
              <div className="flex flex-wrap gap-4 pt-4 border-t border-gray-800">
                <span className="text-gray-500 text-sm font-bold uppercase tracking-wider">Highlights:</span>
                <div className="flex flex-wrap gap-3">
                  {item.highlights.map((highlight, hIndex) => (
                    <span 
                      key={hIndex}
                      className="px-3 py-1 bg-gray-800/50 text-blue-200 border border-blue-500/10 rounded-full text-xs"
                    >
                      {highlight}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Experience;
