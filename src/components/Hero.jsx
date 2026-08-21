import { motion, AnimatePresence, useMotionValue, useSpring, useTransform, useReducedMotion } from 'framer-motion';
import { Mail, Download, ArrowRight, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState, useEffect, useRef, useCallback } from 'react';
import ResumeModal from './ResumeModal';
import Hero3DCanvas from './Hero3DCanvas';
import SpatialGlassDeck3D from './SpatialGlassDeck3D';

const roles = [
  'Full-Stack Developer',
  'Java & Spring Boot Engineer',
  'React UI Craftsman',
  'Backend Systems Builder',
];

const techPills = ['Java', 'Spring Boot', 'React', 'MySQL', 'Python', 'Docker'];

// ==========================================
// Magnetic CTA Button Wrapper
// ==========================================
const MagneticButton = ({ children, className = '', maxDistance = 6 }) => {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const shouldReduceMotion = useReducedMotion();

  const springConfig = { stiffness: 260, damping: 18, mass: 0.12 };
  const smoothX = useSpring(x, springConfig);
  const smoothY = useSpring(y, springConfig);

  const handleMouseMove = (e) => {
    if (shouldReduceMotion || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const dx = e.clientX - centerX;
    const dy = e.clientY - centerY;
    const dist = Math.hypot(dx, dy);
    const radius = Math.max(rect.width, rect.height) * 0.85;

    if (dist < radius) {
      const pull = (1 - dist / radius) * maxDistance;
      const angle = Math.atan2(dy, dx);
      x.set(Math.cos(angle) * pull);
      y.set(Math.sin(angle) * pull);
    } else {
      x.set(0);
      y.set(0);
    }
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: smoothX, y: smoothY }}
      whileHover={shouldReduceMotion ? {} : { scale: 1.015, y: -2 }}
      whileTap={shouldReduceMotion ? {} : { scale: 0.98, y: 1 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      className={`inline-block ${className}`}
    >
      {children}
    </motion.div>
  );
};

// ==========================================
// Main Editorial Magazine Hero Component
// ==========================================
const Hero = () => {
  const [roleIndex, setRoleIndex] = useState(0);
  const [resumeOpen, setResumeOpen] = useState(false);
  const heroRef = useRef(null);
  const photoContainerRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();

  // Normalized cursor coordinates (-1 to 1) for subtle hover response
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);

  // Smooth springs for multi-layered mouse parallax
  const springConfig = { damping: 30, stiffness: 100, mass: 0.6 };
  const smoothCursorX = useSpring(cursorX, springConfig);
  const smoothCursorY = useSpring(cursorY, springConfig);

  // Layer Mouse Parallax Transforms
  const textWatermarkX = useTransform(smoothCursorX, [-1, 1], [-25, 25]);
  const textWatermarkY = useTransform(smoothCursorY, [-1, 1], [-15, 15]);

  const photoParallaxX = useTransform(smoothCursorX, [-1, 1], [-14, 14]);
  const photoParallaxY = useTransform(smoothCursorY, [-1, 1], [-10, 10]);
  const rotateX = useTransform(smoothCursorY, [-1, 1], [3, -3]);
  const rotateY = useTransform(smoothCursorX, [-1, 1], [-3, 3]);

  const floatBadgeX = useTransform(smoothCursorX, [-1, 1], [18, -18]);
  const floatBadgeY = useTransform(smoothCursorY, [-1, 1], [12, -12]);

  const ringGlowScale = useTransform(smoothCursorY, [-1, 1], [0.96, 1.06]);
  const ringGlowOpacity = useTransform(smoothCursorX, [-1, 1], [0.45, 0.75]);

  // Handle Hero mouse movement
  const handleMouseMove = useCallback((e) => {
    if (shouldReduceMotion || !heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    const xRel = (e.clientX - rect.left) / rect.width;
    const yRel = (e.clientY - rect.top) / rect.height;

    const normX = (xRel - 0.5) * 2;
    const normY = (yRel - 0.5) * 2;
    cursorX.set(Math.max(-1, Math.min(1, normX)));
    cursorY.set(Math.max(-1, Math.min(1, normY)));
  }, [shouldReduceMotion, cursorX, cursorY]);

  const handleMouseLeave = useCallback(() => {
    cursorX.set(0);
    cursorY.set(0);
  }, [cursorX, cursorY]);

  useEffect(() => {
    const id = setInterval(() => setRoleIndex(i => (i + 1) % roles.length), 2800);
    return () => clearInterval(id);
  }, []);

  return (
    <section
      ref={heroRef}
      id="home"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full min-h-[calc(100vh-5rem)] flex flex-col justify-between overflow-hidden px-4 sm:px-6 lg:px-12 py-4 lg:py-6 select-none"
    >
      {/* ════════════════════════════════════════
          1. 3D WEBGL ASSETS (LIGHTWEIGHT ATMOSPHERIC BACKGROUND)
      ════════════════════════════════════════ */}
      {!shouldReduceMotion && (
        <Hero3DCanvas className="opacity-80 z-0 pointer-events-none" />
      )}

      {/* ════════════════════════════════════════
          2. TOP HEADER METADATA BAR
      ════════════════════════════════════════ */}
      <motion.div
        initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.05, ease: 'easeOut' }}
        className="w-full flex items-center justify-between z-10 border-b border-white/10 pb-3 pt-1"
      >
        {/* Left Subhead */}
        <div className="flex items-center gap-2 font-mono text-xs text-secondary tracking-widest uppercase">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          <span className="text-cyan-400 font-bold">FULL-STACK DEVELOPER</span>
          <span className="text-white/30 hidden sm:inline">•</span>
          <span className="hidden sm:inline text-white/70">BACKEND SYSTEMS ARCHITECT</span>
        </div>

        {/* Right Availability Badge */}
        <div className="flex items-center gap-2 font-mono text-xs tracking-wider">
          <div className="relative flex items-center justify-center w-2.5 h-2.5">
            <span className="w-2 h-2 rounded-full bg-green-400 shadow-[0_0_8px_#4ade80]" />
          </div>
          <span className="text-green-400 font-bold uppercase">AVAILABLE FOR OPPORTUNITIES</span>
          <span className="text-amber-400 font-bold hidden sm:inline">✦</span>
        </div>
      </motion.div>

      {/* ════════════════════════════════════════
          3. MAIN HERO COMPOSITION (Symmetrical 3-Column Grid)
      ════════════════════════════════════════ */}
      <div className="relative w-full flex-1 grid grid-cols-1 lg:grid-cols-12 items-center gap-6 lg:gap-4 my-2 lg:my-0 z-10">

        {/* ── GIANT BACKGROUND WORDMARK ("PORTFOLIO") ── */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0 overflow-hidden">
          <motion.h1
            initial={shouldReduceMotion ? { opacity: 0.14 } : { opacity: 0 }}
            animate={{ opacity: 0.14 }}
            transition={{ duration: 0.6, delay: 0.05, ease: 'easeOut' }}
            style={{
              ...(shouldReduceMotion ? {} : { x: textWatermarkX, y: textWatermarkY }),
              fontFamily: "'Impact', 'Arial Black', sans-serif",
              background: 'linear-gradient(180deg, rgba(255,255,255,0.7) 0%, rgba(56,189,248,0.3) 60%, rgba(13,17,23,0) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
            className="font-black tracking-tighter uppercase text-[clamp(4.5rem,18vw,19rem)] leading-none text-center whitespace-nowrap opacity-[0.14] dark:opacity-[0.12] transition-transform duration-300"
          >
            PORTFOLIO
          </motion.h1>
        </div>

        {/* ── LEFT COLUMN: Typography, Name, Bio, Badges & CTAs ── */}
        <div className="lg:col-span-4 flex flex-col justify-center gap-3.5 z-20 py-4 lg:py-0 order-2 lg:order-1">
          {/* 1. "Hello, I'm" */}
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.08, ease: 'easeOut' }}
            className="font-serif italic text-2xl sm:text-3xl text-cyan-300 flex items-center gap-2"
          >
            <span>Hello, I'm</span>
          </motion.div>

          {/* 2. Name */}
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.18, ease: 'easeOut' }}
            className="flex flex-col tracking-tight leading-[0.88]"
          >
            <span
              className="font-black uppercase text-white tracking-tight"
              style={{
                fontFamily: "'Impact', 'Arial Black', 'Helvetica Neue', sans-serif",
                fontSize: 'clamp(2.6rem, 4.8vw, 5.2rem)',
                letterSpacing: '-0.02em',
                textShadow: '0 4px 20px rgba(0,0,0,0.6)',
              }}
            >
              RUTHRA
            </span>
            <span
              className="font-black uppercase text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-500 tracking-tight"
              style={{
                fontFamily: "'Impact', 'Arial Black', 'Helvetica Neue', sans-serif",
                fontSize: 'clamp(2.6rem, 4.8vw, 5.2rem)',
                letterSpacing: '-0.02em',
                filter: 'drop-shadow(0 0 25px rgba(56,189,248,0.35))',
              }}
            >
              GURUBARAN
            </span>
          </motion.div>

          {/* Role subtitle with Animated Switcher */}
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.24, ease: 'easeOut' }}
            className="flex items-center gap-2 font-mono text-xs sm:text-sm font-bold text-cyan-400 tracking-wider uppercase mt-1"
          >
            <span className="text-secondary">//</span>
            <AnimatePresence mode="wait">
              <motion.span
                key={roleIndex}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
                className="text-cyan-300"
              >
                {roles[roleIndex]}
              </motion.span>
            </AnimatePresence>
          </motion.div>

          {/* 3. Description */}
          <motion.p
            initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.28, ease: 'easeOut' }}
            className="text-secondary text-xs sm:text-sm leading-relaxed max-w-sm"
          >
            I architect and engineer robust full-stack applications with clean code,
            high-throughput Spring Boot REST APIs, and performant React user interfaces.
          </motion.p>

          {/* 4. Technology Badges (small stagger) */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            {techPills.map((t, idx) => (
              <motion.span
                key={t}
                initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.36 + idx * 0.035, ease: 'easeOut' }}
                whileHover={shouldReduceMotion ? {} : {
                  y: -2,
                  borderColor: 'rgba(56, 189, 248, 0.45)',
                  backgroundColor: 'rgba(26, 34, 51, 0.95)',
                  boxShadow: '0 4px 12px rgba(56, 189, 248, 0.15)',
                }}
                className="px-2.5 py-1 rounded-md bg-[#11151c]/90 border border-white/10 text-xs font-mono font-semibold text-white/80 cursor-default transition-colors duration-200"
              >
                {t}
              </motion.span>
            ))}
          </div>

          {/* 5. Buttons */}
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.52, ease: 'easeOut' }}
            className="flex flex-wrap items-center gap-2.5 pt-2"
          >
            <MagneticButton>
              <Link
                to="/projects"
                className="group inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500
                  text-white font-bold px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm
                  shadow-[0_0_20px_rgba(56,189,248,0.35)] hover:shadow-[0_0_25px_rgba(56,189,248,0.55)] transition-all duration-300 border border-cyan-400/30"
              >
                View Projects
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </MagneticButton>

            <MagneticButton>
              <Link
                to="/contact"
                className="group inline-flex items-center gap-2 bg-[#11151c]/90 text-heading font-semibold
                  px-3.5 sm:px-4 py-2.5 rounded-xl text-xs sm:text-sm border border-white/15
                  hover:border-white/30 hover:bg-[#1a2233] transition-all duration-300 shadow-md backdrop-blur-md"
              >
                Contact Me <Mail size={14} className="text-cyan-400" />
              </Link>
            </MagneticButton>

            <MagneticButton>
              <button
                onClick={() => setResumeOpen(true)}
                className="group inline-flex items-center gap-2 bg-[#11151c]/90 text-secondary hover:text-heading font-semibold
                  px-3.5 sm:px-4 py-2.5 rounded-xl text-xs sm:text-sm border border-white/15
                  hover:border-white/30 hover:bg-[#1a2233] hover:text-white transition-all duration-300 shadow-md backdrop-blur-md cursor-pointer"
              >
                Resume <Download size={14} className="group-hover:translate-y-0.5 transition-transform text-amber-400" />
              </button>
            </MagneticButton>
          </motion.div>
        </div>

        {/* ── 6. CENTER COLUMN: Profile (opacity: 0 -> 1, scale: 0.98 -> 1, static & sharp) ── */}
        <div className="lg:col-span-4 flex items-center justify-center relative z-20 py-4 lg:py-0 order-1 lg:order-2 mx-auto w-full">
          <motion.div
            ref={photoContainerRef}
            initial={shouldReduceMotion ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.45, delay: 0.60, ease: 'easeOut' }}
            style={{
              x: shouldReduceMotion ? 0 : photoParallaxX,
              y: shouldReduceMotion ? 0 : photoParallaxY,
              rotateX: shouldReduceMotion ? 0 : rotateX,
              rotateY: shouldReduceMotion ? 0 : rotateY,
              transformPerspective: 1000,
              transformStyle: 'preserve-3d',
            }}
            className="relative flex items-center justify-center will-change-transform"
          >
            {/* Maximized Portrait Studio Framing with Original Siri Ring */}
            <div className="relative w-[300px] h-[370px] sm:w-[370px] sm:h-[450px] md:w-[420px] md:h-[500px] lg:w-[450px] lg:h-[540px] flex items-center justify-center mx-auto">

              {/* 0. Wide Scattered Cosmic Stardust Aura */}
              <div
                style={{
                  background: 'radial-gradient(circle at 50% 50%, rgba(56, 189, 248, 0.35) 0%, rgba(129, 140, 248, 0.22) 32%, rgba(168, 85, 247, 0.18) 50%, rgba(236, 72, 153, 0.1) 68%, transparent 80%)',
                }}
                className="absolute top-[8%] sm:top-[10%] md:top-[11%] lg:top-[12%] left-[53%] -translate-x-1/2 w-[480px] h-[480px] sm:w-[560px] sm:h-[560px] md:w-[640px] md:h-[640px] lg:w-[700px] lg:h-[700px] rounded-full pointer-events-none z-0 blur-[75px] opacity-85"
              />

              {/* 1. Ambient Pulsing Neon Glow (Scattered Diffusion) */}
              <div
                style={{
                  background: 'conic-gradient(from 180deg at 50% 50%, #00f0ff 0%, #38bdf8 20%, #818cf8 40%, #a855f7 60%, #ec4899 80%, #00f0ff 100%)',
                }}
                className="absolute top-[10%] sm:top-[12%] md:top-[13%] lg:top-[14%] left-[53%] -translate-x-1/2 w-[390px] h-[390px] sm:w-[460px] sm:h-[460px] md:w-[530px] md:h-[530px] lg:w-[590px] lg:h-[590px] rounded-full pointer-events-none z-0 blur-[50px] opacity-85"
              />

              {/* 2. Full Multi-Hue Neon Ring */}
              <div
                className="absolute top-[14%] sm:top-[16%] md:top-[17%] lg:top-[18%] left-[53%] -translate-x-1/2 w-[325px] h-[325px] sm:w-[390px] sm:h-[390px] md:w-[455px] md:h-[455px] lg:w-[510px] lg:h-[510px] rounded-full pointer-events-none z-0"
                style={{
                  background: 'conic-gradient(from 0deg, #00f0ff 0%, #38bdf8 18%, #818cf8 38%, #a855f7 58%, #ec4899 78%, #00f0ff 100%)',
                  padding: '4px',
                  boxShadow: '0 0 60px rgba(56, 189, 248, 0.55), 0 0 45px rgba(168, 85, 247, 0.4), inset 0 0 35px rgba(56, 189, 248, 0.35)',
                }}
              >
                <div
                  className="w-full h-full rounded-full"
                  style={{
                    background: 'radial-gradient(circle at 50% 35%, rgba(56, 189, 248, 0.4) 0%, rgba(129, 140, 248, 0.28) 28%, rgba(168, 85, 247, 0.16) 52%, rgba(13, 17, 23, 0.94) 75%, #090d14 100%)',
                  }}
                />
              </div>

              {/* 3. Maximized Silhouette Portrait (Strictly sharp & stable) */}
              <div className="relative z-10 w-full h-full flex items-end justify-center pointer-events-none select-none overflow-visible mx-auto">
                <img
                  src="/hero-portrait.png"
                  alt="Ruthragurubaran"
                  className="w-auto h-[125%] sm:h-[128%] md:h-[131%] lg:h-[133%] max-w-none object-contain scale-[1.10] sm:scale-[1.14] md:scale-[1.18] lg:scale-[1.20] translate-y-1 mx-auto"
                  style={{
                    filter: 'drop-shadow(0 0 35px rgba(56,189,248,0.3)) drop-shadow(0 20px 40px rgba(0,0,0,0.8))',
                    maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 70%, rgba(0,0,0,0.8) 78%, rgba(0,0,0,0.4) 86%, rgba(0,0,0,0) 96%)',
                    WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 70%, rgba(0,0,0,0.8) 78%, rgba(0,0,0,0.4) 86%, rgba(0,0,0,0) 96%)',
                  }}
                  onError={e => {
                    e.target.src = '/profile.png';
                  }}
                />
              </div>

            </div>
          </motion.div>
        </div>

        {/* ── 7. RIGHT COLUMN: HUD (opacity: 0 -> 1, translateY: 10px -> 0, static) ── */}
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.70, ease: 'easeOut' }}
          style={shouldReduceMotion ? {} : { x: floatBadgeX, y: floatBadgeY }}
          className="lg:col-span-4 flex flex-col items-center lg:items-end justify-center z-20 py-4 lg:py-0 order-3 w-full"
        >
          <SpatialGlassDeck3D />
        </motion.div>

      </div>

      {/* ════════════════════════════════════════
          4. BOTTOM STATUS FOOTER BAR
      ════════════════════════════════════════ */}
      <motion.div
        initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.80, ease: 'easeOut' }}
        className="w-full flex items-center justify-between z-10 border-t border-white/10 pt-3 font-mono text-xs text-secondary"
      >
        <div className="flex items-center gap-2">
          <Globe size={13} className="text-cyan-400" />
          <span>AVAILABLE WORLDWIDE & REMOTE</span>
        </div>
        <div className="flex items-center gap-2 text-cyan-400/80">
          <span>COIMBATORE, INDIA</span>
          <span>•</span>
          <span className="text-green-400">IST (UTC +5:30)</span>
        </div>
      </motion.div>

      {/* Resume Modal */}
      <ResumeModal isOpen={resumeOpen} onClose={() => setResumeOpen(false)} />
    </section>
  );
};

export default Hero;
