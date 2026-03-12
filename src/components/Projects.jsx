import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, ExternalLink, FolderGit2 } from 'lucide-react';
import { projectsData } from '../utils/data';

const FILTERS = ["All", "React", "Spring Boot", "Machine Learning", "Full-Stack", "Java"];

const Projects = () => {
  const [filter, setFilter] = useState("All");

  const filteredProjects = projectsData.filter((project) => {
    if (filter === "All") return true;
    return project.technologies.some(tech => tech.includes(filter) || (filter === 'Full-Stack' && tech.includes('Full-Stack')));
  });

  return (
    <section id="projects" className="py-24 px-6 relative w-full max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
          Featured <span className="gradient-text">Projects</span>
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Some of the key projects I have worked on, showcasing my skills in web development, backend systems, and artificial intelligence.
        </p>
      </motion.div>

      {/* Filter Buttons */}
      <div className="flex flex-wrap justify-center gap-3 mb-12">
        {FILTERS.map((fName) => (
          <button
            key={fName}
            onClick={() => setFilter(fName)}
            className={`px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
              filter === fName
                ? "bg-blue-600 text-white shadow-[0_0_15px_rgba(88,166,255,0.6)]"
                : "bg-gray-800/60 text-gray-400 hover:text-white hover:bg-gray-700 border border-gray-700"
            }`}
          >
            {fName}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <AnimatePresence>
          {filteredProjects.map((project, index) => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.4 }}
              key={project.title}
              className="glass rounded-2xl overflow-hidden group flex flex-col h-full hover:shadow-[0_0_30px_rgba(88,166,255,0.15)] border border-transparent hover:border-blue-500/30 transition-all duration-300"
            >
              {/* Project Image */}
              <div className="relative h-48 w-full overflow-hidden">
                {project.image ? (
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                    <FolderGit2 className="text-gray-600 group-hover:text-blue-500/50 transition-colors w-20 h-20" />
                  </div>
                )}
                <div className="absolute inset-0 bg-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col flex-1">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">
                    {project.title}
                  </h3>
                  <div className="flex gap-3">
                    {project.githubUrl && (
                      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                        <Github size={20} />
                      </a>
                    )}
                    {project.liveUrl && (
                      <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-400 transition-colors">
                        <ExternalLink size={20} />
                      </a>
                    )}
                  </div>
                </div>

                <p className="text-gray-400 text-sm mb-6 flex-1 line-clamp-4">
                  {project.description}
                </p>

                {/* Tech Tags */}
                <div className="flex flex-wrap gap-2 mt-auto">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 bg-blue-500/10 text-blue-300 text-xs font-medium rounded-md border border-blue-500/20"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
};

export default Projects;
