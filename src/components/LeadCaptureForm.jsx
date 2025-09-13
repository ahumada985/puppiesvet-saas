'use client';

import { useState, useEffect } from 'react';
import { validateEmail } from '@/lib/antiSpam';
import { saveLead } from '@/lib/supabase';

export default function LeadCaptureForm({ 
  title = "¡Únete a la Revolución IA!", 
  subtitle = "Recibe estrategias exclusivas y el PDF con las 30 mejores ideas para aplicar IA en tu negocio",
  buttonText = "Suscribirse Gratis + PDF",
  showNewsletter = true,
  showPDF = true,
  useOriginalStyle = false,
  compact = false
}) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: ''
  });
  const [status, setStatus] = useState('idle'); // idle, loading, success, error
  const [message, setMessage] = useState('');
  const [honeypot, setHoneypot] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Verificar honeypot (si se llenó, es un bot)
    if (honeypot) {
      console.log('Bot detectado por honeypot');
      setStatus('error');
      setMessage('Solicitud rechazada por seguridad');
      return;
    }
    
    if (!formData.email || !formData.email.includes('@')) {
      setStatus('error');
      setMessage('Por favor ingresa un email válido');
      return;
    }

    if (!formData.name || formData.name.trim().length < 2) {
      setStatus('error');
      setMessage('Por favor ingresa tu nombre completo');
      return;
    }

    setStatus('loading');
    setMessage('');

    try {
      console.log('🔍 Iniciando envío de lead...');
      console.log('📧 Datos:', formData);
      
      // Validación del email
      const validation = validateEmail(formData.email);
      
      if (!validation.valid) {
        setStatus('error');
        setMessage(validation.reason);
        return;
      }

      console.log('✅ Email válido, guardando en Supabase...');

      // Guardar lead en Supabase
      const result = await saveLead({
        email: formData.email,
        name: formData.name,
        company: formData.company || 'No especificado',
        phone: 'No especificado',
        source: 'website-cta'
      });

      console.log('📊 Resultado de Supabase:', result);

      if (result.success) {
        setStatus('success');
        setMessage('¡Gracias! Tu email ha sido registrado exitosamente.');
        setFormData({ name: '', email: '', company: '' });
        console.log('✅ Lead guardado exitosamente');
      } else {
        console.error('❌ Error al guardar lead:', result.error);
        throw new Error(result.error);
      }
      
    } catch (error) {
      console.error('💥 Error completo:', error);
      setStatus('error');
      setMessage(`Error: ${error.message || 'Error de conexión. Por favor verifica tu internet.'}`);
    }
  };

  const getStatusStyles = () => {
    switch (status) {
      case 'success':
        return 'border-green-500 bg-green-50 text-green-700';
      case 'error':
        return 'border-red-500 bg-red-50 text-red-700';
      case 'loading':
        return 'border-blue-500 bg-blue-50 text-blue-700';
      default:
        return 'border-gray-300 bg-white';
    }
  };

  const getButtonStyles = () => {
    if (useOriginalStyle) {
      return 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl';
    }
    
    if (compact) {
      return 'bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200 text-sm';
    }
    
    return 'bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg';
  };

  return (
    <div className={`max-w-md mx-auto ${compact ? 'p-4' : 'p-6'} bg-white rounded-xl shadow-lg`}>
      <div className="text-center mb-6">
        <h3 className={`font-bold ${compact ? 'text-lg' : 'text-xl'} text-gray-800 mb-2`}>
          {title}
        </h3>
        <p className={`text-gray-600 ${compact ? 'text-sm' : 'text-base'}`}>
          {subtitle}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Campo honeypot oculto */}
        <input
          type="text"
          name="website"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
          className="absolute left-[-9999px]"
          tabIndex="-1"
          autoComplete="off"
        />

        <div>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Tu nombre completo"
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${getStatusStyles()}`}
            required
            disabled={status === 'loading'}
          />
        </div>

        <div>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Tu email aquí..."
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${getStatusStyles()}`}
            required
            disabled={status === 'loading'}
          />
        </div>

        <div>
          <input
            type="text"
            name="company"
            value={formData.company}
            onChange={handleInputChange}
            placeholder="Tu empresa (opcional)"
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${getStatusStyles()}`}
            disabled={status === 'loading'}
          />
        </div>

        {message && (
          <div className={`p-3 rounded-lg text-sm ${getStatusStyles()}`}>
            {message}
          </div>
        )}

        <button
          type="submit"
          disabled={status === 'loading'}
          className={`w-full ${getButtonStyles()} disabled:opacity-50 disabled:cursor-not-allowed`}
        >
          {status === 'loading' ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Procesando...
            </span>
          ) : (
            buttonText
          )}
        </button>

        {showNewsletter && (
          <p className="text-xs text-gray-500 text-center">
            Al suscribirte, aceptas recibir emails con contenido relevante. Puedes cancelar en cualquier momento.
          </p>
        )}

        {showPDF && (
          <div className="text-center">
            <a
              href="#"
              className="text-blue-600 hover:text-blue-800 text-sm underline"
              onClick={(e) => {
                e.preventDefault();
                alert('PDF descargado (simulado)');
              }}
            >
              📥 Descargar PDF Gratis
            </a>
          </div>
        )}
      </form>
    </div>
  );
}
