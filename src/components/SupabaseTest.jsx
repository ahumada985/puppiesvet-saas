'use client';

import { useState, useEffect } from 'react';
import { supabase, saveLead, saveQuote, saveNewsletterSubscription } from '@/lib/supabase';

export default function SupabaseTest() {
  const [testResult, setTestResult] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [envVars, setEnvVars] = useState({});

  useEffect(() => {
    // Verificar variables de entorno al cargar
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    
    setEnvVars({
      url: url ? '✅ Configurada' : '❌ No configurada',
      key: key ? '✅ Configurada' : '❌ No configurada',
      urlValue: url ? `${url.substring(0, 20)}...` : 'No disponible',
      keyValue: key ? `${key.substring(0, 20)}...` : 'No disponible'
    });
  }, []);

  const testConnection = async () => {
    setIsLoading(true);
    setTestResult('Probando conexión...');
    
    try {
      // Verificar variables de entorno
      const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
      const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
      
      if (!url || !key) {
        setTestResult('❌ ERROR: Variables de entorno no disponibles');
        return;
      }

      // Probar conexión simple
      const { data, error } = await supabase
        .from('leads')
        .select('count')
        .limit(1);

      if (error) {
        setTestResult(`❌ ERROR de conexión: ${error.message}`);
      } else {
        setTestResult('✅ CONEXIÓN EXITOSA con Supabase');
      }
    } catch (error) {
      setTestResult(`❌ ERROR: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const testSaveLead = async () => {
    setIsLoading(true);
    setTestResult('Probando guardado de lead...');
    
    try {
      const result = await saveLead({
        email: 'test@example.com',
        name: 'Usuario Test',
        company: 'Empresa Test',
        phone: '123456789',
        source: 'test-component'
      });

      if (result.success) {
        setTestResult('✅ LEAD guardado exitosamente');
      } else {
        setTestResult(`❌ ERROR al guardar lead: ${result.error}`);
      }
    } catch (error) {
      setTestResult(`❌ ERROR: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const testSaveNewsletter = async () => {
    setIsLoading(true);
    setTestResult('Probando suscripción newsletter...');
    
    try {
      const result = await saveNewsletterSubscription('test@example.com');

      if (result.success) {
        setTestResult('✅ NEWSLETTER suscrito exitosamente');
      } else {
        setTestResult(`❌ ERROR al suscribir newsletter: ${result.error}`);
      }
    } catch (error) {
      setTestResult(`❌ ERROR: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 bg-white p-4 rounded-lg shadow-lg border border-gray-200 z-50 max-w-sm">
      <h3 className="font-bold text-gray-800 mb-2">🔍 Test Supabase</h3>
      
      {/* Variables de Entorno */}
      <div className="mb-3 text-xs">
        <div className="mb-1">
          <strong>URL:</strong> {envVars.url}
        </div>
        <div className="mb-1">
          <strong>KEY:</strong> {envVars.key}
        </div>
      </div>

      {/* Botones de Prueba */}
      <div className="space-y-2">
        <button
          onClick={testConnection}
          disabled={isLoading}
          className="w-full bg-blue-500 text-white px-3 py-2 rounded hover:bg-blue-600 disabled:opacity-50 text-sm"
        >
          {isLoading ? 'Probando...' : '🔌 Probar Conexión'}
        </button>
        
        <button
          onClick={testSaveLead}
          disabled={isLoading}
          className="w-full bg-green-500 text-white px-3 py-2 rounded hover:bg-green-600 disabled:opacity-50 text-sm"
        >
          {isLoading ? 'Probando...' : '💾 Probar Guardar Lead'}
        </button>
        
        <button
          onClick={testSaveNewsletter}
          disabled={isLoading}
          className="w-full bg-purple-500 text-white px-3 py-2 rounded hover:bg-purple-600 disabled:opacity-50 text-sm"
        >
          {isLoading ? 'Probando...' : '📧 Probar Newsletter'}
        </button>
      </div>

      {/* Resultado */}
      {testResult && (
        <div className="mt-3 p-2 bg-gray-100 rounded text-xs text-gray-700">
          {testResult}
        </div>
      )}
    </div>
  );
}
