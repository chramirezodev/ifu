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
      className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
    >
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full p-6 text-left flex justify-between items-center"
      >
        <h3 className="text-xl font-bold text-gray-800">{question}</h3>
        <span className={`transform transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}>
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
            transition={{ duration: 0.3 }}
          >
            <div className="px-6 pb-6">
              <p className="text-gray-600">{answer}</p>
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
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Preguntas Frecuentes (FAQ)</h2>
        </div>

        <div className="max-w-4xl mx-auto space-y-6">
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              question={faq.question}
              answer={faq.answer}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ; 