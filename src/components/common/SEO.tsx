import Head from 'next/head'
import { useRouter } from 'next/router'
import { useCMS } from '@/context/CMSContext'

interface OpenGraphData {
  site_name: string
  title: string
  description: string
  url: string
  type: string
  image?: string
}

interface TwitterData {
  card: string
  site: string
  title: string
  description: string
  image?: string
}

interface SEOProps {
  title?: string
  description?: string
  keywords?: string
  openGraph?: Partial<OpenGraphData>
  twitter?: Partial<TwitterData>
  noindex?: boolean
}

const SEO = ({
  title,
  description,
  keywords,
  openGraph = {},
  twitter = {},
  noindex = false,
}: SEOProps) => {
  const router = useRouter()
  const { seo, siteSettings } = useCMS()

  const defaultMetaTags = {
    siteName: seo.siteName,
    title: seo.defaultTitle,
    description: seo.defaultDescription,
    keywords: seo.keywords,
    image: seo.ogImageUrl || '/images/Logos/mardini-logo.png',
    twitterHandle: seo.twitterHandle || '@mardinilawfirm',
    locale: 'es_ES',
  }

  const resolvedTitle = title || defaultMetaTags.title
  const resolvedDescription = description || defaultMetaTags.description
  const resolvedKeywords = keywords || defaultMetaTags.keywords
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://immigrationfor-us.com'
  const url = `${baseUrl}${router.asPath}`
  const imagePath = defaultMetaTags.image.startsWith('http')
    ? defaultMetaTags.image
    : `${baseUrl}${defaultMetaTags.image.startsWith('/') ? '' : '/'}${defaultMetaTags.image}`

  const ogData: OpenGraphData = {
    site_name: defaultMetaTags.siteName,
    title: resolvedTitle,
    description: resolvedDescription,
    url,
    type: 'website',
    image: imagePath,
    ...openGraph,
  }

  const twitterData: TwitterData = {
    card: 'summary_large_image',
    site: defaultMetaTags.twitterHandle,
    title: resolvedTitle,
    description: resolvedDescription,
    ...twitter,
  }

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'LegalService',
    name: siteSettings.firmName || 'Mardini Law Firm',
    description: resolvedDescription,
    url: baseUrl,
    logo: `${baseUrl}/images/Logos/mardini-logo.png`,
    image: ogData.image || `${baseUrl}/images/Logos/mardini-logo.png`,
    telephone: siteSettings.phone || '+1-754-234-4284',
    email: siteSettings.email || 'info@mardinilawfirm.com',
    address: {
      '@type': 'PostalAddress',
      streetAddress: siteSettings.address || '7224 NW 116th Way',
      addressLocality: 'Parkland',
      addressRegion: 'FL',
      postalCode: '33076',
      addressCountry: 'US',
    },
    founder: {
      '@type': 'Person',
      name: siteSettings.founder || 'Roger Mardini',
      jobTitle: 'Attorney at Law',
    },
    serviceType: 'Immigration Law',
    areaServed: 'United States',
  }

  return (
    <Head>
      <title>{resolvedTitle}</title>
      <meta name="description" content={resolvedDescription} />
      <meta name="keywords" content={resolvedKeywords} />
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
  )
}

export default SEO
