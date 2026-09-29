const { withPayload } = require('@payloadcms/next/withPayload')

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  i18n: {
    defaultLocale: 'es',
    locales: ['es', 'en'],
    localeDetection: false,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3000',
        pathname: '/api/media/file/**',
      },
      {
        protocol: 'https',
        hostname: 'ifu.vercel.app',
        pathname: '/api/media/file/**',
      },
      {
        protocol: 'https',
        hostname: '**.vercel.app',
        pathname: '/api/media/file/**',
      },
      {
        protocol: 'https',
        hostname: '**.public.blob.vercel-storage.com',
      },
      {
        protocol: 'https',
        hostname: 'mardinilawfirm.com',
        pathname: '/api/media/file/**',
      },
    ],
    unoptimized: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  async redirects() {
    // El sitio es de una sola página: las rutas antiguas llevan a su sección de la home.
    // Con `locale: false`, Next compara contra la ruta con el idioma por defecto antepuesto
    // (`/contacto` llega como `/es/contacto`), por eso las fuentes llevan `/es` explícito.
    const legacyRoutes = [
      ['/contacto', '#contacto'],
      ['/servicios', '#servicios'],
      ['/testimonios', ''],
      ['/blog', ''],
      ['/blog/:slug*', ''],
    ]
    return [
      ...legacyRoutes.flatMap(([source, hash]) => [
        { source: `/es${source}`, destination: `/${hash}`, permanent: true, locale: false },
        { source: `/en${source}`, destination: `/en${hash}`, permanent: true, locale: false },
      ]),
      { source: '/:locale(es|en)/login', destination: '/admin', permanent: false, locale: false },
    ]
  },
  async headers() {
    return [
      {
        source: '/((?!admin).*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
      {
        source: '/sitemap.xml',
        headers: [
          {
            key: 'Content-Type',
            value: 'application/xml',
          },
        ],
      },
      {
        source: '/robots.txt',
        headers: [
          {
            key: 'Content-Type',
            value: 'text/plain',
          },
        ],
      },
    ]
  },
  webpack: (webpackConfig) => {
    webpackConfig.resolve.extensionAlias = {
      '.cjs': ['.cts', '.cjs'],
      '.js': ['.ts', '.tsx', '.js', '.jsx'],
      '.mjs': ['.mts', '.mjs'],
    }
    return webpackConfig
  },
}

module.exports = withPayload(nextConfig, { devBundleServerPackages: false })
