import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { Github, Star, GitFork, BookMarked } from 'lucide-react';

const GitHubSection = () => {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const response = await axios.get(
          'https://api.github.com/users/Stark1645/repos?sort=updated&per_page=6'
        );
        setRepos(response.data);
      } catch (err) {
        setError("Failed to fetch GitHub repositories.");
      } finally {
        setLoading(false);
      }
    };
    fetchRepos();
  }, []);

  return (
    <section id="github" className="py-24 px-6 relative w-full max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4 flex items-center justify-center gap-4">
          <Github className="text-white w-10 h-10" /> 
          Latest on <span className="gradient-text">GitHub</span>
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Here is what I've been working on recently. Fetched dynamically using the GitHub API.
        </p>
      </motion.div>

      {loading ? (
        <div className="flex justify-center items-center py-12">
          <div className="w-12 h-12 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin"></div>
        </div>
      ) : error ? (
        <div className="text-center text-red-400 p-8 glass rounded-2xl">
          {error}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {repos.map((repo, index) => (
            <motion.a
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              key={repo.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ y: -5 }}
              className="glass p-6 rounded-xl hover:border-blue-500/50 transition-all block group relative overflow-hidden"
            >
              <div className="absolute -top-10 -right-10 w-24 h-24 bg-blue-500/10 rounded-full blur-[20px] group-hover:bg-blue-500/30 transition-colors"></div>
              
              <div className="flex items-start gap-3 mb-3">
                <BookMarked className="text-blue-400 mt-1 flex-shrink-0" size={20} />
                <h3 className="font-bold text-white text-lg break-all group-hover:text-blue-300 transition-colors">
                  {repo.name}
                </h3>
              </div>
              
              <p className="text-gray-400 text-sm mb-6 line-clamp-2 h-[40px]">
                {repo.description || "No description provided."}
              </p>
              
              <div className="flex items-center gap-4 text-xs font-semibold text-gray-500 mt-auto">
                <div className="flex items-center gap-1">
                  <span className="w-3 h-3 rounded-full bg-blue-500"></span>
                  {repo.language || "N/A"}
                </div>
                <div className="flex items-center gap-1 hover:text-white transition-colors">
                  <Star size={14} /> {repo.stargazers_count}
                </div>
                <div className="flex items-center gap-1 hover:text-white transition-colors">
                  <GitFork size={14} /> {repo.forks_count}
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      )}
      
      <div className="text-center mt-12">
        <a 
          href="https://github.com/Stark1645" 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-gray-800 hover:bg-gray-700 text-white font-medium transition-colors shadow-lg shadow-gray-900/50"
        >
          View Full GitHub Profile <Github size={18} />
        </a>
      </div>
    </section>
  );
};

export default GitHubSection;
