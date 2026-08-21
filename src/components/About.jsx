import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { BookOpen, GraduationCap, MapPin, Calendar, Sparkles, Code2, Cpu } from 'lucide-react';
import { useRef } from 'react';

// ==========================================
// Interactive 3D Card Wrapper with Specular Sheen
// ==========================================
const TiltCard = ({ children, className = '' }) => {
  const cardRef = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const glareX = useMotionValue(50);
  const glareY = useMotionValue(50);
  const glareOpacity = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 240, mass: 0.12 };
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), springConfig);
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), springConfig);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const xPos = (e.clientX - rect.left) / rect.width;
    const yPos = (e.clientY - rect.top) / rect.height;
    x.set(xPos - 0.5);
    y.set(yPos - 0.5);
    glareX.set(xPos * 100);
    glareY.set(yPos * 100);
    glareOpacity.set(0.15);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    glareOpacity.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
        perspective: 900,
      }}
      className={`relative ${className}`}
    >
      {/* Specular glare overlay */}
      <motion.div
        style={{
          background: useTransform(
            [glareX, glareY],
            ([gx, gy]) => `radial-gradient(circle 200px at ${gx}% ${gy}%, rgba(255, 255, 255, 0.16), transparent 70%)`
          ),
          opacity: glareOpacity,
        }}
        className="absolute inset-0 rounded-2xl pointer-events-none z-20 transition-opacity duration-300"
      />
      {children}
    </motion.div>
  );
};

const educationData = [
  {
    title: "B.Tech Information Technology",
    institution: "Sri Krishna College of Technology",
    timeline: "2024 - 2028 | CGPA: 8.03",
    tag: "Current Degree",
    isPrimary: true,
  },
  {
    title: "Higher Secondary Certificate (HSC)",
    institution: "Cheran Matric Hr. Sec. School",
    timeline: "2024 | 84%",
    tag: "High School",
    isPrimary: false,
  },
  {
    title: "Secondary School Leaving Certificate (SSLC)",
    institution: "Cheran Matric Hr. Sec. School",
    timeline: "2022 | 83%",
    tag: "Secondary",
    isPrimary: false,
  }
];

