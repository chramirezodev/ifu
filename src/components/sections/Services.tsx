import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useServices } from '@/hooks/useStrapi';
import { getStrapiMedia } from '@/lib/strapi';
import Image from 'next/image';

interface ServiceCardProps {
  title: string;
  description: string;
  expandedDescription?: string;
  image?: string;
  slug: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  title,
  description,
  expandedDescription,
  image,
  slug,
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
      {image && (
        <div className="relative h-48 w-full">
          <Image
            src={image}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover"
            priority={false}
          />
        </div>
      )}
      <div className="p-6 flex-grow flex flex-col">
        <h3 className="text-2xl font-bold mb-3">{title}</h3>
        <p className="text-gray-600 mb-4">{description}</p>
        
        <div className="mt-auto space-y-4">
          {expandedDescription && (
            <>
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
                    className="overflow-hidden"
                  >
                    <p className="text-gray-600">{expandedDescription}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </>
          )}

          <a
            href={`#contacto?service=${slug}`}
            className="inline-flex items-center text-usa-blue hover:text-usa-blue-dark font-medium"
          >
            <svg
              className="w-5 h-5 ml-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </a>
        </div>
      </div>
    </motion.div>
  );
};

const Services = () => {
  const { services, loading, error } = useServices();

  const defaultServices = [
    {
      id: 1,
      attributes: {
        title: "Acompañamiento en solicitudes de visa",
        description: "Te ayudamos con visas de trabajo, estudiantiles y familiares, asegurándonos de que tu solicitud cumpla con todos los requisitos.",
        expandedDescription: "Ya sea que necesites una visa de trabajo, estudiantil o familiar, te ayudaremos a completar tu solicitud correctamente. Te asistiremos en la recopilación de los documentos necesarios, en el llenado de los formularios requeridos y en su presentación de manera que aumenten tus probabilidades de éxito.",
        slug: "visas",
        image: {
          data: {
            attributes: {
              url: ""
            }
          }
        }
      }
    },
    {
      id: 2,
      attributes: {
        title: "Asistencia con la residencia permanente (Green Card)",
        description: "Te guiamos en cada paso para que obtengas tu residencia sin complicaciones.",
        expandedDescription: "Obtener la residencia permanente en los EE. UU. es un proceso largo y, en ocasiones, complicado. Como paralegal especializado en inmigración, te ayudaremos a completar tu solicitud de Green Card, asegurándonos de que todos los formularios estén correctamente llenados y presentados, y que cuentes con la documentación adecuada.",
        slug: "residencia",
        image: {
          data: {
            attributes: {
              url: ""
            }
          }
        }
      }
    },
    {
      id: 3,
      attributes: {
        title: "Naturalización",
        description: "Prepárate con nosotros para convertirte en ciudadano/a estadounidense.",
        expandedDescription: "Si ya tienes la residencia permanente y estás listo para dar el siguiente paso, te ayudaremos a completar el proceso de naturalización para convertirte en ciudadano/a estadounidense. Te apoyaremos en la preparación de tu solicitud, en la recopilación de los documentos necesarios y en la preparación para la entrevista de ciudadanía.",
        slug: "naturalizacion",
        image: {
          data: {
            attributes: {
              url: ""
            }
          }
        }
      }
    },
    {
      id: 4,
      attributes: {
        title: "Consultas sobre asilo afirmativo",
        description: "Te orientamos en el proceso de solicitud para que tu caso esté bien documentado.",
        expandedDescription: "Si buscas asilo o protección en los EE. UU., te ayudaremos a comprender los requisitos del proceso y a completar las solicitudes pertinentes. Juntos nos aseguraremos de que tu solicitud esté correctamente presentada y respaldada con la información adecuada.",
        slug: "asilo",
        image: {
          data: {
            attributes: {
              url: ""
            }
          }
        }
      }
    },
    {
      id: 5,
      attributes: {
        title: "Visa VAWA (Violence Against Women Act)",
        description: "Protegemos tu derecho a permanecer en EE.UU. si has sido víctima de abuso.",
        expandedDescription: "Es un recurso legal en los Estados Unidos diseñado para proteger a personas que han sido víctimas de abuso por parte de su cónyuge, padre/madre o hijo ciudadano estadounidense o residente legal. Este programa ofrece la oportunidad de solicitar protección y regularizar su estatus migratorio de manera independiente, sin necesidad de que el agresor participe en el proceso.",
        slug: "vawa",
        image: {
          data: {
            attributes: {
              url: ""
            }
          }
        }
      }
    }
  ];

  // Siempre mostrar los servicios por defecto, independientemente del estado de Strapi
  const displayServices = defaultServices;

  return (
    <section id="servicios" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Nuestros Servicios</h2>
          <h3 className="text-2xl font-semibold mb-4">Te Acompañamos en tu Proceso Migratorio</h3>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto mb-8">
            Sabemos lo desafiante que puede ser un trámite de inmigración. Por eso en Immigration For Us, 
            ofrecemos acompañamiento en la preparación y presentación de documentos migratorios ante el USCIS 
            para una amplia variedad de trámites migratorios en los Estados Unidos. Ya sea para 
            una visa de trabajo, estudio o residencia, estamos aquí para guiarte en cada paso del proceso. 
            Te garantizamos que nuestro equipo de expertos te brindará un servicio confiable y personalizado, 
            asegurando que tu solicitud cumpla con los requisitos establecidos.
          </p>
          <p className="text-sm text-gray-500 italic">
            Nota: Como paralegales, nuestro rol es preparar y presentar los documentos ante el USCIS. 
            No ofrecemos asesoría legal ni representación en audiencias o casos complejos.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayServices.map((service) => (
            <ServiceCard
              key={service.id}
              title={service.attributes.title}
              description={service.attributes.description}
              expandedDescription={service.attributes.expandedDescription}
              image={service.attributes.image?.data ? getStrapiMedia(service.attributes.image.data.attributes.url) : undefined}
              slug={service.attributes.slug}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services; 