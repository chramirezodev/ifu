import type { GlobalConfig } from 'payload'
import { IMG } from '../cms/imageGuides'

export const Seo: GlobalConfig = {
  slug: 'seo',
  label: 'SEO y Google',
  admin: {
    group: 'Sitio',
    description: 'Títulos y descripciones que ve Google y las redes al compartir el sitio.',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'siteName',
      label: 'Nombre del sitio',
      type: 'text',
      required: true,
    },
    {
      name: 'defaultTitle',
      label: 'Título por defecto (pestaña del navegador)',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'defaultDescription',
      label: 'Descripción por defecto',
      type: 'textarea',
      required: true,
      localized: true,
      admin: {
        description: 'Ideal: 140–160 caracteres.',
      },
    },
    {
      name: 'keywords',
      label: 'Palabras clave',
      type: 'text',
      localized: true,
    },
    {
      name: 'ogImage',
      label: 'Imagen al compartir en redes',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: IMG.og,
      },
    },
    {
      name: 'ogImageUrl',
      label: 'Ruta antigua de imagen (opcional)',
      type: 'text',
    },
    {
      name: 'twitterHandle',
      label: 'Usuario de Twitter/X (opcional)',
      type: 'text',
    },
  ],
}
