import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { appWithTranslation } from 'next-i18next';
import Head from 'next/head';
import '@/i18n';
import GoogleAnalytics from '@/components/common/GoogleAnalytics';

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <GoogleAnalytics />
      <Component {...pageProps} />
    </>
  );
}

export default appWithTranslation(App); 