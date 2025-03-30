import Head from 'next/head';
import Script from 'next/script';

const OnPageSEO = ({
  title = 'Servicios Profesionales de Inmigración | Immigration For US',
  description = 'Asistencia experta en trámites migratorios, visas, ciudadanía y más. Soluciones personalizadas para tu situación migratoria en Estados Unidos.',
  canonicalUrl = process.env.NEXT_PUBLIC_SITE_URL,
  ogImage = '/images/immigration-services-og.jpg',
  jsonLd = null,
  structuredData = null
}) => {
  // Datos estructurados para servicios de inmigración
  const defaultStructuredData = {
    "@context": "https://schema.org",
    "@type": "LegalService",
    "name": "Immigration For US",
    "description": description,
    "url": canonicalUrl,
    "logo": `${canonicalUrl}/images/logo.png`,
    "image": [`${canonicalUrl}${ogImage}`],
    "priceRange": "$$",
    "telephone": "+1-XXX-XXX-XXXX",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "XXX Street Address",
      "addressLocality": "City",
      "addressRegion": "State",
      "postalCode": "ZIP",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "XX.XXXXX",
      "longitude": "-XX.XXXXX"
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday"
      ],
      "opens": "09:00",
      "closes": "17:00"
    },
    "sameAs": [
      "https://www.facebook.com/immigrationforus",
      "https://www.instagram.com/immigrationforus"
    ],
    "serviceType": ["Immigration Services", "Visa Application", "Citizenship", "Green Card"],
    "serviceArea": {
      "@type": "GeoCircle",
      "geoMidpoint": {
        "@type": "GeoCoordinates",
        "latitude": "XX.XXXXX",
        "longitude": "-XX.XXXXX"
      },
      "geoRadius": "50000"
    }
  };

  const finalStructuredData = structuredData || defaultStructuredData;

  return (
    <>
      <Head>
        {/* Metaetiquetas básicas */}
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        
        {/* Canonical URL */}
        <link rel="canonical" href={canonicalUrl} />
        
        {/* Open Graph para compartir en redes sociales */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={`${canonicalUrl}${ogImage}`} />
        <meta property="og:locale" content="es_ES" />
        <meta property="og:site_name" content="Immigration For US" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={`${canonicalUrl}${ogImage}`} />
        
        {/* Etiquetas para Mobile */}
        <meta name="format-detection" content="telephone=no" />
        <meta name="theme-color" content="#3C3B6E" /> {/* Color azul bandera USA */}
        
        {/* Favicons */}
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        
        {/* Etiquetas para microservicios en One Page */}
        <meta name="fragment" content="!" />
        <meta name="robots" content="index, follow" />
        <meta name="googlebot" content="index, follow" />
      </Head>
      
      {/* JSON-LD para datos estructurados */}
      <Script
        id="structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(finalStructuredData) }}
      />
      
      {/* JSON-LD adicional si es proporcionado */}
      {jsonLd && (
        <Script
          id="custom-json-ld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
    </>
  );
};

export default OnPageSEO; 