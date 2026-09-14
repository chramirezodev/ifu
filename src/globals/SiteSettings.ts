import type { GlobalConfig } from 'payload'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Site Settings',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'firmName',
      type: 'text',
      required: true,
    },
    {
      name: 'founder',
      type: 'text',
    },
    {
      name: 'tagline',
      type: 'text',
      localized: true,
    },
    {
      name: 'slogan',
      type: 'text',
      localized: true,
    },
    {
      name: 'email',
      type: 'email',
      required: true,
    },
    {
      name: 'phone',
      type: 'text',
      required: true,
    },
    {
      name: 'whatsappNumber',
      type: 'text',
      required: true,
    },
    {
      name: 'whatsappAutoMessage',
      type: 'textarea',
      localized: true,
    },
    {
      name: 'consultationWhatsAppMessage',
      type: 'textarea',
      localized: true,
    },
    {
      name: 'address',
      type: 'textarea',
    },
    {
      name: 'workHours',
      type: 'text',
      localized: true,
    },
    {
      name: 'website',
      type: 'text',
    },
    {
      name: 'paymentUrl',
      type: 'text',
    },
    {
      name: 'googleMapsUrl',
      type: 'text',
    },
    {
      name: 'mapEmbedUrl',
      type: 'textarea',
    },
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'socialLinks',
      type: 'array',
      fields: [
        {
          name: 'platform',
          type: 'text',
          required: true,
        },
        {
          name: 'url',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'footerServiceLabels',
      type: 'array',
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
          localized: true,
        },
      ],
    },
  ],
}
