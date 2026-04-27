/**
 * PhotoLab Ultra Pro Max - TypeScript Type Definitions
 * Complete type interfaces for the entire application
 */

import { NavigatorScreenParams } from '@react-navigation/native';

// ============================================
// CORE THEME TYPES
// ============================================

export interface ThemeColors {
  // Background colors
  backgroundPrimary: string;
  backgroundSecondary: string;
  backgroundTertiary: string;
  
  // Accent colors
  accentPrimary: string;
  accentSecondary: string;
  accentTertiary: string;
  
  // Text colors
  textPrimary: string;
  textSecondary: string;
  textMuted: string;
  
  // Status colors
  success: string;
  warning: string;
  error: string;
  
  // Special colors
  glass: string;
  neon: string;
  gradientStart: string;
  gradientMid: string;
  gradientEnd: string;
}

export interface Theme {
  isDark: boolean;
  colors: ThemeColors;
}

export type ThemeMode = 'dark' | 'light';

// ============================================
// PHOTO TYPES
// ============================================

export interface Photo {
  id: string;
  uri: string;
  thumbnailUri: string;
  width: number;
  height: number;
  date: Date;
  location?: string;
  size: number;
  format: 'jpg' | 'png' | 'webp' | 'heic';
  isFavorite: boolean;
  albumId?: string;
  exifData?: ExifData;
}

export interface ExifData {
  camera?: string;
  lens?: string;
  iso?: number;
  aperture?: string;
  shutterSpeed?: string;
  focalLength?: string;
  flash?: boolean;
  gps?: {
    latitude: number;
    longitude: number;
  };
}

export interface Album {
  id: string;
  name: string;
  coverPhotoUri?: string;
  photoCount: number;
  createdAt: Date;
}

export interface PhotoGroup {
  date: string;
  photos: Photo[];
}

// ============================================
// CAMERA TYPES
// ============================================

export interface CameraSettings {
  resolution: Resolution;
  aspectRatio: AspectRatio;
  videoStabilization: StabilizationMode;
  flash: FlashMode;
  grid: GridMode;
  timer: TimerMode;
  hdr: HDRMode;
}

export interface Resolution {
  id: string;
  name: string;
  width: number;
  height: number;
  quality: 'low' | 'medium' | 'high' | 'ultra';
}

export interface AspectRatio {
  id: string;
  name: string;
  width: number;
  height: number;
}

export type StabilizationMode = 'off' | 'standard' | 'cinematic';
export type FlashMode = 'off' | 'on' | 'auto' | 'torch';
export type GridMode = 'off' | 'ruleOfThirds' | 'goldenRatio' | 'square';
export type TimerMode = 'off' | '3s' | '5s' | '10s';
export type HDRMode = 'off' | 'auto' | 'on';

export interface CaptureMode {
  id: string;
  name: string;
  icon: string;
  description: string;
  isPro: boolean;
}

export interface ProModeSettings {
  iso: number;
  shutterSpeed: number;
  whiteBalance: number;
  focus: number;
  exposure: number;
  aperture: number;
}

// ============================================
// EDITOR TYPES
// ============================================

export interface EditorTool {
  id: string;
  name: string;
  icon: string;
  category: EditorToolCategory;
  description: string;
  isAdvanced: boolean;
}

export type EditorToolCategory = 
  | 'adjust'
  | 'filters'
  | 'crop'
  | 'retouch'
  | 'text'
  | 'stickers'
  | 'draw'
  | 'effects';

export interface AdjustmentSettings {
  brightness: number;      // -100 to 100
  contrast: number;          // -100 to 100
  saturation: number;        // -100 to 100
  warmth: number;            // -100 to 100
  sharpness: number;        // 0 to 100
  vibrance: number;          // -100 to 100
  highlights: number;       // -100 to 100
  shadows: number;           // -100 to 100
  clarity: number;          // 0 to 100
  dehaze: number;           // 0 to 100
  vignette: number;          // 0 to 100
}

