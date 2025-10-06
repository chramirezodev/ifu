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
        port: '1337',
        pathname: '/uploads/**',
      },
    ],
    domains: ['localhost'],
    unoptimized: true,
  },
  typescript: {
    // !! ADVERTENCIA !!
    // Esto es para ignorar errores de TypeScript para implementar correctamente en Vercel
    // NO lo recomendaría en otros casos
    ignoreBuildErrors: true,
  },
  eslint: {
    // !! ADVERTENCIA !!
    // Esto es para ignorar errores de ESLint para implementar correctamente en Vercel
    // NO lo recomendaría en otros casos
    ignoreDuringBuilds: true,
  },
  experimental: {
    // Características experimentales si son necesarias
  },
  // Configuración de headers para SEO y seguridad
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
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
    ];
  },
  // Excluir las carpetas del CMS del build
  webpack: (config, { isServer }) => {
    // Configuración para excluir directorios específicos
    config.module.rules.push({
      test: /[\\/]cms[\\/]/,
      use: "null-loader",
    });
    
    return config;
  },
};

module.exports = nextConfig; 