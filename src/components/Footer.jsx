'use client';

import { useState } from 'react';
import Link from 'next/link';
import { saveNewsletterSubscription } from '@/lib/supabase';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [newsletterStatus, setNewsletterStatus] = useState('idle');

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    setNewsletterStatus('loading');

    try {
      const result = await saveNewsletterSubscription(email);
      if (result.success) {
        setNewsletterStatus('success');
        setEmail('');
        setTimeout(() => setNewsletterStatus('idle'), 3000);
      } else {
        setNewsletterStatus('error');
        setTimeout(() => setNewsletterStatus('idle'), 3000);
      }
    } catch (error) {
      setNewsletterStatus('error');
      setTimeout(() => setNewsletterStatus('idle'), 3000);
    }
  };

  return (
    <footer className="bg-gradient-to-r from-purple-900 via-purple-800 to-blue-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Columna 1 - Mente Autónoma */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              {/* Logo original sin modificaciones */}
              <img 
                src="/logo_final.png" 
                alt="Mente Autónoma" 
                className="w-12 h-12 object-contain"
              />
              <div>
                <h1 className="text-xl font-bold">Mente Autónoma</h1>
              </div>
            </div>
            <p className="text-gray-300 leading-relaxed">
              Transformando empresas con inteligencia artificial de vanguardia. Hacemos que la IA sea accesible para todos los negocios.
            </p>
          </div>

          {/* Columna 2 - Nuestros Servicios */}
          <div className="space-y-6">
            <h4 className="text-xl font-bold text-white">Nuestros Servicios</h4>
            <div className="grid grid-cols-2 gap-3">
              {/* Columna 1 */}
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  <span className="text-sm text-gray-300">Chatbot</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-sm text-gray-300">Diseño Web</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-gray-300">Automatización</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span className="text-sm text-gray-300">Marketing Digital</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                  <span className="text-sm text-gray-300">Secretario IA</span>
                </div>
              </div>
              
              {/* Columna 2 */}
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
                  <span className="text-sm text-gray-300">Contenido RRSS</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <span className="text-sm text-gray-300">Módulo</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-cyan-500 rounded-full"></div>
                  <span className="text-sm text-gray-300">SEO</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-indigo-600 rounded-full"></div>
                  <span className="text-sm text-gray-300">SAAS/BAAS</span>
                </div>
              </div>
            </div>
          </div>

          {/* Columna 3 - Newsletter */}
          <div className="space-y-6">
            <h4 className="text-xl font-bold text-white">Newsletter</h4>
            <p className="text-gray-300 leading-relaxed">
              Recibe las últimas noticias sobre IA y estrategias para tu negocio
            </p>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <form onSubmit={handleNewsletterSubmit} className="space-y-4">
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Tu email aquí..."
                    className="w-full px-4 py-3 bg-white/90 backdrop-blur-sm border-0 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-transparent text-sm shadow-lg"
                    required
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m6.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                    </svg>
                  </div>
                </div>
                <button 
                  type="submit"
                  disabled={newsletterStatus === 'loading'}
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-300 transform hover:scale-105 shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  {newsletterStatus === 'loading' ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Suscribiendo...
                    </>
                  ) : (
                    <>
                      <span>🚀</span>
                      <span>Suscribirse Ahora</span>
                    </>
                  )}
                </button>
                <p className="text-xs text-gray-400 text-center leading-relaxed">
                  Al suscribirte, aceptas recibir emails con contenido relevante. 
                  Puedes cancelar en cualquier momento.
                </p>
              </form>
              
              {newsletterStatus === 'success' && (
                <div className="mt-4 p-3 bg-green-500/20 border border-green-500/30 rounded-lg">
                  <p className="text-green-400 text-xs text-center font-medium">
                    ✅ ¡Gracias! Te has suscrito exitosamente.
                  </p>
                </div>
              )}
              {newsletterStatus === 'error' && (
                <div className="mt-4 p-3 bg-red-500/20 border border-red-500/30 rounded-lg">
                  <p className="text-red-400 text-xs text-center font-medium">
                    ❌ Por favor ingresa un email válido.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Línea separadora */}
        <div className="border-t border-white/20 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2025 Mente Autónoma. Todos los derechos reservados. 
              <span className="text-emerald-400"> Construido con ❤️ y profesionalismo.</span>
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="/privacidad" className="text-gray-400 hover:text-white text-sm transition-colors duration-200">
                Privacidad
              </Link>
              <Link href="/terminos" className="text-gray-400 hover:text-white text-sm transition-colors duration-200">
                Términos
              </Link>
              <Link href="/cookies" className="text-gray-400 hover:text-white text-sm transition-colors duration-200">
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
