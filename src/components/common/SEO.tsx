import Head from 'next/head';
import { useRouter } from 'next/router';

const defaultMetaTags = {
  siteName: 'IFU - Servicios de Inmigración',
  title: 'Servicios Profesionales de Inmigración en Estados Unidos',
  description: 'Asistencia experta en trámites migratorios, visas, ciudadanía y más. Nuestro equipo profesional te ayuda en todo el proceso.',
  keywords: 'inmigración, visa, green card, ciudadanía americana, asilo político, servicios migratorios, Estados Unidos',
  image: '/images/ifu-opengraph.jpg', // Imagen predeterminada para compartir
  twitterHandle: '@ifu_inmigracion',
  locale: 'es_ES'
};

interface OpenGraphData {
  site_name: string;
  title: string;
  description: string;
  url: string;
  type: string;
  image?: string;
}

interface TwitterData {
  card: string;
  site: string;
  title: string;
  description: string;
  image?: string;
}

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  openGraph?: Partial<OpenGraphData>;
  twitter?: Partial<TwitterData>;
  noindex?: boolean;
}

const SEO = ({
  title = defaultMetaTags.title,
  description = defaultMetaTags.description,
  keywords = defaultMetaTags.keywords,
  openGraph = {},
  twitter = {},
  noindex = false
}: SEOProps) => {
  const router = useRouter();
  const url = `${process.env.NEXT_PUBLIC_SITE_URL}${router.asPath}`;
  
  // Merge OpenGraph data with defaults
  const ogData: OpenGraphData = {
    site_name: defaultMetaTags.siteName,
    title,
    description,
    url,
    type: 'website',
    ...openGraph
  };
  
  // Merge Twitter data with defaults
  const twitterData: TwitterData = {
    card: 'summary_large_image',
    site: defaultMetaTags.twitterHandle,
    title,
    description,
    ...twitter
  };
  
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="canonical" href={url} />
      {noindex && <meta name="robots" content="noindex,nofollow" />}
      
      {/* Open Graph */}
      <meta property="og:site_name" content={ogData.site_name} />
      <meta property="og:title" content={ogData.title} />
      <meta property="og:description" content={ogData.description} />
      <meta property="og:url" content={ogData.url} />
      <meta property="og:type" content={ogData.type} />
      {ogData.image && <meta property="og:image" content={ogData.image} />}
      <meta property="og:locale" content={defaultMetaTags.locale} />
      
      {/* Twitter */}
      <meta name="twitter:card" content={twitterData.card} />
      <meta name="twitter:site" content={twitterData.site} />
      <meta name="twitter:title" content={twitterData.title} />
      <meta name="twitter:description" content={twitterData.description} />
      {twitterData.image && <meta name="twitter:image" content={twitterData.image} />}
      
      {/* Favicon */}
      <link rel="icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="manifest" href="/site.webmanifest" />
    </Head>
  );
};

export default SEO; 