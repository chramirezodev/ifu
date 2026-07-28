import React from 'react';

const Welcome = () => (
  <section className="py-20 bg-white">
    <div className="container mx-auto px-4 text-center max-w-6xl">
      <p className="text-brand-silver uppercase tracking-[0.2em] text-sm font-semibold mb-3">
        Fundador de Mardini Law Firm
      </p>
      <h2 className="text-4xl font-serif font-bold mb-6 text-brand-navy">Roger Mardini, Esq.</h2>
      <p className="text-lg text-gray-700 mb-4 text-justify">
        Roger Mardini es abogado licenciado en el estado de Florida y fundador de Mardini Law Firm. Nació en Colombia, donde obtuvo su título de abogado, y posteriormente se estableció en los Estados Unidos, donde obtuvo la ciudadanía estadounidense y el título de Juris Doctor de Nova Southeastern University.
      </p>
      <p className="text-lg text-gray-700 mb-4 text-justify">
        Hoy dedica su práctica exclusivamente al derecho de inmigración, representando a personas y familias ante las Cortes de Inmigración (EOIR), la Junta de Apelaciones de Inmigración (BIA) y el Servicio de Ciudadanía e Inmigración de los Estados Unidos (USCIS).
      </p>
      <p className="text-lg text-gray-700 text-justify">
        Como inmigrante, el abogado Roger Mardini comprende de primera mano los desafíos que implica construir una nueva vida en este país. Su compromiso es ofrecer una representación estratégica, una comunicación clara y un acompañamiento cercano para ayudar a cada cliente a alcanzar sus objetivos migratorios con confianza.
      </p>
    </div>
  </section>
);

export default Welcome;
