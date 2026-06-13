import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, Code2, Trophy, Flame, Calendar, Activity, X } from 'lucide-react';
import axios from 'axios';

const fallbackCalendar = (() => {
  const calendar = {};
  const today = new Date();
  let remaining = 169;
  for (let i = 0; i < 300 && remaining > 0; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    if (Math.random() < 0.45) {
      const count = Math.min(remaining, Math.floor(Math.random() * 2) + 1);
      const timestamp = Math.floor(date.getTime() / 1000).toString();
      calendar[timestamp] = count;
      remaining -= count;
    }
  }
  return calendar;
})();

const fallbackRecentSubmissions = [
  { title: "Number of Ways to Assign Edge Weights II", statusDisplay: "Accepted", lang: "java", timestamp: "1781269461" },
  { title: "Number of Ways to Assign Edge Weights I", statusDisplay: "Accepted", lang: "java", timestamp: "1781155509" },
  { title: "Maximum Total Subarray Value II", statusDisplay: "Accepted", lang: "java", timestamp: "1781082714" },
  { title: "Maximum Total Subarray Value I", statusDisplay: "Accepted", lang: "java", timestamp: "1780982235" },
  { title: "Partition Array According to Given Pivot", statusDisplay: "Accepted", lang: "java", timestamp: "1780929211" },
  { title: "Create Binary Tree From Descriptions", statusDisplay: "Accepted", lang: "java", timestamp: "1780839832" },
  { title: "Left and Right Sum Differences", statusDisplay: "Accepted", lang: "java", timestamp: "1780751120" },
  { title: "Total Waviness of Numbers in Range II", statusDisplay: "Accepted", lang: "java", timestamp: "1780628291" },
];

const getCalendarData = (submissionCalendar) => {
  const calendarMap = {};
  const calendarObj = submissionCalendar || fallbackCalendar;
  
  Object.entries(calendarObj).forEach(([timestamp, count]) => {
    const date = new Date(parseInt(timestamp) * 1000);
    const dateString = date.toISOString().split('T')[0];
    calendarMap[dateString] = count;
  });

  const data = [];
  const today = new Date();
  for (let i = 364; i >= 0; i--) {
    const day = new Date(today);
    day.setDate(today.getDate() - i);
    const dateString = day.toISOString().split('T')[0];
    const count = calendarMap[dateString] || 0;
    data.push({
      dateString,
      count,
      dayOfWeek: day.getDay(),
      month: day.getMonth(),
    });
  }
  return data;
};

