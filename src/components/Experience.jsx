import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { experienceData } from '../utils/data';
import { 
  Briefcase, 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Maximize2, 
  FileText, 
  Calendar, 
  MapPin 
} from 'lucide-react';

const Experience = () => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedMediaIndex, setSelectedMediaIndex] = useState(null);

  const internshipItem = experienceData.find(item => item.type === 'internship');
  const mediaItems = internshipItem
    ? [
        ...internshipItem.images.map(img => ({
          type: 'image',
          src: img.src,
          title: img.title,
          date: img.date,
          location: img.location
        })),
        ...(internshipItem.certificates || [
          {
            src: internshipItem.certificate,
            title: "Internship Completion Certificate",
            date: "03 Jun 2026",
            location: "Ether Services Office, Coimbatore"
          }
        ]).map(cert => ({
          type: 'certificate',
          src: cert.src,
          title: cert.title,
          date: cert.date,
          location: cert.location
        }))
      ]
    : [];

  const nextImage = (length) => {
    setActiveImageIndex((prev) => (prev + 1) % length);
  };

  const prevImage = (length) => {
    setActiveImageIndex((prev) => (prev - 1 + length) % length);
  };

  const nextMedia = () => {
    if (selectedMediaIndex !== null) {
      setSelectedMediaIndex((prev) => (prev + 1) % mediaItems.length);
    }
  };

  const prevMedia = () => {
    if (selectedMediaIndex !== null) {
      setSelectedMediaIndex((prev) => (prev - 1 + mediaItems.length) % mediaItems.length);
    }
  };

  return (
    <section id="experience" className="py-24 max-w-7xl mx-auto px-6 md:px-12 relative w-full">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl md:text-5xl font-extrabold text-heading mb-4">
          Journey & <span className="gradient-text">Experience</span>
        </h2>
        <p className="text-secondary max-w-2xl mx-auto">
          A combination of my professional training, key roles, and the path I've taken throughout my degree.
        </p>
      </motion.div>

      <div className="space-y-12">
        {experienceData.map((item, index) => {
          if (item.type === 'internship') {
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6 }}
                className="glass flex flex-col lg:flex-row gap-8 p-8 md:p-10 rounded-3xl relative overflow-hidden group hover:border-primary/40 transition-all border border-white/5"
              >
                <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-blue-500 to-purple-500 group-hover:w-4 transition-all" />
                
                {/* Left Content */}
                <div className="lg:w-3/5 space-y-6 flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 bg-primary/20 rounded-2xl flex items-center justify-center text-primary border border-primary/10 shrink-0">
                        <Briefcase size={28} />
                      </div>
                      <div>
                        <span className="text-[10px] uppercase font-black tracking-widest text-primary px-2 py-0.5 bg-primary/10 border border-primary/25 rounded-md">Spotlight Experience</span>
                        <h3 className="text-3xl font-black text-white mt-1 leading-tight">{item.role}</h3>
                        <p className="text-lg font-bold text-primary">{item.company} <span className="text-xs text-secondary font-medium">• Coimbatore, India</span></p>
                      </div>
                    </div>

                    <p className="text-secondary text-sm font-semibold">{item.duration}</p>
                    
                    <p className="text-lg text-secondary leading-relaxed pt-2">
                      {item.description}
                    </p>
                  </div>

                  <div className="pt-6 border-t border-white/5 mt-auto">
                    <div className="flex flex-wrap gap-4">
                      <span className="text-secondary text-xs font-bold uppercase tracking-wider mt-1.5">Skills Gained:</span>
                      <div className="flex flex-wrap gap-2">
                        {item.highlights.map((highlight, hIndex) => (
                          <span 
                            key={hIndex}
                            className="px-3 py-1.5 bg-surface text-primary border border-primary/15 rounded-xl text-xs font-semibold"
                          >
                            {highlight}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Interactive Image Panel - Scrapbook Polaroid Collage */}
                <div className="lg:w-2/5 flex flex-col items-center justify-center relative py-4 select-none">
                  <div className="relative w-full max-w-[360px] h-[430px] mx-auto flex items-center justify-center">
                    
                    {/* Hand-drawn heart doodle background */}
                    <div className="absolute top-[22%] left-[8%] opacity-20 pointer-events-none select-none -rotate-12 text-white">
                      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                      </svg>
                    </div>

                    <div className="absolute bottom-[20%] right-[8%] opacity-15 pointer-events-none select-none rotate-45 text-white">
                      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M12 2v20M2 12h20M12 2a10 10 0 100 20A10 10 0 0012 2z" strokeDasharray="3 3" />
                      </svg>
                    </div>

                    {/* Polaroid Cards Stack */}
                    {item.images && item.images.map((img, idx) => {
                      const layoutClasses = [
                        // Card 0: Top-Left, tilted left
                        "top-2 left-2 -rotate-6 z-10 hover:z-30 hover:scale-105 hover:rotate-0",
                        // Card 1: Top-Right, tilted right (with tape)
                        "top-8 right-2 rotate-3 z-20 hover:z-30 hover:scale-105 hover:rotate-0",
                        // Card 2: Bottom-Left, tilted left
                        "bottom-8 left-4 -rotate-3 z-15 hover:z-30 hover:scale-105 hover:rotate-0",
                        // Card 3: Bottom-Right, tilted right
                        "bottom-2 right-0 rotate-6 z-10 hover:z-30 hover:scale-105 hover:rotate-0"
                      ][idx];

                      const tapeElement = idx === 1 ? (
                        /* Scotch Tape Effect */
                        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 w-14 h-5 bg-white/20 backdrop-blur-[1.5px] border-l border-r border-dashed border-white/10 shadow-sm rotate-6 z-40 select-none pointer-events-none" 
                             style={{
                               backgroundImage: 'linear-gradient(to bottom, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.15) 100%)',
                             }}
                        />
                      ) : null;

                      return (
                        <div
                          key={idx}
                          onClick={() => setSelectedMediaIndex(idx)}
                          className={`absolute ${layoutClasses} w-[165px] bg-[#faf9f5] text-stone-800 p-2.5 pb-5 border border-stone-200 shadow-xl shadow-black/45 transition-all duration-300 cursor-pointer`}
                        >
                          {tapeElement}
                          
                          {/* Inner Photo Border */}
                          <div className="relative w-full aspect-[4/3] bg-stone-900 border border-stone-300 overflow-hidden">
                            <img
                              src={img.src}
                              alt={img.title}
                              className="w-full h-full object-cover brightness-95"
                            />
                            {/* Maximize Icon on hover */}
                            <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                              <Maximize2 size={16} className="text-white" />
                            </div>
                          </div>
                          
                          {/* Polaroid Caption Space */}
                          <div className="mt-2 text-center">
                            <p className="font-serif italic text-[11px] font-semibold text-stone-700 tracking-tight leading-tight select-none">
                              {img.title}
                            </p>
                          </div>
                        </div>
                      );
                    })}

                  </div>

                  {/* View Certificate CTA Button */}
                  {(item.certificate || item.certificates) && (
                    <button
                      onClick={() => setSelectedMediaIndex(item.images ? item.images.length : 0)}
                      className="mt-6 flex items-center gap-2 px-4 py-2.5 bg-primary/10 hover:bg-primary/20 border border-primary/25 hover:border-primary/45 rounded-xl text-xs font-bold text-primary transition-all duration-300 shadow-md shadow-primary/5 hover:scale-[1.03] cursor-pointer"
                    >
                      <FileText size={14} />
                      <span>
                        {item.certificates && item.certificates.length > 1 
                          ? "View Internship Certificates" 
                          : "View Internship Certificate"}
                      </span>
                    </button>
                  )}
                </div>
              </motion.div>
            );
          }

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="glass flex flex-col md:flex-row gap-8 p-8 md:p-12 rounded-3xl relative overflow-hidden group hover:border-primary/30 transition-all"
            >
              <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-primary to-purple-500 group-hover:w-4 transition-all" />
              
              <div className="md:w-1/3 space-y-4">
                <div className="w-16 h-16 bg-primary/20 rounded-2xl flex items-center justify-center text-primary">
                  <Briefcase size={32} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-heading mb-1">{item.role}</h3>
                  <p className="text-primary font-semibold">{item.company}</p>
                  <p className="text-secondary text-sm mt-1">{item.duration}</p>
                </div>
              </div>

              <div className="md:w-2/3 space-y-6">
                <p className="text-lg text-secondary leading-relaxed">
                  {item.description}
                </p>
                
                <div className="flex flex-wrap gap-4 pt-4 border-t border-white/5">
                  <span className="text-secondary text-sm font-bold uppercase tracking-wider">Highlights:</span>
                  <div className="flex flex-wrap gap-3">
                    {item.highlights.map((highlight, hIndex) => (
                      <span 
                        key={hIndex}
                        className="px-3 py-1 bg-surface text-primary border border-primary/10 rounded-full text-xs"
                      >
                        {highlight}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Lightbox Modal for Certificate / Workspace Images */}
      <AnimatePresence>
        {selectedMediaIndex !== null && mediaItems[selectedMediaIndex] && (
          <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 md:p-8">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedMediaIndex(null)}
              className="absolute inset-0 bg-black/95 backdrop-blur-md"
            />
            
            {/* Modal Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative max-w-5xl w-full max-h-[90vh] z-[121] flex flex-col items-center gap-6"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedMediaIndex(null)}
                className="absolute top-[-50px] right-0 md:right-[-10px] md:top-[-50px] p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white hover:scale-115 transition-all cursor-pointer border border-white/5 shadow-lg"
                aria-label="Close Lightbox"
              >
                <X size={24} />
              </button>

              {/* Main Media Display Area */}
              <div className="relative w-full flex items-center justify-center min-h-[300px] md:min-h-[450px]">
                {/* Left navigation arrow */}
                <button
                  onClick={prevMedia}
                  className="absolute left-0 md:left-[-60px] p-3 rounded-full bg-white/5 hover:bg-white/15 text-white hover:scale-110 transition-all border border-white/5 cursor-pointer z-10"
                  aria-label="Previous Media"
                >
                  <ChevronLeft size={24} />
                </button>

                {/* Main Image */}
                <div className="max-w-full max-h-[60vh] rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-[#0d1117]/80 flex justify-center items-center">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={selectedMediaIndex}
                      src={mediaItems[selectedMediaIndex].src}
                      alt={mediaItems[selectedMediaIndex].title}
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      transition={{ duration: 0.25 }}
                      className="w-full h-auto max-h-[60vh] object-contain"
                    />
                  </AnimatePresence>
                </div>

                {/* Right navigation arrow */}
                <button
                  onClick={nextMedia}
                  className="absolute right-0 md:right-[-60px] p-3 rounded-full bg-white/5 hover:bg-white/15 text-white hover:scale-110 transition-all border border-white/5 cursor-pointer z-10"
                  aria-label="Next Media"
                >
                  <ChevronRight size={24} />
                </button>
              </div>

              {/* Text Caption Details */}
              <div className="text-center space-y-2 max-w-2xl px-4 select-none">
                <h4 className="text-lg md:text-xl font-bold text-white tracking-wide">
                  {mediaItems[selectedMediaIndex].title}
                </h4>
                <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-xs text-secondary font-medium">
                  {mediaItems[selectedMediaIndex].date && (
                    <span className="flex items-center gap-1">
                      <Calendar size={12} className="text-primary" /> {mediaItems[selectedMediaIndex].date}
                    </span>
                  )}
                  {mediaItems[selectedMediaIndex].location && (
                    <span className="flex items-center gap-1">
                      <MapPin size={12} className="text-primary" /> {mediaItems[selectedMediaIndex].location}
                    </span>
                  )}
                </div>
              </div>

              {/* Thumbnail Strip at Bottom */}
              <div className="flex flex-wrap items-center justify-center gap-3 max-w-full px-4 overflow-x-auto py-2">
                {mediaItems.map((media, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedMediaIndex(idx)}
                    className={`relative w-16 h-12 md:w-20 md:h-14 rounded-lg overflow-hidden border-2 transition-all duration-300 shrink-0 cursor-pointer ${
                      selectedMediaIndex === idx
                        ? 'border-primary scale-105 shadow-lg shadow-primary/25'
                        : 'border-white/10 opacity-50 hover:opacity-80 hover:border-white/30'
                    }`}
                  >
                    <img
                      src={media.src}
                      alt={media.title}
                      className="w-full h-full object-cover"
                    />
                    {media.type === 'certificate' && (
                      <div className="absolute inset-0 bg-primary/20 flex items-center justify-center text-[10px] font-black text-white uppercase tracking-wider bg-black/40">
                        Cert
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Experience;
