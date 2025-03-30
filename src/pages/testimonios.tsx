import React from 'react';
import Layout from '../components/layout/Layout';
import { motion } from 'framer-motion';
import { useTestimonials } from '../hooks/useStrapi';

const TestimoniosPage = () => {
  const { data: testimonials, loading: testimonialsLoading } = useTestimonials();

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative bg-usa-blue text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Historias de Éxito
            </h1>
            <p className="text-xl mb-8">
              Conoce las experiencias de quienes ya han cumplido su sueño americano
              con nuestra ayuda.
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {!testimonialsLoading &&
              testimonials?.map((testimonial: any) => (
                <motion.div
                  key={testimonial.id}
                  variants={item}
                  className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
                >
                  {/* Comillas decorativas */}
                  <div className="text-4xl text-usa-blue opacity-25 mb-4">
                    "
                  </div>
                  
                  {/* Texto del testimonio */}
                  <p className="text-gray-600 mb-6">
                    {testimonial.attributes.testimonialText}
                  </p>
                  
                  {/* Información del cliente */}
                  <div className="flex items-center">
                    {testimonial.attributes.clientImage?.data?.attributes?.url && (
                      <img
                        src={testimonial.attributes.clientImage.data.attributes.url}
                        alt={testimonial.attributes.clientName}
                        className="w-12 h-12 rounded-full object-cover mr-4"
                      />
                    )}
                    <div>
                      <p className="font-semibold text-gray-900">
                        {testimonial.attributes.clientName}
                      </p>
                      <p className="text-sm text-gray-500">
                        {testimonial.attributes.location}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-100 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">
            ¿Listo para escribir tu propia historia de éxito?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Únete a nuestra lista de clientes satisfechos y comienza tu camino hacia el sueño americano.
          </p>
          <a
            href="/contacto"
            className="inline-block bg-usa-blue text-white px-8 py-3 rounded-lg font-semibold hover:bg-usa-blue-dark transition-colors duration-200"
          >
            Comienza tu proceso
          </a>
        </div>
      </section>
    </Layout>
  );
};

export default TestimoniosPage; 