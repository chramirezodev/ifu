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
  const bgSrc = homeHero.backgroundImageUrl || '/images/hero/miami-skyline.jpg'

  const brand1 = homeHero.brandLine1 || 'MARDINI'
  const brand2 = homeHero.brandLine2 || 'LAW FIRM'
  const tagline = homeHero.tagline || 'Immigration Attorneys'
  const slogan =
    [homeHero.slogan, homeHero.sloganHighlight].filter(Boolean).join(' ') ||
    'Su futuro, nuestra prioridad'

  return (
    <section id="inicio" className="relative w-full bg-sky-300">
      <Image
        src={bgSrc}
        alt="Skyline de Miami — Mardini Law Firm"
        width={HERO_WIDTH}
        height={HERO_HEIGHT}
        className="block w-full h-auto"
        priority
        quality={100}
        sizes="100vw"
      />

      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/20 via-transparent to-brand-navy/50"
        aria-hidden="true"
      />

      {/* Tipografía real (sin PNG): nítida en cualquier pantalla. Anclada al cielo. */}
      <div className="absolute inset-0 z-10 flex flex-col items-center px-4 pt-28 sm:pt-32 md:pt-28 lg:pt-32 pb-8">
        <motion.div
          className="relative w-full max-w-[36rem] sm:max-w-[40rem] md:max-w-[46rem] text-center"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Halo atmosférico (no es tarjeta): separa el lockup del skyline sin caja */}
          <div
            className="pointer-events-none absolute left-1/2 top-[42%] h-[130%] w-[120%] -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.72)_0%,rgba(255,255,255,0.42)_38%,rgba(13,27,61,0.45)_68%,transparent_82%)]"
            aria-hidden="true"
          />

          <div className="relative z-[1]">
            <h1 className="font-serif text-brand-navy text-[2.5rem] leading-none sm:text-5xl md:text-6xl lg:text-[4.35rem] tracking-[0.16em] font-semibold [text-shadow:0_1px_0_rgba(255,255,255,0.9),0_2px_18px_rgba(255,255,255,0.55)]">
              {brand1}
            </h1>

            <div className="mt-3 md:mt-4 flex items-center gap-3 w-full max-w-md mx-auto">
              <span className="flex-1 h-px bg-brand-navy/60" />
              <span className="font-serif text-[#6B7280] text-sm sm:text-lg md:text-xl tracking-[0.28em] whitespace-nowrap [text-shadow:0_1px_0_rgba(255,255,255,0.85)]">
                {brand2}
              </span>
              <span className="flex-1 h-px bg-brand-navy/60" />
            </div>

            <p className="mt-3 md:mt-4 font-sans text-brand-navy text-[0.68rem] sm:text-xs md:text-sm tracking-[0.38em] uppercase font-semibold [text-shadow:0_1px_0_rgba(255,255,255,0.85)]">
              {tagline}
            </p>

            <div className="mt-4 md:mt-5 flex items-center justify-center w-full max-w-sm mx-auto">
              <span className="flex-1 h-px bg-brand-navy/50" />
              <span className="mx-2 text-brand-navy text-sm leading-none" aria-hidden="true">
                ◆
              </span>
              <span className="flex-1 h-px bg-brand-navy/50" />
            </div>

            <p className="mt-4 md:mt-5 font-sans text-white text-sm sm:text-base md:text-xl tracking-[0.22em] uppercase font-bold [text-shadow:0_2px_8px_rgba(0,0,0,0.65),0_0_2px_rgba(0,0,0,0.8)]">
              {slogan}
            </p>
          </div>
        </motion.div>

        <motion.div
          className="relative z-[1] mt-7 sm:mt-9 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.18 }}
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
              <circle cx="6" cy="8" r="2.2" fill="none" stroke="currentColor" strokeWidth="1.5" />
              <circle cx="18" cy="8" r="2.2" fill="none" stroke="currentColor" strokeWidth="1.5" />
            </svg>
            <span>{homeHero.ctaPrimaryLabel || t('hero.cta.start')} ›</span>
          </a>

          <a
            href={homeHero.ctaSecondaryHref || '#servicios'}
            className="inline-flex items-center gap-3 bg-white text-brand-navy hover:bg-white/90 border-2 border-white px-6 sm:px-7 py-3 sm:py-3.5 rounded-md text-sm md:text-base font-semibold tracking-wide shadow-lg transition-colors"
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
