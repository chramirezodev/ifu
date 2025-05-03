import Image from 'next/image';
import React from 'react';

interface AboutProps {
  title: string;
  content: string;
  values?: Array<{ title: string; description: string }>;
}

export default function About({ title, content, values = [] }: AboutProps) {
  return (
    <section id="nosotros" className="py-16 bg-white relative">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Columna de imagen */}
          <div className="relative">
            <div className="relative aspect-square mb-32">
              <div className="w-full h-full bg-gray-100 rounded-lg shadow-xl"/>
              
              {/* Badge de años de experiencia */}
              <div 
                className="absolute -top-8 -right-8 bg-usa-red text-white px-10 py-8 rounded-[2rem] shadow-2xl z-20 transform hover:scale-105 transition-all duration-300"
                style={{
                  boxShadow: '0 25px 50px -12px rgba(220, 38, 38, 0.35)'
                }}
              >
                <div className="text-7xl md:text-8xl font-black leading-none text-center" style={{
                  textShadow: '2px 2px 0 rgba(0,0,0,0.2)'
                }}>
                  +5
                </div>
                <div className="text-2xl md:text-3xl font-extrabold text-center" style={{
                  textShadow: '1px 1px 0 rgba(0,0,0,0.2)'
                }}>
                  Años de<br/>experiencia
                </div>
              </div>

              {/* Círculo de dedicación */}
              <div 
                className="absolute -bottom-28 left-1/2 transform -translate-x-1/2 bg-white rounded-full p-12 w-80 h-80 flex flex-col items-center justify-center shadow-2xl z-10 hover:scale-105 transition-all duration-300"
                style={{
                  boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
                }}
              >
                <div className="text-7xl md:text-8xl font-black text-usa-blue mb-2 text-center" style={{
                  textShadow: '2px 2px 0 rgba(30, 64, 175, 0.1)'
                }}>
                  100%
                </div>
                <div className="text-2xl md:text-3xl font-bold text-gray-700 text-center">
                  Dedicación
                </div>
              </div>
            </div>
          </div>

          {/* Columna de texto */}
          <div className="space-y-6">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">{title}</h2>
            <p className="text-lg text-gray-600 mb-6">{content}</p>
            
            {/* Valores */}
            <div className="grid grid-cols-1 gap-6">
              {values?.map((value, index) => (
                <div 
                  key={index} 
                  className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
                >
                  <h3 className="text-xl font-semibold text-usa-blue mb-2">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 