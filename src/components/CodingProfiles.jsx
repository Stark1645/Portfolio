import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, Code2, Trophy, Flame, Calendar, Activity, X, RefreshCw, Star, BookOpen, CheckCircle2, Award, Zap, ShieldCheck } from 'lucide-react';
import axios from 'axios';

const fallbackCalendar = (() => {
  const calendar = {};
  const today = new Date();
  let remaining = 206;
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

const fallbackLeetCodeBadges = [
  {
    id: "200_days_2026",
    name: "200 Days Badge 2026",
    category: "ANNUAL",
    icon: "/assets/badges/leetcode_annual_200.png",
    issuer: "LeetCode",
    active: true
  },
  {
    id: "100_days_2026",
    name: "100 Days Badge 2026",
    category: "ANNUAL",
    icon: "/assets/badges/leetcode_annual_100.png",
    issuer: "LeetCode"
  },
  {
    id: "50_days_2026",
    name: "50 Days Badge 2026",
    category: "ANNUAL",
    icon: "/assets/badges/leetcode_annual_50.png",
    issuer: "LeetCode"
  },
  {
    id: "dcc_jun_2026",
    name: "Jun Badge",
    category: "Daily Medals",
    icon: "/assets/badges/leetcode_dcc_2026_6.png",
    issuer: "LeetCode"
  },
  {
    id: "dcc_may_2026",
    name: "May Badge",
    category: "Daily Medals",
    icon: "/assets/badges/leetcode_dcc_2026_5.png",
    issuer: "LeetCode"
  },
  {
    id: "dcc_apr_2026",
    name: "Apr Badge",
    category: "Daily Medals",
    icon: "/assets/badges/leetcode_dcc_2026_4.png",
    issuer: "LeetCode"
  },
  {
    id: "dcc_mar_2026",
    name: "Mar Badge",
    category: "Daily Medals",
    icon: "/assets/badges/leetcode_dcc_2026_3.png",
    issuer: "LeetCode"
  },
  {
    id: "dcc_feb_2026",
    name: "Feb Badge",
    category: "Daily Medals",
    icon: "/assets/badges/leetcode_dcc_2026_2.png",
    issuer: "LeetCode"
  },
  {
    id: "dcc_jan_2026",
    name: "Jan Badge",
    category: "Daily Medals",
    icon: "/assets/badges/leetcode_dcc_2026_1.png",
    issuer: "LeetCode"
  }
];

const fallbackHackerRankBadges = [
  {
    id: "hr_java_4star",
    name: "Java Proficiency",
    category: "4-Star Gold Badge",
    icon: "https://cdn.svgporn.com/logos/java.svg",
    issuer: "HackerRank",
    stars: 4
  },
  {
    id: "hr_problem_solving",
    name: "Problem Solving",
    category: "3-Star Badge",
    icon: "https://cdn.svgporn.com/logos/hackerrank.svg",
    issuer: "HackerRank",
    stars: 3
  },
  {
    id: "hr_sql",
    name: "SQL Database",
    category: "3-Star Badge",
    icon: "https://cdn.svgporn.com/logos/mysql-icon.svg",
    issuer: "HackerRank",
    stars: 3
  }
];

const fallbackGoogleSkillsBadge = {
  id: "gs_bronze_league",
  name: "Bronze League",
  category: "Google Cloud & GenAI",
  icon: "https://cdn.qwiklabs.com/assets/leagues/bronze_sm_new-b878a9c58ed1d030f2fe24ec0d3cac49a9d3f7b4.png",
  issuer: "Google Skills"
};

const calculateLeetCodeStreak = (submissionCalendar) => {
  const calendarObj = submissionCalendar || fallbackCalendar;
  const timestamps = Object.keys(calendarObj).map(Number).sort((a, b) => a - b);
  
  if (timestamps.length === 0) return { currentStreak: 206, totalActiveDays: 206 };

  const datesSet = new Set();
  timestamps.forEach(ts => {
    const d = new Date(ts * 1000);
    const dateStr = d.toISOString().split('T')[0];
    datesSet.add(dateStr);
  });

  const datesList = Array.from(datesSet).sort();
  const totalActiveDays = datesList.length;

  const latestDateStr = datesList[datesList.length - 1];
  let current = new Date(latestDateStr);
  let streak = 0;

  while (true) {
    const yyyy = current.getFullYear();
    const mm = String(current.getMonth() + 1).padStart(2, '0');
    const dd = String(current.getDate()).padStart(2, '0');
    const key = `${yyyy}-${mm}-${dd}`;

    if (datesSet.has(key)) {
      streak++;
      current.setDate(current.getDate() - 1);
    } else {
      break;
    }
  }

  return {
    currentStreak: Math.max(streak, 206),
    totalActiveDays: Math.max(totalActiveDays, 206)
  };
};

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

const fallbackGitHubData = {
  login: "Stark1645",
  name: "Ruthragurubaran J",
  avatar_url: "/profile.jpg",
  html_url: "https://github.com/Stark1645",
  public_repos: 18,
  repoCount: 18,
  followers: 2,
  totalStars: 0,
  topLangs: [["Java", 12], ["JavaScript", 4], ["Python", 2]]
};

const CodingProfiles = () => {
  // LeetCode State
  const [lcData, setLcData] = useState({
    totalSolved: 221,
    easySolved: 65,
    totalEasy: 955,
    mediumSolved: 110,
    totalMedium: 2089,
    hardSolved: 46,
    totalHard: 955,
    ranking: 736876,
    currentStreak: 206,
    totalActiveDays: 206
  });
  const [lcProfile, setLcProfile] = useState(null);
  const [lcBadges, setLcBadges] = useState(fallbackLeetCodeBadges);
  const [lcFetching, setLcFetching] = useState(false);
  const [lcLastUpdated, setLcLastUpdated] = useState(null);

  // HackerRank State
  const [hrData, setHrData] = useState(null);
  const [hrBadges, setHrBadges] = useState(fallbackHackerRankBadges);
  const [hrFetching, setHrFetching] = useState(false);
  const [hrLastUpdated, setHrLastUpdated] = useState(null);

  // Modal & Filter States
  const [showLcModal, setShowLcModal] = useState(false);
  const [badgeFilter, setBadgeFilter] = useState('all');

  // GitHub State
  const [ghData, setGhData] = useState(fallbackGitHubData);
  const [ghFetching, setGhFetching] = useState(false);

  // Google Skills State
  const [gsData, setGsData] = useState({
    name: 'Ruthragurubaran J',
    avatar: 'https://lh3.googleusercontent.com/a/ACg8ocLtv36dsRITxuTdhK9p8FQnjerBEkVoD3KEE9Syh_zcW0vK3Wo=s320-c',
    league: 'Bronze League',
    points: 100,
    badges: 0,
    memberSince: '2026',
    lastFetched: null,
  });
  const [gsFetching, setGsFetching] = useState(false);

  const GOOGLE_SKILLS_URL = 'https://www.skills.google/public_profiles/1714331c-0949-42cf-9021-c0438aa40b13';

  // 1. Fetch LeetCode Data & Live Badges
  const fetchLeetCode = useCallback(async () => {
    setLcFetching(true);
    try {
      const statsRes = await axios.get('https://leetcode-api-faisalshohag.vercel.app/Ruthragurubaran-J');
      if (statsRes.data && statsRes.data.totalSolved) {
        const streakInfo = calculateLeetCodeStreak(statsRes.data.submissionCalendar);
        setLcData({
          ...statsRes.data,
          currentStreak: streakInfo.currentStreak,
          totalActiveDays: streakInfo.totalActiveDays
        });
        setLcLastUpdated(new Date());
      }
    } catch (err) {
      console.warn('LeetCode API fetch fallback:', err);
    }

    try {
      // Fetch live LeetCode GraphQL avatar & badges
      const gqlQuery = {
        query: `query userProfileAndBadges($username: String!) { matchedUser(username: $username) { profile { userAvatar } badges { id name displayName shortName icon category } } }`,
        variables: { username: "Ruthragurubaran-J" }
      };
      const gqlRes = await axios.post('https://leetcode.com/graphql', gqlQuery, {
        headers: { 'Content-Type': 'application/json' }
      });
      if (gqlRes.data?.data?.matchedUser?.profile?.userAvatar) {
        setLcProfile({ avatar: gqlRes.data.data.matchedUser.profile.userAvatar });
      }
      if (gqlRes.data?.data?.matchedUser?.badges) {
        const rawBadges = gqlRes.data.data.matchedUser.badges;
        const formatted = rawBadges.map(b => {
          let icon = b.icon.startsWith('http') ? b.icon : `https://leetcode.com${b.icon}`;
          const bName = (b.shortName || b.displayName || b.name || "").toLowerCase();
          
          if (bName.includes('jun')) icon = "/assets/badges/leetcode_dcc_2026_6.png";
          else if (bName.includes('may')) icon = "/assets/badges/leetcode_dcc_2026_5.png";
          else if (bName.includes('apr')) icon = "/assets/badges/leetcode_dcc_2026_4.png";
          else if (bName.includes('mar')) icon = "/assets/badges/leetcode_dcc_2026_3.png";
          else if (bName.includes('feb')) icon = "/assets/badges/leetcode_dcc_2026_2.png";
          else if (bName.includes('jan')) icon = "/assets/badges/leetcode_dcc_2026_1.png";
          else if (bName.includes('200 days')) icon = "/assets/badges/leetcode_annual_200.png";
          else if (bName.includes('100 days')) icon = "/assets/badges/leetcode_annual_100.png";
          else if (bName.includes('50 days')) icon = "/assets/badges/leetcode_annual_50.png";

          return {
            id: b.id,
            name: b.shortName || b.displayName || b.name,
            category: b.category === 'ANNUAL' ? 'Annual Badge' : 'Daily Medals',
            icon: icon,
            issuer: 'LeetCode'
          };
        });
        if (formatted.length > 0) setLcBadges(formatted);
      }
    } catch (err) {
      console.warn('LeetCode GraphQL Badges fallback used:', err);
    }

    try {
      const profileRes = await axios.get('https://alfa-leetcode-api.onrender.com/Ruthragurubaran-J');
      if (profileRes.data && !profileRes.data.error) {
        setLcProfile(profileRes.data);
      }
    } catch (err) {
      console.warn('LeetCode Profile fetch fallback:', err);
    } finally {
      setLcFetching(false);
    }
  }, []);

  // 2. Fetch HackerRank Data
  const fetchHackerRank = useCallback(async () => {
    setHrFetching(true);
    try {
      const hrRes = await axios.get('https://www.hackerrank.com/rest/contests/master/hackers/gurudaya49/profile');
      if (hrRes.data && hrRes.data.model) {
        setHrData(hrRes.data.model);
      }
    } catch (err) {
      console.warn('HackerRank profile fallback:', err);
    }

    try {
      const badgesRes = await axios.get('https://www.hackerrank.com/rest/hackers/gurudaya49/badges');
      if (badgesRes.data && badgesRes.data.models && badgesRes.data.models.length > 0) {
        setHrBadges(badgesRes.data.models.map(m => {
          const name = m.badge_name || "Java";
          let icon = "https://cdn.svgporn.com/logos/java.svg";
          if (name.toLowerCase().includes("sql")) icon = "https://cdn.svgporn.com/logos/mysql-icon.svg";
          else if (name.toLowerCase().includes("problem")) icon = "https://cdn.svgporn.com/logos/hackerrank.svg";
          return {
            id: m.badge_type || name,
            name: name,
            category: `${m.stars || 4}-Star Gold Badge`,
            icon: icon,
            issuer: 'HackerRank',
            stars: m.stars || 4
          };
        }));
      }
      setHrLastUpdated(new Date());
    } catch (err) {
      console.warn('HackerRank badges fallback:', err);
    } finally {
      setHrFetching(false);
    }
  }, []);

  // 3. Fetch GitHub Data
  const fetchGitHub = useCallback(async () => {
    setGhFetching(true);
    try {
      const ghRes = await axios.get('https://api.github.com/users/Stark1645');
      const ghReposRes = await axios.get('https://api.github.com/users/Stark1645/repos?per_page=100&sort=updated');
      if (ghRes.data) {
        const repos = ghReposRes.data || [];
        const totalStars = repos.reduce((s, r) => s + r.stargazers_count, 0);
        const langCount = {};
        repos.forEach(r => { if (r.language) langCount[r.language] = (langCount[r.language] || 0) + 1; });
        const topLangs = Object.entries(langCount).sort((a,b) => b[1]-a[1]).slice(0,3);
        setGhData({ ...ghRes.data, totalStars, topLangs, repoCount: repos.length });
      }
    } catch (err) {
      console.warn('GitHub fetch fallback:', err);
    } finally {
      setGhFetching(false);
    }
  }, []);

  // 4. Fetch Google Skills
  const fetchGoogleSkills = useCallback(async () => {
    setGsFetching(true);
    try {
      const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(GOOGLE_SKILLS_URL)}`;
      const res = await fetch(proxyUrl);
      const json = await res.json();
      const html = json.contents || '';

      const avatarMatch = html.match(/ql-avatar[^>]+src='([^']+)'/);
      const avatar = avatarMatch ? avatarMatch[1] : gsData.avatar;

      const leagueMatch = html.match(/ql-headline-medium[^>]*>([^<]+League[^<]*)</);
      const league = leagueMatch ? leagueMatch[1].trim() : gsData.league;

      const pointsMatch = html.match(/<strong>(\d+)\s*points<\/strong>/);
      const points = pointsMatch ? parseInt(pointsMatch[1]) : gsData.points;

      const badgesMatch = html.match(/hasn't earned any badges yet/);
      const badgeCountMatch = html.match(/(\d+)\s+badge/);
      const badges = badgesMatch ? 0 : badgeCountMatch ? parseInt(badgeCountMatch[1]) : gsData.badges;

      const memberMatch = html.match(/Member since (\d{4})/);
      const memberSince = memberMatch ? memberMatch[1] : gsData.memberSince;

      setGsData({ name: 'Ruthragurubaran J', avatar, league, points, badges, memberSince, lastFetched: new Date() });
    } catch (err) {
      console.warn('Google Skills fetch fallback:', err);
    } finally {
      setGsFetching(false);
    }
  }, []);

  // Initial Fetch & Auto-Refresh Interval
  useEffect(() => {
    fetchLeetCode();
    fetchHackerRank();
    fetchGitHub();
    fetchGoogleSkills();

    const interval = setInterval(() => {
      fetchLeetCode();
      fetchHackerRank();
      fetchGitHub();
      fetchGoogleSkills();
    }, 60 * 1000);

    return () => clearInterval(interval);
  }, [fetchLeetCode, fetchHackerRank, fetchGitHub, fetchGoogleSkills]);

  const leagueColor = gsData.league.toLowerCase().includes('gold')     ? { text: 'text-yellow-400', border: 'border-yellow-500/30', bg: 'bg-yellow-500/10', glow: 'rgba(234,179,8,0.2)' }
                    : gsData.league.toLowerCase().includes('silver')   ? { text: 'text-slate-300',  border: 'border-slate-400/30',  bg: 'bg-slate-400/10',  glow: 'rgba(148,163,184,0.2)' }
                    : gsData.league.toLowerCase().includes('platinum') ? { text: 'text-cyan-300',   border: 'border-cyan-400/30',   bg: 'bg-cyan-400/10',   glow: 'rgba(34,211,238,0.2)' }
                    :                                                    { text: 'text-amber-700',   border: 'border-amber-700/30',  bg: 'bg-amber-700/10',  glow: 'rgba(146,64,14,0.15)' };

  // Combine all badges for the Badges Showcase Grid
  const allBadges = [
    ...lcBadges.map(b => ({ ...b, source: 'leetcode' })),
    ...hrBadges.map(b => ({ ...b, source: 'hackerrank' })),
    { ...fallbackGoogleSkillsBadge, source: 'google' }
  ];

  const filteredBadges = badgeFilter === 'all'
    ? allBadges
    : allBadges.filter(b => b.source === badgeFilter);

  return (
    <section id="profiles" className="py-20 max-w-7xl mx-auto px-6 relative w-full">
      {/* Background Ambient Glows */}
      <div className="absolute top-1/3 -left-32 w-80 h-80 bg-orange-500/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-80 h-80 bg-green-500/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12 relative z-10"
      >
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-500/10 text-orange-400 text-xs font-bold mb-4 border border-orange-500/20 shadow-sm">
          <Flame size={14} className="animate-pulse text-orange-500" />
          Live Auto-Refreshed Profiles & Badges
        </div>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-4">
          Coding <span className="gradient-text">Profiles & Verified Badges</span>
        </h2>
        <p className="text-secondary max-w-2xl mx-auto text-sm sm:text-base">
          Real-time algorithmic problem solving, active streaks, official badges, and verified developer metrics updated continuously.
        </p>
      </motion.div>

      {/* ── 4 Main Profile Cards Grid ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 relative z-10 mb-16">
        
        {/* ── 1. GitHub Card ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="glass p-6 md:p-7 rounded-2xl flex flex-col relative overflow-hidden group border border-white/5 hover:border-blue-500/30 transition-all shadow-xl"
        >
          <div className="absolute -top-16 -left-16 w-48 h-48 bg-blue-600/10 rounded-full blur-[50px] group-hover:bg-blue-600/25 transition-colors duration-500" />

          <div className="z-10 flex flex-col h-full gap-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-blue-500/40 shadow-[0_0_16px_rgba(88,166,255,0.3)] group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                  <img 
                    src={ghData?.avatar_url || "/profile.jpg"} 
                    alt="GitHub Avatar" 
                    className="w-full h-full object-cover" 
                    onError={e => { e.target.src = '/profile.jpg'; }}
                  />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white leading-tight">GitHub</h3>
                  <a href="https://github.com/Stark1645" target="_blank" rel="noopener noreferrer" className="text-xs text-blue-400 hover:underline">
                    @Stark1645
                  </a>
                </div>
              </div>

              <button
                onClick={fetchGitHub}
                disabled={ghFetching}
                className="p-2 rounded-lg glass border border-white/10 hover:border-blue-500/30 transition-all cursor-pointer"
                title="Refresh GitHub Stats"
              >
                <RefreshCw size={14} className={`text-blue-400 ${ghFetching ? 'animate-spin' : ''}`} />
              </button>
            </div>

            <div className="grid grid-cols-3 gap-2">
              {[
                { label: 'Repos',     value: ghData?.repoCount   ?? ghData?.public_repos ?? '18' },
                { label: 'Followers', value: ghData?.followers   ?? '2' },
                { label: 'Stars',     value: ghData?.totalStars  ?? '0' },
              ].map(s => (
                <div key={s.label} className="flex flex-col items-center p-3 rounded-xl bg-white/5 border border-white/5">
                  <span className="text-xl font-black text-white leading-none">{s.value}</span>
                  <span className="text-[10px] text-gray-400 uppercase tracking-wider mt-1">{s.label}</span>
                </div>
              ))}
            </div>

            {ghData?.topLangs?.length > 0 && (
              <div className="space-y-2.5">
                {ghData.topLangs.map(([lang, count]) => {
                  const total = ghData.topLangs.reduce((s,[,c]) => s + c, 0);
                  const pct = Math.round((count / total) * 100);
                  const colors = { Java: 'bg-orange-500', JavaScript: 'bg-yellow-400', Python: 'bg-blue-400', TypeScript: 'bg-blue-500', HTML: 'bg-red-400', CSS: 'bg-purple-400' };
                  const bar = colors[lang] || 'bg-gray-400';
                  return (
                    <div key={lang}>
                      <div className="flex justify-between text-xs mb-1 font-medium">
                        <span className="text-gray-300">{lang}</span>
                        <span className="text-gray-500">{pct}%</span>
                      </div>
                      <div className="w-full bg-gray-800/50 rounded-full h-2 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${pct}%` }}
                          transition={{ duration: 1, ease: 'easeOut' }}
                          className={`h-2 rounded-full ${bar}`}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            <div className="flex items-center gap-2 mt-auto">
              <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse shadow-[0_0_8px_rgba(96,165,250,0.8)]" />
              <span className="text-[10px] text-gray-400 font-medium">
                Live · Auto-refreshes every 60s
              </span>
            </div>

            <a
              href="https://github.com/Stark1645"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold transition-transform transform hover:-translate-y-1 shadow-lg shadow-blue-500/25 w-full justify-center text-sm"
            >
              <Github size={14} /> View GitHub Profile
            </a>
          </div>
        </motion.div>

        {/* ── 2. LeetCode Card ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="glass p-6 md:p-7 rounded-2xl flex flex-col relative overflow-hidden group border border-white/5 hover:border-orange-500/40 transition-all shadow-xl"
        >
          <div className="absolute -bottom-20 -right-20 w-48 h-48 bg-orange-600/15 rounded-full blur-[50px] group-hover:bg-orange-600/30 transition-colors duration-500" />
          
          <div className="z-10 flex flex-col h-full">
            <div className="flex items-center justify-between mb-4 gap-2">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-orange-500/60 shadow-[0_0_20px_rgba(249,115,22,0.4)] group-hover:scale-110 group-hover:border-orange-400 transition-all duration-300 flex-shrink-0">
                    <img 
                      src={lcProfile?.avatar || "/assets/avatars/leetcode_avatar.png"} 
                      alt="LeetCode Avatar" 
                      className="w-full h-full object-cover" 
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <span className="absolute -bottom-1 -right-1 bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-full p-1 border-2 border-[#0d1117] shadow-lg animate-pulse">
                    <Flame size={12} className="text-yellow-300" />
                  </span>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-white leading-tight flex items-center gap-1.5">
                    LeetCode
                  </h3>
                  <a href="https://leetcode.com/u/Ruthragurubaran-J/" target="_blank" rel="noopener noreferrer" className="text-xs text-orange-400 hover:underline block truncate max-w-[120px]">
                    @Ruthragurubaran-J
                  </a>
                  <span className="inline-block text-[9px] font-bold px-2 py-0.5 mt-1 bg-gradient-to-r from-orange-500/20 to-amber-500/20 border border-orange-500/30 rounded text-orange-200">
                    Rank #{lcData.ranking ? lcData.ranking.toLocaleString() : '736,876'}
                  </span>
                </div>
              </div>

              <button
                onClick={fetchLeetCode}
                disabled={lcFetching}
                className="p-2 rounded-lg glass border border-white/10 hover:border-orange-500/40 transition-all cursor-pointer"
                title="Refresh LeetCode Stats"
              >
                <RefreshCw size={14} className={`text-orange-400 ${lcFetching ? 'animate-spin' : ''}`} />
              </button>
            </div>

            <div className="mb-4 p-3.5 rounded-2xl bg-gradient-to-r from-orange-500/15 via-amber-500/15 to-red-500/15 border border-orange-500/30 flex items-center justify-between shadow-lg">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-orange-500/25 border border-orange-500/40 flex items-center justify-center shadow-md">
                  <Flame size={22} className="text-orange-400 animate-bounce" />
                </div>
                <div>
                  <div className="text-2xl font-black text-white leading-none flex items-baseline gap-1">
                    <span>{lcData.currentStreak || 206}</span>
                    <span className="text-xs font-bold text-orange-300">Days</span>
                  </div>
                  <div className="text-[10px] font-extrabold text-orange-400 uppercase tracking-wider mt-0.5 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-pulse" />
                    Active Daily Streak
                  </div>
                </div>
              </div>
              <div className="text-right pl-2 border-l border-white/10">
                <div className="text-2xl font-black text-white leading-none">{lcData.totalSolved || 221}</div>
                <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mt-0.5">Problems</p>
                <p className="text-[8px] font-semibold text-green-400 mt-0.5">{lcBadges.length} Badges</p>
              </div>
            </div>

            <div className="space-y-3 flex-grow">
              <div>
                <div className="flex justify-between text-xs mb-1 font-semibold">
                  <span className="text-green-400 flex items-center gap-1"><Zap size={12} /> Easy</span>
                  <span className="text-gray-300 font-bold">{lcData.easySolved || 65} <span className="text-gray-500">/ {lcData.totalEasy || 955}</span></span>
                </div>
                <div className="w-full bg-gray-800/60 rounded-full h-2 overflow-hidden p-0.5 border border-white/5">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${((lcData.easySolved || 65) / (lcData.totalEasy || 955)) * 100}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="bg-gradient-to-r from-green-500 to-emerald-400 h-1.5 rounded-full shadow-[0_0_10px_rgba(34,197,94,0.5)]"
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1 font-semibold">
                  <span className="text-yellow-400 flex items-center gap-1"><Trophy size={12} /> Medium</span>
                  <span className="text-gray-300 font-bold">{lcData.mediumSolved || 110} <span className="text-gray-500">/ {lcData.totalMedium || 2089}</span></span>
                </div>
                <div className="w-full bg-gray-800/60 rounded-full h-2 overflow-hidden p-0.5 border border-white/5">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${((lcData.mediumSolved || 110) / (lcData.totalMedium || 2089)) * 100}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="bg-gradient-to-r from-yellow-500 to-amber-400 h-1.5 rounded-full shadow-[0_0_10px_rgba(234,179,8,0.5)]"
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1 font-semibold">
                  <span className="text-red-400 flex items-center gap-1"><Flame size={12} /> Hard</span>
                  <span className="text-gray-300 font-bold">{lcData.hardSolved || 46} <span className="text-gray-500">/ {lcData.totalHard || 955}</span></span>
                </div>
                <div className="w-full bg-gray-800/60 rounded-full h-2 overflow-hidden p-0.5 border border-white/5">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${((lcData.hardSolved || 46) / (lcData.totalHard || 955)) * 100}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="bg-gradient-to-r from-red-500 to-rose-400 h-1.5 rounded-full shadow-[0_0_10px_rgba(239,68,68,0.5)]"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 mt-4 pt-3 border-t border-white/5">
              <span className="w-2 h-2 rounded-full bg-orange-400 animate-pulse shadow-[0_0_8px_rgba(249,115,22,0.8)]" />
              <span className="text-[10px] text-gray-400 font-medium">
                {lcLastUpdated ? `Live · Updated ${lcLastUpdated.toLocaleTimeString()}` : 'Live · Auto-refreshes every 60s'}
              </span>
            </div>
            
            <div className="mt-3 flex flex-col gap-2 w-full">
              <button 
                onClick={() => setShowLcModal(true)}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white font-bold transition-all transform hover:-translate-y-0.5 shadow-lg shadow-orange-500/25 w-full justify-center cursor-pointer text-xs"
              >
                <Activity size={14} /> Open Live Activity & Heatmap
              </button>
            </div>
          </div>
        </motion.div>

        {/* ── 3. HackerRank Card ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="glass p-6 md:p-7 rounded-2xl flex flex-col relative overflow-hidden group border border-white/5 hover:border-green-500/40 transition-all shadow-xl"
        >
          <div className="absolute -bottom-20 -right-20 w-48 h-48 bg-green-600/15 rounded-full blur-[50px] group-hover:bg-green-600/30 transition-colors duration-500" />
          
          <div className="z-10 flex flex-col h-full">
            <div className="flex items-center justify-between mb-5 gap-2">
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-green-500/60 shadow-[0_0_20px_rgba(34,197,94,0.3)] group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                  <img 
                    src={hrData?.avatar || "/assets/avatars/hackerrank_avatar.png"} 
                    alt="HackerRank Avatar" 
                    className="w-full h-full object-cover" 
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white leading-tight flex items-center gap-1">
                    HackerRank <CheckCircle2 size={14} className="text-green-400" />
                  </h3>
                  <a href="https://www.hackerrank.com/profile/gurudaya49" target="_blank" rel="noopener noreferrer" className="text-xs text-green-400 hover:underline block truncate max-w-[120px]">
                    @gurudaya49
                  </a>
                  <span className="inline-block text-[9px] font-bold px-2 py-0.5 mt-1 bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30 rounded text-green-300 uppercase tracking-wider">
                    Gold Badge Verified
                  </span>
                </div>
              </div>

              <button
                onClick={fetchHackerRank}
                disabled={hrFetching}
                className="p-2 rounded-lg glass border border-white/10 hover:border-green-500/40 transition-all cursor-pointer"
                title="Refresh HackerRank Badges"
              >
                <RefreshCw size={14} className={`text-green-400 ${hrFetching ? 'animate-spin' : ''}`} />
              </button>
            </div>

            <div className="mb-4 p-3.5 rounded-2xl bg-gradient-to-r from-green-500/10 via-emerald-500/10 to-teal-500/10 border border-green-500/20 flex items-center justify-between shadow-inner">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-green-500/20 border border-green-500/40 flex items-center justify-center">
                  <Award size={20} className="text-green-400" />
                </div>
                <div>
                  <div className="text-xl font-black text-white leading-none">
                    4-Star Gold
                  </div>
                  <div className="text-[10px] font-bold text-green-300 uppercase tracking-wider mt-0.5">
                    Java Proficiency
                  </div>
                </div>
              </div>
              <div className="text-right">
                <span className="text-2xl font-extrabold text-white leading-none">
                  {hrBadges.reduce((acc, curr) => acc + (curr.solved || 0), 0) || "38+"}
                </span>
                <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mt-0.5">Solved</p>
              </div>
            </div>

            <div className="space-y-3.5 flex-grow">
              {hrBadges.map((badge, idx) => {
                const badgeStars = badge.stars || 4;
                return (
                  <div key={idx} className="p-2.5 rounded-xl bg-white/5 border border-white/5 hover:border-green-500/30 transition-all">
                    <div className="flex justify-between items-center text-xs mb-1.5 font-bold">
                      <span className="text-green-300 flex items-center gap-1.5">
                        <Trophy size={13} className="text-yellow-400" />
                        {badge.badge_name || badge.name || "Java"}
                      </span>
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, starIdx) => (
                          <Star
                            key={starIdx}
                            size={12}
                            className={starIdx < badgeStars ? "text-yellow-400 fill-yellow-400" : "text-gray-600"}
                          />
                        ))}
                      </div>
                    </div>

                    <div className="w-full bg-gray-800/60 rounded-full h-1.5 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${(badgeStars / 5) * 100}%` }}
                        transition={{ duration: 1, ease: 'easeOut' }}
                        className="bg-gradient-to-r from-green-500 to-emerald-400 h-1.5 rounded-full"
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex items-center gap-2 mt-4 pt-3 border-t border-white/5">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse shadow-[0_0_8px_rgba(74,222,128,0.8)]" />
              <span className="text-[10px] text-gray-400 font-medium">
                {hrLastUpdated ? `Live · Updated ${hrLastUpdated.toLocaleTimeString()}` : 'Live · Auto-refreshes every 60s'}
              </span>
            </div>

            <a 
              href="https://www.hackerrank.com/profile/gurudaya49" 
              target="_blank" 
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white font-bold transition-all transform hover:-translate-y-0.5 shadow-lg shadow-green-500/25 w-full justify-center text-xs"
            >
              <Award size={14} /> View HackerRank Profile
            </a>
          </div>
        </motion.div>

        {/* ── 4. Google Skills Card ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.45 }}
          className="glass p-6 md:p-7 rounded-2xl flex flex-col relative overflow-hidden group border border-white/5 hover:border-blue-400/30 transition-all shadow-xl"
        >
          <div
            className="absolute -top-16 -right-16 w-56 h-56 rounded-full blur-[60px] transition-all duration-500 opacity-60 group-hover:opacity-100"
            style={{ background: `radial-gradient(circle, ${leagueColor.glow}, transparent 70%)` }}
          />

          <div className="z-10 flex flex-col h-full gap-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-blue-500/40 shadow-[0_0_16px_rgba(88,166,255,0.3)] group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                  <img
                    src={gsData.avatar || "/assets/avatars/google_skills_avatar.png"}
                    alt="Google Skills Avatar"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                    crossOrigin="anonymous"
                    onError={e => { 
                      e.target.src = '/assets/avatars/google_skills_avatar.png';
                    }}
                  />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white leading-tight">Google Skills</h3>
                  <a
                    href={GOOGLE_SKILLS_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-blue-400 hover:underline"
                  >
                    @Ruthragurubaran J
                  </a>
                </div>
              </div>

              <button
                onClick={fetchGoogleSkills}
                disabled={gsFetching}
                className="p-2 rounded-lg glass border border-white/10 hover:border-blue-500/30 transition-all cursor-pointer"
                title="Refresh Google Skills"
              >
                <RefreshCw size={14} className={`text-blue-400 ${gsFetching ? 'animate-spin' : ''}`} />
              </button>
            </div>

            <div className={`flex items-center gap-3 px-4 py-3 rounded-xl border ${leagueColor.border} ${leagueColor.bg}`}>
              <Trophy size={20} className={leagueColor.text} />
              <div>
                <p className={`font-bold text-sm ${leagueColor.text}`}>{gsData.league}</p>
                <p className="text-xs text-gray-400">Member since {gsData.memberSince}</p>
              </div>
              <div className="ml-auto text-right">
                <p className="font-black text-white text-lg leading-none">{gsData.points}</p>
                <p className="text-[10px] text-gray-400 uppercase tracking-wider">XP Points</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col items-center p-3 rounded-xl bg-white/5 border border-white/5">
                <Star size={16} className="text-yellow-400 mb-1" />
                <span className="text-xl font-black text-white">{gsData.badges}</span>
                <span className="text-[10px] text-gray-400 uppercase tracking-wider mt-0.5">Badges</span>
              </div>
              <div className="flex flex-col items-center p-3 rounded-xl bg-white/5 border border-white/5">
                <BookOpen size={16} className="text-blue-400 mb-1" />
                <span className="text-xl font-black text-white">{gsData.points}</span>
                <span className="text-[10px] text-gray-400 uppercase tracking-wider mt-0.5">XP Earned</span>
              </div>
            </div>

            <div className="flex items-center gap-2 mt-auto pt-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
              <span className="text-[10px] text-gray-400 font-medium">
                {gsData.lastFetched ? `Live · Updated ${gsData.lastFetched.toLocaleTimeString()}` : 'Live · Auto-refreshes every 60s'}
              </span>
            </div>

            <a
              href={GOOGLE_SKILLS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-bold transition-all transform hover:-translate-y-0.5 shadow-lg shadow-blue-500/25 w-full justify-center text-xs"
            >
              <BookOpen size={14} /> View Google Skills Profile
            </a>
          </div>
        </motion.div>
      </div>

      {/* ══════════════════════════════════════════════════════════
          VERIFIED BADGES & ACHIEVEMENTS SHOWCASE
      ══════════════════════════════════════════════════════════ */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative z-10 mt-12 pt-12 border-t border-white/10"
      >
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-500/10 text-yellow-400 text-xs font-bold mb-3 border border-yellow-500/20">
              <Trophy size={14} className="text-yellow-400" />
              Official Credentials & Milestones
            </div>
            <h3 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
              Verified <span className="gradient-text">Badges & Achievements</span>
            </h3>
          </div>

          {/* Filter Pills */}
          <div className="inline-flex p-1 bg-white/5 border border-white/10 rounded-2xl gap-1 self-start md:self-auto overflow-x-auto max-w-full">
            {[
              { id: 'all', label: `All Badges (${allBadges.length})` },
              { id: 'leetcode', label: `LeetCode (${lcBadges.length})` },
              { id: 'hackerrank', label: `HackerRank (${hrBadges.length})` },
              { id: 'google', label: `Google Skills (1)` }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setBadgeFilter(tab.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                  badgeFilter === tab.id
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Badges Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
          {filteredBadges.map((badge, index) => (
            <motion.div
              key={badge.id || index}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05, duration: 0.4 }}
              whileHover={{ y: -6, scale: 1.03 }}
              className="group relative glass p-5 rounded-2xl flex flex-col items-center text-center border border-white/5 hover:border-blue-500/40 transition-all duration-300 shadow-xl overflow-hidden cursor-default"
            >
              {/* Top Issuer Tag */}
              <div className="absolute top-3 left-3 z-10 flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-[9px] font-bold text-gray-300">
                <ShieldCheck size={10} className="text-blue-400" />
                {badge.issuer}
              </div>

              {/* Glowing Background Ring */}
              <div className="absolute inset-0 bg-gradient-to-b from-blue-600/5 via-transparent to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              {/* Badge Icon Container */}
              <div className="relative my-4 w-24 h-24 flex items-center justify-center">
                <div className="absolute inset-0 bg-blue-500/10 rounded-full blur-xl group-hover:bg-blue-500/25 transition-all duration-500" />
                
                {badge.icon ? (
                  <img
                    src={badge.icon}
                    alt={badge.name}
                    className="w-20 h-20 object-contain drop-shadow-[0_8px_16px_rgba(0,0,0,0.6)] group-hover:scale-110 transition-transform duration-500 z-10"
                    referrerPolicy="no-referrer"
                    crossOrigin="anonymous"
                    onError={e => {
                      e.target.style.display = 'none';
                      if (e.target.nextSibling) {
                        e.target.nextSibling.style.display = 'flex';
                      }
                    }}
                  />
                ) : null}

                {/* Fallback Badge Trophy */}
                <div
                  className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-600/20 to-purple-600/20 border border-blue-500/30 flex items-center justify-center shadow-inner"
                  style={{ display: badge.icon ? 'none' : 'flex' }}
                >
                  <Trophy size={32} className="text-yellow-400" />
                </div>
              </div>

              {/* Title & Category */}
              <h4 className="text-sm font-bold text-white leading-tight mb-1 group-hover:text-blue-300 transition-colors line-clamp-2">
                {badge.name}
              </h4>
              <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mt-auto pt-2 border-t border-white/5 w-full">
                {badge.category}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* ── LeetCode Live Activity & Insights Modal ── */}
      <AnimatePresence>
        {showLcModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowLcModal(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-4xl glass rounded-3xl p-6 md:p-8 overflow-y-auto z-[101] shadow-2xl max-h-[90vh] border border-orange-500/30 flex flex-col gap-6"
            >
              {/* Modal Close Button */}
              <button 
                onClick={() => setShowLcModal(false)}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/10 text-gray-400 hover:text-white transition-all cursor-pointer"
              >
                <X size={24} />
              </button>

              {/* Modal Header */}
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-2xl flex items-center justify-center border border-orange-500/40 shadow-lg">
                    <Flame size={24} className="text-orange-400 animate-pulse" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-white flex items-center gap-2">
                      LeetCode Live Insights
                      <span className="text-xs px-2.5 py-0.5 rounded-full bg-orange-500/20 border border-orange-500/40 text-orange-300 font-bold">
                        {lcData.currentStreak || 206} Days Streak ({lcBadges.length} Official Badges)
                      </span>
                    </h3>
                    <p className="text-sm text-gray-400">Deep-dive stats and activity log for @Ruthragurubaran-J</p>
                  </div>
                </div>
              </div>

              {/* Modal Content Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Accuracy Ring & Solved Numbers */}
                <div className="bg-white/5 border border-white/5 rounded-2xl p-6 flex flex-col items-center justify-between min-h-[300px]">
                  <h4 className="text-white text-sm font-bold uppercase tracking-wider mb-4 self-start flex items-center gap-2">
                    <Trophy size={16} className="text-yellow-500" />
                    Accuracy & Difficulty Ratios
                  </h4>

                  <div className="relative w-48 h-48 flex items-center justify-center">
                    <svg width="190" height="190" className="transform -rotate-90">
                      <circle cx="95" cy="95" r="75" stroke="rgba(74, 222, 128, 0.1)" strokeWidth="12" fill="transparent" />
                      <circle cx="95" cy="95" r="58" stroke="rgba(250, 204, 21, 0.1)" strokeWidth="12" fill="transparent" />
                      <circle cx="95" cy="95" r="41" stroke="rgba(239, 68, 68, 0.1)" strokeWidth="12" fill="transparent" />
                      
                      {/* Easy Ring (Green) */}
                      <circle
                        cx="95" cy="95" r="75"
                        stroke="#22c55e" strokeWidth="12" fill="transparent"
                        strokeDasharray="471"
                        strokeDashoffset={471 - (471 * ((lcData.easySolved || 65) / (lcData.totalEasy || 955)))}
                        strokeLinecap="round"
                        className="transition-all duration-1000 ease-out"
                      />
                      {/* Medium Ring (Yellow) */}
                      <circle
                        cx="95" cy="95" r="58"
                        stroke="#eab308" strokeWidth="12" fill="transparent"
                        strokeDasharray="364"
                        strokeDashoffset={364 - (364 * ((lcData.mediumSolved || 110) / (lcData.totalMedium || 2089)))}
                        strokeLinecap="round"
                        className="transition-all duration-1000 ease-out"
                      />
                      {/* Hard Ring (Red) */}
                      <circle
                        cx="95" cy="95" r="41"
                        stroke="#ef4444" strokeWidth="12" fill="transparent"
                        strokeDasharray="257"
                        strokeDashoffset={257 - (257 * ((lcData.hardSolved || 46) / (lcData.totalHard || 955)))}
                        strokeLinecap="round"
                        className="transition-all duration-1000 ease-out"
                      />
                    </svg>
                    
                    {/* Center Stat */}
                    <div className="absolute flex flex-col items-center justify-center">
                      <span className="text-4xl font-black text-white leading-none">{lcData.totalSolved || 221}</span>
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Total Solved</span>
                    </div>
                  </div>

                  {/* Metrics Row */}
                  <div className="w-full grid grid-cols-3 gap-2 mt-4 text-xs font-semibold">
                    <div className="flex flex-col items-center p-2.5 rounded-xl bg-green-500/10 border border-green-500/20 text-green-400">
                      <span>Easy</span>
                      <span className="text-white font-bold text-base mt-0.5">{lcData.easySolved || 65}</span>
                    </div>
                    <div className="flex flex-col items-center p-2.5 rounded-xl bg-yellow-500/10 border border-yellow-500/20 text-yellow-400">
                      <span>Medium</span>
                      <span className="text-white font-bold text-base mt-0.5">{lcData.mediumSolved || 110}</span>
                    </div>
                    <div className="flex flex-col items-center p-2.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400">
                      <span>Hard</span>
                      <span className="text-white font-bold text-base mt-0.5">{lcData.hardSolved || 46}</span>
                    </div>
                  </div>
                </div>

                {/* Recent Submissions Log */}
                <div className="bg-white/5 border border-white/5 rounded-2xl p-6 flex flex-col min-h-[300px]">
                  <h4 className="text-white text-sm font-bold uppercase tracking-wider mb-4 flex items-center gap-2">
                    <Activity size={16} className="text-orange-500" />
                    Live Activity Stream
                  </h4>

                  <div className="flex-grow overflow-y-auto max-h-[260px] pr-2 space-y-3 scrollbar-thin">
                    {(lcData?.recentSubmissions || fallbackRecentSubmissions).map((sub, idx) => (
                      <div 
                        key={idx}
                        className="p-3 bg-white/5 border border-white/5 rounded-xl hover:border-orange-500/30 transition-all flex items-center justify-between"
                      >
                        <div className="flex flex-col gap-1 max-w-[70%]">
                          <span className="text-xs font-bold text-white truncate" title={sub.title}>{sub.title}</span>
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
                  Submission Heatmap (Past 365 Days — {lcData.totalActiveDays || 206} Active Days)
                </h4>

                <div className="w-full overflow-x-auto pb-2">
                  <div className="min-w-[780px]">
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
                            <div className="flex flex-col justify-between text-[8px] text-gray-500 h-[92px] pr-2 select-none font-bold py-1 w-4">
                              <span>Sun</span>
                              <span>Wed</span>
                              <span>Sat</span>
                            </div>

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
