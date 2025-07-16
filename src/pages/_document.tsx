import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="es">
      <Head>
        <meta name="description" content="Servicios profesionales de inmigración en Estados Unidos" />
        <link rel="icon" href="/favicon.ico" />
        <meta charSet="utf-8" />
        {/* Removed viewport meta tag from _document.tsx - should be in _app.tsx instead */}
        <meta name="theme-color" content="#3C3B6E" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Merriweather:wght@400;700&display=swap" rel="stylesheet" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
} 