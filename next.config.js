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