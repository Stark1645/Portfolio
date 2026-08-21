import { motion } from 'framer-motion';
import { Layout, Server, Database, Globe } from 'lucide-react';

const services = [
  {
    icon: <Layout size={24} />,
    title: "Frontend Development",
    description: "Crafting beautiful, responsive, and high-performance user interfaces using React and modern CSS.",
    color: "from-blue-500/20 to-cyan-500/20",
    border: "group-hover:border-cyan-400/40",
    glow: "bg-cyan-500/15",
    iconColor: "text-cyan-400",
  },
  {
    icon: <Server size={24} />,
    title: "Backend Development",
    description: "Building robust and scalable server-side logic and REST APIs using Spring Boot and Java.",
    color: "from-emerald-500/20 to-green-500/20",
    border: "group-hover:border-green-400/40",
    glow: "bg-green-500/15",
    iconColor: "text-green-400",
  },
  {
    icon: <Database size={24} />,
    title: "Database Design",
    description: "Architecting efficient data models and managing complex queries with MySQL and relational databases.",
    color: "from-purple-500/20 to-indigo-500/20",
    border: "group-hover:border-purple-400/40",
    glow: "bg-purple-500/15",
    iconColor: "text-purple-400",
  },
  {
    icon: <Globe size={24} />,
    title: "Full Stack Integration",
    description: "Seamlessly connecting frontend applications with backend services for a unified user experience.",
    color: "from-orange-500/20 to-amber-500/20",
    border: "group-hover:border-orange-400/40",
    glow: "bg-orange-500/15",
    iconColor: "text-orange-400",
  }
];

const WhatIDo = () => {
  return (
    <section className="py-12 md:py-20 max-w-7xl mx-auto px-4 sm:px-6 relative w-full">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-4">
          What <span className="gradient-text">I Do</span>
        </h2>
        <p className="text-secondary max-w-2xl mx-auto text-sm sm:text-base">
          Combining technical expertise with creative problem-solving to build comprehensive software solutions.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {services.map((service, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.92, y: 30 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ delay: index * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ y: -8, scale: 1.03 }}
            className={`glass p-6 sm:p-7 rounded-2xl border border-white/10 ${service.border} transition-all duration-300 group relative overflow-hidden bg-[#0d121c]/80 backdrop-blur-xl shadow-xl flex flex-col`}
          >
            {/* Dynamic Ambient Flare */}
            <div className={`absolute top-0 right-0 w-32 h-32 ${service.glow} rounded-bl-full blur-2xl translate-x-8 -translate-y-8 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-500 pointer-events-none`} />
            
            <div className={`w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center ${service.iconColor} mb-5 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 shadow-md`}>
              {service.icon}
            </div>
            
            <h3 className="text-lg font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
              {service.title}
            </h3>
            
            <p className="text-secondary text-sm leading-relaxed mt-auto">
              {service.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default WhatIDo;
