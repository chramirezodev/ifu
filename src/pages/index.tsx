import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Layout from '@/components/layout/Layout';
import Hero from '@/components/sections/Hero';
import Welcome from '@/components/sections/Welcome';
import About from '@/components/sections/About';
import Services from '@/components/sections/Services';
import Contact from '@/components/sections/Contact';
import WhyChooseUs from '@/components/sections/WhyChooseUs';
import SEO from '@/components/common/SEO';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { useEffect, useState } from 'react';
import { useCMS } from '@/context/CMSContext';
import { fetchCMSData } from '@/lib/cms/fetchCMS';

export default function Home() {
  const { t } = useTranslation('common');
  const { locale } = useRouter();
  const { seo, siteSettings } = useCMS();
  const [news, setNews] = useState<{ title: string; link: string; pubDate: string; contentSnippet: string }[]>([]);
  const [loadingNews, setLoadingNews] = useState(true);
  const [errorNews, setErrorNews] = useState('');
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);
  const [isFallback, setIsFallback] = useState(false);

  const fallbackItems = t('news.fallback', { returnObjects: true });
  const fallbackNews = (Array.isArray(fallbackItems) ? fallbackItems : []).map(
    (item: { title: string; link: string; contentSnippet: string }) => ({ ...item, pubDate: '' })
  );

  useEffect(() => {
    const fetchNews = async () => {
      try {
        if (typeof window === 'undefined') {
          setNews(fallbackNews);
          setLoadingNews(false);
          return;
        }

        const cachedNews = localStorage.getItem('uscisNews');
        const cachedTimestamp = localStorage.getItem('uscisNewsTimestamp');
        
        if (cachedNews && cachedTimestamp) {
          const timestamp = parseInt(cachedTimestamp);
          const now = Date.now();
          if (now - timestamp < 12 * 60 * 60 * 1000) {
            const parsedNews = JSON.parse(cachedNews);
            setNews(parsedNews.news);
            setLastUpdated(parsedNews.lastUpdated);
            setLoadingNews(false);
            return;
          }
        }

        const response = await fetch('/api/uscis-news');
        const data = await response.json();
        
        if (data.error) {
          throw new Error(data.error);
        }

        setNews(data.news || []);
        setLastUpdated(data.lastUpdated);
        setIsFallback(data.isFallback || false);

        localStorage.setItem('uscisNews', JSON.stringify(data));
        localStorage.setItem('uscisNewsTimestamp', Date.now().toString());
      } catch (err) {
        console.error('Error cargando noticias:', err);
        setErrorNews(t('news.error'));
        setNews(fallbackNews);
      } finally {
        setLoadingNews(false);
      }
    };

    fetchNews();
  }, []);

  return (
    <>
      <Layout>
        <SEO 
          title={seo.defaultTitle}
          description={seo.defaultDescription}
          keywords={seo.keywords}
        />
        <main className="flex min-h-screen flex-col items-center justify-between">
          <Hero />
          <Welcome />
          <About />
          <Services />
          <WhyChooseUs />
          <Contact />
          <section className="py-12 bg-gray-50 mt-8 w-full">
            <div className="container mx-auto px-4 max-w-4xl text-center">
              <h2 className="text-3xl font-bold text-usa-blue mb-4">{t('news.title')}</h2>
              <p className="text-lg text-gray-700 mb-8">{t('news.subtitle')}</p>
              {loadingNews ? (
                <div className="text-gray-500 py-8">{t('news.loading')}</div>
              ) : errorNews ? (
                <div className="text-red-500 py-8">{errorNews}</div>
              ) : (
                <>
                  <div className="grid md:grid-cols-3 gap-6 mb-8">
                    {(news.length > 0 ? news : fallbackNews).map((item, idx) => (
                      <a key={idx} href={item.link} target="_blank" rel="noopener noreferrer" className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-all text-left flex flex-col justify-between">
                        <h3 className="font-semibold text-lg text-usa-blue mb-2">{item.title}</h3>
                        <p className="text-gray-600 text-sm mb-4">{item.contentSnippet}</p>
                        <span className="text-xs text-gray-400 mt-auto">{t('news.readOnUscis')}</span>
                      </a>
                    ))}
                  </div>
                  {lastUpdated && (
                    <p className="text-sm text-gray-500 mb-4">
                      {t('news.lastUpdated', {
                        date: new Date(lastUpdated).toLocaleString(locale === 'en' ? 'en-US' : 'es-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        }),
                        interpolation: { escapeValue: false },
                      })}
                      {isFallback && t('news.cached')}
                    </p>
                  )}
                  <a
                    href="https://www.uscis.gov/newsroom"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-usa-blue text-white px-8 py-3 rounded-lg font-semibold hover:bg-usa-blue-dark transition-colors duration-200 shadow-md mt-4"
                  >
                    {t('news.viewAll')}
                  </a>
                </>
              )}
            </div>
          </section>
          <section className="w-full py-16 bg-brand-navy text-white">
            <div className="container mx-auto px-4 max-w-4xl text-center">
              <h2 className="text-3xl font-bold mb-4">{t('cta.title')}</h2>
              <p className="text-lg text-gray-200 mb-8 max-w-3xl mx-auto">{t('cta.text')}</p>
              <a
                href={`https://wa.me/${siteSettings.whatsappNumber}?text=${encodeURIComponent(siteSettings.consultationWhatsAppMessage)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center bg-[#25D366] text-white py-3 px-8 rounded-lg font-semibold hover:bg-[#1ebe57] transition-colors duration-200 shadow-md"
              >
                <svg className="mr-2 w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M20.52 3.48A12.07 12.07 0 0 0 12 0C5.37 0 0 5.37 0 12c0 2.11.55 4.16 1.6 5.97L0 24l6.22-1.63A12.07 12.07 0 0 0 12 24c6.63 0 12-5.37 12-12 0-3.21-1.25-6.23-3.48-8.52zM12 22c-1.85 0-3.68-.5-5.25-1.44l-.38-.22-3.69.97.99-3.59-.25-.37A9.93 9.93 0 0 1 2 12c0-5.52 4.48-10 10-10s10 4.48 10 10-4.48 10-10 10zm5.2-7.6c-.28-.14-1.65-.81-1.9-.9-.25-.09-.43-.14-.61.14-.18.28-.7.9-.86 1.08-.16.18-.32.2-.6.07-.28-.14-1.18-.44-2.25-1.4-.83-.74-1.39-1.65-1.55-1.93-.16-.28-.02-.43.12-.57.13-.13.28-.34.42-.51.14-.17.18-.29.28-.48.09-.19.05-.36-.02-.5-.07-.14-.61-1.47-.84-2.01-.22-.53-.45-.46-.61-.47-.16-.01-.35-.01-.54-.01-.19 0-.5.07-.76.34-.26.27-1 1-.97 2.43.03 1.43 1.03 2.81 1.18 3.01.15.2 2.03 3.1 4.93 4.23.69.3 1.23.48 1.65.61.69.22 1.32.19 1.81.12.55-.08 1.65-.67 1.88-1.32.23-.65.23-1.2.16-1.32-.07-.12-.25-.19-.53-.33z"/>
                </svg>
                {t('cta.button')}
              </a>
            </div>
          </section>
        </main>
      </Layout>
    </>
  );
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const cms = await fetchCMSData(locale ?? 'es');
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'es', ['common'])),
      cms,
    },
    revalidate: 60,
  };
};
