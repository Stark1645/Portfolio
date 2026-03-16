import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Github, Code2, Trophy, Flame } from 'lucide-react';
import axios from 'axios';

const CodingProfiles = () => {
  const [lcData, setLcData] = useState(null);
  const [lcProfile, setLcProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeetCodeData = async () => {
      setLoading(true);
      try {
        // Try the main stats API
        const statsRes = await axios.get('https://leetcode-api-faisalshohag.vercel.app/Ruthragurubaran-J');
        if (statsRes.data && statsRes.data.totalSolved) {
          setLcData(statsRes.data);
        }
      } catch (err) {
        console.error('Failed to fetch LeetCode Stats', err);
      }

      try {
        // Try the profile API for avatar
        const profileRes = await axios.get('https://alfa-leetcode-api.onrender.com/Ruthragurubaran-J');
        if (profileRes.data && !profileRes.data.error) {
          setLcProfile(profileRes.data);
        }
      } catch (err) {
        console.error('Failed to fetch LeetCode Profile', err);
      }
      
      setLoading(false);
    };
    fetchLeetCodeData();
  }, []);

  return (
    <section id="profiles" className="py-24 px-6 relative w-full max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl md:text-5xl font-extrabold text-heading mb-4">
          Coding <span className="gradient-text">Profiles</span>
        </h2>
        <p className="text-secondary max-w-2xl mx-auto text-lg mt-4">
          Where I build projects and solve algorithmic challenges.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* GitHub Card */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="glass p-10 rounded-2xl flex flex-col justify-between items-center text-center relative overflow-hidden group border border-white/5 hover:border-blue-500/30 transition-all shadow-lg"
        >
          <div className="absolute -top-20 -left-20 w-48 h-48 bg-blue-600/10 rounded-full blur-[40px] group-hover:bg-blue-600/30 transition-colors duration-500"></div>
          
          <div className="z-10 flex flex-col items-center">
            <div className="w-20 h-20 bg-gray-800/80 rounded-2xl flex items-center justify-center mb-6 shadow-xl border border-white/10 group-hover:scale-110 transition-transform duration-300">
              <Github className="w-12 h-12 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">GitHub</h3>
            <p className="text-gray-400 mb-8 max-w-sm">
              Check out my open-source projects, full-stack applications, and contribution history.
            </p>
          </div>

          <a 
            href="https://github.com/Stark1645" 
            target="_blank" 
            rel="noopener noreferrer"
            className="z-10 inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold transition-transform transform hover:-translate-y-1 shadow-lg shadow-blue-500/25 w-full justify-center"
          >
            View Profile
          </a>
        </motion.div>

        {/* LeetCode Card */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="glass p-8 md:p-10 rounded-2xl flex flex-col relative overflow-hidden group border border-white/5 hover:border-orange-500/30 transition-all shadow-lg"
        >
          <div className="absolute -bottom-20 -right-20 w-48 h-48 bg-orange-600/10 rounded-full blur-[40px] group-hover:bg-orange-600/20 transition-colors duration-500"></div>
          
          <div className="z-10 flex flex-col h-full">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                {lcProfile?.avatar ? (
                  <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-orange-500/50 shadow-[0_0_15px_rgba(249,115,22,0.3)] group-hover:scale-110 group-hover:border-orange-400 transition-all duration-300">
                    <img src={lcProfile.avatar} alt="LeetCode Avatar" className="w-full h-full object-cover" />
                  </div>
                ) : (
                  <div className="w-16 h-16 bg-gray-800/80 rounded-full flex items-center justify-center shadow-lg border border-white/10 group-hover:scale-110 transition-transform duration-300">
                    <Code2 className="w-8 h-8 text-orange-500" />
                  </div>
                )}
                <div>
                  <h3 className="text-2xl font-bold text-white leading-tight">LeetCode</h3>
                  <a href="https://leetcode.com/u/Ruthragurubaran-J/" target="_blank" rel="noopener noreferrer" className="text-sm text-orange-400 hover:underline">@Ruthragurubaran-J</a>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <span className="flex items-center gap-1 text-sm text-gray-400"><Flame className="w-4 h-4 text-orange-500" /></span>
                {lcData && <span className="text-xs font-semibold px-3 py-1 mt-2 bg-gradient-to-r from-orange-500/20 to-red-500/20 border border-orange-500/30 rounded-full text-orange-200 shadow-inner">Rank {lcData.ranking?.toLocaleString() || 'N/A'}</span>}
              </div>
            </div>

            {loading ? (
              <div className="flex-grow flex flex-col justify-center items-center py-6">
                 <div className="w-8 h-8 border-3 border-orange-500/30 border-t-orange-500 rounded-full animate-spin"></div>
                 <p className="text-sm text-gray-500 mt-3">Fetching live stats...</p>
              </div>
            ) : lcData ? (
              <div className="flex-grow flex flex-col justify-center">
                <div className="flex items-end gap-2 mb-6">
                  <span className="text-5xl font-extrabold text-white tracking-tighter">{lcData.totalSolved}</span>
                  <span className="text-gray-400 mb-1 font-medium text-lg">Problems Solved</span>
                  <Trophy className="w-6 h-6 text-yellow-500 mb-2 ml-1 opacity-80" />
                </div>

                <div className="space-y-4">
                  {/* Easy */}
                  <div>
                    <div className="flex justify-between text-sm mb-1 font-medium">
                      <span className="text-green-400">Easy</span>
                      <span className="text-gray-400">{lcData.easySolved} / <span className="text-gray-600">{lcData.totalEasy}</span></span>
                    </div>
                    <div className="w-full bg-gray-800/50 rounded-full h-2.5 overflow-hidden">
                      <div className="bg-green-500 h-2.5 rounded-full transition-all duration-1000 ease-out" style={{ width: `${(lcData.easySolved / lcData.totalEasy) * 100}%` }}></div>
                    </div>
                  </div>

                  {/* Medium */}
                  <div>
                    <div className="flex justify-between text-sm mb-1 font-medium">
                      <span className="text-yellow-400">Medium</span>
                      <span className="text-gray-400">{lcData.mediumSolved} / <span className="text-gray-600">{lcData.totalMedium}</span></span>
                    </div>
                    <div className="w-full bg-gray-800/50 rounded-full h-2.5 overflow-hidden">
                      <div className="bg-yellow-500 h-2.5 rounded-full transition-all duration-1000 ease-out" style={{ width: `${(lcData.mediumSolved / lcData.totalMedium) * 100}%` }}></div>
                    </div>
                  </div>

                  {/* Hard */}
                  <div>
                    <div className="flex justify-between text-sm mb-1 font-medium">
                      <span className="text-red-400">Hard</span>
                      <span className="text-gray-400">{lcData.hardSolved} / <span className="text-gray-600">{lcData.totalHard}</span></span>
                    </div>
                    <div className="w-full bg-gray-800/50 rounded-full h-2.5 overflow-hidden">
                      <div className="bg-red-500 h-2.5 rounded-full transition-all duration-1000 ease-out" style={{ width: `${(lcData.hardSolved / lcData.totalHard) * 100}%` }}></div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex-grow flex flex-col justify-center">
                <div className="flex items-end gap-2 mb-6">
                  <span className="text-5xl font-extrabold text-white tracking-tighter">70+</span>
                  <span className="text-gray-400 mb-1 font-medium text-lg">Problems Solved</span>
                  <Trophy className="w-6 h-6 text-yellow-500 mb-2 ml-1 opacity-80" />
                </div>
                <p className="text-gray-500 text-sm">
                  The live API is currently refreshing, but my consistent practice continues daily.
                </p>
              </div>
            )}
            
            <a 
              href="https://leetcode.com/u/Ruthragurubaran-J/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="z-10 mt-8 inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-bold transition-transform transform hover:-translate-y-1 shadow-lg shadow-orange-500/25 w-full justify-center"
            >
              View LeetCode
            </a>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default CodingProfiles;
