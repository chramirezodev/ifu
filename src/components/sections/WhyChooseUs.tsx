import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ReasonCardProps {
  title: string;
  description: string;
  expandedDescription: string;
}

const ReasonCard: React.FC<ReasonCardProps> = ({
  title,
  description,
  expandedDescription,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col"
    >
      <div className="p-6 flex-grow flex flex-col">
        <h3 className="text-xl font-bold mb-3">{title}</h3>
        <p className="text-gray-600 mb-4">{description}</p>
        
        <div className="mt-auto">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-usa-blue hover:text-usa-blue-dark font-medium"
          >
            {isExpanded ? 'Ver menos' : 'Ver más'}
          </button>

          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden mt-4"
              >
                <p className="text-gray-600">{expandedDescription}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};

const WhyChooseUs = () => {
  const reasons = [
    {
      title: "Sabemos lo que necesitas",
      description: "Más de 5 años de experiencia en la industria.",
      expandedDescription: "Somos inmigrantes y entendemos tu situación. Con más de 5 años de experiencia en la industria y una sólida formación como paralegal, nos enfocamos en preparar tus documentos migratorios con precisión y eficiencia."
    },
    {
      title: "Atención al Detalle",
      description: "Nos aseguramos de que cada documento cumpla con los requisitos establecidos por el USCIS.",
      expandedDescription: "Nos aseguramos de que tu documentación esté completa y correcta. Sabemos que los trámites migratorios son complejos, por lo que nos aseguramos de que cada documento esté correctamente preparado y cumpla con los requisitos establecidos por el USCIS."
    },
    {
      title: "Servicio Personalizado",
      description: "Adaptamos nuestros servicios a las necesidades específicas de cada cliente.",
      expandedDescription: "Cada caso es único y lo tratamos con el cuidado que merece. En Immigration For Us, nos aseguramos de tratar cada solicitud con la atención y el detalle que requiere, adaptándonos a las necesidades específicas de cada cliente."
    },
    {
      title: "Asistencia en todo EE.UU. y el mundo",
      description: "Asistimos a clientes en todos los estados de EE.UU. y en el extranjero.",
      expandedDescription: "No importa dónde estés, podemos ayudarte. Aunque nuestra sede está en Parkland, Florida, podemos asistir a clientes en todos los estados de EE. UU. y en cualquier país, gracias a las herramientas tecnológicas que nos permiten ofrecer un servicio eficiente y remoto."
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">¿Por qué Elegir Immigration For Us?</h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto">
            CONFIANZA Y PROFESIONALISMO EN LA PREPARACIÓN DE DOCUMENTOS MIGRATORIOS
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {reasons.map((reason, index) => (
            <ReasonCard
              key={index}
              title={reason.title}
              description={reason.description}
              expandedDescription={reason.expandedDescription}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs; 