const About = () => {
  return (
    <section id="about" className="py-12 md:py-20 max-w-7xl mx-auto px-4 sm:px-6 relative z-10 w-full">
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.96 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="glass rounded-3xl p-6 sm:p-8 md:p-10 relative overflow-hidden border border-white/15 shadow-2xl backdrop-blur-xl bg-[#0d121c]/80"
      >
        {/* Background Ambient Plasma Flares */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-cyan-500/20 via-blue-600/10 to-transparent rounded-full blur-[100px] pointer-events-none animate-pulse" />
        <div className="absolute -bottom-10 -left-10 w-80 h-80 bg-purple-500/15 rounded-full blur-[90px] pointer-events-none" />

        {/* Section Header */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/10 relative z-10">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white flex items-center gap-3 tracking-tight">
            <div className="p-2.5 rounded-2xl bg-cyan-500/15 border border-cyan-400/30 text-cyan-400 shadow-[0_0_20px_rgba(0,240,255,0.2)]">
              <BookOpen size={26} />
            </div>
            <span>About <span className="gradient-text">Me</span></span>
          </h2>
          <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/20 text-cyan-300 text-xs font-mono">
            <Sparkles size={13} className="animate-spin text-cyan-400" />
            ENGINEER & BUILDER
          </span>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 relative z-10">
          
          {/* ── LEFT COLUMN: Biography & Interactive Profile ── */}
          <div className="flex-1 flex flex-col justify-between space-y-6 text-secondary text-sm sm:text-base leading-relaxed">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
              {/* Profile Image with 3D Holographic Halo */}
              <motion.div
                whileHover={{ scale: 1.05, rotate: 1 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className="relative w-32 h-32 sm:w-36 sm:h-36 shrink-0 rounded-2xl p-1 bg-gradient-to-tr from-cyan-400 via-blue-500 to-indigo-600 shadow-[0_0_25px_rgba(56,189,248,0.35)]"
              >
                <div className="w-full h-full rounded-xl overflow-hidden bg-[#11151c]">
                  <img
                    src="/profile.jpg"
                    alt="Ruthragurubaran"
                    className="w-full h-full object-cover object-top hover:scale-110 transition-transform duration-500"
                    onError={(e) => {
                      e.target.src = "https://ui-avatars.com/api/?name=Ruthragurubaran&size=200&background=0D8ABC&color=fff";
                    }}
                  />
                </div>
                {/* Online Indicator Badge */}
                <span className="absolute -bottom-2 -right-2 px-2 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-400/50 text-[10px] font-bold text-emerald-300 flex items-center gap-1 backdrop-blur-md shadow-lg">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Available
                </span>
              </motion.div>

              <div className="pt-1 text-center sm:text-left space-y-2">
                <p>
                  Hi, I'm <strong className="text-white font-bold text-lg tracking-wide">Ruthragurubaran</strong>. My journey began with a curiosity about how low-level systems function under the hood, which evolved into engineering robust, production-grade distributed architectures.
                </p>
                <p className="text-xs sm:text-sm text-cyan-300 font-medium flex items-center justify-center sm:justify-start gap-1.5">
                  <Cpu size={14} /> Pursuing B.Tech IT @ Sri Krishna College of Technology
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <p>
                My core expertise is centered around <span className="text-cyan-300 font-semibold underline decoration-cyan-400/40 decoration-2 underline-offset-4">Full-Stack Development</span> with specialized depth in <span className="text-blue-400 font-semibold underline decoration-blue-400/40 decoration-2 underline-offset-4">Scalable Backend Microservices</span>.
              </p>
              <p>
                Leveraging Java, Spring Boot, MySQL, Python, and React, I apply rigorous algorithmic precision with modern architectural patterns to deliver highly responsive, mission-critical applications.
              </p>
            </div>

            {/* Quick Tech Highlights */}
            <div className="flex flex-wrap gap-2 pt-2">
              {['Java', 'Spring Boot', 'React', 'MySQL', 'Python', 'RESTful APIs'].map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 rounded-xl bg-white/5 border border-white/10 hover:border-cyan-400/40 hover:bg-cyan-500/10 hover:text-cyan-300 transition-all text-xs font-mono text-gray-300 cursor-default"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* ── RIGHT COLUMN: Animated Interactive Timeline ── */}
          <div className="flex-1 bg-white/5 rounded-3xl p-6 sm:p-7 border border-white/10 relative backdrop-blur-md flex flex-col justify-between">
            {/* Header */}
            <div className="flex items-center justify-between mb-6 pb-3 border-b border-white/10">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg shadow-cyan-500/30 border border-cyan-400/30">
                  <GraduationCap className="text-white" size={20} />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-white leading-tight">Academic Journey</h3>
                  <span className="text-[10px] text-gray-400 uppercase tracking-widest font-mono">Verified Timeline</span>
                </div>
              </div>
            </div>

            {/* Vertical Animated Laser Timeline */}
            <div className="relative space-y-4 before:absolute before:inset-0 before:left-3 md:before:left-1/2 before:w-[2px] before:bg-gradient-to-b before:from-cyan-400 before:via-blue-500 before:to-transparent pl-8 md:pl-0 pt-1">
              
              {educationData.map((item, idx) => (
                <div
                  key={idx}
                  className="relative flex items-start justify-between md:justify-normal md:odd:flex-row-reverse group"
                >
                  {/* Glowing Timeline Pulsing Node */}
                  <div className="absolute left-0 mt-2 md:left-1/2 -translate-x-[7px] md:-translate-x-1/2 flex items-center justify-center z-10">
                    <motion.div
                      animate={{ scale: [1, 1.8, 1], opacity: [0.7, 0, 0.7] }}
                      transition={{ duration: 2.2, repeat: Infinity, delay: idx * 0.4 }}
                      className="absolute w-5 h-5 rounded-full bg-cyan-400/40 pointer-events-none"
                    />
                    <div className={`w-3.5 h-3.5 rounded-full border-2 border-[#0d121c] transition-transform duration-300 group-hover:scale-125 ${
                      item.isPrimary ? 'bg-cyan-400 shadow-[0_0_12px_#00f0ff]' : 'bg-blue-400 shadow-[0_0_8px_#38bdf8]'
                    }`} />
                  </div>

                  {/* 3D Education Card */}
                  <div className={`w-full md:w-1/2 ${idx % 2 === 0 ? 'md:pr-6' : 'md:pl-6'} pb-3`}>
                    <TiltCard>
                      <motion.div
                        initial={{ opacity: 0, x: idx % 2 === 0 ? -25 : 25 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: idx * 0.15 }}
                        whileHover={{ y: -4, scale: 1.02 }}
                        className={`p-4 rounded-2xl border transition-all duration-300 shadow-lg ${
                          item.isPrimary
                            ? 'bg-[#131924]/90 border-cyan-400/40 hover:border-cyan-400 shadow-cyan-500/10'
                            : 'bg-[#131924]/75 border-white/10 hover:border-blue-400/40'
                        }`}
                      >
                        <div className="flex items-center justify-between gap-2 mb-1">
                          <h4 className="text-sm sm:text-base font-bold text-white leading-tight group-hover:text-cyan-300 transition-colors">
                            {item.title}
                          </h4>
                          <span className="text-[9px] font-mono font-bold px-2 py-0.5 rounded bg-white/5 border border-white/10 text-cyan-300 shrink-0">
                            {item.tag}
                          </span>
                        </div>

                        <p className="text-cyan-400 font-medium mb-1.5 flex items-center gap-1.5 text-xs">
                          <MapPin size={13} className="shrink-0 text-cyan-400" />
                          <span>{item.institution}</span>
                        </p>

                        <p className="text-secondary text-xs flex items-center gap-1.5 font-mono">
                          <Calendar size={13} className="shrink-0 text-gray-400" />
                          <span>{item.timeline}</span>
                        </p>
                      </motion.div>
                    </TiltCard>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </motion.div>
    </section>
  );
};

export default About;
