// =====================================================
// PHOTOLAB ULTRA PRO MAX - Main App Entry
// =====================================================

import React, { useState, useEffect, useCallback } from 'react';
import { StatusBar, View, Text, StyleSheet, LogBox } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// Context providers
import { ThemeProvider, useTheme } from './src/contexts/ThemeContext';
import { AppProvider } from './src/contexts/AppContext';

// Navigation
import { AppNavigator } from './src/navigation/AppNavigator';

// Ignore specific warnings
LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
  'VirtualizedLists should be nested inside other VirtualizedLists',
]);

// Main App content with theme integration
const AppContent: React.FC = () => {
  const { isDark, colors, toggleTheme } = useTheme();
  
  return (
    <>
      <StatusBar
        barStyle={isDark ? 'light-content' : 'dark-content'}
        backgroundColor={colors.background}
        translucent
      />
      <AppNavigator />
    </>
  );
};

// Loading component
const LoadingScreen: React.FC = () => {
  return (
    <View style={styles.loadingContainer}>
      <Text style={styles.loadingIcon}>📷</Text>
      <Text style={styles.loadingTitle}>PhotoLab Ultra</Text>
      <Text style={styles.loadingSubtitle}>Pro Max</Text>
    </View>
  );
};

// Main App component
export default function App() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const initApp = async () => {
      try {
        // Simulate app initialization
        await new Promise(resolve => setTimeout(resolve, 500));
        setIsReady(true);
      } catch (error) {
        console.error('App initialization error:', error);
        setIsReady(true); // Continue anyway
      }
    };

    initApp();
  }, []);

  if (!isReady) {
    return (
      <SafeAreaProvider>
        <LoadingScreen />
      </SafeAreaProvider>
    );
  }

  return (
    <GestureHandlerRootView style={styles.container}>
      <SafeAreaProvider>
        <ThemeProvider>
          <AppProvider>
            <AppContent />
          </AppProvider>
        </ThemeProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: '#0A0A0F',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingIcon: {
    fontSize: 80,
  },
  loadingTitle: {
    fontSize: 40,
    fontWeight: '700',
    color: '#FFFFFF',
    marginTop: 20,
  },
  loadingSubtitle: {
    fontSize: 24,
    fontWeight: '300',
    color: '#6366F1',
  },
});
