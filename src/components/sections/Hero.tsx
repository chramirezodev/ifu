import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'next-i18next';

interface Slide {
  id: number;
  slogan: string;
  subSlogan: string;
  image: string;
}

const slides: Slide[] = [
  {
    id: 1,
    slogan: "Tu sueño, nuestra misión.",
    subSlogan: "Unidos por tus sueños, comprometidos con tu futuro.",
    image: "/images/hero/slide1.jpg"
  },
  {
    id: 2,
    slogan: "Transformamos trámites en oportunidades.",
    subSlogan: "Porque tu historia merece un nuevo comienzo.",
    image: "/images/hero/slide2.jpg"
  },
  {
    id: 3,
    slogan: "Legaliza tu futuro con confianza.",
    subSlogan: "Sabemos que el proceso migratorio puede ser abrumador. Pero no estás solo.",
    image: "/images/hero/slide3.jpg"
  },
  {
    id: 4,
    slogan: "En Immigration For US,",
    subSlogan: "te acompañamos en cada paso para que tu camino hacia una nueva vida en Estados Unidos sea más sencillo y seguro.",
    image: "/images/hero/slide4.jpg"
  }
];

const Hero: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { t } = useTranslation('common');
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <section id="inicio" className="relative h-screen w-full overflow-hidden">
      {/* Carrusel de imágenes */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0"
        >
          <Image
            src={slides[currentSlide].image}
            alt={slides[currentSlide].slogan}
            fill
            className="object-cover"
            priority={true}
          />
          {/* Overlay oscuro */}
          <div className="absolute inset-0 bg-black/50" />
        </motion.div>
      </AnimatePresence>

      {/* Contenido */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-white px-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-4 text-shadow">
              {slides[currentSlide].slogan}
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-shadow">
              {slides[currentSlide].subSlogan}
            </p>
          </motion.div>
        </AnimatePresence>

        {/* Botones fijos */}
        <div className="flex flex-col sm:flex-row gap-4 mt-8">
          <motion.a
            href="#contacto"
            className="btn btn-primary text-lg px-8 py-4 bg-usa-blue hover:bg-usa-blue-dark text-white font-bold rounded-md transition duration-300 ease-in-out shadow-button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Comenzar Ahora
          </motion.a>
          <motion.a
            href="#servicios"
            className="btn btn-outline text-white border-2 border-white text-lg px-8 py-4 font-bold rounded-md hover:bg-white/10 transition duration-300 ease-in-out"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Ver Servicios
          </motion.a>
        </div>

        {/* Indicadores del carrusel */}
        <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-2">
          {slides.map((slide, index) => (
            <button
              key={slide.id}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                currentSlide === index ? 'bg-white scale-125' : 'bg-white/50'
              }`}
              aria-label={`Ir a slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero; 