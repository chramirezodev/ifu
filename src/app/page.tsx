import Services from '@/components/sections/Services';
import WhyChooseUs from '@/components/sections/WhyChooseUs';
import Testimonials from '@/components/sections/Testimonials';
import Contact from '@/components/sections/Contact';
import News from '@/components/sections/News';

export default function Home() {
  return (
    <main>
      <Hero />
      <About {...siteData.about} />
      <Services />
      <WhyChooseUs />
      <News />
      <Testimonials />
      <Contact />
    </main>
  );
} 