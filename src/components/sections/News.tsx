import React from 'react';
import { motion } from 'framer-motion';

const News = () => {
  return (
    <section className="py-16 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.h2 
            className="text-4xl font-bold mb-4 text-gray-900"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Noticias USCIS
          </motion.h2>
          <motion.div 
            className="w-24 h-1 bg-usa-blue mx-auto mb-6"
            initial={{ width: 0 }}
            whileInView={{ width: 96 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          />
          <motion.p 
            className="text-xl text-gray-600 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Mantente informado sobre las últimas actualizaciones y noticias del Servicio de Ciudadanía e Inmigración de Estados Unidos
          </motion.p>
        </motion.div>

        <motion.div
          className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <a 
            href="https://www.uscis.gov/newsroom" 
            target="_blank" 
            rel="noopener noreferrer"
            className="block hover:bg-gray-50 transition-colors duration-300"
          >
            <div className="p-8">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-bold text-usa-blue">Sala de Prensa USCIS</h3>
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-6 w-6 text-usa-blue" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" 
                  />
                </svg>
              </div>
              <p className="mt-4 text-gray-600">
                Accede a las últimas noticias, actualizaciones de políticas, alertas y comunicados de prensa oficiales del USCIS.
              </p>
            </div>
          </a>
        </motion.div>

        {/* Nota legal */}
        <motion.div 
          className="mt-12 text-center text-gray-500 text-sm max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <p className="italic">
            Nota: Como paralegales, nuestro rol es preparar y presentar los documentos ante el USCIS. 
            No ofrecemos asesoría legal ni representación en audiencias o casos complejos.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default News; 