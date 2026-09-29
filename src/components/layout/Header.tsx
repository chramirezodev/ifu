import React, { useState, useEffect } from 'react';
import Link from 'next/link';
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
  // Logo fino SVG (azul/gris): se escala solo con CSS para no engrosar trazos.
  const logoSrc = '/images/Logos/mardini-logo-header.svg';

  // Fuera de la home las anclas deben apuntar a "/", si no quedan como /servicios/x#servicios.
  const sectionPrefix = router.pathname === '/' ? '' : '/';

  const navigation: NavItem[] = [
    { label: 'inicio', href: `${sectionPrefix}#inicio`, translationKey: 'nav.home' },
    { label: 'nosotros', href: `${sectionPrefix}#nosotros`, translationKey: 'nav.about' },
    { label: 'servicios', href: `${sectionPrefix}#servicios`, translationKey: 'nav.services' },
    { label: 'por-que-elegirnos', href: `${sectionPrefix}#por-que-elegirnos`, translationKey: 'nav.choose' },
    { label: 'paga-aqui', href: siteSettings.paymentUrl, translationKey: 'nav.pay', external: true },
    { label: 'contactenos', href: `${sectionPrefix}#contacto`, translationKey: 'nav.contact' }
  ];

  const currentLocale = router.locale || i18n.language;

  const switchLocale = (locale: 'es' | 'en') => {
    setIsMenuOpen(false);
    if (locale === currentLocale) return;
    router.push(router.asPath.split('#')[0], undefined, { locale });
  };

  const languageButtonClass = (locale: 'es' | 'en', size: string) =>
    `${size} font-medium transition-colors duration-200 ${currentLocale === locale ? 'text-usa-blue font-bold' : 'text-gray-500 hover:text-usa-blue'}`;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 bg-white transition-all duration-300 ${isScrolled ? 'shadow-md' : ''}`}>
      <nav aria-label={t('nav.aria.main')} className="w-full px-3 pl-[max(0.75rem,env(safe-area-inset-left))] pr-[max(0.75rem,env(safe-area-inset-right))] sm:px-5 lg:px-6">
        <div className="flex justify-between items-center gap-2 sm:gap-3 py-2 min-h-0 leading-none md:py-2.5">
          <Link
            href="/"
            className="flex min-w-0 flex-1 items-center overflow-visible pr-2 lg:flex-none lg:shrink-0"
            aria-label={t('nav.aria.home')}
          >
            {/* SVG nativo: nítido en Retina; el tamaño crece sin engrosar el diseño */}
            <img
              src={logoSrc}
              alt={t('nav.logo.alt')}
              width={2222}
              height={585}
              className="block h-[37px] w-auto max-w-[9.5rem] object-contain object-left sm:h-[41px] sm:max-w-[10.75rem]"
              decoding="async"
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
                  {t(item.translationKey)}
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
                type="button"
                onClick={() => switchLocale('es')}
                className={languageButtonClass('es', 'text-sm')}
                aria-label={t('language.es')}
                aria-pressed={currentLocale === 'es'}
                lang="es"
              >
                ES
              </button>
              <span className="text-gray-300">|</span>
              <button
                type="button"
                onClick={() => switchLocale('en')}
                className={languageButtonClass('en', 'text-sm')}
                aria-label={t('language.en')}
                aria-pressed={currentLocale === 'en'}
                lang="en"
              >
                EN
              </button>
            </div>
          </div>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden inline-flex shrink-0 items-center justify-center p-2 rounded-md text-gray-900 hover:text-usa-blue focus:outline-none"
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
                      {t(item.translationKey)}
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
                    type="button"
                    onClick={() => switchLocale('es')}
                    className={languageButtonClass('es', 'text-base')}
                    aria-label={t('language.es')}
                    aria-pressed={currentLocale === 'es'}
                    lang="es"
                  >
                    ES
                  </button>
                  <span className="text-gray-300">|</span>
                  <button
                    type="button"
                    onClick={() => switchLocale('en')}
                    className={languageButtonClass('en', 'text-base')}
                    aria-label={t('language.en')}
                    aria-pressed={currentLocale === 'en'}
                    lang="en"
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
