import { motion } from 'framer-motion';
import { certsData } from '../utils/data';
import { Award, ExternalLink } from 'lucide-react';

const Certifications = () => {
  return (
    <section id="certifications" className="py-24 px-6 relative w-full max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl md:text-5xl font-extrabold text-heading mb-4">
          Professional <span className="gradient-text">Certifications</span>
        </h2>
        <p className="text-secondary max-w-2xl mx-auto">
          Validated skills and knowledge through industry-recognized certifications from top organizations.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {certsData.map((cert, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            className="glass p-6 rounded-2xl flex items-center gap-6 group hover:border-blue-500/30 transition-all"
          >
            <div className="w-16 h-16 rounded-xl flex items-center justify-center overflow-hidden flex-shrink-0 group-hover:scale-110 transition-all border border-blue-500/20">
              {cert.image ? (
                <img src={cert.image} alt={cert.title} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full bg-blue-500/10 flex items-center justify-center text-blue-400">
                  <Award size={32} />
                </div>
              )}
            </div>
            
            <div className="flex-1">
              <h3 className="text-lg font-bold text-heading mb-1 group-hover:text-primary transition-colors">
                {cert.title}
              </h3>
              <p className="text-secondary text-sm font-medium">{cert.issuer}</p>
            </div>
            
            {cert.link && cert.link !== '#' && (
              <a 
                href={cert.link} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-600 hover:text-blue-400 transition-colors"
                title="View Certificate"
              >
                <ExternalLink size={20} />
              </a>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Certifications;
