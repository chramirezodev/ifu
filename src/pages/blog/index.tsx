import { GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Layout from '@/components/layout/Layout'
import SEO from '@/components/common/SEO'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useMemo, useState } from 'react'
import { useCMS } from '@/context/CMSContext'
import { fetchCMSData } from '@/lib/cms/fetchCMS'

export default function BlogIndex() {
  const { posts } = useCMS()
  const [selectedCategory, setSelectedCategory] = useState('Todos')

  const categories = useMemo(() => {
    const cats = Array.from(new Set(posts.map((p) => p.category).filter(Boolean)))
    return ['Todos', ...cats]
  }, [posts])

  const filteredPosts =
    selectedCategory === 'Todos'
      ? posts
      : posts.filter((post) => post.category === selectedCategory)

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  const blogStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'Blog de Inmigración - Mardini Law Firm',
    description: 'Artículos informativos sobre procesos migratorios en Estados Unidos',
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/blog`,
    author: {
      '@type': 'Organization',
      name: 'Mardini Law Firm',
    },
    blogPost: posts.map((post) => ({
      '@type': 'BlogPosting',
      headline: post.title,
      description: post.excerpt,
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/blog/${post.slug}`,
      datePublished: post.publishedAt,
      author: {
        '@type': 'Person',
        name: post.author,
      },
      publisher: {
        '@type': 'Organization',
        name: 'Mardini Law Firm',
      },
    })),
  }

  return (
    <>
      <SEO
        title="Blog de Inmigración - Mardini Law Firm"
        description="Artículos informativos sobre procesos migratorios, visas, residencia permanente y ciudadanía en Estados Unidos. Guías paso a paso y consejos de expertos."
        keywords="blog inmigración, guías inmigración, procesos migratorios, visas, residencia permanente, ciudadanía americana"
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogStructuredData) }}
      />

      <Layout>
        <div className="min-h-screen bg-gray-50">
          <section className="bg-gradient-to-r from-usa-blue to-usa-red text-white py-20">
            <div className="container mx-auto px-4 text-center">
              <motion.h1
                className="text-4xl md:text-5xl font-bold mb-6"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                Blog de Inmigración
              </motion.h1>
              <motion.p
                className="text-xl max-w-3xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                Información clara y actualizada sobre procesos migratorios en Estados Unidos
              </motion.p>
            </div>
          </section>

          <section className="py-8 bg-white border-b">
            <div className="container mx-auto px-4">
              <div className="flex flex-wrap gap-3 justify-center">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      selectedCategory === category
                        ? 'bg-usa-blue text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </section>

          <section className="py-16">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredPosts.map((post, index) => (
                  <motion.article
                    key={post.id}
                    className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <div className="p-6">
                      <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                        <span className="bg-usa-blue/10 text-usa-blue px-2 py-1 rounded">
                          {post.category}
                        </span>
                        <span>{post.readTime}</span>
                      </div>
                      <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                        <Link href={`/blog/${post.slug}`} className="hover:text-usa-blue">
                          {post.title}
                        </Link>
                      </h2>
                      <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <span>{post.author}</span>
                        <span>{formatDate(post.publishedAt)}</span>
                      </div>
                    </div>
                  </motion.article>
                ))}
              </div>
            </div>
          </section>
        </div>
      </Layout>
    </>
  )
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const cms = await fetchCMSData(locale ?? 'es')
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'es', ['common'])),
      cms,
    },
    revalidate: 60,
  }
}
