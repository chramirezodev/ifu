import React from 'react';
import { motion } from 'framer-motion';

interface TestimonialCardProps {
  text: string;
  author: string;
  location: string;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ text, author, location }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
    >
      <div className="mb-4">
        <span className="text-4xl text-usa-blue">✨</span>
      </div>
      <p className="text-gray-600 mb-4 italic">{text}</p>
      <div className="text-right">
        <p className="font-bold text-gray-800">{author}</p>
        <p className="text-gray-500">{location}</p>
      </div>
    </motion.div>
  );
};

const Testimonials = () => {
  const testimonials = [
    {
      text: "Gracias a Immigration For Us, pude completar mi solicitud de asilo de manera rápida y precisa. El equipo me apoyó en cada paso del proceso y me dio la tranquilidad de que todo estaba bien preparado. Lo logramos. Son los mejores.",
      author: "Mónica A.",
      location: "Orlando, FL"
    },
    {
      text: "El equipo de Immigration For Us hizo todo el proceso de mi solicitud de residencia mucho más sencillo. Estuvieron siempre atentos a mis dudas y se aseguraron de que todo estuviera en orden antes de enviarlo al USCIS.",
      author: "Javier F.",
      location: "Miami, FL"
    },
    {
      text: "Gracias a Immigration For Us pude obtener mi Green Card sin problemas. El proceso era confuso para mí, pero me ayudaron a reunir todos los documentos y a llenar los formularios correctamente. ¡Los recomiendo!",
      author: "Wilson Z.",
      location: "West Palm Beach, FL"
    },
    {
      text: "Mi familia y yo estábamos muy preocupados por el proceso de residencia, pero Carolina nos guió en cada paso. Gracias a su apoyo, ahora somos residentes permanentes.",
      author: "María S.",
      location: "Boca Ratón, FL"
    },
    {
      text: "Después de meses de incertidumbre y papeleo complicado, con tramites de mis familiares, encontré todo el apoyo y la orientación que necesitaba con Immigration for Us y su equipo. Me brindaron confianza, seriedad, organización y cumplimiento. Valió la pena confiar en ellos y su profesionalismo. Gracias infinitas, los seguiré recomendado 100%",
      author: "Sandra A.",
      location: "Hallandale Beach, FL"
    },
    {
      text: "Quiero expresar mi más sincera recomendación para Carolina Palisa y Roger por su excepcional servicio de asesoría en inmigración. Desde el primer contacto, demostraron un profundo conocimiento, profesionalismo y un genuino interés en ayudarme a encontrar la mejor solución para mi situación. Lo que más valoro es su paciencia y claridad al explicar cada paso del proceso, eliminando cualquier incertidumbre y brindándome la tranquilidad de estar en las mejores manos. Su compromiso y eficiencia hicieron que todo el trámite fuera mucho más sencillo y sin contratiempos.",
      author: "Natalia V.",
      location: "Lincolnton, NC"
    }
  ];

  return (
    <section id="testimonios" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Testimonios</h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto">
            EXPERIENCIAS QUE INSPIRAN, CONFIANZA QUE SE GANA
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
            <TestimonialCard
                  key={index}
              text={testimonial.text}
              author={testimonial.author}
              location={testimonial.location}
                />
              ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials; 