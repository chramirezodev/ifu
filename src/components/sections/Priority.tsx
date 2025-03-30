import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

const Priority = () => {
  // Array de características con iconos
  const features = [
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
        </svg>
      ),
      title: "Confiabilidad",
      description: "Puedes confiar en nosotros para manejar tu proceso con integridad y profesionalismo."
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "Eficiencia",
      description: "Optimizamos cada paso para que tu proceso avance de manera rápida y segura."
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
        </svg>
      ),
      title: "Experiencia",
      description: "Contamos con el conocimiento y la experiencia para resolver cualquier situación migratoria."
    },
  ];

  return (
    <section id="nuestra-prioridad" className="py-24 bg-white relative overflow-hidden">
      {/* Elementos decorativos */}
      <div className="absolute top-0 right-0 w-1/3 h-96 bg-gradient-to-b from-usa-red/5 to-transparent rounded-bl-full -translate-y-1/4"></div>
      <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-usa-blue/5 rounded-full"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Imagen con efectos */}
          <motion.div 
            className="lg:w-1/2 relative"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative w-full max-w-md mx-auto lg:mx-0">
              <div className="aspect-w-4 aspect-h-3 relative rounded-2xl overflow-hidden shadow-2xl">
                <Image 
                  src="/images/connect-20333_1920.jpg" 
                  alt="Nuestra prioridad es tu tranquilidad" 
                  width={600}
                  height={450}
                  className="object-cover w-full h-full"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-usa-blue/40 to-transparent mix-blend-multiply"></div>
              </div>
              
              {/* Elementos decorativos sobre la imagen */}
              <motion.div 
                className="absolute -top-5 -right-5 bg-usa-red text-white p-4 rounded-lg shadow-lg w-24 h-24 flex items-center justify-center"
                initial={{ rotate: -10, scale: 0.9 }}
                whileInView={{ rotate: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <div className="text-center">
                  <span className="block text-sm font-medium">+5</span>
                  <span className="block text-xs">Años de experiencia</span>
                </div>
              </motion.div>
              
              <motion.div 
                className="absolute -bottom-6 right-10 w-32 h-32 bg-white p-4 rounded-full shadow-lg flex items-center justify-center"
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <div className="text-center">
                  <span className="block text-usa-blue font-bold text-xl">100%</span>
                  <span className="block text-gray-600 text-sm">Dedicación</span>
                </div>
              </motion.div>
            </div>
          </motion.div>
          
          {/* Contenido de texto */}
          <motion.div 
            className="lg:w-1/2"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <motion.h2 
              className="text-4xl font-bold mb-6 text-gray-900"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              Nuestra Prioridad: Tu Tranquilidad
            </motion.h2>
            
            <motion.div 
              className="w-24 h-1 bg-usa-blue mb-8"
              initial={{ width: 0 }}
              whileInView={{ width: 96 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            />
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-8 space-y-4 text-lg text-gray-700"
            >
              <p>
                Somos inmigrantes y conocemos los desafíos que se presentan al establecerse en este país.
                Por eso, te acompañamos en cada paso del proceso para que tú y tu familia tengan la mejor
                orientación y respaldo.
              </p>
              <p>
                Nuestro objetivo es brindarte la tranquilidad de que tu caso está siendo manejado por
                profesionales que entienden tu situación y se preocupan por tu éxito.
              </p>
            </motion.div>
            
            {/* Características con animación */}
            <div className="space-y-4">
              {features.map((feature, index) => (
                <motion.div 
                  key={index}
                  className="flex items-start"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 + (index * 0.1) }}
                >
                  <div className="bg-usa-blue/10 p-3 rounded-lg text-usa-blue mr-4 mt-1">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
            
            {/* Botón de acción */}
            <motion.div
              className="mt-10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <motion.a 
                href="#contacto" 
                className="inline-flex items-center bg-usa-blue text-white py-3 px-8 rounded-lg font-medium shadow-lg hover:bg-usa-blue-dark transition-all duration-300 hover:shadow-xl"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <span>Agenda tu Consulta</span>
                <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                </svg>
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Priority; 