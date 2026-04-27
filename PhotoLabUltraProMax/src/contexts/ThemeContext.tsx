// PhotoLab Ultra Pro Max - Theme Context
// Dark/Light mode switching with smooth transitions

import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Theme, ThemeColors, UserSettings } from '../types';

const defaultDarkColors: ThemeColors = {
  primary: '#6366F1',
  secondary: '#8B5CF6',
  background: '#0A0A0F',
  surface: '#12121A',
  card: '#1A1A24',
  text: '#FFFFFF',
  textSecondary: '#A0A0B0',
  border: '#2A2A3A',
  accent: '#F472C6',
  gradient: ['#6366F1', '#8B5CF6', '#F472C6'],
  glass: 'rgba(26, 26, 36, 0.7)',
  error: '#EF4444',
  success: '#22C55E',
  warning: '#F59E0B',
};

const defaultLightColors: ThemeColors = {
  primary: '#6366F1',
  secondary: '#8B5CF6',
  background: '#F8F9FC',
  surface: '#FFFFFF',
  card: '#FFFFFF',
  text: '#1A1A24',
  textSecondary: '#6B7280',
  border: '#E5E7EB',
  accent: '#EC4899',
  gradient: ['#6366F1', '#8B5CF6', '#EC4899'],
  glass: 'rgba(255, 255, 255, 0.7)',
  error: '#DC2626',
  success: '#16A34A',
  warning: '#D97706',
};

const darkTheme: Theme = {
  dark: true,
  colors: defaultDarkColors,
  spacing: { xs: 4, sm: 8, md: 16, lg: 24, xl: 32, xxl: 48 },
  borderRadius: { sm: 8, md: 12, lg: 16, xl: 24, full: 9999 },
  typography: {
    h1: { fontSize: 32, fontWeight: '700', lineHeight: 40 },
    h2: { fontSize: 24, fontWeight: '600', lineHeight: 32 },
    h3: { fontSize: 20, fontWeight: '600', lineHeight: 28 },
    body: { fontSize: 16, fontWeight: '400', lineHeight: 24 },
    caption: { fontSize: 12, fontWeight: '400', lineHeight: 16 },
    button: { fontSize: 16, fontWeight: '600', lineHeight: 24 },
  },
};

const lightTheme: Theme = {
  dark: false,
  colors: defaultLightColors,
  spacing: { xs: 4, sm: 8, md: 16, lg: 24, xl: 32, xxl: 48 },
  borderRadius: { sm: 8, md: 12, lg: 16, xl: 24, full: 9999 },
  typography: {
    h1: { fontSize: 32, fontWeight: '700', lineHeight: 40 },
    h2: { fontSize: 24, fontWeight: '600', lineHeight: 32 },
    h3: { fontSize: 20, fontWeight: '600', lineHeight: 28 },
    body: { fontSize: 16, fontWeight: '400', lineHeight: 24 },
    caption: { fontSize: 12, fontWeight: '400', lineHeight: 16 },
    button: { fontSize: 16, fontWeight: '600', lineHeight: 24 },
  },
};

interface ThemeContextType {
  theme: Theme;
  isDark: boolean;
  toggleTheme: () => void;
  setDarkMode: (value: boolean) => void;
  colors: ThemeColors;
  spacing: typeof darkTheme.spacing;
  borderRadius: typeof darkTheme.borderRadius;
  typography: typeof darkTheme.typography;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const THEME_STORAGE_KEY = '@PhotoLabUltra:theme_mode';

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [isDark, setIsDark] = useState<boolean>(true);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);

  useEffect(() => {
    loadThemePreference();
  }, []);

  const loadThemePreference = async () => {
    try {
      const savedDark = await AsyncStorage.getItem(THEME_STORAGE_KEY);
      if (savedDark !== null) {
        setIsDark(savedDark === 'dark');
      }
    } catch (error) {
      console.error('Error loading theme preference:', error);
    }
  };

  const saveThemePreference = async (dark: boolean) => {
    try {
      await AsyncStorage.setItem(THEME_STORAGE_KEY, dark ? 'dark' : 'light');
    } catch (error) {
      console.error('Error saving theme preference:', error);
    }
  };

  const toggleTheme = useCallback(() => {
    setIsTransitioning(true);
    setIsDark(prev => {
      const newValue = !prev;
      saveThemePreference(newValue);
      setTimeout(() => setIsTransitioning(false), 300);
      return newValue;
    });
  }, []);

  const setDarkMode = useCallback((value: boolean) => {
    setIsTransitioning(true);
    setIsDark(value);
    saveThemePreference(value);
    setTimeout(() => setIsTransitioning(false), 300);
  }, []);

  const theme = isDark ? darkTheme : lightTheme;
  const colors = theme.colors;
  const spacing = theme.spacing;
  const borderRadius = theme.borderRadius;
  const typography = theme.typography;

  return (
    <ThemeContext.Provider value={{ theme, isDark, toggleTheme, setDarkMode, colors, spacing, borderRadius, typography }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export default ThemeContext;