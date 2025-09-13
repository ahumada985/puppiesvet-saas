'use client';

import { useEffect } from 'react';

export default function Accessibility() {
  useEffect(() => {
    // Mejorar navegación por teclado
    const handleKeyDown = (event) => {
      // Skip to main content con Alt + M
      if (event.altKey && event.key === 'm') {
        const mainContent = document.querySelector('main') || document.querySelector('#main-content');
        if (mainContent) {
          mainContent.focus();
          mainContent.scrollIntoView({ behavior: 'smooth' });
        }
      }
      
      // Skip to navigation con Alt + N
      if (event.altKey && event.key === 'n') {
        const navigation = document.querySelector('nav') || document.querySelector('header');
        if (navigation) {
          navigation.focus();
        }
      }
      
      
    };

    // Agregar ARIA labels a elementos importantes
    const addAriaLabels = () => {
      // Botones sin texto
      const buttons = document.querySelectorAll('button:not([aria-label]):not([aria-labelledby])');
      buttons.forEach((button, index) => {
        if (!button.textContent.trim()) {
          button.setAttribute('aria-label', `Botón ${index + 1}`);
        }
      });

      // Imágenes sin alt
      const images = document.querySelectorAll('img:not([alt])');
      images.forEach((img, index) => {
        if (!img.alt) {
          img.setAttribute('alt', `Imagen ${index + 1}`);
        }
      });

      // Links sin texto descriptivo
      const links = document.querySelectorAll('a:not([aria-label]):not([aria-labelledby])');
      links.forEach((link, index) => {
        if (!link.textContent.trim() || link.textContent.trim().length < 3) {
          link.setAttribute('aria-label', `Enlace ${index + 1}`);
        }
      });
    };

    // Mejorar contraste de colores
    const improveColorContrast = () => {
      const elements = document.querySelectorAll('*');
      elements.forEach((element) => {
        const style = window.getComputedStyle(element);
        const backgroundColor = style.backgroundColor;
        const color = style.color;
        
        // Aquí podrías implementar lógica para verificar contraste
        // y ajustar automáticamente si es necesario
      });
    };

    // Agregar skip links
    const addSkipLinks = () => {
      if (!document.querySelector('.skip-links')) {
        const skipLinks = document.createElement('div');
        skipLinks.className = 'skip-links';
        skipLinks.innerHTML = `
          <a href="#main-content" class="skip-link">Saltar al contenido principal</a>
          <a href="#navigation" class="skip-link">Saltar a la navegación</a>
        `;
        
        // Estilos para skip links
        const style = document.createElement('style');
        style.textContent = `
          .skip-links {
            position: absolute;
            top: -40px;
            left: 6px;
            z-index: 1000;
          }
          .skip-link {
            position: absolute;
            top: -40px;
            left: 6px;
            background: #000;
            color: #fff;
            padding: 8px;
            text-decoration: none;
            border-radius: 4px;
            transition: top 0.3s;
          }
          .skip-link:focus {
            top: 6px;
          }
        `;
        
        document.head.appendChild(style);
        document.body.insertBefore(skipLinks, document.body.firstChild);
      }
    };

    // Agregar landmarks ARIA
    const addAriaLandmarks = () => {
      // Header
      const header = document.querySelector('header');
      if (header && !header.getAttribute('role')) {
        header.setAttribute('role', 'banner');
      }

      // Navigation
      const nav = document.querySelector('nav');
      if (nav && !nav.getAttribute('role')) {
        nav.setAttribute('role', 'navigation');
        nav.setAttribute('aria-label', 'Navegación principal');
      }

      // Main content
      const main = document.querySelector('main') || document.querySelector('#main-content');
      if (main && !main.getAttribute('role')) {
        main.setAttribute('role', 'main');
        main.setAttribute('id', 'main-content');
      }

      // Footer
      const footer = document.querySelector('footer');
      if (footer && !footer.getAttribute('role')) {
        footer.setAttribute('role', 'contentinfo');
        footer.setAttribute('id', 'footer');
      }

      // Aside
      const aside = document.querySelector('aside');
      if (aside && !aside.getAttribute('role')) {
        aside.setAttribute('role', 'complementary');
      }
    };

    // Agregar estados ARIA
    const addAriaStates = () => {
      // Botones de menú
      const menuButtons = document.querySelectorAll('[aria-expanded]');
      menuButtons.forEach(button => {
        button.addEventListener('click', () => {
          const currentState = button.getAttribute('aria-expanded');
          button.setAttribute('aria-expanded', currentState === 'true' ? 'false' : 'true');
        });
      });

      // Modales
      const modals = document.querySelectorAll('[role="dialog"]');
      modals.forEach(modal => {
        if (!modal.getAttribute('aria-modal')) {
          modal.setAttribute('aria-modal', 'true');
        }
      });
    };

    // Agregar navegación por teclado mejorada
    const improveKeyboardNavigation = () => {
      // Focus visible para todos los elementos interactivos
      const interactiveElements = document.querySelectorAll('button, a, input, textarea, select, [tabindex]');
      interactiveElements.forEach(element => {
        element.addEventListener('focus', () => {
          element.classList.add('focus-visible');
        });
        
        element.addEventListener('blur', () => {
          element.classList.remove('focus-visible');
        });
      });
    };

    // Ejecutar todas las mejoras
    addSkipLinks();
    addAriaLandmarks();
    addAriaStates();
    addAriaLabels();
    improveColorContrast();
    improveKeyboardNavigation();

    // Event listeners
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return null; // Componente invisible
}

// Hook para usar funcionalidades de accesibilidad
export const useAccessibility = () => {
  const announceToScreenReader = (message) => {
    // Crear elemento para anuncios a lectores de pantalla
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.textContent = message;
    
    document.body.appendChild(announcement);
    
    // Remover después de un tiempo
    setTimeout(() => {
      if (announcement.parentNode) {
        announcement.parentNode.removeChild(announcement);
      }
    }, 1000);
  };

  const focusFirstInteractiveElement = () => {
    const interactiveElements = document.querySelectorAll('button, a, input, textarea, select, [tabindex]:not([tabindex="-1"])');
    if (interactiveElements.length > 0) {
      interactiveElements[0].focus();
    }
  };

  const trapFocus = (container) => {
    const focusableElements = container.querySelectorAll('button, a, input, textarea, select, [tabindex]:not([tabindex="-1"])');
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    container.addEventListener('keydown', (e) => {
      if (e.key === 'Tab') {
        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    });
  };

  return {
    announceToScreenReader,
    focusFirstInteractiveElement,
    trapFocus,
  };
};
