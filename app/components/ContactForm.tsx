'use client';

import { useState } from 'react';
import { useLanguage } from '@/app/context/LanguageContext';

interface FormStatus {
  type: 'idle' | 'loading' | 'success' | 'error';
  message?: string;
}

export function ContactForm() {
  const { t, language } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState<FormStatus>({ type: 'idle' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus({ type: 'loading' });

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          language
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Error al enviar el mensaje');
      }

      setStatus({
        type: 'success',
        message: language === 'es' 
          ? '¡Mensaje enviado! Te responderé pronto.' 
          : 'Message sent! I\'ll get back to you soon.'
      });
      
      // Limpiar formulario
      setFormData({ name: '', email: '', message: '' });
      
      // Reset status después de 5 segundos
      setTimeout(() => setStatus({ type: 'idle' }), 5000);
    } catch (error) {
      setStatus({
        type: 'error',
        message: language === 'es'
          ? 'Error al enviar. Intenta de nuevo o escríbeme directamente.'
          : 'Error sending message. Try again or email me directly.'
      });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
          {language === 'es' ? 'Nombre' : 'Name'}
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          value={formData.name}
          onChange={handleChange}
          className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white placeholder-gray-500"
          placeholder={language === 'es' ? 'Tu nombre' : 'Your name'}
          disabled={status.type === 'loading'}
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
          {language === 'es' ? 'Email' : 'Email'}
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          value={formData.email}
          onChange={handleChange}
          className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white placeholder-gray-500"
          placeholder={language === 'es' ? 'tu@email.com' : 'your@email.com'}
          disabled={status.type === 'loading'}
        />
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
          {language === 'es' ? 'Mensaje' : 'Message'}
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          value={formData.message}
          onChange={handleChange}
          className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white placeholder-gray-500 resize-none"
          placeholder={language === 'es' ? 'Cuéntame sobre tu proyecto...' : 'Tell me about your project...'}
          disabled={status.type === 'loading'}
        />
      </div>

      {status.message && (
        <div className={`p-4 rounded-lg ${
          status.type === 'success' 
            ? 'bg-green-900/20 border border-green-500/50 text-green-300' 
            : 'bg-red-900/20 border border-red-500/50 text-red-300'
        }`}>
          {status.message}
        </div>
      )}

      <button
        type="submit"
        disabled={status.type === 'loading'}
        className="w-full px-8 py-4 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-700 disabled:cursor-not-allowed text-white rounded-lg font-semibold transition-all hover:scale-105 disabled:hover:scale-100"
      >
        {status.type === 'loading' 
          ? (language === 'es' ? 'Enviando...' : 'Sending...') 
          : (language === 'es' ? 'Enviar mensaje' : 'Send message')}
      </button>
    </form>
  );
}
