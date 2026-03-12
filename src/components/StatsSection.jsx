import { motion } from 'framer-motion';
import { Code2, Trophy, Clock, Zap } from 'lucide-react';

const stats = [
  {
    icon: <Trophy className="text-yellow-500" />,
    label: "LeetCode Streak",
    value: "70+",
    suffix: "Days"
  },
  {
    icon: <Code2 className="text-blue-500" />,
    label: "Projects Built",
    value: "10+",
    suffix: ""
  },
  {
    icon: <Clock className="text-purple-500" />,
    label: "Coding Hours",
    value: "1000+",
    suffix: ""
  },
  {
    icon: <Zap className="text-orange-500" />,
    label: "CGPA",
    value: "7.91",
    suffix: "/ 10"
  }
];

const StatsSection = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full max-w-6xl mx-auto px-6 py-12">
      {stats.map((stat, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 }}
          className="glass p-8 rounded-3xl border border-white/5 hover:border-blue-500/20 transition-all flex flex-col items-center text-center group"
        >
          <div className="p-4 rounded-2xl bg-white/5 mb-4 group-hover:scale-110 transition-transform">
            {stat.icon}
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-3xl md:text-4xl font-black text-white">{stat.value}</span>
            <span className="text-sm font-bold text-gray-400 capitalize">{stat.suffix}</span>
          </div>
          <span className="text-xs font-bold text-gray-500 mt-2 uppercase tracking-widest">{stat.label}</span>
        </motion.div>
      ))}
    </div>
  );
};

export default StatsSection;
