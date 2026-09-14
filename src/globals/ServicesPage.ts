import type { GlobalConfig } from 'payload'

export const ServicesPage: GlobalConfig = {
  slug: 'services-page',
  label: 'Services Page',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'heroTitle',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'heroSubtitle',
      type: 'textarea',
      localized: true,
    },
    {
      name: 'ctaLabel',
      type: 'text',
      localized: true,
    },
    {
      name: 'ctaHref',
      type: 'text',
      defaultValue: '/contacto',
    },
    {
      name: 'sectionIntro',
      type: 'textarea',
      localized: true,
      admin: {
        description: 'Introducción de la sección de servicios en el home',
      },
    },
  ],
}
