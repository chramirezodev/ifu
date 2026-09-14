import type { GlobalConfig } from 'payload'
import { IMG } from '../cms/imageGuides'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Datos de la firma y contacto',
  admin: {
    group: 'Sitio',
    description: 'Teléfono, WhatsApp, dirección, pagos y logo. Lo más usado en el día a día.',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Firma',
          fields: [
            {
              name: 'firmName',
              label: 'Nombre de la firma',
              type: 'text',
              required: true,
            },
            {
              name: 'founder',
              label: 'Fundador',
              type: 'text',
            },
            {
              name: 'tagline',
              label: 'Lema corto (inglés o ES)',
              type: 'text',
              localized: true,
            },
            {
              name: 'slogan',
              label: 'Eslogan',
              type: 'text',
              localized: true,
            },
            {
              name: 'logo',
              label: 'Logo del sitio (menú y pie de página)',
              type: 'upload',
              relationTo: 'media',
              admin: {
                description: `${IMG.logo} Se muestra en el menú superior y en el pie de página.`,
              },
            },
          ],
        },
        {
          label: 'Contacto',
          fields: [
            {
              name: 'email',
              label: 'Correo electrónico',
              type: 'email',
              required: true,
            },
            {
              name: 'phone',
              label: 'Teléfono (como se muestra)',
              type: 'text',
              required: true,
              admin: {
                description: 'Ej. +1 (754) 234-4284',
              },
            },
            {
              name: 'whatsappNumber',
              label: 'WhatsApp (solo números)',
              type: 'text',
              required: true,
              admin: {
                description: 'Ej. 17542344284 (sin espacios ni +).',
              },
            },
            {
              name: 'whatsappAutoMessage',
              label: 'Mensaje automático de WhatsApp',
              type: 'textarea',
              localized: true,
            },
            {
              name: 'consultationWhatsAppMessage',
              label: 'Mensaje al pedir consulta',
              type: 'textarea',
              localized: true,
            },
            {
              name: 'address',
              label: 'Dirección',
              type: 'textarea',
            },
            {
              name: 'workHours',
              label: 'Horario de atención',
              type: 'text',
              localized: true,
            },
          ],
        },
        {
          label: 'Enlaces',
          fields: [
            {
              name: 'website',
              label: 'Sitio web',
              type: 'text',
            },
            {
              name: 'paymentUrl',
              label: 'Enlace de pago (LawPay)',
              type: 'text',
            },
            {
              name: 'googleMapsUrl',
              label: 'Enlace a Google Maps',
              type: 'text',
            },
            {
              name: 'mapEmbedUrl',
              label: 'Mapa embebido (URL de iframe)',
              type: 'textarea',
              admin: {
                description: 'Opcional. Si no lo usa, puede dejarlo como está.',
              },
            },
            {
              name: 'socialLinks',
              label: 'Redes sociales',
              type: 'array',
              labels: { singular: 'Red', plural: 'Redes' },
              fields: [
                {
                  name: 'platform',
                  label: 'Nombre (ej. whatsapp)',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'url',
                  label: 'Enlace completo',
                  type: 'text',
                  required: true,
                },
              ],
            },
            {
              name: 'footerServiceLabels',
              label: 'Lista de servicios en el pie de página',
              type: 'array',
              labels: { singular: 'Ítem', plural: 'Ítems' },
              fields: [
                {
                  name: 'label',
                  label: 'Texto',
                  type: 'text',
                  required: true,
                  localized: true,
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}
