import React from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from 'next-i18next'
import { useCMS } from '@/context/CMSContext'

/** Master 3840×2160 (16:9). Variantes generadas con scripts/build-hero-variants.mjs. */
const HERO_WIDTH = 3840
const HERO_HEIGHT = 2160
const HERO_BASE = '/images/hero/miami-skyline-atardecer'
const HERO_SRC = `${HERO_BASE}-1920.jpg`
const HERO_SRCSET = [1280, 1920, 2560, 3840].map((w) => `${HERO_BASE}-${w}.jpg ${w}w`).join(', ')

const Hero: React.FC = () => {
  const { t } = useTranslation('common')
  const { homeHero } = useCMS()

  const brandLabel = [
    homeHero.brandLine1 || 'MARDINI',
    homeHero.brandLine2 || 'LAW FIRM',
    homeHero.tagline || 'Immigration Attorneys',
  ].join(' — ')

  return (
    <section
      id="inicio"
      className="relative w-full min-h-[85svh] bg-sky-300 md:min-h-0"
    >
      {/* Móvil: cover a viewport; "100vh" limita a ~2x en pantallas 3x para no bajar el 3840. Desktop: proporción nativa en flujo. */}
      <img
        src={HERO_SRC}
        srcSet={HERO_SRCSET}
        sizes="(min-width: 768px) 100vw, 100vh"
        alt="Skyline de Miami — Mardini Law Firm"
        width={HERO_WIDTH}
        height={HERO_HEIGHT}
        fetchPriority="high"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover object-center md:static md:h-auto"
      />

      {/* Velo suave solo abajo para legibilidad de CTAs (sin saturar la foto). */}
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/45"
        aria-hidden="true"
      />

      <div className="absolute inset-0 z-10 flex flex-col justify-end px-4 pb-10 pt-20 sm:pb-12 md:pb-[14%]">
        <h1 className="sr-only">{brandLabel}</h1>

        <motion.div
          className="flex w-full flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65 }}
        >
          <a
            href={homeHero.ctaPrimaryHref || '#contacto'}
            className="inline-flex w-full max-w-sm items-center justify-center gap-3 rounded-md bg-brand-navy px-6 py-3 text-sm font-semibold tracking-wide text-white shadow-lg transition-colors hover:bg-brand-navy-light sm:w-auto sm:px-7 sm:py-3.5 md:text-base"
          >
            <svg
              className="h-5 w-5 flex-shrink-0"
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
            className="inline-flex w-full max-w-sm items-center justify-center gap-3 rounded-md border-2 border-white bg-transparent px-6 py-3 text-sm font-semibold tracking-wide text-white shadow-md transition-colors hover:bg-white/15 sm:w-auto sm:px-7 sm:py-3.5 md:text-base"
          >
            <svg
              className="h-5 w-5 flex-shrink-0"
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
