import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'next-i18next';

const slogans = [
  "Defensa sólida en cada etapa.",
  "Su futuro, nuestra prioridad.",
  "En inmigración, cada día cuenta.",
  "Confianza y respaldo legal para su caso."
];

const Hero: React.FC = () => {
  const [currentSlogan, setCurrentSlogan] = useState(0);
  const { t } = useTranslation('common');
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const timer = setInterval(() => {
      setCurrentSlogan((prev) => (prev + 1) % slogans.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const content = (
    <>
      {/* Logo sobre la imagen fija de Miami (pedido cliente V2) */}
      <motion.div
        className="mb-8"
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <div className="inline-block bg-white/95 rounded-lg px-6 py-4 shadow-xl">
          <Image
            src="/images/Logos/mardini-logo.jpeg"
            alt="Mardini Law Firm"
            width={320}
            height={110}
            className="h-16 md:h-20 w-auto object-contain"
            priority
          />
        </div>
      </motion.div>

      <div className="text-center max-w-4xl mx-auto mb-6">
        <AnimatePresence mode="wait">
          <motion.h1
            key={currentSlogan}
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.8 }}
          >
            {slogans[currentSlogan]}
          </motion.h1>
        </AnimatePresence>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35 }}
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
        transition={{ duration: 0.6, delay: 0.55 }}
      >
        <motion.a
          href="#contacto"
          className="btn btn-primary text-lg px-10 py-5 bg-usa-blue hover:bg-usa-blue-dark text-white font-bold rounded-md transition duration-300 ease-in-out shadow-lg"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
        >
          {t('hero.cta.start')}
        </motion.a>
        <motion.a
          href="#servicios"
          className="btn btn-outline text-white border-2 border-white text-lg px-10 py-5 font-bold rounded-md hover:bg-white/20 transition duration-300 ease-in-out"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
        >
          {t('hero.cta.services')}
        </motion.a>
      </motion.div>
    </>
  );

  if (!isClient) {
    return (
      <section id="inicio" className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/hero/miami-night.jpg"
            alt="Miami de noche — Mardini Law Firm"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/60" />
        </div>
        <div className="relative z-10 flex flex-col items-center justify-center text-white px-4">
          {content}
        </div>
      </section>
    );
  }

  return (
    <section id="inicio" className="relative h-screen w-full overflow-hidden">
      {/* Imagen sola y fija de Miami de noche */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero/miami-night.jpg"
          alt="Miami de noche — Mardini Law Firm, abogados de inmigración"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/65" />
      </div>

      <div className="relative z-10 h-full flex flex-col items-center justify-center text-white px-4">
        {content}
      </div>
    </section>
  );
};

export default Hero;