export interface Filter {
  id: string;
  name: string;
  previewUri: string;
  category: FilterCategory;
  intensity: number;
  settings: Partial<AdjustmentSettings>;
  isPreset: boolean;
  isPremium: boolean;
}

export type FilterCategory = 
  | 'classic'
  | 'vivid'
  | 'moody'
  | 'warm'
  | 'cool'
  | 'bw'
  | 'cinema'
  | 'vintage'
  | 'food'
  | 'travel';

export interface CropSettings {
  aspectRatio: AspectRatio | 'free';
  rotation: number;
  flipH: boolean;
  flipV: boolean;
}

export interface RetouchTool {
  id: string;
  name: string;
  icon: string;
  description: string;
}

export interface TextOverlay {
  id: string;
  text: string;
  fontFamily: string;
  fontSize: number;
  fontColor: string;
  backgroundColor: string;
  position: { x: number; y: number };
  rotation: number;
  opacity: number;
}

export interface Sticker {
  id: string;
  name: string;
  uri: string;
  category: string;
}

export interface EditorHistoryEntry {
  id: string;
  timestamp: Date;
  settings: {
    adjustments?: AdjustmentSettings;
    filter?: Filter;
    crop?: CropSettings;
    textOverlays?: TextOverlay[];
    stickers?: Sticker[];
  };
  previewUri: string;
}

export interface CurvesControl {
  highlights: number[];
  midtones: number[];
  shadows: number[];
}

export interface HSLControl {
  hue: number;
  saturation: number;
  lightness: number;
}

// ============================================
// COLLAGE TYPES
// ============================================

export interface CollageLayout {
  id: string;
  name: string;
  cells: CollageCell[];
  maxPhotos: number;
  category: LayoutCategory;
  isPremium: boolean;
}

export interface CollageCell {
  id: string;
  row: number;
  col: number;
  rowSpan: number;
  colSpan: number;
  photo?: Photo;
  position: { x: number; y: number };
  zoom: number;
}

export type LayoutCategory = 
  | 'grid'
  | 'freestyle'
  | 'magazine'
  | 'creative'
  | 'seasonal';

export interface CollageBackground {
  id: string;
  name: string;
  type: 'solid' | 'gradient' | 'pattern' | 'image';
  color?: string;
  gradientColors?: string[];
  patternUri?: string;
  imageUri?: string;
}

// ============================================
// EXPORT TYPES
// ============================================

export interface ExportSettings {
  quality: ExportQuality;
  format: ExportFormat;
  resize: ResizeOption;
}

export interface ExportQuality {
  id: string;
  name: string;
  percentage: number;
}

export type ExportFormat = 'jpg' | 'png' | 'webp' | 'heic';

export interface ResizeOption {
  id: string;
  name: string;
  width: number;
  height: number;
}

export interface ShareOption {
  id: string;
  name: string;
  icon: string;
  appId?: string;
}

// ============================================
// AI ASSISTANT TYPES
// ============================================

export interface AIMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface AISuggestion {
  id: string;
  text: string;
  icon: string;
  action?: string;
}

// ============================================
// NAVIGATION TYPES
// ============================================

// Camera Stack
export type CameraStackParamList = {
  CameraViewfinder: undefined;
  CameraSettings: undefined;
  CaptureMode: undefined;
  ProModeControls: undefined;
  CapturePreview: undefined;
};

// Gallery Stack
export type GalleryStackParamList = {
  GalleryGrid: undefined;
  FullscreenViewer: { photoId: string };
  PhotoEditor: { photoId: string };
  CropTool: { photoId: string };
  FinalPreview: { photoId: string };
};

// file_editor Stack
export type EditorStackParamList = {
  EditorHome: undefined;
  AdjustTool: { toolId: string };
  FilterPanel: undefined;
  AdvancedControls: undefined;
  EditorHistory: undefined;
};

// Collage Stack  
export type CollageStackParamList = {
  LayoutSelection: undefined;
  PhotoPlacement: { layoutId: string };
  BackgroundSelection: { layoutId: string };
  CollageExport: undefined;
  CollagePreview: undefined;
};

