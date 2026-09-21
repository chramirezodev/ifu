import React from 'react'
import Image from 'next/image'
import { useCMS } from '@/context/CMSContext'

const Welcome = () => {
  const { homeWelcome } = useCMS()

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 text-center max-w-6xl">
        <p className="text-brand-silver uppercase tracking-[0.2em] text-sm font-semibold mb-3">
          {homeWelcome.eyebrow}
        </p>
        <h2 className="text-4xl font-serif font-bold mb-6 text-brand-navy">{homeWelcome.name}</h2>
        {homeWelcome.photoUrl ? (
          <div className="mb-8 relative mx-auto h-52 w-52 sm:h-60 sm:w-60 overflow-hidden rounded-full shadow-md ring-4 ring-brand-navy/10">
            <Image
              src={homeWelcome.photoUrl}
              alt={homeWelcome.name}
              fill
              sizes="240px"
              className="object-cover object-top"
              priority
            />
          </div>
        ) : null}
        {homeWelcome.paragraphs.map((paragraph, index) => (
          <p
            key={index}
            className={`text-lg text-gray-700 text-justify ${
              index < homeWelcome.paragraphs.length - 1 ? 'mb-4' : ''
            }`}
          >
            {paragraph}
          </p>
        ))}
      </div>
    </section>
  )
}

export default Welcome
