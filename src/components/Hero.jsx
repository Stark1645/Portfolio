import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Download, ArrowRight, Trophy, Code2, Clock, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import ResumeModal from './ResumeModal';

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
  { icon: Trophy, iconColor: 'text-yellow-400', bg: 'bg-yellow-500/10', border: 'border-yellow-500/20', value: '169+', unit: 'Days', label: 'LeetCode Streak' },
  { icon: Code2,  iconColor: 'text-blue-400',   bg: 'bg-blue-500/10',   border: 'border-blue-500/20',  value: '10+',  unit: '',     label: 'Projects Built'  },
  { icon: Clock,  iconColor: 'text-purple-400', bg: 'bg-purple-500/10', border: 'border-purple-500/20',value: '1K+',  unit: 'hrs',  label: 'Coding Hours'    },
  { icon: Star,   iconColor: 'text-emerald-400',bg: 'bg-emerald-500/10',border: 'border-emerald-500/20',value: '8.03',unit: '/ 10', label: 'CGPA'            },
];

const Hero = () => {
  const [roleIndex, setRoleIndex] = useState(0);
  const [resumeOpen, setResumeOpen] = useState(false);

  useEffect(() => {
    const id = setInterval(() => setRoleIndex(i => (i + 1) % roles.length), 2500);
    return () => clearInterval(id);
  }, []);

  return (
    <section
      id="home"
      className="relative w-full min-h-screen flex flex-col overflow-hidden"
    >
      {/* Ambient glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-[5%]  -translate-y-1/2 w-[380px] h-[380px] bg-blue-600/8  rounded-full blur-[120px]" />
        <div className="absolute top-1/2 right-[10%] -translate-y-1/2 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[130px]" />
        <div className="absolute top-[30%] right-[28%]               w-[260px] h-[260px] bg-purple-600/8 rounded-full blur-[90px]"  />
        {/* Right panel subtle tint */}
        <div className="absolute top-0 right-0 bottom-0 w-[46vw] bg-gradient-to-l from-blue-950/20 via-transparent to-transparent" />
      </div>

      {/* ════════════════════════════════════════
          MAIN ROW  —  text left | photo right
      ════════════════════════════════════════ */}
      <div className="container mx-auto px-6 md:px-12 flex flex-col lg:flex-row flex-1 items-center w-full h-full">

        {/* ── LEFT: Text ── */}
        <div className="flex-1 flex flex-col gap-7 py-20 lg:py-28 lg:pr-10 w-full z-10">

          {/* Status badge */}
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="self-start flex items-center gap-2.5 px-5 py-2.5 bg-[#11151c] rounded-full border border-green-500/20 shadow-lg"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse shadow-[0_0_10px_rgba(74,222,128,0.9)]" />
            <span className="text-sm font-semibold text-green-300">Available for new opportunities</span>
          </motion.div>

          {/* Name */}
          <motion.div
            initial={{ opacity: 0, x: -28 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.65, delay: 0.1 }}
            className="flex flex-col gap-2"
          >
            <p className="text-secondary text-xl font-medium">Hi there 👋, I'm</p>
            <h1
              className="font-extrabold tracking-tight leading-[1.05] gradient-text"
              style={{
                fontSize: 'clamp(2.8rem, 4.5vw, 5.5rem)',
                filter: 'drop-shadow(0 0 32px rgba(88,166,255,0.4))',
              }}
            >
              Ruthragurubaran
            </h1>
          </motion.div>

          {/* Animated role */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.55, delay: 0.2 }}
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

          {/* Bio */}
          <motion.p
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.55, delay: 0.3 }}
            className="text-secondary text-lg leading-[1.85]"
            style={{ maxWidth: 480 }}
          >
            Building scalable full-stack applications with clean architecture
            and performance-first thinking — from high-throughput REST APIs with
            Spring Boot to polished React interfaces.
          </motion.p>

          {/* Tech pills */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.4 }}
            className="flex flex-wrap gap-2.5"
          >
            {techStack.map(t => (
              <span
                key={t.label}
                className={`px-4 py-2 rounded-xl border text-sm font-semibold
                  hover:scale-105 hover:brightness-125 transition-all duration-200 cursor-default
                  ${t.color} ${t.border} ${t.bg}`}
              >
                {t.label}
              </span>
            ))}
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.5 }}
            className="flex flex-col gap-4"
          >
            <div className="flex flex-wrap items-center gap-4">
              <Link
                to="/projects"
                className="group inline-flex items-center gap-2.5 bg-blue-600 hover:bg-blue-500
                  text-white font-bold px-8 py-4 rounded-xl text-base
                  shadow-[0_6px_28px_rgba(88,166,255,0.4)] hover:shadow-[0_12px_40px_rgba(88,166,255,0.55)]
                  transition-all duration-300 hover:-translate-y-0.5"
              >
                View Projects
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/contact"
                className="group inline-flex items-center gap-2.5 bg-[#11151c] text-heading font-bold
                  px-8 py-4 rounded-xl text-base border border-white/5
                  hover:border-white/10 hover:bg-[#1a202c] transition-all duration-300 hover:-translate-y-0.5 shadow-lg"
              >
                Contact Me <Mail size={18} />
              </Link>
              <button
                onClick={() => setResumeOpen(true)}
                className="group inline-flex items-center gap-2.5 bg-[#11151c] text-secondary hover:text-heading font-bold
                  px-8 py-4 rounded-xl text-base border border-white/5
                  hover:border-white/10 hover:bg-[#1a202c] hover:text-white transition-all duration-300 hover:-translate-y-0.5 shadow-lg"
              >
                Resume <Download size={18} className="group-hover:translate-y-0.5 transition-transform" />
              </button>
            </div>
            
            <div className="flex">
              <Link
                to="/profiles"
                className="group inline-flex items-center gap-2.5 bg-[#11151c] text-secondary hover:text-heading font-bold
                  px-8 py-4 rounded-xl text-base border border-white/5
                  hover:border-white/10 hover:bg-[#1a202c] hover:text-white transition-all duration-300 hover:-translate-y-0.5 shadow-lg"
              >
                Coding Profiles <Code2 size={18} className="text-orange-400 group-hover:text-green-400 transition-colors duration-500" />
              </Link>
            </div>
          </motion.div>
        </div>

        {/* ── RIGHT: Photo + horizontal stats below ── */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: 'easeOut' }}
          className="relative flex flex-col items-center justify-center gap-8 py-16 lg:py-24 w-full lg:w-[46vw] flex-shrink-0 z-10"
        >
          {/* Photo container — bigger now */}
          <div
            className="relative"
            style={{
              width:  'min(480px, calc(100vw - 48px))',
              height: 'min(480px, calc(100vw - 48px))',
            }}
          >
            {/* Glow aura */}
            <div className="absolute -inset-12 rounded-full bg-gradient-to-br from-blue-600/30 to-purple-600/20 blur-3xl pointer-events-none" />

            {/* Spinning ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 14, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-0 rounded-full"
              style={{
                background: 'conic-gradient(from 0deg, #58a6ff 0%, #bc8cff 40%, #0d1117 58%, #58a6ff 100%)',
                padding: 4,
              }}
            >
              <div className="w-full h-full rounded-full bg-[#0d1117]" />
            </motion.div>

            {/* Photo */}
            <div className="absolute inset-[4px] rounded-full overflow-hidden z-10 border-4 border-[#0d1117]">
              <img
                src="/profile.jpg"
                alt="Ruthragurubaran"
                className="w-full h-full object-cover object-top"
                onError={e => {
                  e.target.src = 'https://ui-avatars.com/api/?name=Ruthragurubaran&size=600&background=0D8ABC&color=fff';
                }}
              />
            </div>

            {/* Open to Work badge */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap z-20
                bg-[#11151c] border border-green-500/30 rounded-full px-6 py-2.5
                flex items-center gap-2.5 shadow-xl"
            >
              <span className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse shadow-[0_0_10px_rgba(74,222,128,0.9)]" />
              <span className="text-sm font-bold text-green-300">Open to Work</span>
            </motion.div>
          </div>

          {/* ── Stats: horizontal row directly under photo ── */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65, duration: 0.5 }}
            className="flex flex-row items-stretch w-full bg-[#11151c] border border-white/5 shadow-xl rounded-2xl overflow-hidden"
            style={{ width: 'min(480px, calc(100vw - 48px))' }}
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

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-background to-transparent pointer-events-none" />

      {/* Resume Modal */}
      <ResumeModal isOpen={resumeOpen} onClose={() => setResumeOpen(false)} />
    </section>
  );
};

export default Hero;
