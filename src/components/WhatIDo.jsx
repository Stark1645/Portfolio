import { motion } from 'framer-motion';
import { Layout, Server, Database, Globe } from 'lucide-react';

const services = [
  {
    icon: <Layout size={32} />,
    title: "Frontend Development",
    description: "Crafting beautiful, responsive, and high-performance user interfaces using React and modern CSS.",
    color: "blue"
  },
  {
    icon: <Server size={32} />,
    title: "Backend Development",
    description: "Building robust and scalable server-side logic and REST APIs using Spring Boot and Java.",
    color: "green"
  },
  {
    icon: <Database size={32} />,
    title: "Database Design",
    description: "Architecting efficient data models and managing complex queries with MySQL and relational databases.",
    color: "purple"
  },
  {
    icon: <Globe size={32} />,
    title: "Full Stack Integration",
    description: "Seamlessly connecting frontend applications with backend services for a unified user experience.",
    color: "orange"
  }
];

const WhatIDo = () => {
  return (
    <section className="py-24 px-6 relative w-full max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
          What <span className="gradient-text">I Do</span>
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Combining technical expertise with creative problem-solving to build comprehensive software solutions.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {services.map((service, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="glass p-8 rounded-3xl border border-white/5 hover:border-blue-500/30 transition-all duration-500 group relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-blue-500/10 to-transparent rounded-bl-full translate-x-8 -translate-y-8 group-hover:translate-x-4 group-hover:-translate-y-4 transition-transform duration-500" />
            
            <div className="w-16 h-16 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-400 mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
              {service.icon}
            </div>
            
            <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">
              {service.title}
            </h3>
            
            <p className="text-gray-400 text-sm leading-relaxed">
              {service.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default WhatIDo;
