import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { trackEvent, trackFormSubmission } from '@/components/common/GoogleAnalytics';

const schema = z.object({
  name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  email: z.string().email('Ingrese un correo electrónico válido'),
  phone: z.string().min(10, 'Ingrese un número de teléfono válido'),
  service: z.string().optional(),
  message: z.string().min(10, 'El mensaje debe tener al menos 10 caracteres'),
  recaptchaToken: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

declare global {
  interface Window {
    grecaptcha: {
      ready: (callback: () => void) => void;
      execute: (siteKey: string, options: { action: string }) => Promise<string>;
    };
  }
}

const ContactForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null);
  const [recaptchaLoaded, setRecaptchaLoaded] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    // Cargar reCAPTCHA
    const script = document.createElement('script');
    script.src = `https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`;
    script.async = true;
    script.defer = true;
    script.onload = () => setRecaptchaLoaded(true);
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  const executeRecaptcha = async (): Promise<string> => {
    return new Promise((resolve) => {
      window.grecaptcha.ready(async () => {
        const token = await window.grecaptcha.execute(
          process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!,
          { action: 'contact_form' }
        );
        resolve(token);
      });
    });
  };

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Ejecutar reCAPTCHA si está disponible
      let recaptchaToken = '';
      if (recaptchaLoaded && process.env.NODE_ENV === 'production') {
        recaptchaToken = await executeRecaptcha();
      }

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          recaptchaToken,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al enviar el formulario');
      }

      setSubmitStatus('success');
      reset();
      
      // Track successful form submission
      trackFormSubmission('contact_form', true);
      trackEvent('form_submit', 'engagement', 'contact_form_success');
      
    } catch (error) {
      setSubmitStatus('error');
      console.error('Error submitting form:', error);
      
      // Track form submission error
      trackFormSubmission('contact_form', false);
      trackEvent('form_submit', 'engagement', 'contact_form_error');
      
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Nombre completo *
            </label>
            <input
              type="text"
              id="name"
              {...register('name')}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-usa-blue focus:border-transparent ${
                errors.name ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name.message?.toString()}</p>
            )}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Correo electrónico *
            </label>
            <input
              type="email"
              id="email"
              {...register('email')}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-usa-blue focus:border-transparent ${
                errors.email ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email.message?.toString()}</p>
            )}
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
              Teléfono *
            </label>
            <input
              type="tel"
              id="phone"
              {...register('phone')}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-usa-blue focus:border-transparent ${
                errors.phone ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.phone && (
              <p className="mt-1 text-sm text-red-600">{errors.phone.message?.toString()}</p>
            )}
          </div>

          <div>
            <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-1">
              Servicio de interés
            </label>
            <select
              id="service"
              {...register('service')}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-usa-blue focus:border-transparent"
            >
              <option value="">Seleccione un servicio</option>
              <option value="visa">Visa</option>
              <option value="residencia">Residencia Permanente</option>
              <option value="naturalizacion">Naturalización</option>
              <option value="asilo">Asilo</option>
              <option value="vawa">VAWA</option>
              <option value="otro">Otro</option>
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
            Mensaje *
          </label>
          <textarea
            id="message"
            {...register('message')}
            rows={4}
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-usa-blue focus:border-transparent ${
              errors.message ? 'border-red-500' : 'border-gray-300'
            }`}
          ></textarea>
          {errors.message && (
            <p className="mt-1 text-sm text-red-600">{errors.message.message?.toString()}</p>
          )}
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`px-6 py-3 bg-usa-blue text-white font-medium rounded-lg hover:bg-usa-blue-dark transition-colors duration-300 ${
              isSubmitting ? 'opacity-75 cursor-not-allowed' : ''
            }`}
          >
            {isSubmitting ? 'Enviando...' : 'Enviar mensaje'}
          </button>
        </div>

        {submitStatus === 'success' && (
          <div className="text-center p-4 bg-green-50 text-green-700 rounded-lg">
            ¡Mensaje enviado con éxito! Nos pondremos en contacto contigo pronto.
          </div>
        )}

        {submitStatus === 'error' && (
          <div className="text-center p-4 bg-red-50 text-red-700 rounded-lg">
            <p className="font-medium">Error al enviar el mensaje</p>
            <p className="text-sm mt-1">Por favor, verifica que todos los campos estén completos y vuelve a intentar.</p>
            <p className="text-xs mt-2">Si el problema persiste, contáctanos directamente por teléfono.</p>
          </div>
        )}
      </form>
    </div>
  );
};

export default ContactForm; 