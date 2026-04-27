// PhotoLab Ultra Pro Max - UI Components
// Reusable premium components: Skeleton, Card, Button, BottomSheet, etc.

import React, { useState, useEffect, ReactNode, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
  Animated,
  ScrollView,
  RefreshControl,
  Pressable,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import * as Haptics from 'expo-haptics';
import BottomSheet, { BottomSheetBackdrop, BottomSheetView } from '@gorhom/bottom-sheet';
import { useTheme } from '../contexts/ThemeContext';

// ============ SKELETON LOADER ============
interface SkeletonProps {
  width: number | string;
  height: number;
  borderRadius?: number;
  style?: object;
}

export const Skeleton: React.FC<SkeletonProps> = ({
  width,
  height,
  borderRadius = 8,
  style,
}) => {
  const { colors } = useTheme();
  const [opacity] = useState(new Animated.Value(0.3));

  useEffect(() => {
    const shimmer = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 0.8,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0.3,
          duration: 800,
          useNativeDriver: true,
        }),
      ])
    );
    shimmer.start();
    return () => shimmer.stop();
  }, [opacity]);

  return (
    <Animated.View
      style={[
        {
          width,
          height,
          borderRadius,
          backgroundColor: colors.card,
          opacity,
        },
        style,
      ]}
    />
  );
};

// ============ CARD COMPONENT ============
interface CardProps {
  children: ReactNode;
  onPress?: () => void;
  style?: object;
  glass?: boolean;
  gradient?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  onPress,
  style,
  glass = false,
  gradient = false,
}) => {
  const { colors, spacing, borderRadius } = useTheme();
  const [scale] = useState(new Animated.Value(1));

  const handlePressIn = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    Animated.spring(scale, {
      toValue: 0.97,
      useNativeDriver: true,
      damping: 15,
      stiffness: 400,
    }).start();
  };

  const handlePressOut = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
      damping: 15,
      stiffness: 400,
    }).start();
  };

  const cardContent = (
    <View
      style={[
        styles.card,
        {
          backgroundColor: glass ? colors.glass : colors.card,
          borderRadius: borderRadius.lg,
          padding: spacing.md,
          borderWidth: glass ? 1 : 0,
          borderColor: colors.border,
        },
        style,
      ]}
    >
      {gradient ? (
        <LinearGradient
          colors={colors.gradient as [string, string, ...string[]]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={StyleSheet.absoluteFill}
        />
      ) : null}
      {children}
    </View>
  );

  if (onPress) {
    return (
      <Animated.View style={{ transform: [{ scale }] }}>
        <Pressable
          onPress={onPress}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
        >
          {cardContent}
        </Pressable>
      </Animated.View>
    );
  }

  return cardContent;
};

