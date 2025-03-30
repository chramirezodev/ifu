import React from 'react';
import Layout from '../components/layout/Layout';
import ServiceCard from '../components/ServiceCard';
import { useServices, useExpandableTexts } from '../hooks/useStrapi';

const ServiciosPage = () => {
  const { data: services, loading: servicesLoading } = useServices();
  const { data: expandableTexts, loading: textsLoading } = useExpandableTexts('services');

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative bg-usa-blue text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Nuestros Servicios Migratorios
            </h1>
            <p className="text-xl mb-8">
              Ofrecemos soluciones integrales para todos tus trámites migratorios en Estados Unidos.
              Conoce nuestros servicios y encuentra la opción que mejor se adapte a tus necesidades.
            </p>
          </div>
        </div>
      </section>

      {/* Servicios Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {!servicesLoading &&
              services?.map((service: any) => (
                <ServiceCard
                  key={service.id}
                  title={service.attributes.title}
                  description={service.attributes.description || service.attributes.shortDescription}
                  icon={service.attributes.icon?.data?.attributes?.url}
                  expandableText={
                    expandableTexts?.find(
                      (text: any) => text.attributes.identifier === service.attributes.identifier
                    )?.attributes
                  }
                />
              ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-100 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">
            ¿Necesitas ayuda para elegir el servicio adecuado?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Nuestro equipo está listo para asesorarte y encontrar la mejor solución para tu caso.
          </p>
          <a
            href="/contacto"
            className="inline-block bg-usa-blue text-white px-8 py-3 rounded-lg font-semibold hover:bg-usa-blue-dark transition-colors duration-200"
          >
            Agenda una consulta
          </a>
        </div>
      </section>
    </Layout>
  );
};

export default ServiciosPage; 