import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const WhatsAppButtonOnePageOptimized = ({
  phoneNumber, 
  defaultMessage = "Hola, estoy interesado en servicios de inmigración...",
  showExpandedOption = true,
  serviceSections = [],
  scrollThreshold = 100, // Píxeles recorridos antes de mostrar el botón
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeService, setActiveService] = useState(null);
  const [customMessage, setCustomMessage] = useState(defaultMessage);
  
  // Referencia para detectar sección activa
  const { ref, inView } = useInView({
    threshold: 0.2,
  });
  
  // Mostrar botón después de scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > scrollThreshold) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
        setIsExpanded(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrollThreshold]);
  
  // Detectar sección de servicio activa para personalizar mensaje
  useEffect(() => {
    if (!serviceSections.length) return;
    
    const handleServiceDetection = () => {
      for (const service of serviceSections) {
        const element = document.getElementById(service.id);
        if (!element) continue;
        
        const rect = element.getBoundingClientRect();
        const isInView = rect.top >= 0 && rect.bottom <= window.innerHeight;
        
        if (isInView) {
          setActiveService(service);
          setCustomMessage(service.message || defaultMessage);
          break;
        }
      }
    };
    
    window.addEventListener('scroll', handleServiceDetection);
    return () => window.removeEventListener('scroll', handleServiceDetection);
  }, [serviceSections, defaultMessage]);
  
  // Preparar URL de WhatsApp
  const getWhatsAppUrl = (message) => {
    const baseUrl = 'https://wa.me/';
    const formattedNumber = phoneNumber.replace(/\D/g, '');
    return `${baseUrl}${formattedNumber}?text=${encodeURIComponent(message)}`;
  };
  
  // Efectos de aparición
  const buttonVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.8 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.3 } },
    tap: { scale: 0.95 },
  };
  
  const expanderVariants = {
    hidden: { opacity: 0, height: 0, width: 0 },
    visible: { opacity: 1, height: 'auto', width: 'auto', transition: { duration: 0.3 } },
  };
  
  return (
    <>
      <AnimatePresence>
        {isVisible && (
          <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
            {/* Panel expandido con opciones de servicio */}
            {isExpanded && showExpandedOption && (
              <motion.div
                className="mb-3 bg-white rounded-lg shadow-lg p-4 max-w-xs w-full"
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={expanderVariants}
              >
                <h3 className="text-gray-800 font-bold text-lg mb-2">¿En qué podemos ayudarte?</h3>
                <div className="space-y-2 mb-3">
                  {serviceSections.map((service) => (
                    <button
                      key={service.id}
                      className={`w-full text-left px-3 py-2 rounded-md transition ${
                        activeService?.id === service.id
                          ? 'bg-blue-100 text-blue-800'
                          : 'hover:bg-gray-100'
                      }`}
                      onClick={() => {
                        setActiveService(service);
                        setCustomMessage(service.message || defaultMessage);
                      }}
                    >
                      {service.name}
                    </button>
                  ))}
                </div>
                <div className="flex justify-between">
                  <button
                    className="text-sm text-gray-500 hover:text-gray-700"
                    onClick={() => setIsExpanded(false)}
                  >
                    Cerrar
                  </button>
                  <a
                    href={getWhatsAppUrl(customMessage)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md text-sm font-medium transition"
                  >
                    Enviar mensaje
                  </a>
                </div>
              </motion.div>
            )}
            
            {/* Botón principal de WhatsApp */}
            <motion.div
              ref={ref}
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={buttonVariants}
              whileTap="tap"
              className="flex"
            >
              {showExpandedOption ? (
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg flex items-center justify-center transition transform"
                  aria-label="Contactar por WhatsApp"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                  </svg>
                </button>
              ) : (
                <a
                  href={getWhatsAppUrl(customMessage)}
                  target="_blank"
                  rel="noopener noreferrer" 
                  className="bg-green-500 hover:bg-green-600 text-white px-4 py-3 rounded-full shadow-lg flex items-center space-x-2 transition"
                  aria-label="Contactar por WhatsApp"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                  </svg>
                  <span className="font-medium">Contáctanos</span>
                </a>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default WhatsAppButtonOnePageOptimized; 