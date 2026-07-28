import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

interface ReasonCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  expandedDescription?: string;
  index: number;
}

const reasons = [
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: 'Experiencia en Litigio y Procesos Migratorios',
    description: 'Experiencia representando clientes ante USCIS, las Cortes de Inmigración (EOIR) y la Junta de Apelaciones de Inmigración (BIA).',
    expandedDescription: 'Nuestra práctica abarca una amplia variedad de asuntos migratorios, desde solicitudes de beneficios ante USCIS hasta la representación en procesos de remoción, apelaciones y otros procedimientos complejos. Esa experiencia nos permite abordar cada caso con preparación y criterio jurídico.'
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
      </svg>
    ),
    title: 'Atención Personalizada',
    description: 'Creemos que una buena representación comienza con una comunicación clara y accesible.',
    expandedDescription: 'Nos tomamos el tiempo para escuchar tu historia, responder tus inquietudes y mantenerte informado sobre el avance de tu caso. Queremos que comprendas cada etapa del proceso y tomes decisiones con tranquilidad y confianza.'
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
    title: 'Compromiso',
    description: 'Tu caso recibe la dedicación, el tiempo y la atención que merece.',
    expandedDescription: 'Entendemos que detrás de cada expediente hay una persona, una familia y un proyecto de vida. Por eso asumimos cada representación con profesionalismo, ética y un compromiso genuino de buscar la mejor solución legal para nuestros clientes.'
  }
];

const ReasonCard: React.FC<ReasonCardProps> = ({ icon, title, description, expandedDescription, index }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div 
      className="bg-white rounded-xl shadow-lg p-6 relative overflow-hidden group hover:shadow-xl transition-all duration-300"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
    >
      <div className="relative z-10 mb-4">
        <div className="bg-usa-blue text-white p-3 rounded-lg inline-flex items-center justify-center w-12 h-12 group-hover:bg-brand-silver group-hover:text-brand-navy transition-colors duration-300">
          {icon}
        </div>
      </div>
      
      <h3 className="text-xl font-bold text-gray-900 mb-3 relative z-10">{title}</h3>
      <p className="text-gray-600 relative z-10">{description}</p>
      
      {expandedDescription && (
        <button 
          onClick={() => setIsExpanded(!isExpanded)} 
          className="text-usa-blue hover:text-brand-silver font-medium mt-2 flex items-center text-sm relative z-10 transition-colors duration-300"
        >
          {isExpanded ? 'Ver menos' : 'Ver más'}
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className={`ml-1 w-4 h-4 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      )}
      
      <AnimatePresence>
        {isExpanded && expandedDescription && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="relative z-10"
          >
            <p className="text-gray-600 mt-3 pt-3 border-t border-gray-100">{expandedDescription}</p>
          </motion.div>
        )}
      </AnimatePresence>
      
      <div className="absolute top-0 right-0 w-24 h-24 bg-usa-blue/5 rounded-bl-full transform translate-x-8 -translate-y-8 group-hover:bg-brand-silver/10 transition-colors duration-300" />
      <div className="absolute -bottom-1 -left-1 right-0 h-1 bg-usa-blue group-hover:bg-brand-silver transition-colors duration-300" />
    </motion.div>
  );
};

const WhyChooseUs = () => {
  return (
    <section id="por-que-elegirnos" className="py-24 bg-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-usa-blue/5 rounded-bl-full -translate-y-1/4 translate-x-1/4" />
      <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-brand-silver/10 rounded-tr-full translate-y-1/4 -translate-x-1/4" />
      
      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        <motion.div 
          className="text-center mb-16"
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
            ¿Por qué elegirnos?
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
            Representación legal estratégica, personalizada y comprometida
          </motion.p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reasons.map((reason, index) => (
            <ReasonCard 
              key={index} 
              icon={reason.icon}
              title={reason.title}
              description={reason.description}
              expandedDescription={reason.expandedDescription}
              index={index}
            />
          ))}
        </div>
        
        <motion.div 
          className="mt-20 bg-white rounded-2xl shadow-xl overflow-hidden"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="relative h-80 lg:h-auto overflow-hidden">
              <div className="absolute inset-0 bg-usa-blue/90 mix-blend-multiply" />
              <Image 
                src="/images/hands-3331229_1920_.jpg" 
                alt="Equipo de Mardini Law Firm comprometido con tu defensa migratoria" 
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                loading="lazy"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="p-8 text-center">
                  <h3 className="text-3xl font-bold text-white mb-4">TU FUTURO MERECE UNA DEFENSA SÓLIDA</h3>
                  <p className="text-white/90 text-lg">
                    Profesionalismo, preparación y dedicación en cada representación.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="p-8 lg:p-12">
              <h3 className="text-2xl font-bold mb-6 text-gray-900">Tu futuro merece una defensa sólida</h3>
              <div className="space-y-4 mb-8">
                <p className="text-gray-600 text-justify">
                  Enfrentar un proceso migratorio puede generar incertidumbre, pero no tienes que hacerlo solo. En <strong>Mardini Law Firm</strong> encontrarás un equipo comprometido con proteger tus derechos y representar tus intereses con profesionalismo, preparación y dedicación.
                </p>
                <p className="text-gray-600 text-justify">
                  Creemos que detrás de cada caso hay una historia, una familia y un proyecto de vida. Por eso asumimos cada representación con el compromiso de buscar la mejor solución legal para nuestros clientes.
                </p>
              </div>
              <motion.a 
                href="#contacto" 
                className="inline-flex items-center bg-usa-blue text-white py-3 px-6 rounded-lg font-medium shadow-md hover:bg-usa-blue-dark transition-colors self-start"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <span>Habla con un Abogado</span>
                <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                </svg>
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>
      
      <div className="relative h-24 mt-16 overflow-hidden">
        <svg className="absolute bottom-0 w-full h-24 text-white" viewBox="0 0 1440 100" preserveAspectRatio="none">
          <path fill="currentColor" d="M0,0L120,10.7C240,21,480,43,720,42.7C960,43,1200,21,1320,10.7L1440,0L1440,100L1320,100C1200,100,960,100,720,100C480,100,240,100,120,100L0,100Z"></path>
        </svg>
      </div>
    </section>
  );
};

export default WhyChooseUs;
