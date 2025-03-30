import React from 'react';
import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import Layout from '@/components/layout/Layout';
import { motion } from 'framer-motion';

const AvisoLegal = () => {
  const { t } = useTranslation('common');

  // Helper function to safely render arrays from translations
  const renderList = (key: string): string[] => {
    try {
      const translation = t(key, { returnObjects: true }) as unknown;
      if (Array.isArray(translation) && translation.every(item => typeof item === 'string')) {
        return translation as string[];
      }
      console.warn(`Translation for key ${key} is not a string array:`, translation);
      return [];
    } catch (error) {
      console.error(`Error rendering list for key ${key}:`, error);
      return [];
    }
  };

  return (
    <Layout>
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto"
          >
            <h1 className="text-3xl md:text-4xl font-bold text-usa-blue mb-8">{t('legal.title')}</h1>
            
            <div className="prose prose-lg max-w-none">
              <section className="mb-8">
                <p className="text-gray-700">{t('legal.intro.p1')}</p>
                <p className="text-gray-700 mt-4">{t('legal.intro.p2')}</p>
                <p className="text-gray-700 mt-4">{t('legal.intro.p3')}</p>
                <p className="text-gray-700 mt-4">{t('legal.intro.p4')}</p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">{t('legal.uso.title')}</h2>
                <p className="text-gray-700">{t('legal.uso.description')}</p>
                <p className="text-gray-700 mt-4">{t('legal.uso.restrictions')}</p>
                <ul className="list-decimal pl-6 mt-2 text-gray-700">
                  {renderList('legal.uso.list').map((item, index) => (
                    <li key={index} className="mb-2">{item}</li>
                  ))}
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">{t('legal.privacy.title')}</h2>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">{t('legal.privacy.info.title')}</h3>
                <p className="text-gray-700">{t('legal.privacy.info.description')}</p>
                <ul className="list-disc pl-6 mt-2 text-gray-700">
                  {renderList('legal.privacy.info.uses').map((item, index) => (
                    <li key={index} className="mb-2">{item}</li>
                  ))}
                </ul>
                <p className="text-gray-700 mt-4">{t('legal.privacy.info.security')}</p>

                <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">{t('legal.privacy.cookies.title')}</h3>
                <p className="text-gray-700">{t('legal.privacy.cookies.description')}</p>

                <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">{t('legal.privacy.emails.title')}</h3>
                <p className="text-gray-700">{t('legal.privacy.emails.description')}</p>

                <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">{t('legal.privacy.thirdParty.title')}</h3>
                <p className="text-gray-700">{t('legal.privacy.thirdParty.description')}</p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">{t('legal.contact.title')}</h2>
                <p className="text-gray-700">{t('legal.contact.intro')}</p>
                <ul className="list-disc pl-6 mt-2 text-gray-700">
                  <li className="mb-2">{t('legal.contact.whatsapp')}</li>
                  <li className="mb-2">{t('legal.contact.email')}</li>
                  <li className="mb-2">{t('legal.contact.location')}</li>
                  <li className="mb-2">{t('legal.contact.hours')}</li>
                </ul>
              </section>

              <div className="mt-12 p-4 bg-gray-50 rounded-lg border border-gray-200">
                <p className="text-sm text-gray-600">{t('legal.footer.update')}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'es', ['common'])),
    },
  };
};

export default AvisoLegal; 