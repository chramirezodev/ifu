import { GetStaticProps, GetStaticPaths } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Layout from '@/components/layout/Layout'
import SEO from '@/components/common/SEO'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { fetchCMSData, fetchPostBySlug } from '@/lib/cms/fetchCMS'
import type { CMSPost } from '@/lib/cms/types'

export default function BlogPostPage({ post }: { post: CMSPost }) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  const articleStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    image: post.imageUrl,
    author: {
      '@type': 'Person',
      name: post.author,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Mardini Law Firm',
      logo: {
        '@type': 'ImageObject',
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/images/Logos/logo.png`,
      },
    },
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${process.env.NEXT_PUBLIC_SITE_URL}/blog/${post.slug}`,
    },
  }

  return (
    <>
      <SEO
        title={post.seo?.metaTitle || `${post.title} | Mardini Law Firm`}
        description={post.seo?.metaDescription || post.excerpt}
        keywords={post.seo?.keywords}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleStructuredData) }}
      />

      <Layout>
        <div className="min-h-screen bg-gray-50">
          <section className="bg-gradient-to-r from-usa-blue to-usa-red text-white py-20">
            <div className="container mx-auto px-4 max-w-4xl">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <Link href="/blog" className="inline-flex items-center text-white/80 hover:text-white mb-6">
                  ← Volver al blog
                </Link>

                <div className="flex items-center gap-3 mb-4">
                  <span className="bg-white/20 px-3 py-1 rounded-full text-sm">{post.category}</span>
                  <span className="text-white/80">{post.readTime}</span>
                </div>

                <h1 className="text-4xl md:text-5xl font-bold mb-6">{post.title}</h1>

                <div className="flex items-center gap-4 text-lg">
                  <div>
                    <p className="font-medium">{post.author}</p>
                    <p className="text-white/80">{formatDate(post.publishedAt)}</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>

          <section className="py-16">
            <div className="container mx-auto px-4 max-w-4xl">
              <motion.article
                className="bg-white rounded-xl shadow-lg p-8 md:p-12"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                {post.contentHtml ? (
                  <div
                    className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-li:text-gray-700 prose-strong:text-gray-900"
                    dangerouslySetInnerHTML={{ __html: post.contentHtml }}
                  />
                ) : (
                  <p className="text-gray-700 text-lg">{post.excerpt}</p>
                )}
              </motion.article>
            </div>
          </section>

          <section className="py-16 bg-usa-blue text-white">
            <div className="container mx-auto px-4 text-center">
              <h2 className="text-3xl font-bold mb-4">¿Necesitas ayuda con tu caso migratorio?</h2>
              <p className="text-xl mb-8 max-w-2xl mx-auto">
                Nuestros expertos pueden guiarte a través de cada paso del proceso.
              </p>
              <Link
                href="/contacto"
                className="bg-white text-usa-blue px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors duration-300 inline-block"
              >
                Agenda una Consulta
              </Link>
            </div>
          </section>
        </div>
      </Layout>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const cms = await fetchCMSData('es')
  const paths = cms.posts.map((post) => ({
    params: { slug: post.slug },
  }))

  return {
    paths,
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps = async ({ params, locale }) => {
  const slug = params?.slug as string
  const post = (await fetchPostBySlug(slug, locale ?? 'es')) || null
  const cms = await fetchCMSData(locale ?? 'es')

  if (!post) {
    return { notFound: true }
  }

  return {
    props: {
      post,
      cms,
      ...(await serverSideTranslations(locale ?? 'es', ['common'])),
    },
    revalidate: 60,
  }
}
