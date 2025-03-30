import qs from 'qs';

interface FetchAPIParams {
  endpoint: string;
  query?: Record<string, any>;
  wrappedByKey?: string;
  wrappedByList?: boolean;
}

const API_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';
const API_TOKEN = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;

/**
 * Helper to make GET requests to Strapi API endpoints
 */
export async function fetchAPI<T>({ endpoint, query, wrappedByKey, wrappedByList = false }: FetchAPIParams): Promise<T> {
  const mergedOptions = {
    headers: {
      'Content-Type': 'application/json',
      ...(API_TOKEN ? { Authorization: `Bearer ${API_TOKEN}` } : {}),
    },
  };

  // Build request URL
  const queryString = query ? `?${qs.stringify(query)}` : '';
  const requestUrl = `${API_URL}${endpoint}${queryString}`;

  // Trigger API call
  try {
    const response = await fetch(requestUrl, mergedOptions);
    
    if (!response.ok) {
      console.error('API error:', {
        status: response.status,
        statusText: response.statusText,
        url: requestUrl,
      });
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();

    if (wrappedByKey) {
      return wrappedByList ? { data: data.data } as T : data.data as T;
    }

    return data as T;
  } catch (error) {
    console.error('Error fetching from Strapi:', error);
    throw error;
  }
}

/**
 * Get full Strapi URL from path
 */
export function getStrapiURL(path = '') {
  return `${API_URL}${path}`;
}

/**
 * Get full media URL from path
 */
export function getStrapiMedia(url: string | null): string {
  if (!url) return '';
  
  // Return the full URL if the media is hosted on an external provider
  if (url.startsWith('http') || url.startsWith('//')) {
    return url;
  }

  // Otherwise, return the full Strapi URL
  return `${API_URL}${url}`;
}

/**
 * Obtiene los metadatos de la página
 */
export async function getGlobalMetadata() {
  const data = await fetchAPI<any>({
    endpoint: '/api/global',
    wrappedByKey: 'data',
    wrappedByList: false,
  });
  return data.attributes;
}

/**
 * Obtiene los servicios
 */
export async function getServices() {
  const data = await fetchAPI<any>({
    endpoint: '/api/services',
    query: {
      'populate': '*',
    },
    wrappedByKey: 'data',
    wrappedByList: true,
  });
  return data;
}

/**
 * Obtiene los testimonios
 */
export async function getTestimonials() {
  const data = await fetchAPI<any>({
    endpoint: '/api/testimonials',
    query: {
      'populate': '*',
    },
    wrappedByKey: 'data',
    wrappedByList: true,
  });
  return data;
} 