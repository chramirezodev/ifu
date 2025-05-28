import type { NextApiRequest, NextApiResponse } from 'next';

const FEED_URL = 'https://www.uscis.gov/news/rss-feed/';
const FEED2JSON_URL = `https://feed2json.org/convert?url=${encodeURIComponent(FEED_URL)}`;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const response = await fetch(FEED2JSON_URL);
    const data = await response.json();
    const news = (data.items || []).slice(0, 3).map((item: any) => ({
      title: item.title,
      link: item.url,
      pubDate: item.date_published,
      contentSnippet: item.summary || '',
    }));
    res.status(200).json({ news });
  } catch (error) {
    res.status(500).json({ error: 'No se pudieron obtener las noticias de USCIS.' });
  }
} 