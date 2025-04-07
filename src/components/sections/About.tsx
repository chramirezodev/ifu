import Image from 'next/image';
import { motion } from 'framer-motion';

interface AboutProps {
  title: string;
  content: string;
  values?: Array<{ title: string; description: string }>;
}

export default function About({ title, content, values = [] }: AboutProps) {
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
            <h2 className="text-4xl font-bold text-gray-900 mb-6">{title}</h2>
            <p className="text-lg text-gray-600 mb-6">{content}</p>
            
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