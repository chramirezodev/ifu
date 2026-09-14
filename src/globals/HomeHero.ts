import type { GlobalConfig } from 'payload'

export const HomeHero: GlobalConfig = {
  slug: 'home-hero',
  label: 'Home — Hero',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'brandLine1',
      type: 'text',
      required: true,
      defaultValue: 'MARDINI',
    },
    {
      name: 'brandLine2',
      type: 'text',
      required: true,
      defaultValue: 'LAW FIRM',
    },
    {
      name: 'tagline',
      type: 'text',
      localized: true,
      defaultValue: 'Immigration Attorneys',
    },
    {
      name: 'slogan',
      type: 'text',
      localized: true,
    },
    {
      name: 'sloganHighlight',
      type: 'text',
      localized: true,
      admin: {
        description: 'Parte del slogan en negrita (ej. "nuestra prioridad")',
      },
    },
    {
      name: 'backgroundImageUrl',
      type: 'text',
      defaultValue: '/images/hero/miami-skyline.jpg',
    },
    {
      name: 'backgroundImage',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'ctaPrimaryLabel',
      type: 'text',
      localized: true,
    },
    {
      name: 'ctaPrimaryHref',
      type: 'text',
      defaultValue: '#contacto',
    },
    {
      name: 'ctaSecondaryLabel',
      type: 'text',
      localized: true,
    },
    {
      name: 'ctaSecondaryHref',
      type: 'text',
      defaultValue: '#servicios',
    },
  ],
}
