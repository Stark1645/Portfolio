import { motion } from 'framer-motion';
import { Mail, Download, ArrowRight, Code } from 'lucide-react';

const Hero = () => {
  const handleScroll = (e, target) => {
    e.preventDefault();
    const element = document.querySelector(target);
    if (element) {
      window.scrollTo({ top: element.offsetTop - 80, behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-24 overflow-hidden">
      {/* Background Ornaments */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 max-w-5xl z-10 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="relative w-32 h-32 md:w-40 md:h-40 rounded-full mb-8 p-1 bg-gradient-to-tr from-blue-500 to-purple-500 shadow-[0_0_30px_rgba(88,166,255,0.3)] mx-auto"
        >
          <img
            src="/profile.jpg"
            alt="Ruthragurubaran"
            className="w-full h-full object-cover rounded-full border-4 border-[#0d1117]"
            onError={(e) => {
              e.target.src = "https://ui-avatars.com/api/?name=Ruthragurubaran&size=200&background=0D8ABC&color=fff";
            }}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-8 p-3 glass rounded-full inline-flex items-center space-x-2 border border-blue-500/30 shadow-[0_0_20px_rgba(88,166,255,0.15)]"
        >
          <Code size={18} className="text-blue-400" />
          <span className="text-sm font-medium text-gray-300 pr-2">Available for new opportunities</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6"
        >
          Hi, I'm <br className="md:hidden" />
          <span className="gradient-text drop-shadow-[0_0_25px_rgba(88,166,255,0.4)]">
            Ruthragurubaran
          </span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-xl md:text-2xl text-gray-400 font-medium mb-8 max-w-3xl leading-relaxed"
        >
          <span className="text-white">Full Stack Developer</span> <span className="mx-2 opacity-50">|</span> 
          <span>B.Tech Information Technology Student</span>
          
          <div className="mt-4 text-lg text-gray-500 typing-effect-container h-[1.5em] overflow-hidden flex justify-center">
            {/* Simple CSS typing effect equivalent or simple fade for Tagline */}
            <p className="typing-text border-r-2 border-blue-500 pr-1 animate-pulse font-mono text-base md:text-lg">
              Building scalable software systems, APIs, & intelligent applications.
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-wrap items-center justify-center gap-4 mt-8"
        >
          <a
            href="#projects"
            onClick={(e) => handleScroll(e, '#projects')}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-xl font-bold transition-all shadow-lg hover:shadow-blue-500/30 transform hover:-translate-y-1"
          >
            View Projects <ArrowRight size={20} />
          </a>
          
          <a
            href="#contact"
            onClick={(e) => handleScroll(e, '#contact')}
            className="flex items-center gap-2 glass hover:bg-white/10 text-white px-8 py-4 rounded-xl font-bold transition-all transform hover:-translate-y-1"
          >
            Contact Me <Mail size={20} />
          </a>

          <a
            href="/Ruthragurubaran J resume1.docx"
            download
            className="flex items-center gap-2 border border-gray-700 hover:border-gray-500 text-gray-300 hover:text-white px-8 py-4 rounded-xl font-bold transition-all transform hover:-translate-y-1"
          >
            Resume <Download size={20} />
          </a>
        </motion.div>
      </div>

      <style>{`
        .typing-text {
          white-space: nowrap;
          overflow: hidden;
          animation: typing 3.5s steps(60, end), blink-caret .75s step-end infinite;
          max-width: 100%;
        }
        @keyframes typing {
          from { width: 0 }
          to { width: 100% }
        }
        @keyframes blink-caret {
          from, to { border-color: transparent }
          50% { border-color: #58a6ff }
        }
      `}</style>
    </section>
  );
};

export default Hero;
