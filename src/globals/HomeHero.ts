import type { GlobalConfig } from 'payload'
import { IMG } from '../cms/imageGuides'

export const HomeHero: GlobalConfig = {
  slug: 'home-hero',
  label: 'Inicio — Portada (Hero)',
  admin: {
    group: 'Página de inicio',
    description: 'La primera imagen y textos grandes que ve el visitante.',
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
              name: 'brandLine1',
              label: 'Línea 1 de marca',
              type: 'text',
              required: true,
              defaultValue: 'MARDINI',
            },
            {
              name: 'brandLine2',
              label: 'Línea 2 de marca',
              type: 'text',
              required: true,
              defaultValue: 'LAW FIRM',
            },
            {
              name: 'tagline',
              label: 'Subtítulo',
              type: 'text',
              localized: true,
              defaultValue: 'Immigration Attorneys',
            },
            {
              name: 'slogan',
              label: 'Eslogan (parte normal)',
              type: 'text',
              localized: true,
              admin: {
                description: 'Ej. “Su futuro,”',
              },
            },
            {
              name: 'sloganHighlight',
              label: 'Eslogan (parte en negrita)',
              type: 'text',
              localized: true,
              admin: {
                description: 'Ej. “nuestra prioridad”',
              },
            },
            {
              name: 'ctaPrimaryLabel',
              label: 'Botón principal (texto)',
              type: 'text',
              localized: true,
              admin: {
                description: 'Si lo deja vacío, se usa el texto del idioma del sitio.',
              },
            },
            {
              name: 'ctaSecondaryLabel',
              label: 'Botón secundario (texto)',
              type: 'text',
              localized: true,
            },
          ],
        },
        {
          label: 'Imagen de fondo',
          fields: [
            {
              name: 'backgroundImage',
              label: 'Foto de portada',
              type: 'upload',
              relationTo: 'media',
              admin: {
                description: IMG.hero,
              },
            },
            {
              name: 'backgroundImageUrl',
              label: 'Ruta antigua (opcional)',
              type: 'text',
              defaultValue: '/images/hero/miami-skyline.jpg',
              admin: {
                description: 'Solo si no sube una imagen nueva.',
              },
            },
          ],
        },
        {
          label: 'Avanzado',
          description: 'Enlaces de los botones. Normalmente no hace falta tocarlos.',
          fields: [
            {
              name: 'ctaPrimaryHref',
              label: 'Enlace del botón principal',
              type: 'text',
              defaultValue: '#contacto',
            },
            {
              name: 'ctaSecondaryHref',
              label: 'Enlace del botón secundario',
              type: 'text',
              defaultValue: '#servicios',
            },
          ],
        },
      ],
    },
  ],
}
