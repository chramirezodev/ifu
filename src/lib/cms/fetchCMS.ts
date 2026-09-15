import { fallbackCMS } from './fallback'
import type {
  CMSData,
  CMSFaq,
  CMSPost,
  CMSService,
  CMSTestimonial,
} from './types'
import { getPayloadClient, mediaUrl } from './payload'

type Locale = 'es' | 'en' | string

/** Next.js getStaticProps no puede serializar `undefined` en JSON. */
function toStaticProps<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T
}

function mapService(doc: any): CMSService {
  return {
    id: doc.id,
    title: doc.title,
    slug: doc.slug,
    description: doc.description,
    expandedDescription: doc.expandedDescription || '',
    imageUrl: mediaUrl(doc.image, doc.imageUrl || ''),
    iconKey: doc.iconKey || doc.slug,
    order: doc.order ?? 0,
    whatsappMessage: doc.whatsappMessage || '',
  }
}

function mapTestimonial(doc: any): CMSTestimonial {
  return {
    id: doc.id,
    name: doc.name,
    role: doc.role || '',
    content: doc.content,
    avatarUrl: mediaUrl(doc.avatar, doc.avatarUrl || ''),
    rating: doc.rating ?? 5,
    gender: doc.gender || undefined,
    location: doc.location || '',
    order: doc.order ?? 0,
  }
}

function mapFaq(doc: any): CMSFaq {
  return {
    id: doc.id,
    question: doc.question,
    answer: doc.answer,
    category: doc.category || '',
    order: doc.order ?? 0,
  }
}

function mapPost(doc: any): CMSPost {
  return {
    id: doc.id,
    title: doc.title,
    slug: doc.slug,
    excerpt: doc.excerpt || '',
    contentHtml: doc.contentHtml || '',
    publishedAt: doc.publishedAt
      ? new Date(doc.publishedAt).toISOString().slice(0, 10)
      : '',
    author: doc.author || 'Roger Mardini, Esq.',
    category: doc.category || '',
    readTime: doc.readTime || '',
    imageUrl: mediaUrl(doc.image, doc.imageUrl || ''),
  }
}

