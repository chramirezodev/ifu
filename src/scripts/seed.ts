/**
 * Carga en Payload los textos e imágenes actuales del sitio (fallback + public/images).
 *
 * Uso:
 *   npm run seed
 *   SEED_FORCE=1 npm run seed   # reemplaza servicios/posts/etc. si ya existen
 */
import { config as loadEnv } from 'dotenv'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '../..')

loadEnv({ path: path.join(root, '.env.local') })
loadEnv({ path: path.join(root, '.env.vps.local') })
loadEnv()

const FORCE = process.env.SEED_FORCE === '1' || process.env.SEED_FORCE === 'true'

function publicFile(webPath: string): string | null {
  if (!webPath?.startsWith('/')) return null
  const abs = path.join(root, 'public', webPath.replace(/^\//, ''))
  return fs.existsSync(abs) ? abs : null
}

async function seed() {
  if (!process.env.DATABASE_URI) throw new Error('DATABASE_URI is required')
  if (!process.env.PAYLOAD_SECRET) throw new Error('PAYLOAD_SECRET is required')

  // Asegura URL de servidor para Blob / media
  process.env.NEXT_PUBLIC_SERVER_URL =
    process.env.NEXT_PUBLIC_SERVER_URL || 'https://mardinilawfirm.com'

  const { getPayload } = await import('payload')
  const { default: config } = await import('../payload.config')
  const { fallbackCMS } = await import('../lib/cms/fallback')

  const payload = await getPayload({ config })
  const mediaCache = new Map<string, number | string>()

  async function ensureMedia(webPath: string, alt: string) {
    if (!webPath) return undefined
    if (mediaCache.has(webPath)) return mediaCache.get(webPath)

    const filePath = publicFile(webPath)
    if (!filePath) {
      console.warn(`  (sin archivo local) ${webPath}`)
      return undefined
    }

    const filename = path.basename(filePath)
    const existing = await payload.find({
      collection: 'media',
      where: { filename: { contains: filename.replace(/\.[^.]+$/, '') } },
      limit: 5,
    })
    const match = existing.docs.find(
      (d: any) =>
        d.filename === filename ||
        (typeof d.filename === 'string' && d.filename.startsWith(filename.replace(/\.[^.]+$/, ''))),
    )
    if (match && !FORCE) {
      mediaCache.set(webPath, match.id)
      return match.id
    }

    const created = await payload.create({
      collection: 'media',
      locale: 'es',
      data: { alt },
      filePath,
      overwriteExistingFiles: true,
    })
    mediaCache.set(webPath, created.id)
    console.log(`  ↑ media ${filename}`)
    return created.id
  }

  // —— Admin ——
  const adminEmail = process.env.SEED_ADMIN_EMAIL || 'admin@mardinilawfirm.com'
  const adminPassword = process.env.SEED_ADMIN_PASSWORD || 'ChangeMe123!'
  const existingUsers = await payload.find({
    collection: 'users',
    where: { email: { equals: adminEmail } },
    limit: 1,
  })
  if (existingUsers.docs.length === 0) {
    await payload.create({
      collection: 'users',
      data: { email: adminEmail, password: adminPassword, name: 'Admin' },
    })
    console.log(`Admin creado: ${adminEmail}`)
  } else {
    console.log(`Admin OK: ${adminEmail}`)
  }

  // —— Imágenes clave ——
  console.log('Subiendo imágenes al CMS…')
  const logoId = await ensureMedia(fallbackCMS.siteSettings.logoUrl, 'Logo Mardini Law Firm')
  const ogId = await ensureMedia(
    fallbackCMS.seo.ogImageUrl || '/images/Logos/logo.png',
    'Imagen para redes — Mardini Law Firm',
  )
  const heroId = await ensureMedia(fallbackCMS.homeHero.backgroundImageUrl, 'Portada Miami skyline')
  const aboutId = await ensureMedia(fallbackCMS.homeAbout.imageUrl, 'Nosotros — Mardini Law Firm')
  const bannerId = await ensureMedia(
    fallbackCMS.homeWhyChooseUs.bannerImageUrl,
    'Banner ¿Por qué elegirnos?',
  )
  const welcomePhotoPath = publicFile('/images/Logos/mardini-hero-lockup.png')
  let welcomePhotoId: number | string | undefined
  // Preferir foto ya subida del abogado (media id 21 en producción) si existe
  try {
    const existing = await payload.findByID({ collection: 'media', id: 21 })
    if (existing?.id) welcomePhotoId = existing.id
  } catch {
    /* no existe en este entorno */
  }
  if (!welcomePhotoId && welcomePhotoPath) {
    welcomePhotoId = await ensureMedia('/images/Logos/mardini-hero-lockup.png', 'Roger Mardini')
  }

  // —— Globales (siempre se actualizan) ——
  const s = fallbackCMS.siteSettings
  await payload.updateGlobal({
    slug: 'site-settings',
    locale: 'es',
    data: {
      firmName: s.firmName,
      founder: s.founder,
      tagline: s.tagline,
      slogan: s.slogan,
      email: s.email,
      phone: s.phone,
      whatsappNumber: s.whatsappNumber,
      whatsappAutoMessage: s.whatsappAutoMessage,
      consultationWhatsAppMessage: s.consultationWhatsAppMessage,
      address: s.address,
      workHours: s.workHours,
      website: s.website,
      paymentUrl: s.paymentUrl,
      googleMapsUrl: s.googleMapsUrl,
      mapEmbedUrl: s.mapEmbedUrl,
      socialLinks: s.socialLinks,
      footerServiceLabels: s.footerServiceLabels.map((label) => ({ label })),
      ...(logoId ? { logo: logoId } : {}),
    },
  })
  console.log('✓ Datos de la firma y contacto')

  await payload.updateGlobal({
    slug: 'seo',
    locale: 'es',
    data: {
      siteName: fallbackCMS.seo.siteName,
      defaultTitle: fallbackCMS.seo.defaultTitle,
      defaultDescription: fallbackCMS.seo.defaultDescription,
      keywords: fallbackCMS.seo.keywords,
      ogImageUrl: fallbackCMS.seo.ogImageUrl,
      twitterHandle: fallbackCMS.seo.twitterHandle,
      ...(ogId ? { ogImage: ogId } : {}),
    },
  })
  console.log('✓ SEO')

  const h = fallbackCMS.homeHero
  await payload.updateGlobal({
    slug: 'home-hero',
    locale: 'es',
    data: {
      brandLine1: h.brandLine1,
      brandLine2: h.brandLine2,
      tagline: h.tagline,
      slogan: h.slogan,
      sloganHighlight: h.sloganHighlight,
      backgroundImageUrl: h.backgroundImageUrl,
      ctaPrimaryLabel: h.ctaPrimaryLabel || undefined,
      ctaSecondaryLabel: h.ctaSecondaryLabel || undefined,
      ctaPrimaryHref: h.ctaPrimaryHref,
      ctaSecondaryHref: h.ctaSecondaryHref,
      ...(heroId ? { backgroundImage: heroId } : {}),
    },
  })
  console.log('✓ Portada (Hero)')

  const w = fallbackCMS.homeWelcome
  await payload.updateGlobal({
    slug: 'home-welcome',
    locale: 'es',
    data: {
      eyebrow: w.eyebrow,
      name: w.name,
      paragraphs: w.paragraphs.map((text) => ({ text })),
      ...(welcomePhotoId ? { photo: welcomePhotoId } : {}),
    },
  })
  console.log('✓ Bienvenida / Fundador')

  const a = fallbackCMS.homeAbout
  await payload.updateGlobal({
    slug: 'home-about',
    locale: 'es',
    data: {
      title: a.title,
      content: a.content,
      imageUrl: a.imageUrl,
      values: a.values,
      ...(aboutId ? { image: aboutId } : {}),
    },
  })
  console.log('✓ Nosotros')

  const why = fallbackCMS.homeWhyChooseUs
  await payload.updateGlobal({
    slug: 'home-why-choose-us',
    locale: 'es',
    data: {
      title: why.title,
      subtitle: why.subtitle,
      reasons: why.reasons,
      bannerTitle: why.bannerTitle,
      bannerSubtitle: why.bannerSubtitle,
      bannerImageUrl: why.bannerImageUrl,
      ...(bannerId ? { bannerImage: bannerId } : {}),
    },
  })
  console.log('✓ ¿Por qué elegirnos?')

  const sp = fallbackCMS.servicesPage
  await payload.updateGlobal({
    slug: 'services-page',
    locale: 'es',
    data: {
      heroTitle: sp.heroTitle,
      heroSubtitle: sp.heroSubtitle,
      ctaLabel: sp.ctaLabel,
      ctaHref: sp.ctaHref,
      sectionIntro: sp.sectionIntro,
    },
  })
  console.log('✓ Página de Servicios')

  // —— Colecciones ——
  async function clearCollection(slug: 'services' | 'testimonials' | 'faqs' | 'posts') {
    const all = await payload.find({ collection: slug, limit: 200, pagination: false })
    for (const doc of all.docs) {
      await payload.delete({ collection: slug, id: doc.id })
    }
  }

  const servicesCount = (await payload.find({ collection: 'services', limit: 1 })).totalDocs
  if (FORCE || servicesCount === 0) {
    if (FORCE && servicesCount > 0) await clearCollection('services')
    for (const service of fallbackCMS.services) {
      const imageId = await ensureMedia(service.imageUrl, `Servicio: ${service.title}`)
      await payload.create({
        collection: 'services',
        locale: 'es',
        data: {
          title: service.title,
          slug: service.slug,
          description: service.description,
          expandedDescription: service.expandedDescription,
          imageUrl: service.imageUrl,
          iconKey: service.iconKey as any,
          order: service.order,
          ...(imageId ? { image: imageId } : {}),
        },
      })
    }
    console.log(`✓ ${fallbackCMS.services.length} servicios`)
  } else {
    console.log('Servicios ya existen (SEED_FORCE=1 para reemplazar)')
  }

  const testimonialsCount = (await payload.find({ collection: 'testimonials', limit: 1 })).totalDocs
  if (FORCE || testimonialsCount === 0) {
    if (FORCE && testimonialsCount > 0) await clearCollection('testimonials')
    for (const t of fallbackCMS.testimonials) {
      const avatarId = await ensureMedia(t.avatarUrl, `Avatar ${t.name}`)
      await payload.create({
        collection: 'testimonials',
        locale: 'es',
        data: {
          name: t.name,
          role: t.role,
          content: t.content,
          avatarUrl: t.avatarUrl,
          rating: t.rating,
          gender: t.gender,
          location: t.location,
          order: t.order,
          ...(avatarId ? { avatar: avatarId } : {}),
        },
      })
    }
    console.log(`✓ ${fallbackCMS.testimonials.length} testimonios`)
  } else {
    console.log('Testimonios ya existen (SEED_FORCE=1 para reemplazar)')
  }

  const faqsCount = (await payload.find({ collection: 'faqs', limit: 1 })).totalDocs
  if (FORCE || faqsCount === 0) {
    if (FORCE && faqsCount > 0) await clearCollection('faqs')
    for (const faq of fallbackCMS.faqs) {
      await payload.create({
        collection: 'faqs',
        locale: 'es',
        data: {
          question: faq.question,
          answer: faq.answer,
          order: faq.order,
        },
      })
    }
    console.log(`✓ ${fallbackCMS.faqs.length} FAQs`)
  } else {
    console.log('FAQs ya existen (SEED_FORCE=1 para reemplazar)')
  }

  const postsCount = (await payload.find({ collection: 'posts', limit: 1 })).totalDocs
  if (FORCE || postsCount === 0) {
    if (FORCE && postsCount > 0) await clearCollection('posts')
    for (const post of fallbackCMS.posts) {
      const imageId = await ensureMedia(post.imageUrl, `Blog: ${post.title}`)
      await payload.create({
        collection: 'posts',
        locale: 'es',
        data: {
          title: post.title,
          slug: post.slug,
          excerpt: post.excerpt,
          contentHtml: post.contentHtml,
          publishedAt: post.publishedAt,
          author: post.author,
          category: post.category,
          readTime: post.readTime,
          imageUrl: post.imageUrl,
          ...(imageId ? { image: imageId } : {}),
        },
      })
    }
    console.log(`✓ ${fallbackCMS.posts.length} artículos del blog`)
  } else {
    console.log('Blog ya existe (SEED_FORCE=1 para reemplazar)')
  }

  console.log('\nSeed completo. Abra /admin y verá textos e imágenes actuales.')
  process.exit(0)
}

seed().catch((err) => {
  console.error(err)
  process.exit(1)
})
