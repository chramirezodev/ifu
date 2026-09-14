import type { GlobalConfig } from 'payload'

export const HomeWelcome: GlobalConfig = {
  slug: 'home-welcome',
  label: 'Home — Welcome',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'eyebrow',
      type: 'text',
      localized: true,
    },
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'paragraphs',
      type: 'array',
      localized: true,
      fields: [
        {
          name: 'text',
          type: 'textarea',
          required: true,
        },
      ],
    },
    {
      name: 'photoUrl',
      type: 'text',
    },
    {
      name: 'photo',
      type: 'upload',
      relationTo: 'media',
    },
  ],
}