// Export Stack
export type ExportStackParamList = {
  QualitySelection: undefined;
  ResizeOptions: undefined;
  ShareOptions: undefined;
  BatchExport: undefined;
  ExportComplete: undefined;
};

// Root Tab Navigator
export type RootTabParamList = {
  CameraTab: NavigatorScreenParams<CameraStackParamList>;
  GalleryTab: NavigatorScreenParams<GalleryStackParamList>;
  EditorTab: NavigatorScreenParams<EditorStackParamList>;
  CollageTab: NavigatorScreenParams<CollageStackParamList>;
  ExportTab: NavigatorScreenParams<ExportStackParamList>;
};

// ============================================
// STORAGE TYPES
// ============================================

export interface UserSettings {
  themeMode: ThemeMode;
  hapticFeedback: boolean;
  autoSave: boolean;
  defaultExportFormat: ExportFormat;
  defaultExportQuality: number;
  recentAlerts: boolean;
}

export interface UserData {
  settings: UserSettings;
  favorites: string[]; // photo IDs
  history: Photo[];
  editorPresets: EditorHistoryEntry[];
  collageTemplates: CollageLayout[];
}

// ============================================
// ANIMATION TYPES
// ============================================

export interface AnimationConfig {
  duration: number;
  damping?: number;
  stiffness?: number;
  mass?: number;
}

export interface GestureConfig {
  minDistance?: number;
  maxOffset?: number;
  velocity?: number;
}

// ============================================
// COMPONENT PROP TYPES
// ============================================

export interface GlassCardProps {
  children: React.ReactNode;
  style?: object;
  blurAmount?: number;
  opacity?: number;
}

export interface NeumorphicButtonProps {
  onPress: () => void;
  children: React.ReactNode;
  style?: object;
  intensity?: 'light' | 'medium' | 'heavy';
  rounded?: boolean;
}

export interface SkeletonLoaderProps {
  width: number | string;
  height: number;
  borderRadius?: number;
  style?: object;
}

export interface BottomSheetAction {
  id: string;
  title: string;
  icon: string;
  onPress: () => void;
  destructive?: boolean;
}

// ============================================
// API RESPONSE TYPES
// ============================================

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
}

// ============================================
// EVENT TYPES
// ============================================

export interface PullToRefreshEvent {
  refreshing: boolean;
  onRefresh: () => void;
}

export interface LoadMoreEvent {
  loading: boolean;
  onLoadMore: () => void;
}

// ============================================
// UTILITY TYPES
// ============================================

export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

export type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export type RequiredBy<T, K extends keyof T> = T & Required<Pick<T, K>>;

// ============================================
// CONSTANTS
// ============================================

export const DEFAULT_ADJUSTMENT_SETTINGS: AdjustmentSettings = {
  brightness: 0,
  contrast: 0,
  saturation: 0,
  warmth: 0,
  sharpness: 0,
  vibrance: 0,
  highlights: 0,
  shadows: 0,
  clarity: 0,
  dehaze: 0,
  vignette: 0,
};

export const DEFAULT_CROP_SETTINGS: CropSettings = {
  aspectRatio: 'free',
  rotation: 0,
  flipH: false,
  flipV: false,
};

export const DEFAULT_CAMERA_SETTINGS: CameraSettings = {
  resolution: {
    id: '4k',
    name: '4K Ultra HD',
    width: 3840,
    height: 2160,
    quality: 'ultra',
  },
  aspectRatio: {
    id: '16:9',
    name: '16:9',
    width: 16,
    height: 9,
  },
  videoStabilization: 'off',
  flash: 'off',
  grid: 'off',
  timer: 'off',
  hdr: 'auto',
};

export const DEFAULT_EXPORT_SETTINGS: ExportSettings = {
  quality: {
    id: 'original',
    name: 'Original',
    percentage: 100,
  },
  format: 'jpg',
  resize: {
    id: 'original',
    name: 'Original',
    width: 0,
    height: 0,
  },
};

