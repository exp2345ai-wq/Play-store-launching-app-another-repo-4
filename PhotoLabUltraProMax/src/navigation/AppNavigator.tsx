// =====================================================
// PHOTOLAB ULTRA PRO MAX - Navigation Config
// 5 Bottom Tabs with Deep Stack Navigation
// =====================================================

import React, { useState, useCallback, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Platform } from 'react-native';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BlurView } from 'expo-blur';
import * as Haptics from 'expo-haptics';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { useTheme } from '../contexts/ThemeContext';
import { useApp } from '../contexts/AppContext';

// Camera Screens
import {
  CameraViewfinderScreen,
  CameraSettingsScreen,
  CameraModeSelectScreen,
  CameraProSettingsScreen,
  CameraPreviewScreen,
} from '../screens/Camera/CameraScreens';

// Gallery Screens
import {
  GalleryHomeScreen,
  PhotoViewerScreen,
  AlbumPhotosScreen,
  PhotoEditorScreen,
  CropScreen,
} from '../screens/Gallery/GalleryScreens';

// Editor Screens
import {
  EditorHomeScreen,
  AdjustPanelScreen,
  AdvancedAdjustScreen,
  FiltersPanelScreen,
  FilterIntensityScreen,
  SavePresetScreen,
  CropPanelScreen,
  RetouchPanelScreen,
  TextPanelScreen,
  StickersPanelScreen,
  FramesPanelScreen,
  EffectsPanelScreen,
} from '../screens/Editor/EditorScreens';

// Collage Screens
import {
  CollageHomeScreen,
  CollageEditorScreen,
  CollageBackgroundScreen,
  CollageExportScreen,
} from '../screens/Collage/CollageScreens';

// Export Screens
import {
  ExportHomeScreen,
  ExportSettingsScreen,
  ExportShareScreen,
  BatchExportScreen,
} from '../screens/Export/ExportScreens';

// Type definitions for screens
export type RootStackParamList = {
  MainTabs: undefined;
};

export type CameraStackParamList = {
  CameraViewfinder: undefined;
  CameraSettings: undefined;
  CameraModeSelect: undefined;
  CameraProSettings: undefined;
  CameraPreview: undefined;
  EditorWorkplace: undefined;
};

export type GalleryStackParamList = {
  GalleryHome: undefined;
  PhotoViewer: { photoId: string; photos: any[] };
  AlbumPhotos: { albumId: string; albumName: string };
  Favorites: { photos: any[] };
  PhotoEditor: { photoId: string };
  CropScreen: undefined;
};

export type EditorStackParamList = {
  EditorHome: undefined;
  AdjustPanel: undefined;
  AdvancedAdjust: undefined;
  FiltersPanel: undefined;
  FilterIntensity: { filter: any };
  SavePreset: { filter: any };
  CropPanel: undefined;
  RetouchPanel: undefined;
  RetouchTool: { tool: any };
  TextPanel: undefined;
  TextEditor: { style: any };
  StickersPanel: undefined;
  StickerPack: { pack: any };
  FramesPanel: undefined;
  EffectsPanel: undefined;
};

export type CollageStackParamList = {
  CollageHome: undefined;
  CollageEditor: { layout: any };
  CollageBackground: undefined;
  CollageExport: undefined;
};

export type ExportStackParamList = {
  ExportHome: undefined;
  ExportSettings: { photoIds: string[] };
  ExportShare: undefined;
  BatchExport: undefined;
};

// Create navigators
const CameraStack = createNativeStackNavigator<CameraStackParamList>();
const GalleryStack = createNativeStackNavigator<GalleryStackParamList>();
const EditorStack = createNativeStackNavigator<EditorStackParamList>();
const CollageStack = createNativeStackNavigator<CollageStackParamList>();
const ExportStack = createNativeStackNavigator<ExportStackParamList>();
const Tab = createBottomTabNavigator();

// Tab icon component with animation
const TabIcon: React.FC<{ name: string; focused: boolean; color: string; size: number }> = ({ name, focused, color, size }) => {
  const scale = useSharedValue(focused ? 1.1 : 1);
  
  useEffect(() => {
    scale.value = withSpring(focused ? 1.1 : 1, {
      damping: 15,
      stiffness: 200,
    });
  }, [focused]);
  
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));
  
  const iconMap: Record<string, string> = {
    Camera: '📷',
    Gallery: '🖼️',
    Editor: '✏️',
    Collage: '🎨',
    Export: '📤',
  };
  
  return (
    <Animated.View style={animatedStyle}>
      <Text style={{ fontSize: size - 4 }}>{iconMap[name] || '●'}</Text>
    </Animated.View>
  );
};