// ============ BUTTON COMPONENT ============
interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  loading?: boolean;
  icon?: ReactNode;
  style?: object;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  icon,
  style,
}) => {
  const { colors, spacing, borderRadius, typography } = useTheme();
  const [scale] = useState(new Animated.Value(1));

  const handlePressIn = async () => {
    if (!disabled && !loading) {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      Animated.spring(scale, {
        toValue: 0.95,
        useNativeDriver: true,
        damping: 15,
        stiffness: 400,
      }).start();
    }
  };

  const handlePressOut = async () => {
    if (!disabled && !loading) {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      Animated.spring(scale, {
        toValue: 1,
        useNativeDriver: true,
        damping: 15,
        stiffness: 400,
      }).start();
    }
  };

  const getBackgroundColor = () => {
    if (disabled) return colors.border;
    switch (variant) {
      case 'primary':
        return colors.primary;
      case 'secondary':
        return colors.surface;
      case 'outline':
      case 'ghost':
        return 'transparent';
      default:
        return colors.primary;
    }
  };

  const getTextColor = () => {
    if (disabled) return colors.textSecondary;
    switch (variant) {
      case 'primary':
        return '#FFFFFF';
      case 'secondary':
        return colors.text;
      case 'outline':
      case 'ghost':
        return colors.primary;
      default:
        return '#FFFFFF';
    }
  };

  const getPadding = () => {
    switch (size) {
      case 'small':
        return { paddingVertical: spacing.sm, paddingHorizontal: spacing.md };
      case 'large':
        return { paddingVertical: spacing.lg, paddingHorizontal: spacing.xl };
      default:
        return { paddingVertical: spacing.md, paddingHorizontal: spacing.lg };
    }
  };

  return (
    <Animated.View style={{ transform: [{ scale }], borderRadius: borderRadius.md }}>
      <TouchableOpacity
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        disabled={disabled || loading}
        style={[
          styles.button,
          {
            backgroundColor: getBackgroundColor(),
            borderRadius: borderRadius.md,
            borderWidth: variant === 'outline' ? 1 : 0,
            borderColor: disabled ? colors.border : colors.primary,
            ...getPadding(),
          },
          style,
        ]}
      >
        {loading ? (
          <ActivityIndicator color={getTextColor()} size="small" />
        ) : (
          <>
            {icon}
            <Text
              style={[
                typography.button,
                { color: getTextColor(), marginLeft: icon ? spacing.sm : 0 },
              ]}
            >
              {title}
            </Text>
          </>
        )}
      </TouchableOpacity>
    </Animated.View>
  );
};

// ============ ICONS COMPONENT ============
interface IconProps {
  name: string;
  size?: number;
  color?: string;
}

export const Icon: React.FC<IconProps> = ({
  name,
  size = 24,
  color = '#FFFFFF',
}) => {
  const iconMap: Record<string, string> = {
    camera: '📷',
    gallery: '🖼️',
    edit: '✏️',
    collage: '🎨',
    export: '📤',
    settings: '⚙️',
    flash: '⚡',
    grid: '🔲',
    timer: '⏱️',
    hdr: '🌙',
    photo: '📷',
    video: '🎥',
    person: '👤',
    moon: '🌙',
    panaroma: '🌅',
    filter: '🎭',
    crop: '✂️',
    text: 'Aa',
    sticker: '💫',
    brightness: '☀️',
    contrast: '◐',
    saturation: '🎨',
    warmth: '🌡️',
    close: '✕',
    check: '✓',
    heart: '❤️',
    share: '↗️',
    download: '⬇️',
    trash: '🗑️',
    copy: '📋',
    layers: '📑',
    sliders: '🎚️',
    refresh: '🔄',
    search: '🔍',
    add: '➕',
    remove: '➖',
  };

  return (
    <Text style={{ fontSize: size }}>{iconMap[name] || '●'}</Text>
  );
};

// ============ BOTTOM SHEET MODAL ============
interface BottomSheetModalProps {
  isVisible: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: string;
  snapPoints?: (string | number)[];
}

export const BottomSheetModal: React.FC<BottomSheetModalProps> = ({
  isVisible,
  onClose,
  children,
  title,
  snapPoints = ['50%'],
}) => {
  const { colors, spacing, borderRadius, typography } = useTheme();
  const bottomSheetRef = React.useRef<BottomSheet>(null);

  useEffect(() => {
    if (isVisible) {
      bottomSheetRef.current?.expand();
    } else {
      bottomSheetRef.current?.close();
    }
  }, [isVisible]);

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        pressBehavior="close"
      />
    ),
    []
  );

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={-1}
      snapPoints={snapPoints}
      enablePanDownToClose
      backdropComponent={renderBackdrop}
      onClose={onClose}
      backgroundStyle={{ backgroundColor: colors.surface }}
      handleIndicatorStyle={{ backgroundColor: colors.border }}
    >
      <BottomSheetView style={{ flex: 1, padding: spacing.md }}>
        {title && (
          <Text
            style={[
              typography.h3,
              { color: colors.text, marginBottom: spacing.md },
            ]}
          >
            {title}
          </Text>
        )}
        {children}
      </BottomSheetView>
    </BottomSheet>
  );
};

