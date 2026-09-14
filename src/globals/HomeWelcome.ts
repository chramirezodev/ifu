import type { GlobalConfig } from 'payload'
import { IMG } from '../cms/imageGuides'

export const HomeWelcome: GlobalConfig = {
  slug: 'home-welcome',
  label: 'Inicio — Bienvenida / Fundador',
  admin: {
    group: 'Página de inicio',
    description: 'Texto de presentación de Roger Mardini y foto opcional.',
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
              name: 'eyebrow',
              label: 'Texto pequeño superior',
              type: 'text',
              localized: true,
            },
            {
              name: 'name',
              label: 'Nombre',
              type: 'text',
              required: true,
            },
            {
              name: 'paragraphs',
              label: 'Párrafos',
              type: 'array',
              localized: true,
              labels: { singular: 'Párrafo', plural: 'Párrafos' },
              fields: [
                {
                  name: 'text',
                  label: 'Texto',
                  type: 'textarea',
                  required: true,
                },
              ],
            },
          ],
        },
        {
          label: 'Foto',
          fields: [
            {
              name: 'photo',
              label: 'Foto del abogado',
              type: 'upload',
              relationTo: 'media',
              admin: {
                description: IMG.welcomePhoto,
              },
            },
            {
              name: 'photoUrl',
              label: 'Ruta antigua (opcional)',
              type: 'text',
            },
          ],
        },
      ],
    },
  ],
}
