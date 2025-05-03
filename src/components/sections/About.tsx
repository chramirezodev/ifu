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
  if (!isClient) return null;
  return (
    <section id="nosotros" className="py-16 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Columna de imagen */}
          <div className="relative">
            <div className="relative aspect-square">
              <Image
                src="/images/connect-20333_1920.jpg"
                alt={title}
                width={500}
                height={300}
                className="object-cover w-full h-full rounded-lg"
                loading="eager"
              />
              
              <DynamicBadges>
                {/* Badge de años de experiencia */}
                <div className="absolute -top-4 -right-4 bg-usa-red text-white p-6 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300 z-10">
                  <div className="text-4xl md:text-5xl font-extrabold">+5</div>
                  <div className="text-sm font-medium">Años de<br/>experiencia</div>
                </div>

                {/* Círculo de dedicación */}
                <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 bg-white rounded-full p-8 shadow-2xl w-64 h-64 flex flex-col items-center justify-center transform hover:scale-105 transition-all duration-300 z-10">
                  <div className="text-6xl md:text-7xl font-bold text-usa-blue mb-2">100%</div>
                  <div className="text-gray-700 font-medium text-xl text-center">Dedicación</div>
                </div>
              </DynamicBadges>
            </div>
          </div>

          {/* Columna de texto */}
          <div className="space-y-6">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">{title}</h2>
            <p className="text-lg text-gray-600 mb-6 text-justify">{content}</p>
            
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