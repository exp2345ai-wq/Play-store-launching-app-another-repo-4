/**
 * Theme Styles - Spacing, typography, and design tokens
 */

import { StyleSheet, Dimensions } from 'react-native';
import { useTheme } from './context/ThemeContext';

// Get screen dimensions
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// ============================================
// SPACING SYSTEM (8pt grid)
// ============================================

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
  xxxl: 64,
};

// ============================================
// TYPOGRAPHY
// ============================================

export const typography = StyleSheet.create({
  // Headings
  headingLarge: {
    fontSize: 32,
    fontWeight: '700',
    letterSpacing: -0.5,
  },
  headingMedium: {
    fontSize: 24,
    fontWeight: '600',
    letterSpacing: -0.3,
  },
  headingSmall: {
    fontSize: 18,
    fontWeight: '600',
    letterSpacing: 0,
  },
  // Body
  bodyLarge: {
    fontSize: 16,
    fontWeight: '400',
    letterSpacing: 0,
  },
  bodyMedium: {
    fontSize: 14,
    fontWeight: '400',
    letterSpacing: 0,
  },
  bodySmall: {
    fontSize: 12,
    fontWeight: '400',
    letterSpacing: 0,
  },
  // Caption
  caption: {
    fontSize: 10,
    fontWeight: '500',
    letterSpacing: 0.5,
  },
  // Labels
  label: {
    fontSize: 13,
    fontWeight: '500',
    letterSpacing: 0.2,
  },
  labelSmall: {
    fontSize: 11,
    fontWeight: '500',
    letterSpacing: 0.3,
  },
});

// ============================================
// SHADOWS
// ============================================

export const createShadows = (colors: any) => ({
  // Neumorphic shadows for light mode
  neumorphicLight: {
    shadowColor: '#FFFFFF',
    shadowOffset: { width: -4, height: -4 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
  },
  // Neumorphic shadows for dark mode
  neumorphicDark: {
    shadowColor: '#000000',
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
  },
  // Glass effect
  glass: {
    shadowColor: colors.accentPrimary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
  },
  // Card shadow
  card: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  // Floating action
  floating: {
    shadowColor: colors.accentPrimary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 8,
  },
});

// ============================================
// BORDER RADIUS
// ============================================

export const borderRadius = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  round: 9999,
};

// ============================================
// ANIMATION VALUES
// ============================================

export const animations = {
  fast: 150,
  normal: 300,
  slow: 500,
  spring: {
    damping: 15,
    stiffness: 150,
    mass: 1,
  },
};

// ============================================
// THEME HELPER HOOK
// ============================================

export const useThemedStyles = <T extends StyleSheet.NamedStyles<T>>(
  styleFactory: (colors: any, spacing: any, typography: any) => T
): T => {
  const { colors } = useTheme();
  return StyleSheet.create(styleFactory(colors, spacing, typography)) as T;
};

// ============================================
// COMMON STYLES
// ============================================

export const commonStyles = StyleSheet.create({
  // Flex utilities
  flex1: {
    flex: 1,
  },
  flexCenter: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  flexRow: {
    flexDirection: 'row',
  },
  flexRowCenter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  flexColumn: {
    flexDirection: 'column',
  },
  flexColumnCenter: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  // Padding
  padding: {
    padding: spacing.md,
  },
  paddingHorizontal: {
    paddingHorizontal: spacing.md,
  },
  paddingVertical: {
    paddingVertical: spacing.md,
  },
  // Safe area
  safeArea: {
    flex: 1,
  },
  safeAreaPadding: {
    paddingTop: spacing.xl,
  },
  // Container
  container: {
    flex: 1,
    paddingHorizontal: spacing.md,
  },
  // Screen styles
  screen: {
    flex: 1,
  },
  screenContent: {
    flex: 1,
    paddingHorizontal: spacing.md,
  },
  // Card
  card: {
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    overflow: 'hidden',
  },
  // List item
  listItem: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
    borderRadius: borderRadius.md,
  },
  // Button base
  buttonBase: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderRadius: borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  // Input base
  inputBase: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
    borderRadius: borderRadius.md,
  },
  // Divider
  divider: {
    height: 1,
    marginVertical: spacing.md,
  },
  // Status bar
  statusBar: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 44,
  },
});

// ============================================
// EXPORT ALL
// ============================================

export default {
  spacing,
  typography,
  borderRadius,
  animations,
  commonStyles,
  SCREEN_WIDTH,
  SCREEN_HEIGHT,
};