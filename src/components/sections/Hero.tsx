import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { useTranslation } from 'next-i18next'
import { useCMS } from '@/context/CMSContext'

/** Proporción nativa de la foto de portada (7680×4320). */
const HERO_WIDTH = 7680
const HERO_HEIGHT = 4320

/** Lockup del cliente: logo + ◆ + lema (fondo transparente). */
const LOCKUP_WIDTH = 2000
const LOCKUP_HEIGHT = 808

const Hero: React.FC = () => {
  const { t } = useTranslation('common')
  const { homeHero } = useCMS()
  const bgSrc = homeHero.backgroundImageUrl || '/images/hero/miami-skyline.jpg'

  const brandLabel = [
    homeHero.brandLine1 || 'MARDINI',
    homeHero.brandLine2 || 'LAW FIRM',
    homeHero.tagline || 'Immigration Attorneys',
    [homeHero.slogan, homeHero.sloganHighlight].filter(Boolean).join(' ') ||
      'Su futuro, nuestra prioridad',
  ].join(' — ')

  return (
    <section
      id="inicio"
      className="relative w-full min-h-[85svh] bg-sky-300 md:min-h-0"
    >
      {/* Móvil: cover a viewport (sin distorsión). */}
      <div className="absolute inset-0 md:hidden" aria-hidden="true">
        <Image
          src={bgSrc}
          alt=""
          fill
          priority
          quality={100}
          sizes="100vw"
          className="object-cover object-center"
        />
      </div>

      {/* Desktop: proporción nativa en flujo. */}
      <Image
        src={bgSrc}
        alt="Skyline de Miami — Mardini Law Firm"
        width={HERO_WIDTH}
        height={HERO_HEIGHT}
        className="hidden h-auto w-full md:block"
        priority
        quality={100}
        sizes="100vw"
      />

      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/40"
        aria-hidden="true"
      />

      {/* Lockup arriba | CTAs abajo (flex, sin solapes en móvil) */}
      <div className="absolute inset-0 z-10 flex flex-col justify-between px-4 pt-14 pb-8 sm:pt-16 sm:pb-10 md:pt-[4.25rem] md:pb-[18%]">
        <h1 className="sr-only">{brandLabel}</h1>

        <motion.div
          className="flex w-full justify-center pt-2 sm:pt-4 md:pt-6"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <Image
            src="/images/Logos/mardini-hero-lockup.png"
            alt={brandLabel}
            width={LOCKUP_WIDTH}
            height={LOCKUP_HEIGHT}
            priority
            quality={100}
            sizes="(max-width: 640px) 80vw, (max-width: 1024px) 66vw, 592px"
            className="h-auto w-[min(80vw,28rem)] sm:w-[min(79vw,35rem)] md:w-[min(55vw,37rem)] drop-shadow-[0_1px_2px_rgba(255,255,255,0.35)]"
          />
        </motion.div>

        <motion.div
          className="flex w-full flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.12 }}
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
