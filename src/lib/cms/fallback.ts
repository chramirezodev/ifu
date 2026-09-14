import type { CMSData } from './types'

export const fallbackCMS: CMSData = {
  siteSettings: {
    firmName: 'Mardini Law Firm',
    founder: 'Roger Mardini, Esq.',
    tagline: 'Immigration Attorneys',
    slogan: 'Su futuro, nuestra prioridad',
    email: 'info@mardinilawfirm.com',
    phone: '+1 (754) 234-4284',
    whatsappNumber: '17542344284',
    whatsappAutoMessage:
      '¡Hola! Gracias por contactar a Mardini Law Firm. Hemos recibido tu mensaje y muy pronto un miembro de nuestro equipo se comunicará contigo. Si tu consulta es urgente, también puedes escribirnos a info@mardinilawfirm.com o llamarnos al (754) 234-4284.',
    consultationWhatsAppMessage: 'Hola, me gustaría agendar una consulta con Mardini Law Firm.',
    address: '7224 NW 116th Way, Parkland, FL 33076',
    workHours: 'Lunes a Viernes: 9:00 AM - 5:00 PM',
    website: 'https://immigrationfor-us.com',
    paymentUrl:
      process.env.NEXT_PUBLIC_PAYMENT_URL ||
      'https://secure.lawpay.com/pages/mardinilawfirm/operating',
    googleMapsUrl:
      'https://www.google.com/maps/search/?api=1&query=7224+NW+116th+Way,+Parkland,+FL+33076',
    mapEmbedUrl:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3576.8!2d-80.24!3d26.31!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88d9080e0e0e0e0e%3A0x0!2s7224%20NW%20116th%20Way%2C%20Parkland%2C%20FL%2033076!5e0!3m2!1ses!2sus!4v1700000000000!5m2!1ses!2sus',
    logoUrl: '/images/Logos/mardini-logo.png',
    socialLinks: [{ platform: 'whatsapp', url: 'https://wa.me/17542344284' }],
    footerServiceLabels: [
      'Representación ante la Corte de Inmigración',
      'Asilo Defensivo y Afirmativo',
      'Residencia Permanente / Green Card',
      'Visas y Procesos Migratorios',
      'VAWA',
      'Visa U',
      'Ciudadanía y Naturalización',
      'Apelaciones y Mociones',
      'Fianzas de Inmigración / Immigration Bonds',
    ],
  },
  seo: {
    siteName: 'Mardini Law Firm',
    defaultTitle: 'Mardini Law Firm — Abogados de Inmigración en Estados Unidos',
    defaultDescription:
      'Representación legal estratégica en inmigración ante USCIS, EOIR y BIA. Visas, residencia permanente, naturalización, asilo, VAWA y Visa U.',
    keywords:
      'abogado inmigración, immigration attorney, USCIS, EOIR, BIA, green card, naturalización, asilo, VAWA, visa U, Mardini Law Firm',
    ogImageUrl: '/images/Logos/logo.png',
    twitterHandle: '',
  },
  homeHero: {
    brandLine1: 'MARDINI',
    brandLine2: 'LAW FIRM',
    tagline: 'Immigration Attorneys',
    slogan: 'Su futuro,',
    sloganHighlight: 'nuestra prioridad',
    backgroundImageUrl: '/images/hero/miami-skyline.jpg',
    ctaPrimaryLabel: '',
    ctaPrimaryHref: '#contacto',
    ctaSecondaryLabel: '',
    ctaSecondaryHref: '#servicios',
  },
  homeWelcome: {
    eyebrow: 'Fundador de Mardini Law Firm',
    name: 'Roger Mardini, Esq.',
    paragraphs: [
      'Roger Mardini es abogado licenciado en el estado de Florida y fundador de Mardini Law Firm. Nació en Colombia, donde obtuvo su título de abogado, y posteriormente se estableció en los Estados Unidos, donde obtuvo la ciudadanía estadounidense y el título de Juris Doctor de Nova Southeastern University.',
      'Hoy dedica su práctica al derecho de inmigración, representando a personas y familias ante el Servicio de Ciudadanía e Inmigración de los Estados Unidos (USCIS), las Cortes de Inmigración (EOIR) y la Junta de Apelaciones de Inmigración (BIA).',
      'Como inmigrante, el abogado Roger Mardini conoce de primera mano los retos de comenzar una nueva vida en Estados Unidos y entiende lo importante que puede ser cada decisión durante un proceso migratorio. Por eso, dedica tiempo a conocer cada caso, explicar las opciones con claridad y brindar a cada cliente una representación legal cercana y personalizada.',
    ],
  },
  homeAbout: {
    title: 'Nosotros',
    content:
      'Somos inmigrantes y conocemos los desafíos que se presentan al establecerse en este país. Entendemos que detrás de cada proceso migratorio hay decisiones importantes para usted y su familia. En Mardini Law Firm ofrecemos atención personalizada, comunicación clara y una representación legal cuidadosa en cada etapa del proceso.',
    imageUrl: '/images/nosotros.png',
    values: [
      {
        title: 'Integridad',
        description: 'Honestidad, transparencia y ética profesional en el manejo de cada caso.',
      },
      {
        title: 'Compromiso',
        description:
          'Cada caso es diferente. Nos tomamos el tiempo para conocer su situación y evaluar las opciones disponibles.',
      },
      {
        title: 'Excelencia',
        description:
          'Analizamos cuidadosamente los hechos, la documentación y las opciones legales antes de definir cómo avanzar.',
      },
      {
        title: 'Cercanía',
        description:
          'Mantenemos una comunicación clara y directa para que usted comprenda qué está ocurriendo con su caso.',
      },
    ],
  },
  homeWhyChooseUs: {
    title: '¿Por qué elegirnos?',
    subtitle: 'Representación legal estratégica, personalizada y comprometida',
    reasons: [
      {
        title: 'Experiencia en Litigio y Procesos Migratorios',
        description:
          'Experiencia representando clientes ante USCIS, las Cortes de Inmigración (EOIR) y la Junta de Apelaciones de Inmigración (BIA).',
        expandedDescription:
          'La práctica incluye distintos asuntos migratorios, desde solicitudes ante USCIS hasta representación en procesos de remoción, asilo y apelaciones. Cada caso se prepara cuidadosamente, teniendo en cuenta los hechos, la documentación y las opciones legales disponibles.',
        iconKey: 'experience',
      },
      {
        title: 'Atención Personalizada',
        description: 'Creemos que una buena representación comienza con una comunicación clara y accesible.',
        expandedDescription:
          'Cada caso y cada historia son diferentes. Nos tomamos el tiempo para conocer su situación, responder sus preguntas y mantenerlo informado sobre el avance de su caso. Una comunicación clara es fundamental para que usted comprenda el proceso y las decisiones que debe tomar.',
        iconKey: 'personalized',
      },
      {
        title: 'Compromiso',
        description: 'Su caso recibe la dedicación, el tiempo y la atención que merece.',
        expandedDescription:
          'Detrás de cada caso hay una persona, una familia y decisiones que pueden tener un impacto importante en su futuro. Por eso, asumimos cada representación con seriedad, dedicación y responsabilidad, brindando a cada cliente la atención que su caso merece.',
        iconKey: 'commitment',
      },
    ],
    bannerTitle: 'TU FUTURO MERECE UNA DEFENSA SÓLIDA',
    bannerSubtitle: 'Profesionalismo, preparación y dedicación en cada representación.',
    bannerImageUrl: '/images/hero/slide2.jpg',
  },
  servicesPage: {
    heroTitle: 'Nuestros Servicios Migratorios',
    heroSubtitle:
      'Ofrecemos representación legal estratégica para tus casos de inmigración en Estados Unidos. Conoce nuestros servicios y encuentra la opción que mejor se adapte a tus necesidades.',
    ctaLabel: 'Agenda una consulta',
    ctaHref: '/contacto',
    sectionIntro:
      'En Mardini Law Firm entendemos que cada proceso migratorio representa el futuro de una persona y su familia. Por eso, brindamos representación legal personalizada y estratégica, basada en las circunstancias particulares de cada caso. Representamos a nuestros clientes ante el Servicio de Ciudadanía e Inmigración de los Estados Unidos (USCIS), las Cortes de Inmigración (EOIR) y la Junta de Apelaciones de Inmigración (BIA), en una amplia variedad de asuntos migratorios. Nuestro compromiso es proteger sus derechos, orientarlo sobre sus opciones legales y acompañarlo durante todo el proceso migratorio.',
  },
  services: [
    {
      id: 1,
      title: 'Representación ante la Corte de Inmigración',
      description: 'Defensa legal cuando su permanencia en Estados Unidos está en juego.',
      expandedDescription:
        'Enfrentar un proceso de remoción puede generar muchas preguntas e incertidumbre. Evaluamos su situación, las posibles defensas y las formas de alivio migratorio que puedan estar disponibles, y lo representamos durante las diferentes etapas de su caso ante la Corte de Inmigración.',
      slug: 'corte-inmigracion',
      imageUrl: '/images/statue-of-liberty-267948_1280.jpg',
      iconKey: 'corte-inmigracion',
      order: 1,
    },
    {
      id: 2,
      title: 'Asilo Defensivo y Afirmativo',
      description: 'Protección para quienes temen regresar a su país.',
      expandedDescription:
        'Si usted ha sufrido persecución o teme regresar a su país, el asilo puede ser una opción de protección en Estados Unidos. Evaluamos las circunstancias de su caso y brindamos representación tanto en solicitudes de asilo afirmativo ante USCIS como en casos de asilo defensivo ante la Corte de Inmigración, con una preparación cuidadosa de su caso y la evidencia que lo respalda.',
      slug: 'asilo',
      imageUrl: '/images/brooklyn-bridge-3717553_1280.jpg',
      iconKey: 'asilo',
      order: 2,
    },
    {
      id: 3,
      title: 'Residencia Permanente / Green Card',
      description: 'Construya su futuro en Estados Unidos.',
      expandedDescription:
        'Existen diferentes caminos para obtener la residencia permanente. Evaluamos su elegibilidad y lo orientamos durante cada etapa del proceso, desde la preparación de la solicitud hasta su resolución ante la autoridad migratoria correspondiente.',
      slug: 'residencia',
      imageUrl: '/images/skyscraper-3717555_1280 (1).jpg',
      iconKey: 'residencia',
      order: 3,
    },
    {
      id: 4,
      title: 'Naturalización',
      description: 'Dé el siguiente paso en su camino migratorio.',
      expandedDescription:
        'Convertirse en ciudadano estadounidense es una decisión importante. Si usted es residente permanente, evaluamos su elegibilidad y lo representamos durante el proceso de naturalización ante USCIS.',
      slug: 'naturalizacion',
      imageUrl: '/images/america-1068986_1280.jpg',
      iconKey: 'naturalizacion',
      order: 4,
    },
    {
      id: 5,
      title: 'VAWA (Violence Against Women Act)',
      description: 'Protección migratoria para determinadas víctimas de abuso.',
      expandedDescription:
        'VAWA permite que ciertos cónyuges, hijos o padres que han sufrido abuso por parte de un ciudadano estadounidense o residente permanente soliciten protección migratoria sin depender del familiar abusador. Evaluamos cada caso de manera confidencial para determinar si cumple con los requisitos establecidos por la ley.',
      slug: 'vawa',
      imageUrl: '/images/shot-two-american-us-flags-high-rise-building.jpg',
      iconKey: 'vawa',
      order: 5,
    },
    {
      id: 6,
      title: 'Visa U',
      description: 'Una opción migratoria para determinadas víctimas de delitos.',
      expandedDescription:
        'Si usted ha sido víctima de un delito y ha colaborado con las autoridades en la investigación o el proceso correspondiente, podría ser elegible para una Visa U (Nonimmigrant Visa for Victims of Crimes - Visa de No Inmigrante para Víctimas de Crímenes). Evaluamos cuidadosamente su situación y los requisitos de elegibilidad para determinar las opciones disponibles en su caso.',
      slug: 'visa-u',
      imageUrl: '/images/statue-of-liberty-3551121_1280.jpg',
      iconKey: 'visa-u',
      order: 6,
    },
    {
      id: 7,
      title: 'Apelaciones y Mociones',
      description: 'Una decisión adversa no siempre significa el final del camino.',
      expandedDescription:
        'Dependiendo de las circunstancias, una decisión migratoria puede ser objeto de apelación o de una moción para reabrir o reconsiderar el caso. Evaluamos el historial procesal y las opciones legales disponibles para determinar los próximos pasos.',
      slug: 'apelaciones',
      imageUrl: '/images/writing-1149962_1920.jpg',
      iconKey: 'apelaciones',
      order: 7,
    },
    {
      id: 8,
      title: 'Visas y Procesos Migratorios',
      description: 'Orientación legal para encontrar el camino adecuado.',
      expandedDescription:
        'Cada situación migratoria es diferente. Evaluamos sus circunstancias y las alternativas disponibles para determinar qué proceso migratorio puede corresponder a su caso.',
      slug: 'visas',
      imageUrl: '/images/luggage-1149289.jpg',
      iconKey: 'visas',
      order: 8,
    },
    {
      id: 9,
      title: 'Fianzas de Inmigración / Immigration Bonds',
      description: 'Orientación y representación en procesos de fianza migratoria.',
      expandedDescription:
        'Cuando una persona se encuentra detenida por autoridades de inmigración, una fianza puede ser una vía para solicitar su liberación mientras avanza el caso. Evaluamos la situación y las opciones disponibles para orientar a la familia sobre los siguientes pasos.',
      slug: 'fianzas',
      imageUrl: '/images/old-bridge-with-ropes-american-flag.jpg',
      iconKey: 'fianzas',
      order: 9,
    },
  ],
  testimonials: [
    {
      id: 1,
      name: 'Mónica A.',
      role: 'Solicitud de Asilo',
      content:
        'Gracias a Immigration For Us, pude completar mi solicitud de asilo de manera rápida y precisa. El equipo me apoyó en cada paso del proceso y me dio la tranquilidad de que todo estaba bien preparado. Lo logramos. Son los mejores.',
      avatarUrl: '/images/testimonials/avatar-female.png',
      rating: 5,
      gender: 'female',
      location: 'Orlando, FL',
      order: 1,
    },
    {
      id: 2,
      name: 'Javier F.',
      role: 'Solicitud de Residencia',
      content:
        'El equipo de Immigration For Us hizo todo el proceso de mi solicitud de residencia mucho más sencillo. Estuvieron siempre atentos a mis dudas y se aseguraron de que todo estuviera en orden antes de enviarlo al USCIS.',
      avatarUrl: '/images/testimonials/avatar-male.png',
      rating: 5,
      gender: 'male',
      location: 'Miami, FL',
      order: 2,
    },
    {
      id: 3,
      name: 'Wilson Z.',
      role: 'Green Card',
      content:
        'Gracias a Immigration For Us pude obtener mi Green Card sin problemas. El proceso era confuso para mí, pero me ayudaron a reunir todos los documentos y a llenar los formularios correctamente. ¡Los recomiendo!',
      avatarUrl: '/images/testimonials/avatar-male.png',
      rating: 5,
      gender: 'male',
      location: 'West Palm Beach, FL',
      order: 3,
    },
    {
      id: 4,
      name: 'María S.',
      role: 'Residencia Permanente',
      content:
        'Mi familia y yo estábamos muy preocupados por el proceso de residencia, pero Carolina nos guió en cada paso. Gracias a su apoyo, ahora somos residentes permanentes.',
      avatarUrl: '/images/testimonials/avatar-female.png',
      rating: 5,
      gender: 'female',
      location: 'Boca Ratón, FL',
      order: 4,
    },
    {
      id: 5,
      name: 'Sandra A.',
      role: 'Trámites Familiares',
      content:
        'Después de meses de incertidumbre y papeleo complicado, con tramites de mis familiares, encontré todo el apoyo y la orientación que necesitaba con Immigration for Us y su equipo. Me brindaron confianza, seriedad, organización y cumplimiento. Valió la pena confiar en ellos y su profesionalismo. Gracias infinitas, los seguiré recomendado 100%',
      avatarUrl: '/images/testimonials/avatar-female.png',
      rating: 5,
      gender: 'female',
      location: 'Hallandale Beach, FL',
      order: 5,
    },
    {
      id: 6,
      name: 'Natalia V.',
      role: 'Asesoría de Inmigración',
      content:
        'Quiero expresar mi más sincera recomendación para Carolina Palisa y Roger por su excepcional servicio de asesoría en inmigración. Desde el primer contacto, demostraron un profundo conocimiento, profesionalismo y un genuino interés en ayudarme a encontrar la mejor solución para mi situación. Lo que más valoro es su paciencia y claridad al explicar cada paso del proceso, eliminando cualquier incertidumbre y brindándome la tranquilidad de estar en las mejores manos. Su compromiso y eficiencia hicieron que todo el trámite fuera mucho más sencillo y sin contratiempos.',
      avatarUrl: '/images/testimonials/avatar-female.png',
      rating: 5,
      gender: 'female',
      location: 'Lincolnton, NC',
      order: 6,
    },
  ],
  faqs: [
    {
      id: 1,
      question: '¿Qué documentos necesito para solicitar una visa?',
      answer:
        'Los documentos varían dependiendo del tipo de visa que estés solicitando. Generalmente, necesitarás una solicitud de visa, pasaporte válido, prueba de fondos, fotos tipo visa y documentos específicos según el tipo de visa (como una oferta de trabajo, carta de aceptación de la universidad o evidencia de la relación familiar). Te ayudaré a identificar todos los documentos necesarios para tu caso.',
      order: 1,
    },
    {
      id: 2,
      question: '¿Cuánto tiempo tarda el proceso de solicitud de residencia?',
      answer:
        'El tiempo de espera para la residencia permanente varía según tu situación y el tipo de solicitud. En promedio, el proceso puede tardar entre 12 meses y 3 años. Estaré aquí para ayudarte a hacer el seguimiento de tu caso y mantenerte informado/a de cualquier actualización.',
      order: 2,
    },
    {
      id: 3,
      question: '¿Puedo trabajar mientras mi solicitud está en proceso?',
      answer:
        'Depende del tipo de solicitud. Si tienes una visa de trabajo o si tu solicitud de residencia incluye un permiso de trabajo, podrás trabajar mientras esperas la aprobación. En algunos casos, podemos solicitar un permiso de trabajo provisional.',
      order: 3,
    },
    {
      id: 4,
      question: '¿Qué sucede si mi solicitud es rechazada?',
      answer:
        'Si tu solicitud es rechazada, existen opciones disponibles, como apelar la decisión o presentar una nueva solicitud. Te ayudaré a entender las razones del rechazo y a explorar las mejores opciones para seguir adelante.',
      order: 4,
    },
  ],
  posts: [
    {
      id: '1',
      title: 'Guía Completa para Obtener la Green Card en 2024',
      excerpt:
        'Todo lo que necesitas saber sobre el proceso de residencia permanente en Estados Unidos, incluyendo los pasos, documentos y tiempos de espera.',
      contentHtml: `
      <h2>¿Qué es una Green Card?</h2>
      <p>La Green Card, oficialmente conocida como Tarjeta de Residente Permanente, es un documento que permite a los extranjeros vivir y trabajar permanentemente en Estados Unidos.</p>
      <h2>Tipos de Green Card</h2>
      <p>Existen varias categorías para obtener la residencia permanente:</p>
      <ul>
        <li><strong>Reunión Familiar:</strong> Patrocinio por parte de familiares ciudadanos o residentes permanentes</li>
        <li><strong>Empleo:</strong> Basada en ofertas de trabajo o habilidades especiales</li>
        <li><strong>Inversionista:</strong> EB-5 para inversionistas que crean empleos</li>
        <li><strong>Diversidad:</strong> Programa de lotería de visas de diversidad</li>
        <li><strong>Refugiado/Asilo:</strong> Para personas que huyen de persecución</li>
      </ul>
      <h2>Proceso de Solicitud</h2>
      <p>El proceso típico incluye:</p>
      <ol>
        <li>Determinar elegibilidad</li>
        <li>Presentar petición (si es necesario)</li>
        <li>Esperar procesamiento</li>
        <li>Completar formularios adicionales</li>
        <li>Asistir a entrevista</li>
        <li>Recibir decisión</li>
      </ol>
      <h2>Documentos Requeridos</h2>
      <p>Los documentos básicos incluyen:</p>
      <ul>
        <li>Formulario I-485 (Aplicación para Registrar Residencia Permanente)</li>
        <li>Certificado de nacimiento</li>
        <li>Pasaporte válido</li>
        <li>Fotos tipo pasaporte</li>
        <li>Exámenes médicos</li>
        <li>Evidencia de apoyo financiero</li>
      </ul>
      <h2>Tiempos de Procesamiento</h2>
      <p>Los tiempos varían según la categoría y el país de origen, pero típicamente van de 12 meses a varios años.</p>
      <h2>Consejos Importantes</h2>
      <ul>
        <li>Mantén todos los documentos organizados</li>
        <li>Responde a las solicitudes de evidencia adicional rápidamente</li>
        <li>Considera trabajar con un profesional certificado</li>
        <li>Mantén un registro de todas las comunicaciones con USCIS</li>
      </ul>
    `,
      publishedAt: '2024-12-15',
      author: 'Roger Mardini, Esq.',
      category: 'Residencia Permanente',
      readTime: '8 min',
      imageUrl: '/images/blog/green-card-guide.jpg',
      slug: 'guia-green-card-2024',
    },
    {
      id: '2',
      title: 'Tipos de Visas de Trabajo: H1B, L1, O1 y Más',
      excerpt:
        'Descubre los diferentes tipos de visas de trabajo disponibles y cuál es la mejor opción para tu situación profesional.',
      contentHtml: '',
      publishedAt: '2024-12-10',
      author: 'Roger Mardini, Esq.',
      category: 'Visas de Trabajo',
      readTime: '6 min',
      imageUrl: '/images/blog/work-visas.jpg',
      slug: 'tipos-visas-trabajo',
    },
    {
      id: '3',
      title: 'Proceso de Naturalización: De Residente a Ciudadano',
      excerpt:
        'Conoce los requisitos y pasos para convertirte en ciudadano estadounidense a través del proceso de naturalización.',
      contentHtml: '',
      publishedAt: '2024-12-05',
      author: 'Roger Mardini, Esq.',
      category: 'Ciudadanía',
      readTime: '10 min',
      imageUrl: '/images/blog/naturalization.jpg',
      slug: 'proceso-naturalizacion',
    },
    {
      id: '4',
      title: 'Asilo Político: Guía Paso a Paso',
      excerpt:
        'Información esencial sobre el proceso de asilo político, requisitos y consejos para una solicitud exitosa.',
      contentHtml: '',
      publishedAt: '2024-11-28',
      author: 'Roger Mardini, Esq.',
      category: 'Asilo',
      readTime: '7 min',
      imageUrl: '/images/blog/asylum.jpg',
      slug: 'asilo-politico-guia',
    },
    {
      id: '5',
      title: 'Reunificación Familiar: Patrocinando a tus Seres Queridos',
      excerpt:
        'Aprende cómo patrocinar a familiares para que obtengan la residencia permanente en Estados Unidos.',
      contentHtml: '',
      publishedAt: '2024-11-20',
      author: 'Roger Mardini, Esq.',
      category: 'Reunificación Familiar',
      readTime: '9 min',
      imageUrl: '/images/blog/family-reunion.jpg',
      slug: 'reunificacion-familiar',
    },
    {
      id: '6',
      title: 'Errores Comunes en Formularios de Inmigración',
      excerpt:
        'Evita estos errores frecuentes que pueden retrasar o rechazar tu solicitud de inmigración.',
      contentHtml: '',
      publishedAt: '2024-11-15',
      author: 'Roger Mardini, Esq.',
      category: 'Consejos',
      readTime: '5 min',
      imageUrl: '/images/blog/common-mistakes.jpg',
      slug: 'errores-comunes-formularios',
    },
  ],
}
