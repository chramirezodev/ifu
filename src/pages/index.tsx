import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Layout from '@/components/layout/Layout';
import Hero from '@/components/sections/Hero';
import Welcome from '@/components/sections/Welcome';
import About from '@/components/sections/About';
import Services from '@/components/sections/Services';
import Contact from '@/components/sections/Contact';
import WhyChooseUs from '@/components/sections/WhyChooseUs';
import FAQ from '@/components/sections/FAQ';
import Testimonials from '@/components/sections/Testimonials';
import { useTranslation } from 'next-i18next';
import SEO from '@/components/common/SEO';
import { contactInfo } from '@/constants';
import Head from 'next/head';

export default function Home() {
  const { t } = useTranslation('common');

  return (
    <>
      <Head>
        <title>Immigration For US - Preparadores de formas de inmigración</title>
        <meta name="description" content="Servicios profesionales de inmigración en Estados Unidos" />
      </Head>
      <Layout>
        <SEO />
        <main className="flex min-h-screen flex-col items-center justify-between">
          <Hero />
          <Welcome />
          <About 
            title="Nosotros"
            content={
              "Somos inmigrantes y conocemos los desafíos que se presentan al establecerse en este país. Por eso, te acompañamos en cada paso del proceso para que tú y tu familia tengan la mejor orientación y respaldo."
            }
            values={[
              {
                title: "Confiabilidad",
                description: "Puedes confiar en nosotros para manejar tu proceso con integridad y profesionalismo."
              },
              {
                title: "Eficiencia",
                description: "Optimizamos cada paso para que tu proceso avance de manera rápida y segura."
              },
              {
                title: "Experiencia",
                description: "Contamos con el conocimiento y la experiencia para resolver cualquier situación migratoria."
              }
            ]}
          />
          <Services />
          <WhyChooseUs />
          <FAQ />
          <Testimonials />
          <Contact />
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