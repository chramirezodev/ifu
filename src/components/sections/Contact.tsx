import React, { useState, useEffect } from 'react';
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
  const [formData, setFormData] = useState<ContactFormInputs>({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [errors, setErrors] = useState<Partial<ContactFormInputs>>({});

  useEffect(() => {
    setIsClient(true);
    setIsMounted(true);
  }, []);

  const validateForm = () => {
    const newErrors: Partial<ContactFormInputs> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Este campo es obligatorio';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Este campo es obligatorio';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)) {
      newErrors.email = 'Dirección de correo inválida';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Este campo es obligatorio';
    }
    
    if (!formData.subject.trim()) {
      newErrors.subject = 'Este campo es obligatorio';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Este campo es obligatorio';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name as keyof ContactFormInputs]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

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
          ...formData,
          recipient: contactInfo.email
        }),
      });
      
      if (response.ok) {
        setSubmitSuccess(true);
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: ''
        });
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

  // Renderizado estático para el servidor
  if (!isClient) {
    return (
      <section id="contacto" className="pt-24 pb-16 bg-white relative overflow-hidden">
        <div className="container mx-auto px-4 max-w-6xl relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-gray-900">
              Contáctanos Ahora
            </h2>
            <div className="w-24 h-1 bg-usa-blue mx-auto mb-6" />
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Estamos aquí para ayudarte con tu proceso migratorio. No dudes en contactarnos para resolver tus dudas o agendar una consulta.
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="p-8">
                <h3 className="text-2xl font-bold mb-6 text-gray-900">Información de Contacto</h3>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-usa-blue/10 rounded-full p-3 text-usa-blue">
                      <EmailIcon />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Email</h4>
                      <a href="mailto:cpalisa@immigrationfor-us.com" className="text-gray-600 hover:text-usa-blue transition-colors">
                        cpalisa@immigrationfor-us.com
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="bg-usa-blue/10 rounded-full p-3 text-usa-blue">
                      <PhoneIcon />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Atención al Cliente</h4>
                      <a href="tel:+19545884018" className="text-gray-600 hover:text-usa-blue transition-colors">
                        +1 (954) 588-4018
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="bg-usa-blue/10 rounded-full p-3 text-usa-blue">
                      <ClockIcon />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Horario de atención</h4>
                      <span className="text-gray-600">
                        Lunes a Viernes: 9am - 5pm
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-2xl shadow-xl p-8 relative overflow-hidden">
              <h3 className="text-2xl font-bold mb-6 text-gray-900">Envíanos un mensaje</h3>
              <div className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Nombre completo
                    </label>
                    <input
                      type="text"
                      id="name"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-usa-blue focus:ring-2 focus:ring-usa-blue/20 transition-colors"
                      placeholder="Ingresa tu nombre"
                      disabled
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Correo electrónico
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-usa-blue focus:ring-2 focus:ring-usa-blue/20 transition-colors"
                      placeholder="tu@email.com"
                      disabled
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    Teléfono
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-usa-blue focus:ring-2 focus:ring-usa-blue/20 transition-colors"
                    placeholder="Tu número de teléfono"
                    disabled
                  />
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                    Asunto
                  </label>
                  <input
                    type="text"
                    id="subject"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-usa-blue focus:ring-2 focus:ring-usa-blue/20 transition-colors"
                    placeholder="¿En qué podemos ayudarte?"
                    disabled
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Mensaje
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-usa-blue focus:ring-2 focus:ring-usa-blue/20 transition-colors"
                    placeholder="Cuéntanos sobre tu caso..."
                    disabled
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-usa-blue text-white py-3 px-6 rounded-lg font-medium hover:bg-usa-blue-dark transition-colors disabled:opacity-50"
                  disabled
                >
                  Enviar Mensaje
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="contacto" className="pt-24 pb-16 bg-white relative overflow-hidden">
      {/* Elementos decorativos */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-gray-50 to-transparent" />
      <div className="absolute -top-12 -left-12 w-64 h-64 rounded-full bg-usa-blue/5 blur-3xl" />
      <div className="absolute -bottom-24 -right-24 w-80 h-80 rounded-full bg-usa-red/5 blur-3xl" />
      
      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-gray-900">
            Contáctanos Ahora
          </h2>
          <div className="w-24 h-1 bg-usa-blue mx-auto mb-6" />
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Estamos aquí para ayudarte con tu proceso migratorio. No dudes en contactarnos para resolver tus dudas o agendar una consulta.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Información de contacto y mapa */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            {/* Métodos de contacto */}
            <div className="p-8">
              <h3 className="text-2xl font-bold mb-6 text-gray-900">Información de Contacto</h3>
              
              <ul className="space-y-6">
                {contactMethods.map((method, index) => (
                  <li 
                    key={index} 
                    className="flex items-start gap-4"
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
                  </li>
                ))}
              </ul>

              {/* Redes sociales */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <h4 className="font-semibold text-gray-900 mb-4">Síguenos en redes</h4>
                <div className="flex gap-4">
                  {contactInfo.socialMedia.map((social, index) => (
                    <a 
                      key={index}
                      href={social.link}
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="bg-gray-100 hover:bg-usa-blue hover:text-white text-gray-600 p-3 rounded-full transition-colors duration-300"
                    >
                      <social.icon />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Formulario de contacto */}
          <div className="bg-white rounded-2xl shadow-xl p-8 relative overflow-hidden">
            {/* Elementos decorativos */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-usa-blue/5 rounded-bl-full transform translate-x-8 -translate-y-8 z-0"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-usa-red/5 rounded-tr-full transform -translate-x-8 translate-y-8 z-0"></div>
            
            <h3 className="text-2xl font-bold mb-6 text-gray-900 relative z-10">Envíanos un mensaje</h3>
            
            <form onSubmit={onSubmit} className="space-y-5 relative z-10">
              {/* Campos del formulario */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Nombre completo
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 rounded-lg border ${errors.name ? 'border-red-500' : 'border-gray-300'} focus:border-usa-blue focus:ring-2 focus:ring-usa-blue/20 transition-colors`}
                    placeholder="Ingresa tu nombre"
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Correo electrónico
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 rounded-lg border ${errors.email ? 'border-red-500' : 'border-gray-300'} focus:border-usa-blue focus:ring-2 focus:ring-usa-blue/20 transition-colors`}
                    placeholder="tu@email.com"
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                  )}
                </div>
              </div>
              
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Teléfono
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 rounded-lg border ${errors.phone ? 'border-red-500' : 'border-gray-300'} focus:border-usa-blue focus:ring-2 focus:ring-usa-blue/20 transition-colors`}
                  placeholder="Tu número de teléfono"
                />
                {errors.phone && (
                  <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
                )}
              </div>
              
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                  Asunto
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 rounded-lg border ${errors.subject ? 'border-red-500' : 'border-gray-300'} focus:border-usa-blue focus:ring-2 focus:ring-usa-blue/20 transition-colors`}
                  placeholder="¿En qué podemos ayudarte?"
                />
                {errors.subject && (
                  <p className="mt-1 text-sm text-red-600">{errors.subject}</p>
                )}
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  Mensaje
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 rounded-lg border ${errors.message ? 'border-red-500' : 'border-gray-300'} focus:border-usa-blue focus:ring-2 focus:ring-usa-blue/20 transition-colors`}
                  placeholder="Cuéntanos sobre tu caso..."
                />
                {errors.message && (
                  <p className="mt-1 text-sm text-red-600">{errors.message}</p>
                )}
              </div>
              
              {/* Mensajes de estado */}
              {submitSuccess && (
                <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg">
                  <p>¡Mensaje enviado con éxito! Te contactaremos pronto.</p>
                </div>
              )}
              
              {submitError && (
                <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg">
                  <p>{submitError}</p>
                </div>
              )}
              
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-usa-blue text-white py-3 px-6 rounded-lg font-medium hover:bg-usa-blue-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Enviando...' : 'Enviar Mensaje'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;