"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

interface TestimonialType {
  id: number;
  name: string;
  role: string;
  text: string;
  avatar?: string;
  rating: number;
  gender?: 'male' | 'female';
}

const testimonialsData: TestimonialType[] = [
  {
    id: 1,
    name: 'Pedro Gonzales',
    role: 'Visa de Trabajo H-1B',
    text: 'Immigration For Us me ayudó a completar todos los formularios correctamente para mi visa de trabajo. El proceso fue mucho más sencillo de lo que esperaba gracias a su guía.',
    avatar: '/images/testimonials/avatar-male.png',
    rating: 5,
    gender: 'male'
  },
  {
    id: 2,
    name: 'Ana María López',
    role: 'Trámite de Residencia',
    text: 'Después de varios intentos fallidos por mi cuenta, decidí buscar ayuda profesional. Gracias a Immigration For US logré obtener mi residencia permanente. Su equipo es increíblemente detallista y conocedor.',
    avatar: '/images/testimonials/avatar-female.png',
    rating: 5,
    gender: 'female'
  },
  {
    id: 3,
    name: 'Miguel Rodriguez',
    role: 'Naturalización',
    text: 'El proceso de naturalización puede ser abrumador con tantos documentos y requisitos. Con Immigration For US, cada paso estuvo claramente explicado. Ahora soy ciudadano estadounidense y no podría estar más feliz.',
    avatar: '/images/testimonials/avatar-male.png',
    rating: 4,
    gender: 'male'
  },
  {
    id: 4,
    name: 'Carmen Ruiz',
    role: 'Visa de Prometido K-1',
    text: 'Cuando mi prometido y yo decidimos casarnos, no sabíamos por dónde empezar con todo el papeleo. Immigration For US fue recomendado por un amigo y definitivamente superaron nuestras expectativas. ¡Altamente recomendado!',
    avatar: '/images/testimonials/avatar-female.png',
    rating: 5,
    gender: 'female'
  },
  {
    id: 5,
    name: 'Javier Martínez',
    role: 'DACA Renovación',
    text: 'He renovado mi DACA tres veces con Immigration For US. Siempre son profesionales, responden rápidamente y me han ayudado a mantener mi estatus sin problemas.',
    avatar: '/images/testimonials/avatar-male.png',
    rating: 5,
    gender: 'male'
  }
];

