import type { CollectionConfig } from 'payload'

export const Services: CollectionConfig = {
  slug: 'services',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'order', 'updatedAt'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
      localized: true,
    },
    {
      name: 'expandedDescription',
      type: 'textarea',
      localized: true,
    },
    {
      name: 'imageUrl',
      type: 'text',
      admin: {
        description: 'Ruta pública (ej. /images/...) o URL absoluta. Alternativa a la imagen subida.',
      },
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'iconKey',
      type: 'select',
      options: [
        { label: 'Visas', value: 'visas' },
        { label: 'Residencia', value: 'residencia' },
        { label: 'Naturalización', value: 'naturalizacion' },
        { label: 'Asilo', value: 'asilo' },
        { label: 'Asilo defensivo', value: 'asilo-defensivo' },
        { label: 'VAWA', value: 'vawa' },
        { label: 'Visa U', value: 'visa-u' },
        { label: 'Corte inmigración', value: 'corte-inmigracion' },
        { label: 'Apelaciones', value: 'apelaciones' },
        { label: 'Fianzas', value: 'fianzas' },
      ],
    },
    {
      name: 'whatsappMessage',
      type: 'textarea',
      localized: true,
    },
    {
      name: 'order',
      type: 'number',
      required: true,
      defaultValue: 0,
    },
  ],
}