// Custom tab bar
const CustomTabBar: React.FC<{ state: any; descriptors: any; navigation: any; insets: any }> = ({
  state,
  descriptors,
  navigation,
  insets,
}) => {
  const { colors, spacing, borderRadius, typography } = useTheme();
  const { triggerHaptic } = useApp();

  return (
    <View style={[styles.tabBar, { backgroundColor: colors.surface, borderColor: colors.border }]}>
      <BlurView intensity={90} style={StyleSheet.absoluteFill}>
        <View style={[styles.tabBarInner, { paddingBottom: insets.bottom }]}>
          {state.routes.map((route: any, index: number) => {
            const { options } = descriptors[route.key];
            const label = options.tabBarLabel || options.title || route.name;
            const isFocused = state.index === index;
            
            const onPress = async () => {
              await triggerHaptic(Haptics.ImpactFeedbackStyle.Light);
              
              if (isFocused) {
                // Scroll to top or reset
              } else {
                navigation.navigate(route.name);
              }
            };
            
            const onLongPress = async () => {
              await triggerHaptic(Haptics.ImpactFeedbackStyle.Medium);
              navigation.navigate(route.name);
            };
            
            return (
              <TouchableOpacity
                key={route.key}
                accessibilityRole="button"
                accessibilityState={isFocused ? { selected: true } : {}}
                accessibilityLabel={options.tabBarAccessibilityLabel}
                onPress={onPress}
                onLongPress={onLongPress}
                style={styles.tabBarItem}
              >
                <View
                  style={[
                    styles.tabBarItemInner,
                    {
                      backgroundColor: isFocused ? colors.primary : 'transparent',
                      borderRadius: borderRadius.lg,
                    },
                  ]}
                >
                  <TabIcon
                    name={route.name}
                    focused={isFocused}
                    color={isFocused ? '#FFFFFF' : colors.text}
                    size={24}
                  />
                  <Text
                    style={[
                      typography.caption,
                      {
                        color: isFocused ? colors.primary : colors.textSecondary,
                        marginTop: spacing.xs,
                      },
                    ]}
                  >
                    {label}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </BlurView>
    </View>
  );
};

// Stack Navigator options
const screenOptions = {
  headerShown: false,
  animation: 'slide_from_right' as const,
  animationDuration: 250,
};

// ============ CAMERA STACK ============
const CameraStackScreen = () => {
  const { colors } = useTheme();
  
  return (
    <CameraStack.Navigator screenOptions={screenOptions}>
      <CameraStack.Screen name="CameraViewfinder" component={CameraViewfinderScreen} />
      <CameraStack.Screen name="CameraSettings" component={CameraSettingsScreen} />
      <CameraStack.Screen name="CameraModeSelect" component={CameraModeSelectScreen} />
      <CameraStack.Screen name="CameraProSettings" component={CameraProSettingsScreen} />
      <CameraStack.Screen name="CameraPreview" component={CameraPreviewScreen} />
    </CameraStack.Navigator>
  );
};

// ============ GALLERY STACK ============
const GalleryStackScreen = () => {
  const { colors } = useTheme();
  
  return (
    <GalleryStack.Navigator screenOptions={screenOptions}>
      <GalleryStack.Screen name="GalleryHome" component={GalleryHomeScreen} />
      <GalleryStack.Screen name="PhotoViewer" component={PhotoViewerScreen} />
      <GalleryStack.Screen name="AlbumPhotos" component={AlbumPhotosScreen} />
      <GalleryStack.Screen name="PhotoEditor" component={PhotoEditorScreen} />
      <GalleryStack.Screen name="CropScreen" component={CropScreen} />
    </GalleryStack.Navigator>
  );
};

// ============ EDITOR STACK ============
const EditorStackScreen = () => {
  const { colors } = useTheme();
  
  return (
    <EditorStack.Navigator screenOptions={screenOptions}>
      <EditorStack.Screen name="EditorHome" component={EditorHomeScreen} />
      <EditorStack.Screen name="AdjustPanel" component={AdjustPanelScreen} />
      <EditorStack.Screen name="AdvancedAdjust" component={AdvancedAdjustScreen} />
      <EditorStack.Screen name="FiltersPanel" component={FiltersPanelScreen} />
      <EditorStack.Screen name="FilterIntensity" component={FilterIntensityScreen} />
      <EditorStack.Screen name="SavePreset" component={SavePresetScreen} />
      <EditorStack.Screen name="CropPanel" component={CropPanelScreen} />
      <EditorStack.Screen name="RetouchPanel" component={RetouchPanelScreen} />
      <EditorStack.Screen name="TextPanel" component={TextPanelScreen} />
      <EditorStack.Screen name="StickersPanel" component={StickersPanelScreen} />
      <EditorStack.Screen name="FramesPanel" component={FramesPanelScreen} />
      <EditorStack.Screen name="EffectsPanel" component={EffectsPanelScreen} />
    </EditorStack.Navigator>
  );
};

// ============ COLLAGE STACK ============
const CollageStackScreen = () => {
  const { colors } = useTheme();
  
  return (
    <CollageStack.Navigator screenOptions={screenOptions}>
      <CollageStack.Screen name="CollageHome" component={CollageHomeScreen} />
      <CollageStack.Screen name="CollageEditor" component={CollageEditorScreen} />
      <CollageStack.Screen name="CollageBackground" component={CollageBackgroundScreen} />
      <CollageStack.Screen name="CollageExport" component={CollageExportScreen} />
    </CollageStack.Navigator>
  );
};

// ============ EXPORT STACK ============
const ExportStackScreen = () => {
  const { colors } = useTheme();
  
  return (
    <ExportStack.Navigator screenOptions={screenOptions}>
      <ExportStack.Screen name="ExportHome" component={ExportHomeScreen} />
      <ExportStack.Screen name="ExportSettings" component={ExportSettingsScreen} />
      <ExportStack.Screen name="ExportShare" component={ExportShareScreen} />
      <ExportStack.Screen name="BatchExport" component={BatchExportScreen} />
    </ExportStack.Navigator>
  );
};

// ============ MAIN TAB NAVIGATOR ============
const TabNavigator = () => {
  const { colors, spacing, borderRadius } = useTheme();
  const { triggerHaptic } = useApp();
  const [currentTab, setCurrentTab] = useState('Camera');
  
  return (
    <Tab.Navigator
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: 'transparent',
          borderTopWidth: 0,
          elevation: 0,
        },
        tabBarShowLabel: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textSecondary,
      }}
    >
      <Tab.Screen
        name="Camera"
        component={CameraStackScreen}
        options={{
          tabBarLabel: 'Camera',
          tabBarIcon: ({ focused, color, size }) => (
            <TabIcon name="Camera" focused={focused} color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Gallery"
        component={GalleryStackScreen}
        options={{
          tabBarLabel: 'Gallery',
          tabBarIcon: ({ focused, color, size }) => (
            <TabIcon name="Gallery" focused={focused} color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Editor"
        component={EditorStackScreen}
        options={{
          tabBarLabel: 'Editor',
          tabBarIcon: ({ focused, color, size }) => (
            <TabIcon name="Editor" focused={focused} color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Collage"
        component={CollageStackScreen}
        options={{
          tabBarLabel: 'Collage',
          tabBarIcon: ({ focused, color, size }) => (
            <TabIcon name="Collage" focused={focused} color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Export"
        component={ExportStackScreen}
        options={{
          tabBarLabel: 'Export',
          tabBarIcon: ({ focused, color, size }) => (
            <TabIcon name="Export" focused={focused} color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

// ============ MAIN APP NAVIGATOR ============
export const AppNavigator: React.FC = () => {
  const { theme, isDark, colors } = useTheme();
  
  const navigationTheme = {
    ...(isDark ? DarkTheme : DefaultTheme),
    colors: {
      ...(isDark ? DarkTheme.colors : DefaultTheme.colors),
      primary: colors.primary,
      background: colors.background,
      card: colors.surface,
      text: colors.text,
      border: colors.border,
    },
  };
  
  return (
    <NavigationContainer theme={navigationTheme}>
      <TabNavigator />
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    borderRadius: 24,
    borderWidth: 1,
    overflow: 'hidden',
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
  },
  tabBarInner: {
    flexDirection: 'row',
    paddingTop: 12,
    paddingHorizontal: 8,
  },
  tabBarItem: {
    flex: 1,
    paddingVertical: 4,
  },
  tabBarItemInner: {
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
});

export default AppNavigator;