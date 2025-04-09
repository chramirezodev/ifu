"use client";

import React from 'react';
import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <section className="relative h-screen flex items-center bg-white overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-usa-blue/90 to-usa-blue/70 mix-blend-multiply z-10" />
      
      <div 
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{ backgroundImage: "url('/images/statue-of-liberty-3551121_1280.jpg')" }}
      />
      
      <div className="container mx-auto px-4 relative z-20">
        <motion.div 
          className="max-w-3xl text-white"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1 
            className="text-5xl md:text-6xl font-bold mb-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Immigration For Us
          </motion.h1>
          <motion.p 
            className="text-xl md:text-2xl mb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Facilitamos tu camino hacia un futuro mejor en los Estados Unidos.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <a 
              href="#contacto" 
              className="inline-block bg-usa-red hover:bg-red-700 text-white font-bold py-3 px-8 rounded-md shadow-lg transition-colors duration-300"
            >
              Contáctanos
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero; 