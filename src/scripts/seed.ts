import { config as loadEnv } from 'dotenv'
import path from 'path'

loadEnv({ path: path.resolve(process.cwd(), '.env.local') })
loadEnv()

async function seed() {
  if (!process.env.DATABASE_URI) {
    throw new Error('DATABASE_URI is required to seed')
  }
  if (!process.env.PAYLOAD_SECRET) {
    throw new Error('PAYLOAD_SECRET is required to seed')
  }

  const { getPayload } = await import('payload')
  const { default: config } = await import('../payload.config')
  const { fallbackCMS } = await import('../lib/cms/fallback')

  const payload = await getPayload({ config })

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
      data: {
        email: adminEmail,
        password: adminPassword,
        name: 'Admin',
      },
    })
    console.log(`Created admin user: ${adminEmail}`)
  } else {
    console.log(`Admin user already exists: ${adminEmail}`)
  }

  const existingServices = await payload.find({ collection: 'services', limit: 1 })
  if (existingServices.totalDocs === 0) {
    for (const service of fallbackCMS.services) {
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
        },
      })
    }
    console.log(`Seeded ${fallbackCMS.services.length} services`)
  } else {
    console.log('Services already seeded — skipping')
  }

  const existingTestimonials = await payload.find({ collection: 'testimonials', limit: 1 })
  if (existingTestimonials.totalDocs === 0) {
    for (const t of fallbackCMS.testimonials) {
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
        },
      })
    }
    console.log(`Seeded ${fallbackCMS.testimonials.length} testimonials`)
  } else {
    console.log('Testimonials already seeded — skipping')
  }

  const existingFaqs = await payload.find({ collection: 'faqs', limit: 1 })
  if (existingFaqs.totalDocs === 0) {
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
    console.log(`Seeded ${fallbackCMS.faqs.length} FAQs`)
  } else {
    console.log('FAQs already seeded — skipping')
  }

  const existingPosts = await payload.find({ collection: 'posts', limit: 1 })
  if (existingPosts.totalDocs === 0) {
    for (const post of fallbackCMS.posts) {
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
        },
      })
    }
    console.log(`Seeded ${fallbackCMS.posts.length} posts`)
  } else {
    console.log('Posts already seeded — skipping')
  }

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
    },
  })
  console.log('Updated site-settings')

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
    },
  })
  console.log('Updated seo')

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
      ctaPrimaryHref: h.ctaPrimaryHref,
      ctaSecondaryHref: h.ctaSecondaryHref,
    },
  })
  console.log('Updated home-hero')

  const w = fallbackCMS.homeWelcome
  await payload.updateGlobal({
    slug: 'home-welcome',
    locale: 'es',
    data: {
      eyebrow: w.eyebrow,
      name: w.name,
      paragraphs: w.paragraphs.map((text) => ({ text })),
    },
  })
  console.log('Updated home-welcome')

  const a = fallbackCMS.homeAbout
  await payload.updateGlobal({
    slug: 'home-about',
    locale: 'es',
    data: {
      title: a.title,
      content: a.content,
      imageUrl: a.imageUrl,
      values: a.values,
    },
  })
  console.log('Updated home-about')

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
    },
  })
  console.log('Updated home-why-choose-us')

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
  console.log('Updated services-page')

  console.log('Seed complete.')
  process.exit(0)
}

seed().catch((err) => {
  console.error(err)
  process.exit(1)
})
