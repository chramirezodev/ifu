import type { GlobalConfig } from 'payload'

export const HomeWhyChooseUs: GlobalConfig = {
  slug: 'home-why-choose-us',
  label: 'Home — Why Choose Us',
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
      name: 'subtitle',
      type: 'textarea',
      localized: true,
    },
    {
      name: 'reasons',
      type: 'array',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          localized: true,
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
          name: 'iconKey',
          type: 'select',
          options: [
            { label: 'Clock / Experience', value: 'experience' },
            { label: 'People / Personalized', value: 'personalized' },
            { label: 'Shield / Commitment', value: 'commitment' },
          ],
        },
      ],
    },
    {
      name: 'bannerTitle',
      type: 'text',
      localized: true,
    },
    {
      name: 'bannerSubtitle',
      type: 'textarea',
      localized: true,
    },
    {
      name: 'bannerImageUrl',
      type: 'text',
      defaultValue: '/images/hero/slide2.jpg',
    },
    {
      name: 'bannerImage',
      type: 'upload',
      relationTo: 'media',
    },
  ],
}