export async function fetchCMSData(locale: Locale = 'es'): Promise<CMSData> {
  if (!process.env.DATABASE_URI || !process.env.PAYLOAD_SECRET) {
    return toStaticProps(fallbackCMS)
  }

  try {
    const payload = await getPayloadClient()
    // Verify DB is reachable with a lightweight call
    await payload.find({ collection: 'users', limit: 1 })
    const loc = locale === 'en' ? 'en' : 'es'

    const [
      siteSettings,
      seo,
      homeHero,
      homeWelcome,
      homeAbout,
      homeWhyChooseUs,
      servicesPage,
      servicesRes,
      testimonialsRes,
      faqsRes,
      postsRes,
    ] = await Promise.all([
      payload.findGlobal({ slug: 'site-settings', locale: loc as 'es' | 'en', fallbackLocale: 'es' }),
      payload.findGlobal({ slug: 'seo', locale: loc as 'es' | 'en', fallbackLocale: 'es' }),
      payload.findGlobal({ slug: 'home-hero', locale: loc as 'es' | 'en', fallbackLocale: 'es' }),
      payload.findGlobal({ slug: 'home-welcome', locale: loc as 'es' | 'en', fallbackLocale: 'es' }),
      payload.findGlobal({ slug: 'home-about', locale: loc as 'es' | 'en', fallbackLocale: 'es' }),
      payload.findGlobal({
        slug: 'home-why-choose-us',
        locale: loc as 'es' | 'en',
        fallbackLocale: 'es',
      }),
      payload.findGlobal({ slug: 'services-page', locale: loc as 'es' | 'en', fallbackLocale: 'es' }),
      payload.find({
        collection: 'services',
        locale: loc as 'es' | 'en',
        fallbackLocale: 'es',
        sort: 'order',
        limit: 100,
        depth: 1,
      }),
      payload.find({
        collection: 'testimonials',
        locale: loc as 'es' | 'en',
        fallbackLocale: 'es',
        sort: 'order',
        limit: 100,
        depth: 1,
      }),
      payload.find({
        collection: 'faqs',
        locale: loc as 'es' | 'en',
        fallbackLocale: 'es',
        sort: 'order',
        limit: 100,
      }),
      payload.find({
        collection: 'posts',
        locale: loc as 'es' | 'en',
        fallbackLocale: 'es',
        sort: '-publishedAt',
        limit: 100,
        depth: 1,
      }),
    ])

    const services = servicesRes.docs.map(mapService)
    const testimonials = testimonialsRes.docs.map(mapTestimonial)
    const faqs = faqsRes.docs.map(mapFaq)
    const posts = postsRes.docs.map(mapPost)

    return toStaticProps({
      siteSettings: {
        firmName: siteSettings.firmName || fallbackCMS.siteSettings.firmName,
        founder: siteSettings.founder || fallbackCMS.siteSettings.founder,
        tagline: siteSettings.tagline || fallbackCMS.siteSettings.tagline,
        slogan: siteSettings.slogan || fallbackCMS.siteSettings.slogan,
        email: siteSettings.email || fallbackCMS.siteSettings.email,
        phone: siteSettings.phone || fallbackCMS.siteSettings.phone,
        whatsappNumber:
          siteSettings.whatsappNumber || fallbackCMS.siteSettings.whatsappNumber,
        whatsappAutoMessage:
          siteSettings.whatsappAutoMessage ||
          fallbackCMS.siteSettings.whatsappAutoMessage,
        consultationWhatsAppMessage:
          siteSettings.consultationWhatsAppMessage ||
          fallbackCMS.siteSettings.consultationWhatsAppMessage,
        address: siteSettings.address || fallbackCMS.siteSettings.address,
        workHours: siteSettings.workHours || fallbackCMS.siteSettings.workHours,
        website: siteSettings.website || fallbackCMS.siteSettings.website,
        paymentUrl: siteSettings.paymentUrl || fallbackCMS.siteSettings.paymentUrl,
        googleMapsUrl:
          siteSettings.googleMapsUrl || fallbackCMS.siteSettings.googleMapsUrl,
        mapEmbedUrl:
          siteSettings.mapEmbedUrl || fallbackCMS.siteSettings.mapEmbedUrl,
        logoUrl: mediaUrl(
          siteSettings.logo,
          fallbackCMS.siteSettings.logoUrl,
        ),
        socialLinks:
          (siteSettings.socialLinks as { platform: string; url: string }[])?.length > 0
            ? (siteSettings.socialLinks as { platform: string; url: string }[])
            : fallbackCMS.siteSettings.socialLinks,
        footerServiceLabels:
          (siteSettings.footerServiceLabels as { label: string }[])?.length > 0
            ? (siteSettings.footerServiceLabels as { label: string }[]).map((i) => i.label)
            : fallbackCMS.siteSettings.footerServiceLabels,
      },
      seo: {
        siteName: seo.siteName || fallbackCMS.seo.siteName,
        defaultTitle: seo.defaultTitle || fallbackCMS.seo.defaultTitle,
        defaultDescription:
          seo.defaultDescription || fallbackCMS.seo.defaultDescription,
        keywords: seo.keywords || fallbackCMS.seo.keywords,
        ogImageUrl: mediaUrl(seo.ogImage, seo.ogImageUrl || fallbackCMS.seo.ogImageUrl),
        twitterHandle: seo.twitterHandle || fallbackCMS.seo.twitterHandle,
      },
      homeHero: {
        brandLine1: homeHero.brandLine1 || fallbackCMS.homeHero.brandLine1,
        brandLine2: homeHero.brandLine2 || fallbackCMS.homeHero.brandLine2,
        tagline: homeHero.tagline || fallbackCMS.homeHero.tagline,
        slogan: homeHero.slogan || fallbackCMS.homeHero.slogan,
        sloganHighlight:
          homeHero.sloganHighlight || fallbackCMS.homeHero.sloganHighlight,
        backgroundImageUrl: mediaUrl(
          homeHero.backgroundImage,
          homeHero.backgroundImageUrl || fallbackCMS.homeHero.backgroundImageUrl,
        ),
        ctaPrimaryLabel:
          homeHero.ctaPrimaryLabel || fallbackCMS.homeHero.ctaPrimaryLabel,
        ctaPrimaryHref:
          homeHero.ctaPrimaryHref || fallbackCMS.homeHero.ctaPrimaryHref,
        ctaSecondaryLabel:
          homeHero.ctaSecondaryLabel || fallbackCMS.homeHero.ctaSecondaryLabel,
        ctaSecondaryHref:
          homeHero.ctaSecondaryHref || fallbackCMS.homeHero.ctaSecondaryHref,
      },
      homeWelcome: {
        eyebrow: homeWelcome.eyebrow || fallbackCMS.homeWelcome.eyebrow,
        name: homeWelcome.name || fallbackCMS.homeWelcome.name,
        paragraphs:
          (homeWelcome.paragraphs as { text: string }[])?.length > 0
            ? (homeWelcome.paragraphs as { text: string }[]).map((p) => p.text)
            : fallbackCMS.homeWelcome.paragraphs,
        photoUrl: mediaUrl(homeWelcome.photo, homeWelcome.photoUrl || ''),
      },
      homeAbout: {
        title: homeAbout.title || fallbackCMS.homeAbout.title,
        content: homeAbout.content || fallbackCMS.homeAbout.content,
        imageUrl: mediaUrl(
          homeAbout.image,
          homeAbout.imageUrl || fallbackCMS.homeAbout.imageUrl,
        ),
        values:
          (homeAbout.values as { title: string; description: string }[])?.length > 0
            ? (homeAbout.values as { title: string; description: string }[])
            : fallbackCMS.homeAbout.values,
      },
      homeWhyChooseUs: {
        title: homeWhyChooseUs.title || fallbackCMS.homeWhyChooseUs.title,
        subtitle: homeWhyChooseUs.subtitle || fallbackCMS.homeWhyChooseUs.subtitle,
        reasons:
          (homeWhyChooseUs.reasons as CMSData['homeWhyChooseUs']['reasons'])?.length > 0
            ? (homeWhyChooseUs.reasons as CMSData['homeWhyChooseUs']['reasons'])
            : fallbackCMS.homeWhyChooseUs.reasons,
        bannerTitle:
          homeWhyChooseUs.bannerTitle || fallbackCMS.homeWhyChooseUs.bannerTitle,
        bannerSubtitle:
          homeWhyChooseUs.bannerSubtitle ||
          fallbackCMS.homeWhyChooseUs.bannerSubtitle,
        bannerImageUrl: mediaUrl(
          homeWhyChooseUs.bannerImage,
          homeWhyChooseUs.bannerImageUrl ||
            fallbackCMS.homeWhyChooseUs.bannerImageUrl,
        ),
      },
      servicesPage: {
        heroTitle: servicesPage.heroTitle || fallbackCMS.servicesPage.heroTitle,
        heroSubtitle:
          servicesPage.heroSubtitle || fallbackCMS.servicesPage.heroSubtitle,
        ctaLabel: servicesPage.ctaLabel || fallbackCMS.servicesPage.ctaLabel,
        ctaHref: servicesPage.ctaHref || fallbackCMS.servicesPage.ctaHref,
        sectionIntro:
          servicesPage.sectionIntro || fallbackCMS.servicesPage.sectionIntro,
      },
      services: services.length > 0 ? services : fallbackCMS.services,
      testimonials:
        testimonials.length > 0 ? testimonials : fallbackCMS.testimonials,
      faqs: faqs.length > 0 ? faqs : fallbackCMS.faqs,
      posts: posts.length > 0 ? posts : fallbackCMS.posts,
    })
  } catch (error) {
    console.warn('[CMS] Falling back to local content:', error)
    return toStaticProps(fallbackCMS)
  }
}

export async function fetchPostBySlug(
  slug: string,
  locale: Locale = 'es',
): Promise<CMSPost | null> {
  const fallback = fallbackCMS.posts.find((p) => p.slug === slug) || null

  if (!process.env.DATABASE_URI || !process.env.PAYLOAD_SECRET) {
    return fallback ? toStaticProps(fallback) : null
  }

  try {
    const payload = await getPayloadClient()
    const loc = locale === 'en' ? 'en' : 'es'
    const result = await payload.find({
      collection: 'posts',
      locale: loc as 'es' | 'en',
      fallbackLocale: 'es',
      where: { slug: { equals: slug } },
      limit: 1,
      depth: 1,
    })
    if (result.docs[0]) return toStaticProps(mapPost(result.docs[0]))
    return fallback ? toStaticProps(fallback) : null
  } catch {
    return fallback ? toStaticProps(fallback) : null
  }
}
