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
        {homeWelcome.photoUrl ? (
          <div className="mt-8 relative mx-auto w-48 h-48 rounded-full overflow-hidden">
            <Image
              src={homeWelcome.photoUrl}
              alt={homeWelcome.name}
              fill
              className="object-cover"
            />
          </div>
        ) : null}
      </div>
    </section>
  )
}

export default Welcome
