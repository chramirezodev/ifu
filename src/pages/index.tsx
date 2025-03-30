import type { NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Layout from '@/components/layout/Layout';
import Hero from '@/components/sections/Hero';
import Welcome from '@/components/sections/Welcome';
import WhyChooseUs from '@/components/sections/WhyChooseUs';
import FAQ from '@/components/sections/FAQ';
import Priority from '@/components/sections/Priority';
import Services from '@/components/sections/Services';
import Testimonials from '@/components/sections/Testimonials';
import Contact from '@/components/sections/Contact';
import SEO from '@/components/common/SEO';

const contactInfo = {
  email: "cpalisa@immigrationfor-us.com",
  phone: "+1 (954) 588 4018",
  whatsapp: "+1 (954) 588 4018",
  address: "7224 NW 116th Way, Parkland, FL. 33076",
  mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3578.744271041491!2d-80.24334492432244!3d26.22999999099456!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88d906a3c6d9f6f1%3A0x8d9f6f6d6f6d6f6d!2s7224%20NW%20116th%20Way%2C%20Parkland%2C%20FL%2033076!5e0!3m2!1ses!2sus!4v1234567890123!5m2!1ses!2sus",
  workHours: "Lunes a Viernes, 8 am - 6 pm ET"
};

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
      <Contact 
        contactInfo={contactInfo}
        whatsappNumber="+19545884018"
      />
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