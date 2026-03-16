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
      try {
        const statsRes = await axios.get('https://leetcode-api-faisalshohag.vercel.app/Ruthragurubaran-J');
        setLcData(statsRes.data);
      } catch (err) {
        console.error('Failed to fetch LeetCode Stats', err);
      }

      try {
        const profileRes = await axios.get('https://alfa-leetcode-api.onrender.com/Ruthragurubaran-J');
        setLcProfile(profileRes.data);
      } catch (err) {
        console.error('Failed to fetch LeetCode Profile', err);
      }
      
      setLoading(false);
    };
    fetchLeetCodeData();
  }, []);

  return (
    <section id="profiles" className="py-24 px-6 relative w-full max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl md:text-5xl font-extrabold text-heading mb-4">
          LeetCode <span className="gradient-text">Dashboard</span>
        </h2>
        <p className="text-secondary max-w-2xl mx-auto text-lg mt-4">
          A live look into my algorithmic problem-solving journey.
        </p>
      </motion.div>

      {loading ? (
        <div className="flex flex-col justify-center items-center py-20">
          <div className="w-12 h-12 border-4 border-orange-500/30 border-t-orange-500 rounded-full animate-spin"></div>
          <p className="text-gray-400 mt-4 font-medium">Authenticating & Fetching Live Stats...</p>
        </div>
      ) : lcData ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* LEFT: Profile Overview (Matches LeetCode Left Sidebar) */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-3 glass p-6 rounded-2xl border border-white/5"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-20 h-20 rounded-xl overflow-hidden border border-white/10 shadow-lg">
                <img 
                  src={lcProfile?.avatar || "https://ui-avatars.com/api/?name=Ruthragurubaran&background=F97316&color=fff"} 
                  alt="Avatar" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Ruthragurubaran-J</h3>
                <p className="text-sm text-gray-400">@Ruthragurubaran-J</p>
              </div>
            </div>

            <div className="mb-6">
              <span className="text-sm text-gray-400 block mb-1">Rank</span>
              <span className="text-xl font-bold text-white">{lcData.ranking?.toLocaleString() || 'N/A'}</span>
            </div>

            <a 
              href="https://leetcode.com/u/Ruthragurubaran-J/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full block text-center py-2.5 bg-green-600/20 hover:bg-green-600/30 border border-green-500/50 text-green-400 font-semibold rounded-lg transition-colors mb-6"
            >
              Edit Profile
            </a>

            <div className="flex flex-col gap-3 text-sm text-gray-400">
              <div className="flex items-center gap-3">
                <Github size={18} /> 
                <a href="https://github.com/Stark1645" className="hover:text-white transition-colors" target="_blank" rel="noopener noreferrer">Stark1645</a>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-white/10">
              <h4 className="text-sm font-semibold text-white mb-4">Community Stats</h4>
              <div className="flex flex-col gap-3 text-sm">
                <div className="flex justify-between">
                  <span className="flex items-center gap-2"><Trophy size={16} className="text-yellow-500" /> Reputation</span>
                  <span className="text-white font-medium">{lcProfile?.reputation || 0}</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* MIDDLE & RIGHT: Stats, Heatmap, and Recent Submissions */}
          <div className="lg:col-span-9 flex flex-col gap-6">
            
            {/* Top Row: Solved Circular Chart & Badges */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Circular Chart Replica */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="glass p-6 rounded-2xl border border-white/5 flex flex-col justify-center relative overflow-hidden"
              >
                <div className="flex justify-between items-center w-full">
                  
                  {/* Circle */}
                  <div className="relative w-32 h-32 flex-shrink-0">
                    <svg className="w-full h-full transform -rotate-90">
                      <circle cx="64" cy="64" r="58" className="stroke-gray-800" strokeWidth="8" fill="none" />
                      <circle 
                        cx="64" cy="64" r="58" 
                        className="stroke-orange-500 drop-shadow-[0_0_8px_rgba(249,115,22,0.8)]" 
                        strokeWidth="8" fill="none" 
                        strokeDasharray="364" 
                        strokeDashoffset={364 - (364 * (lcData.totalSolved / lcData.totalQuestions))} 
                        strokeLinecap="round" 
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-3xl font-bold text-white tracking-tighter">{lcData.totalSolved}</span>
                      <span className="text-xs text-gray-500 font-semibold mb-1">Solved</span>
                    </div>
                  </div>

                  {/* Difficulty breakdown */}
                  <div className="flex flex-col gap-4 w-full pl-8">
                    <div>
                      <div className="flex justify-between text-xs mb-1 font-medium">
                        <span className="text-[#00b8a3]">Easy</span>
                        <span className="text-gray-400">{lcData.easySolved} <span className="text-gray-600">/{lcData.totalEasy}</span></span>
                      </div>
                      <div className="w-full bg-gray-800 rounded-full h-1.5 overflow-hidden">
                        <div className="bg-[#00b8a3] h-1.5 rounded-full" style={{ width: `${(lcData.easySolved / lcData.totalEasy) * 100}%` }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-xs mb-1 font-medium">
                        <span className="text-[#ffc01e]">Medium</span>
                        <span className="text-gray-400">{lcData.mediumSolved} <span className="text-gray-600">/{lcData.totalMedium}</span></span>
                      </div>
                      <div className="w-full bg-gray-800 rounded-full h-1.5 overflow-hidden">
                        <div className="bg-[#ffc01e] h-1.5 rounded-full" style={{ width: `${(lcData.mediumSolved / lcData.totalMedium) * 100}%` }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-xs mb-1 font-medium">
                        <span className="text-[#ff375f]">Hard</span>
                        <span className="text-gray-400">{lcData.hardSolved} <span className="text-gray-600">/{lcData.totalHard}</span></span>
                      </div>
                      <div className="w-full bg-gray-800 rounded-full h-1.5 overflow-hidden">
                        <div className="bg-[#ff375f] h-1.5 rounded-full" style={{ width: `${(lcData.hardSolved / lcData.totalHard) * 100}%` }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Badges / Streak Placeholder */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="glass p-6 rounded-2xl border border-white/5 flex flex-col justify-between"
              >
                <div className="flex justify-between items-start">
                  <h4 className="text-gray-400 text-sm font-semibold">Accomplishments</h4>
                  <Flame className="text-orange-500 w-5 h-5" />
                </div>
                
                <div className="flex items-center gap-4 mt-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-500/20 to-blue-500/20 border border-green-500/30 rounded-full flex justify-center items-center shadow-[0_0_15px_rgba(34,197,94,0.2)]">
                    <span className="text-green-400 font-bold text-xs text-center">50<br/>Days</span>
                  </div>
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-blue-500/30 rounded-full flex justify-center items-center">
                    <span className="text-blue-400 font-bold text-xs">Top<br/>1M</span>
                  </div>
                </div>

                <p className="text-sm text-gray-500 mt-4 font-medium relative top-2">
                  Top performer with consistent daily learning streaks!
                </p>
              </motion.div>

            </div>

            {/* Bottom Row: Recent Submissions / Activity */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="glass p-6 rounded-2xl border border-white/5"
            >
              <div className="flex items-center gap-2 mb-6 border-b border-white/10 pb-4">
                <Code2 className="text-gray-400 w-5 h-5" />
                <h4 className="text-white font-semibold flex-1">Recent Submissions</h4>
              </div>

              <div className="flex flex-col gap-0">
                {lcData.recentSubmissions && lcData.recentSubmissions.slice(0, 5).map((sub, i) => (
                  <a 
                    key={i} 
                    href={`https://leetcode.com/problems/${sub.titleSlug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex justify-between items-center py-4 hover:bg-white/5 px-3 rounded-lg transition-colors group"
                  >
                    <span className="text-sm text-gray-300 font-medium group-hover:text-blue-400 transition-colors">
                      {sub.title}
                    </span>
                    <span className="text-xs font-bold text-green-500 bg-green-500/10 px-3 py-1 rounded-full">
                      Accepted
                    </span>
                  </a>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center py-20">
          <p className="text-red-400 font-medium mb-4">Error loading live data from LeetCode.</p>
          <a href="https://leetcode.com/u/Ruthragurubaran-J/" target="_blank" rel="noopener noreferrer" className="px-6 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg">View Profile Directly</a>
        </div>
      )}
    </section>
  );
};

export default CodingProfiles;
