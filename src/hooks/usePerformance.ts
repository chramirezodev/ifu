import { useEffect, useState, useCallback } from 'react';

interface PerformanceMetrics {
  loadTime: number;
  renderTime: number;
  memoryUsage?: number;
}

export const usePerformance = () => {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    loadTime: 0,
    renderTime: 0,
  });
  const [isSlowConnection, setIsSlowConnection] = useState(false);

  useEffect(() => {
    // Medir tiempo de carga
    const measureLoadTime = () => {
      if (typeof window !== 'undefined' && window.performance) {
        const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
        const loadTime = navigation.loadEventEnd - navigation.fetchStart;
        setMetrics(prev => ({ ...prev, loadTime }));
      }
    };

    // Detectar conexión lenta
    const checkConnectionSpeed = () => {
      if ('connection' in navigator) {
        const connection = (navigator as any).connection;
        const slowConnections = ['slow-2g', '2g'];
        setIsSlowConnection(slowConnections.includes(connection.effectiveType));
      }
    };

    // Medir uso de memoria
    const measureMemory = () => {
      if ('memory' in performance) {
        const memory = (performance as any).memory;
        setMetrics(prev => ({ 
          ...prev, 
          memoryUsage: memory.usedJSHeapSize / memory.jsHeapSizeLimit 
        }));
      }
    };

    measureLoadTime();
    checkConnectionSpeed();
    measureMemory();

    // Medir tiempo de renderizado de componentes
    const startRenderTime = performance.now();
    setMetrics(prev => ({ ...prev, renderTime: startRenderTime }));
  }, []);

  // Función para optimizar según la conexión
  const optimizeForConnection = useCallback(() => {
    if (isSlowConnection) {
      // Reducir calidad de imágenes
      return {
        imageQuality: 60,
        enableLazyLoading: true,
        reduceAnimations: true,
      };
    }
    return {
      imageQuality: 80,
      enableLazyLoading: true,
      reduceAnimations: false,
    };
  }, [isSlowConnection]);

  // Función para precargar recursos críticos
  const preloadCriticalResources = useCallback(() => {
    if (typeof window !== 'undefined') {
      const criticalResources = [
        '/images/hero/slide1.jpg',
        '/images/nosotros.png',
        '/images/Logos/logo.png',
      ];

      criticalResources.forEach(src => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = src;
        link.as = 'image';
        document.head.appendChild(link);
      });
    }
  }, []);

  // Función para optimizar scroll
  const optimizeScroll = useCallback((callback: Function, delay = 16) => {
    let timeoutId: NodeJS.Timeout;
    return (...args: any[]) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => callback(...args), delay);
    };
  }, []);

  return {
    metrics,
    isSlowConnection,
    optimizeForConnection,
    preloadCriticalResources,
    optimizeScroll,
  };
};

// Hook para lazy loading optimizado
export const useLazyLoading = (threshold = 0.1) => {
  const [isVisible, setIsVisible] = useState(false);
  const [ref, setRef] = useState<HTMLElement | null>(null);

  useEffect(() => {
    if (!ref) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold,
        rootMargin: '50px',
      }
    );

    observer.observe(ref);

    return () => observer.disconnect();
  }, [ref, threshold]);

  return [setRef, isVisible] as const;
};

// Hook para optimizar animaciones
export const useOptimizedAnimations = () => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const getAnimationProps = useCallback((defaultProps: any) => {
    if (prefersReducedMotion) {
      return {
        ...defaultProps,
        transition: { duration: 0.01 },
        animate: { ...defaultProps.animate, opacity: 1 },
      };
    }
    return defaultProps;
  }, [prefersReducedMotion]);

  return { prefersReducedMotion, getAnimationProps };
};
