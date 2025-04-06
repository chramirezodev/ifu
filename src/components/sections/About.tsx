import Image from 'next/image';
import { motion } from 'framer-motion';
import { urlForImage } from '@/lib/sanity/client';

interface AboutProps {
  title: string;
  content: any; // Portable Text
  image?: any; // Sanity image
  values?: Array<{ title: string; description: string; icon?: string }>;
}

export default function About({ title, content, image, values = [] }: AboutProps) {
  // Animaciones
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };
  
  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const imageUrl = image ? urlForImage(image).width(600).height(800).url() : '/images/default-about.jpg';

  return (
    <section id="nosotros" className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-usa-blue mb-4"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {title}
          </motion.h2>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Imagen */}
          <motion.div 
            className="relative h-[400px] lg:h-[600px] rounded-lg overflow-hidden shadow-lg"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <Image 
              src={imageUrl}
              alt="Sobre Immigration For US"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-usa-blue-dark/50 to-transparent"></div>
            <div className="absolute bottom-0 left-0 w-full p-6">
              <div className="flex items-center space-x-2 text-white">
                <span className="h-1 w-10 bg-usa-red"></span>
                <span className="text-xl font-medium">Immigration For US</span>
              </div>
              <h3 className="text-2xl font-bold text-white mt-2">Servicios de Inmigración Profesional</h3>
            </div>
          </motion.div>
          
          {/* Contenido */}
          <div>
            <motion.div 
              className="prose prose-lg max-w-none prose-headings:text-usa-blue prose-a:text-usa-red"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              dangerouslySetInnerHTML={{ __html: content }}
            />
            
            {/* Valores */}
            {values && values.length > 0 && (
              <motion.div 
                className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6"
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                {values.map((value, index) => (
                  <motion.div 
                    key={index}
                    className="bg-white p-6 rounded-lg shadow-sm border border-gray-100"
                    variants={fadeIn}
                  >
                    <div className="flex items-center mb-4">
                      <div className="bg-usa-blue-light/10 p-3 rounded-full mr-4">
                        <svg className="w-6 h-6 text-usa-blue" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <h3 className="font-bold text-lg text-usa-blue-dark">{value.title}</h3>
                    </div>
                    <p className="text-gray-600">{value.description}</p>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
} 