import { motion } from 'framer-motion';
import { BookOpen, GraduationCap, MapPin, Calendar } from 'lucide-react';

const About = () => {
  return (
    <section id="about" className="py-24 px-6 relative z-10 w-full max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.6 }}
        className="glass rounded-3xl p-8 md:p-12 relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-[80px]" />
        
        <h2 className="text-3xl md:text-5xl font-bold mb-8 text-white flex items-center gap-4">
          <BookOpen className="text-blue-500" size={36} /> About Me
        </h2>
        
        <div className="flex flex-col md:flex-row gap-12">
          <div className="flex-1 space-y-6 text-gray-300 text-lg leading-relaxed">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-8">
              <div className="w-40 h-40 md:w-48 md:h-48 rounded-2xl overflow-hidden shrink-0 border-4 border-gray-800 shadow-xl shadow-blue-500/20">
                <img 
                  src="/profile.jpg" 
                  alt="Ruthragurubaran" 
                  className="w-full h-full object-cover object-top hover:scale-110 transition-transform duration-500"
                  onError={(e) => {
                    e.target.src = "https://ui-avatars.com/api/?name=Ruthragurubaran&size=200&background=0D8ABC&color=fff";
                  }}
                />
              </div>
              <p className="pt-2 text-center sm:text-left">
                Hi, I'm <strong className="text-white">Ruthragurubaran</strong>, a B.Tech Information Technology student at Sri Krishna College of Technology with a strong passion for building scalable software systems and intelligent applications.
              </p>
            </div>
            <p>
              My expertise lies in <span className="text-blue-400 font-medium">backend development</span>, <span className="text-purple-400 font-medium">full stack systems</span>, and building <span className="text-emerald-400 font-medium">REST APIs</span>.
            </p>
            <p>
              I thrive on architecting complex systems using robust technologies like Java, Spring Boot, Python, React, and MySQL. I love tackling challenging problems and transforming ideas into functional, clean, and efficient digital products.
            </p>
          </div>

          <div className="flex-1 bg-white/5 rounded-2xl p-8 border border-white/10 relative">
            <div className="absolute -left-4 -top-4 w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/30">
              <GraduationCap className="text-white" size={24} />
            </div>
            
            <h3 className="text-2xl font-bold text-white mb-6">Education</h3>
            
            <div className="space-y-4 relative before:absolute before:inset-0 before:ml-1 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-blue-500 before:to-transparent pl-6 md:pl-0 pt-2">
              <div className="relative flex items-start justify-between md:justify-normal md:odd:flex-row-reverse group">
                <div className="absolute left-0 mt-1 md:left-1/2 -translate-x-[5px] md:-translate-x-1/2 w-3 h-3 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(88,166,255,0.8)] border border-gray-900 group-hover:scale-150 transition-transform"></div>
                
                <div className="w-full md:w-1/2 md:pr-8 pb-4">
                  <div className="bg-gray-800/50 backdrop-blur-md p-5 rounded-xl border border-gray-700 hover:border-blue-500/50 transition-colors">
                    <h4 className="text-xl font-bold text-white mb-1">B.Tech Information Technology</h4>
                    <p className="text-blue-400 font-medium mb-3 flex items-center gap-1 text-sm">
                      <MapPin size={14} /> Sri Krishna College of Technology
                    </p>
                    <p className="text-gray-400 text-sm flex items-center gap-1">
                      <Calendar size={14} /> 2024 - 2028 | CGPA: 7.91
                    </p>
                  </div>
                </div>
              </div>

              <div className="relative flex items-start justify-between md:justify-normal md:odd:flex-row-reverse group">
                <div className="absolute left-0 mt-1 md:left-1/2 -translate-x-[5px] md:-translate-x-1/2 w-3 h-3 rounded-full bg-blue-500/50 border border-gray-900 group-hover:scale-150 transition-transform"></div>
                
                <div className="w-full md:w-1/2 md:pl-8 pb-4">
                  <div className="bg-gray-800/50 backdrop-blur-md p-5 rounded-xl border border-gray-700 hover:border-blue-500/50 transition-colors">
                    <h4 className="text-xl font-bold text-white mb-1">Higher Secondary Certificate (HSC)</h4>
                    <p className="text-blue-400 font-medium mb-3 flex items-center gap-1 text-sm">
                      <MapPin size={14} /> Cheran Matric Hr. Sec. School
                    </p>
                    <p className="text-gray-400 text-sm flex items-center gap-1">
                      <Calendar size={14} /> 2024 | 84%
                    </p>
                  </div>
                </div>
              </div>

              <div className="relative flex items-start justify-between md:justify-normal md:odd:flex-row-reverse group">
                <div className="absolute left-0 mt-1 md:left-1/2 -translate-x-[5px] md:-translate-x-1/2 w-3 h-3 rounded-full bg-blue-500/30 border border-gray-900 group-hover:scale-150 transition-transform"></div>
                
                <div className="w-full md:w-1/2 md:pr-8 pb-4">
                  <div className="bg-gray-800/50 backdrop-blur-md p-5 rounded-xl border border-gray-700 hover:border-blue-500/50 transition-colors">
                    <h4 className="text-xl font-bold text-white mb-1">Secondary School Leaving Certificate (SSLC)</h4>
                    <p className="text-blue-400 font-medium mb-3 flex items-center gap-1 text-sm">
                      <MapPin size={14} /> Cheran Matric Hr. Sec. School
                    </p>
                    <p className="text-gray-400 text-sm flex items-center gap-1">
                      <Calendar size={14} /> 2022 | 83%
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default About;