// ============ PHOTO GRID ITEM ============
interface PhotoGridItemProps {
  uri: string;
  onPress: () => void;
  size: number;
}

export const PhotoGridItem: React.FC<PhotoGridItemProps> = ({
  uri,
  onPress,
  size,
}) => {
  const { colors, borderRadius } = useTheme();
  const [scale] = useState(new Animated.Value(1));
  const [loaded, setLoaded] = useState(false);

  const handlePressIn = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    Animated.spring(scale, {
      toValue: 0.92,
      useNativeDriver: true,
      damping: 15,
      stiffness: 400,
    }).start();
  };

  const handlePressOut = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
      damping: 15,
      stiffness: 400,
    }).start();
  };

  return (
    <Animated.View
      style={[
        {
          width: size,
          height: size,
          borderRadius: borderRadius.sm,
          overflow: 'hidden',
          transform: [{ scale }],
        },
      ]}
    >
      <TouchableOpacity
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={1}
        style={{
          width: size,
          height: size,
          backgroundColor: colors.card,
        }}
      >
        <View style={[styles.photoPlaceholder, { width: size, height: size }]}>
          <Text style={{ fontSize: size * 0.3 }}>🖼️</Text>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

// ============ SLIDER COMPONENT ============
interface SliderProps {
  value: number;
  min: number;
  max: number;
  onValueChange: (value: number) => void;
  label?: string;
  showValue?: boolean;
}

export const Slider: React.FC<SliderProps> = ({
  value,
  min,
  max,
  onValueChange,
  label,
  showValue = true,
}) => {
  const { colors, spacing, borderRadius, typography } = useTheme();
  
  const handleValueChange = async (newValue: number) => {
    await Haptics.selectionAsync();
    onValueChange(newValue);
  };

  const progress = ((value - min) / (max - min)) * 100;

  return (
    <View style={{ marginVertical: spacing.sm }}>
      {label && (
        <View style={styles.sliderLabel}>
          <Text style={[typography.caption, { color: colors.textSecondary }]}>
            {label}
          </Text>
          {showValue && (
            <Text style={[typography.caption, { color: colors.primary }]}>
              {value}
            </Text>
          )}
        </View>
      )}
      <View style={[styles.sliderTrack, { backgroundColor: colors.border }]}>
        <View
          style={[
            styles.sliderFill,
            { width: `${progress}%`, backgroundColor: colors.primary },
          ]}
        />
      </View>
      <View style={styles.sliderButtons}>
        {[0, 25, 50, 75, 100].map((pct) => {
            const btnValue = min + (pct / 100) * (max - min);
            return (
              <TouchableOpacity
                key={pct}
                onPress={() => handleValueChange(btnValue)}
                style={styles.sliderDot}
              >
                <View
                  style={[
                    styles.sliderDotInner,
                    {
                      backgroundColor:
                        Math.abs(value - btnValue) < (max - min) / 10
                          ? colors.primary
                          : colors.border,
                    },
                  ]}
                />
              </TouchableOpacity>
            );
          })}
      </View>
    </View>
  );
};

// ============ TOAST COMPONENT ============
interface ToastProps {
  message: string;
  type?: 'success' | 'error' | 'info' | 'warning';
  duration?: number;
}

export const Toast: React.FC<ToastProps> = ({
  message,
  type = 'info',
  duration = 3000,
}) => {
  const { colors, spacing, borderRadius, typography } = useTheme();
  const [opacity] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.sequence([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.delay(duration - 600),
      Animated.timing(opacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  }, [opacity, duration]);

  const getBackgroundColor = () => {
    switch (type) {
      case 'success':
        return colors.success;
      case 'error':
        return colors.error;
      case 'warning':
        return colors.warning;
      default:
        return colors.primary;
    }
  };

  return (
    <Animated.View
      style={[
        styles.toast,
        {
          backgroundColor: getBackgroundColor(),
          opacity,
          bottom: spacing.xxl + 50,
        },
      ]}
    >
      <Text style={[typography.body, { color: '#FFFFFF' }]}>{message}</Text>
    </Animated.View>
  );
};

// ============ HEADER COMPONENT ============
interface HeaderProps {
  title: string;
  leftIcon?: string;
  rightIcon?: string;
  onLeftPress?: () => void;
  onRightPress?: () => void;
  transparent?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  title,
  leftIcon,
  rightIcon,
  onLeftPress,
  onRightPress,
  transparent = false,
}) => {
  const { colors, spacing, borderRadius, typography } = useTheme();

  return (
    <View
      style={[
        styles.header,
        {
          backgroundColor: transparent ? 'transparent' : colors.surface,
          paddingTop: spacing.xl,
          paddingHorizontal: spacing.md,
          paddingBottom: spacing.md,
        },
      ]}
    >
      <View style={styles.headerLeft}>
        {leftIcon && (
          <TouchableOpacity onPress={onLeftPress} style={styles.headerIcon}>
            <Icon name={leftIcon} size={24} color={colors.text} />
          </TouchableOpacity>
        )}
      </View>
      <Text
        style={[
          typography.h3,
          { color: colors.text, flex: 1, textAlign: 'center' },
        ]}
      >
        {title}
      </Text>
      <View style={styles.headerRight}>
        {rightIcon && (
          <TouchableOpacity onPress={onRightPress} style={styles.headerIcon}>
            <Icon name={rightIcon} size={24} color={colors.text} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

// ============ GRADIENT BACKGROUND ============
interface GradientBackgroundProps {
  children: ReactNode;
  colors?: string[];
  style?: object;
}

export const GradientBackground: React.FC<GradientBackgroundProps> = ({
  children,
  colors,
  style,
}) => {
  const { colors: themeColors } = useTheme();

  return (
    <LinearGradient
      colors={(colors || themeColors.gradient) as [string, string, ...string[]]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={[styles.gradient, style]}
    >
      {children}
    </LinearGradient>
  );
};

// ============ EMPTY STATE ============
interface EmptyStateProps {
  icon: string;
  title: string;
  message: string;
  actionLabel?: string;
  onAction?: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  title,
  message,
  actionLabel,
  onAction,
}) => {
  const { colors, spacing, typography } = useTheme();

  return (
    <View style={[styles.emptyState, { padding: spacing.xl }]}>
      <Text style={{ fontSize: 64 }}>{icon}</Text>
      <Text
        style={[
          typography.h2,
          { color: colors.text, marginTop: spacing.lg, textAlign: 'center' },
        ]}
      >
        {title}
      </Text>
      <Text
        style={[
          typography.body,
          {
            color: colors.textSecondary,
            marginTop: spacing.sm,
            textAlign: 'center',
          },
        ]}
      >
        {message}
      </Text>
      {actionLabel && onAction && (
        <Button
          title={actionLabel}
          onPress={onAction}
          variant="primary"
          style={{ marginTop: spacing.lg }}
        />
      )}
    </View>
  );
};

// ============ STYLES ============
const styles = StyleSheet.create({
  card: {
    overflow: 'hidden',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  photoPlaceholder: {
    backgroundColor: '#2A2A3A',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sliderLabel: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  sliderTrack: {
    height: 6,
    borderRadius: 3,
    overflow: 'hidden',
  },
  sliderFill: {
    height: '100%',
    borderRadius: 3,
  },
  sliderButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  sliderDot: {
    padding: 8,
  },
  sliderDotInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  toast: {
    position: 'absolute',
    left: 20,
    right: 20,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerLeft: {
    width: 48,
  },
  headerRight: {
    width: 48,
    alignItems: 'flex-end',
  },
  headerIcon: {
    padding: 8,
  },
  gradient: {
    flex: 1,
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default {
  Skeleton,
  Card,
  Button,
  Icon,
  BottomSheetModal,
  PhotoGridItem,
  Slider,
  Toast,
  Header,
  GradientBackground,
  EmptyState,
};