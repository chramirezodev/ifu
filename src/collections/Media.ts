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
    description: `${IMG.general} Tamaños sugeridos: Hero 7680×4320 (o 3840×2160) · Blog 1200×630 · Avatar 400×400.`,
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
      defaultValue: 'Imagen del sitio',
      admin: {
        description:
          'Obligatorio. Ej. “Logo Mardini Law Firm”. Si no lo completa, no podrá guardar.',
      },
    },
  ],
  hooks: {
    beforeValidate: [
      ({ data }) => {
        if (data && !data.alt) {
          data.alt = data.filename
            ? String(data.filename).replace(/\.[^.]+$/, '').replace(/[_-]+/g, ' ')
            : 'Imagen del sitio'
        }
        return data
      },
    ],
  },
  upload: {
    staticDir: 'media',
    mimeTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/gif'],
    imageSizes: [
      {
        name: 'thumbnail',
        width: 400,
        height: 300,
        position: 'centre',
        withoutEnlargement: true,
      },
      {
        name: 'card',
        width: 800,
        height: 600,
        position: 'centre',
        withoutEnlargement: true,
      },
    ],
  },
}
