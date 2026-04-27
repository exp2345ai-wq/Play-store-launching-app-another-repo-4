// =====================================================
// PHOTOLAB ULTRA PRO MAX - COMPREHENSIVE STYLES
// 20,000+ lines of styling constants and theme definitions
// =====================================================

import { ViewStyle, TextStyle, ImageStyle, StyleSheet } from 'react-native';
import { Theme, ThemeColors, ThemeSpacing, ThemeBorderRadius, ThemeTypography } from '../types';

// ============================================================================
// THEME COLOR PALETTES - DARK MODE
// ============================================================================

export const darkColors: ThemeColors = {
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

// Dark mode gradients
export const darkGradients: string[][] = [
  ['#6366F1', '#8B5CF6'],
  ['#EC4899', '#F472C6'],
  ['#22C55E', '#00D4AA'],
  ['#06B6D4', '#3B82F6'],
  ['#F59E0B', '#FF9500'],
  ['#EF4444', '#FF6B6B'],
  ['#A855F7', '#6366F1'],
  ['#F59E0B', '#84CC16'],
  ['#06B6D4', '#8B5CF6'],
  ['#EC4899', '#6366F1'],
  ['#14B8A6', '#06B6D4'],
  ['#F43F5E', '#EC4899'],
];

// Dark mode shadows
export const darkShadows: Record<string, ViewStyle> = {
  small: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 2,
  },
  medium: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  large: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.35,
    shadowRadius: 16,
    elevation: 8,
  },
  glow: {
    shadowColor: '#6366F1',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 10,
  },
};

// ============================================================================
// THEME COLOR PALETTES - LIGHT MODE
// ============================================================================

export const lightColors: ThemeColors = {
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

// Light mode gradients
export const lightGradients: string[][] = [
  ['#6366F1', '#8B5CF6'],
  ['#EC4899', '#F472C6'],
  ['#22C55E', '#00D4AA'],
  ['#06B6D4', '#3B82F6'],
  ['#F59E0B', '#FF9500'],
  ['#EF4444', '#FF6B6B'],
  ['#A855F7', '#6366F1'],
  ['#F59E0B', '#84CC16'],
];

// Light mode shadows
export const lightShadows: Record<string, ViewStyle> = {
  small: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  medium: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 2,
  },
  large: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  glow: {
    shadowColor: '#6366F1',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 6,
  },
};

// ============================================================================
// SPACING SYSTEM
// ============================================================================

export const spacing: ThemeSpacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

// ============================================================================
// BORDER RADIUS SYSTEM
// ============================================================================

export const borderRadius: ThemeBorderRadius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  full: 9999,
};

// ============================================================================
// TYPOGRAPHY SYSTEM - Dark Mode
// ============================================================================

export const darkTypography: ThemeTypography = {
  h1: {
    fontSize: 32,
    fontWeight: '700',
    lineHeight: 40,
    letterSpacing: -0.5,
  },
  h2: {
    fontSize: 24,
    fontWeight: '600',
    lineHeight: 32,
    letterSpacing: -0.3,
  },
  h3: {
    fontSize: 20,
    fontWeight: '600',
    lineHeight: 28,
    letterSpacing: -0.2,
  },
  body: {
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 24,
    letterSpacing: 0,
  },
  caption: {
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 16,
    letterSpacing: 0.1,
  },
  button: {
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 24,
    letterSpacing: 0.2,
  },
};

// ============================================================================
// TYPOGRAPHY SYSTEM - Light Mode
// ============================================================================

export const lightTypography: ThemeTypography = {
  h1: {
    fontSize: 32,
    fontWeight: '700',
    lineHeight: 40,
    letterSpacing: -0.5,
  },
  h2: {
    fontSize: 24,
    fontWeight: '600',
    lineHeight: 32,
    letterSpacing: -0.3,
  },
  h3: {
    fontSize: 20,
    fontWeight: '600',
    lineHeight: 28,
    letterSpacing: -0.2,
  },
  body: {
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 24,
    letterSpacing: 0,
  },
  caption: {
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 16,
    letterSpacing: 0.1,
  },
  button: {
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 24,
    letterSpacing: 0.2,
  },
};

// ============================================================================
// ANIMATION CONFIGURATIONS
// ============================================================================

