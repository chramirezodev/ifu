import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { useCMS } from '@/context/CMSContext';
import { EmailIcon, PhoneIcon, ClockIcon, WhatsAppIcon } from '../icons';

interface ContactFormInputs {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

type ContactMethod = {
  icon: React.ComponentType;
  title: string;
  info: string;
  link?: string;
  external?: boolean;
};

type Grecaptcha = {
  ready: (callback: () => void) => void;
  execute: (siteKey: string, options: { action: string }) => Promise<string>;
};

const RECAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
const RECAPTCHA_ACTION = 'contact_form';

const emptyForm: ContactFormInputs = {
  name: '',
  email: '',
  phone: '',
  subject: '',
  message: '',
};

const AddressIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const Contact = () => {
  const { t } = useTranslation('common');
  const router = useRouter();
  const { locale } = router;
  const { siteSettings: contactInfo, services } = useCMS();
  const appliedServiceSlug = useRef<string | null>(null);
  const recaptchaLoader = useRef<Promise<void> | null>(null);

  const contactMethods: ContactMethod[] = [
    {
      icon: EmailIcon,
      title: t('contact.email'),
      info: contactInfo.email,
      link: `mailto:${contactInfo.email}`,
    },
    {
      icon: PhoneIcon,
      title: t('contact.customerService'),
      info: contactInfo.phone,
      link: `tel:+${contactInfo.whatsappNumber}`,
    },
    {
      icon: ClockIcon,
      title: t('contact.hours'),
      info: contactInfo.workHours,
    },
  ];
  if (contactInfo.address) {
    contactMethods.push({
      icon: AddressIcon,
      title: t('contact.address'),
      info: contactInfo.address,
      link: contactInfo.googleMapsUrl || undefined,
      external: true,
    });
  }

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  const [formData, setFormData] = useState<ContactFormInputs>(emptyForm);
  const [honeypot, setHoneypot] = useState('');
  const [errors, setErrors] = useState<Partial<ContactFormInputs>>({});

  useEffect(() => {
    const slug = typeof router.query.service === 'string' ? router.query.service : '';
    if (!slug || appliedServiceSlug.current === slug) return;
    const service = services.find((item) => item.slug === slug);
    if (!service) return;
    appliedServiceSlug.current = slug;
    setFormData((prev) => ({ ...prev, subject: service.title }));
  }, [router.query.service, services]);

  // El script de reCAPTCHA pesa ~150 KB: se carga solo cuando el visitante empieza a usar el formulario.
  const loadRecaptcha = () => {
    if (!RECAPTCHA_SITE_KEY || typeof window === 'undefined') return Promise.resolve();
    if (!recaptchaLoader.current) {
      recaptchaLoader.current = new Promise<void>((resolve, reject) => {
        const script = document.createElement('script');
        script.src = `https://www.google.com/recaptcha/api.js?render=${RECAPTCHA_SITE_KEY}`;
        script.async = true;
        script.onload = () => resolve();
        script.onerror = () => {
          recaptchaLoader.current = null;
          reject(new Error('No se pudo cargar reCAPTCHA'));
        };
        document.head.appendChild(script);
      });
    }
    return recaptchaLoader.current;
  };

  const getRecaptchaToken = async (): Promise<string | undefined> => {
    if (!RECAPTCHA_SITE_KEY) return undefined;
    await loadRecaptcha();
    const siteKey = RECAPTCHA_SITE_KEY;
    const grecaptcha = (window as unknown as { grecaptcha?: Grecaptcha }).grecaptcha;
    if (!grecaptcha) throw new Error('reCAPTCHA no disponible');
    return new Promise((resolve, reject) => {
      grecaptcha.ready(() => {
        grecaptcha.execute(siteKey, { action: RECAPTCHA_ACTION }).then(resolve, reject);
      });
    });
  };

  const validateForm = () => {
    const newErrors: Partial<ContactFormInputs> = {};
    const required = t('contact.form.required');

    if (!formData.name.trim()) newErrors.name = required;
    if (!formData.email.trim()) {
      newErrors.email = required;
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email.trim())) {
      newErrors.email = t('contact.form.invalidEmail');
    }
    if (!formData.phone.trim()) newErrors.phone = required;
    if (!formData.subject.trim()) newErrors.subject = required;
    if (!formData.message.trim()) newErrors.message = required;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof ContactFormInputs]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitSuccess(false);
    setSubmitError(false);