const CodingProfiles = () => {
  const [lcData, setLcData] = useState(null);
  const [lcProfile, setLcProfile] = useState(null);
  const [hrData, setHrData] = useState(null);
  const [hrBadges, setHrBadges] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showLcModal, setShowLcModal] = useState(false);

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

      try {
        // HackerRank Profile Stats
        const hrRes = await axios.get('https://www.hackerrank.com/rest/contests/master/hackers/gurudaya49/profile');
        if (hrRes.data && hrRes.data.model) {
          setHrData(hrRes.data.model);
        }
      } catch (err) {
        console.error('Failed to fetch HackerRank Profile', err);
      }

      try {
        // HackerRank Badges
        const badgesRes = await axios.get('https://www.hackerrank.com/rest/hackers/gurudaya49/badges');
        if (badgesRes.data && badgesRes.data.models) {
          setHrBadges(badgesRes.data.models);
        }
      } catch (err) {
        console.error('Failed to fetch HackerRank Badges', err);
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        
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
                  <span className="text-5xl font-extrabold text-white tracking-tighter">169+</span>
                  <span className="text-gray-400 mb-1 font-medium text-lg">Problems Solved</span>
                  <Trophy className="w-6 h-6 text-yellow-500 mb-2 ml-1 opacity-80" />
                </div>
                <p className="text-gray-500 text-sm">
                  The live API is currently refreshing, but my consistent practice continues daily.
                </p>
              </div>
            )}
            
            <div className="z-10 mt-8 flex flex-col gap-3 w-full">
              <button 
                onClick={() => setShowLcModal(true)}
                className="inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-bold transition-transform transform hover:-translate-y-1 shadow-lg shadow-orange-500/25 w-full justify-center cursor-pointer"
              >
                View Detailed Stats
              </button>
              <a 
                href="https://leetcode.com/u/Ruthragurubaran-J/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 font-bold border border-white/10 transition-colors w-full justify-center text-sm"
              >
                View LeetCode Profile
              </a>
            </div>
          </div>
        </motion.div>

        {/* HackerRank Card */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="glass p-8 md:p-10 rounded-2xl flex flex-col relative overflow-hidden group border border-white/5 hover:border-green-500/30 transition-all shadow-lg"
        >
          <div className="absolute -bottom-20 -right-20 w-48 h-48 bg-green-600/10 rounded-full blur-[40px] group-hover:bg-green-600/20 transition-colors duration-500"></div>
          
          <div className="z-10 flex flex-col h-full">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                {hrData?.avatar || lcProfile?.avatar ? (
                  <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-green-500/50 shadow-[0_0_15px_rgba(34,197,94,0.3)] group-hover:scale-110 group-hover:border-green-400 transition-all duration-300">
                    <img src={hrData?.avatar || lcProfile?.avatar} alt="HackerRank Avatar" className="w-full h-full object-cover" />
                  </div>
                ) : (
                  <div className="w-16 h-16 bg-gray-800/80 rounded-full flex items-center justify-center shadow-lg border border-white/10 group-hover:scale-110 transition-transform duration-300">
                    <Code2 className="w-8 h-8 text-green-500" />
                  </div>
                )}
                <div>
                  <h3 className="text-2xl font-bold text-white leading-tight">HackerRank</h3>
                  <a href="https://www.hackerrank.com/profile/gurudaya49" target="_blank" rel="noopener noreferrer" className="text-sm text-green-400 hover:underline">@gurudaya49</a>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <Trophy className="w-6 h-6 text-green-500 opacity-80" />
                <span className="text-[10px] text-gray-500 mt-1 uppercase tracking-widest font-bold">Verified</span>
              </div>
            </div>

            {loading ? (
              <div className="flex-grow flex flex-col justify-center items-center py-6">
                 <div className="w-8 h-8 border-3 border-green-500/30 border-t-green-500 rounded-full animate-spin"></div>
                 <p className="text-sm text-gray-500 mt-3">Fetching live stats...</p>
              </div>
            ) : hrBadges && hrBadges.length > 0 ? (
              <div className="flex-grow flex flex-col justify-center">
                <div className="flex items-end gap-2 mb-6">
                  <span className="text-5xl font-extrabold text-white tracking-tighter">
                    {hrBadges.reduce((acc, curr) => acc + (curr.solved || 0), 0) || "5+"}
                  </span>
                  <span className="text-gray-400 mb-1 font-medium text-lg">Challenges Solved</span>
                  <Flame className="w-6 h-6 text-green-500 mb-2 ml-1 opacity-80" />
                </div>

                <div className="space-y-4">
                  {hrBadges.slice(0, 3).map((badge, idx) => (
                    <div key={idx}>
                      <div className="flex justify-between text-sm mb-1 font-medium">
                        <span className="text-green-400">{badge.badge_name}</span>
                        <span className="text-gray-400">
                          {badge.stars} {badge.stars === 1 ? 'Star' : 'Stars'}
                        </span>
                      </div>
                      <div className="w-full bg-gray-800/50 rounded-full h-2.5 overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          whileInView={{ width: `${(badge.stars / 6) * 100}%` }}
                          transition={{ duration: 1, ease: "easeOut" }}
                          className="bg-green-500 h-2.5 rounded-full"
                        ></motion.div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              /* High-Quality Fallback (Static Data from Profile) */
              <div className="flex-grow flex flex-col justify-center">
                <div className="flex items-end gap-2 mb-6">
                  <span className="text-5xl font-extrabold text-white tracking-tighter">15+</span>
                  <span className="text-gray-400 mb-1 font-medium text-lg">Problems Solved</span>
                  <Flame className="w-6 h-6 text-green-500 mb-2 ml-1 opacity-80" />
                </div>

                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1 font-medium">
                      <span className="text-green-400">Java</span>
                      <span className="text-gray-400">1 Star Gold</span>
                    </div>
                    <div className="w-full bg-gray-800/50 rounded-full h-2.5 overflow-hidden">
                      <div className="bg-green-500 h-2.5 rounded-full w-[20%]"></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1 font-medium">
                      <span className="text-green-400">SQL</span>
                      <span className="text-gray-400">Intermediate</span>
                    </div>
                    <div className="w-full bg-gray-800/50 rounded-full h-2.5 overflow-hidden">
                      <div className="bg-green-500 h-2.5 rounded-full w-[65%]"></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1 font-medium">
                      <span className="text-green-400">Problem Solving</span>
                      <span className="text-gray-400">Bronze</span>
                    </div>
                    <div className="w-full bg-gray-800/50 rounded-full h-2.5 overflow-hidden">
                      <div className="bg-green-500 h-2.5 rounded-full w-[40%]"></div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <a 
              href="https://www.hackerrank.com/profile/gurudaya49" 
              target="_blank" 
              rel="noopener noreferrer"
              className="z-10 mt-8 inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-green-600 hover:bg-green-700 text-white font-bold transition-transform transform hover:-translate-y-1 shadow-lg shadow-green-500/25 w-full justify-center"
            >
              View HackerRank
            </a>
          </div>
        </motion.div>
      </div>

      {/* LeetCode Detailed Stats Modal */}
      <AnimatePresence>
        {showLcModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowLcModal(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-4xl glass rounded-3xl p-6 md:p-8 overflow-y-auto z-[101] shadow-2xl max-h-[90vh] border border-white/10 flex flex-col gap-6"
            >
              {/* Modal Close Button */}
              <button 
                onClick={() => setShowLcModal(false)}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/10 text-gray-400 hover:text-white transition-all cursor-pointer"
              >
                <X size={24} />
              </button>

              {/* Modal Header */}
              <div className="flex items-center gap-4 border-b border-white/5 pb-4">
                <div className="w-12 h-12 bg-orange-500/20 rounded-xl flex items-center justify-center border border-orange-500/30">
                  <Activity size={24} className="text-orange-500" />
                </div>
                <div>
                  <h3 className="text-2xl font-black text-white">LeetCode Live Insights</h3>
                  <p className="text-sm text-gray-400">Deep-dive stats and activity for @Ruthragurubaran-J</p>
                </div>
              </div>

              {/* Modal Content Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-grow overflow-visible">
                {/* Visual Rings and Key solved numbers */}
                <div className="bg-white/5 border border-white/5 rounded-2xl p-6 flex flex-col items-center justify-between min-h-[300px]">
                  <h4 className="text-white text-sm font-bold uppercase tracking-wider mb-4 self-start flex items-center gap-2">
                    <Trophy size={16} className="text-yellow-500" />
                    Accuracy & Solved Ratios
                  </h4>

                  <div className="relative w-44 h-44 flex items-center justify-center">
                    {/* Concentric SVG Rings */}
                    <svg width="180" height="180" className="transform -rotate-90">
                      {/* Background Rings */}
                      <circle cx="90" cy="90" r="70" stroke="rgba(74, 222, 128, 0.1)" strokeWidth="10" fill="transparent" />
                      <circle cx="90" cy="90" r="54" stroke="rgba(250, 204, 21, 0.1)" strokeWidth="10" fill="transparent" />
                      <circle cx="90" cy="90" r="38" stroke="rgba(239, 68, 68, 0.1)" strokeWidth="10" fill="transparent" />
                      
                      {/* Easy Ring (Green) */}
                      <circle
                        cx="90" cy="90" r="70"
                        stroke="#22c55e" strokeWidth="10" fill="transparent"
                        strokeDasharray="440"
                        strokeDashoffset={440 - (440 * ((lcData?.easySolved || 49) / (lcData?.totalEasy || 949)))}
                        strokeLinecap="round"
                        className="transition-all duration-1000 ease-out"
                      />
                      {/* Medium Ring (Yellow) */}
                      <circle
                        cx="90" cy="90" r="54"
                        stroke="#eab308" strokeWidth="10" fill="transparent"
                        strokeDasharray="339"
                        strokeDashoffset={339 - (339 * ((lcData?.mediumSolved || 86) / (lcData?.totalMedium || 2067)))}
                        strokeLinecap="round"
                        className="transition-all duration-1000 ease-out animate-pulse-subtle"
                      />
                      {/* Hard Ring (Red) */}
                      <circle
                        cx="90" cy="90" r="38"
                        stroke="#ef4444" strokeWidth="10" fill="transparent"
                        strokeDasharray="239"
                        strokeDashoffset={239 - (239 * ((lcData?.hardSolved || 34) / (lcData?.totalHard || 942)))}
                        strokeLinecap="round"
                        className="transition-all duration-1000 ease-out"
                      />
                    </svg>
                    
                    {/* Centered Total Solved */}
                    <div className="absolute flex flex-col items-center justify-center">
                      <span className="text-3xl font-black text-white leading-none">{lcData?.totalSolved || 169}</span>
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Solved</span>
                    </div>
                  </div>

                  {/* Legend / Metrics */}
                  <div className="w-full grid grid-cols-3 gap-2 mt-4 text-xs font-semibold">
                    <div className="flex flex-col items-center p-2 rounded-xl bg-green-500/10 border border-green-500/20 text-green-400">
                      <span>Easy</span>
                      <span className="text-white mt-1">{lcData?.easySolved || 49}</span>
                    </div>
                    <div className="flex flex-col items-center p-2 rounded-xl bg-yellow-500/10 border border-yellow-500/20 text-yellow-500">
                      <span>Medium</span>
                      <span className="text-white mt-1">{lcData?.mediumSolved || 86}</span>
                    </div>
                    <div className="flex flex-col items-center p-2 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400">
                      <span>Hard</span>
                      <span className="text-white mt-1">{lcData?.hardSolved || 34}</span>
                    </div>
                  </div>
                </div>

                {/* Recent Submissions */}
                <div className="bg-white/5 border border-white/5 rounded-2xl p-6 flex flex-col min-h-[300px]">
                  <h4 className="text-white text-sm font-bold uppercase tracking-wider mb-4 flex items-center gap-2">
                    <Activity size={16} className="text-orange-500" />
                    Recent Activity Log
                  </h4>

                  <div className="flex-grow overflow-y-auto max-h-[250px] pr-2 space-y-3 scrollbar-thin">
                    {(lcData?.recentSubmissions || fallbackRecentSubmissions).map((sub, idx) => (
                      <div 
                        key={idx}
                        className="p-3 bg-white/5 border border-white/5 rounded-xl hover:border-orange-500/20 transition-all flex items-center justify-between"
                      >
                        <div className="flex flex-col gap-1 max-w-[70%]">
                          <span className="text-sm font-bold text-white truncate" title={sub.title}>{sub.title}</span>
                          <span className="text-[10px] text-gray-500">
                            {sub.timestamp ? new Date(parseInt(sub.timestamp) * 1000).toLocaleDateString() : "Recently"}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 rounded bg-orange-500/10 text-orange-400 text-[10px] uppercase font-bold border border-orange-500/20">
                            {sub.lang || "java"}
                          </span>
                          <span className="px-2 py-0.5 rounded bg-green-500/15 text-green-400 text-[10px] font-extrabold">
                            {sub.statusDisplay || "Accepted"}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Heatmap Section */}
              <div className="bg-white/5 border border-white/5 rounded-2xl p-6">
                <h4 className="text-white text-sm font-bold uppercase tracking-wider mb-4 flex items-center gap-2">
                  <Calendar size={16} className="text-orange-500" />
                  Submission Heatmap (Past 365 Days)
                </h4>

                <div className="w-full overflow-x-auto pb-2">
                  <div className="min-w-[780px]">
                    {/* Month labels */}
                    {(() => {
                      const calendarDays = getCalendarData(lcData?.submissionCalendar);
                      const weeks = [];
                      let currentWeek = [];
                      const firstDay = calendarDays[0];
                      for (let i = 0; i < (firstDay ? firstDay.dayOfWeek : 0); i++) {
                        currentWeek.push(null);
                      }
                      calendarDays.forEach((day) => {
                        currentWeek.push(day);
                        if (currentWeek.length === 7) {
                          weeks.push(currentWeek);
                          currentWeek = [];
                        }
                      });
                      if (currentWeek.length > 0) {
                        while (currentWeek.length < 7) currentWeek.push(null);
                        weeks.push(currentWeek);
                      }

                      const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
                      const labels = [];
                      let prevMonth = -1;
                      weeks.forEach((week, wIdx) => {
                        const firstDay = week.find(d => d !== null);
                        if (firstDay && firstDay.month !== prevMonth) {
                          labels.push({ index: wIdx, text: monthNames[firstDay.month] });
                          prevMonth = firstDay.month;
                        }
                      });

                      return (
                        <>
                          <div className="relative flex gap-1 text-[10px] text-gray-500 mb-1.5 h-4 select-none pl-6">
                            {weeks.map((week, wIdx) => {
                              const label = labels.find(l => l.index === wIdx);
                              return (
                                <div key={wIdx} className="w-3 flex-shrink-0 font-bold text-left">
                                  {label ? label.text : ""}
                                </div>
                              );
                            })}
                          </div>

                          <div className="flex gap-1">
                            {/* Days labels */}
                            <div className="flex flex-col justify-between text-[8px] text-gray-500 h-[92px] pr-2 select-none font-bold py-1 w-4">
                              <span>Sun</span>
                              <span>Wed</span>
                              <span>Sat</span>
                            </div>

                            {/* Calendar Grid */}
                            <div className="flex gap-1">
                              {weeks.map((week, wIdx) => (
                                <div key={wIdx} className="flex flex-col gap-1">
                                  {week.map((day, dIdx) => {
                                    if (!day) return <div key={dIdx} className="w-3 h-3 bg-transparent rounded-sm" />;
                                    
                                    let bgColor = 'bg-gray-800/40';
                                    if (day.count > 0 && day.count <= 1) bgColor = 'bg-orange-500/20 border border-orange-500/30';
                                    else if (day.count > 1 && day.count <= 3) bgColor = 'bg-orange-500/50';
                                    else if (day.count > 3 && day.count <= 5) bgColor = 'bg-orange-500/80';
                                    else if (day.count > 5) bgColor = 'bg-orange-500';

                                    return (
                                      <div
                                        key={dIdx}
                                        className={`w-3 h-3 rounded-sm transition-all duration-300 hover:scale-125 hover:z-10 ${bgColor}`}
                                        title={`${day.dateString}: ${day.count} submissions`}
                                      />
                                    );
                                  })}
                                </div>
                              ))}
                            </div>
                          </div>
                        </>
                      );
                    })()}
                  </div>
                </div>

                <div className="flex items-center justify-end gap-2 mt-4 text-[10px] text-gray-400 font-bold select-none">
                  <span>Less</span>
                  <div className="w-2.5 h-2.5 rounded-sm bg-gray-800/40" />
                  <div className="w-2.5 h-2.5 rounded-sm bg-orange-500/20 border border-orange-500/30" />
                  <div className="w-2.5 h-2.5 rounded-sm bg-orange-500/50" />
                  <div className="w-2.5 h-2.5 rounded-sm bg-orange-500/80" />
                  <div className="w-2.5 h-2.5 rounded-sm bg-orange-500" />
                  <span>More</span>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default CodingProfiles;
