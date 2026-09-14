import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { appWithTranslation } from 'next-i18next'
import Head from 'next/head'
import '@/i18n'
import GoogleAnalytics from '@/components/common/GoogleAnalytics'
import { CMSProvider } from '@/context/CMSContext'
import type { CMSData } from '@/lib/cms/types'

type AppPageProps = {
  cms?: CMSData
}

function App({ Component, pageProps }: AppProps<AppPageProps>) {
  const { cms, ...rest } = pageProps

  return (
    <CMSProvider value={cms}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <GoogleAnalytics />
      <Component {...rest} />
    </CMSProvider>
  )
}

export default appWithTranslation(App)
