// PhotoLab Ultra Pro Max - App Context
// Global app state management for settings, favorites, history, AI chat

import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserSettings, HistoryEntry, AIChatMessage, NotificationItem } from '../types';
import * as Haptics from 'expo-haptics';

interface AppContextType {
  // Settings
  settings: UserSettings;
  updateSettings: (updates: Partial<UserSettings>) => Promise<void>;
  
  // Favorites
  favorites: string[];
  addFavorite: (photoId: string) => Promise<void>;
  removeFavorite: (photoId: string) => Promise<void>;
  isFavorite: (photoId: string) => boolean;
  
  // History
  history: HistoryEntry[];
  addToHistory: (entry: Omit<HistoryEntry, 'id' | 'timestamp'>) => Promise<void>;
  clearHistory: () => Promise<void>;
  
  // AI Assistant
  aiMessages: AIChatMessage[];
  isAIEnabled: boolean;
  sendAIMessage: (message: string) => Promise<void>;
  clearAIMessages: () => Promise<void>;
  
  // Haptics
  triggerHaptic: (type?: Haptics.ImpactFeedbackStyle) => Promise<void>;
  
  // Notifications
  notifications: NotificationItem[];
  addNotification: (notification: Omit<NotificationItem, 'id' | 'timestamp' | 'read'>) => void;
  markAsRead: (id: string) => void;
  clearNotifications: () => void;
}

const defaultSettings: UserSettings = {
  darkMode: true,
  hapticFeedback: true,
  autoSave: true,
  defaultExportQuality: 90,
  defaultAspectRatio: '4:3',
  gridOverlay: false,
  locationTags: true,
  faceDetection: true,
  aiAssistantEnabled: true,
};

const AppContext = createContext<AppContextType | undefined>(undefined);

