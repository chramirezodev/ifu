import React from 'react';
import ExpandableText from './ExpandableText';

interface ServiceCardProps {
  title: string;
  description: string;
  expandableText?: {
    title: string;
    expandedText: string;
  };
  icon?: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  title,
  description,
  expandableText,
  icon,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
      {/* Icono del servicio */}
      {icon && (
        <div className="mb-4">
          <img src={icon} alt={title} className="w-12 h-12 object-contain" />
        </div>
      )}

      {/* Título y descripción */}
      <h3 className="text-xl font-semibold text-gray-900 mb-3">{title}</h3>
      <p className="text-gray-600 mb-4">{description}</p>

      {/* Texto expandible */}
      {expandableText && (
        <ExpandableText
          title={expandableText.title}
          expandedText={expandableText.expandedText}
          className="mt-4"
        />
      )}

      {/* Botón de contacto */}
      <div className="mt-6">
        <a
          href="/contacto"
          className="inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
        >
          Consultar sobre este servicio
        </a>
      </div>
    </div>
  );
};

export default ServiceCard; 