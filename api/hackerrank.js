export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

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

    res.setHeader('Cache-Control', 's-maxage=1800, stale-while-revalidate=86400');
    return res.status(200).json({ model, badges });
  } catch (error) {
    return res.status(200).json({ model: null, badges: [] });
  }
}