const FAVORITES_KEY = '@PhotoLabUltra:favorites';
const HISTORY_KEY = '@PhotoLabUltra:history';
const SETTINGS_KEY = '@PhotoLabUltra:settings';
const AI_MESSAGES_KEY = '@PhotoLabUltra:ai_messages';

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [settings, setSettings] = useState<UserSettings>(defaultSettings);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [aiMessages, setAIMessages] = useState<AIChatMessage[]>([]);
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [isAIEnabled, setIsAIEnabled] = useState<boolean>(true);

  useEffect(() => {
    loadAllData();
  }, []);

  const loadAllData = async () => {
    try {
      const [savedSettings, savedFavorites, savedHistory, savedAIMessages] = await Promise.all([
        AsyncStorage.getItem(SETTINGS_KEY),
        AsyncStorage.getItem(FAVORITES_KEY),
        AsyncStorage.getItem(HISTORY_KEY),
        AsyncStorage.getItem(AI_MESSAGES_KEY),
      ]);

      if (savedSettings) {
        setSettings(JSON.parse(savedSettings));
      }
      if (savedFavorites) {
        setFavorites(JSON.parse(savedFavorites));
      }
      if (savedHistory) {
        setHistory(JSON.parse(savedHistory));
      }
      if (savedAIMessages) {
        setAIMessages(JSON.parse(savedAIMessages));
      }
    } catch (error) {
      console.error('Error loading app data:', error);
    }
  };

  const updateSettings = useCallback(async (updates: Partial<UserSettings>) => {
    try {
      const newSettings = { ...settings, ...updates };
      setSettings(newSettings);
      await AsyncStorage.setItem(SETTINGS_KEY, JSON.stringify(newSettings));
    } catch (error) {
      console.error('Error updating settings:', error);
    }
  }, [settings]);

  const addFavorite = useCallback(async (photoId: string) => {
    try {
      const newFavorites = [...favorites, photoId];
      setFavorites(newFavorites);
      await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(newFavorites));
    } catch (error) {
      console.error('Error adding favorite:', error);
    }
  }, [favorites]);

  const removeFavorite = useCallback(async (photoId: string) => {
    try {
      const newFavorites = favorites.filter(id => id !== photoId);
      setFavorites(newFavorites);
      await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(newFavorites));
    } catch (error) {
      console.error('Error removing favorite:', error);
    }
  }, [favorites]);

  const isFavorite = useCallback((photoId: string): boolean => {
    return favorites.includes(photoId);
  }, [favorites]);

  const addToHistory = useCallback(async (entry: Omit<HistoryEntry, 'id' | 'timestamp'>) => {
    try {
      const newEntry: HistoryEntry = {
        ...entry,
        id: `hist_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        timestamp: Date.now(),
      };
      const newHistory = [newEntry, ...history].slice(0, 100);
      setHistory(newHistory);
      await AsyncStorage.setItem(HISTORY_KEY, JSON.stringify(newHistory));
    } catch (error) {
      console.error('Error adding to history:', error);
    }
  }, [history]);

  const clearHistory = useCallback(async () => {
    try {
      setHistory([]);
      await AsyncStorage.setItem(HISTORY_KEY, JSON.stringify([]));
    } catch (error) {
      console.error('Error clearing history:', error);
    }
  }, []);

  const triggerHaptic = useCallback(async (type: Haptics.ImpactFeedbackStyle = Haptics.ImpactFeedbackStyle.Medium) => {
    if (settings.hapticFeedback) {
      try {
        await Haptics.impactAsync(type);
      } catch (error) {
        console.error('Haptic error:', error);
      }
    }
  }, [settings.hapticFeedback]);

  const sendAIMessage = useCallback(async (message: string) => {
    const userMessage: AIChatMessage = {
      id: `msg_${Date.now()}_user`,
      role: 'user',
      content: message,
      timestamp: Date.now(),
    };
    
    const newMessages = [...aiMessages, userMessage];
    setAIMessages(newMessages);
    await AsyncStorage.setItem(AI_MESSAGES_KEY, JSON.stringify(newMessages));

    await new Promise(resolve => setTimeout(resolve, 800));

    const mockResponses = [
      "I've analyzed your image and suggest increasing the contrast by 15% for better dynamic range. Would you like me to apply this adjustment?",
      "Great choice! The golden hour filter works wonderfully with this photo. I can also add a subtle vignette effect to draw focus to the subject.",
      "I've detected a slight color cast. Would you like me to correct the white balance? This will make the whites appear more neutral.",
      "This composition is excellent! For a professional touch, consider straightening the horizon by -2 degrees.",
      "I notice some noise in the shadows. A slight denoise filter at 20% intensity could smooth this out beautifully.",
    ];
    
    const randomResponse = mockResponses[Math.floor(Math.random() * mockResponses.length)];
    
    const assistantMessage: AIChatMessage = {
      id: `msg_${Date.now()}_assistant`,
      role: 'assistant',
      content: randomResponse,
      timestamp: Date.now(),
    };
    
    const finalMessages = [...newMessages, assistantMessage];
    setAIMessages(finalMessages);
    await AsyncStorage.setItem(AI_MESSAGES_KEY, JSON.stringify(finalMessages));
  }, [aiMessages, settings.aiAssistantEnabled]);

  const clearAIMessages = useCallback(async () => {
    setAIMessages([]);
    await AsyncStorage.setItem(AI_MESSAGES_KEY, JSON.stringify([]));
  }, []);

  const addNotification = useCallback((notification: Omit<NotificationItem, 'id' | 'timestamp' | 'read'>) => {
    const newNotification: NotificationItem = {
      ...notification,
      id: `notif_${Date.now()}`,
      timestamp: Date.now(),
      read: false,
    };
    setNotifications(prev => [newNotification, ...prev]);
  }, []);

  const markAsRead = useCallback((id: string) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  }, []);

  const clearNotifications = useCallback(() => {
    setNotifications([]);
  }, []);

  return (
    <AppContext.Provider
      value={{
        settings,
        updateSettings,
        favorites,
        addFavorite,
        removeFavorite,
        isFavorite,
        history,
        addToHistory,
        clearHistory,
        aiMessages,
        isAIEnabled,
        sendAIMessage,
        clearAIMessages,
        triggerHaptic,
        notifications,
        addNotification,
        markAsRead,
        clearNotifications,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

export default AppContext;