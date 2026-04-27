/**
 * Custom Hooks - Haptic feedback and other utilities
 */

import { useCallback } from 'react';
import * as Haptics from 'expo-haptics';
import { useTheme } from '../context/ThemeContext';

// ============================================
// USE HAPTIC HOOK
// ============================================

type HapticType = 
  | 'light' 
  | 'medium' 
  | 'heavy' 
  | 'selection' 
  | 'success' 
  | 'warning' 
  | 'error';

export const useHaptic = () => {
  const triggerHaptic = useCallback(async (type: HapticType = 'light') => {
    try {
      switch (type) {
        case 'light':
          await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
          break;
        case 'medium':
          await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
          break;
        case 'heavy':
          await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
          break;
        case 'selection':
          await Haptics.selectionAsync();
          break;
        case 'success':
          await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
          break;
        case 'warning':
          await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
          break;
        case 'error':
          await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
          break;
      }
    } catch (error) {
      // Silently fail if haptics not available
    }
  }, []);

  return { triggerHaptic };
};

// ============================================
// USE STORAGE HOOK
// ============================================

export const useStorage = () => {
  const { colors } = useTheme();

  const saveData = useCallback(async <T>(key: string, data: T): Promise<boolean> => {
    try {
      const AsyncStorage = require('@react-native-async-storage/async-storage');
      await AsyncStorage.setItem(key, JSON.stringify(data));
      return true;
    } catch (error) {
      console.error('Failed to save data:', error);
      return false;
    }
  }, []);

  const loadData = useCallback(async <T>(key: string): Promise<T | null> => {
    try {
      const AsyncStorage = require('@react-native-async-storage/async-storage');
      const data = await AsyncStorage.getItem(key);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error('Failed to load data:', error);
      return null;
    }
  }, []);

  const removeData = useCallback(async (key: string): Promise<boolean> => {
    try {
      const AsyncStorage = require('@react-native-async-storage/async-storage');
      await AsyncStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error('Failed to remove data:', error);
      return false;
    }
  }, []);

  const clearAll = useCallback(async (): Promise<boolean> => {
    try {
      const AsyncStorage = require('@react-native-async-storage/async-storage');
      await AsyncStorage.clear();
      return true;
    } catch (error) {
      console.error('Failed to clear storage:', error);
      return false;
    }
  }, []);

  return {
    saveData,
    loadData,
    removeData,
    clearAll,
    colors,
  };
};

// ============================================
// USE ANIMATIONS HOOK
// ============================================

export const useAnimations = () => {
  const { colors } = useTheme();

  const createSpringConfig = useCallback(
    (damping: number = 15, stiffness: number = 150, mass: number = 1) => ({
      damping,
      stiffness,
      mass,
    }),
    []
  );

  const createTimingConfig = useCallback(
    (duration: number = 300, easing: any = undefined) => ({
      duration,
      easing,
    }),
    []
  );

  return {
    createSpringConfig,
    createTimingConfig,
    colors,
  };
};

// ============================================
// USE PHOTOS HOOK
// ============================================

export const usePhotos = () => {
  const { colors } = useTheme();

  const generateMockPhotos = useCallback((count: number) => {
    const photos = [];
    const formats = ['jpg', 'png', 'webp'] as const;
    
    for (let i = 0; i < count; i++) {
      photos.push({
        id: `photo_${i}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        uri: `https://picsum.photos/seed/${i + 100}/1920/1080`,
        thumbnailUri: `https://picsum.photos/seed/${i + 100}/200/200`,
        width: 1920,
        height: 1080,
        date: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000),
        location: Math.random() > 0.5 ? 'New York, USA' : undefined,
        size: Math.floor(Math.random() * 5000000) + 100000,
        format: formats[Math.floor(Math.random() * formats.length)],
        isFavorite: Math.random() > 0.8,
        albumId: `album_${Math.floor(Math.random() * 5)}`,
        exifData: {
          camera: 'iPhone 15 Pro',
          iso: [100, 200, 400, 800][Math.floor(Math.random() * 4)],
          aperture: ['f/1.8', 'f/2.0', 'f/2.4'][Math.floor(Math.random() * 3)],
          shutterSpeed: ['1/60', '1/120', '1/250', '1/500'][Math.floor(Math.random() * 4)],
          focalLength: '26mm',
        },
      });
    }
    
    return photos;
  }, []);

  const filterPhotosByDate = useCallback((photos: any[], dateRange: 'today' | 'week' | 'month' | 'year') => {
    const now = new Date();
    let startDate: Date;

    switch (dateRange) {
      case 'today':
        startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        break;
      case 'week':
        startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        break;
      case 'month':
        startDate = new Date(now.getFullYear(), now.getMonth(), 1);
        break;
      case 'year':
        startDate = new Date(now.getFullYear(), 0, 1);
        break;
    }

    return photos.filter((photo) => new Date(photo.date) >= startDate);
  }, []);

  return {
    generateMockPhotos,
    filterPhotosByDate,
    colors,
  };
};

// ============================================
// USE REFRESH HOOK
// ============================================

export const useRefresh = (initialRefreshing: boolean = false) => {
  const [refreshing, setRefreshing] = useState(initialRefreshing);
  const [isLoading, setIsLoading] = useState(false);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    setIsLoading(true);
    
    // Simulate refresh delay
    await new Promise((resolve) => setTimeout(resolve, 1500 + Math.random() * 1000));
    
    setRefreshing(false);
    setIsLoading(false);
  }, []);

  const onLoadMore = useCallback(async (loadMoreCallback: () => Promise<void>) => {
    setIsLoading(true);
    await loadMoreCallback();
    setIsLoading(false);
  }, []);

  return {
    refreshing,
    isLoading,
    onRefresh,
    onLoadMore,
    setRefreshing,
  };
};

// Need to import useState
import { useState } from 'react';

// ============================================
// USE INFINITE SCROLL HOOK
// ============================================

export const useInfiniteScroll = <T,>(
  initialData: T[],
  pageSize: number = 20
) => {
  const [data, setData] = useState<T[]>(initialData);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const loadMore = useCallback(
    async (fetchMore: (page: number) => Promise<T[]>) => {
      if (isLoading || !hasMore) return;

      setIsLoading(true);
      const newData = await fetchMore(page + 1);

      if (newData.length < pageSize) {
        setHasMore(false);
      }

      setData((prev) => [...prev, ...newData]);
      setPage((prev) => prev + 1);
      setIsLoading(false);
    },
    [isLoading, hasMore, page, pageSize]
  );

  const reset = useCallback((newData: T[]) => {
    setData(newData);
    setPage(1);
    setHasMore(true);
    setIsLoading(false);
  }, []);

  return {
    data,
    page,
    hasMore,
    isLoading,
    loadMore,
    reset,
  };
};

// ============================================
// USE BOTTOM SHEET HOOK
// ============================================

export const useBottomSheet = (initialOpen: boolean = false) => {
  const [isOpen, setIsOpen] = useState(initialOpen);
  const [snapPoints] = useState(['25%', '50%', '75%', '90%']);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);
  const toggle = useCallback(() => setIsOpen((prev) => !prev), []);

  return {
    isOpen,
    snapPoints,
    open,
    close,
    toggle,
  };
};

// ============================================
// EXPORT ALL HOOKS
// ============================================

export default useHaptic;