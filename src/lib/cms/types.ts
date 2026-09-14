export type CMSService = {
  id: string | number
  title: string
  slug: string
  description: string
  expandedDescription?: string
  imageUrl?: string
  iconKey?: string
  order: number
  whatsappMessage?: string
}

export type CMSTestimonial = {
  id: string | number
  name: string
  role?: string
  content: string
  avatarUrl?: string
  rating: number
  gender?: 'male' | 'female'
  location?: string
  order: number
}

export type CMSFaq = {
  id: string | number
  question: string
  answer: string
  category?: string
  order: number
}

export type CMSPost = {
  id: string | number
  title: string
  slug: string
  excerpt: string
  contentHtml: string
  publishedAt: string
  author: string
  category: string
  readTime: string
  imageUrl: string
  seo?: {
    metaTitle?: string
    metaDescription?: string
    keywords?: string
  }
}

export type CMSSiteSettings = {
  firmName: string
  founder: string
  tagline: string
  slogan: string
  email: string
  phone: string
  whatsappNumber: string
  whatsappAutoMessage: string
  consultationWhatsAppMessage: string
  address: string
  workHours: string
  website: string
  paymentUrl: string
  googleMapsUrl: string
  mapEmbedUrl: string
  logoUrl: string
  socialLinks: { platform: string; url: string }[]
  footerServiceLabels: string[]
}

export type CMSSeo = {
  siteName: string
  defaultTitle: string
  defaultDescription: string
  keywords: string
  ogImageUrl: string
  twitterHandle: string
}

export type CMSHomeHero = {
  brandLine1: string
  brandLine2: string
  tagline: string
  slogan: string
  sloganHighlight: string
  backgroundImageUrl: string
  ctaPrimaryLabel: string
  ctaPrimaryHref: string
  ctaSecondaryLabel: string
  ctaSecondaryHref: string
}

export type CMSHomeWelcome = {
  eyebrow: string
  name: string
  paragraphs: string[]
  photoUrl?: string
}

export type CMSHomeAbout = {
  title: string
  content: string
  imageUrl: string
  values: { title: string; description: string }[]
}

export type CMSHomeWhyChooseUs = {
  title: string
  subtitle: string
  reasons: {
    title: string
    description: string
    expandedDescription?: string
    iconKey?: string
  }[]
  bannerTitle: string
  bannerSubtitle: string
  bannerImageUrl: string
}

export type CMSServicesPage = {
  heroTitle: string
  heroSubtitle: string
  ctaLabel: string
  ctaHref: string
  sectionIntro: string
}

export type CMSData = {
  siteSettings: CMSSiteSettings
  seo: CMSSeo
  homeHero: CMSHomeHero
  homeWelcome: CMSHomeWelcome
  homeAbout: CMSHomeAbout
  homeWhyChooseUs: CMSHomeWhyChooseUs
  servicesPage: CMSServicesPage
  services: CMSService[]
  testimonials: CMSTestimonial[]
  faqs: CMSFaq[]
  posts: CMSPost[]
}
