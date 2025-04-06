import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import LanguageSelector from '@/components/common/LanguageSelector';
import { motion, AnimatePresence } from 'framer-motion';

interface NavItem {
  label: string;
  href: string;
  translationKey: string;
}

interface HeaderProps {
  activeSection?: string;
}

const Header: React.FC<HeaderProps> = ({ activeSection }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const router = useRouter();
  const { t, i18n } = useTranslation('common');

  const navigation: NavItem[] = [
    { label: 'inicio', href: '#inicio', translationKey: 'nav.home' },
    { label: 'nosotros', href: '#nosotros', translationKey: 'nav.about' },
    { label: 'servicios', href: '#servicios', translationKey: 'nav.services' },
    { label: 'por-que-elegirnos', href: '#por-que-elegirnos', translationKey: 'nav.choose' },
    { label: 'preguntas', href: '#preguntas-frecuentes', translationKey: 'nav.questions' },
    { label: 'testimonios', href: '#testimonios', translationKey: 'nav.testimonials' },
    { label: 'contactenos', href: '#contacto', translationKey: 'nav.contact' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleLanguage = () => {
    const newLang = i18n.language === 'es' ? 'en' : 'es';
    i18n.changeLanguage(newLang);
    router.push(router.pathname, router.pathname, { locale: newLang });
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 bg-white transition-all duration-300 ${isScrolled ? 'shadow-md' : ''}`}>
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <Image
              src="/images/logo.svg"
              alt={t('nav.logo.alt')}
              width={180}
              height={50}
              className="h-12 w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex lg:items-center lg:space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-gray-900 hover:text-usa-blue px-3 py-2 text-sm font-medium transition-colors duration-200 ${
                  activeSection === item.label ? 'text-usa-blue' : ''
                }`}
              >
                {t(item.translationKey)}
              </Link>
            ))}
            
            {/* Language Toggle */}
            <button
              onClick={toggleLanguage}
              className="ml-4 px-3 py-1 rounded-md text-sm font-medium text-gray-900 hover:text-usa-blue transition-colors duration-200"
            >
              {i18n.language === 'es' ? 'EN' : 'ES'}
            </button>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-900 hover:text-usa-blue focus:outline-none"
            aria-expanded="false"
          >
            <span className="sr-only">{isMenuOpen ? t('nav.aria.close') : t('nav.aria.open')}</span>
            {/* Hamburger icon */}
            <svg
              className="h-6 w-6"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden"
            >
              <div className="px-2 pt-2 pb-3 space-y-1">
                {navigation.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:text-usa-blue transition-colors duration-200 ${
                      activeSection === item.label ? 'text-usa-blue' : ''
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {t(item.translationKey)}
                  </Link>
                ))}
                {/* Language Toggle in Mobile Menu */}
                <button
                  onClick={() => {
                    toggleLanguage();
                    setIsMenuOpen(false);
                  }}
                  className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:text-usa-blue transition-colors duration-200"
                >
                  {i18n.language === 'es' ? 'English' : 'Español'}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
};

export default Header; 