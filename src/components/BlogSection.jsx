import { motion } from 'framer-motion';
import { BookOpen, Calendar, Clock, ArrowRight } from 'lucide-react';
import { blogData } from '../utils/data';

const BlogSection = () => {
  return (
    <section id="blog" className="py-24 px-6 relative w-full max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
          Latest <span className="gradient-text">Articles</span>
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Thoughts, technical tutorials, and insights into my problem-solving process.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogData.map((blog, index) => (
          <motion.article
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            className="glass rounded-2xl overflow-hidden group flex flex-col h-full hover:shadow-[0_0_30px_rgba(88,166,255,0.15)] border border-transparent hover:border-blue-500/30 transition-all duration-300 relative"
          >
            <div className="p-8 flex flex-col flex-1 relative z-10">
              <div className="flex flex-wrap gap-2 mb-4">
                {blog.tags.map((tag, i) => (
                  <span key={i} className="text-[10px] font-bold uppercase tracking-wider text-blue-400 bg-blue-500/10 px-2 py-1 rounded-md">
                    {tag}
                  </span>
                ))}
              </div>

              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">
                {blog.title}
              </h3>
              
              <p className="text-gray-400 text-sm mb-6 flex-1">
                {blog.excerpt}
              </p>

              <div className="flex items-center justify-between text-xs text-gray-500 mt-auto pt-6 border-t border-white/5">
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1.5"><Calendar size={14} /> {blog.date}</span>
                  <span className="flex items-center gap-1.5"><Clock size={14} /> {blog.readTime}</span>
                </div>
              </div>
            </div>

            {/* Read More overlay on hover */}
            <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity" />
            <a href="#" className="absolute inset-0 z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black/40 backdrop-blur-[2px] transition-all duration-300">
              <span className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-full font-bold shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                Read Article <ArrowRight size={16} />
              </span>
            </a>
          </motion.article>
        ))}
      </div>
    </section>
  );
};

export default BlogSection;
