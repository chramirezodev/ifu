import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'
import { es } from '@payloadcms/translations/languages/es'
import { en } from '@payloadcms/translations/languages/en'
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

const serverURL =
  process.env.NEXT_PUBLIC_SERVER_URL ||
  process.env.NEXT_PUBLIC_SITE_URL ||
  'http://localhost:3000'

export default buildConfig({
  serverURL,
  csrf: [
    serverURL,
    'https://mardinilawfirm.com',
    'https://www.mardinilawfirm.com',
    'https://ifu.vercel.app',
    'http://localhost:3000',
  ].filter(Boolean),
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    meta: {
      titleSuffix: '— Mardini Law Firm',
      description: 'Panel para editar textos e imágenes del sitio web',
    },
    components: {
      beforeDashboard: ['/components/admin/BeforeDashboard#BeforeDashboard'],
    },
  },
  i18n: {
    supportedLanguages: { es, en },
    fallbackLanguage: 'es',
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
      // Vercel limita ~4.5 MB en el servidor; con clientUploads el tope práctico es este.
      fileSize: 4_000_000,
    },
  },
  plugins: [
    // En Vercel el disco es temporal: sin Blob las subidas fallan con "Something went wrong".
    vercelBlobStorage({
      enabled: Boolean(process.env.BLOB_READ_WRITE_TOKEN),
      collections: {
        media: {
          prefix: 'mardini-media',
        },
      },
      token: process.env.BLOB_READ_WRITE_TOKEN || '',
      clientUploads: true,
      addRandomSuffix: true,
    }),
  ],
})
