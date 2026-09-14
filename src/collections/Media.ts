import type { CollectionConfig } from 'payload'
import { IMG } from '../cms/imageGuides'

export const Media: CollectionConfig = {
  slug: 'media',
  labels: {
    singular: 'Imagen',
    plural: 'Biblioteca de imágenes',
  },
  admin: {
    group: 'Contenido',
    description: `${IMG.general} Tamaños sugeridos: Hero 1920×1080 · Blog 1200×630 · Avatar 400×400.`,
    defaultColumns: ['filename', 'alt', 'updatedAt'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'alt',
      label: 'Descripción de la imagen',
      type: 'text',
      required: true,
      localized: true,
      admin: {
        description:
          'Texto breve que describe la foto (ej. “Skyline de Miami”). Mejora SEO y accesibilidad.',
      },
    },
  ],
  upload: {
    staticDir: 'media',
    mimeTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/gif'],
    imageSizes: [
      {
        name: 'thumbnail',
        width: 400,
        height: 300,
        position: 'centre',
      },
      {
        name: 'card',
        width: 800,
        height: 600,
        position: 'centre',
      },
    ],
  },
}