// ============================================
// MOCK DATA GENERATORS
// ============================================

export const generateMockPhotos = (count: number): Photo[] => {
  const photos: Photo[] = [];
  const formats: ('jpg' | 'png' | 'webp' | 'heic')[] = ['jpg', 'png', 'webp'];
  
  for (let i = 0; i < count; i++) {
    photos.push({
      id: `photo_${i}_${Date.now()}`,
      uri: `https://picsum.photos/seed/${i}/1920/1080`,
      thumbnailUri: `https://picsum.photos/seed/${i}/200/200`,
      width: 1920,
      height: 1080,
      date: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000),
      size: Math.floor(Math.random() * 5000000),
      format: formats[Math.floor(Math.random() * formats.length)],
      isFavorite: Math.random() > 0.8,
      albumId: `album_${Math.floor(Math.random() * 5)}`,
      exifData: {
        camera: 'iPhone 15 Pro',
        iso: [100, 200, 400, 800][Math.floor(Math.random() * 4)],
        aperture: ['f/1.8', 'f/2.0', 'f/2.4'][Math.floor(Math.random() * 3)],
        shutterSpeed: ['1/60', '1/120', '1/250', '1/500'][Math.floor(Math.random() * 4)],
      },
    });
  }
  
  return photos;
};

export const generateMockFilters = (): Filter[] => {
  const filterNames = [
    'Original', 'Vivid', 'Dramatic', 'Mono', 'Noir', 'Fade', 'Chrome', 'Process',
    'Transfer', 'Toning', 'Sepia', 'Retro', 'Comic', 'Poster', 'Pop Art',
    'Comic Book', 'Fantasy', 'Express', 'Neo', 'Film', 'Instant', 'Café',
    'Street', 'Dynamic', 'Passion', 'Desert', 'Forest', 'Ocean', 'Mountain',
    'Summer', 'Winter', 'Autumn', 'Spring', 'Urban', 'Vintage', '1977', '1980',
    '1985', '1990', 'Calm', 'Happy', 'Sad', 'Energetic', 'Mellow',
    'Bold', 'Subtle', 'Warmth', 'Cool', 'Tropical', 'Nordic', 'Tokyo',
    'Paris', 'London', 'New York',
  ];
  
  return filterNames.map((name, index) => ({
    id: `filter_${index}`,
    name,
    previewUri: `https://picsum.photos/seed/filter${index}/100/100`,
    category: (['classic', 'vivid', 'moody', 'bw', 'cinema', 'vintage'] as const)[index % 6],
    intensity: 100,
    settings: {},
    isPreset: index === 0,
    isPremium: index > 20,
  }));
};

export const generateMockAlbums = (): Album[] => {
  const albumNames = [
    'All Photos', 'Favorites', 'Recents', 'Nature', 'Travel', 'Family',
    'Friends', 'Events', 'Work', 'Portfolio', 'Art', 'Architecture',
    'Food', 'Sports', 'Music', 'Fashion', 'Beauty', 'Technology',
  ];
  
  return albumNames.map((name, index) => ({
    id: `album_${index}`,
    name,
    coverPhotoUri: `https://picsum.photos/seed/album${index}/200/200`,
    photoCount: Math.floor(Math.random() * 100) + 10,
    createdAt: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000),
  }));
};

