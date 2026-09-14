import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { useTranslation } from 'next-i18next'
import { useCMS } from '@/context/CMSContext'

/** Proporción nativa de la foto de portada (7680×4320). */
const HERO_WIDTH = 7680
const HERO_HEIGHT = 4320

const Hero: React.FC = () => {
  const { t } = useTranslation('common')
  const { homeHero } = useCMS()
  const src = homeHero.backgroundImageUrl || '/images/hero/miami-skyline.jpg'

  return (
    <section id="inicio" className="relative w-full bg-sky-300">
      {/* h-auto + proporción nativa: se muestra el 100% de la foto, sin object-cover */}
      <Image
        src={src}
        alt="Skyline de Miami — Mardini Law Firm"
        width={HERO_WIDTH}
        height={HERO_HEIGHT}
        className="block w-full h-auto"
        priority
        quality={100}
        sizes="100vw"
      />

      {/* Contraste suave solo para el texto; sin veladura blanca que opaca la imagen */}
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/25 via-transparent to-black/35"
        aria-hidden="true"
      />

      <div className="absolute inset-0 z-10 flex flex-col items-center justify-start px-4 pt-24 sm:pt-28 md:pt-14 lg:pt-16 pb-8 text-center">
        <motion.div
          className="flex flex-col items-center scale-[0.92] sm:scale-100 origin-top"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="font-serif text-white text-4xl sm:text-5xl md:text-7xl lg:text-8xl tracking-[0.18em] font-semibold drop-shadow-[0_2px_12px_rgba(0,0,0,0.55)]">
            {homeHero.brandLine1}
          </h1>

          <div className="mt-2 md:mt-3 flex items-center gap-3 w-full max-w-xs sm:max-w-sm md:max-w-md">
            <span className="flex-1 h-px bg-white/80" />
            <span className="font-serif text-white/95 text-base sm:text-xl md:text-2xl tracking-[0.25em] whitespace-nowrap drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]">
              {homeHero.brandLine2}
            </span>
            <span className="flex-1 h-px bg-white/80" />
          </div>

          <p className="mt-3 md:mt-4 font-sans text-white text-[0.65rem] sm:text-xs md:text-sm tracking-[0.35em] uppercase font-medium drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]">
            {homeHero.tagline}
          </p>

          <div className="mt-4 md:mt-5 flex items-center justify-center w-full max-w-xs sm:max-w-sm">
            <span className="flex-1 h-px bg-white/80" />
            <span className="mx-2 text-white text-sm leading-none drop-shadow" aria-hidden="true">
              ◆
            </span>
            <span className="flex-1 h-px bg-white/80" />
          </div>

          <p className="mt-5 md:mt-6 font-sans text-white text-sm sm:text-lg md:text-xl lg:text-2xl tracking-[0.2em] uppercase drop-shadow-[0_2px_10px_rgba(0,0,0,0.55)]">
            {homeHero.slogan}{' '}
            <span className="font-bold">{homeHero.sloganHighlight}</span>
          </p>
        </motion.div>

        <motion.div
          className="mt-6 sm:mt-10 md:mt-16 lg:mt-20 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25 }}
        >
          <a
            href={homeHero.ctaPrimaryHref || '#contacto'}
            className="inline-flex items-center gap-3 bg-brand-navy hover:bg-brand-navy-light text-white px-6 sm:px-7 py-3 sm:py-3.5 rounded-md text-sm md:text-base font-semibold tracking-wide shadow-lg transition-colors"
          >
            <svg
              className="w-5 h-5 flex-shrink-0"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                d="M12 2l1.2 3.5H20l-2.8 2.2.9 3.3L12 9.2 5.9 11l.9-3.3L4 5.5h6.8L12 2z"
                opacity=".15"
              />
              <path
                d="M12 3v14M7 21h10M12 17l-6-9h12l-6 9zM6 8h12"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle
                cx="6"
                cy="8"
                r="2.2"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <circle
                cx="18"
                cy="8"
                r="2.2"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              />
            </svg>
            <span>{homeHero.ctaPrimaryLabel || t('hero.cta.start')} ›</span>
          </a>

          <a
            href={homeHero.ctaSecondaryHref || '#servicios'}
            className="inline-flex items-center gap-3 bg-white/15 backdrop-blur-sm border-2 border-white text-white hover:bg-white/25 px-6 sm:px-7 py-3 sm:py-3.5 rounded-md text-sm md:text-base font-semibold tracking-wide transition-colors"
          >
            <svg
              className="w-5 h-5 flex-shrink-0"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M7 3h7l4 4v14H7V3z" />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14 3v5h5M9 12h6M9 16h6"
              />
            </svg>
            <span>{homeHero.ctaSecondaryLabel || t('hero.cta.services')} ›</span>
          </a>
        </motion.div>
      </div>
    </section>
  )
}

export default Hero
