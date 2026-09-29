/**
 * Carga en Payload la versión en inglés (locale `en`) de los textos del sitio.
 * Solo escribe el idioma inglés: el contenido en español no se modifica.
 *
 * Uso:
 *   npm run seed:en
 */
import { config as loadEnv } from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '../..')

loadEnv({ path: path.join(root, '.env.local') })
loadEnv({ path: path.join(root, '.env.vps.local') })
loadEnv()

type Row = { id?: string } & Record<string, unknown>

async function seedEnglish() {
  if (!process.env.DATABASE_URI) throw new Error('DATABASE_URI is required')
  if (!process.env.PAYLOAD_SECRET) throw new Error('PAYLOAD_SECRET is required')

  process.env.NEXT_PUBLIC_SERVER_URL =
    process.env.NEXT_PUBLIC_SERVER_URL || 'https://mardinilawfirm.com'

  const { getPayload } = await import('payload')
  const { default: config } = await import('../payload.config')
  const { fallbackCMSEn, servicesEn } = await import('../lib/cms/fallback.en')

  const payload = await getPayload({ config })
  const en = fallbackCMSEn

  // Los arreglos no localizados comparten filas entre idiomas: se conservan los ids
  // (y campos como iconKey) y solo se escriben los subcampos traducibles.
  async function readRows(slug: string, field: string): Promise<Row[]> {
    const doc = (await payload.findGlobal({ slug: slug as any, locale: 'es', depth: 0 })) as any
    return Array.isArray(doc?.[field]) ? doc[field] : []
  }

  function mergeRows<T extends Record<string, unknown>>(rows: Row[], translations: T[], label: string): Row[] {
    if (rows.length !== translations.length) {
      console.warn(`  ${label}: ${rows.length} filas en el CMS y ${translations.length} traducciones; se traducen por posición.`)
    }
    return rows.map((row, i) => (translations[i] ? { ...row, ...translations[i] } : row))
  }

  async function updateGlobal(slug: string, data: Record<string, unknown>) {
    await payload.updateGlobal({ slug: slug as any, locale: 'en', data: data as any, depth: 0 })
    console.log(`  ✓ ${slug}`)
  }

  console.log('Globals:')

  const footerRows = await readRows('site-settings', 'footerServiceLabels')
  await updateGlobal('site-settings', {
    slogan: en.siteSettings.slogan,
    whatsappAutoMessage: en.siteSettings.whatsappAutoMessage,
    consultationWhatsAppMessage: en.siteSettings.consultationWhatsAppMessage,
    workHours: en.siteSettings.workHours,
    footerServiceLabels: mergeRows(
      footerRows,
      en.siteSettings.footerServiceLabels.map((label) => ({ label })),
      'footerServiceLabels',
    ),
  })

  await updateGlobal('seo', {
    defaultTitle: en.seo.defaultTitle,
    defaultDescription: en.seo.defaultDescription,
    keywords: en.seo.keywords,
  })

  await updateGlobal('home-hero', {
    slogan: en.homeHero.slogan,
    sloganHighlight: en.homeHero.sloganHighlight,
  })

  await updateGlobal('home-welcome', {
    eyebrow: en.homeWelcome.eyebrow,
    paragraphs: en.homeWelcome.paragraphs.map((text) => ({ text })),
  })

  const valueRows = await readRows('home-about', 'values')
  await updateGlobal('home-about', {
    title: en.homeAbout.title,
    content: en.homeAbout.content,
    values: mergeRows(valueRows, en.homeAbout.values, 'values'),
  })

  const reasonRows = await readRows('home-why-choose-us', 'reasons')
  await updateGlobal('home-why-choose-us', {
    title: en.homeWhyChooseUs.title,
    subtitle: en.homeWhyChooseUs.subtitle,
    reasons: mergeRows(
      reasonRows,
      en.homeWhyChooseUs.reasons.map(({ title, description, expandedDescription }) => ({
        title,
        description,
        expandedDescription,
      })),
      'reasons',
    ),
    bannerTitle: en.homeWhyChooseUs.bannerTitle,
    bannerSubtitle: en.homeWhyChooseUs.bannerSubtitle,
  })

  await updateGlobal('services-page', {
    heroTitle: en.servicesPage.heroTitle,
    heroSubtitle: en.servicesPage.heroSubtitle,
    ctaLabel: en.servicesPage.ctaLabel,
    sectionIntro: en.servicesPage.sectionIntro,
  })

  console.log('Servicios:')
  const services = await payload.find({ collection: 'services', locale: 'es', limit: 100, depth: 0 })
  for (const service of services.docs as any[]) {
    const copy = servicesEn[service.slug]
    if (!copy) {
      console.warn(`  (sin traducción) ${service.slug}`)
      continue
    }
    await payload.update({
      collection: 'services',
      id: service.id,
      locale: 'en',
      depth: 0,
      data: {
        title: copy.title,
        description: copy.description,
        expandedDescription: copy.expandedDescription,
        whatsappMessage: `Hello, I would like information about ${copy.title}.`,
      } as any,
    })
    console.log(`  ✓ ${service.slug}`)
  }

  console.log('Listo.')
  process.exit(0)
}

seedEnglish().catch((error) => {
  console.error(error)
  process.exit(1)
})
