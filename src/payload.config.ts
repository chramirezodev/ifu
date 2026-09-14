import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Services } from './collections/Services'
import { Testimonials } from './collections/Testimonials'
import { Faqs } from './collections/Faqs'
import { Posts } from './collections/Posts'
import { SiteSettings } from './globals/SiteSettings'
import { Seo } from './globals/Seo'
import { HomeHero } from './globals/HomeHero'
import { HomeWelcome } from './globals/HomeWelcome'
import { HomeAbout } from './globals/HomeAbout'
import { HomeWhyChooseUs } from './globals/HomeWhyChooseUs'
import { ServicesPage } from './globals/ServicesPage'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    meta: {
      titleSuffix: '— Mardini Law Firm CMS',
    },
  },
  collections: [Users, Media, Services, Testimonials, Faqs, Posts],
  globals: [
    SiteSettings,
    Seo,
    HomeHero,
    HomeWelcome,
    HomeAbout,
    HomeWhyChooseUs,
    ServicesPage,
  ],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || 'CHANGE-ME-IN-PRODUCTION',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
    },
  }),
  sharp,
  localization: {
    locales: [
      { code: 'es', label: 'Español' },
      { code: 'en', label: 'English' },
    ],
    defaultLocale: 'es',
    fallback: true,
  },
  upload: {
    limits: {
      fileSize: 10_000_000,
    },
  },
})
