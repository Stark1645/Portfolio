import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Github, Star, GitFork, ExternalLink, Calendar as CalendarIcon } from 'lucide-react';
import axios from 'axios';

const GitHubActivity = () => {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const res = await axios.get('https://api.github.com/users/Stark1645/repos?sort=updated&per_page=4');
        setRepos(res.data);
      } catch (err) {
        console.error('Failed to fetch GitHub repos', err);
      } finally {
        setLoading(false);
      }
    };
    fetchRepos();
  }, []);

  return (
    <section id="github" className="py-24 px-6 relative w-full max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl md:text-5xl font-extrabold text-heading mb-4">
          Open Source <span className="gradient-text">Contributions</span>
        </h2>
        <p className="text-secondary max-w-2xl mx-auto text-lg mt-4">
          My latest project updates and daily coding activity matrix.
        </p>
      </motion.div>

      <div className="flex flex-col gap-12">
        
        {/* Contribution Graph */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass p-8 rounded-2xl border border-white/5 overflow-x-auto w-full no-scrollbar flex items-center justify-center bg-[#0d1117]"
        >
          <img 
            src={`https://ghchart.rshah.org/58a6ff/Stark1645`} 
            alt="Ruthragurubaran's GitHub Contribution Graph" 
            className="w-full max-w-4xl h-auto"
            onError={(e) => e.target.style.display = 'none'}
          />
        </motion.div>

        {/* Latest Repositories */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {loading ? (
            <div className="col-span-full flex justify-center items-center py-10">
              <div className="w-8 h-8 border-3 border-blue-500/30 border-t-blue-500 rounded-full animate-spin"></div>
            </div>
          ) : (
            repos.map((repo, i) => (
              <motion.div
                key={repo.id}
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="glass p-6 rounded-xl border border-white/5 hover:border-blue-500/30 transition-all group flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-lg font-bold text-white hover:text-blue-400 transition-colors">
                      <Github size={20} className="text-gray-400" />
                      {repo.name}
                    </a>
                  </div>
                  
                  <p className="text-gray-400 text-sm mb-6 line-clamp-2">
                    {repo.description || "No description provided for this repository."}
                  </p>
                </div>

                <div className="flex justify-between items-center text-xs text-gray-500 border-t border-white/5 pt-4">
                  <div className="flex items-center gap-4">
                    {repo.language && (
                      <span className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.6)]"></span> {repo.language}
                      </span>
                    )}
                    <span className="flex items-center gap-1 hover:text-white transition-colors"><Star size={14} /> {repo.stargazers_count}</span>
                    <span className="flex items-center gap-1 hover:text-white transition-colors"><GitFork size={14} /> {repo.forks_count}</span>
                  </div>
                  <span className="flex items-center gap-1.5"><CalendarIcon size={14} /> {new Date(repo.updated_at).toLocaleDateString()}</span>
                </div>
              </motion.div>
            ))
          )}
        </div>

      </div>
    </section>
  );
};

export default GitHubActivity;
