import { motion } from 'framer-motion';

const AuroraBackground = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Primary Aurora Bloom */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          x: [0, 100, 0],
          y: [0, -50, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute -top-[10%] -left-[10%] w-[70%] h-[70%] bg-blue-600/10 dark:bg-blue-600/20 rounded-full blur-[120px] mix-blend-screen"
      />

      {/* Secondary Wavy Aurora */}
      <motion.div
        animate={{
          scale: [1.2, 1, 1.2],
          x: [0, -150, 0],
          y: [0, 100, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute top-[20%] -right-[10%] w-[60%] h-[80%] bg-purple-600/10 dark:bg-purple-600/15 rounded-full blur-[140px] mix-blend-screen"
      />

      {/* Tertiary Greenish Aurora (The North Pole Feel) */}
      <motion.div
        animate={{
          opacity: [0.3, 0.6, 0.3],
          x: [-50, 50, -50],
          rotate: [0, 10, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute bottom-0 left-[20%] w-[100%] h-[40%] bg-emerald-500/5 dark:bg-emerald-500/10 rounded-full blur-[100px] mix-blend-screen"
      />

      {/* Top Polar Glow */}
      <div className="absolute top-0 left-0 right-0 h-[30%] bg-gradient-to-b from-blue-500/5 to-transparent pointer-events-none" />
      
      {/* Light mode specific softening layer */}
      <div className="absolute inset-0 bg-white/40 dark:hidden pointer-events-none" />
    </div>
  );
};

export default AuroraBackground;
