import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from 'framer-motion';
import { useEffect } from 'react';

const ProfessionalBackground = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const shouldReduceMotion = useReducedMotion();

  const springConfig = { damping: 30, stiffness: 100, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const glow1X = useTransform(smoothX, [-1, 1], [-20, 20]);
  const glow1Y = useTransform(smoothY, [-1, 1], [-20, 20]);
  const glow2X = useTransform(smoothX, [-1, 1], [30, -30]);
  const glow2Y = useTransform(smoothY, [-1, 1], [30, -30]);

  useEffect(() => {
    if (shouldReduceMotion) return;
    const handleMouseMove = (e) => {
      const normX = (e.clientX / window.innerWidth - 0.5) * 2;
      const normY = (e.clientY / window.innerHeight - 0.5) * 2;
      mouseX.set(normX);
      mouseY.set(normY);
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [shouldReduceMotion, mouseX, mouseY]);

  return (
    <div className="fixed inset-0 -z-50 overflow-hidden pointer-events-none bg-background">
      {/* 1. Subtle Dot Grid Layer */}
      <div 
        className="absolute inset-0 opacity-[0.3] light:opacity-[0.2]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, var(--color-primary) 1px, transparent 0)`,
          backgroundSize: '40px 40px',
          maskImage: 'radial-gradient(ellipse at center, black, transparent 80%)'
        }}
      />

      {/* 2. Animated Aurora Glows (Professional & Slower) */}
      <motion.div
        style={shouldReduceMotion ? {} : { x: glow1X, y: glow1Y }}
        className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-blue-600/15 light:bg-blue-600/10 rounded-full blur-[130px]"
      />
      
      <motion.div
        style={shouldReduceMotion ? {} : { x: glow2X, y: glow2Y }}
        className="absolute bottom-[-10%] right-[-10%] w-[55%] h-[55%] bg-gradient-to-tl from-purple-600/12 via-amber-500/8 to-blue-600/10 rounded-full blur-[140px]"
      />

      {/* 3. Floating "Glass" Orbs */}
      <motion.div
        animate={shouldReduceMotion ? {} : {
          y: [0, -40, 0],
          opacity: [0.1, 0.3, 0.1],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 left-1/3 w-64 h-64 bg-cyan-400/5 rounded-full blur-[80px]"
      />

      {/* 4. The "Scanning" Line (Very subtle) */}
      <motion.div
        animate={shouldReduceMotion ? {} : { top: ['-10%', '110%'] }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        className="absolute left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-blue-500/10 to-transparent z-10"
      />

      {/* 5. Noise/Grain Texture (Gives that premium high-end feel) */}
      <div className="absolute inset-0 opacity-[0.05] light:opacity-[0.03] contrast-150 brightness-100 pointer-events-none" 
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
        }}
      />

      {/* 6. Light Mode Overlay */}
      <div className="absolute inset-0 bg-white/40 hidden light:block pointer-events-none" />
    </div>
  );
};

export default ProfessionalBackground;
