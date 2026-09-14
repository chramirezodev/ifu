import type { CollectionConfig } from 'payload'
import { IMG } from '../cms/imageGuides'

export const Services: CollectionConfig = {
  slug: 'services',
  labels: {
    singular: 'Servicio',
    plural: 'Servicios',
  },
  admin: {
    group: 'Contenido',
    useAsTitle: 'title',
    defaultColumns: ['title', 'order', 'updatedAt'],
    description: 'Tarjetas de servicios que se muestran en la página de inicio y en /servicios.',
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
              label: 'Título del servicio',
              type: 'text',
              required: true,
              localized: true,
            },
            {
              name: 'description',
              label: 'Resumen corto',
              type: 'textarea',
              required: true,
              localized: true,
              admin: {
                description: '1–2 frases. Se ve en la tarjeta sin expandir.',
              },
            },
            {
              name: 'expandedDescription',
              label: 'Texto completo (“Ver más”)',
              type: 'textarea',
              localized: true,
              admin: {
                description: 'Detalle que aparece al hacer clic en “Ver más”.',
              },
            },
            {
              name: 'whatsappMessage',
              label: 'Mensaje de WhatsApp (opcional)',
              type: 'textarea',
              localized: true,
              admin: {
                description: 'Si se deja vacío, se usa el mensaje general de consulta.',
              },
            },
            {
              name: 'order',
              label: 'Orden de aparición',
              type: 'number',
              required: true,
              defaultValue: 0,
              admin: {
                description: 'Número más bajo = aparece primero (1, 2, 3…).',
              },
            },
          ],
        },
        {
          label: 'Imagen',
          fields: [
            {
              name: 'image',
              label: 'Foto del servicio',
              type: 'upload',
              relationTo: 'media',
              admin: {
                description: IMG.service,
              },
            },
            {
              name: 'iconKey',
              label: 'Ícono (estilo del sitio)',
              type: 'select',
              options: [
                { label: 'Visas', value: 'visas' },
                { label: 'Residencia', value: 'residencia' },
                { label: 'Naturalización', value: 'naturalizacion' },
                { label: 'Asilo', value: 'asilo' },
                { label: 'Asilo defensivo', value: 'asilo-defensivo' },
                { label: 'VAWA', value: 'vawa' },
                { label: 'Visa U', value: 'visa-u' },
                { label: 'Corte de inmigración', value: 'corte-inmigracion' },
                { label: 'Apelaciones', value: 'apelaciones' },
                { label: 'Fianzas', value: 'fianzas' },
              ],
              admin: {
                description: 'Elige el símbolo que acompaña la tarjeta.',
              },
            },
          ],
        },
        {
          label: 'Avanzado',
          description: 'Solo si un técnico se lo indica. No es necesario para cambios diarios.',
          fields: [
            {
              name: 'slug',
              label: 'Identificador en la URL',
              type: 'text',
              required: true,
              unique: true,
              index: true,
              admin: {
                description: 'Ej. residencia, asilo. Sin espacios ni acentos.',
              },
            },
            {
              name: 'imageUrl',
              label: 'Ruta de imagen antigua (opcional)',
              type: 'text',
              admin: {
                description: 'Solo si no sube una imagen nueva. Ej. /images/foto.jpg',
              },
            },
          ],
        },
      ],
    },
  ],
}
