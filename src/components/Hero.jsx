import { motion, AnimatePresence, useMotionValue, useSpring, useTransform, useReducedMotion } from 'framer-motion';
import { Mail, Download, ArrowRight, Trophy, Code2, Clock, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import ResumeModal from './ResumeModal';
import { SmokeyCursor } from './lightswind/smokey-cursor';

const roles = [
  'Full-Stack Developer',
  'Java & Spring Boot Engineer',
  'React UI Craftsman',
  'Backend Systems Builder',
];

const techStack = [
  { label: 'Java',        color: 'text-orange-400', border: 'border-orange-500/30', bg: 'bg-[#11151c]' },
  { label: 'Spring Boot', color: 'text-green-400',  border: 'border-green-500/30',  bg: 'bg-[#11151c]' },
  { label: 'React',       color: 'text-cyan-400',   border: 'border-cyan-500/30',   bg: 'bg-[#11151c]' },
  { label: 'Python',      color: 'text-blue-400',   border: 'border-blue-500/30',   bg: 'bg-[#11151c]' },
  { label: 'MySQL',       color: 'text-purple-400', border: 'border-purple-500/30', bg: 'bg-[#11151c]' },
];

const stats = [
  { icon: Trophy, iconColor: 'text-yellow-400', bg: 'bg-yellow-500/10', border: 'border-yellow-500/20', value: '225+', unit: 'Days', label: 'LeetCode Streak' },
  { icon: Code2,  iconColor: 'text-blue-400',   bg: 'bg-blue-500/10',   border: 'border-blue-500/20',  value: '10+',  unit: '',     label: 'Projects Built'  },
  { icon: Clock,  iconColor: 'text-purple-400', bg: 'bg-purple-500/10', border: 'border-purple-500/20',value: '1K+',  unit: 'hrs',  label: 'Coding Hours'    },
  { icon: Star,   iconColor: 'text-emerald-400',bg: 'bg-emerald-500/10',border: 'border-emerald-500/20',value: '8.03',unit: '/ 10', label: 'CGPA'            },
];

// ==========================================
// Magnetic CTA Button Wrapper Component
// ==========================================
const MagneticButton = ({ children, className = '', maxDistance = 7 }) => {
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
      whileHover={shouldReduceMotion ? {} : { scale: 1.03 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      className={`inline-block ${className}`}
    >
      {children}
    </motion.div>
  );
};

// ==========================================
// Main Hero Component
// ==========================================
const Hero = () => {
  const [roleIndex, setRoleIndex] = useState(0);
  const [resumeOpen, setResumeOpen] = useState(false);
  const heroRef = useRef(null);
  const photoContainerRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();

  // Normalized cursor coordinates (-1 to 1)
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const ringProximityVal = useMotionValue(0);

  // Smooth springs for layered depths
  const springConfig = { damping: 28, stiffness: 120, mass: 0.6 };
  const smoothCursorX = useSpring(cursorX, springConfig);
  const smoothCursorY = useSpring(cursorY, springConfig);
  const smoothRingProximity = useSpring(ringProximityVal, { damping: 20, stiffness: 140 });

  // Layer 1: Ambient Background Glow (strongest movement: ~34px)
  const bgGlowX = useTransform(smoothCursorX, [-1, 1], [-34, 34]);
  const bgGlowY = useTransform(smoothCursorY, [-1, 1], [-34, 34]);

  // Layer 2: Neon Ring & Aura (medium movement: ~16px)
  const ringX = useTransform(smoothCursorX, [-1, 1], [-16, 16]);
  const ringY = useTransform(smoothCursorY, [-1, 1], [-16, 16]);

  // Layer 3: Profile Photo parallax & 3D tilt (8-10px translation, 2.5-3.5 deg tilt)
  const photoX = useTransform(smoothCursorX, [-1, 1], [-10, 10]);
  const photoY = useTransform(smoothCursorY, [-1, 1], [-10, 10]);
  const rotateX = useTransform(smoothCursorY, [-1, 1], [3.2, -3.2]);
  const rotateY = useTransform(smoothCursorX, [-1, 1], [-3.2, 3.2]);

  // Layer 4: Stats Card (subtle movement: ~5px)
  const statsX = useTransform(smoothCursorX, [-1, 1], [-5, 5]);
  const statsY = useTransform(smoothCursorY, [-1, 1], [-5, 5]);

  // Dynamic glow scale & opacity based on proximity to photo
  const ringGlowScale = useTransform(smoothRingProximity, [0, 1], [1, 1.15]);
  const ringGlowOpacity = useTransform(smoothRingProximity, [0, 1], [0.35, 0.75]);

  // Handle Hero mouse movement
  const handleMouseMove = useCallback((e) => {
    if (shouldReduceMotion || !heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    const xRel = (e.clientX - rect.left) / rect.width;
    const yRel = (e.clientY - rect.top) / rect.height;

    // Map to [-1, 1]
    const normX = (xRel - 0.5) * 2;
    const normY = (yRel - 0.5) * 2;
    cursorX.set(Math.max(-1, Math.min(1, normX)));
    cursorY.set(Math.max(-1, Math.min(1, normY)));

    // Proximity to profile photo center
    if (photoContainerRef.current) {
      const pRect = photoContainerRef.current.getBoundingClientRect();
      const pCenterX = pRect.left + pRect.width / 2;
      const pCenterY = pRect.top + pRect.height / 2;
      const dist = Math.hypot(e.clientX - pCenterX, e.clientY - pCenterY);
      const maxProximityDist = 280;
      const proxFactor = Math.max(0, Math.min(1, 1 - dist / maxProximityDist));
      ringProximityVal.set(proxFactor);
    }
  }, [shouldReduceMotion, cursorX, cursorY, ringProximityVal]);

  const handleMouseLeave = useCallback(() => {
    cursorX.set(0);
    cursorY.set(0);
    ringProximityVal.set(0);
  }, [cursorX, cursorY, ringProximityVal]);

  useEffect(() => {
    const id = setInterval(() => setRoleIndex(i => (i + 1) % roles.length), 2500);
    return () => clearInterval(id);
  }, []);

  const headingName = "Ruthragurubaran";
  const nameLetters = useMemo(() => headingName.split(''), [headingName]);

  return (
    <section
      ref={heroRef}
      id="home"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full min-h-[calc(100vh-5rem)] flex flex-col justify-center overflow-hidden py-4 lg:py-8"
    >
      {/* ════════════════════════════════════════
          1. CURSOR-REACTIVE AMBIENT BACKGROUND GLOWS
      ════════════════════════════════════════ */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        {/* Base static ambient glows */}
        <div className="absolute top-1/2 left-[5%] -translate-y-1/2 w-[380px] h-[380px] bg-blue-600/8 rounded-full blur-[120px]" />
        <div className="absolute top-1/2 right-[10%] -translate-y-1/2 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[130px]" />
        <div className="absolute top-[30%] right-[28%] w-[260px] h-[260px] bg-purple-600/8 rounded-full blur-[90px]" />

        {/* Dynamic reactive ambient glow that smoothly follows cursor */}
        {!shouldReduceMotion && (
          <motion.div
            style={{
              x: bgGlowX,
              y: bgGlowY,
              background: 'radial-gradient(circle, rgba(88,166,255,0.14) 0%, rgba(188,140,255,0.09) 45%, transparent 70%)',
            }}
            className="absolute top-1/3 left-1/3 w-[520px] h-[520px] rounded-full blur-[140px] pointer-events-none opacity-60 mix-blend-screen"
          >
            <div className="w-full h-full rounded-full bg-gradient-to-tr from-blue-600/12 via-indigo-500/10 to-purple-600/10" />
          </motion.div>
        )}

        {/* Right panel subtle tint */}
        <div className="absolute top-0 right-0 bottom-0 w-[46vw] bg-gradient-to-l from-blue-950/20 via-transparent to-transparent" />
      </div>

      {/* ════════════════════════════════════════
          SIGNATURE EFFECT: SMOKEY CURSOR FLUID SIMULATION
          (Placed behind Hero content z-10, above ambient glow z-0)
      ════════════════════════════════════════ */}
      {!shouldReduceMotion && (
        <SmokeyCursor
          embed={true}
          className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-75"
          splatRadius={0.24}
          splatForce={5500}
          densityDissipation={3.2}
          velocityDissipation={2.0}
          curl={4}
          enableShading={true}
          transparent={true}
        />
      )}

      {/* ════════════════════════════════════════
          MAIN ROW — text left | photo right
      ════════════════════════════════════════ */}
      <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row flex-1 items-center justify-center w-full relative z-10">

        {/* ── LEFT: Text ── */}
        <div className="flex-1 flex flex-col justify-center gap-4 lg:gap-5 py-6 lg:py-8 lg:pr-10 w-full z-10">

          {/* Status badge */}
          <motion.div
            initial={{ opacity: 0, y: -14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
            className="self-start flex items-center gap-2.5 px-5 py-2.5 bg-[#11151c] rounded-full border border-green-500/20 shadow-lg"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse shadow-[0_0_10px_rgba(74,222,128,0.9)]" />
            <span className="text-sm font-semibold text-green-300">Available for new opportunities</span>
          </motion.div>

          {/* "Hi there" & Main Name (Cinematic Staggered Letters) */}
          <div className="flex flex-col gap-2">
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
              className="text-secondary text-xl font-medium"
            >
              Hi there 👋, I'm
            </motion.p>
            <h1
              className="font-extrabold tracking-tight leading-[1.05] flex flex-nowrap whitespace-nowrap"
              style={{
                fontSize: 'clamp(1.85rem, 3.8vw, 3.75rem)',
                filter: 'drop-shadow(0 0 32px rgba(88,166,255,0.4))',
              }}
              aria-label={headingName}
            >
              {nameLetters.map((char, index) => (
                <motion.span
                  key={index}
                  initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 22, filter: 'blur(5px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  transition={{
                    duration: 0.6,
                    delay: 0.15 + index * 0.042,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="inline-block gradient-text"
                >
                  {char}
                </motion.span>
              ))}
            </h1>
          </div>

          {/* Role/title */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.55, delay: 0.75, ease: 'easeOut' }}
            className="flex items-center gap-3 h-9"
          >
            <div className="w-8 h-0.5 rounded-full bg-blue-500 flex-shrink-0" />
            <AnimatePresence mode="wait">
              <motion.span
                key={roleIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.22 }}
                className="text-xl font-bold text-blue-400 whitespace-nowrap"
              >
                {roles[roleIndex]}
              </motion.span>
            </AnimatePresence>
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.55, delay: 0.85, ease: 'easeOut' }}
            className="text-secondary text-lg leading-[1.85]"
            style={{ maxWidth: 480 }}
          >
            Building scalable full-stack applications with clean architecture
            and performance-first thinking — from high-throughput REST APIs with
            Spring Boot to polished React interfaces.
          </motion.p>

          {/* Tech pills with hover polish */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.95, ease: 'easeOut' }}
            className="flex flex-wrap gap-2.5"
          >
            {techStack.map(t => (
              <motion.span
                key={t.label}
                whileHover={shouldReduceMotion ? {} : { y: -2.5, scale: 1.03 }}
                transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                className={`px-4 py-2 rounded-xl border text-sm font-semibold
                  hover:brightness-125 hover:shadow-[0_4px_14px_rgba(88,166,255,0.18)] transition-colors duration-200 cursor-default
                  ${t.color} ${t.border} ${t.bg}`}
              >
                {t.label}
              </motion.span>
            ))}
          </motion.div>

          {/* Magnetic CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 1.05, ease: 'easeOut' }}
            className="flex flex-col gap-3 mt-2"
          >
            <div className="flex flex-wrap items-center gap-3">
              <MagneticButton>
                <Link
                  to="/projects"
                  className="group inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500
                    text-white font-semibold px-5 py-3 rounded-xl text-sm
                    shadow-[0_4px_15px_rgba(88,166,255,0.25)] hover:shadow-[0_8px_22px_rgba(88,166,255,0.4)]
                    transition-all duration-300"
                >
                  View Projects
                  <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </MagneticButton>

              <MagneticButton>
                <Link
                  to="/contact"
                  className="group inline-flex items-center gap-2 bg-[#11151c] text-heading font-semibold
                    px-5 py-3 rounded-xl text-sm border border-white/5
                    hover:border-white/15 hover:bg-[#1a202c] transition-all duration-300 shadow-lg"
                >
                  Contact Me <Mail size={15} />
                </Link>
              </MagneticButton>

              <MagneticButton>
                <button
                  onClick={() => setResumeOpen(true)}
                  className="group inline-flex items-center gap-2 bg-[#11151c] text-secondary hover:text-heading font-semibold
                    px-5 py-3 rounded-xl text-sm border border-white/5
                    hover:border-white/15 hover:bg-[#1a202c] hover:text-white transition-all duration-300 shadow-lg cursor-pointer"
                >
                  Resume <Download size={15} className="group-hover:translate-y-0.5 transition-transform" />
                </button>
              </MagneticButton>
            </div>
            
            <div className="flex">
              <MagneticButton>
                <Link
                  to="/profiles"
                  className="group inline-flex items-center gap-2 bg-[#11151c] text-secondary hover:text-heading font-semibold
                    px-5 py-3 rounded-xl text-sm border border-white/5
                    hover:border-white/15 hover:bg-[#1a202c] hover:text-white transition-all duration-300 shadow-lg"
                >
                  Coding Profiles <Code2 size={15} className="text-orange-400 group-hover:text-green-400 transition-colors duration-500" />
                </Link>
              </MagneticButton>
            </div>
          </motion.div>
        </div>

        {/* ── RIGHT: Photo + 3D Tilt + Neon Ring + horizontal stats below ── */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
          className="relative flex flex-col items-center justify-center gap-5 lg:gap-6 py-6 w-full lg:w-[46vw] flex-shrink-0 z-10"
        >
          {/* Layered Depth: Profile Photo with 3D Parallax Tilt + Animated Neon Ring */}
          <motion.div
            ref={photoContainerRef}
            style={{
              x: shouldReduceMotion ? 0 : photoX,
              y: shouldReduceMotion ? 0 : photoY,
              rotateX: shouldReduceMotion ? 0 : rotateX,
              rotateY: shouldReduceMotion ? 0 : rotateY,
              transformPerspective: 1000,
              transformStyle: 'preserve-3d',
            }}
            className="relative will-change-transform"
          >
            <div
              className="relative"
              style={{
                width:  'min(380px, calc(100vw - 48px))',
                height: 'min(380px, calc(100vw - 48px))',
              }}
            >
              {/* Dynamic Aura Glow (reacts to proximity) */}
              <motion.div
                style={{
                  x: shouldReduceMotion ? 0 : ringX,
                  y: shouldReduceMotion ? 0 : ringY,
                  scale: shouldReduceMotion ? 1 : ringGlowScale,
                  opacity: shouldReduceMotion ? 0.4 : ringGlowOpacity,
                }}
                className="absolute -inset-10 rounded-full bg-gradient-to-br from-blue-500/40 via-cyan-400/25 to-purple-600/35 blur-3xl pointer-events-none transition-opacity duration-300"
              />

              {/* Animated Neon Ring (Slow, elegant 8.5s rotation with cool color transitions) */}
              <motion.div
                animate={shouldReduceMotion ? {} : { rotate: 360 }}
                transition={{ duration: 8.5, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-0 rounded-full"
                style={{
                  background: 'conic-gradient(from 0deg, #38bdf8 0%, #58a6ff 25%, #bc8cff 55%, #0d1117 72%, #38bdf8 100%)',
                  padding: 4,
                  boxShadow: '0 0 25px rgba(88, 166, 255, 0.25), inset 0 0 15px rgba(188, 140, 255, 0.2)',
                }}
              >
                <div className="w-full h-full rounded-full bg-[#0d1117]" />
              </motion.div>

              {/* Photo */}
              <div className="absolute inset-[4px] rounded-full overflow-hidden z-10 border-4 border-[#0d1117] shadow-inner">
                <img
                  src="/profile.jpg"
                  alt="Ruthragurubaran"
                  className="w-full h-full object-cover object-top transition-transform duration-500"
                  onError={e => {
                    e.target.src = 'https://ui-avatars.com/api/?name=Ruthragurubaran&size=600&background=0D8ABC&color=fff';
                  }}
                />
              </div>

              {/* Open to Work badge */}
              <motion.div
                animate={shouldReduceMotion ? {} : { y: [0, -7, 0] }}
                transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap z-20
                  bg-[#11151c] border border-green-500/30 rounded-full px-6 py-2.5
                  flex items-center gap-2.5 shadow-xl hover:border-green-400/50 transition-colors"
              >
                <span className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse shadow-[0_0_10px_rgba(74,222,128,0.9)]" />
                <span className="text-sm font-bold text-green-300">Open to Work</span>
              </motion.div>
            </div>
          </motion.div>

          {/* Stats Card: Layered Depth Parallax (4-6px subtle movement) */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65, duration: 0.5 }}
            style={{
              width: 'min(380px, calc(100vw - 48px))',
              x: shouldReduceMotion ? 0 : statsX,
              y: shouldReduceMotion ? 0 : statsY,
            }}
            className="flex flex-row items-stretch w-full bg-[#11151c] border border-white/5 shadow-xl rounded-2xl overflow-hidden will-change-transform mt-3"
          >
            {stats.map((s, i) => {
              const Icon = s.icon;
              return (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 + i * 0.08 }}
                  whileHover={{ backgroundColor: 'rgba(255,255,255,0.04)' }}
                  className={`flex-1 flex flex-col items-center justify-center gap-2 py-5 px-3
                    cursor-default transition-colors duration-200 group
                    ${i < stats.length - 1 ? 'border-r border-white/8' : ''}`}
                >
                  <div className={`p-2 rounded-xl ${s.bg} border ${s.border} group-hover:scale-110 transition-transform duration-200`}>
                    <Icon size={16} className={s.iconColor} />
                  </div>
                  <div className="text-center">
                    <div className="flex items-baseline justify-center gap-0.5 leading-none">
                      <span className="text-xl font-black text-heading">{s.value}</span>
                      {s.unit && <span className="text-[10px] font-bold text-secondary ml-0.5">{s.unit}</span>}
                    </div>
                    <p className="text-[9px] font-semibold text-secondary uppercase tracking-widest mt-1.5 leading-tight">
                      {s.label}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>
      </div>

      {/* Resume Modal */}
      <ResumeModal isOpen={resumeOpen} onClose={() => setResumeOpen(false)} />
    </section>
  );
};

export default Hero;
