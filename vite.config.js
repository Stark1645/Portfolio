import path from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Custom dev middleware for /api/leetcode and /api/google-skills on localhost
const apiDevPlugin = () => ({
  name: 'api-dev-plugin',
  configureServer(server) {
    server.middlewares.use('/api/leetcode', async (req, res) => {
      try {
        const response = await fetch('https://leetcode.com/graphql', {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
          },
          body: JSON.stringify({
            query: `query userProfileAndBadges($username: String!) {
              matchedUser(username: $username) {
                profile { userAvatar ranking }
                userCalendar { streak totalActiveDays submissionCalendar }
                badges { id name displayName shortName icon category creationDate }
                submitStatsGlobal {
                  acSubmissionNum { difficulty count }
                }
              }
            }`,
            variables: { username: "Ruthragurubaran-J" }
          })
        });
        const data = await response.json();
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(data));
      } catch (error) {
        res.statusCode = 500;
        res.end(JSON.stringify({ error: error.message }));
      }
    });

    server.middlewares.use('/api/google-skills', async (req, res) => {
      const GOOGLE_SKILLS_URL = 'https://www.skills.google/public_profiles/1714331c-0949-42cf-9021-c0438aa40b13';
      try {
        const response = await fetch(GOOGLE_SKILLS_URL, {
          headers: {
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
          }
        });
        const html = await response.text();

        const avatarMatch = html.match(/ql-avatar[^>]+src='([^']+)'/);
        const avatar = avatarMatch ? avatarMatch[1] : 'https://lh3.googleusercontent.com/a/ACg8ocLtv36dsRITxuTdhK9p8FQnjerBEkVoD3KEE9Syh_zcW0vK3Wo=s320-c';

        const leagueMatch = html.match(/ql-headline-medium[^>]*>([^<]+League[^<]*)</);
        const league = leagueMatch ? leagueMatch[1].trim() : 'Bronze League';

        const pointsMatch = html.match(/<strong>(\d+)\s*points<\/strong>/);
        const points = pointsMatch ? parseInt(pointsMatch[1]) : 100;

        const badgesMatch = html.match(/hasn't earned any badges yet/);
        const badgeCountMatch = html.match(/(\d+)\s+badge/);
        const badges = badgesMatch ? 0 : badgeCountMatch ? parseInt(badgeCountMatch[1]) : 0;

        const memberMatch = html.match(/Member since (\d{4})/);
        const memberSince = memberMatch ? memberMatch[1] : '2026';

        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ name: 'Ruthragurubaran J', avatar, league, points, badges, memberSince }));
      } catch (error) {
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({
          name: 'Ruthragurubaran J',
          avatar: 'https://lh3.googleusercontent.com/a/ACg8ocLtv36dsRITxuTdhK9p8FQnjerBEkVoD3KEE9Syh_zcW0vK3Wo=s320-c',
          league: 'Bronze League',
          points: 100,
          badges: 0,
          memberSince: '2026'
        }));
      }
    });

    server.middlewares.use('/api/hackerrank', async (req, res) => {
      try {
        const headers = {
          'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
        };
        const [profileRes, badgesRes] = await Promise.all([
          fetch('https://www.hackerrank.com/rest/contests/master/hackers/gurudaya49/profile', { headers }),
          fetch('https://www.hackerrank.com/rest/hackers/gurudaya49/badges', { headers })
        ]);

        let model = null;
        let badges = [];

        if (profileRes.ok) {
          const pData = await profileRes.json();
          model = pData.model || null;
        }

        if (badgesRes.ok) {
          const bData = await badgesRes.json();
          if (bData.models && bData.models.length > 0) {
            badges = bData.models.map(m => {
              const name = m.badge_name || "Java";
              let icon = "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg";
              if (name.toLowerCase().includes("sql")) icon = "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg";
              else if (name.toLowerCase().includes("problem")) icon = "https://cdn.simpleicons.org/hackerrank/2EC866";
              return {
                id: m.badge_type || name,
                name: name,
                category: `${m.stars || 4}-Star Gold Badge`,
                icon: icon,
                issuer: 'HackerRank',
                stars: m.stars || 4
              };
            });
          }
        }

        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ model, badges }));
      } catch (error) {
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ model: null, badges: [] }));
      }
    });
  }
});

// https://vite.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  plugins: [
    tailwindcss(),
    react(),
    apiDevPlugin()
  ],
})