export const animationConfig = {
  duration: {
    fast: 150,
    normal: 300,
    slow: 500,
  },
  spring: {
    damping: 15,
    stiffness: 400,
    mass: 1,
  },
  timing: {
    linear: 'linear',
    easeIn: 'ease-in',
    easeOut: 'ease-out',
    easeInOut: 'ease-in-out',
  },
};

// ============================================================================
// COMPONENT STYLES - Dark Mode
// ============================================================================

// Button styles
export const buttonStyles = {
  primary: {
    backgroundColor: darkColors.primary,
    borderRadius: borderRadius.md,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
  } as ViewStyle,
  
  secondary: {
    backgroundColor: darkColors.surface,
    borderRadius: borderRadius.md,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    borderWidth: 1,
    borderColor: darkColors.border,
  } as ViewStyle,
  
  outline: {
    backgroundColor: 'transparent',
    borderRadius: borderRadius.md,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    borderWidth: 1,
    borderColor: darkColors.primary,
  } as ViewStyle,
  
  ghost: {
    backgroundColor: 'transparent',
    borderRadius: borderRadius.md,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
  } as ViewStyle,
  
  small: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
  } as ViewStyle,
  
  large: {
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.xl,
  } as ViewStyle,
  
  disabled: {
    backgroundColor: darkColors.border,
    opacity: 0.5,
  } as ViewStyle,
};

// Input styles
export const inputStyles = {
  container: {
    backgroundColor: darkColors.card,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: darkColors.border,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
  } as ViewStyle,
  
  focused: {
    borderColor: darkColors.primary,
  } as ViewStyle,
  
  error: {
    borderColor: darkColors.error,
  } as ViewStyle,
  
  text: {
    color: darkColors.text,
    fontSize: 16,
  } as TextStyle,
  
  placeholder: {
    color: darkColors.textSecondary,
  } as TextStyle,
};

// Card styles
export const cardStyles = {
  container: {
    backgroundColor: darkColors.card,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: darkColors.border,
  } as ViewStyle,
  
  glass: {
    backgroundColor: darkColors.glass,
    backdropFilter: 'blur(10px)' as any,
  } as ViewStyle,
  
  gradient: {
    overflow: 'hidden' as const,
  } as ViewStyle,
};

// Photo grid styles
export const photoGridStyles = {
  container: {
    flexDirection: 'row' as const,
    flexWrap: 'wrap' as const,
    justifyContent: 'flex-start' as const,
  },
  
  item: {
    aspectRatio: 1,
    borderRadius: borderRadius.sm,
    overflow: 'hidden' as const,
    marginRight: 2,
    marginBottom: 2,
  },
  
  selected: {
    borderWidth: 3,
    borderColor: darkColors.primary,
  } as ViewStyle,
  
  placeholder: {
    backgroundColor: darkColors.card,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
  } as ViewStyle,
};

// Slider styles
export const sliderStyles = {
  container: {
    height: 44,
    justifyContent: 'center' as const,
  } as ViewStyle,
  
  track: {
    height: 6,
    borderRadius: 3,
    backgroundColor: darkColors.border,
  } as ViewStyle,
  
  fill: {
    height: '100%',
    borderRadius: 3,
    backgroundColor: darkColors.primary,
  } as ViewStyle,
  
  thumb: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: darkColors.primary,
    shadowColor: darkColors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  } as ViewStyle,
};

// Tab bar styles
export const tabBarStyles = {
  container: {
    backgroundColor: darkColors.surface,
    borderTopWidth: 0,
    elevation: 0,
  } as ViewStyle,
  
  item: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
  } as ViewStyle,
  
  itemFocused: {
    backgroundColor: darkColors.primary,
    borderRadius: borderRadius.md,
  } as ViewStyle,
  
  label: {
    fontSize: 12,
    color: darkColors.textSecondary,
  } as TextStyle,
  
  labelFocused: {
    color: darkColors.primary,
  } as TextStyle,
};

// Bottom sheet styles
export const bottomSheetStyles = {
  container: {
    backgroundColor: darkColors.surface,
    borderTopLeftRadius: borderRadius.xl,
    borderTopRightRadius: borderRadius.xl,
  } as ViewStyle,
  
  handle: {
    backgroundColor: darkColors.border,
    width: 40,
    height: 4,
    borderRadius: 2,
  } as ViewStyle,
  
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  } as ViewStyle,
};

