export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const GOOGLE_SKILLS_URL = 'https://www.skills.google/public_profiles/1714331c-0949-42cf-9021-c0438aa40b13';

  try {
    const response = await fetch(GOOGLE_SKILLS_URL, {
      headers: {
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      }
    });

    if (!response.ok) {
      throw new Error(`Google Skills responded with status ${response.status}`);
    }

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

    res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate=86400');
    return res.status(200).json({
      name: 'Ruthragurubaran J',
      avatar,
      league,
      points,
      badges,
      memberSince
    });
  } catch (error) {
    return res.status(200).json({
      name: 'Ruthragurubaran J',
      avatar: 'https://lh3.googleusercontent.com/a/ACg8ocLtv36dsRITxuTdhK9p8FQnjerBEkVoD3KEE9Syh_zcW0vK3Wo=s320-c',
      league: 'Bronze League',
      points: 100,
      badges: 0,
      memberSince: '2026'
    });
  }
}
