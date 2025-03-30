import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface FAQItemProps {
  question: string;
  answer: string;
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 border-l-4 border-usa-blue"
    >
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full p-6 text-left flex justify-between items-center"
      >
        <h3 className="text-xl font-bold text-gray-800 group-hover:text-usa-blue transition-colors duration-300">{question}</h3>
        <span className={`transform transition-transform duration-500 ${isExpanded ? 'rotate-180' : ''}`}>
          <svg
            className="w-6 h-6 text-usa-blue"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </span>
      </button>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.5, ease: [0.04, 0.62, 0.23, 0.98] }}
          >
            <div className="px-6 pb-6">
              <p className="text-gray-600 leading-relaxed">{answer}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const FAQ = () => {
  const faqs = [
    {
      question: "¿Qué documentos necesito para solicitar una visa?",
      answer: "Los documentos varían dependiendo del tipo de visa que estés solicitando. Generalmente, necesitarás una solicitud de visa, pasaporte válido, prueba de fondos, fotos tipo visa y documentos específicos según el tipo de visa (como una oferta de trabajo, carta de aceptación de la universidad o evidencia de la relación familiar). Te ayudaré a identificar todos los documentos necesarios para tu caso."
    },
    {
      question: "¿Cuánto tiempo tarda el proceso de solicitud de residencia?",
      answer: "El tiempo de espera para la residencia permanente varía según tu situación y el tipo de solicitud. En promedio, el proceso puede tardar entre 12 meses y 3 años. Estaré aquí para ayudarte a hacer el seguimiento de tu caso y mantenerte informado/a de cualquier actualización."
    },
    {
      question: "¿Puedo trabajar mientras mi solicitud está en proceso?",
      answer: "Depende del tipo de solicitud. Si tienes una visa de trabajo o si tu solicitud de residencia incluye un permiso de trabajo, podrás trabajar mientras esperas la aprobación. En algunos casos, podemos solicitar un permiso de trabajo provisional."
    },
    {
      question: "¿Qué sucede si mi solicitud es rechazada?",
      answer: "Si tu solicitud es rechazada, existen opciones disponibles, como apelar la decisión o presentar una nueva solicitud. Te ayudaré a entender las razones del rechazo y a explorar las mejores opciones para seguir adelante."
    }
  ];

  return (
    <section id="preguntas-frecuentes" className="py-20 bg-gray-50 relative overflow-hidden">
      {/* Elementos decorativos */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-usa-blue/5 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-usa-red/5 rounded-full translate-x-1/3 translate-y-1/3"></div>
      
      <div className="container mx-auto px-4 relative z-10">
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
            Preguntas Frecuentes (FAQ)
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
            Resolvemos tus dudas sobre el proceso migratorio
          </motion.p>
        </motion.div>

        <div className="max-w-4xl mx-auto space-y-6">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <FAQItem
                question={faq.question}
                answer={faq.answer}
              />
            </motion.div>
          ))}
        </div>
        
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <motion.a 
            href="#contacto" 
            className="inline-flex items-center bg-usa-blue text-white py-3 px-8 rounded-lg font-medium shadow-lg hover:bg-usa-blue-dark transition-all duration-300 hover:shadow-xl"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <span>¿Tienes más preguntas? Contáctanos</span>
            <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
            </svg>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ; 