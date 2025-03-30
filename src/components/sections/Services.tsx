import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useServices } from '@/hooks/useStrapi';
import { getStrapiMedia } from '@/lib/strapi';
import Image from 'next/image';

// Iconos mejorados con símbolos americanos "stencil style"
const serviceIcons = {
  visas: (
    <div className="relative">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-14 w-14 text-usa-blue" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="16" rx="2" />
        <line x1="7" y1="8" x2="7" y2="8" strokeWidth="2" strokeLinecap="round" />
        <line x1="11" y1="8" x2="11" y2="8" strokeWidth="2" strokeLinecap="round" />
        <line x1="15" y1="8" x2="15" y2="8" strokeWidth="2" strokeLinecap="round" />
        <line x1="19" y1="8" x2="19" y2="8" strokeWidth="2" strokeLinecap="round" />
        <line x1="3" y1="12" x2="21" y2="12" />
        <line x1="7" y1="16" x2="7" y2="16" strokeWidth="2" strokeLinecap="round" />
        <line x1="11" y1="16" x2="11" y2="16" strokeWidth="2" strokeLinecap="round" />
        <line x1="15" y1="16" x2="15" y2="16" strokeWidth="2" strokeLinecap="round" />
        <line x1="19" y1="16" x2="19" y2="16" strokeWidth="2" strokeLinecap="round" />
      </svg>
      <div className="absolute -top-1 -right-1 bg-usa-red rounded-full p-2 w-6 h-6 flex items-center justify-center shadow-lg">
        <span className="text-white text-xs font-bold">US</span>
      </div>
    </div>
  ),
  residencia: (
    <div className="relative">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-14 w-14 text-usa-blue" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
        <path d="M12 7m-3 0a3 3 0 106 0a3 3 0 10-6 0" />
      </svg>
      <div className="absolute -top-1 -right-1 bg-usa-red rounded-full p-1 w-6 h-6 flex items-center justify-center shadow-lg">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="white" className="w-3 h-3">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
        </svg>
      </div>
    </div>
  ),
  naturalizacion: (
    <div className="relative">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-14 w-14 text-usa-blue" viewBox="0 0 24 24" fill="none" strokeWidth="1.5">
        <path d="M12 2L14.2 7.4H20L15.1 11.4L16.5 17L12 13.8L7.5 17L8.9 11.4L4 7.4H9.8L12 2Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M12 2L14.2 7.4H20L15.1 11.4L16.5 17L12 13.8L7.5 17L8.9 11.4L4 7.4H9.8L12 2Z" fill="none" />
      </svg>
      <div className="absolute -top-1 -right-1 bg-usa-red rounded-full p-1 w-6 h-6 flex items-center justify-center shadow-lg">
        <span className="text-white text-xs font-bold">US</span>
      </div>
    </div>
  ),
  asilo: (
    <div className="relative">
      <svg className="h-14 w-14 text-usa-blue" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z" />
        <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" />
        <path d="M16 8V13H13.6" />
        <path d="M8 10V16L10.5 14" />
      </svg>
      <div className="absolute -top-1 -right-1 bg-usa-red rounded-full p-1 w-6 h-6 flex items-center justify-center shadow-lg">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="white" className="w-3 h-3">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12h18" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v18" />
        </svg>
      </div>
    </div>
  ),
  vawa: (
    <div className="relative">
      <svg className="h-14 w-14 text-usa-blue" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        <path d="M12 6v2M12 16h.01" />
        <rect x="7" y="9" width="10" height="5" rx="1" />
      </svg>
      <div className="absolute -top-1 -right-1 bg-usa-red rounded-full p-1 w-6 h-6 flex items-center justify-center shadow-lg">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="white" className="w-3 h-3">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 14l6-6" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 14V8h-6" />
        </svg>
      </div>
    </div>
  )
};

