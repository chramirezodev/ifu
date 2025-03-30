import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'next-i18next';

const Priority = () => {
  const { t } = useTranslation('common');

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-4xl font-bold mb-6 text-gray-900">
            Nuestra Prioridad: Tu Tranquilidad
          </h2>
          <div className="space-y-6 text-lg text-gray-700">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Somos inmigrantes y conocemos los desafíos que se presentan al establecerse en este país. 
              Por eso, te acompañamos en cada paso del proceso para que tú y tu familia tengan la mejor 
              orientación y respaldo.
            </motion.p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Priority; 