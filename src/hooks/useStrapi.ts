import { useState, useEffect } from 'react';
import { fetchAPI } from '@/lib/strapi';

interface StrapiResponse<T> {
  data: T;
  error?: string;
  loading: boolean;
}

interface StrapiAttributes {
  [key: string]: any;
}

interface StrapiEntity<T extends StrapiAttributes> {
  id: number;
  attributes: T;
}

interface StrapiData<T extends StrapiAttributes> {
  data: StrapiEntity<T>[];
  meta: any;
}

const API_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';

export function useStrapi<T extends StrapiAttributes>(endpoint: string): StrapiResponse<StrapiEntity<T>[]> {
  const [data, setData] = useState<StrapiEntity<T>[]>([]);
  const [error, setError] = useState<string | undefined>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${API_URL}/api/${endpoint}?populate=*`);
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        const json: StrapiData<T> = await response.json();
        setData(json.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error desconocido');
        setData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [endpoint]);

  return { data, error, loading };
}

// Hook específico para textos expandibles
export function useExpandableTexts(section?: string) {
  const endpoint = section 
    ? `expandable-texts?filters[section][$eq]=${section}`
    : 'expandable-texts';
  return useStrapi(endpoint);
}

// Hook específico para servicios
interface ServiceAttributes {
  title: string;
  description: string;
  expandedDescription: string;
  slug: string;
  image?: {
    data: {
      attributes: {
        url: string;
      };
    };
  };
}

export const useServices = () => {
  const [services, setServices] = useState<StrapiEntity<ServiceAttributes>[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const loadServices = async () => {
      try {
        const response = await fetch(`${API_URL}/api/services?populate=*`);
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        const json: StrapiData<ServiceAttributes> = await response.json();
        setServices(json.data);
      } catch (err) {
        console.error('Error fetching from Strapi:', err);
        // Usar datos de respaldo cuando Strapi no está disponible
        setServices([
          {
            id: 1,
            attributes: {
              title: "Acompañamiento en solicitudes de visa",
              description: "Te ayudamos con visas de trabajo, estudiantiles y familiares, asegurándonos de que tu solicitud cumpla con todos los requisitos.",
              expandedDescription: "Ya sea que necesites una visa de trabajo, estudiantil o familiar, te ayudaremos a completar tu solicitud correctamente. Te asistiremos en la recopilación de los documentos necesarios, en el llenado de los formularios requeridos y en su presentación de manera que aumenten tus probabilidades de éxito.",
              slug: "visas",
              image: {
                data: {
                  attributes: {
                    url: "/images/statue-of-liberty-267948_1280.jpg"
                  }
                }
              }
            }
          },
          {
            id: 2,
            attributes: {
              title: "Asistencia con la residencia permanente (Green Card)",
              description: "Te guiamos en cada paso para que obtengas tu residencia sin complicaciones.",
              expandedDescription: "Obtener la residencia permanente en los EE. UU. es un proceso largo y, en ocasiones, complicado. Como paralegal especializado en inmigración, te ayudaremos a completar tu solicitud de Green Card, asegurándonos de que todos los formularios estén correctamente llenados y presentados, y que cuentes con la documentación adecuada.",
              slug: "residencia",
              image: {
                data: {
                  attributes: {
                    url: "/images/america-1068986_1280.jpg"
                  }
                }
              }
            }
          },
          {
            id: 3,
            attributes: {
              title: "Naturalización",
              description: "Prepárate con nosotros para convertirte en ciudadano/a estadounidense.",
              expandedDescription: "Si ya tienes la residencia permanente y estás listo para dar el siguiente paso, te ayudaremos a completar el proceso de naturalización para convertirte en ciudadano/a estadounidense. Te apoyaremos en la preparación de tu solicitud, en la recopilación de los documentos necesarios y en la preparación para la entrevista de ciudadanía.",
              slug: "naturalizacion",
              image: {
                data: {
                  attributes: {
                    url: "/images/statue-of-liberty-992552_1280.jpg"
                  }
                }
              }
            }
          },
          {
            id: 4,
            attributes: {
              title: "Consultas sobre asilo afirmativo",
              description: "Te orientamos en el proceso de solicitud para que tu caso esté bien documentado.",
              expandedDescription: "Si buscas asilo o protección en los EE. UU., te ayudaremos a comprender los requisitos del proceso y a completar las solicitudes pertinentes. Juntos nos aseguraremos de que tu solicitud esté correctamente presentada y respaldada con la información adecuada.",
              slug: "asilo",
              image: {
                data: {
                  attributes: {
                    url: "/images/brooklyn-bridge-3717553_1280.jpg"
                  }
                }
              }
            }
          },
          {
            id: 5,
            attributes: {
              title: "Visa VAWA (Violence Against Women Act)",
              description: "Protegemos tu derecho a permanecer en EE.UU. si has sido víctima de abuso.",
              expandedDescription: "Es un recurso legal en los Estados Unidos diseñado para proteger a personas que han sido víctimas de abuso por parte de su cónyuge, padre/madre o hijo ciudadano estadounidense o residente legal. Este programa ofrece la oportunidad de solicitar protección y regularizar su estatus migratorio de manera independiente, sin necesidad de que el agresor participe en el proceso.",
              slug: "vawa",
              image: {
                data: {
                  attributes: {
                    url: "/images/statue-of-liberty-3551121_1280.jpg"
                  }
                }
              }
            }
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    loadServices();
  }, []);

  return { services, loading, error };
};

// Hook específico para testimonios
interface TestimonialAttributes {
  name: string;
  content: string;
  role?: string;
  image?: {
    data: {
      attributes: {
        url: string;
      };
    };
  };
}

export function useTestimonials() {
  const [testimonials, setTestimonials] = useState<StrapiEntity<TestimonialAttributes>[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const loadTestimonials = async () => {
      try {
        const response = await fetch(`${API_URL}/api/testimonials?populate=*`);
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        const json: StrapiData<TestimonialAttributes> = await response.json();
        setTestimonials(json.data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Error al cargar los testimonios'));
        setTestimonials([]);
      } finally {
        setLoading(false);
      }
    };

    loadTestimonials();
  }, []);

  return { testimonials, loading, error };
}

// Hook específico para FAQs
interface FAQAttributes {
  question: string;
  answer: string;
  category?: string;
}

export function useFAQs(category?: string) {
  const endpoint = category 
    ? `faqs?filters[category][$eq]=${category}`
    : 'faqs';
  return useStrapi<FAQAttributes>(endpoint);
} 