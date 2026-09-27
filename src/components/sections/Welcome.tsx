import React from 'react'
import Image from 'next/image'
import { useCMS } from '@/context/CMSContext'

/** Retrato completo del fundador (no recorte circular). */
const FOUNDER_PHOTO = '/images/roger-mardini.png'
const FOUNDER_W = 941
const FOUNDER_H = 1671

const Welcome = () => {
  const { homeWelcome } = useCMS()
  const photoSrc = FOUNDER_PHOTO

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="grid items-start gap-10 md:grid-cols-[minmax(240px,340px)_1fr] md:gap-12 lg:gap-16">
          <div className="relative mx-auto w-full max-w-[340px] md:mx-0">
            <div className="relative aspect-[941/1671] w-full overflow-hidden rounded-lg bg-gray-100 shadow-sm">
              <Image
                src={photoSrc}
                alt={homeWelcome.name}
                width={FOUNDER_W}
                height={FOUNDER_H}
                sizes="(max-width: 768px) 340px, 340px"
                className="h-full w-full object-cover object-top"
                priority
              />
            </div>
          </div>

          <div className="text-left">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-brand-silver">
              {homeWelcome.eyebrow}
            </p>
            <h2 className="mb-6 font-serif text-4xl font-bold text-brand-navy">
              {homeWelcome.name}
            </h2>
            {homeWelcome.paragraphs.map((paragraph, index) => (
              <p
                key={index}
                className={`text-lg text-justify text-gray-700 ${
                  index < homeWelcome.paragraphs.length - 1 ? 'mb-4' : ''
                }`}
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Welcome
