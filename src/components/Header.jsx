'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import ContactModal from './ContactModal';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isHeaderSticky, setIsHeaderSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsHeaderSticky(scrollPosition > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isHeaderSticky 
        ? 'bg-white border-b border-gray-200 shadow-sm text-gray-900' 
        : 'bg-transparent text-white'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo y Nombre de Marca - IZQUIERDA */}
          <div className="flex items-center space-x-3">
            <Image 
              src="/logo_final.png" 
              alt="Mente Autónoma" 
              width={48} 
              height={48} 
              className="object-contain"
            />
            <div>
              <h1 className={`text-xl font-bold ${isHeaderSticky ? 'text-gray-900' : 'text-white'}`}>Mente Autónoma</h1>
              <p className={`text-sm ${isHeaderSticky ? 'text-gray-600' : 'text-gray-300'}`}>Soluciones Digitales</p>
            </div>
          </div>
          
          {/* Menú de Navegación - CENTRO */}
          <nav className="hidden md:flex space-x-8">
            <Link href="/#servicios" className={`${isHeaderSticky ? 'text-gray-700 hover:text-blue-600' : 'text-white hover:text-blue-400'} px-4 py-2 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105`}>
              Servicios
            </Link>
            <Link href="/noticias" className={`${isHeaderSticky ? 'text-gray-700 hover:text-blue-600' : 'text-white hover:text-blue-400'} px-4 py-2 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105`}>
              Noticias
            </Link>
            <Link href="/#tecnologias" className={`${isHeaderSticky ? 'text-gray-700 hover:text-blue-600' : 'text-white hover:text-blue-400'} px-4 py-2 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105`}>
              Tecnologías
            </Link>
          </nav>
          
          {/* Botón CTA - DERECHA */}
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => setIsContactModalOpen(true)}
              className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-xl border-0 backdrop-blur-sm"
            >
              Contacto
            </button>
          </div>

          {/* Menú Móvil */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`${isHeaderSticky ? 'text-gray-700 hover:text-blue-600' : 'text-white hover:text-blue-400'} focus:outline-none`}
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Menú Móvil Desplegable */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-purple-800/50 rounded-lg mt-2">
              <Link 
                href="/#servicios" 
                className="block px-3 py-2 text-white hover:text-blue-400 rounded-md font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Servicios
              </Link>
              <Link 
                href="/noticias" 
                className="block px-3 py-2 text-white hover:text-blue-400 rounded-md font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Noticias
              </Link>
              <Link 
                href="/#tecnologias" 
                className="block px-3 py-2 text-white hover:text-blue-400 rounded-md font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Tecnologías
              </Link>
            </div>
          </div>
        )}
      </div>
      
      {/* Modal de Contacto */}
      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
        contactType="general"
      />
    </header>
  );
}
