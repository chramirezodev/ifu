import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useTranslation } from 'next-i18next';

const Hero: React.FC = () => {
  const { t } = useTranslation('common');

  return (
    <section id="inicio" className="relative min-h-screen w-full overflow-hidden flex items-start justify-center">
      {/* Banner fijo: skyline Miami del cliente */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero/miami-skyline.jpg"
          alt="Skyline de Miami — Mardini Law Firm"
          fill
          className="object-cover object-center"
          priority
          sizes="100vw"
        />
        {/* Veladura suave para legibilidad del logo navy sobre el cielo */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-white/10 to-brand-navy/35" />
      </div>

      {/* Contenido más arriba para que el slogan quede sobre el cielo claro */}
      <div className="relative z-10 w-full px-4 pt-10 md:pt-14 lg:pt-16 pb-24 flex flex-col items-center text-center">
        <motion.div
          className="flex flex-col items-center"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="font-serif text-brand-navy text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-[0.18em] font-semibold drop-shadow-sm">
            MARDINI
          </h1>

          <div className="mt-2 md:mt-3 flex items-center gap-3 w-full max-w-xs sm:max-w-sm md:max-w-md">
            <span className="flex-1 h-px bg-brand-silver" />
            <span className="font-serif text-brand-silver text-lg sm:text-xl md:text-2xl tracking-[0.25em] whitespace-nowrap">
              LAW FIRM
            </span>
            <span className="flex-1 h-px bg-brand-silver" />
          </div>

          <p className="mt-3 md:mt-4 font-sans text-brand-navy text-[0.7rem] sm:text-xs md:text-sm tracking-[0.35em] uppercase font-medium">
            Immigration Attorneys
          </p>

          <div className="mt-4 md:mt-5 flex items-center justify-center w-full max-w-xs sm:max-w-sm">
            <span className="flex-1 h-px bg-brand-navy/80" />
            <span className="mx-2 text-brand-navy text-sm leading-none" aria-hidden="true">
              ◆
            </span>
            <span className="flex-1 h-px bg-brand-navy/80" />
          </div>

          <p className="mt-5 md:mt-6 font-sans text-brand-navy text-base sm:text-lg md:text-xl lg:text-2xl tracking-[0.2em] uppercase drop-shadow-sm">
            Su futuro, <span className="font-bold">nuestra prioridad</span>
          </p>
        </motion.div>

        <motion.div
          className="mt-12 md:mt-16 lg:mt-20 flex flex-col sm:flex-row items-center justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25 }}
        >
          <a
            href="#contacto"
            className="inline-flex items-center gap-3 bg-brand-navy hover:bg-brand-navy-light text-white px-7 py-3.5 rounded-md text-sm md:text-base font-semibold tracking-wide shadow-lg transition-colors"
          >
            <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 2l1.2 3.5H20l-2.8 2.2.9 3.3L12 9.2 5.9 11l.9-3.3L4 5.5h6.8L12 2z" opacity=".15" />
              <path d="M12 3v14M7 21h10M12 17l-6-9h12l-6 9zM6 8h12" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="6" cy="8" r="2.2" fill="none" stroke="currentColor" strokeWidth="1.5" />
              <circle cx="18" cy="8" r="2.2" fill="none" stroke="currentColor" strokeWidth="1.5" />
            </svg>
            <span>{t('hero.cta.start')} ›</span>
          </a>

          <a
            href="#servicios"
            className="inline-flex items-center gap-3 bg-transparent border-2 border-white text-white hover:bg-white/15 px-7 py-3.5 rounded-md text-sm md:text-base font-semibold tracking-wide transition-colors"
          >
            <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M7 3h7l4 4v14H7V3z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M14 3v5h5M9 12h6M9 16h6" />
            </svg>
            <span>{t('hero.cta.services')} ›</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
