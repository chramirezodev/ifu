import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { contactInfo } from '@/constants';
import { EmailIcon, PhoneIcon, ClockIcon, FacebookIcon, InstagramIcon, WhatsAppIcon } from '../icons';

interface ContactFormInputs {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  service?: string;
}

const contactMethods = [
  {
    icon: EmailIcon,
    title: 'Email',
    info: 'cpalisa@immigrationfor-us.com',
    link: 'mailto:cpalisa@immigrationfor-us.com'
  },
  {
    icon: PhoneIcon,
    title: 'Atención al Cliente',
    info: '+1 (954) 588-4018',
    link: 'tel:+19545884018'
  },
  {
    icon: ClockIcon,
    title: 'Horario de atención',
    info: 'Lunes a Viernes: 9am - 5pm',
  }
];

const Contact = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState<boolean | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const { register, handleSubmit, reset, formState: { errors } } = useForm<ContactFormInputs>();

  useEffect(() => {
    setIsClient(true);
    setIsMounted(true);
  }, []);

  const onSubmit = async (data: ContactFormInputs) => {
    setIsSubmitting(true);
    setSubmitSuccess(null);
    setSubmitError(null);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          recipient: contactInfo.email
        }),
      });
      
      if (response.ok) {
        setSubmitSuccess(true);
        reset();
      } else {
        throw new Error('Error en el envío del formulario');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setSubmitError('Hubo un problema al enviar tu mensaje. Por favor, intenta nuevamente.');
      setSubmitSuccess(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isClient) {
    return null; // Renderizado inicial en servidor
  }

  return (
    <section id="contacto" className="pt-24 pb-16 bg-white relative overflow-hidden">
      {/* Elementos decorativos */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-gray-50 to-transparent" />
      <div className="absolute -top-12 -left-12 w-64 h-64 rounded-full bg-usa-blue/5 blur-3xl" />
      <div className="absolute -bottom-24 -right-24 w-80 h-80 rounded-full bg-usa-red/5 blur-3xl" />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h2 
            className="text-4xl font-bold mb-4 text-gray-900"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Contáctanos Ahora
          </motion.h2>
          <motion.div 
            className="w-24 h-1 bg-usa-blue mx-auto mb-6"
            initial={{ width: 0 }}
            animate={{ width: 96 }}
            transition={{ duration: 0.8 }}
          />
          <motion.p 
            className="text-xl text-gray-600 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Estamos aquí para ayudarte con tu proceso migratorio. No dudes en contactarnos para resolver tus dudas o agendar una consulta.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Información de contacto y mapa */}
          <motion.div 
            className="bg-white rounded-2xl shadow-xl overflow-hidden"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Métodos de contacto */}
            <div className="p-8">
              <h3 className="text-2xl font-bold mb-6 text-gray-900">Información de Contacto</h3>
              
              <ul className="space-y-6">
                {contactMethods.map((method, index) => (
                  <motion.li 
                    key={index} 
                    className="flex items-start gap-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <div className="bg-usa-blue/10 rounded-full p-3 text-usa-blue">
                      <method.icon />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">{method.title}</h4>
                      <a 
                        href={method.link} 
                        target={method.title === 'Dirección' ? '_blank' : undefined}
                        rel={method.title === 'Dirección' ? 'noopener noreferrer' : undefined}
                        className="text-gray-600 hover:text-usa-blue transition-colors"
                      >
                        {method.info}
                      </a>
                    </div>
                  </motion.li>
                ))}
              </ul>

              {/* Redes sociales */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <h4 className="font-semibold text-gray-900 mb-4">Síguenos en redes</h4>
                <div className="flex gap-4">
                  {contactInfo.socialMedia.map((social, index) => (
                    <motion.a 
                      key={index}
                      href={social.link}
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="bg-gray-100 hover:bg-usa-blue hover:text-white text-gray-600 p-3 rounded-full transition-colors duration-300"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <social.icon />
                    </motion.a>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Formulario de contacto */}
          <motion.div
            className="bg-white rounded-2xl shadow-xl p-8 relative overflow-hidden"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Elementos decorativos */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-usa-blue/5 rounded-bl-full transform translate-x-8 -translate-y-8 z-0"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-usa-red/5 rounded-tr-full transform -translate-x-8 translate-y-8 z-0"></div>
            
            <h3 className="text-2xl font-bold mb-6 text-gray-900 relative z-10">Envíanos un mensaje</h3>
            
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 relative z-10">
              {/* Campos del formulario */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                >
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Nombre completo
                  </label>
                  <input
                    type="text"
                    id="name"
                    className={`w-full px-4 py-3 rounded-lg border ${errors.name ? 'border-red-500' : 'border-gray-300'} focus:border-usa-blue focus:ring-2 focus:ring-usa-blue/20 transition-colors`}
                    placeholder="Ingresa tu nombre"
                    {...register('name', { required: 'Este campo es obligatorio' })}
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                  )}
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                >
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Correo electrónico
                  </label>
                  <input
                    type="email"
                    id="email"
                    className={`w-full px-4 py-3 rounded-lg border ${errors.email ? 'border-red-500' : 'border-gray-300'} focus:border-usa-blue focus:ring-2 focus:ring-usa-blue/20 transition-colors`}
                    placeholder="tu@email.com"
                    {...register('email', { 
                      required: 'Este campo es obligatorio',
                      pattern: {
                        value: /\S+@\S+\.\S+/,
                        message: 'Email inválido'
                      }
                    })}
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                  )}
                </motion.div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.3 }}
                >
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    Teléfono
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    className={`w-full px-4 py-3 rounded-lg border ${errors.phone ? 'border-red-500' : 'border-gray-300'} focus:border-usa-blue focus:ring-2 focus:ring-usa-blue/20 transition-colors`}
                    placeholder="(123) 456-7890"
                    {...register('phone', { required: 'Este campo es obligatorio' })}
                  />
                  {errors.phone && (
                    <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
                  )}
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.4 }}
                >
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                    Asunto
                  </label>
                  <input
                    type="text"
                    id="subject"
                    className={`w-full px-4 py-3 rounded-lg border ${errors.subject ? 'border-red-500' : 'border-gray-300'} focus:border-usa-blue focus:ring-2 focus:ring-usa-blue/20 transition-colors`}
                    placeholder="¿En qué podemos ayudarte?"
                    {...register('subject', { required: 'Este campo es obligatorio' })}
                  />
                  {errors.subject && (
                    <p className="mt-1 text-sm text-red-600">{errors.subject.message}</p>
                  )}
                </motion.div>
              </div>
              
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.5 }}
              >
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  Mensaje
                </label>
                <textarea
                  id="message"
                  rows={5}
                  className={`w-full px-4 py-3 rounded-lg border ${errors.message ? 'border-red-500' : 'border-gray-300'} focus:border-usa-blue focus:ring-2 focus:ring-usa-blue/20 transition-colors`}
                  placeholder="Describe tu consulta o deja tu mensaje aquí..."
                  {...register('message', { required: 'Este campo es obligatorio' })}
                />
                {errors.message && (
                  <p className="mt-1 text-sm text-red-600">{errors.message.message}</p>
                )}
              </motion.div>
              
              <AnimatePresence>
                {submitSuccess !== null && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`rounded-lg p-4 ${submitSuccess ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}
                  >
                    {submitSuccess ? (
                      <p className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        ¡Mensaje enviado con éxito! Nos pondremos en contacto contigo pronto.
                      </p>
                    ) : (
                      <p className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        {submitError}
                      </p>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
              
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.6 }}
                className="flex justify-end"
              >
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center bg-usa-blue text-white py-3 px-8 rounded-lg font-medium shadow-lg hover:bg-usa-blue-dark transition-all duration-300 hover:shadow-xl disabled:bg-gray-400 disabled:cursor-not-allowed"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Enviando...
                    </>
                  ) : (
                    <>
                      Enviar mensaje
                      <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                      </svg>
                    </>
                  )}
                </motion.button>
              </motion.div>
            </form>
          </motion.div>
        </div>

        {/* Mensaje de confidencialidad */}
        <motion.div 
          className="mt-16 text-center text-gray-500 text-sm max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p>
            Tu información es confidencial y no será compartida con terceros. Al enviarnos tu información,
            consientes que te contactemos para brindarte asistencia con tu consulta migratoria.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;