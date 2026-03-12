import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, ExternalLink, FolderGit2, X, CheckCircle2 } from 'lucide-react';
import { projectsData } from '../utils/data';

const FILTERS = ["All", "React", "Spring Boot", "Machine Learning", "Full-Stack", "Java"];

const Projects = () => {
  const [filter, setFilter] = useState("All");
  const [selectedProject, setSelectedProject] = useState(null);

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
          Some of the key projects I have worked on. Click on any project to see detailed features and architecture.
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
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project) => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              key={project.title}
              onClick={() => setSelectedProject(project)}
              className="glass rounded-2xl overflow-hidden group flex flex-col h-full hover:shadow-[0_0_30px_rgba(88,166,255,0.15)] border border-transparent hover:border-blue-500/30 transition-all duration-300 cursor-pointer"
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
                <div className="absolute inset-0 bg-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="bg-blue-600 text-white px-4 py-2 rounded-full text-xs font-bold scale-0 group-hover:scale-100 transition-transform">View Details</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col flex-1">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">
                    {project.title}
                  </h3>
                </div>

                <p className="text-gray-400 text-sm mb-6 flex-1 line-clamp-3">
                  {project.description}
                </p>

                {/* Tech Tags */}
                <div className="flex flex-wrap gap-2">
                  {project.technologies.slice(0, 3).map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 bg-blue-500/10 text-blue-300 text-xs font-medium rounded-md border border-blue-500/20"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 3 && (
                    <span className="text-gray-500 text-xs flex items-center">+{project.technologies.length - 3} more</span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-3xl glass rounded-3xl overflow-hidden z-[101] shadow-2xl flex flex-col md:flex-row max-h-[90vh]"
            >
              {/* Modal Banner */}
              <div className="md:w-2/5 relative h-48 md:h-auto overflow-hidden bg-gray-900">
                {selectedProject.image ? (
                  <img src={selectedProject.image} alt={selectedProject.title} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <FolderGit2 className="text-gray-700 w-24 h-24" />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-black/60 to-transparent" />
              </div>

              {/* Modal Body */}
              <div className="p-8 md:w-3/5 overflow-y-auto">
                <button 
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/10 text-gray-400 hover:text-white transition-all"
                >
                  <X size={24} />
                </button>

                <h3 className="text-3xl font-black text-white mb-4 pr-8">
                  {selectedProject.title}
                </h3>

                <div className="flex gap-4 mb-6">
                  {selectedProject.githubUrl && selectedProject.githubUrl !== '#' && (
                    <a 
                      href={selectedProject.githubUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 rounded-xl text-sm font-bold text-white transition-all border border-white/10"
                    >
                      <Github size={18} /> GitHub
                    </a>
                  )}
                  {selectedProject.liveUrl && selectedProject.liveUrl !== '#' && (
                    <a 
                      href={selectedProject.liveUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-xl text-sm font-bold text-white transition-all shadow-lg shadow-blue-600/20"
                    >
                      <ExternalLink size={18} /> Live Demo
                    </a>
                  )}
                </div>

                <div className="space-y-6">
                  <div>
                    <h4 className="text-blue-400 text-xs font-black uppercase tracking-widest mb-2">Detailed Summary</h4>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      {selectedProject.longDescription || selectedProject.description}
                    </p>
                  </div>

                  {selectedProject.features && (
                    <div>
                      <h4 className="text-blue-400 text-xs font-black uppercase tracking-widest mb-3">Key Features</h4>
                      <ul className="grid grid-cols-1 gap-2">
                        {selectedProject.features.map((feature, i) => (
                          <li key={i} className="flex items-start gap-2 text-gray-400 text-sm">
                            <CheckCircle2 size={16} className="text-blue-500 mt-0.5 flex-shrink-0" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div>
                    <h4 className="text-blue-400 text-xs font-black uppercase tracking-widest mb-3">Tech Stack</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.technologies.map((tech) => (
                        <span key={tech} className="px-3 py-1 bg-white/5 rounded-lg text-xs font-medium text-gray-300 border border-white/5">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects;
