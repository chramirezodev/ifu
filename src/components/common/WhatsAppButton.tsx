import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';

type PositionType = 'right' | 'left' | 'bottom';

const WhatsAppButton = ({
  phoneNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "5491100000000",
  defaultMessage = "Hola, estoy interesado en servicios de inmigración. Me gustaría más información.",
  position = "right" as PositionType, // right, left, bottom
  showIcon = true,
  className = "",
  buttonText = "Contáctanos vía WhatsApp"
}) => {
  const router = useRouter();
  const [message, setMessage] = useState(defaultMessage);
  
  // Actualizar mensaje según la página actual
  useEffect(() => {
    // Obtener el servicio actual desde la URL si estamos en una página de servicio
    const serviceSlug = router.query.slug;
    
    if (serviceSlug && router.pathname.includes('/servicios/')) {
      // Llamar a nuestra API para obtener el mensaje personalizado para este servicio
      fetch(`/api/services/whatsapp-message?slug=${serviceSlug}`)
        .then(res => res.json())
        .then(data => {
          if (data.message) {
            setMessage(data.message);
          }
        })
        .catch(err => {
          console.error('Error al obtener mensaje personalizado:', err);
        });
    }
  }, [router.query.slug, router.pathname]);
  
  // Crear URL de WhatsApp con protección contra phoneNumber indefinido
  const formattedPhone = phoneNumber ? phoneNumber.replace(/\+/g, '') : "5491100000000";
  const whatsappUrl = `https://wa.me/${formattedPhone}?text=${encodeURIComponent(message)}`;
  
  // Clases según posición
  const positionClasses: Record<PositionType, string> = {
    'right': 'fixed right-5 bottom-20',
    'left': 'fixed left-5 bottom-20',
    'bottom': 'fixed bottom-5 left-1/2 transform -translate-x-1/2'
  };
  
  return (
    <motion.a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`
        ${positionClasses[position as PositionType]}
        bg-whatsapp-green text-white py-3 px-5 rounded-full 
        flex items-center shadow-lg z-50 hover:shadow-xl
        transition-all duration-300 hover:-translate-y-1
        ${className}
      `}
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {showIcon && (
        <svg className="w-6 h-6 mr-2" viewBox="0 0 24 24" fill="currentColor">
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5
-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.41
5-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.46
4c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.16
5-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.6
06.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.5
79-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3
.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29
.173-1.414z" />
        </svg>
      )}
      <span className="font-medium">{buttonText}</span>
    </motion.a>
  );
};

export default WhatsAppButton; 