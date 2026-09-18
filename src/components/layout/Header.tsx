import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { useCMS } from '@/context/CMSContext';

interface NavItem {
  label: string;
  href: string;
  translationKey: string;
  external?: boolean;
}

interface HeaderProps {
  activeSection?: string;
}

const Header: React.FC<HeaderProps> = ({ activeSection }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const router = useRouter();
  const { t, i18n } = useTranslation('common');
  const { siteSettings } = useCMS();
  const logoSrc = siteSettings.logoUrl || '/images/Logos/mardini-logo.png';

  const navigation: NavItem[] = [
    { label: 'inicio', href: '#inicio', translationKey: 'nav.home' },
    { label: 'nosotros', href: '#nosotros', translationKey: 'nav.about' },
    { label: 'servicios', href: '#servicios', translationKey: 'nav.services' },
    { label: 'por-que-elegirnos', href: '#por-que-elegirnos', translationKey: 'nav.choose' },
    { label: 'paga-aqui', href: siteSettings.paymentUrl, translationKey: 'nav.pay', external: true },
    { label: 'contactenos', href: '#contacto', translationKey: 'nav.contact' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 bg-white transition-all duration-300 ${isScrolled ? 'shadow-md' : ''}`}>
      <nav className="w-full px-3 sm:px-5 lg:px-6">
        <div className="flex justify-between items-center gap-3 py-1 min-h-0 leading-none">
          <Link
            href="/"
            className="flex shrink-0 items-center leading-none"
            aria-label={t('nav.aria.home')}
          >
            <Image
              src={logoSrc}
              alt={t('nav.logo.alt')}
              width={1024}
              height={341}
              className="h-11 md:h-12 w-auto object-contain object-left block"
              priority
            />
          </Link>

          <div className="hidden lg:flex lg:items-center lg:justify-end lg:flex-1 lg:min-w-0 lg:gap-x-2.5 xl:gap-x-3">
            {navigation.map((item) =>
              item.external ? (
                <a
                  key={item.href}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-usa-blue text-white hover:bg-usa-blue-dark px-2.5 py-1 rounded-md text-xs font-semibold transition-colors duration-200 shadow-sm whitespace-nowrap leading-none"
                >
                  {t(item.translationKey, { defaultValue: 'PAGA AQUÍ' })}
                </a>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-gray-900 hover:text-usa-blue px-1 py-1 text-xs font-medium transition-colors duration-200 whitespace-nowrap leading-none ${
                    activeSection === item.label ? 'text-usa-blue' : ''
                  }`}
                >
                  {t(item.translationKey)}
                </Link>
              )
            )}
            
            <div className="flex items-center space-x-2 ml-1 flex-shrink-0">
              <button
                onClick={() => {
                  i18n.changeLanguage('es');
                  router.push(router.pathname, router.pathname, { locale: 'es' });
                }}
                className={`text-sm font-medium transition-colors duration-200 ${i18n.language === 'es' ? 'text-usa-blue font-bold' : 'text-gray-500 hover:text-usa-blue'}`}
                aria-label="Cambiar a español"
              >
                ES
              </button>
              <span className="text-gray-300">|</span>
              <button
                onClick={() => {
                  i18n.changeLanguage('en');
                  router.push(router.pathname, router.pathname, { locale: 'en' });
                }}
                className={`text-sm font-medium transition-colors duration-200 ${i18n.language === 'en' ? 'text-usa-blue font-bold' : 'text-gray-500 hover:text-usa-blue'}`}
                aria-label="Change to English"
              >
                EN
              </button>
            </div>
          </div>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-900 hover:text-usa-blue focus:outline-none"
            aria-expanded={isMenuOpen}
          >
            <span className="sr-only">{isMenuOpen ? t('nav.aria.close') : t('nav.aria.open')}</span>
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

        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden"
            >
              <div className="px-2 pt-2 pb-3 space-y-1">
                {navigation.map((item) =>
                  item.external ? (
                    <a
                      key={item.href}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block mx-3 my-2 px-4 py-3 rounded-md text-base font-semibold text-center bg-usa-blue text-white hover:bg-usa-blue-dark transition-colors duration-200"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {t(item.translationKey, { defaultValue: 'PAGA AQUÍ' })}
                    </a>
                  ) : (
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
                  )
                )}
                <div className="flex items-center space-x-2 mt-2 px-3">
                  <button
                    onClick={() => i18n.changeLanguage('es')}
                    className={`text-base font-medium transition-colors duration-200 ${i18n.language === 'es' ? 'text-usa-blue font-bold' : 'text-gray-500 hover:text-usa-blue'}`}
                    aria-label="Cambiar a español"
                  >
                    ES
                  </button>
                  <span className="text-gray-300">|</span>
                  <button
                    onClick={() => i18n.changeLanguage('en')}
                    className={`text-base font-medium transition-colors duration-200 ${i18n.language === 'en' ? 'text-usa-blue font-bold' : 'text-gray-500 hover:text-usa-blue'}`}
                    aria-label="Change to English"
                  >
                    EN
                  </button>
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
