import { EmailIcon, PhoneIcon, ClockIcon, FacebookIcon, InstagramIcon, WhatsAppIcon } from '../components/icons';

// Información de contacto de la empresa
export const contactInfo = {
  email: 'info@immigrationforus.com',
  phone: '+1 (123) 456-7890',
  whatsapp: '+1 (123) 456-7890',
  whatsappNumber: '11234567890',
  address: '123 Main St, New York, NY 10001',
  googleMapsUrl: 'https://goo.gl/maps/example',
  mapUrl: 'https://www.google.com/maps/embed?example',
  workHours: 'Lunes a Viernes: 9:00 AM - 5:00 PM',
  methods: [
    {
      icon: EmailIcon,
      title: 'Email',
      info: 'info@immigrationforus.com',
      link: 'mailto:info@immigrationforus.com'
    },
    {
      icon: PhoneIcon,
      title: 'Teléfono',
      info: '+1 (123) 456-7890',
      link: 'tel:+11234567890'
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
      icon: FacebookIcon,
      link: 'https://facebook.com/immigrationforus'
    },
    {
      icon: InstagramIcon,
      link: 'https://instagram.com/immigrationforus'
    },
    {
      icon: WhatsAppIcon,
      link: 'https://wa.me/11234567890'
    }
  ]
};

// Redes sociales
export const socialMedia = {
  facebook: "https://www.facebook.com/immigration.for.us",
  instagram: "https://www.instagram.com/immigration.for.us",
  twitter: "https://twitter.com/immigrationforu"
}; 