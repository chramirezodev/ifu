import type { NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Layout from '@/components/layout/Layout';
import Hero from '@/components/sections/Hero';
import Welcome from '@/components/sections/Welcome';
import Services from '@/components/sections/Services';
import WhyChooseUs from '@/components/sections/WhyChooseUs';
import FAQ from '@/components/sections/FAQ';
import Priority from '@/components/sections/Priority';
import Testimonials from '@/components/sections/Testimonials';
import Contact from '@/components/sections/Contact';
import SEO from '@/components/common/SEO';
import { contactInfo } from '@/constants';

const Home: NextPage = () => {
  return (
    <Layout>
      <SEO />
      <Hero />
      <Welcome />
      <Priority />
      <Services />
      <WhyChooseUs />
      <FAQ />
      <Testimonials />
      <Contact />
    </Layout>
  );
};

export const getStaticProps = async ({ locale }: { locale: string }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
};

export default Home; 