import type { CollectionConfig } from 'payload'

export const Faqs: CollectionConfig = {
  slug: 'faqs',
  labels: {
    singular: 'Pregunta frecuente',
    plural: 'Preguntas frecuentes',
  },
  admin: {
    group: 'Contenido',
    useAsTitle: 'question',
    defaultColumns: ['question', 'category', 'order'],
    description: 'Preguntas y respuestas del sitio. Texto simple, sin código.',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'question',
      label: 'Pregunta',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'answer',
      label: 'Respuesta',
      type: 'textarea',
      required: true,
      localized: true,
    },
    {
      name: 'category',
      label: 'Categoría (opcional)',
      type: 'text',
      admin: {
        description: 'Para agrupar preguntas en el futuro. Puede dejarlo vacío.',
      },
    },
    {
      name: 'order',
      label: 'Orden de aparición',
      type: 'number',
      required: true,
      defaultValue: 0,
      admin: {
        description: 'Número más bajo = aparece primero.',
      },
    },
  ],
}
