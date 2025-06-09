import type { NextApiRequest, NextApiResponse } from 'next';

const FEED_URL = 'https://www.uscis.gov/news/rss-feed/';
const FEED2JSON_URL = `https://feed2json.org/convert?url=${encodeURIComponent(FEED_URL)}`;
const CACHE_DURATION = 12 * 60 * 60 * 1000; // 12 horas en milisegundos

interface CachedNews {
  news: Array<{
    title: string;
    link: string;
    pubDate: string;
    contentSnippet: string;
  }>;
  timestamp: number;
}

let newsCache: CachedNews | null = null;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Verificar si hay caché válido
    if (newsCache && Date.now() - newsCache.timestamp < CACHE_DURATION) {
      return res.status(200).json({ 
        news: newsCache.news,
        lastUpdated: new Date(newsCache.timestamp).toISOString()
      });
    }

    // Si no hay caché o está expirado, obtener nuevas noticias
    const response = await fetch(FEED2JSON_URL);
    if (!response.ok) {
      throw new Error(`Error fetching news: ${response.statusText}`);
    }

    const data = await response.json();
    const news = (data.items || []).slice(0, 3).map((item: any) => ({
      title: item.title,
      link: item.url,
      pubDate: item.date_published,
      contentSnippet: item.summary || '',
    }));

    // Actualizar caché
    newsCache = {
      news,
      timestamp: Date.now()
    };

    res.status(200).json({ 
      news,
      lastUpdated: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error fetching USCIS news:', error);
    
    // Si hay caché expirado, usarlo como fallback
    if (newsCache) {
      return res.status(200).json({ 
        news: newsCache.news,
        lastUpdated: new Date(newsCache.timestamp).toISOString(),
        isFallback: true
      });
    }

    res.status(500).json({ 
      error: 'No se pudieron obtener las noticias de USCIS.',
      lastUpdated: null
    });
  }
} 