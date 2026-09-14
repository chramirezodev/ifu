import type { GlobalConfig } from 'payload'

export const Seo: GlobalConfig = {
  slug: 'seo',
  label: 'SEO Defaults',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'siteName',
      type: 'text',
      required: true,
    },
    {
      name: 'defaultTitle',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'defaultDescription',
      type: 'textarea',
      required: true,
      localized: true,
    },
    {
      name: 'keywords',
      type: 'text',
      localized: true,
    },
    {
      name: 'ogImageUrl',
      type: 'text',
    },
    {
      name: 'ogImage',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'twitterHandle',
      type: 'text',
    },
  ],
}
