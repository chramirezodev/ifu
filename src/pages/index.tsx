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
import Head from 'next/head';
import { useEffect, useState } from 'react';

export default function Home() {
  const [news, setNews] = useState<{ title: string; link: string; pubDate: string; contentSnippet: string }[]>([]);
  const [loadingNews, setLoadingNews] = useState(true);
  const [errorNews, setErrorNews] = useState('');
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);
  const [isFallback, setIsFallback] = useState(false);

  const fallbackNews = [
    {
      title: 'USCIS actualiza guía sobre residencia condicional basada en familia',
      link: 'https://www.uscis.gov/newsroom/alerts/uscis-updates-guidance-on-family-based-conditional-permanent-residence',
      contentSnippet: 'USCIS ha actualizado su guía para aclarar los requisitos y procesos para residentes condicionales basados en familia.',
      pubDate: new Date().toISOString()
    },
    {
      title: 'USCIS anuncia beneficiarios de subvenciones de integración',
      link: 'https://www.uscis.gov/newsroom/news-releases/uscis-announces-citizenship-and-integration-grant-recipients',
      contentSnippet: 'Se han otorgado subvenciones a organizaciones que ayudan a inmigrantes a integrarse y obtener la ciudadanía estadounidense.',
      pubDate: new Date().toISOString()
    },
    {
      title: "USCIS expande herramienta 'My Progress' al Formulario I-485",
      link: 'https://www.uscis.gov/newsroom/news-releases/uscis-expands-my-progress-to-form-i-485',
      contentSnippet: "La herramienta 'My Progress' ahora está disponible para quienes presentan el Formulario I-485, facilitando el seguimiento del proceso.",
      pubDate: new Date().toISOString()
    }
  ];

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
        setErrorNews('No se pudieron cargar las noticias.');
        setNews(fallbackNews);
      } finally {
        setLoadingNews(false);
      }
    };

    fetchNews();
  }, []);

  return (
    <>
      <Head>
        <title>Mardini Law Firm — Abogados de Inmigración</title>
        <meta name="description" content="Representación legal estratégica en inmigración ante USCIS, EOIR y BIA. Roger Mardini, Esq." />
      </Head>
      <Layout>
        <SEO 
          title="Mardini Law Firm — Abogados de Inmigración en Estados Unidos"
          description="Representación legal estratégica en inmigración ante USCIS, EOIR y BIA. Visas, residencia permanente, naturalización, asilo, VAWA y Visa U."
          keywords="abogado inmigración, immigration attorney, USCIS, EOIR, BIA, green card, naturalización, asilo, VAWA, visa U, Mardini Law Firm"
        />
        <main className="flex min-h-screen flex-col items-center justify-between">
          <Hero />
          <Welcome />
          <About 
            title="Nosotros"
            content={
              "Somos inmigrantes y conocemos los desafíos que se presentan al establecerse en este país. Por eso, te acompañamos en cada paso del proceso con representación legal estratégica, cercana y honesta."
            }
            values={[
              {
                title: "Integridad",
                description: "Honestidad, transparencia y ética profesional en cada caso."
              },
              {
                title: "Compromiso",
                description: "Defendemos tu caso con dedicación y responsabilidad."
              },
              {
                title: "Excelencia",
                description: "Soluciones legales estratégicas y efectivas."
              },
              {
                title: "Cercanía",
                description: "Comunicación clara y acompañamiento cercano en cada etapa."
              }
            ]}
          />
          <Services />
          <WhyChooseUs />
          <Contact />
          <section className="py-12 bg-gray-50 mt-8 w-full">
            <div className="container mx-auto px-4 max-w-4xl text-center">
              <h2 className="text-3xl font-bold text-usa-blue mb-4">Noticias de Inmigración</h2>
              <p className="text-lg text-gray-700 mb-8">Mantente informado con las últimas noticias oficiales de USCIS.</p>
              {loadingNews ? (
                <div className="text-gray-500 py-8">Cargando noticias...</div>
              ) : errorNews ? (
                <div className="text-red-500 py-8">{errorNews}</div>
              ) : (
                <>
                  <div className="grid md:grid-cols-3 gap-6 mb-8">
                    {(news.length > 0 ? news : fallbackNews).map((item, idx) => (
                      <a key={idx} href={item.link} target="_blank" rel="noopener noreferrer" className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-all text-left flex flex-col justify-between">
                        <h3 className="font-semibold text-lg text-usa-blue mb-2">{item.title}</h3>
                        <p className="text-gray-600 text-sm mb-4">{item.contentSnippet}</p>
                        <span className="text-xs text-gray-400 mt-auto">Ver noticia en USCIS</span>
                      </a>
                    ))}
                  </div>
                  {lastUpdated && (
                    <p className="text-sm text-gray-500 mb-4">
                      Última actualización: {new Date(lastUpdated).toLocaleString('es-ES', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                      {isFallback && ' (datos en caché)'}
                    </p>
                  )}
                  <a
                    href="https://www.uscis.gov/newsroom"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-usa-blue text-white px-8 py-3 rounded-lg font-semibold hover:bg-usa-blue-dark transition-colors duration-200 shadow-md mt-4"
                  >
                    Ver todas las noticias de USCIS
                  </a>
                </>
              )}
            </div>
          </section>
          <section className="w-full py-16 bg-brand-navy text-white">
            <div className="container mx-auto px-4 max-w-4xl text-center">
              <h2 className="text-3xl font-bold mb-4">Estamos aquí para ayudarte.</h2>
              <p className="text-lg text-gray-200 mb-8 max-w-3xl mx-auto">
                En Mardini Law Firm entendemos que las decisiones migratorias pueden cambiar el futuro de una persona y su familia. Permítenos evaluar tu caso y brindarte una estrategia legal diseñada para proteger tus derechos y alcanzar tus objetivos.
              </p>
              <a
                href="#contacto"
                className="inline-flex items-center bg-white text-brand-navy py-3 px-8 rounded-lg font-semibold hover:bg-brand-silver transition-colors duration-200 shadow-md"
              >
                Agenda una Consulta
                <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
            </div>
          </section>
        </main>
      </Layout>
    </>
  );
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'es', ['common'])),
    },
  };
};
