import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import LanguageSelector from '@/components/common/LanguageSelector';
import { motion, AnimatePresence } from 'framer-motion';

interface NavItem {
  label: string;
  href: string;
  translationKey: string;
}

interface HeaderProps {
  activeSection: string;
}

const Header: React.FC<HeaderProps> = ({ activeSection }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();
  const { t, i18n } = useTranslation('common');
  const isHome = router.pathname === '/';

  const navigation: NavItem[] = [
    { label: 'inicio', href: '#inicio', translationKey: 'nav.home' },
    { label: 'prioridad', href: '#prioridad', translationKey: 'nav.priority' },
    { label: 'servicios', href: '#servicios', translationKey: 'nav.services' },
    { label: 'por-que-elegirnos', href: '#por-que-elegirnos', translationKey: 'nav.choose' },
    { label: 'preguntas-frecuentes', href: '#preguntas-frecuentes', translationKey: 'nav.questions' },
    { label: 'testimonios', href: '#testimonios', translationKey: 'nav.testimonials' },
    { label: 'contacto', href: '#contacto', translationKey: 'nav.contact' }
  ];

  useEffect(() => {
    setIsMounted(true);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Sincronizar el idioma con la URL
    if (router.locale && router.locale !== i18n.language) {
      i18n.changeLanguage(router.locale);
    }
  }, [router.locale, i18n]);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    
    if (href === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (!isHome) {
      router.push('/').then(() => {
        setTimeout(() => {
          if (href.startsWith('#')) {
            const element = document.querySelector(href);
            element?.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100);
      });
    } else {
      if (href.startsWith('#')) {
        const element = document.querySelector(href);
        element?.scrollIntoView({ behavior: 'smooth' });
      }
    }
    
    setIsMenuOpen(false);
  };

  if (!isMounted) {
    return null;
  }

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-white shadow-md py-2' 
          : 'bg-gradient-to-b from-gray-900/90 to-gray-900/70 py-4'
      }`}
      role="banner"
    >
      <nav className="container mx-auto px-4" role="navigation" aria-label={t('nav.aria.main')}>
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center group" aria-label={t('nav.aria.home')}>
            <div className="relative">
              <Image
                src="/images/Logos/logo.png"
                alt={t('nav.logo.alt')}
                width={180}
                height={60}
                className={`h-12 w-auto transition-transform duration-300 group-hover:scale-105 ${
                  isScrolled ? 'brightness-100' : 'brightness-110'
                }`}
                priority
              />
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            {navigation.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={`relative px-2 py-1 text-sm uppercase tracking-wider font-medium transition-all duration-300 
                  ${isScrolled 
                    ? 'text-gray-600 hover:text-usa-blue' 
                    : 'text-gray-200 hover:text-white'
                  } 
                  ${activeSection === item.href.substring(1) 
                    ? 'font-semibold text-usa-blue' 
                    : ''
                  }
                `}
                onClick={(e) => scrollToSection(e, item.href)}
                aria-current={activeSection === item.href.substring(1) ? 'page' : undefined}
              >
                {t(item.translationKey)}
              </a>
            ))}
            <div className={`border-l pl-6 transition-colors duration-300 ${
              isScrolled ? 'border-gray-300' : 'border-gray-500'
            }`}>
              <LanguageSelector />
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className={`md:hidden p-2 rounded-lg transition-colors duration-300 ${
              isScrolled 
                ? 'text-gray-600 hover:text-usa-blue hover:bg-gray-100' 
                : 'text-gray-200 hover:text-white hover:bg-gray-800'
            }`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? t('nav.aria.close') : t('nav.aria.open')}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
          >
            <span className="sr-only">{isMenuOpen ? t('nav.aria.close') : t('nav.aria.open')}</span>
            {isMenuOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              id="mobile-menu"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="md:hidden mt-4 bg-gray-900/95 backdrop-blur-sm rounded-lg shadow-lg border border-gray-800"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="mobile-menu-button"
            >
              <div className="flex flex-col space-y-4 p-4">
                {navigation.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    className={`text-gray-200 hover:text-white transition-all duration-300 
                      ${activeSection === item.href.substring(1) ? 'font-semibold text-usa-blue' : ''}`}
                    onClick={(e) => scrollToSection(e, item.href)}
                    role="menuitem"
                  >
                    {t(item.translationKey)}
                  </a>
                ))}
                <div className="pt-4 border-t border-gray-700">
                  <LanguageSelector />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
};

export default Header; 