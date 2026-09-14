import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { useTranslation } from 'next-i18next'
import { useCMS } from '@/context/CMSContext'

/** Proporción nativa de la foto de portada (7680×4320). */
const HERO_WIDTH = 7680
const HERO_HEIGHT = 4320

/** Lockup de marca + eslogan (PNG transparente). */
const LOCKUP_WIDTH = 2200
const LOCKUP_HEIGHT = 839

const Hero: React.FC = () => {
  const { t } = useTranslation('common')
  const { homeHero } = useCMS()
  const bgSrc = homeHero.backgroundImageUrl || '/images/hero/miami-skyline.jpg'

  const brandLabel = [
    homeHero.brandLine1,
    homeHero.brandLine2,
    homeHero.tagline,
    [homeHero.slogan, homeHero.sloganHighlight].filter(Boolean).join(' '),
  ]
    .filter(Boolean)
    .join(' — ')

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

      {/* Contraste mínimo: cielo claro arriba (navy del lockup) y base suave para el eslogan blanco */}
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/15 via-transparent to-black/40"
        aria-hidden="true"
      />

      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center px-4 pt-24 sm:pt-28 md:pt-20 pb-10 sm:pb-14">
        <h1 className="sr-only">{brandLabel || 'Mardini Law Firm'}</h1>

        <motion.div
          className="relative flex w-full max-w-[min(92vw,42rem)] md:max-w-[min(70vw,40rem)] lg:max-w-[44rem] flex-col items-center"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85 }}
        >
          {/* Halo local detrás del lockup: hace legible el navy sobre el cielo y el blanco del eslogan */}
          <div
            className="pointer-events-none absolute left-1/2 top-1/2 h-[118%] w-[108%] -translate-x-1/2 -translate-y-[48%] rounded-[40%] bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.28)_0%,rgba(255,255,255,0.08)_42%,rgba(0,0,0,0.22)_72%,transparent_100%)]"
            aria-hidden="true"
          />

          <Image
            src="/images/Logos/mardini-hero-lockup.png"
            alt={brandLabel || 'Mardini Law Firm — Su futuro, nuestra prioridad'}
            width={LOCKUP_WIDTH}
            height={LOCKUP_HEIGHT}
            priority
            quality={100}
            sizes="(max-width: 768px) 92vw, (max-width: 1280px) 70vw, 704px"
            className="relative z-[1] h-auto w-full drop-shadow-[0_2px_3px_rgba(0,0,0,0.35)] drop-shadow-[0_10px_28px_rgba(0,0,0,0.28)]"
          />
        </motion.div>

        <motion.div
          className="mt-7 sm:mt-9 md:mt-11 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
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
            className="inline-flex items-center gap-3 bg-white/15 backdrop-blur-sm border-2 border-white text-white hover:bg-white/25 px-6 sm:px-7 py-3 sm:py-3.5 rounded-md text-sm md:text-base font-semibold tracking-wide shadow-md transition-colors"
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
