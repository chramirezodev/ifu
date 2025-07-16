import Image from 'next/image';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import React, { useEffect, useState } from 'react';

interface AboutProps {
  title: string;
  content: string;
  values?: Array<{ title: string; description: string }>;
}

const DynamicBadges = dynamic(() => Promise.resolve(({ children }: { children: React.ReactNode }) => <>{children}</>), {
  ssr: false,
});

export default function About({ title, content, values = [] }: AboutProps) {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => { setIsClient(true); }, []);
  return (
    <section id="nosotros" className="py-16 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Columna de imagen */}
          <div className="relative">
            <div className="relative aspect-square">
              <Image
                src="/images/nosotros.png"
                alt={title}
                width={500}
                height={300}
                className="object-cover w-full h-full rounded-lg"
                priority
              />
            </div>
          </div>

          {/* Columna de texto */}
          <div className="space-y-6">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">{title}</h2>
            <p className="text-lg text-gray-600 mb-6 text-justify">{content}</p>
            {/* Destacados */}
            <div className="flex flex-row gap-6 mb-4">
              <div className="flex items-center gap-2 bg-gray-100 rounded-lg px-4 py-2 shadow-sm">
                <svg className="w-6 h-6 text-usa-red" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 17.75l-6.172 3.245 1.179-6.873L2 9.755l6.908-1.004L12 2.5l3.092 6.251L22 9.755l-5.007 4.367 1.179 6.873z" /></svg>
                <span className="font-bold text-lg text-gray-800">+5</span>
                <span className="text-sm text-gray-600">Años de experiencia</span>
              </div>
              <div className="flex items-center gap-2 bg-gray-100 rounded-lg px-4 py-2 shadow-sm">
                <svg className="w-6 h-6 text-usa-blue" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" /></svg>
                <span className="font-bold text-lg text-gray-800">100%</span>
                <span className="text-sm text-gray-600">Dedicación</span>
              </div>
            </div>
            
            {/* Valores */}
            {values && values.length > 0 && (
              <div className="grid grid-cols-1 gap-6">
                {values.map((value, index) => (
                  <div key={index} className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
                    <h3 className="text-xl font-semibold text-usa-blue mb-2">{value.title}</h3>
                    <p className="text-gray-600">{value.description}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
} 