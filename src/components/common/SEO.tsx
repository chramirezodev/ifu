import Head from 'next/head';
import { useRouter } from 'next/router';

const defaultMetaTags = {
  siteName: 'Mardini Law Firm',
  title: 'Mardini Law Firm — Abogados de Inmigración en Estados Unidos',
  description: 'Representación legal estratégica en inmigración ante USCIS, EOIR y BIA. Roger Mardini, Esq. — Immigration Attorneys en Parkland, Florida.',
  keywords: 'abogado inmigración, immigration attorney, USCIS, EOIR, BIA, green card, naturalización, asilo, VAWA, visa U, Mardini Law Firm, Florida',
  image: '/images/Logos/mardini-logo.jpeg',
  twitterHandle: '@mardinilawfirm',
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
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://immigrationfor-us.com';
  const url = `${baseUrl}${router.asPath}`;
  
  const ogData: OpenGraphData = {
    site_name: defaultMetaTags.siteName,
    title,
    description,
    url,
    type: 'website',
    image: `${baseUrl}${defaultMetaTags.image}`,
    ...openGraph
  };
  
  const twitterData: TwitterData = {
    card: 'summary_large_image',
    site: defaultMetaTags.twitterHandle,
    title,
    description,
    ...twitter
  };
  
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LegalService",
    "name": "Mardini Law Firm",
    "description": description,
    "url": baseUrl,
    "logo": `${baseUrl}/images/Logos/mardini-logo.jpeg`,
    "image": ogData.image || `${baseUrl}/images/Logos/mardini-logo.jpeg`,
    "telephone": "+1-754-234-4284",
    "email": "info@mardinilawfirm.com",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "7224 NW 116th Way",
      "addressLocality": "Parkland",
      "addressRegion": "FL",
      "postalCode": "33076",
      "addressCountry": "US"
    },
    "founder": {
      "@type": "Person",
      "name": "Roger Mardini",
      "jobTitle": "Attorney at Law"
    },
    "serviceType": "Immigration Law",
    "areaServed": "United States",
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Servicios de Inmigración",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Representación en Solicitudes de Visa",
            "description": "Representación legal en solicitudes de visa ante autoridades migratorias"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Residencia Permanente",
            "description": "Representación en procesos de Green Card"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Naturalización y Ciudadanía",
            "description": "Representación legal en naturalización"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Asilo Afirmativo y Defensivo",
            "description": "Representación en asilo ante USCIS y EOIR"
          }
        }
      ]
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
      
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      
      <meta property="og:site_name" content={ogData.site_name} />
      <meta property="og:title" content={ogData.title} />
      <meta property="og:description" content={ogData.description} />
      <meta property="og:url" content={ogData.url} />
      <meta property="og:type" content={ogData.type} />
      {ogData.image && <meta property="og:image" content={ogData.image} />}
      <meta property="og:locale" content={defaultMetaTags.locale} />
      
      <meta name="twitter:card" content={twitterData.card} />
      <meta name="twitter:site" content={twitterData.site} />
      <meta name="twitter:title" content={twitterData.title} />
      <meta name="twitter:description" content={twitterData.description} />
      {twitterData.image && <meta name="twitter:image" content={twitterData.image} />}
      
      <link rel="icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="manifest" href="/site.webmanifest" />
    </Head>
  );
};

export default SEO;
