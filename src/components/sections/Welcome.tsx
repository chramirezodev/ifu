import React from 'react';
import { motion } from 'framer-motion';

const Welcome: React.FC = () => {
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
            Bienvenido a Immigration for US
          </h2>
          <div className="space-y-6 text-lg text-gray-700">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Somos un equipo de paralegales especializados en inmigración con amplia experiencia en la preparación y presentación de documentos migratorios ante el USCIS (United States Citizenship and Immigration Services - Servicios de Ciudadanía e Inmigración de los Estados Unidos). Nos dedicamos a ayudar a personas como tú a cumplir su sueño de una nueva vida en los Estados Unidos.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Fundada en 2021, nuestra empresa tiene como objetivo ofrecer un servicio profesional y confiable en la preparación y presentación de documentos ante el USCIS. Nos aseguramos de que toda la documentación esté correcta, completa y cumpla con los requisitos exigidos. Aunque no brindamos asesoría legal ni representación, nuestro compromiso es garantizar que tu proceso migratorio se lleve a cabo sin contratiempos.
            </motion.p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Welcome; 