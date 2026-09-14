import { EmailIcon, PhoneIcon, ClockIcon, WhatsAppIcon } from '../components/icons';
import { fallbackCMS } from '@/lib/cms/fallback';

// Fallback local — la fuente de verdad en runtime es Payload (CMSProvider).
const s = fallbackCMS.siteSettings;

export const contactInfo = {
  email: s.email,
  phone: s.phone,
  whatsapp: s.phone,
  whatsappNumber: s.whatsappNumber,
  whatsappAutoMessage: s.whatsappAutoMessage,
  consultationWhatsAppMessage: s.consultationWhatsAppMessage,
  paymentUrl: s.paymentUrl,
  address: s.address,
  website: s.website,
  googleMapsUrl: s.googleMapsUrl,
  mapUrl: s.mapEmbedUrl,
  workHours: s.workHours,
  methods: [
    {
      icon: EmailIcon,
      title: 'Email',
      info: s.email,
      link: `mailto:${s.email}`
    },
    {
      icon: PhoneIcon,
      title: 'Teléfono',
      info: s.phone,
      link: `tel:+${s.whatsappNumber}`
    },
    {
      icon: ClockIcon,
      title: 'Horario',
      info: s.workHours,
      link: '#'
    }
  ],
  socialMedia: [
    {
      icon: WhatsAppIcon,
      link: `https://wa.me/${s.whatsappNumber}`
    }
  ]
};

export const socialMedia = {
  whatsapp: `https://wa.me/${s.whatsappNumber}`
};

export const firmInfo = {
  name: s.firmName,
  founder: s.founder,
  tagline: s.tagline,
  slogan: s.slogan
};

export const footerServices = s.footerServiceLabels;
