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
  
  // Datos estructurados para Schema.org
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "Immigration For US",
    "description": description,
    "url": url,
    "logo": `${process.env.NEXT_PUBLIC_SITE_URL}/images/Logos/logo.png`,
    "image": ogData.image || `${process.env.NEXT_PUBLIC_SITE_URL}/images/Logos/logo.png`,
    "telephone": "+1 (954) 588-4018",
    "email": "cpalisa@immigrationfor-us.com",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "2200 N Federal Hwy",
      "addressLocality": "Boca Raton",
      "addressRegion": "FL",
      "postalCode": "33431",
      "addressCountry": "US"
    },
    "serviceType": "Servicios de Inmigración",
    "areaServed": "Estados Unidos",
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Servicios de Inmigración",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Visas de Inmigración",
            "description": "Asistencia con trámites de visas de inmigración"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Residencia Permanente",
            "description": "Procesos de Green Card y residencia permanente"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Ciudadanía Americana",
            "description": "Naturalización y proceso de ciudadanía"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Asilo Político",
            "description": "Asistencia con casos de asilo político"
          }
        }
      ]
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "150"
    }
  };

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="canonical" href={url} />
      {noindex && <meta name="robots" content="noindex,nofollow" />}
      
      {/* Datos estructurados */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      
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