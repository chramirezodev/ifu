import { GetStaticPaths, GetStaticProps } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Layout from '@/components/layout/Layout'
import SEO from '@/components/common/SEO'
import { useCMS } from '@/context/CMSContext'
import { fetchCMSData } from '@/lib/cms/fetchCMS'
import type { CMSService } from '@/lib/cms/types'

const FALLBACK_IMAGE = '/images/statue-of-liberty-1758290_1280.jpg'

export default function ServiceDetailPage({ service }: { service: CMSService }) {
  const { t } = useTranslation('common')
  const { services, siteSettings } = useCMS()

  const whatsappMessage = service.whatsappMessage || siteSettings.consultationWhatsAppMessage
  const whatsappUrl = `https://wa.me/${siteSettings.whatsappNumber.replace(/\D/g, '')}?text=${encodeURIComponent(whatsappMessage)}`
  const contactHref = `/?service=${encodeURIComponent(service.slug)}#contacto`
  const paragraphs = (service.expandedDescription || '')
    .split(/\n+/)
    .map((p) => p.trim())
    .filter(Boolean)
  const otherServices = services.filter((s) => s.slug !== service.slug)

  return (
    <>
      <SEO title={`${service.title} | Mardini Law Firm`} description={service.description} />

      <Layout whatsappMessage={whatsappMessage}>
        <section className="relative h-[22rem] md:h-[26rem] w-full overflow-hidden">
          <Image
            src={service.imageUrl || FALLBACK_IMAGE}
            alt={t('services.imageAlt', { title: service.title })}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/90 via-brand-navy/60 to-brand-navy/30" />
          <div className="relative z-10 container mx-auto px-4 max-w-5xl h-full flex flex-col justify-end pb-10 text-white">
            <Link href="/#servicios" className="inline-flex items-center text-white/80 hover:text-white mb-6 text-sm font-medium">
              <span aria-hidden="true" className="mr-2">←</span>
              {t('services.detail.back')}
            </Link>
            <p className="uppercase tracking-widest text-xs text-white/70 mb-2">{t('services.detail.eyebrow')}</p>
            <h1 className="text-3xl md:text-5xl font-bold mb-4">{service.title}</h1>
            <p className="text-lg md:text-xl text-white/90 max-w-3xl">{service.description}</p>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 max-w-5xl grid gap-10 lg:grid-cols-3">
            <article className="lg:col-span-2">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">{t('services.detail.aboutTitle')}</h2>
              <div className="w-16 h-1 bg-usa-blue mb-6" />
              {(paragraphs.length > 0 ? paragraphs : [service.description]).map((paragraph) => (
                <p key={paragraph} className="text-gray-700 text-lg leading-relaxed mb-4 text-justify">
                  {paragraph}
                </p>
              ))}
            </article>

            <aside className="bg-gray-50 rounded-xl shadow-md p-6 h-fit lg:sticky lg:top-24">
              <h3 className="text-xl font-bold text-gray-900 mb-3">{t('services.detail.ctaTitle')}</h3>
              <p className="text-gray-600 mb-6">{t('services.detail.ctaText')}</p>
              <Link
                href={contactHref}
                className="block w-full text-center bg-usa-blue text-white py-3 px-6 rounded-lg font-semibold hover:bg-usa-blue-dark transition-colors duration-200 mb-3"
              >
                {t('services.detail.ctaButton')}
              </Link>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center bg-[#25D366] text-white py-3 px-6 rounded-lg font-semibold hover:bg-[#1ebe57] transition-colors duration-200"
              >
                {t('services.detail.whatsapp')}
              </a>
            </aside>
          </div>
        </section>

        {otherServices.length > 0 && (
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4 max-w-5xl">
              <h2 className="text-2xl font-bold text-gray-900 mb-8">{t('services.detail.otherServices')}</h2>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {otherServices.map((other) => (
                  <Link
                    key={other.slug}
                    href={`/servicios/${encodeURIComponent(other.slug)}`}
                    className="group bg-white rounded-lg shadow-sm hover:shadow-md p-5 transition-shadow duration-200"
                  >
                    <h3 className="font-semibold text-gray-900 group-hover:text-usa-blue mb-1">{other.title}</h3>
                    <p className="text-sm text-gray-600">{other.description}</p>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </Layout>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async ({ locales = ['es'] }) => {
  const paths = (
    await Promise.all(
      locales.map(async (locale) => {
        const cms = await fetchCMSData(locale)
        return cms.services.map((service) => ({ params: { slug: service.slug }, locale }))
      }),
    )
  ).flat()

  return { paths, fallback: 'blocking' }
}

export const getStaticProps: GetStaticProps = async ({ params, locale }) => {
  const slug = params?.slug as string
  const cms = await fetchCMSData(locale ?? 'es')
  const service = cms.services.find((s) => s.slug === slug)

  if (!service) {
    return { notFound: true, revalidate: 60 }
  }

  return {
    props: {
      service,
      cms,
      ...(await serverSideTranslations(locale ?? 'es', ['common'])),
    },
    revalidate: 60,
  }
}
