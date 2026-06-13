import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useEffect, useState } from 'react';

const ProfessionalBackground = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const { scrollYProgress } = useScroll();
  
  // Smooth mouse movement for parallax
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

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
        animate={{
          x: mousePos.x * 1.5,
          y: mousePos.y * 1.5,
        }}
        className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-blue-600/15 light:bg-blue-600/10 rounded-full blur-[120px]"
      />
      
      <motion.div
        animate={{
          x: -mousePos.x * 2,
          y: -mousePos.y * 2,
        }}
        className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-600/10 dark:bg-purple-600/10 rounded-full blur-[120px]"
      />

      {/* 3. Floating "Glass" Orbs */}
      <motion.div
        animate={{
          y: [0, -40, 0],
          opacity: [0.1, 0.3, 0.1],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 left-1/3 w-64 h-64 bg-cyan-400/5 rounded-full blur-[80px]"
      />

      {/* 4. The "Scanning" Line (Very subtle) */}
      <motion.div
        animate={{ top: ['-10%', '110%'] }}
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