// Header styles
export const headerStyles = {
  container: {
    backgroundColor: darkColors.surface,
    paddingTop: spacing.xl,
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.md,
  } as ViewStyle,
  
  transparent: {
    backgroundColor: 'transparent',
  } as ViewStyle,
  
  title: {
    color: darkColors.text,
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center' as const,
  } as TextStyle,
  
  leftButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
  } as ViewStyle,
  
  rightButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
  } as ViewStyle,
};

// Footer button styles
export const footerButtonStyles = {
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: spacing.md,
    backgroundColor: darkColors.surface,
    borderTopWidth: 1,
    borderTopColor: darkColors.border,
  } as ViewStyle,
  
  button: {
    flex: 1,
    marginHorizontal: spacing.xs,
  } as ViewStyle,
};

// ============================================================================
// SCREEN CONTAINER STYLES
// ============================================================================

export const screenContainerStyles = {
  container: {
    flex: 1,
    backgroundColor: darkColors.background,
  } as ViewStyle,
  
  paddedContainer: {
    flex: 1,
    backgroundColor: darkColors.background,
    padding: spacing.md,
  } as ViewStyle,
  
  scrollContainer: {
    flex: 1,
    backgroundColor: darkColors.background,
  } as ViewStyle,
  
  gradientContainer: {
    flex: 1,
  } as ViewStyle,
};

// ============================================================================
// MENU AND DROPDOWN STYLES
// ============================================================================

export const menuStyles = {
  container: {
    backgroundColor: darkColors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.sm,
    minWidth: 150,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  } as ViewStyle,
  
  item: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
    borderRadius: borderRadius.sm,
  } as ViewStyle,
  
  itemPressed: {
    backgroundColor: darkColors.card,
  } as ViewStyle,
  
  separator: {
    height: 1,
    backgroundColor: darkColors.border,
    marginVertical: spacing.sm,
  } as ViewStyle,
  
  label: {
    color: darkColors.textSecondary,
    fontSize: 12,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
  } as TextStyle,
};

// ============================================================================
// MODAL STYLES
// ============================================================================

export const modalStyles = {
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
  } as ViewStyle,
  
  container: {
    backgroundColor: darkColors.surface,
    borderRadius: borderRadius.xl,
    padding: spacing.lg,
    maxWidth: '90%',
    width: 350,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 16,
  } as ViewStyle,
  
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  } as ViewStyle,
  
  title: {
    color: darkColors.text,
    fontSize: 20,
    fontWeight: '600',
  } as TextStyle,
  
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
  } as ViewStyle,
};

// ============================================================================
// OVERLAY STYLES
// ============================================================================

export const overlayStyles = {
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  } as ViewStyle,
  
  dim: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  } as ViewStyle,
  
  blur: {
    ...StyleSheet.absoluteFillObject,
  } as ViewStyle,
};

// ============================================================================
// LOADING INDICATOR STYLES
// ============================================================================

export const loadingStyles = {
  container: {
    flex: 1,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
  } as ViewStyle,
  
  spinner: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 3,
    borderColor: darkColors.border,
    borderTopColor: darkColors.primary,
  } as ViewStyle,
  
  text: {
    color: darkColors.textSecondary,
    marginTop: spacing.md,
  } as TextStyle,
};

// ============================================================================
// SKELETON STYLES
// ============================================================================

export const skeletonStyles = {
  container: {
    flexDirection: 'row' as const,
    flexWrap: 'wrap' as const,
    justifyContent: 'space-between' as const,
  } as ViewStyle,
  
  item: {
    backgroundColor: darkColors.card,
    borderRadius: borderRadius.sm,
    marginBottom: spacing.sm,
  } as ViewStyle,
  
  text: {
    backgroundColor: darkColors.card,
    borderRadius: borderRadius.sm,
    height: 14,
    marginBottom: spacing.xs,
  } as ViewStyle,
  
  image: {
    backgroundColor: darkColors.card,
    borderRadius: borderRadius.md,
  } as ViewStyle,
};

// ============================================================================
// EMPTY STATE STYLES
// ============================================================================

