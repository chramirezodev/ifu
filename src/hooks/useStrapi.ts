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
              title: 'Visa de Turista',
              description: 'Asistencia completa para obtener tu visa de turista.',
              expandedDescription: 'Te ayudamos con todo el proceso de solicitud de visa de turista, incluyendo preparación de documentos y asesoría personalizada.',
              slug: 'visa-turista'
            }
          },
          {
            id: 2,
            attributes: {
              title: 'Residencia Permanente',
              description: 'Proceso de residencia permanente en Estados Unidos.',
              expandedDescription: 'Guía completa para obtener tu residencia permanente, incluyendo todos los trámites necesarios y seguimiento de tu caso.',
              slug: 'residencia-permanente'
            }
          },
          {
            id: 3,
            attributes: {
              title: 'Ciudadanía',
              description: 'Proceso de naturalización y ciudadanía.',
              expandedDescription: 'Te acompañamos en todo el proceso de naturalización, desde la aplicación hasta la preparación para el examen de ciudadanía.',
              slug: 'ciudadania'
            }
          },
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