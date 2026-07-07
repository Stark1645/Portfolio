import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { certsData } from '../utils/data';
import { Award, ExternalLink, X, ChevronLeft, ChevronRight, Eye, ShieldCheck } from 'lucide-react';

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
    <section id="certifications" className="py-24 px-16 xl:px-24 relative w-full overflow-hidden">
      {/* Creative Background Elements */}
      <div className="absolute top-1/4 -left-64 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-64 w-96 h-96 bg-cyan-600/10 rounded-full blur-[120px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.6 }}
        className="text-center mb-20 relative z-10"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 text-blue-400 text-sm font-bold mb-6 border border-blue-500/20">
          <ShieldCheck size={16} />
          Verified Credentials
        </div>
        <h2 className="text-4xl md:text-6xl font-extrabold text-heading mb-6 tracking-tight">
          Professional <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Certifications</span>
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto text-lg">
          Validated skills and knowledge through industry-recognized certifications from top organizations.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 relative z-10">
        {certsData.map((cert, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ delay: index * 0.1, duration: 0.7, type: "spring", bounce: 0.4 }}
            onClick={() => setSelectedCertIndex(index)}
            className="group relative h-[280px] rounded-[2rem] overflow-hidden cursor-pointer shadow-2xl bg-[#0d1117] border border-white/5 hover:border-blue-500/40 transition-colors duration-500"
          >
            {/* Background Image - Blurred by default, clear on hover */}
            <div className="absolute inset-0 z-0">
              {cert.image ? (
                <img
                  src={cert.image}
                  alt={cert.title}
                  className="w-full h-full object-cover opacity-40 blur-[4px] scale-110 group-hover:blur-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-700 ease-in-out"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-gray-900 to-blue-950 flex items-center justify-center">
                  <Award size={64} className="text-blue-500/20" />
                </div>
              )}
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/80 to-transparent group-hover:from-black/90 group-hover:via-black/40 group-hover:to-transparent transition-all duration-500" />
            </div>

            {/* Content overlay */}
            <div className="absolute inset-0 z-10 flex flex-col justify-end p-8 transform group-hover:-translate-y-4 transition-transform duration-500">
              <div className="mb-auto self-end opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                <div className="w-12 h-12 rounded-full glass flex items-center justify-center border border-white/20 text-white backdrop-blur-md hover:bg-white hover:text-black transition-colors shadow-lg">
                  <Eye size={20} />
                </div>
              </div>
              
              <p className="text-blue-400 font-bold text-sm tracking-wider uppercase mb-2 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500 delay-100">
                {cert.issuer}
              </p>
              <h3 className="text-2xl font-bold text-white leading-tight mb-2 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500 delay-150 line-clamp-2">
                {cert.title}
              </h3>

              {cert.link && cert.link.startsWith('http') && (
                <div 
                  className="mt-4 flex items-center gap-2 text-xs text-gray-400 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-200 transform translate-y-2 group-hover:translate-y-0"
                  onClick={(e) => e.stopPropagation()}
                >
                  <a 
                    href={cert.link} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/10 transition-colors"
                  >
                    Verify Credential <ExternalLink size={12} />
                  </a>
                </div>
              )}
            </div>
            
            {/* Glowing border effect on hover */}
            <div className="absolute inset-0 border-2 border-transparent group-hover:border-blue-400/30 rounded-[2rem] pointer-events-none transition-colors duration-500" />
          </motion.div>
        ))}
      </div>

      {/* Certification Lightbox */}
      <AnimatePresence>
        {selectedCertIndex !== null && certsData[selectedCertIndex] && (
          <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 md:p-8">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
              animate={{ opacity: 1, backdropFilter: "blur(24px)" }}
              exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
              transition={{ duration: 0.4 }}
              onClick={() => setSelectedCertIndex(null)}
              className="absolute inset-0 bg-black/80"
            />
            
            {/* Modal Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative max-w-5xl w-full max-h-[90vh] z-[151] flex flex-col items-center gap-6"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedCertIndex(null)}
                className="absolute -top-12 right-0 p-3 rounded-full bg-white/10 hover:bg-white hover:text-black text-white transition-all cursor-pointer border border-white/20 shadow-xl"
                aria-label="Close Lightbox"
              >
                <X size={20} />
              </button>

              {/* Main Image Area */}
              <div className="relative w-full flex items-center justify-center min-h-[300px] md:min-h-[500px]">
                {/* Left navigation */}
                <button
                  onClick={(e) => { e.stopPropagation(); prevCert(); }}
                  className="absolute left-[-20px] md:left-[-60px] p-4 rounded-full bg-white/5 hover:bg-white text-white hover:text-black transition-all border border-white/10 cursor-pointer z-20 backdrop-blur-md shadow-2xl transform hover:-translate-x-2"
                  aria-label="Previous Certificate"
                >
                  <ChevronLeft size={24} />
                </button>

                {/* Image Display */}
                <div className="w-full h-full max-h-[75vh] rounded-[2rem] overflow-hidden shadow-[0_0_80px_rgba(0,0,0,0.8)] border border-white/10 bg-[#050505] flex justify-center items-center relative group">
                  <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none" />
                  
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={selectedCertIndex}
                      src={certsData[selectedCertIndex].image}
                      alt={certsData[selectedCertIndex].title}
                      initial={{ opacity: 0, filter: "blur(10px)", scale: 0.95 }}
                      animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
                      exit={{ opacity: 0, filter: "blur(10px)", scale: 1.05 }}
                      transition={{ duration: 0.4 }}
                      className="w-full h-auto max-h-[75vh] object-contain p-4 md:p-8"
                    />
                  </AnimatePresence>
                </div>

                {/* Right navigation */}
                <button
                  onClick={(e) => { e.stopPropagation(); nextCert(); }}
                  className="absolute right-[-20px] md:right-[-60px] p-4 rounded-full bg-white/5 hover:bg-white text-white hover:text-black transition-all border border-white/10 cursor-pointer z-20 backdrop-blur-md shadow-2xl transform hover:translate-x-2"
                  aria-label="Next Certificate"
                >
                  <ChevronRight size={24} />
                </button>
              </div>

              {/* Detail Bar */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="w-full max-w-3xl glass px-8 py-6 rounded-3xl border border-white/10 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6"
              >
                <div>
                  <h4 className="text-xl md:text-2xl font-bold text-white tracking-wide mb-1">
                    {certsData[selectedCertIndex].title}
                  </h4>
                  <p className="text-gray-400 font-medium flex items-center gap-2">
                    <ShieldCheck size={16} className="text-blue-400" />
                    Issued by <span className="text-blue-400">{certsData[selectedCertIndex].issuer}</span>
                  </p>
                </div>
                
                {certsData[selectedCertIndex].link && certsData[selectedCertIndex].link.startsWith('http') && (
                  <a
                    href={certsData[selectedCertIndex].link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition-all transform hover:-translate-y-1 shadow-lg shadow-blue-500/25 whitespace-nowrap"
                  >
                    Verify Credential <ExternalLink size={18} />
                  </a>
                )}
              </motion.div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Certifications;