    try {
      const recaptchaToken = await getRecaptchaToken();
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          website: honeypot,
          locale,
          recaptchaToken,
        }),
      });

      if (!response.ok) throw new Error(`Respuesta ${response.status}`);

      setSubmitSuccess(true);
      setFormData(emptyForm);
    } catch (error) {
      console.error('Error enviando el formulario de contacto:', error);
      setSubmitError(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass = (field: keyof ContactFormInputs) =>
    `w-full px-4 py-3 rounded-lg border ${errors[field] ? 'border-red-500' : 'border-gray-300'} focus:border-usa-blue focus:ring-2 focus:ring-usa-blue/20 transition-colors`;

  const fieldError = (field: keyof ContactFormInputs) =>
    errors[field] ? (
      <p id={`${field}-error`} className="mt-1 text-sm text-red-600">
        {errors[field]}
      </p>
    ) : null;

  const whatsappMessage = contactInfo.consultationWhatsAppMessage;

  return (
    <section id="contacto" className="scroll-mt-24 pt-24 pb-16 bg-white relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-gray-50 to-transparent" />
      <div className="absolute -top-12 -left-12 w-64 h-64 rounded-full bg-usa-blue/5 blur-3xl" />
      <div className="absolute -bottom-24 -right-24 w-80 h-80 rounded-full bg-usa-red/5 blur-3xl" />

      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-gray-900">{t('contact.title')}</h2>
          <div className="w-24 h-1 bg-usa-blue mx-auto mb-6" />
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">{t('contact.description')}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="p-8">
              <h3 className="text-2xl font-bold mb-6 text-gray-900">{t('contact.infoTitle')}</h3>

              <ul className="space-y-6">
                {contactMethods.map((method) => (
                  <li key={method.title} className="flex items-start gap-4">
                    <div className="bg-usa-blue/10 rounded-full p-3 text-usa-blue">
                      <method.icon />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">{method.title}</h4>
                      {method.link ? (
                        <a
                          href={method.link}
                          target={method.external ? '_blank' : undefined}
                          rel={method.external ? 'noopener noreferrer' : undefined}
                          className="text-gray-600 hover:text-usa-blue transition-colors"
                        >
                          {method.info}
                        </a>
                      ) : (
                        <span className="text-gray-600">{method.info}</span>
                      )}
                    </div>
                  </li>
                ))}
              </ul>

              <div className="mt-8 pt-6 border-t border-gray-200">
                <h4 className="font-semibold text-gray-900 mb-4">{t('contact.social')}</h4>
                <div className="flex gap-4">
                  {contactInfo.socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={
                        social.platform.toLowerCase() === 'whatsapp' && !social.url.includes('text=')
                          ? `${social.url}${social.url.includes('?') ? '&' : '?'}text=${encodeURIComponent(whatsappMessage)}`
                          : social.url
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-gray-100 hover:bg-usa-blue hover:text-white text-gray-600 p-3 rounded-full transition-colors duration-300"
                      aria-label={social.platform}
                    >
                      <WhatsAppIcon />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-usa-blue/5 rounded-bl-full transform translate-x-8 -translate-y-8 z-0"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-usa-red/5 rounded-tr-full transform -translate-x-8 translate-y-8 z-0"></div>

            <h3 className="text-2xl font-bold mb-6 text-gray-900 relative z-10">{t('contact.formTitle')}</h3>

            <form onSubmit={onSubmit} onFocus={() => { loadRecaptcha().catch(() => undefined); }} noValidate className="space-y-5 relative z-10">
              <div className="absolute -left-[9999px] w-px h-px overflow-hidden" aria-hidden="true">
                <label htmlFor="website">Website</label>
                <input
                  type="text"
                  id="website"
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    {t('contact.form.name')}
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    autoComplete="name"
                    maxLength={120}
                    value={formData.name}
                    onChange={handleInputChange}
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={errors.name ? 'name-error' : undefined}
                    className={inputClass('name')}
                    placeholder={t('contact.form.namePlaceholder')}
                  />
                  {fieldError('name')}
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    {t('contact.form.email')}
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    autoComplete="email"
                    maxLength={200}
                    value={formData.email}
                    onChange={handleInputChange}
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={errors.email ? 'email-error' : undefined}
                    className={inputClass('email')}
                    placeholder={t('contact.form.emailPlaceholder')}
                  />
                  {fieldError('email')}
                </div>
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  {t('contact.form.phone')}
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  autoComplete="tel"
                  maxLength={40}
                  value={formData.phone}
                  onChange={handleInputChange}
                  aria-invalid={Boolean(errors.phone)}
                  aria-describedby={errors.phone ? 'phone-error' : undefined}
                  className={inputClass('phone')}
                  placeholder={t('contact.form.phonePlaceholder')}
                />
                {fieldError('phone')}
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                  {t('contact.form.subject')}
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  maxLength={200}
                  value={formData.subject}
                  onChange={handleInputChange}
                  aria-invalid={Boolean(errors.subject)}
                  aria-describedby={errors.subject ? 'subject-error' : undefined}
                  className={inputClass('subject')}
                  placeholder={t('contact.form.subjectPlaceholder')}
                />
                {fieldError('subject')}
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  {t('contact.form.message')}
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  maxLength={5000}
                  value={formData.message}
                  onChange={handleInputChange}
                  aria-invalid={Boolean(errors.message)}
                  aria-describedby={errors.message ? 'message-error' : undefined}
                  className={inputClass('message')}
                  placeholder={t('contact.form.messagePlaceholder')}
                />
                {fieldError('message')}
              </div>

              <div aria-live="polite">
                {submitSuccess && (
                  <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg">
                    <p>{t('contact.form.success')}</p>
                  </div>
                )}
                {submitError && (
                  <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg">
                    <p>{t('contact.form.error')}</p>
                  </div>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-usa-blue text-white py-3 px-6 rounded-lg font-medium hover:bg-usa-blue-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? t('contact.form.sending') : t('contact.form.submit')}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
