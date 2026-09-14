import type { CollectionConfig } from 'payload'
import { IMG } from '../cms/imageGuides'

export const Testimonials: CollectionConfig = {
  slug: 'testimonials',
  labels: {
    singular: 'Testimonio',
    plural: 'Testimonios',
  },
  admin: {
    group: 'Contenido',
    useAsTitle: 'name',
    defaultColumns: ['name', 'role', 'rating', 'order'],
    description: 'Opiniones de clientes. Puede editar el texto y la foto de perfil.',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Testimonio',
          fields: [
            {
              name: 'name',
              label: 'Nombre del cliente',
              type: 'text',
              required: true,
            },
            {
              name: 'role',
              label: 'Tipo de caso / rol',
              type: 'text',
              localized: true,
              admin: {
                description: 'Ej. Solicitud de Asilo, Green Card…',
              },
            },
            {
              name: 'content',
              label: 'Texto del testimonio',
              type: 'textarea',
              required: true,
              localized: true,
            },
            {
              name: 'rating',
              label: 'Calificación (1 a 5 estrellas)',
              type: 'number',
              min: 1,
              max: 5,
              defaultValue: 5,
              required: true,
            },
            {
              name: 'location',
              label: 'Ciudad / ubicación',
              type: 'text',
            },
            {
              name: 'gender',
              label: 'Avatar por defecto si no hay foto',
              type: 'select',
              options: [
                { label: 'Femenino', value: 'female' },
                { label: 'Masculino', value: 'male' },
              ],
            },
            {
              name: 'order',
              label: 'Orden de aparición',
              type: 'number',
              required: true,
              defaultValue: 0,
            },
          ],
        },
        {
          label: 'Foto',
          fields: [
            {
              name: 'avatar',
              label: 'Foto de perfil',
              type: 'upload',
              relationTo: 'media',
              admin: {
                description: IMG.avatar,
              },
            },
            {
              name: 'avatarUrl',
              label: 'Ruta de imagen antigua (opcional)',
              type: 'text',
              admin: {
                description: 'Solo si no sube una foto nueva.',
              },
            },
          ],
        },
      ],
    },
  ],
}
