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
    <section id="nosotros" className="py-24 bg-white relative overflow-hidden">
      <motion.div 
        className="absolute top-0 left-0 w-64 h-64 bg-usa-blue/5 rounded-full -translate-x-1/2 -translate-y-1/2"
        animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.7, 0.5] }}
        transition={{ duration: 8, repeat: Infinity, repeatType: "reverse" }}
      />
      <motion.div 
        className="absolute bottom-0 right-0 w-96 h-96 bg-usa-red/5 rounded-full translate-x-1/3 translate-y-1/3"
        animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.6, 0.4] }}
        transition={{ duration: 10, repeat: Infinity, repeatType: "reverse", delay: 1 }}
      />
      
      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.h2 
            className="text-4xl font-bold mb-4 text-gray-900"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {title}
          </motion.h2>
          <motion.div 
            className="w-24 h-1 bg-usa-blue mx-auto mb-6"
            initial={{ width: 0 }}
            whileInView={{ width: 96 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Columna de imagen */}
          <motion.div 
            className="relative order-2 lg:order-1"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative aspect-square">
              <Image
                src="/images/nosotros.png"
                alt="Mardini Law Firm — Abogados de inmigración en Estados Unidos"
                width={500}
                height={300}
                className="object-cover w-full h-full rounded-xl shadow-xl"
                loading="lazy"
              />
            </div>
          </motion.div>

          {/* Columna de texto */}
          <motion.div 
            className="space-y-6 order-1 lg:order-2"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.p 
              className="text-lg text-gray-600 mb-8 text-justify leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              {content}
            </motion.p>
            
            {/* Destacados */}
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <div className="flex items-center gap-3 bg-gradient-to-r from-usa-blue/10 to-usa-blue/5 rounded-xl px-6 py-4 shadow-sm border border-usa-blue/20">
                <svg className="w-8 h-8 text-usa-red" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 17.75l-6.172 3.245 1.179-6.873L2 9.755l6.908-1.004L12 2.5l3.092 6.251L22 9.755l-5.007 4.367 1.179 6.873z" />
                </svg>
                <div>
                  <span className="font-bold text-2xl text-gray-800 block">+5</span>
                  <span className="text-sm text-gray-600">Años de experiencia</span>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-gradient-to-r from-usa-red/10 to-usa-red/5 rounded-xl px-6 py-4 shadow-sm border border-usa-red/20">
                <svg className="w-8 h-8 text-usa-blue" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
                <div>
                  <span className="font-bold text-2xl text-gray-800 block">100%</span>
                  <span className="text-sm text-gray-600">Dedicación</span>
                </div>
              </div>
            </motion.div>
            
            {/* Valores */}
            {values && values.length > 0 && (
              <motion.div 
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                {values.map((value, index) => (
                  <motion.div 
                    key={index} 
                    className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 1 + (index * 0.1) }}
                    whileHover={{ scale: 1.02, y: -5 }}
                  >
                    <h3 className="text-xl font-semibold text-usa-blue mb-3">{value.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{value.description}</p>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
} 