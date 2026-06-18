import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { certsData } from '../utils/data';
import { Award, ExternalLink, X, ChevronLeft, ChevronRight, Eye } from 'lucide-react';

const Certifications = () => {
  const [selectedCertIndex, setSelectedCertIndex] = useState(null);

  const nextCert = () => {
    if (selectedCertIndex !== null) {
      setSelectedCertIndex((prev) => (prev + 1) % certsData.length);
    }
  };

  const prevCert = () => {
    if (selectedCertIndex !== null) {
      setSelectedCertIndex((prev) => (prev - 1 + certsData.length) % certsData.length);
    }
  };

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
            transition={{ delay: index * 0.05, duration: 0.5 }}
            onClick={() => setSelectedCertIndex(index)}
            className="glass p-6 rounded-2xl flex items-center gap-6 group hover:border-blue-500/30 hover:bg-white/5 transition-all cursor-pointer relative"
          >
            <div className="w-16 h-16 rounded-xl flex items-center justify-center overflow-hidden flex-shrink-0 group-hover:scale-110 transition-all border border-blue-500/20 bg-stone-900/30">
              {cert.image ? (
                <img src={cert.image} alt={cert.title} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full bg-blue-500/10 flex items-center justify-center text-blue-400">
                  <Award size={32} />
                </div>
              )}
            </div>
            
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-bold text-heading mb-1 group-hover:text-primary transition-colors truncate">
                {cert.title}
              </h3>
              <p className="text-secondary text-sm font-medium">{cert.issuer}</p>
              <div className="flex items-center gap-1.5 text-xs text-primary opacity-0 group-hover:opacity-100 transition-opacity mt-1.5 font-semibold">
                <Eye size={12} />
                <span>View Certificate</span>
              </div>
            </div>
            
            {cert.link && cert.link.startsWith('http') && (
              <a 
                href={cert.link} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-stone-400 hover:text-primary transition-colors p-2 hover:bg-white/5 rounded-lg shrink-0"
                title="Verify Credential"
                onClick={(e) => e.stopPropagation()}
              >
                <ExternalLink size={20} />
              </a>
            )}
          </motion.div>
        ))}
      </div>

      {/* Certification Lightbox */}
      <AnimatePresence>
        {selectedCertIndex !== null && certsData[selectedCertIndex] && (
          <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 md:p-8">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedCertIndex(null)}
              className="absolute inset-0 bg-black/95 backdrop-blur-md"
            />
            
            {/* Modal Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative max-w-4xl w-full max-h-[90vh] z-[121] flex flex-col items-center gap-6"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedCertIndex(null)}
                className="absolute top-[-50px] right-0 md:right-[-10px] md:top-[-50px] p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white hover:scale-115 transition-all cursor-pointer border border-white/5 shadow-lg"
                aria-label="Close Lightbox"
              >
                <X size={24} />
              </button>

              {/* Main Image Area */}
              <div className="relative w-full flex items-center justify-center min-h-[200px] md:min-h-[400px]">
                {/* Left navigation arrow */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    prevCert();
                  }}
                  className="absolute left-0 md:left-[-60px] p-3 rounded-full bg-white/5 hover:bg-white/15 text-white hover:scale-110 transition-all border border-white/5 cursor-pointer z-10"
                  aria-label="Previous Certificate"
                >
                  <ChevronLeft size={24} />
                </button>

                {/* Image Display */}
                <div className="max-w-full max-h-[65vh] rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-[#0d1117]/80 flex justify-center items-center">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={selectedCertIndex}
                      src={certsData[selectedCertIndex].image}
                      alt={certsData[selectedCertIndex].title}
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      transition={{ duration: 0.25 }}
                      className="w-full h-auto max-h-[65vh] object-contain"
                    />
                  </AnimatePresence>
                </div>

                {/* Right navigation arrow */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    nextCert();
                  }}
                  className="absolute right-0 md:right-[-60px] p-3 rounded-full bg-white/5 hover:bg-white/15 text-white hover:scale-110 transition-all border border-white/5 cursor-pointer z-10"
                  aria-label="Next Certificate"
                >
                  <ChevronRight size={24} />
                </button>
              </div>

              {/* Certificate Text & Verification Link */}
              <div className="text-center space-y-3 max-w-2xl px-4 select-none">
                <h4 className="text-lg md:text-xl font-bold text-white tracking-wide">
                  {certsData[selectedCertIndex].title}
                </h4>
                <p className="text-sm text-secondary font-medium">
                  Issued by <span className="text-primary font-semibold">{certsData[selectedCertIndex].issuer}</span>
                </p>
                
                {certsData[selectedCertIndex].link && certsData[selectedCertIndex].link.startsWith('http') && (
                  <div className="pt-2">
                    <a
                      href={certsData[selectedCertIndex].link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 hover:bg-primary/20 border border-primary/20 hover:border-primary/40 text-primary text-xs font-bold rounded-xl transition-all hover:scale-[1.02]"
                    >
                      <ExternalLink size={14} />
                      <span>Verify Official Credential</span>
                    </a>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Certifications;