const TestimonialCard: React.FC<{ testimonial: TestimonialType; index: number; isActive: boolean }> = ({ testimonial, index, isActive }) => {
  const getDefaultAvatar = () => {
    if (testimonial.gender === 'female') {
      return '/images/testimonials/avatar-female.png';
    }
    return '/images/testimonials/avatar-male.png';
  };

  const avatarSrc = testimonial.avatar || getDefaultAvatar();

  return (
    <motion.div
      className={`bg-white rounded-xl shadow-xl overflow-hidden relative p-6 md:p-8 transition-all duration-500 ${isActive ? 'opacity-100 scale-100 z-10' : 'opacity-50 scale-90 z-0'}`}
      initial={{ opacity: 0, y: 50 }}
      animate={{ 
        opacity: isActive ? 1 : 0.5, 
        y: 0, 
        scale: isActive ? 1 : 0.9,
        x: isActive ? 0 : (index % 2 === 0 ? -20 : 20)
      }}
      transition={{ 
        duration: 0.7, 
        ease: [0.165, 0.84, 0.44, 1],
        delay: isActive ? 0.2 * index : 0
      }}
      whileHover={{ scale: isActive ? 1.02 : 0.92, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
    >
      {isActive && (
        <motion.div 
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0"
          animate={{ 
            opacity: [0, 0.5, 0],
            left: ['-100%', '100%', '100%']
          }}
          transition={{ 
            duration: 2, 
            ease: "easeInOut",
            repeat: Infinity,
            repeatDelay: 5
          }}
        />
      )}

      <div className="absolute top-4 right-4 text-gray-200 opacity-40">
        <svg width="60" height="60" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M11.3 5.8C10.9 5.3 10.3 5 9.7 5H9.3C8.2 5 7.1 5.4 6.2 6.2C5.3 6.9 4.5 7.9 4.2 9.1C4 9.7 3.8 10.3 3.7 11C3.5 11.6 3.5 12.3 3.5 12.9C3.4 13.5 3.5 14.1 3.5 14.7C3.5 15.3 3.6 15.9 3.7 16.5C3.8 17.1 3.9 17.7 4 18.3C4.2 18.9 4.3 19.4 4.5 20H8.3C8.5 19.4 8.7 18.8 8.8 18.2C9 17.6 9.1 17 9.2 16.4C9.3 15.8 9.3 15.2 9.4 14.6C9.4 14 9.3 13.5 9.3 12.9C9.3 12.3 9.1 11.7 9 11.1C8.9 10.5 8.5 10 8.1 9.5H10C10.5 9.5 11 9.3 11.4 9C11.9 8.7 12.2 8.2 12.2 7.7V7.3C12.4 6.8 12 6.2 11.3 5.8ZM20.4 5.8C20 5.3 19.4 5 18.8 5H18.4C17.3 5 16.2 5.4 15.3 6.2C14.4 6.9 13.6 7.9 13.3 9.1C13.1 9.7 12.9 10.3 12.8 11C12.6 11.6 12.6 12.3 12.6 12.9C12.5 13.5 12.6 14.1 12.6 14.7C12.6 15.3 12.7 15.9 12.8 16.5C12.9 17.1 13 17.7 13.1 18.3C13.3 18.9 13.4 19.4 13.6 20H17.4C17.6 19.4 17.8 18.8 17.9 18.2C18.1 17.6 18.2 17 18.3 16.4C18.4 15.8 18.4 15.2 18.5 14.6C18.5 14 18.4 13.5 18.4 12.9C18.4 12.3 18.2 11.7 18.1 11.1C18 10.5 17.6 10 17.2 9.5H19.1C19.6 9.5 20.1 9.3 20.5 9C21 8.7 21.3 8.2 21.3 7.7V7.3C21.4 6.8 21 6.2 20.4 5.8Z" />
        </svg>
      </div>

      <div className="flex flex-col md:flex-row gap-6 md:items-center">
        <motion.div 
          className="relative shrink-0"
          whileHover={{ scale: 1.1 }}
          transition={{ type: 'spring', stiffness: 300, damping: 15 }}
        >
          <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-usa-blue/20 shadow-md">
            <Image 
              src={avatarSrc}
              alt={testimonial.name}
              width={80}
              height={80}
              className="object-cover"
              onError={(e) => {
                const imgElement = e.currentTarget as HTMLImageElement;
                imgElement.src = testimonial.gender === 'female' 
                  ? '/images/testimonials/avatar-female.png' 
                  : '/images/testimonials/avatar-male.png';
              }}
            />
          </div>
          
          <motion.div 
            className="absolute -right-1 -bottom-1 bg-usa-blue rounded-full p-1 shadow-lg"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5, type: 'spring', stiffness: 500, damping: 15 }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </motion.div>
        </motion.div>
        
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <motion.svg 
                  key={i} 
                  className={`w-4 h-4 ${i < testimonial.rating ? 'text-yellow-400' : 'text-gray-300'}`} 
                  fill="currentColor" 
                  viewBox="0 0 20 20"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + (i * 0.1) }}
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </motion.svg>
              ))}
            </div>
            <motion.span 
              className="text-sm text-gray-500"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              • Cliente verificado
            </motion.span>
          </div>
          
          <motion.p 
            className="text-gray-600 italic mb-4 text-base"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            "{testimonial.text}"
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
            <p className="text-usa-blue text-sm">{testimonial.role}</p>
          </motion.div>
        </div>
      </div>
      
      <motion.div 
        className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-usa-blue via-red-500 to-usa-red"
        initial={{ width: '0%' }}
        animate={{ width: '100%' }}
        transition={{ duration: 0.8, delay: 0.2 }}
      />
    </motion.div>
  );
};

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoplay, setIsAutoplay] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const visibleItems = 3;
  const totalTestimonials = testimonialsData.length;
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    handleResize();
    
    window.addEventListener('resize', handleResize);
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isAutoplay) {
      interval = setInterval(() => {
        setActiveIndex(prevIndex => (prevIndex + 1) % totalTestimonials);
      }, 5000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isAutoplay, totalTestimonials]);

  const handleManualChange = (index: number) => {
    setActiveIndex(index);
    setIsAutoplay(false);
    
    setTimeout(() => setIsAutoplay(true), 10000);
  };

  const handleNext = () => {
    handleManualChange((activeIndex + 1) % totalTestimonials);
  };

  const handlePrev = () => {
    handleManualChange((activeIndex - 1 + totalTestimonials) % totalTestimonials);
  };

  return (
    <section id="testimonios" className="py-24 bg-white relative overflow-hidden">
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
      <motion.div 
        className="absolute top-1/2 left-1/3 w-48 h-48 bg-usa-blue/3 rounded-full -translate-y-1/2"
        animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 12, repeat: Infinity, repeatType: "reverse", delay: 2 }}
      />
      
      <div className="container mx-auto px-4 relative z-10">
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
            Lo Que Dicen Nuestros Clientes
          </motion.h2>
          <motion.div 
            className="w-24 h-1 bg-usa-blue mx-auto mb-6"
            initial={{ width: 0 }}
            whileInView={{ width: 96 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          />
          <motion.p 
            className="text-xl text-gray-600 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Nos enorgullece haber ayudado a muchas personas a alcanzar sus metas migratorias. 
            Estas son algunas de las experiencias compartidas por nuestros clientes.
          </motion.p>
        </motion.div>
        
        <div className="relative" ref={containerRef}>
          <div className="absolute top-1/2 left-0 right-0 flex justify-between items-center -translate-y-1/2 z-20 px-4 md:px-8">
            <motion.button
              onClick={handlePrev}
              className="bg-white/90 backdrop-blur p-3 rounded-full shadow-lg text-usa-blue hover:text-white hover:bg-usa-blue transition-colors duration-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </motion.button>
            
            <motion.button
              onClick={handleNext}
              className="bg-white/90 backdrop-blur p-3 rounded-full shadow-lg text-usa-blue hover:text-white hover:bg-usa-blue transition-colors duration-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </motion.button>
          </div>
          
          <div className="relative px-8 overflow-hidden py-12">
            <div className="flex flex-col md:flex-row gap-8 justify-center">
              {testimonialsData.map((testimonial, index) => {
                const isVisible = isMobile 
                  ? index === activeIndex
                  : (index >= activeIndex && index < activeIndex + visibleItems) ||
                    (activeIndex + visibleItems > totalTestimonials && index < (activeIndex + visibleItems) % totalTestimonials);
                
                if (!isVisible) return null;
                
                return (
                  <TestimonialCard 
                    key={testimonial.id} 
                    testimonial={testimonial}
                    index={index}
                    isActive={index === activeIndex}
                  />
                );
              })}
            </div>
          </div>
          
          <div className="flex justify-center items-center gap-2 mt-8">
            {testimonialsData.map((_, index) => (
              <motion.button
                  key={index}
                onClick={() => handleManualChange(index)}
                className={`h-3 rounded-full transition-all duration-300 focus:outline-none ${
                  activeIndex === index ? 'bg-usa-blue w-8' : 'bg-gray-300 w-3 hover:bg-gray-400'
                }`}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                  aria-label={`Ver testimonio ${index + 1}`}
                />
              ))}
            </div>
        </div>

        <motion.div 
          className="text-center mt-16 max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-lg relative overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <motion.div 
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0"
            animate={{ 
              opacity: [0, 0.5, 0],
              left: ['-100%', '100%', '100%']
            }}
            transition={{ 
              duration: 2.5, 
              ease: "easeInOut",
              repeat: Infinity,
              repeatDelay: 5
            }}
          />
          
          <h3 className="text-2xl font-bold mb-4 relative z-10">
            ¿Listo para iniciar tu proceso migratorio?
          </h3>
          <p className="text-gray-600 mb-6 relative z-10">
            Únete a cientos de personas que han confiado en nosotros para lograr sus objetivos migratorios.
          </p>
          <motion.a
            href="#contacto"
            className="inline-block bg-usa-blue text-white font-bold py-3 px-8 rounded-lg transition-all duration-300 shadow-md relative z-10"
            whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
            whileTap={{ scale: 0.98 }}
          >
            Contáctanos ahora
          </motion.a>
          
          <motion.div 
            className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-usa-red via-blue-500 to-usa-blue"
            initial={{ width: '0%' }}
            whileInView={{ width: '100%' }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
          />
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials; 