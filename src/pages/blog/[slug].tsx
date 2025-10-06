import { GetStaticProps, GetStaticPaths } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Layout from '@/components/layout/Layout';
import SEO from '@/components/common/SEO';
import Link from 'next/link';
import { motion } from 'framer-motion';

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

// Datos de ejemplo - en producción vendrían de un CMS
const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Guía Completa para Obtener la Green Card en 2024',
    excerpt: 'Todo lo que necesitas saber sobre el proceso de residencia permanente en Estados Unidos.',
    content: `
      <h2>¿Qué es una Green Card?</h2>
      <p>La Green Card, oficialmente conocida como Tarjeta de Residente Permanente, es un documento que permite a los extranjeros vivir y trabajar permanentemente en Estados Unidos.</p>
      
      <h2>Tipos de Green Card</h2>
      <p>Existen varias categorías para obtener la residencia permanente:</p>
      <ul>
        <li><strong>Reunión Familiar:</strong> Patrocinio por parte de familiares ciudadanos o residentes permanentes</li>
        <li><strong>Empleo:</strong> Basada en ofertas de trabajo o habilidades especiales</li>
        <li><strong>Inversionista:</strong> EB-5 para inversionistas que crean empleos</li>
        <li><strong>Diversidad:</strong> Programa de lotería de visas de diversidad</li>
        <li><strong>Refugiado/Asilo:</strong> Para personas que huyen de persecución</li>
      </ul>
      
      <h2>Proceso de Solicitud</h2>
      <p>El proceso típico incluye:</p>
      <ol>
        <li>Determinar elegibilidad</li>
        <li>Presentar petición (si es necesario)</li>
        <li>Esperar procesamiento</li>
        <li>Completar formularios adicionales</li>
        <li>Asistir a entrevista</li>
        <li>Recibir decisión</li>
      </ol>
      
      <h2>Documentos Requeridos</h2>
      <p>Los documentos básicos incluyen:</p>
      <ul>
        <li>Formulario I-485 (Aplicación para Registrar Residencia Permanente)</li>
        <li>Certificado de nacimiento</li>
        <li>Pasaporte válido</li>
        <li>Fotos tipo pasaporte</li>
        <li>Exámenes médicos</li>
        <li>Evidencia de apoyo financiero</li>
      </ul>
      
      <h2>Tiempos de Procesamiento</h2>
      <p>Los tiempos varían según la categoría y el país de origen, pero típicamente van de 12 meses a varios años.</p>
      
      <h2>Consejos Importantes</h2>
      <ul>
        <li>Mantén todos los documentos organizados</li>
        <li>Responde a las solicitudes de evidencia adicional rápidamente</li>
        <li>Considera trabajar con un profesional certificado</li>
        <li>Mantén un registro de todas las comunicaciones con USCIS</li>
      </ul>
    `,
    publishedAt: '2024-12-15',
    author: 'Carolina Palisa',
    category: 'Residencia Permanente',
    readTime: '8 min',
    image: '/images/blog/green-card-guide.jpg',
    slug: 'guia-green-card-2024'
  }
];

export default function BlogPost({ post }: { post: BlogPost }) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Datos estructurados para el artículo
  const articleStructuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.excerpt,
    "image": post.image,
    "author": {
      "@type": "Person",
      "name": post.author
    },
    "publisher": {
      "@type": "Organization",
      "name": "Immigration For US",
      "logo": {
        "@type": "ImageObject",
        "url": `${process.env.NEXT_PUBLIC_SITE_URL}/images/Logos/logo.png`
      }
    },
    "datePublished": post.publishedAt,
    "dateModified": post.publishedAt,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `${process.env.NEXT_PUBLIC_SITE_URL}/blog/${post.slug}`
    }
  };

  return (
    <>
      <SEO 
        title={`${post.title} - Blog de Inmigración`}
        description={post.excerpt}
        keywords={`${post.category.toLowerCase()}, green card, residencia permanente, inmigración, ${post.title.toLowerCase()}`}
      />
      
      {/* Datos estructurados */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleStructuredData) }}
      />
      
      <Layout>
        <div className="min-h-screen bg-gray-50">
          {/* Hero Section */}
          <section className="bg-gradient-to-r from-usa-blue to-usa-red text-white py-20">
            <div className="container mx-auto px-4">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <Link 
                  href="/blog"
                  className="inline-flex items-center text-white/80 hover:text-white mb-6 transition-colors duration-300"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Volver al blog
                </Link>
                
                <div className="flex items-center gap-2 text-sm mb-4">
                  <span className="bg-white/20 px-3 py-1 rounded-full">
                    {post.category}
                  </span>
                  <span>•</span>
                  <span>{post.readTime}</span>
                </div>
                
                <h1 className="text-4xl md:text-5xl font-bold mb-6">
                  {post.title}
                </h1>
                
                <div className="flex items-center gap-4 text-lg">
                  <div>
                    <p className="font-medium">{post.author}</p>
                    <p className="text-white/80">{formatDate(post.publishedAt)}</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Content */}
          <section className="py-16">
            <div className="container mx-auto px-4 max-w-4xl">
              <motion.article
                className="bg-white rounded-xl shadow-lg p-8 md:p-12"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <div 
                  className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-li:text-gray-700 prose-strong:text-gray-900"
                  dangerouslySetInnerHTML={{ __html: post.content }}
                />
              </motion.article>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-16 bg-usa-blue text-white">
            <div className="container mx-auto px-4 text-center">
              <h2 className="text-3xl font-bold mb-4">
                ¿Necesitas ayuda con tu proceso de Green Card?
              </h2>
              <p className="text-xl mb-8 max-w-2xl mx-auto">
                Nuestros expertos pueden guiarte a través de cada paso del proceso.
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

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = blogPosts.map((post) => ({
    params: { slug: post.slug },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params, locale }) => {
  const post = blogPosts.find((post) => post.slug === params?.slug);

  if (!post) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      post,
      ...(await serverSideTranslations(locale ?? 'es', ['common'])),
    },
  };
};
