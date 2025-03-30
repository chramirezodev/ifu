import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import Header from './Header';
import Footer from './Footer';
import WhatsAppButton from '../WhatsAppButton';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const router = useRouter();
  const { i18n } = useTranslation();
  const [activeSection, setActiveSection] = useState('inicio');

  useEffect(() => {
    // Asegurarse de que el idioma esté sincronizado con la URL
    if (router.locale && router.locale !== i18n.language) {
      i18n.changeLanguage(router.locale);
    }
  }, [router.locale, i18n]);

  useEffect(() => {
    // Solo manejamos el scroll si hay un hash en la URL
    if (router.asPath.includes('#')) {
      const hash = router.asPath.split('#')[1];
      const element = document.getElementById(hash);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    } else {
      // Si no hay hash, scroll al inicio
      window.scrollTo(0, 0);
    }
  }, [router.asPath]);

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('section[id]');
      const scrollY = window.pageYOffset;
      
      sections.forEach(section => {
        const sectionHeight = (section as HTMLElement).offsetHeight;
        const sectionTop = (section as HTMLElement).offsetTop - 100;
        const sectionId = section.getAttribute('id');
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          setActiveSection(sectionId || 'inicio');
        }
      });
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header activeSection={activeSection} />
      <main className="flex-grow pt-20">
        {children}
      </main>
      <Footer />
      <WhatsAppButton phoneNumber="+19545884018" />
    </div>
  );
};

export default Layout; 