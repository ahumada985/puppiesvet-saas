'use client';

import React, { useState } from 'react';
import { langSmithTracker } from '../lib/langsmith';

interface FeedbackSystemProps {
  messageId: string;
  userMessage?: string;
  botResponse: string;
  userId: string;
  onFeedbackSubmitted?: (feedback: FeedbackData) => void;
}

interface FeedbackData {
  rating: number;
  comment: string;
  helpful: boolean;
  category: string;
}

export default function FeedbackSystem({ 
  messageId, 
  userMessage, 
  botResponse, 
  userId,
  onFeedbackSubmitted 
}: FeedbackSystemProps) {
  const [showFeedback, setShowFeedback] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [category, setCategory] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // No mostrar feedback si no hay userMessage
  if (!userMessage) {
    return null;
  }

  const handleSubmitFeedback = async () => {
    if (rating === 0) return;

    setIsSubmitting(true);

    const feedbackData: FeedbackData = {
      rating,
      comment,
      helpful: rating >= 4,
      category: category || 'general'
    };

    try {
      // Guardar en localStorage para análisis local (más confiable)
      const localFeedback = JSON.parse(localStorage.getItem('chatbot_feedback') || '[]');
      localFeedback.push({
        ...feedbackData,
        messageId,
        userMessage: userMessage || 'unknown',
        botResponse,
        timestamp: new Date().toISOString()
      });
      localStorage.setItem('chatbot_feedback', JSON.stringify(localFeedback));

      // Feedback guardado exitosamente - no necesitamos LangSmith para feedback
      console.log('✅ Feedback guardado:', feedbackData);

      onFeedbackSubmitted?.(feedbackData);
      setShowFeedback(false);
      
    } catch (error) {
      console.error('Error al enviar feedback:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!showFeedback) {
    return (
      <div className="flex items-center space-x-2 mt-2">
        <span className="text-xs text-gray-500">¿Te ayudó esta respuesta?</span>
        <button
          onClick={() => setShowFeedback(true)}
          className="text-xs text-blue-500 hover:text-blue-700 underline"
        >
          Calificar
        </button>
      </div>
    );
  }

  return (
    <div className="mt-3 p-3 bg-gray-50 rounded-lg border">
      <h4 className="text-sm font-medium text-gray-900 mb-2">Califica esta respuesta</h4>
      
      {/* Rating con estrellas */}
      <div className="flex items-center space-x-1 mb-3">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            onClick={() => setRating(star)}
            className={`text-lg ${
              star <= rating ? 'text-yellow-400' : 'text-gray-300'
            } hover:text-yellow-400 transition-colors`}
          >
            ★
          </button>
        ))}
        <span className="text-xs text-gray-500 ml-2">
          {rating > 0 && `${rating} estrella${rating > 1 ? 's' : ''}`}
        </span>
      </div>

      {/* Categoría */}
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="w-full text-xs border border-gray-300 rounded px-2 py-1 mb-2"
      >
        <option value="">Selecciona una categoría</option>
        <option value="informacion">Información</option>
        <option value="soporte">Soporte técnico</option>
        <option value="ventas">Ventas</option>
        <option value="general">General</option>
        <option value="otro">Otro</option>
      </select>

      {/* Comentario */}
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Comentario opcional..."
        className="w-full text-xs border border-gray-300 rounded px-2 py-1 mb-2 h-16 resize-none"
      />

      {/* Botones */}
      <div className="flex justify-end space-x-2">
        <button
          onClick={() => setShowFeedback(false)}
          className="text-xs text-gray-500 hover:text-gray-700"
        >
          Cancelar
        </button>
        <button
          onClick={handleSubmitFeedback}
          disabled={rating === 0 || isSubmitting}
          className={`text-xs px-3 py-1 rounded ${
            rating === 0 || isSubmitting
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-blue-500 text-white hover:bg-blue-600'
          }`}
        >
          {isSubmitting ? 'Enviando...' : 'Enviar'}
        </button>
      </div>
    </div>
  );
}
