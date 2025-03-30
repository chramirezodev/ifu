import { createClient } from 'next-sanity';
import imageUrlBuilder from '@sanity/image-url';

export const clientConfig = {
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'tu-project-id',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2023-05-03', // Fecha en formato YYYY-MM-DD
  useCdn: process.env.NODE_ENV === 'production',
  token: process.env.SANITY_API_TOKEN || '',
};

// Cliente para consultas del lado del cliente
export const client = createClient({
  projectId: clientConfig.projectId,
  dataset: clientConfig.dataset,
  apiVersion: clientConfig.apiVersion,
  useCdn: clientConfig.useCdn,
});

// Cliente para el servidor (con token para operaciones privadas)
export const serverClient = createClient({
  projectId: clientConfig.projectId,
  dataset: clientConfig.dataset,
  apiVersion: clientConfig.apiVersion,
  useCdn: false,
  token: clientConfig.token,
});

// Configuración para trabajar con imágenes
const builder = imageUrlBuilder(client);
export const urlForImage = (source: any) => {
  return builder.image(source);
};

// Queries comunes
export const QUERIES = {
  SITE_SETTINGS: `*[_type == "siteSettings"][0]`,
  SERVICES: `*[_type == "siteSettings"][0].services`,
  RECENT_POSTS: `*[_type == "post"] | order(publishedAt desc)[0...3]{
    title,
    slug,
    excerpt,
    mainImage,
    publishedAt
  }`,
}; 