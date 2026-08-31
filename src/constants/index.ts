import { EmailIcon, PhoneIcon, ClockIcon, WhatsAppIcon } from '../components/icons';

// Información de contacto — Mardini Law Firm
export const contactInfo = {
  email: 'info@mardinilawfirm.com',
  phone: '+1 (754) 234-4284',
  whatsapp: '+1 (754) 234-4284',
  whatsappNumber: '17542344284',
  whatsappAutoMessage: '¡Hola! Gracias por contactar a Mardini Law Firm. Hemos recibido tu mensaje y muy pronto un miembro de nuestro equipo se comunicará contigo. Si tu consulta es urgente, también puedes escribirnos a info@mardinilawfirm.com o llamarnos al (754) 234-4284.',
  consultationWhatsAppMessage: 'Hola, me gustaría agendar una consulta con Mardini Law Firm.',
  paymentUrl: process.env.NEXT_PUBLIC_PAYMENT_URL || 'https://secure.lawpay.com/pages/mardinilawfirm/operating',
  address: '7224 NW 116th Way, Parkland, FL 33076',
  website: 'https://immigrationfor-us.com',
  googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=7224+NW+116th+Way,+Parkland,+FL+33076',
  mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3576.8!2d-80.24!3d26.31!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88d9080e0e0e0e0e%3A0x0!2s7224%20NW%20116th%20Way%2C%20Parkland%2C%20FL%2033076!5e0!3m2!1ses!2sus!4v1700000000000!5m2!1ses!2sus',
  workHours: 'Lunes a Viernes: 9:00 AM - 5:00 PM',
  methods: [
    {
      icon: EmailIcon,
      title: 'Email',
      info: 'info@mardinilawfirm.com',
      link: 'mailto:info@mardinilawfirm.com'
    },
    {
      icon: PhoneIcon,
      title: 'Teléfono',
      info: '+1 (754) 234-4284',
      link: 'tel:+17542344284'
    },
    {
      icon: ClockIcon,
      title: 'Horario',
      info: 'Lunes a Viernes: 9:00 AM - 5:00 PM',
      link: '#'
    }
  ],
  socialMedia: [
    {
      icon: WhatsAppIcon,
      link: 'https://wa.me/17542344284'
    }
  ]
};

export const socialMedia = {
  whatsapp: 'https://wa.me/17542344284'
};

export const firmInfo = {
  name: 'Mardini Law Firm',
  founder: 'Roger Mardini, Esq.',
  tagline: 'Immigration Attorneys',
  slogan: 'Su futuro, nuestra prioridad'
};

export const footerServices = [
  'Representación ante la Corte de Inmigración',
  'Asilo Defensivo y Afirmativo',
  'Residencia Permanente / Green Card',
  'Visas y Procesos Migratorios',
  'VAWA',
  'Visa U',
  'Ciudadanía y Naturalización',
  'Apelaciones y Mociones',
  'Fianzas de Inmigración / Immigration Bonds'
];
