/**
 * AI Assistant Context - Floating AI chat on every screen
 */

import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { AISuggestion, AIMessage, DEFAULT_AI_RESPONSES } from '../types';

// AI Context interface
interface AIContextType {
  isOpen: boolean;
  messages: AIMessage[];
  suggestions: AISuggestion[];
  openAssistant: () => void;
  closeAssistant: () => void;
  toggleAssistant: () => void;
  sendMessage: (message: string) => void;
  clearMessages: () => void;
}

// Create context
const AIContext = createContext<AIContextType | undefined>(undefined);

// Provider props
interface AIProviderProps {
  children: ReactNode;
}

// Provider component
export const AIProvider: React.FC<AIProviderProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<AIMessage[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: "Hi! I'm your AI photo editing assistant. Tap any tool or ask me anything!",
      timestamp: new Date(),
    },
  ]);
  const [suggestions] = useState<AISuggestion[]>([
    { id: 's1', text: 'How do I crop a photo?', icon: 'help-outline' },
    { id: 's2', text: 'Add a filter', icon: 'filter-alt' },
    { id: 's3', text: 'Adjust brightness', icon: 'wb-sunny' },
    { id: 's4', text: 'Remove background', icon: 'layers' },
    { id: 's5', text: 'Add text to photo', icon: 'text-fields' },
    { id: 's6', text: 'Create a collage', icon: 'grid-view' },
    { id: 's7', text: 'Export in high quality', icon: 'save-alt' },
    { id: 's8', text: 'Apply vintage look', icon: 'style' },
  ]);

  const openAssistant = useCallback(() => {
    setIsOpen(true);
  }, []);

  const closeAssistant = useCallback(() => {
    setIsOpen(false);
  }, []);

  const toggleAssistant = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const sendMessage = useCallback((message: string) => {
    // Add user message
    const userMessage: AIMessage = {
      id: `user_${Date.now()}`,
      role: 'user',
      content: message,
      timestamp: new Date(),
    };

    // Add mock AI response after delay
    setMessages((prev) => [...prev, userMessage]);

    // Simulate AI typing delay
    setTimeout(() => {
      const randomResponse = DEFAULT_AI_RESPONSES[
        Math.floor(Math.random() * DEFAULT_AI_RESPONSES.length)
      ];
      const aiMessage: AIMessage = {
        id: `ai_${Date.now()}`,
        role: 'assistant',
        content: randomResponse,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMessage]);
    }, 500 + Math.random() * 1000);
  }, []);

  const clearMessages = useCallback(() => {
    setMessages([
      {
        id: 'welcome',
        role: 'assistant',
        content: "Hi! I'm your AI photo editing assistant. Tap any tool or ask me anything!",
        timestamp: new Date(),
      },
    ]);
  }, []);

  return (
    <AIContext.Provider
      value={{
        isOpen,
        messages,
        suggestions,
        openAssistant,
        closeAssistant,
        toggleAssistant,
        sendMessage,
        clearMessages,
      }}
    >
      {children}
    </AIContext.Provider>
  );
};

// Custom hook to use AI assistant
export const useAI = (): AIContextType => {
  const context = useContext(AIContext);
  if (!context) {
    throw new Error('useAI must be used within an AIProvider');
  }
  return context;
};

export default AIContext;