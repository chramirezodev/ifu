import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'next-i18next';

interface Slide {
  id: number;
  slogan: string;
  image: string;
}

const slides: Slide[] = [
  {
    id: 1,
    slogan: "Defensa sólida en cada etapa.",
    image: "/images/hero/slide1.jpg"
  },
  {
    id: 2,
    slogan: "Su futuro, nuestra prioridad.",
    image: "/images/hero/slide2.jpg"
  },
  {
    id: 3,
    slogan: "En inmigración, cada día cuenta.",
    image: "/images/hero/slide3.jpg"
  },
  {
    id: 4,
    slogan: "Confianza y respaldo legal para su caso.",
    image: "/images/hero/slide4.jpg"
  }
];

const Hero: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { t } = useTranslation('common');
  const [isClient, setIsClient] = useState(false);
  const [parallaxOffset, setParallaxOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setIsClient(true);
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const x = (window.innerWidth / 2 - clientX) / 50;
      const y = (window.innerHeight / 2 - clientY) / 50;
      setParallaxOffset({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      clearInterval(timer);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  if (!isClient) {
    return (
      <section id="inicio" className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/hero/slide1.jpg"
            alt="Mardini Law Firm"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            Defensa sólida en cada etapa.
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-4xl mx-auto">
            Sabemos que un proceso migratorio puede cambiar su futuro y el de su familia. Por eso, cada decisión importa.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#contacto"
              className="bg-usa-blue hover:bg-usa-blue-dark text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors duration-300"
            >
              HABLA CON UN ABOGADO
            </a>
            <a
              href="#servicios"
              className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-gray-900 px-8 py-4 rounded-lg text-lg font-semibold transition-colors duration-300"
            >
              NUESTROS SERVICIOS
            </a>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="inicio" className="relative h-screen w-full overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 1.2 }}
          className="absolute inset-0"
          style={{
            transform: `translate(${parallaxOffset.x}px, ${parallaxOffset.y}px)`,
          }}
        >
          <Image
            src={slides[currentSlide].image}
            alt={`${slides[currentSlide].slogan} - Mardini Law Firm, abogados de inmigración`}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/35 to-black/55" />
        </motion.div>
      </AnimatePresence>

      <div className="relative z-10 h-full flex flex-col items-center justify-center text-white px-4">
        <div className="text-center max-w-4xl mx-auto mb-6">
          <AnimatePresence mode="wait">
            <motion.h1 
              key={currentSlide}
              className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.8 }}
            >
              {slides[currentSlide].slogan}
            </motion.h1>
          </AnimatePresence>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mb-8"
          >
            <p className="text-lg md:text-xl lg:text-2xl text-shadow-md font-light leading-relaxed">
              Sabemos que un proceso migratorio puede cambiar su futuro y el de su familia. Por eso, cada decisión importa. En Mardini Law Firm ofrecemos atención personalizada, comunicación clara y el respaldo legal que usted necesita durante todo su proceso.
            </p>
          </motion.div>
        </div>

        <motion.div 
          className="flex flex-col sm:flex-row gap-5 mt-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          <motion.a
            href="#contacto"
            className="btn btn-primary text-lg px-10 py-5 bg-usa-blue hover:bg-usa-blue-dark text-white font-bold rounded-md transition duration-300 ease-in-out shadow-lg"
            whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
            whileTap={{ scale: 0.98 }}
          >
            {t('hero.cta.start')}
          </motion.a>
          <motion.a
            href="#servicios"
            className="btn btn-outline text-white border-2 border-white text-lg px-10 py-5 font-bold rounded-md hover:bg-white/20 transition duration-300 ease-in-out"
            whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
            whileTap={{ scale: 0.98 }}
          >
            {t('hero.cta.services')}
          </motion.a>
        </motion.div>

        <div className="absolute bottom-10 left-0 right-0 flex justify-center gap-3">
          {slides.map((slide, index) => (
            <motion.button
              key={slide.id}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-500 ${
                currentSlide === index 
                  ? 'bg-white w-10 scale-100' 
                  : 'bg-white/40 hover:bg-white/60'
              }`}
              whileHover={{ scale: 1.2 }}
              aria-label={`Ir a slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