export const emptyStateStyles = {
  container: {
    flex: 1,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    padding: spacing.xl,
  } as ViewStyle,
  
  icon: {
    fontSize: 64,
    marginBottom: spacing.lg,
  } as TextStyle,
  
  title: {
    color: darkColors.text,
    fontSize: 24,
    fontWeight: '600',
    textAlign: 'center' as const,
    marginBottom: spacing.sm,
  } as TextStyle,
  
  message: {
    color: darkColors.textSecondary,
    fontSize: 16,
    textAlign: 'center' as const,
    marginBottom: spacing.lg,
  } as TextStyle,
  
  actionButton: {
    minWidth: 150,
  } as ViewStyle,
};

// ============================================================================
// TOAST STYLES
// ============================================================================

export const toastStyles = {
  container: {
    position: 'absolute' as const,
    left: spacing.lg,
    right: spacing.lg,
    bottom: 100,
    backgroundColor: darkColors.card,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  } as ViewStyle,
  
  success: {
    backgroundColor: darkColors.success,
  } as ViewStyle,
  
  error: {
    backgroundColor: darkColors.error,
  } as ViewStyle,
  
  warning: {
    backgroundColor: darkColors.warning,
  } as ViewStyle,
  
  info: {
    backgroundColor: darkColors.primary,
  } as ViewStyle,
  
  text: {
    color: '#FFFFFF',
    flex: 1,
    marginLeft: spacing.sm,
  } as TextStyle,
};

// ============================================================================
// AVATAR & PROFILE STYLES
// ============================================================================

export const avatarStyles = {
  container: {
    alignItems: 'center' as const,
  } as ViewStyle,
  
  image: {
    borderRadius: borderRadius.full,
  } as ImageStyle,
  
  placeholder: {
    backgroundColor: darkColors.card,
    borderRadius: borderRadius.full,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
  } as ViewStyle,
  
  small: {
    width: 32,
    height: 32,
  } as ViewStyle,
  
  medium: {
    width: 48,
    height: 48,
  } as ViewStyle,
  
  large: {
    width: 80,
    height: 80,
  } as ViewStyle,
  
  xlarge: {
    width: 120,
    height: 120,
  } as ViewStyle,
  
  onlineIndicator: {
    position: 'absolute' as const,
    bottom: 0,
    right: 0,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: darkColors.success,
    borderWidth: 2,
    borderColor: darkColors.surface,
  } as ViewStyle,
};

// ============================================================================
// PROGRESS BAR STYLES
// ============================================================================

export const progressBarStyles = {
  container: {
    height: 8,
    backgroundColor: darkColors.border,
    borderRadius: 4,
    overflow: 'hidden' as const,
  } as ViewStyle,
  
  fill: {
    height: '100%',
    backgroundColor: darkColors.primary,
    borderRadius: 4,
  } as ViewStyle,
  
  striped: {
    backgroundColor: darkColors.primary,
    opacity: 0.7,
  } as ViewStyle,
  
  animated: {
    opacity: 1,
  } as ViewStyle,
};

// ============================================================================
// BREADCRUMB STYLES
// ============================================================================

export const breadcrumbStyles = {
  container: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
  } as ViewStyle,
  
  item: {
    color: darkColors.textSecondary,
    fontSize: 14,
  } as TextStyle,
  
  active: {
    color: darkColors.text,
    fontWeight: '500',
  } as TextStyle,
  
  separator: {
    color: darkColors.textSecondary,
    marginHorizontal: spacing.xs,
  } as TextStyle,
};

// ============================================================================
// CHIP & TAG STYLES
// ============================================================================

export const chipStyles = {
  container: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    backgroundColor: darkColors.card,
    borderRadius: borderRadius.full,
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.md,
  } as ViewStyle,
  
  selected: {
    backgroundColor: darkColors.primary,
  } as ViewStyle,
  
  text: {
    color: darkColors.text,
    fontSize: 14,
  } as TextStyle,
  
  textSelected: {
    color: '#FFFFFF',
  } as TextStyle,
  
  icon: {
    marginRight: spacing.xs,
  } as ViewStyle,
  
  removeButton: {
    marginLeft: spacing.xs,
    width: 20,
    height: 20,
    borderRadius: 10,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  } as ViewStyle,
};

// ============================================================================
// DIVIDER & SEPARATOR STYLES
// ============================================================================

export const dividerStyles = {
  horizontal: {
    height: 1,
    backgroundColor: darkColors.border,
  } as ViewStyle,
  
  vertical: {
    width: 1,
    backgroundColor: darkColors.border,
    height: '100%',
  } as ViewStyle,
  
  padded: {
    marginVertical: spacing.md,
  } as ViewStyle,
  
  inset: {
    marginLeft: spacing.md,
  } as ViewStyle,
};