export const generateMockEditorTools = (): EditorTool[] => {
  const tools: EditorTool[] = [
    { id: 'brightness', name: 'Brightness', icon: 'sun', category: 'adjust', description: 'Adjust image brightness', isAdvanced: false },
    { id: 'contrast', name: 'Contrast', icon: 'contrast', category: 'adjust', description: 'Adjust image contrast', isAdvanced: false },
    { id: 'saturation', name: 'Saturation', icon: 'water', category: 'adjust', description: 'Adjust color saturation', isAdvanced: false },
    { id: 'warmth', name: 'Warmth', icon: 'thermometer', category: 'adjust', description: 'Adjust color warmth', isAdvanced: false },
    { id: 'sharpness', name: 'Sharpness', icon: 'sharpness', category: 'adjust', description: 'Enhance image sharpness', isAdvanced: false },
    { id: 'vibrance', name: 'Vibrance', icon: 'palette', category: 'adjust', description: 'Adjust color vibrance', isAdvanced: false },
    { id: 'highlights', name: 'Highlights', icon: 'wb-sunny', category: 'adjust', description: 'Adjust highlight areas', isAdvanced: false },
    { id: 'shadows', name: 'Shadows', icon: 'brightness-3', category: 'adjust', description: 'Adjust shadow areas', isAdvanced: false },
    { id: 'clarity', name: 'Clarity', icon: 'blur-on', category: 'adjust', description: 'Enhance image clarity', isAdvanced: false },
    { id: 'dehaze', name: 'Dehaze', icon: 'cloud-off', category: 'adjust', description: 'Reduce haze in images', isAdvanced: false },
    { id: 'vignette', name: 'Vignette', icon: 'radio-button-unchecked', category: 'adjust', description: 'Add vignette effect', isAdvanced: false },
    { id: 'filters', name: 'Filters', icon: 'filter', category: 'filters', description: 'Browse and apply filters', isAdvanced: false },
    { id: 'crop', name: 'Crop', icon: 'crop', category: 'crop', description: 'Crop and rotate image', isAdvanced: false },
    { id: 'straighten', name: 'Straighten', icon: 'rotate-right', category: 'crop', description: 'Straighten image', isAdvanced: false },
    { id: 'flip', name: 'Flip', icon: 'flip', category: 'crop', description: 'Flip image horizontally', isAdvanced: false },
    { id: 'retouch', name: 'Retouch', icon: 'auto-fix-high', category: 'retouch', description: 'Retouch and heal', isAdvanced: false },
    { id: 'clone', name: 'Clone Stamp', icon: 'content-copy', category: 'retouch', description: 'Clone stamp tool', isAdvanced: true },
    { id: 'heal', name: 'Heal', icon: 'healing', category: 'retouch', description: 'Heal imperfections', isAdvanced: false },
    { id: 'redeye', name: 'Red Eye', icon: 'remove-red-eye', category: 'retouch', description: 'Remove red eye', isAdvanced: false },
    { id: 'whiten', name: 'Whiten Teeth', icon: 'auto-awesome', category: 'retouch', description: 'Whiten teeth', isAdvanced: false },
    { id: 'text', name: 'Text', icon: 'text-fields', category: 'text', description: 'Add text overlays', isAdvanced: false },
    { id: 'stickers', name: 'Stickers', icon: 'emoji-emotions', category: 'stickers', description: 'Add stickers', isAdvanced: false },
    { id: 'draw', name: 'Draw', icon: 'draw', category: 'draw', description: 'Draw on image', isAdvanced: false },
    { id: 'effects', name: 'Effects', icon: 'auto-awesome-mosaic', category: 'effects', description: 'Add special effects', isAdvanced: false },
    { id: 'curves', name: 'Curves', icon: 'show-chart', category: 'adjust', description: 'Advanced curves adjustment', isAdvanced: true },
    { id: 'hsl', name: 'HSL', icon: 'color-lens', category: 'adjust', description: 'HSL color adjustment', isAdvanced: true },
  ];
  
  return tools;
};

