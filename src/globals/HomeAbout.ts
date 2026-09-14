import type { GlobalConfig } from 'payload'
import { IMG } from '../cms/imageGuides'

export const HomeAbout: GlobalConfig = {
  slug: 'home-about',
  label: 'Inicio — Nosotros',
  admin: {
    group: 'Página de inicio',
    description: 'Sección “Nosotros”: texto, valores e imagen.',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Textos',
          fields: [
            {
              name: 'title',
              label: 'Título de la sección',
              type: 'text',
              required: true,
              localized: true,
            },
            {
              name: 'content',
              label: 'Texto principal',
              type: 'textarea',
              required: true,
              localized: true,
            },
            {
              name: 'values',
              label: 'Valores / pilares',
              type: 'array',
              labels: { singular: 'Valor', plural: 'Valores' },
              fields: [
                {
                  name: 'title',
                  label: 'Título',
                  type: 'text',
                  required: true,
                  localized: true,
                },
                {
                  name: 'description',
                  label: 'Descripción',
                  type: 'textarea',
                  required: true,
                  localized: true,
                },
              ],
            },
          ],
        },
        {
          label: 'Imagen',
          fields: [
            {
              name: 'image',
              label: 'Imagen de la sección',
              type: 'upload',
              relationTo: 'media',
              admin: {
                description: IMG.about,
              },
            },
            {
              name: 'imageUrl',
              label: 'Ruta antigua (opcional)',
              type: 'text',
              defaultValue: '/images/nosotros.png',
            },
          ],
        },
      ],
    },
  ],
}