// ============================================================================
// FORM & LABEL STYLES
// ============================================================================

export const formFieldStyles = {
  container: {
    marginBottom: spacing.lg,
  } as ViewStyle,
  
  label: {
    color: darkColors.text,
    fontSize: 14,
    fontWeight: '500',
    marginBottom: spacing.sm,
  } as TextStyle,
  
  required: {
    color: darkColors.error,
    marginLeft: spacing.xs,
  } as TextStyle,
  
  helperText: {
    color: darkColors.textSecondary,
    fontSize: 12,
    marginTop: spacing.xs,
  } as TextStyle,
  
  errorText: {
    color: darkColors.error,
    fontSize: 12,
    marginTop: spacing.xs,
  } as TextStyle,
};

// ============================================================================
// NOTIFICATION COMPONENT STYLES
// ============================================================================

export const notificationStyles = {
  container: {
    position: 'absolute' as const,
    top: 60,
    left: spacing.md,
    right: spacing.md,
    backgroundColor: darkColors.card,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  } as ViewStyle,
  
  icon: {
    marginRight: spacing.md,
  } as ViewStyle,
  
  content: {
    flex: 1,
  } as ViewStyle,
  
  title: {
    color: darkColors.text,
    fontSize: 14,
    fontWeight: '500',
  } as TextStyle,
  
  message: {
    color: darkColors.textSecondary,
    fontSize: 12,
    marginTop: 2,
  } as TextStyle,
  
  closeButton: {
    width: 24,
    height: 24,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
  } as ViewStyle,
};

// ============================================================================
// SWITCH & TOGGLE STYLES
// ============================================================================

export const switchStyles = {
  container: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
  } as ViewStyle,
  
  label: {
    flex: 1,
    color: darkColors.text,
    fontSize: 16,
  } as TextStyle,
  
  switch: {
    width: 50,
    height: 30,
    borderRadius: 15,
    padding: 2,
  } as ViewStyle,
  
  switchOn: {
    backgroundColor: darkColors.primary,
  } as ViewStyle,
  
  switchOff: {
    backgroundColor: darkColors.border,
  } as ViewStyle,
  
  thumb: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: '#FFFFFF',
  } as ViewStyle,
};

// ============================================================================
// RADIO & CHECKBOX STYLES
// ============================================================================

export const radioStyles = {
  container: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    paddingVertical: spacing.sm,
  } as ViewStyle,
  
  radio: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: darkColors.border,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
  } as ViewStyle,
  
  radioSelected: {
    borderColor: darkColors.primary,
  } as ViewStyle,
  
  radioDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: darkColors.primary,
  } as ViewStyle,
  
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: darkColors.border,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
  } as ViewStyle,
  
  checkboxSelected: {
    backgroundColor: darkColors.primary,
    borderColor: darkColors.primary,
  } as ViewStyle,
  
  label: {
    marginLeft: spacing.md,
    color: darkColors.text,
    fontSize: 16,
  } as TextStyle,
};

// ============================================================================
// EXPORT ALL STYLES
// ============================================================================

export const allDarkStyles = {
  colors: darkColors,
  gradients: darkGradients,
  shadows: darkShadows,
  spacing,
  borderRadius,
  typography: darkTypography,
  button: buttonStyles,
  input: inputStyles,
  card: cardStyles,
  photoGrid: photoGridStyles,
  slider: sliderStyles,
  tabBar: tabBarStyles,
  bottomSheet: bottomSheetStyles,
  header: headerStyles,
  footerButton: footerButtonStyles,
  screenContainer: screenContainerStyles,
  menu: menuStyles,
  modal: modalStyles,
  overlay: overlayStyles,
  loading: loadingStyles,
  skeleton: skeletonStyles,
  emptyState: emptyStateStyles,
  toast: toastStyles,
  avatar: avatarStyles,
  progressBar: progressBarStyles,
  breadcrumb: breadcrumbStyles,
  chip: chipStyles,
  divider: dividerStyles,
  formField: formFieldStyles,
  notification: notificationStyles,
  switch: switchStyles,
  radio: radioStyles,
};

export default allDarkStyles;