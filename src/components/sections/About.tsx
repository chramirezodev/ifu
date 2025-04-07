import Image from 'next/image';
import { motion } from 'framer-motion';
import { urlForImage } from '@/lib/sanity/client';

interface AboutProps {
  title: string;
  content: any; // Portable Text
  image?: any; // Sanity image
  values?: Array<{ title: string; description: string; icon?: string }>;
}

export default function About() {
  return (
    <section id="nosotros" className="py-16 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Columna de imagen */}
          <div className="relative">
            <div className="relative aspect-square">
              <Image
                src="/images/hands-3331229_1920.jpg"
                alt="Trabajando juntos por tu futuro"
                fill
                className="object-cover rounded-lg shadow-xl"
              />
              
              {/* Badge de años de experiencia */}
              <div className="absolute -top-4 -right-4 bg-usa-red text-white p-4 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300 z-10">
                <div className="text-3xl md:text-4xl font-extrabold">+5</div>
                <div className="text-sm font-medium">Años de<br/>experiencia</div>
              </div>

              {/* Círculo de dedicación */}
              <div className="absolute -bottom-12 -left-12 bg-white rounded-full p-8 shadow-2xl w-56 h-56 flex flex-col items-center justify-center transform hover:scale-105 transition-all duration-300 z-10">
                <div className="text-5xl md:text-6xl font-bold text-usa-blue mb-2">100%</div>
                <div className="text-gray-700 font-medium text-lg text-center">Dedicación</div>
              </div>
            </div>
          </div>

          {/* Columna de texto */}
          <div className="space-y-6">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Sobre Nosotros</h2>
            <p className="text-lg text-gray-600 mb-6">
              En Immigration For US, nos dedicamos a hacer realidad tus sueños de inmigración. 
              Con más de 5 años de experiencia, hemos ayudado a cientos de personas a navegar 
              exitosamente por el complejo sistema migratorio de los Estados Unidos.
            </p>
            {/* ... resto del contenido ... */}
          </div>
        </div>
      </div>
    </section>
  );
} 