// Backgrounds temáticos para cada servicio (mantendremos esto para cuando no haya imagen)
const serviceBackgrounds = {
  visas: "bg-gradient-to-br from-blue-50 to-blue-100 before:content-[''] before:absolute before:inset-0 before:bg-[url('/images/new-york-3551125_1280.jpg')] before:opacity-5 before:bg-center before:bg-no-repeat before:bg-contain",
  residencia: "bg-gradient-to-br from-blue-50 to-red-50 before:content-[''] before:absolute before:inset-0 before:bg-[url('/images/old-bridge-with-ropes-american-flag.jpg')] before:opacity-5 before:bg-center before:bg-no-repeat before:bg-contain",
  naturalizacion: "bg-gradient-to-br from-red-50 to-blue-50 before:content-[''] before:absolute before:inset-0 before:bg-[url('/images/skyscraper-3717555_1280 (1).jpg')] before:opacity-5 before:bg-center before:bg-no-repeat before:bg-contain",
  asilo: "bg-gradient-to-br from-blue-100 to-white before:content-[''] before:absolute before:inset-0 before:bg-[url('/images/brooklyn-bridge-3717553_1280.jpg')] before:opacity-5 before:bg-center before:bg-no-repeat before:bg-contain",
  vawa: "bg-gradient-to-br from-red-50 to-white before:content-[''] before:absolute before:inset-0 before:bg-[url('/images/statue-of-liberty-3551121_1280.jpg')] before:opacity-5 before:bg-center before:bg-no-repeat before:bg-contain before:filter before:drop-shadow-md"
};

// Estilos específicos para cada servicio
const serviceStyles = {
  visas: {
    ringColor: "ring-blue-300",
    shadowColor: "shadow-blue-100",
    hoverColor: "hover:shadow-blue-200/30",
    overlayGradient: "bg-gradient-to-t from-black/70 via-blue-900/20 to-transparent"
  },
  residencia: {
    ringColor: "ring-green-300",
    shadowColor: "shadow-green-100",
    hoverColor: "hover:shadow-green-200/30",
    overlayGradient: "bg-gradient-to-t from-black/70 via-green-900/20 to-transparent"
  },
  naturalizacion: {
    ringColor: "ring-usa-red/30",
    shadowColor: "shadow-usa-red/10",
    hoverColor: "hover:shadow-usa-red/30",
    overlayGradient: "bg-gradient-to-t from-black/70 via-usa-red/20 to-transparent"
  },
  asilo: {
    ringColor: "ring-indigo-300",
    shadowColor: "shadow-indigo-100",
    hoverColor: "hover:shadow-indigo-200/30",
    overlayGradient: "bg-gradient-to-t from-black/70 via-indigo-900/20 to-transparent"
  },
  vawa: {
    ringColor: "ring-purple-300",
    shadowColor: "shadow-purple-100",
    hoverColor: "hover:shadow-purple-200/30",
    overlayGradient: "bg-gradient-to-t from-black/70 via-purple-900/20 to-transparent"
  }
};

interface ServiceCardProps {
  title: string;
  description: string;
  expandedDescription?: string;
  image?: string;
  slug: string;
  icon?: React.ReactNode;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  title,
  description,
  expandedDescription,
  image,
  slug,
  icon
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Seleccionar el fondo adecuado según el slug del servicio
  const backgroundClass = serviceBackgrounds[slug as keyof typeof serviceBackgrounds] || 
    "bg-gradient-to-br from-usa-blue/10 to-usa-blue/30";
    
