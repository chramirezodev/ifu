import type { GlobalConfig } from 'payload'
import { IMG } from '../cms/imageGuides'

export const HomeWhyChooseUs: GlobalConfig = {
  slug: 'home-why-choose-us',
  label: 'Inicio — ¿Por qué elegirnos?',
  admin: {
    group: 'Página de inicio',
    description: 'Motivos, textos ampliados e imagen del banner.',
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
              label: 'Título',
              type: 'text',
              required: true,
              localized: true,
            },
            {
              name: 'subtitle',
              label: 'Subtítulo',
              type: 'textarea',
              localized: true,
            },
            {
              name: 'reasons',
              label: 'Razones',
              type: 'array',
              labels: { singular: 'Razón', plural: 'Razones' },
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
                  label: 'Resumen',
                  type: 'textarea',
                  required: true,
                  localized: true,
                },
                {
                  name: 'expandedDescription',
                  label: 'Texto “Ver más”',
                  type: 'textarea',
                  localized: true,
                },
                {
                  name: 'iconKey',
                  label: 'Ícono',
                  type: 'select',
                  options: [
                    { label: 'Experiencia (reloj)', value: 'experience' },
                    { label: 'Atención personalizada (personas)', value: 'personalized' },
                    { label: 'Compromiso (escudo)', value: 'commitment' },
                  ],
                },
              ],
            },
            {
              name: 'bannerTitle',
              label: 'Título del banner',
              type: 'text',
              localized: true,
            },
            {
              name: 'bannerSubtitle',
              label: 'Subtítulo del banner',
              type: 'textarea',
              localized: true,
            },
          ],
        },
        {
          label: 'Imagen del banner',
          fields: [
            {
              name: 'bannerImage',
              label: 'Foto del banner',
              type: 'upload',
              relationTo: 'media',
              admin: {
                description: IMG.banner,
              },
            },
            {
              name: 'bannerImageUrl',
              label: 'Ruta antigua (opcional)',
              type: 'text',
              defaultValue: '/images/hero/slide2.jpg',
            },
          ],
        },
      ],
    },
  ],
}
