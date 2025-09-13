'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

// ID de Google Analytics (reemplazar con el tuyo)
const GA_TRACKING_ID = 'G-M0L8D041W7'; // ID correcto de Google Analytics

export default function GoogleAnalytics() {
  const pathname = usePathname();

  useEffect(() => {
    // Cargar Google Analytics
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('config', GA_TRACKING_ID, {
        page_path: pathname,
      });
    }
  }, [pathname]);

  useEffect(() => {
    // Script de Google Analytics
    const script1 = document.createElement('script');
    script1.async = true;
    script1.src = `https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`;
    
    const script2 = document.createElement('script');
    script2.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${GA_TRACKING_ID}', {
        page_title: document.title,
        page_location: window.location.href,
      });
    `;

    document.head.appendChild(script1);
    document.head.appendChild(script2);

    return () => {
      document.head.removeChild(script1);
      document.head.removeChild(script2);
    };
  }, []);

  return null;
}

// Función para trackear eventos personalizados
export const trackEvent = (action, category, label, value) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

// Función para trackear conversiones
export const trackConversion = (conversionId, conversionLabel) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'conversion', {
      send_to: `${conversionId}/${conversionLabel}`,
    });
  }
};

// Función para trackear scroll
export const trackScroll = (depth) => {
  trackEvent('scroll', 'engagement', 'scroll_depth', depth);
};

// Función para trackear tiempo en página
export const trackTimeOnPage = (seconds) => {
  trackEvent('timing_complete', 'engagement', 'time_on_page', seconds);
};

// Función para trackear clics en botones
export const trackButtonClick = (buttonName, page) => {
  trackEvent('click', 'button', buttonName, page);
};

// Función para trackear formularios
export const trackFormSubmission = (formName, success) => {
  trackEvent('form_submit', 'form', formName, success ? 1 : 0);
};
