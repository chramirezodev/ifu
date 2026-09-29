import { fallbackCMS } from './fallback'
import { fallbackCMSEn } from './fallback.en'
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
  const fb = locale === 'en' ? fallbackCMSEn : fallbackCMS
  if (!process.env.DATABASE_URI || !process.env.PAYLOAD_SECRET) {
    return toStaticProps(fb)
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
      payload.findGlobal({
        slug: 'site-settings',
        locale: loc as 'es' | 'en',
        fallbackLocale: 'es',
        depth: 1,
      }),
      payload.findGlobal({
        slug: 'seo',
        locale: loc as 'es' | 'en',
        fallbackLocale: 'es',
        depth: 1,
      }),
      payload.findGlobal({
        slug: 'home-hero',
        locale: loc as 'es' | 'en',
        fallbackLocale: 'es',
        depth: 1,
      }),
      payload.findGlobal({
        slug: 'home-welcome',
        locale: loc as 'es' | 'en',
        fallbackLocale: 'es',
        depth: 1,
      }),
      payload.findGlobal({
        slug: 'home-about',
        locale: loc as 'es' | 'en',
        fallbackLocale: 'es',
        depth: 1,
      }),
      payload.findGlobal({
        slug: 'home-why-choose-us',
        locale: loc as 'es' | 'en',
        fallbackLocale: 'es',
        depth: 1,
      }),
      payload.findGlobal({
        slug: 'services-page',
        locale: loc as 'es' | 'en',
        fallbackLocale: 'es',
        depth: 1,
      }),
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
        firmName: siteSettings.firmName || fb.siteSettings.firmName,
        founder: siteSettings.founder || fb.siteSettings.founder,
        tagline: siteSettings.tagline || fb.siteSettings.tagline,
        slogan: siteSettings.slogan || fb.siteSettings.slogan,
        email: siteSettings.email || fb.siteSettings.email,
        phone: siteSettings.phone || fb.siteSettings.phone,
        whatsappNumber:
          siteSettings.whatsappNumber || fb.siteSettings.whatsappNumber,
        whatsappAutoMessage:
          siteSettings.whatsappAutoMessage ||
          fb.siteSettings.whatsappAutoMessage,
        consultationWhatsAppMessage:
          siteSettings.consultationWhatsAppMessage ||
          fb.siteSettings.consultationWhatsAppMessage,
        address: siteSettings.address || fb.siteSettings.address,
        workHours: siteSettings.workHours || fb.siteSettings.workHours,
        website: siteSettings.website || fb.siteSettings.website,
        paymentUrl: siteSettings.paymentUrl || fb.siteSettings.paymentUrl,
        googleMapsUrl:
          siteSettings.googleMapsUrl || fb.siteSettings.googleMapsUrl,
        mapEmbedUrl:
          siteSettings.mapEmbedUrl || fb.siteSettings.mapEmbedUrl,
        logoUrl: mediaUrl(
          siteSettings.logo,
          fb.siteSettings.logoUrl,
        ),
        socialLinks:
          (siteSettings.socialLinks as { platform: string; url: string }[])?.length > 0
            ? (siteSettings.socialLinks as { platform: string; url: string }[])
            : fb.siteSettings.socialLinks,
        footerServiceLabels:
          (siteSettings.footerServiceLabels as { label: string }[])?.length > 0
            ? (siteSettings.footerServiceLabels as { label: string }[]).map((i) => i.label)
            : fb.siteSettings.footerServiceLabels,
      },
      seo: {
        siteName: seo.siteName || fb.seo.siteName,
        defaultTitle: seo.defaultTitle || fb.seo.defaultTitle,
        defaultDescription:
          seo.defaultDescription || fb.seo.defaultDescription,
        keywords: seo.keywords || fb.seo.keywords,
        ogImageUrl: mediaUrl(seo.ogImage, seo.ogImageUrl || fb.seo.ogImageUrl),
        twitterHandle: seo.twitterHandle || fb.seo.twitterHandle,
      },
      homeHero: {
        brandLine1: homeHero.brandLine1 || fb.homeHero.brandLine1,
        brandLine2: homeHero.brandLine2 || fb.homeHero.brandLine2,
        tagline: homeHero.tagline || fb.homeHero.tagline,
        slogan: homeHero.slogan || fb.homeHero.slogan,
        sloganHighlight:
          homeHero.sloganHighlight || fb.homeHero.sloganHighlight,
        backgroundImageUrl: mediaUrl(
          homeHero.backgroundImage,
          homeHero.backgroundImageUrl || fb.homeHero.backgroundImageUrl,
        ),
        ctaPrimaryLabel:
          homeHero.ctaPrimaryLabel || fb.homeHero.ctaPrimaryLabel,
        ctaPrimaryHref:
          homeHero.ctaPrimaryHref || fb.homeHero.ctaPrimaryHref,
        ctaSecondaryLabel:
          homeHero.ctaSecondaryLabel || fb.homeHero.ctaSecondaryLabel,
        ctaSecondaryHref:
          homeHero.ctaSecondaryHref || fb.homeHero.ctaSecondaryHref,
      },
      homeWelcome: {
        eyebrow: homeWelcome.eyebrow || fb.homeWelcome.eyebrow,
        name: homeWelcome.name || fb.homeWelcome.name,
        paragraphs:
          (homeWelcome.paragraphs as { text: string }[])?.length > 0
            ? (homeWelcome.paragraphs as { text: string }[]).map((p) => p.text)
            : fb.homeWelcome.paragraphs,
        photoUrl: homeWelcome.photoUrl
          ? mediaUrl(null, homeWelcome.photoUrl)
          : mediaUrl(
              homeWelcome.photo,
              fb.homeWelcome.photoUrl || '',
            ),
      },
      homeAbout: {
        title: homeAbout.title || fb.homeAbout.title,
        content: homeAbout.content || fb.homeAbout.content,
        imageUrl: mediaUrl(
          homeAbout.image,
          homeAbout.imageUrl || fb.homeAbout.imageUrl,
        ),
        values:
          (homeAbout.values as { title: string; description: string }[])?.length > 0
            ? (homeAbout.values as { title: string; description: string }[])
            : fb.homeAbout.values,
      },
      homeWhyChooseUs: {
        title: homeWhyChooseUs.title || fb.homeWhyChooseUs.title,
        subtitle: homeWhyChooseUs.subtitle || fb.homeWhyChooseUs.subtitle,
        reasons:
          (homeWhyChooseUs.reasons as CMSData['homeWhyChooseUs']['reasons'])?.length > 0
            ? (homeWhyChooseUs.reasons as CMSData['homeWhyChooseUs']['reasons'])
            : fb.homeWhyChooseUs.reasons,
        bannerTitle:
          homeWhyChooseUs.bannerTitle || fb.homeWhyChooseUs.bannerTitle,
        bannerSubtitle:
          homeWhyChooseUs.bannerSubtitle ||
          fb.homeWhyChooseUs.bannerSubtitle,
        bannerImageUrl: mediaUrl(
          homeWhyChooseUs.bannerImage,
          homeWhyChooseUs.bannerImageUrl ||
            fb.homeWhyChooseUs.bannerImageUrl,
        ),
      },
      servicesPage: {
        heroTitle: servicesPage.heroTitle || fb.servicesPage.heroTitle,
        heroSubtitle:
          servicesPage.heroSubtitle || fb.servicesPage.heroSubtitle,
        ctaLabel: servicesPage.ctaLabel || fb.servicesPage.ctaLabel,
        ctaHref: servicesPage.ctaHref || fb.servicesPage.ctaHref,
        sectionIntro:
          servicesPage.sectionIntro || fb.servicesPage.sectionIntro,
      },
      services: services.length > 0 ? services : fb.services,
      testimonials:
        testimonials.length > 0 ? testimonials : fb.testimonials,
      faqs: faqs.length > 0 ? faqs : fb.faqs,
      posts: posts.length > 0 ? posts : fb.posts,
    })
  } catch (error) {
    console.warn('[CMS] Falling back to local content:', error)
    return toStaticProps(fb)
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
