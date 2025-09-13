'use client';

import { useEffect, useState } from 'react';

export default function PerformanceMonitor() {
  const [performanceData, setPerformanceData] = useState({
    loadTime: 0,
    domContentLoaded: 0,
    firstContentfulPaint: 0,
    largestContentfulPaint: 0,
    cumulativeLayoutShift: 0,
    firstInputDelay: 0,
  });

  const [errors, setErrors] = useState([]);
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    // Monitorear conectividad
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Monitorear performance
    if ('performance' in window) {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.entryType === 'navigation') {
            const navEntry = entry;
            setPerformanceData(prev => ({
              ...prev,
              loadTime: navEntry.loadEventEnd - navEntry.loadEventStart,
              domContentLoaded: navEntry.domContentLoadedEventEnd - navEntry.domContentLoadedEventStart,
            }));
          }
          
          if (entry.entryType === 'paint') {
            if (entry.name === 'first-contentful-paint') {
              setPerformanceData(prev => ({
                ...prev,
                firstContentfulPaint: entry.startTime,
              }));
            }
          }
          
          if (entry.entryType === 'largest-contentful-paint') {
            setPerformanceData(prev => ({
              ...prev,
              largestContentfulPaint: entry.startTime,
            }));
          }
          
          if (entry.entryType === 'layout-shift') {
            setPerformanceData(prev => ({
              ...prev,
              cumulativeLayoutShift: prev.cumulativeLayoutShift + entry.value,
            }));
          }
          
          if (entry.entryType === 'first-input') {
            setPerformanceData(prev => ({
              ...prev,
              firstInputDelay: entry.processingStart - entry.startTime,
            }));
          }
        }
      });

      observer.observe({ entryTypes: ['navigation', 'paint', 'largest-contentful-paint', 'layout-shift', 'first-input'] });

      return () => observer.disconnect();
    }

    // Monitorear errores
    const handleError = (event) => {
      const error = {
        message: event.message,
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno,
        error: event.error?.stack,
        timestamp: new Date().toISOString(),
      };
      
      setErrors(prev => [...prev, error]);
      
      // Enviar a servicio de monitoreo (ejemplo)
      sendErrorToMonitoring(error);
    };

    const handleUnhandledRejection = (event) => {
      const error = {
        message: 'Unhandled Promise Rejection',
        reason: event.reason,
        timestamp: new Date().toISOString(),
      };
      
      setErrors(prev => [...prev, error]);
      sendErrorToMonitoring(error);
    };

    window.addEventListener('error', handleError);
    window.addEventListener('unhandledrejection', handleUnhandledRejection);

    // Monitorear tiempo en página
    let startTime = Date.now();
    const interval = setInterval(() => {
      const timeOnPage = Math.floor((Date.now() - startTime) / 1000);
      if (timeOnPage % 30 === 0) { // Cada 30 segundos
        trackTimeOnPage(timeOnPage);
      }
    }, 1000);

    // Monitorear scroll
    let scrollTimeout;
    const handleScroll = () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        const scrollDepth = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
        trackScroll(scrollDepth);
      }, 150);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      window.removeEventListener('error', handleError);
      window.removeEventListener('unhandledrejection', handleUnhandledRejection);
      window.removeEventListener('scroll', handleScroll);
      clearInterval(interval);
      clearTimeout(scrollTimeout);
    };
  }, []);

  // Función para enviar errores a servicio de monitoreo
  const sendErrorToMonitoring = (error) => {
    // Aquí puedes integrar con servicios como Sentry, LogRocket, etc.
    console.log('Error enviado a monitoreo:', error);
    
    // Ejemplo con fetch a tu API
    // fetch('/api/monitoring/errors', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(error),
    // });
  };

  // Función para trackear tiempo en página
  const trackTimeOnPage = (seconds) => {
    // Integrar con Google Analytics u otro servicio
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'timing_complete', {
        event_category: 'engagement',
        event_label: 'time_on_page',
        value: seconds,
      });
    }
  };

  // Función para trackear scroll
  const trackScroll = (depth) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'scroll', {
        event_category: 'engagement',
        event_label: 'scroll_depth',
        value: depth,
      });
    }
  };

  // Función para obtener métricas de performance
  const getPerformanceMetrics = () => {
    const metrics = {
      loadTime: performanceData.loadTime,
      domContentLoaded: performanceData.domContentLoaded,
      firstContentfulPaint: performanceData.firstContentfulPaint,
      largestContentfulPaint: performanceData.largestContentfulPaint,
      cumulativeLayoutShift: performanceData.cumulativeLayoutShift,
      firstInputDelay: performanceData.firstInputDelay,
    };

    // Enviar métricas a servicio de monitoreo
    sendMetricsToMonitoring(metrics);
    
    return metrics;
  };

  // Función para enviar métricas a servicio de monitoreo
  const sendMetricsToMonitoring = (metrics) => {
    // Aquí puedes integrar con servicios como DataDog, New Relic, etc.
    console.log('Métricas enviadas a monitoreo:', metrics);
    
    // Ejemplo con fetch a tu API
    // fetch('/api/monitoring/metrics', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(metrics),
    // });
  };

  // Función para verificar uptime
  const checkUptime = async () => {
    try {
      const start = performance.now();
      const response = await fetch('/api/health', { method: 'GET' });
      const end = performance.now();
      
      const uptimeData = {
        status: response.status,
        responseTime: end - start,
        timestamp: new Date().toISOString(),
        isOnline: isOnline,
      };
      
      // Enviar datos de uptime
      sendUptimeToMonitoring(uptimeData);
      
      return uptimeData;
    } catch (error) {
      const uptimeData = {
        status: 'error',
        error: error.message,
        timestamp: new Date().toISOString(),
        isOnline: isOnline,
      };
      
      sendUptimeToMonitoring(uptimeData);
      return uptimeData;
    }
  };

  // Función para enviar datos de uptime
  const sendUptimeToMonitoring = (uptimeData) => {
    console.log('Datos de uptime enviados:', uptimeData);
    
    // Ejemplo con fetch a tu API
    // fetch('/api/monitoring/uptime', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(uptimeData),
    // });
  };

  // Verificar uptime cada 5 minutos
  useEffect(() => {
    const uptimeInterval = setInterval(checkUptime, 5 * 60 * 1000);
    
    // Verificación inicial
    checkUptime();
    
    return () => clearInterval(uptimeInterval);
  }, [isOnline]);

  return null; // Componente invisible
}

// Hook personalizado para usar el monitor
export const usePerformanceMonitor = () => {
  const [metrics, setMetrics] = useState(null);
  
  const getMetrics = () => {
    // Implementar lógica para obtener métricas
    return metrics;
  };
  
  const checkHealth = async () => {
    try {
      const response = await fetch('/api/health');
      return response.ok;
    } catch {
      return false;
    }
  };
  
  return { getMetrics, checkHealth };
};
