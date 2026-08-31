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
        Hoy dedica su práctica al derecho de inmigración, representando a personas y familias ante el Servicio de Ciudadanía e Inmigración de los Estados Unidos (USCIS), las Cortes de Inmigración (EOIR) y la Junta de Apelaciones de Inmigración (BIA).
      </p>
      <p className="text-lg text-gray-700 text-justify">
        Como inmigrante, el abogado Roger Mardini conoce de primera mano los retos de comenzar una nueva vida en Estados Unidos y entiende lo importante que puede ser cada decisión durante un proceso migratorio. Por eso, dedica tiempo a conocer cada caso, explicar las opciones con claridad y brindar a cada cliente una representación legal cercana y personalizada.
      </p>
      {/* Foto del abogado pendiente: el cliente enviará la imagen próximamente */}
    </div>
  </section>
);

export default Welcome;