  // Obtener estilos específicos para este servicio
  const styles = serviceStyles[slug as keyof typeof serviceStyles] || {
    ringColor: "ring-usa-blue/30",
    shadowColor: "shadow-usa-blue/10",
    hoverColor: "hover:shadow-usa-blue/30",
    overlayGradient: "bg-gradient-to-t from-black/70 via-black/30 to-transparent"
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
      className={`bg-white rounded-xl ${styles.shadowColor} shadow-lg overflow-hidden ${styles.hoverColor} hover:shadow-xl transition-all duration-500 flex flex-col relative group ring-1 ${styles.ringColor} ring-opacity-20`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {image ? (
        <div className="relative h-52 w-full overflow-hidden">
          <Image
            src={image}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className={`object-cover transition-transform duration-700 ${isHovered ? 'scale-110' : 'scale-100'}`}
            priority={false}
          />
          {/* Overlay con gradiente para mejor legibilidad */}
          <div className={`absolute inset-0 ${styles.overlayGradient}`} />
          
          {/* Cinta estilo USA */}
          <div className="absolute top-5 -right-10 rotate-45 bg-usa-red text-white px-10 py-1 shadow-md text-xs font-bold tracking-wider z-10">
            USA
          </div>
          
          {/* Estrella decorativa en la esquina superior izquierda */}
          <div className="absolute top-3 left-3 text-usa-red">
            <svg className="w-6 h-6 drop-shadow-lg" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2L14.2 7.4H20L15.1 11.4L16.5 17L12 13.8L7.5 17L8.9 11.4L4 7.4H9.8L12 2Z" />
            </svg>
          </div>
          
          {/* Estrella decorativa en la esquina inferior derecha */}
          <div className="absolute bottom-3 right-3 text-usa-blue/90">
            <svg className="w-6 h-6 drop-shadow-lg" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2L14.2 7.4H20L15.1 11.4L16.5 17L12 13.8L7.5 17L8.9 11.4L4 7.4H9.8L12 2Z" />
            </svg>
          </div>
        </div>
      ) : (
        <div className={`relative h-52 w-full overflow-hidden ${backgroundClass} flex items-center justify-center`}>
          <motion.div 
            initial={{ scale: 0.8, rotate: -5 }}
            whileInView={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.5, type: "spring" }}
            className="p-5 rounded-full bg-white shadow-lg"
          >
            {icon}
          </motion.div>
          
          {/* Elementos decorativos patrióticos */}
          <motion.div 
            className="absolute top-4 left-4 opacity-70"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 0.7, x: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <svg className="w-10 h-10 text-usa-red drop-shadow-lg" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2L14.2 7.4H20L15.1 11.4L16.5 17L12 13.8L7.5 17L8.9 11.4L4 7.4H9.8L12 2Z" />
            </svg>
          </motion.div>

        <motion.div 
            className="absolute bottom-4 right-4 opacity-70"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 0.7, x: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <svg className="w-10 h-10 text-usa-blue drop-shadow-lg" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2L14.2 7.4H20L15.1 11.4L16.5 17L12 13.8L7.5 17L8.9 11.4L4 7.4H9.8L12 2Z" />
            </svg>
          </motion.div>
          
          {/* Cinta USA */}
          <div className="absolute top-5 -right-10 rotate-45 bg-usa-red text-white px-10 py-1 shadow-md text-xs font-bold tracking-wider z-10">
            USA
          </div>
        </div>
      )}

      <div className="p-6 flex-grow flex flex-col">
        <motion.h3 
          className="text-2xl font-bold mb-3 text-gray-800"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          {title}
        </motion.h3>
        
        <motion.p 
          className="text-gray-600 mb-4"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          {description}
        </motion.p>
        
        <div className="mt-auto space-y-4">
          {expandedDescription && (
            <>
              <motion.button
                onClick={() => setIsExpanded(!isExpanded)}
                className="text-usa-blue hover:text-usa-blue-dark font-medium flex items-center gap-2"
                whileHover={{ x: isExpanded ? -4 : 4 }}
                transition={{ duration: 0.2 }}
              >
                {isExpanded ? (
                  <>
                    <span>Ver menos</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                    </svg>
                  </>
                ) : (
                  <>
                    <span>Ver más</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </>
                )}
              </motion.button>

              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <p className="text-gray-600 border-l-2 border-usa-blue pl-4 py-1">{expandedDescription}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </>
          )}

          <motion.a
            href={`#contacto?service=${slug}`}
            className="inline-flex items-center text-usa-blue hover:text-usa-red font-medium group"
            whileHover={{ x: 4 }}
            transition={{ duration: 0.2 }}
          >
            <span>Consultar</span>
            <svg
              className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform"
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
          </motion.a>
        </div>
                      </div>
      
      {/* Indicator line at the top - colors of American flag */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-usa-blue via-white to-usa-red transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
      
      {/* American flag corner */}
      <div className="absolute top-0 left-0 w-6 h-6 bg-usa-blue flex items-center justify-center overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="w-4 h-4 bg-usa-red relative">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-2 h-2 bg-white transform rotate-45"></div>
                    </div>
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
              url: "/images/new-york-3551125_1280.jpg"
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
              url: "/images/old-bridge-with-ropes-american-flag.jpg"
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
              url: "/images/skyscraper-3717555_1280 (1).jpg"
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
              url: "/images/brooklyn-bridge-3717553_1280.jpg"
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
              url: "/images/statue-of-liberty-3551121_1280.jpg"
            }
          }
        }
      }
    }
  ];

  // Si no hay datos de la API, usar datos predeterminados
  const displayServices = (!loading && services?.length > 0) ? services : defaultServices;

  // Debug - Verificar cantidad de servicios
  console.log(`Renderizando ${displayServices.length} servicios:`, displayServices.map(s => s.attributes.title));

  return (
    <section id="servicios" className="py-24 bg-gray-50 relative overflow-hidden">
      {/* Elementos decorativos americanos */}
      <div className="absolute top-0 left-0 w-full h-16 bg-gradient-to-b from-white to-transparent opacity-70"></div>
      <div className="absolute -top-8 -left-8 w-24 h-24 bg-usa-red/10 rounded-full"></div>
      <div className="absolute top-12 right-12 w-32 h-32 bg-usa-blue/10 rounded-full"></div>
      <motion.div 
        className="absolute bottom-20 left-20 text-usa-red opacity-10"
        animate={{ rotate: 360 }}
        transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
      >
        <svg className="w-40 h-40" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2L14.2 7.4H20L15.1 11.4L16.5 17L12 13.8L7.5 17L8.9 11.4L4 7.4H9.8L12 2Z" />
        </svg>
      </motion.div>
      <motion.div 
        className="absolute -bottom-10 right-10 text-usa-blue opacity-10"
        animate={{ rotate: -360 }}
        transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
      >
        <svg className="w-48 h-48" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2L14.2 7.4H20L15.1 11.4L16.5 17L12 13.8L7.5 17L8.9 11.4L4 7.4H9.8L12 2Z" />
        </svg>
      </motion.div>
      
      <div className="container mx-auto px-4 relative z-10">
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
            Nuestros Servicios
          </motion.h2>
          <motion.div 
            className="w-24 h-1 bg-gradient-to-r from-usa-blue via-white to-usa-red mx-auto mb-6"
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
            Te Acompañamos en tu Proceso Migratorio
          </motion.p>
          <motion.p 
            className="text-lg text-gray-600 max-w-4xl mx-auto mt-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Sabemos lo desafiante que puede ser un trámite de inmigración. Por eso en Immigration For Us, ofrecemos acompañamiento en la preparación y presentación de documentos migratorios ante el USCIS para una amplia variedad de trámites migratorios en los Estados Unidos. Ya sea para una visa de trabajo, estudio o residencia, estamos aquí para guiarte en cada paso del proceso. Te garantizamos que nuestro equipo de expertos te brindará un servicio confiable y personalizado, asegurando que tu solicitud cumpla con los requisitos establecidos.
          </motion.p>
        </motion.div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-usa-blue"></div>
                        </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg max-w-2xl mx-auto">
            <p>Ha ocurrido un error al cargar los servicios. Por favor, intenta nuevamente más tarde.</p>
                        </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mx-auto">
            {displayServices.map((service) => {
              const { title, description, expandedDescription, slug } = service.attributes;
              const imageData = service.attributes.image?.data?.attributes;
              
              // Asignamos la imagen correcta según el slug si no hay imagen asignada
              let imageUrl = imageData?.url || '';
              if (!imageUrl || imageUrl === '') {
                switch (slug) {
                  case 'visas':
                    imageUrl = "/images/new-york-3551125_1280.jpg";
                    break;
                  case 'residencia':
                    imageUrl = "/images/old-bridge-with-ropes-american-flag.jpg";
                    break;
                  case 'naturalizacion':
                    imageUrl = "/images/skyscraper-3717555_1280 (1).jpg";
                    break;
                  case 'asilo':
                    imageUrl = "/images/brooklyn-bridge-3717553_1280.jpg";
                    break;
                  case 'vawa':
                    imageUrl = "/images/statue-of-liberty-3551121_1280.jpg";
                    break;
                  default:
                    imageUrl = "/images/new-york-3551125_1280.jpg"; // Imagen por defecto
                }
              }
              
              // Si la URL ya comienza con /images/, no necesitamos procesarla
              const image = imageUrl.startsWith('/images/') ? imageUrl : getStrapiMedia(imageUrl);
              
              // Log de depuración
              console.log(`Servicio ${slug}:`, { imageUrl, finalImageUrl: image });
              
              // Usar el icono correspondiente al slug
              const icon = serviceIcons[slug as keyof typeof serviceIcons];
              
              return (
                <ServiceCard
                  key={service.id}
                  title={title}
                  description={description}
                  expandedDescription={expandedDescription}
                  image={image}
                  slug={slug}
                  icon={icon}
                />
              );
            })}
                      </div>
        )}
        
        {/* Sección de contacto rápido y aviso legal */}
        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <p className="text-lg text-gray-600 mb-4">
            ¿No encuentras el servicio que necesitas? Contáctanos para una consulta personalizada.
          </p>
          <p className="text-sm text-gray-500 italic mb-6 max-w-3xl mx-auto">
            Nota: Como paralegales, nuestro rol es preparar y presentar los documentos ante el USCIS. No ofrecemos asesoría legal ni representación en audiencias o casos complejos.
          </p>
          <motion.a
            href="#contacto"
            className="inline-flex items-center bg-usa-blue text-white py-3 px-8 rounded-lg font-medium shadow-lg hover:bg-usa-blue-dark transition-all duration-300 hover:shadow-xl"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <span>Consulta Gratuita</span>
            <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
            </svg>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default Services; 