export const generateMockCollageLayouts = (): CollageLayout[] => {
  const layouts: CollageLayout[] = [
    { id: 'layout_1', name: '2-Up', cells: [{ id: 'c1', row: 0, col: 0, rowSpan: 1, colSpan: 1, position: { x: 0, y: 0 }, zoom: 1 }, { id: 'c2', row: 0, col: 1, rowSpan: 1, colSpan: 1, position: { x: 0, y: 0 }, zoom: 1 }], maxPhotos: 2, category: 'grid', isPremium: false },
    { id: 'layout_2', name: '3-Up', cells: [{ id: 'c1', row: 0, col: 0, rowSpan: 1, colSpan: 1, position: { x: 0, y: 0 }, zoom: 1 }, { id: 'c2', row: 0, col: 1, rowSpan: 1, colSpan: 1, position: { x: 0, y: 0 }, zoom: 1 }, { id: 'c3', row: 0, col: 2, rowSpan: 1, colSpan: 1, position: { x: 0, y: 0 }, zoom: 1 }], maxPhotos: 3, category: 'grid', isPremium: false },
    { id: 'layout_3', name: '2x2 Grid', cells: Array.from({ length: 4 }, (_, i) => ({ id: `c${i}`, row: Math.floor(i / 2), col: i % 2, rowSpan: 1, colSpan: 1, position: { x: 0, y: 0 }, zoom: 1 })), maxPhotos: 4, category: 'grid', isPremium: false },
    { id: 'layout_4', name: '4-Up', cells: Array.from({ length: 4 }, (_, i) => ({ id: `c${i}`, row: i < 2 ? 0 : 1, col: i % 2, rowSpan: 1, colSpan: 1, position: { x: 0, y: 0 }, zoom: 1 })), maxPhotos: 4, category: 'grid', isPremium: false },
    { id: 'layout_5', name: '5-Up', cells: Array.from({ length: 5 }, (_, i) => ({ id: `c${i}`, row: i < 3 ? 0 : 1, col: i < 3 ? i : i - 3, rowSpan: 1, colSpan: 1, position: { x: 0, y: 0 }, zoom: 1 })), maxPhotos: 5, category: 'grid', isPremium: false },
    { id: 'layout_6', name: '6-Up', cells: Array.from({ length: 6 }, (_, i) => ({ id: `c${i}`, row: Math.floor(i / 3), col: i % 3, rowSpan: 1, colSpan: 1, position: { x: 0, y: 0 }, zoom: 1 })), maxPhotos: 6, category: 'grid', isPremium: false },
    { id: 'layout_7', name: '2x3 Grid', cells: Array.from({ length: 6 }, (_, i) => ({ id: `c${i}`, row: Math.floor(i / 3), col: i % 3, rowSpan: 1, colSpan: 1, position: { x: 0, y: 0 }, zoom: 1 })), maxPhotos: 6, category: 'grid', isPremium: false },
    { id: 'layout_8', name: '3x3 Grid', cells: Array.from({ length: 9 }, (_, i) => ({ id: `c${i}`, row: Math.floor(i / 3), col: i % 3, rowSpan: 1, colSpan: 1, position: { x: 0, y: 0 }, zoom: 1 })), maxPhotos: 9, category: 'grid', isPremium: false },
  ];
  
  return layouts;
};

export const generateMockAISuggestions = (): AISuggestion[] => {
  const suggestions: AISuggestion[] = [
    { id: 's1', text: 'How do I crop a photo?', icon: 'help' },
    { id: 's2', text: 'Add a filter', icon: 'filter' },
    { id: 's3', text: 'Adjust brightness', icon: 'brightness' },
    { id: 's4', text: 'Remove background', icon: 'layers' },
    { id: 's5', text: 'Add text to photo', icon: 'text' },
    { id: 's6', text: 'Create a collage', icon: 'grid' },
    { id: 's7', text: 'Export in high quality', icon: 'save' },
    { id: 's8', text: 'Apply vintage look', icon: 'style' },
  ];
  
  return suggestions;
};

export const DEFAULT_AI_RESPONSES = [
  "I'd be happy to help with that! You can find the tool in the editor panel on this screen.",
  "Great question! Tap any tool to see its options and adjustments.",
  "For best results, try adjusting the highlights and shadows separately.",
  "You can save your favorite edits as presets for quick access later.",
  "The filter intensity can be adjusted using the slider below each preview.",
  "Pull down to refresh and load more photos from your gallery.",
  "Tap and hold on any photo to add it to your favorites.",
  "Use two fingers to pinch and zoom anywhere on the image.",
];