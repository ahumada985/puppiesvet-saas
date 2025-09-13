'use client';

import React, { useState, useEffect, useRef } from 'react';
import { chatbotAnalytics } from '../lib/chatbot-analytics';

interface FloatingChatbotProps {
  apiUrl?: string;
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
  theme?: 'default' | 'dark' | 'blue' | 'green';
}

export default function FloatingChatbot({ 
  apiUrl = '/api/chat',
  position = 'bottom-right',
  theme = 'default'
}: FloatingChatbotProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Array<{id: string, text: string, sender: 'user' | 'bot', timestamp: Date}>>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Generar ID de sesión único
  const sessionId = useRef(`session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Mostrar mensaje de bienvenida
  useEffect(() => {
    if (messages.length === 0) {
      const welcomeMessage = {
        id: 'welcome',
        text: '¡Hola! 👋 ¿En qué puedo ayudarte hoy?',
        sender: 'bot' as const,
        timestamp: new Date()
      };
      setMessages([welcomeMessage]);
    }
  }, []);

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const messageText = inputValue.trim();
    setInputValue('');
    
    // Agregar mensaje del usuario
    const userMessageObj = {
      id: `user_${Date.now()}`,
      text: messageText,
      sender: 'user' as const,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessageObj]);

    // Mostrar indicador de carga
    const loadingMessage = {
      id: `loading_${Date.now()}`,
      text: 'Escribiendo...',
      sender: 'bot' as const,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, loadingMessage]);
    setIsLoading(true);

    try {
      console.log('🚀 Iniciando llamada a la API...');
      console.log('📤 Mensaje:', messageText);
      console.log('🔗 URL:', apiUrl);
      
      // Iniciar medición de tiempo
      chatbotAnalytics.startTiming();

      // Llamar a la API del chatbot
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: messageText,
          session_id: sessionId.current,
          user_id: 'web_user'
        })
      });

      console.log('📊 Response status:', response.status);
      console.log('📊 Response ok:', response.ok);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ Error response:', errorText);
        throw new Error(`Error en la respuesta del servidor: ${response.status}`);
      }

      const data = await response.json();
      console.log('✅ Data recibida:', data);
      
      // Remover mensaje de carga
      setMessages(prev => prev.filter(msg => msg.id !== loadingMessage.id));

      // Agregar respuesta del bot
      const botMessage = {
        id: `bot_${Date.now()}`,
        text: data.response || 'Lo siento, no pude procesar tu mensaje.',
        sender: 'bot' as const,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);

      // Trackear en LangSmith con métricas
      const responseTime = chatbotAnalytics.endTiming();
      await chatbotAnalytics.trackConversationWithMetrics(
        messageText,
        botMessage.text,
        'web_user',
        'web'
      );

    } catch (error) {
      console.error('❌ ERROR COMPLETO:', error);
      console.error('❌ Error message:', error.message);
      console.error('❌ Error stack:', error.stack);
      
      // Remover mensaje de carga
      setMessages(prev => prev.filter(msg => msg.id !== loadingMessage.id));
      
      // Mostrar mensaje de error
      const errorMessage = {
        id: `error_${Date.now()}`,
        text: 'Lo siento, hubo un error. Inténtalo de nuevo.',
        sender: 'bot' as const,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
  };

  const getPositionClasses = () => {
    switch (position) {
      case 'bottom-left':
        return 'bottom-4 left-4';
      case 'top-right':
        return 'top-4 right-4';
      case 'top-left':
        return 'top-4 left-4';
      default:
        return 'bottom-4 right-4';
    }
  };

  const getThemeClasses = () => {
    switch (theme) {
      case 'dark':
        return 'bg-gray-800 text-white';
      case 'blue':
        return 'bg-blue-600 text-white';
      case 'green':
        return 'bg-green-600 text-white';
      default:
        return 'bg-gradient-to-r from-purple-500 to-pink-500 text-white';
    }
  };

  return (
    <>
      {/* Botón flotante */}
      <div 
        className={`fixed ${getPositionClasses()} z-50 cursor-pointer transition-all duration-300 hover:scale-110`}
        onClick={toggleChatbot}
        data-chatbot-button
      >
        <div className={`w-16 h-16 rounded-full ${getThemeClasses()} shadow-lg flex items-center justify-center relative`}>
          <div className="text-2xl">💬</div>
          {/* Animación de pulso */}
          <div className="absolute inset-0 rounded-full bg-white opacity-30 animate-ping"></div>
        </div>
      </div>

      {/* Widget del chatbot */}
      {isOpen && (
        <div className={`fixed ${getPositionClasses()} z-50 w-80 h-[500px] bg-white rounded-lg shadow-2xl border border-gray-200 flex flex-col transition-all duration-300`}>
          {/* Header */}
          <div className={`p-4 rounded-t-lg ${getThemeClasses()} flex justify-between items-center`}>
            <h3 className="text-lg font-semibold">Mente Autónoma</h3>
            <button 
              onClick={toggleChatbot}
              className="text-white hover:text-gray-200 text-xl font-bold"
            >
              ×
            </button>
          </div>

          {/* Mensajes */}
          <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
            <div className="space-y-3">
              {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-xs px-3 py-2 rounded-lg ${
                        message.sender === 'user'
                          ? 'bg-blue-500 text-white'
                          : 'bg-white text-gray-800 border border-gray-200'
                      }`}
                    >
                      <p className="text-sm">{message.text}</p>
                      <p className="text-xs opacity-70 mt-1">
                        {message.timestamp.toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Input */}
          <div className="p-4 border-t border-gray-200 bg-white rounded-b-lg">
            <div className="flex space-x-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Escribe tu mensaje..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                disabled={isLoading}
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputValue.trim() || isLoading}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  !inputValue.trim() || isLoading
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : `${getThemeClasses()} hover:opacity-90`
                }`}
              >
                {isLoading ? '⏳' : '📤'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
