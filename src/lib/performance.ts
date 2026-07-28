// Utilidades para optimización de rendimiento

export const preloadCriticalResources = () => {
  if (typeof window !== 'undefined') {
    // Preload fuentes críticas
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = 'https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&family=Cinzel:wght@400;600;700&display=swap';
    link.as = 'style';
    document.head.appendChild(link);

    // Preload imágenes críticas
    const criticalImages = [
      '/images/hero/slide1.jpg',
      '/images/hero/slide2.jpg',
      '/images/nosotros.png',
    ];

    criticalImages.forEach(src => {
      const imgLink = document.createElement('link');
      imgLink.rel = 'preload';
      imgLink.href = src;
      imgLink.as = 'image';
      document.head.appendChild(imgLink);
    });
  }
};

export const optimizeImages = {
  // Configuración de calidad de imagen
  quality: 80,
  // Formatos soportados
  formats: ['webp', 'avif', 'jpeg'],
  // Tamaños responsive
  sizes: {
    mobile: '(max-width: 768px) 100vw',
    tablet: '(max-width: 1024px) 50vw',
    desktop: '33vw',
  },
};

export const bundleOptimization = {
  // Chunks críticos para precargar
  criticalChunks: [
    'pages/_app',
    'pages/index',
    'components/layout/Layout',
  ],
  // Chunks que pueden cargarse de forma diferida
  lazyChunks: [
    'components/sections/FAQ',
    'components/sections/Testimonials',
    'components/forms/ContactForm',
  ],
};

// Función para medir Core Web Vitals
export const measureWebVitals = () => {
  if (typeof window !== 'undefined' && 'web-vital' in window) {
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(console.log);
      getFID(console.log);
      getFCP(console.log);
      getLCP(console.log);
      getTTFB(console.log);
    });
  }
};

// Función para optimizar animaciones
export const optimizeAnimations = {
  // Reducir animaciones en dispositivos con preferencia de movimiento reducido
  respectMotionPreference: () => {
    if (typeof window !== 'undefined') {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
      
      if (prefersReducedMotion.matches) {
        document.documentElement.style.setProperty('--animation-duration', '0.01ms');
        document.documentElement.style.setProperty('--animation-iteration-count', '1');
      }
    }
  },
};

// Función para optimizar scroll
export const optimizeScroll = {
  // Throttle scroll events
  throttle: (func: Function, delay: number) => {
    let timeoutId: NodeJS.Timeout;
    let lastExecTime = 0;
    return function (this: any, ...args: any[]) {
      const currentTime = Date.now();
      
      if (currentTime - lastExecTime > delay) {
        func.apply(this, args);
        lastExecTime = currentTime;
      } else {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          func.apply(this, args);
          lastExecTime = Date.now();
        }, delay - (currentTime - lastExecTime));
      }
    };
  },
};

// Configuración de Service Worker para cache
export const serviceWorkerConfig = {
  cacheName: 'immigration-for-us-v1',
  urlsToCache: [
    '/',
    '/contacto',
    '/servicios',
    '/testimonios',
    '/manifest.json',
  ],
  strategies: {
    images: 'cacheFirst',
    api: 'networkFirst',
    pages: 'staleWhileRevalidate',
  },
};

// Función para comprimir datos
export const compressData = {
  // Comprimir strings largos
  compressString: (str: string): string => {
    return str.replace(/\s+/g, ' ').trim();
  },
  
  // Optimizar objetos para localStorage
  optimizeForStorage: (data: any): string => {
    return JSON.stringify(data, (key, value) => {
      if (typeof value === 'string') {
        return value.length > 100 ? value.substring(0, 100) + '...' : value;
      }
      return value;
    });
  },
};
