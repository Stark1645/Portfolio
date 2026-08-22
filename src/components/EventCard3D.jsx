import { useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from 'framer-motion';
import { MapPin, Users, User, Camera, Calendar, Maximize2, Sparkles } from 'lucide-react';

const EventCard3D = ({ event, index, onSelect }) => {
  const cardRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();
  const [isHovered, setIsHovered] = useState(false);

  // 3D Tilt Physics using Framer Motion Springs
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const springConfig = { damping: 20, stiffness: 220, mass: 0.15 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const rotateX = useTransform(smoothY, [0, 1], [7, -7]);
  const rotateY = useTransform(smoothX, [0, 1], [-7, 7]);
  const glareX = useTransform(smoothX, [0, 1], ['0%', '100%']);
  const glareY = useTransform(smoothY, [0, 1], ['0%', '100%']);
  const glareBg = useTransform(
    [glareX, glareY],
    ([gx, gy]) =>
      `radial-gradient(circle 280px at ${gx} ${gy}, rgba(255,255,255,0.45), rgba(56,189,248,0.15) 40%, transparent 80%)`
  );

  const handleMouseMove = (e) => {
    if (shouldReduceMotion || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0.5);
    mouseY.set(0.5);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 35, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.92, transition: { duration: 0.25 } }}
      transition={{
        duration: 0.55,
        delay: Math.min(index * 0.08, 0.4),
        ease: [0.22, 1, 0.36, 1],
      }}
      className="perspective-1000 w-full"
      style={{ perspective: 1200 }}
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={() => onSelect && onSelect(event)}
        style={{
          rotateX: shouldReduceMotion ? 0 : rotateX,
          rotateY: shouldReduceMotion ? 0 : rotateY,
          transformStyle: 'preserve-3d',
        }}
        whileHover={{ scale: 1.02, z: 20 }}
        whileTap={{ scale: 0.98 }}
        className="group relative h-[360px] sm:h-[380px] rounded-3xl overflow-hidden glass border border-white/10 hover:border-blue-400/50 shadow-xl hover:shadow-[0_15px_40px_rgba(56,189,248,0.22)] transition-colors duration-500 cursor-pointer flex flex-col justify-end p-6 select-none"
      >
        {/* Dynamic Specular Light Glare follow cursor */}
        {!shouldReduceMotion && (
          <motion.div
            className="absolute inset-0 pointer-events-none z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 mix-blend-overlay rounded-3xl"
            style={{ background: glareBg }}
          />
        )}

        {/* Ambient Gradient Rim Glow */}
        <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-10 bg-gradient-to-tr from-blue-600/15 via-transparent to-purple-600/15" />

        {/* Background Image with Parallax Scale & Shader-like Color Contrast */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img
            src={event.image}
            alt={event.title}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 opacity-70 group-hover:opacity-95 filter group-hover:contrast-105"
            onError={(e) => {
              e.target.src =
                'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=1000';
            }}
          />
          {/* Multi-layered cinematic gradient overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#080d1a] via-[#080d1a]/60 to-transparent z-10" />
          <div className="absolute inset-0 bg-blue-950/20 mix-blend-color group-hover:opacity-0 transition-opacity duration-500 z-10" />
        </div>

        {/* Top Badges: Category Chip & 3D Interactive Camera Button */}
        <div
          className="absolute top-5 left-5 right-5 z-20 flex items-center justify-between pointer-events-none"
          style={{ transform: 'translateZ(25px)' }}
        >
          {event.category && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold tracking-wide uppercase glass border border-blue-400/30 text-blue-300 backdrop-blur-md shadow-sm">
              <Sparkles size={11} className="text-cyan-400" /> {event.category}
            </span>
          )}

          <motion.button
            whileHover={{ scale: 1.15, rotate: 12 }}
            whileTap={{ scale: 0.9 }}
            className="w-9 h-9 rounded-2xl glass border border-white/20 flex items-center justify-center text-white/90 group-hover:text-cyan-300 group-hover:border-cyan-400/50 transition-all duration-300 shadow-md backdrop-blur-md pointer-events-auto"
            title="Expand photo & details"
            onClick={(e) => {
              e.stopPropagation();
              onSelect && onSelect(event);
            }}
          >
            <Maximize2 size={15} />
          </motion.button>
        </div>

        {/* Content Overlay */}
        <div
          className="relative z-20 flex flex-col justify-end transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500"
          style={{ transform: 'translateZ(35px)' }}
        >
          {/* Location & Date */}
          <div className="flex flex-wrap items-center gap-3 text-cyan-400 text-xs font-semibold mb-2">
            <span className="flex items-center gap-1 bg-cyan-500/10 px-2.5 py-0.8 rounded-md border border-cyan-500/20">
              <MapPin size={13} className="text-cyan-400 animate-pulse" /> {event.location}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 group-hover:text-cyan-200 transition-colors drop-shadow-md">
            {event.title}
          </h3>

          {/* Description */}
          <p className="text-gray-300 text-xs sm:text-sm leading-relaxed mb-4 line-clamp-2 group-hover:line-clamp-3 transition-all duration-500 text-shadow-sm">
            {event.description}
          </p>

          {/* Footer Metadata & Action CTA */}
          <div className="flex items-center justify-between pt-2 border-t border-white/10 text-gray-400 text-xs">
            <div className="flex items-center gap-1.5 font-medium">
              {event.tag ? (
                <>
                  <User size={13} className="text-blue-400" />
                  <span className="text-gray-200">{event.tag}</span>
                </>
              ) : (
                <>
                  <Users size={13} className="text-indigo-400" />
                  <span className="text-gray-300">Shared with friends</span>
                </>
              )}
            </div>

            <span className="text-cyan-400 font-semibold group-hover:translate-x-1 transition-transform duration-300 inline-flex items-center gap-1">
              Explore <span className="text-base leading-none">→</span>
            </span>
          </div>
        </div>

        {/* Bottom Shimmer Bar */}
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-center z-30" />
      </motion.div>
    </motion.div>
  );
};

export default EventCard3D;
