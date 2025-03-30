import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';

const LanguageSelector: React.FC = () => {
  const router = useRouter();
  const { pathname, asPath, query } = router;
  const { i18n } = useTranslation();

  useEffect(() => {
    console.log('Current locale:', router.locale);
    console.log('Loaded namespaces:', i18n.reportNamespaces?.getUsedNamespaces?.() || []);
    console.log('Language changed:', i18n.language);
  }, [router.locale, i18n]);

  const handleLanguageChange = (newLocale: string) => {
    console.log('Changing language to:', newLocale);
    document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=31536000`;
    router.push({ pathname, query }, asPath, { locale: newLocale });
  };

  return (
    <div className="flex items-center space-x-2">
      <button
        onClick={() => handleLanguageChange('es')}
        className={`text-sm font-medium transition-colors duration-200 ${
          router.locale === 'es'
            ? 'text-usa-blue font-bold'
            : 'text-gray-500 hover:text-usa-blue'
        }`}
        aria-label="Cambiar a español"
      >
        ES
      </button>
      <span className="text-gray-300">|</span>
      <button
        onClick={() => handleLanguageChange('en')}
        className={`text-sm font-medium transition-colors duration-200 ${
          router.locale === 'en'
            ? 'text-usa-blue font-bold'
            : 'text-gray-500 hover:text-usa-blue'
        }`}
        aria-label="Change to English"
      >
        EN
      </button>
    </div>
  );
};

export default LanguageSelector; 