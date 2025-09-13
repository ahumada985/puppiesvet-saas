'use client';

import { useState, useEffect } from 'react';
import { saveQuote } from '@/lib/supabase';

export default function QuoteForm({ selectedPlan = null, onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    projectType: selectedPlan || '',
    budget: '',
    timeline: '',
    description: '',
    features: [],
    additionalServices: ['Certificado SSL (Incluido)'] // SSL activado por defecto
  });

  const [status, setStatus] = useState('idle');
  const [message, setMessage] = useState('');

  // Detectar automáticamente el plan seleccionado
  useEffect(() => {
    if (selectedPlan) {
      setFormData(prev => ({
        ...prev,
        projectType: selectedPlan
      }));
    }
  }, [selectedPlan]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCheckboxChange = (name, value) => {
    setFormData(prev => ({
      ...prev,
      [name]: prev[name].includes(value)
        ? prev[name].filter(item => item !== value)
        : [...prev[name], value]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.projectType) {
      setStatus('error');
      setMessage('Por favor completa los campos obligatorios.');
      return;
    }

    setStatus('loading');
    setMessage('Enviando cotización...');

    try {
      // Guardar en Supabase
      const result = await saveQuote(formData);
      
      if (result.success) {
        setStatus('success');
        setMessage('¡Cotización enviada exitosamente! Te contactaremos en las próximas 24 horas.');
        
        // Resetear formulario después de 3 segundos
        setTimeout(() => {
          setFormData({
            name: '',
            email: '',
            company: '',
            phone: '',
            projectType: '',
            budget: '',
            timeline: '',
            description: '',
            features: [],
            additionalServices: ['Certificado SSL (Incluido)'] // SSL activado por defecto
          });
          setStatus('idle');
          setMessage('');
          if (onClose) onClose();
        }, 3000);
      } else {
        throw new Error(result.error);
      }
      
    } catch (error) {
      setStatus('error');
      setMessage('Error al enviar la cotización. Por favor intenta nuevamente.');
      console.error('Error:', error);
    }
  };

  const getProjectTypeLabel = (type) => {
    const labels = {
      'wp-landing': 'Landing Page WordPress',
      'wp-website': 'Sitio Web WordPress',
      'wp-advanced': 'Sitio Web Avanzado WordPress',
      'modern-landing': 'Landing Page Moderna',
      'modern-landing-db': 'Landing Page + Base de Datos',
      'modern-webapp': 'Web App Moderna',
      'modern-webapp-db': 'Web App + Base de Datos',
      'modern-advanced': 'Web App Avanzada',
      'modern-advanced-db': 'Web App Avanzada + BD Compleja',
      'custom': 'Proyecto Personalizado'
    };
    return labels[type] || type;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-8">
          {/* Header */}
          <div className="flex justify-between items-start mb-8">
            <div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">
                Solicitar Cotización
              </h3>
              <p className="text-gray-600">
                {selectedPlan ? `Plan: ${getProjectTypeLabel(selectedPlan)}` : 'Cuéntanos sobre tu proyecto'}
              </p>
            </div>
            <button 
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 text-3xl font-bold transition-colors duration-200"
            >
              ×
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Información Personal */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Nombre Completo *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Empresa
                </label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Teléfono
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                />
              </div>
            </div>

            {/* Tipo de Proyecto */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Tipo de Proyecto *
              </label>
              <select
                name="projectType"
                value={formData.projectType}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                required
              >
                <option value="">Selecciona un tipo de proyecto</option>
                <optgroup label="WordPress">
                  <option value="wp-landing">Landing Page WordPress</option>
                  <option value="wp-website">Sitio Web WordPress</option>
                  <option value="wp-advanced">Sitio Web Avanzado WordPress</option>
                </optgroup>
                <optgroup label="Tecnologías Modernas">
                  <option value="modern-landing">Landing Page Moderna</option>
                  <option value="modern-landing-db">Landing Page + Base de Datos</option>
                  <option value="modern-webapp">Web App Moderna</option>
                  <option value="modern-webapp-db">Web App + Base de Datos</option>
                  <option value="modern-advanced">Web App Avanzada</option>
                  <option value="modern-advanced-db">Web App Avanzada + BD Compleja</option>
                </optgroup>
                <option value="custom">Proyecto Personalizado</option>
              </select>
            </div>

            {/* Presupuesto y Timeline */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Presupuesto Estimado
                </label>
                <select
                  name="budget"
                  value={formData.budget}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                >
                  <option value="">Selecciona un rango</option>
                  <option value="100k-300k">$100.000 - $300.000</option>
                  <option value="300k-500k">$300.000 - $500.000</option>
                  <option value="500k-1M">$500.000 - $1.000.000</option>
                  <option value="1M-2M">$1.000.000 - $2.000.000</option>
                  <option value="2M+">Más de $2.000.000</option>
                  <option value="evaluar">Sujeto a evaluación</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Timeline Deseado
                </label>
                <select
                  name="timeline"
                  value={formData.timeline}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                >
                  <option value="">Selecciona un timeline</option>
                  <option value="urgent">Urgente (1-2 semanas)</option>
                  <option value="fast">Rápido (1 mes)</option>
                  <option value="normal">Normal (2-3 meses)</option>
                  <option value="flexible">Flexible (3+ meses)</option>
                </select>
              </div>
            </div>

            {/* Descripción del Proyecto */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Descripción del Proyecto *
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={4}
                placeholder="Describe tu proyecto, objetivos, público objetivo y cualquier requisito específico..."
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
                required
              />
            </div>

            {/* Características Adicionales */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Características Adicionales
              </label>
              <div className="grid md:grid-cols-2 gap-3">
                {[
                  'E-commerce / Tienda Online',
                  'Sistema de Usuarios',
                  'Panel de Administración',
                  'Integración con APIs',
                  'Sistema de Pagos',
                  'Newsletter / Email Marketing',
                  'Blog / CMS',
                  'SEO Avanzado',
                  'Analytics y Reportes',
                  'Móvil First / Responsive',
                  'PWA (Progressive Web App)',
                  'Multiidioma'
                ].map((feature) => (
                  <label key={feature} className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.features.includes(feature)}
                      onChange={() => handleCheckboxChange('features', feature)}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700">{feature}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Servicios Adicionales */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Servicios Adicionales
              </label>
              <div className="grid md:grid-cols-2 gap-3">
                {[
                  'Hosting y Dominio',
                                     'Certificado SSL (Incluido)',
                  'Mantenimiento Mensual',
                  'Capacitación del Equipo',
                  'Soporte Técnico Extendido',
                  'Backup Automático',
                  'Monitoreo de Seguridad',
                  'Optimización de Rendimiento'
                ].map((service) => (
                  <label key={service} className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.additionalServices.includes(service)}
                      onChange={() => handleCheckboxChange('additionalServices', service)}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700">{service}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Mensaje de Estado */}
            {message && (
              <div className={`p-4 rounded-xl text-sm ${
                status === 'success' 
                  ? 'bg-green-50 text-green-700 border border-green-200' 
                  : 'bg-red-50 text-red-700 border border-red-200'
              }`}>
                {message}
              </div>
            )}

            {/* Botones */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <button
                type="submit"
                disabled={status === 'loading'}
                className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === 'loading' ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Enviando...
                  </span>
                ) : (
                  '🚀 Enviar Cotización'
                )}
              </button>
              
              <button
                type="button"
                onClick={onClose}
                className="flex-1 border-2 border-gray-300 text-gray-700 py-4 rounded-xl font-semibold text-lg hover:border-gray-400 hover:bg-gray-50 transition-all duration-300"
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
