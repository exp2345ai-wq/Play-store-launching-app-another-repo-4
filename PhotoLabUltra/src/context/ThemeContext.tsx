/**
 * Theme Context - Dark/Light mode management with smooth transitions
 */

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Theme, ThemeColors, ThemeMode } from '../types';

// Theme color definitions
const darkColors: ThemeColors = {
  backgroundPrimary: '#0A0A0F',
  backgroundSecondary: '#151520',
  backgroundTertiary: '#1E1E2E',
  accentPrimary: '#8B5CF6',
  accentSecondary: '#06B6D4',
  accentTertiary: '#EC4899',
  textPrimary: '#FFFFFF',
  textSecondary: '#A1A1AA',
  textMuted: '#71717A',
  success: '#10B981',
  warning: '#F59E0B',
  error: '#EF4444',
  glass: 'rgba(255, 255, 255, 0.05)',
  neon: '#8B5CF6',
  gradientStart: '#8B5CF6',
  gradientMid: '#06B6D4',
  gradientEnd: '#EC4899',
};

const lightColors: ThemeColors = {
  backgroundPrimary: '#FFFFFF',
  backgroundSecondary: '#F4F4F5',
  backgroundTertiary: '#E4E4E7',
  accentPrimary: '#8B5CF6',
  accentSecondary: '#0891B2',
  accentTertiary: '#DB2777',
  textPrimary: '#18181B',
  textSecondary: '#52525B',
  textMuted: '#A1A1AA',
  success: '#10B981',
  warning: '#F59E0B',
  error: '#EF4444',
  glass: 'rgba(0, 0, 0, 0.03)',
  neon: '#8B5CF6',
  gradientStart: '#8B5CF6',
  gradientMid: '#0891B2',
  gradientEnd: '#DB2777',
};

// Theme context interface
interface ThemeContextType {
  theme: Theme;
  themeMode: ThemeMode;
  isDark: boolean;
  toggleTheme: () => void;
  setThemeMode: (mode: ThemeMode) => void;
  colors: ThemeColors;
}

// Create context
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Storage key
const THEME_STORAGE_KEY = '@photolab_theme_mode';

// Provider props
interface ThemeProviderProps {
  children: ReactNode;
}

// Provider component
export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [themeMode, setThemeModeState] = useState<ThemeMode>('dark');
  const [isLoaded, setIsLoaded] = useState(false);

  // Load saved theme from storage
  useEffect(() => {
    const loadTheme = async () => {
      try {
        const savedTheme = await AsyncStorage.getItem(THEME_STORAGE_KEY);
        if (savedTheme && (savedTheme === 'dark' || savedTheme === 'light')) {
          setThemeModeState(savedTheme);
        }
      } catch (error) {
        console.error('Failed to load theme:', error);
      }
    };
    loadTheme().finally(() => setIsLoaded(true));
  }, []);

  // Save theme to storage when changed
  const setThemeMode = async (mode: ThemeMode) => {
    try {
      await AsyncStorage.setItem(THEME_STORAGE_KEY, mode);
      setThemeModeState(mode);
    } catch (error) {
      console.error('Failed to save theme:', error);
    }
  };

  // Toggle between dark and light
  const toggleTheme = () => {
    const newMode = themeMode === 'dark' ? 'light' : 'dark';
    setThemeMode(newMode);
  };

  // Compute theme values
  const isDark = themeMode === 'dark';
  const colors = isDark ? darkColors : lightColors;
  const theme: Theme = {
    isDark,
    colors,
  };

  // Don't render until loaded to prevent flash
  if (!isLoaded) {
    return null;
  }

  return (
    <ThemeContext.Provider
      value={{
        theme,
        themeMode,
        isDark,
        toggleTheme,
        setThemeMode,
        colors,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook to use theme
export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export default ThemeContext;