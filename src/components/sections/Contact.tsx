import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import ContactForm from '../forms/ContactForm';
import ContactInfo from './ContactInfo';

interface ContactProps {
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

const Contact: React.FC<ContactProps> = ({ contactInfo, whatsappNumber }) => {
  return (
    <section id="contacto" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">ESTAMOS A UN CLICK PARA ACOMPAÑARTE</h2>
          <p className="text-gray-600 max-w-3xl mx-auto mb-8">
            Si estás listo/a para comenzar con tu solicitud de asilo, residencia o cualquier otro trámite migratorio, 
            no dudes en ponerte en contacto con Immigration For US. Estamos aquí para manejar tu proceso con 
            profesionalismo y eficiencia.
          </p>
          <p className="text-primary-600 font-semibold">
            ¡Tu futuro empieza ahora! Déjanos ayudarte a dar el siguiente paso.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12"
        >
          <ContactInfo contactInfo={contactInfo} whatsappNumber={whatsappNumber} />

          <div className="bg-white p-8 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Envíanos un Mensaje</h3>
            <ContactForm />
          </div>
        </motion.div>

        <div className="max-w-3xl mx-auto text-center text-sm text-gray-600 border-t pt-8">
          <h4 className="font-semibold mb-4">Políticas de Uso y Privacidad</h4>
          <p className="mb-4">
            En Immigration For US, nos comprometemos a proteger tu privacidad. Para conocer más detalles sobre el uso 
            de tus datos, consulta nuestro{' '}
            <Link href="/aviso-legal" className="text-primary-600 hover:text-primary-700 font-semibold">
              AVISO LEGAL
            </Link>
            .
          </p>
          <p>
            Nos reservamos el derecho de modificar estas políticas en cualquier momento. Te recomendamos revisar 
            periódicamente esta información para estar al tanto de cualquier actualización.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Contact; 