import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

interface ContactInfoProps {
  contactInfo: {
    email: string;
    phone: string;
    whatsapp: string;
    address: string;
    mapUrl: string;
    workHours: string;
  };
  whatsappNumber: string;
}

const ContactInfo: React.FC<ContactInfoProps> = ({ contactInfo, whatsappNumber }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="bg-gray-50 p-8 rounded-lg shadow-sm">
        <h3 className="text-xl font-semibold text-gray-900 mb-6">Información de Contacto</h3>
        <div className="space-y-6">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex items-center space-x-4">
              <span className="text-primary-600">•</span>
              <span className="text-gray-400">Cargando...</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const contactItems = [
    {
      href: `https://wa.me/${whatsappNumber}`,
      text: `WhatsApp: ${contactInfo.whatsapp}`,
      icon: '📱',
      external: true
    },
    {
      href: `mailto:${contactInfo.email}`,
      text: `Email: ${contactInfo.email}`,
      icon: '📧'
    },
    {
      href: contactInfo.mapUrl || `https://maps.google.com/?q=${encodeURIComponent(contactInfo.address)}`,
      text: `Ubicación: ${contactInfo.address}`,
      icon: '📍',
      external: true
    },
    {
      text: `Horario: ${contactInfo.workHours}`,
      icon: '⏰'
    }
  ];

  return (
    <div className="bg-gray-50 p-8 rounded-lg shadow-sm">
      <h3 className="text-xl font-semibold text-gray-900 mb-6">Información de Contacto</h3>
      <div className="space-y-6">
        {contactItems.map((item, index) => {
          const content = (
            <>
              <span className="text-primary-600 text-xl mr-3">{item.icon}</span>
              <span className="text-gray-600 hover:text-primary-600 transition-colors">
                {item.text}
              </span>
            </>
          );

          return item.href ? (
            <a
              key={index}
              href={item.href}
              className="flex items-center hover:text-primary-600 transition-colors"
              {...(item.external && {
                target: "_blank",
                rel: "noopener noreferrer"
              })}
            >
              {content}
            </a>
          ) : (
            <div key={index} className="flex items-center">
              {content}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ContactInfo; 