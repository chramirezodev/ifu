"use client";

import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Services from '@/components/sections/Services';
import WhyChooseUs from '@/components/sections/WhyChooseUs';
import Testimonials from '@/components/sections/Testimonials';
import Contact from '@/components/sections/Contact';
import News from '@/components/sections/News';

// Datos para el componente About
const siteData = {
  about: {
    title: "Sobre Nosotros",
    content: "Somos una empresa especializada en la preparación de documentos migratorios, con más de 5 años de experiencia brindando servicios de calidad. Entendemos la complejidad del sistema migratorio de Estados Unidos y estamos aquí para ayudarte en cada paso del proceso.",
    values: [
      {
        title: "Misión",
        description: "Facilitar el proceso migratorio de nuestros clientes a través de un servicio profesional y personalizado."
      },
      {
        title: "Visión",
        description: "Ser reconocidos como líderes en la preparación de documentos migratorios, brindando un servicio de excelencia."
      }
    ]
  }
};

export default function Home() {
  return (
    <main>
      <Hero />
      <About {...siteData.about} />
      <Services />
      <WhyChooseUs />
      <News />
      <Testimonials />
      <Contact />
    </main>
  );
} 