import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Layout from '@/components/layout/Layout';
import SEO from '@/components/common/SEO';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useState } from 'react';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  publishedAt: string;
  author: string;
  category: string;
  readTime: string;
  image: string;
  slug: string;
}

// Datos de ejemplo - en producción vendrían de un CMS o API
const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Guía Completa para Obtener la Green Card en 2024',
    excerpt: 'Todo lo que necesitas saber sobre el proceso de residencia permanente en Estados Unidos, incluyendo los pasos, documentos y tiempos de espera.',
    content: '',
    publishedAt: '2024-12-15',
    author: 'Carolina Palisa',
    category: 'Residencia Permanente',
    readTime: '8 min',
    image: '/images/blog/green-card-guide.jpg',
    slug: 'guia-green-card-2024'
  },
  {
    id: '2',
    title: 'Tipos de Visas de Trabajo: H1B, L1, O1 y Más',
    excerpt: 'Descubre los diferentes tipos de visas de trabajo disponibles y cuál es la mejor opción para tu situación profesional.',
    content: '',
    publishedAt: '2024-12-10',
    author: 'Carolina Palisa',
    category: 'Visas de Trabajo',
    readTime: '6 min',
    image: '/images/blog/work-visas.jpg',
    slug: 'tipos-visas-trabajo'
  },
  {
    id: '3',
    title: 'Proceso de Naturalización: De Residente a Ciudadano',
    excerpt: 'Conoce los requisitos y pasos para convertirte en ciudadano estadounidense a través del proceso de naturalización.',
    content: '',
    publishedAt: '2024-12-05',
    author: 'Carolina Palisa',
    category: 'Ciudadanía',
    readTime: '10 min',
    image: '/images/blog/naturalization.jpg',
    slug: 'proceso-naturalizacion'
  },
  {
    id: '4',
    title: 'Asilo Político: Guía Paso a Paso',
    excerpt: 'Información esencial sobre el proceso de asilo político, requisitos y consejos para una solicitud exitosa.',
    content: '',
    publishedAt: '2024-11-28',
    author: 'Carolina Palisa',
    category: 'Asilo',
    readTime: '7 min',
    image: '/images/blog/asylum.jpg',
    slug: 'asilo-politico-guia'
  },
  {
    id: '5',
    title: 'Reunificación Familiar: Patrocinando a tus Seres Queridos',
    excerpt: 'Aprende cómo patrocinar a familiares para que obtengan la residencia permanente en Estados Unidos.',
    content: '',
    publishedAt: '2024-11-20',
    author: 'Carolina Palisa',
    category: 'Reunificación Familiar',
    readTime: '9 min',
    image: '/images/blog/family-reunion.jpg',
    slug: 'reunificacion-familiar'
  },
  {
    id: '6',
    title: 'Errores Comunes en Formularios de Inmigración',
    excerpt: 'Evita estos errores frecuentes que pueden retrasar o rechazar tu solicitud de inmigración.',
    content: '',
    publishedAt: '2024-11-15',
    author: 'Carolina Palisa',
    category: 'Consejos',
    readTime: '5 min',
    image: '/images/blog/common-mistakes.jpg',
    slug: 'errores-comunes-formularios'
  }
];

const categories = [
  'Todos',
  'Residencia Permanente',
  'Visas de Trabajo',
  'Ciudadanía',
  'Asilo',
  'Reunificación Familiar',
  'Consejos'
];

export default function BlogIndex() {
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  
  const filteredPosts = selectedCategory === 'Todos' 
    ? blogPosts 
    : blogPosts.filter(post => post.category === selectedCategory);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Datos estructurados para el blog
  const blogStructuredData = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "Blog de Inmigración - Immigration For US",
    "description": "Artículos informativos sobre procesos migratorios en Estados Unidos",
    "url": `${process.env.NEXT_PUBLIC_SITE_URL}/blog`,
    "author": {
      "@type": "Organization",
      "name": "Immigration For US"
    },
    "blogPost": blogPosts.map(post => ({
      "@type": "BlogPosting",
      "headline": post.title,
      "description": post.excerpt,
      "url": `${process.env.NEXT_PUBLIC_SITE_URL}/blog/${post.slug}`,
      "datePublished": post.publishedAt,
      "author": {
        "@type": "Person",
        "name": post.author
      },
      "publisher": {
        "@type": "Organization",
        "name": "Immigration For US"
      }
    }))
  };

  return (
    <>
      <SEO 
        title="Blog de Inmigración - Immigration For US"
        description="Artículos informativos sobre procesos migratorios, visas, residencia permanente y ciudadanía en Estados Unidos. Guías paso a paso y consejos de expertos."
        keywords="blog inmigración, guías inmigración, procesos migratorios, visas, residencia permanente, ciudadanía americana"
      />
      
      {/* Datos estructurados */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogStructuredData) }}
      />
      
      <Layout>
        <div className="min-h-screen bg-gray-50">
          {/* Hero Section */}
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
                className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                Guías expertas y consejos prácticos para tu proceso migratorio
              </motion.p>
            </div>
          </section>

          {/* Categorías */}
          <section className="py-8 bg-white shadow-sm">
            <div className="container mx-auto px-4">
              <div className="flex flex-wrap justify-center gap-4">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                      selectedCategory === category
                        ? 'bg-usa-blue text-white shadow-lg'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </section>

          {/* Posts Grid */}
          <section className="py-16">
            <div className="container mx-auto px-4 max-w-6xl">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredPosts.map((post, index) => (
                  <motion.article
                    key={post.id}
                    className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <div className="aspect-video bg-gradient-to-br from-usa-blue to-usa-red"></div>
                    <div className="p-6">
                      <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                        <span className="bg-usa-blue/10 text-usa-blue px-2 py-1 rounded-full">
                          {post.category}
                        </span>
                        <span>•</span>
                        <span>{post.readTime}</span>
                      </div>
                      
                      <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                        {post.title}
                      </h2>
                      
                      <p className="text-gray-600 mb-4 line-clamp-3">
                        {post.excerpt}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <div className="text-sm text-gray-500">
                          <p className="font-medium">{post.author}</p>
                          <p>{formatDate(post.publishedAt)}</p>
                        </div>
                        
                        <Link 
                          href={`/blog/${post.slug}`}
                          className="bg-usa-blue text-white px-4 py-2 rounded-lg hover:bg-usa-blue-dark transition-colors duration-300"
                        >
                          Leer más
                        </Link>
                      </div>
                    </div>
                  </motion.article>
                ))}
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-16 bg-usa-blue text-white">
            <div className="container mx-auto px-4 text-center">
              <h2 className="text-3xl font-bold mb-4">
                ¿Necesitas ayuda con tu proceso migratorio?
              </h2>
              <p className="text-xl mb-8 max-w-2xl mx-auto">
                Nuestros expertos están listos para guiarte en cada paso del camino.
              </p>
              <Link 
                href="/contacto"
                className="bg-white text-usa-blue px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors duration-300 inline-block"
              >
                Consulta Gratuita
              </Link>
            </div>
          </section>
        </div>
      </Layout>
    </>
  );
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'es', ['common'])),
    },
  };
};
