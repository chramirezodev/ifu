import React from 'react'
import { GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Layout from '../components/layout/Layout'
import ServiceCard from '../components/ServiceCard'
import { useCMS } from '@/context/CMSContext'
import { fetchCMSData } from '@/lib/cms/fetchCMS'

const ServiciosPage = () => {
  const { services, servicesPage } = useCMS()

  return (
    <Layout>
      <section className="relative bg-usa-blue text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">{servicesPage.heroTitle}</h1>
            <p className="text-xl mb-8">{servicesPage.heroSubtitle}</p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <ServiceCard
                key={service.id}
                title={service.title}
                description={service.description}
                expandableText={{
                  title: service.title,
                  expandedText: service.expandedDescription || '',
                }}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gray-100 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">
            ¿Necesitas ayuda para elegir el servicio adecuado?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Nuestro equipo está listo para asesorarte y encontrar la mejor solución para tu caso.
          </p>
          <a
            href={servicesPage.ctaHref || '/contacto'}
            className="inline-block bg-usa-blue text-white px-8 py-3 rounded-lg font-semibold hover:bg-usa-blue-dark transition-colors duration-200"
          >
            {servicesPage.ctaLabel || 'Agenda una consulta'}
          </a>
        </div>
      </section>
    </Layout>
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

export default ServiciosPage
