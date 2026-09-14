import type { GlobalConfig } from 'payload'

export const ServicesPage: GlobalConfig = {
  slug: 'services-page',
  label: 'Página de Servicios',
  admin: {
    group: 'Sitio',
    description: 'Textos de la página /servicios y la introducción en el inicio.',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'heroTitle',
      label: 'Título grande',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'heroSubtitle',
      label: 'Subtítulo',
      type: 'textarea',
      localized: true,
    },
    {
      name: 'sectionIntro',
      label: 'Introducción en el inicio',
      type: 'textarea',
      localized: true,
      admin: {
        description: 'Párrafo debajo de “Nuestros Servicios” en la home.',
      },
    },
    {
      name: 'ctaLabel',
      label: 'Texto del botón',
      type: 'text',
      localized: true,
    },
    {
      name: 'ctaHref',
      label: 'Enlace del botón',
      type: 'text',
      defaultValue: '/contacto',
      admin: {
        description: 'Normalmente /contacto',
      },
    },
  ],
}
