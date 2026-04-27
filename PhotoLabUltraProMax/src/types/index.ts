// PhotoLab Ultra Pro Max - TypeScript Types
// Complete type definitions for the entire app

export interface UserSettings {
  darkMode: boolean;
  hapticFeedback: boolean;
  autoSave: boolean;
  defaultExportQuality: number;
  defaultAspectRatio: string;
  gridOverlay: boolean;
  locationTags: boolean;
  faceDetection: boolean;
  aiAssistantEnabled: boolean;
}

export interface PhotoItem {
  id: string;
  uri: string;
  filename: string;
  width: number;
  height: number;
  createdAt: number;
  fileSize: number;
  isFavorite: boolean;
  albumId?: string;
  tags: string[];
  location?: LocationData;
  cameraSettings?: CameraSettings;
}

export interface LocationData {
  latitude: number;
  longitude: number;
  placeName?: string;
}

export interface CameraSettings {
  flash: 'on' | 'off' | 'auto' | 'torch';
  gridLines: boolean;
  timer: number;
  hdr: boolean;
  resolution: ResolutionOption;
  aspectRatio: AspectRatio;
  stabilization: boolean;
  iso: number;
  shutterSpeed: number;
  whiteBalance: number;
  focusMode: 'auto' | 'manual' | 'continuous';
}

export type ResolutionOption = '4K' | '1080p' | '720p' | '480p';
export type AspectRatio = '16:9' | '4:3' | '1:1' | '9:16';
export type CaptureMode = 'photo' | 'video' | 'portrait' | 'night' | 'pro' | 'panorama' | 'slow_motion';

export interface Album {
  id: string;
  name: string;
  coverPhoto?: string;
  photoCount: number;
  createdAt: number;
  isSmartAlbum: boolean;
}

export interface FilterPreset {
  id: string;
  name: string;
  previewUri: string;
  intensity: number;
  adjustments: AdjustmentSettings;
  category: FilterCategory;
}

export type FilterCategory = 'vivid' | 'dramatic' | 'mono' | 'noir' | 'vintage' | 'cinematic' | 'natural' | 'moody';

export interface AdjustmentSettings {
  brightness: number;
  contrast: number;
  saturation: number;
  warmth: number;
  highlights: number;
  shadows: number;
  vibrance: number;
  clarity: number;
  exposure: number;
  blacks: number;
  whites: number;
  hue: number;
}

export interface FilterSettings {
  filterId: string;
  name: string;
  previewIntensity: number;
  appliedIntensity: number;
}

export interface CropSettings {
  ratio: AspectRatio | 'free';
  rotation: number;
  flipHorizontal: boolean;
  flipVertical: boolean;
  x: number;
  y: number;
  width: number;
  height: number;
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

export interface StickerItem {
  id: string;
  name: string;
  uri: string;
  category: string;
  isAnimated: boolean;
  position: { x: number; y: number };
  scale: number;
  rotation: number;
}

export interface CollageLayout {
  id: string;
  name: string;
  cells: number;
  rows: number;
  cols: number;
  previewUri: string;
  category: 'grid' | 'masonry' | 'artistic' | 'freestyle';
}

export interface CollagePhoto {
  photoId: string;
  originalIndex: number;
  position: { row: number; col: number };
  cropSettings: CropSettings;
}

export interface CollageBackground {
  type: 'color' | 'gradient' | 'pattern';
  color?: string;
  gradientColors?: string[];
  patternUri?: string;
}

export interface ExportSettings {
  quality: number;
  format: 'jpeg' | 'png' | 'webp';
  resizeMode: 'original' | 'custom';
  customWidth?: number;
  customHeight?: number;
  metadata: boolean;
  watermark: boolean;
}

export interface ShareDestination {
  id: string;
  name: string;
  icon: string;
  enabled: boolean;
}

export interface HistoryEntry {
  id: string;
  action: 'edit' | 'filter' | 'crop' | 'text' | 'sticker' | 'export';
  timestamp: number;
  parameters: Record<string, any>;
  previewUri?: string;
}

export interface AIChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}

export interface NotificationItem {
  id: string;
  type: 'info' | 'success' | 'warning' | 'error';
  title: string;
  message: string;
  timestamp: number;
  read: boolean;
}

export interface LoadingState {
  isLoading: boolean;
  progress?: number;
  message?: string;
}

export interface SkeletonItem {
  id: string;
  width: number | '100%';
  height: number;
  borderRadius: number;
}

export interface BottomSheetOption {
  id: string;
  label: string;
  icon?: string;
  onPress: () => void;
  destructive?: boolean;
  disabled?: boolean;
}

export interface ToastConfig {
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
  duration: number;
}

export interface AnimationConfig {
  type: 'scale' | 'spring' | 'fade' | 'slide' | 'rotate';
  duration?: number;
  easing?: 'easeInOut' | 'spring' | 'bounce';
  fromValue?: number;
  toValue?: number;
}

export interface NavigationRoute {
  name: string;
  params?: Record<string, any>;
}

export interface TabBarIcon {
  focused: boolean;
  color: string;
  size: number;
}

// Theme Types
export interface ThemeColors {
  primary: string;
  secondary: string;
  background: string;
  surface: string;
  card: string;
  text: string;
  textSecondary: string;
  border: string;
  accent: string;
  gradient: string[];
  glass: string;
  error: string;
  success: string;
  warning: string;
}

export interface Theme {
  dark: boolean;
  colors: ThemeColors;
  spacing: ThemeSpacing;
  borderRadius: ThemeBorderRadius;
  typography: ThemeTypography;
}

export interface ThemeSpacing {
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
  xxl: number;
}

export interface ThemeBorderRadius {
  sm: number;
  md: number;
  lg: number;
  xl: number;
  full: number;
}

export interface ThemeTypography {
  h1: TextStyle;
  h2: TextStyle;
  h3: TextStyle;
  body: TextStyle;
  caption: TextStyle;
  button: TextStyle;
}

export interface TextStyle {
  fontSize: number;
  fontWeight: '400' | '500' | '600' | '700';
  lineHeight: number;
  letterSpacing?: number;
}

// Context Types
export interface AppState {
  settings: UserSettings;
  favorites: string[];
  history: HistoryEntry[];
  currentTheme: Theme;
  aiMessages: AIChatMessage[];
  notifications: NotificationItem[];
}

export interface AppContextType extends AppState {
  toggleDarkMode: () => void;
  updateSettings: (settings: Partial<UserSettings>) => void;
  addFavorite: (photoId: string) => void;
  removeFavorite: (photoId: string) => void;
  addToHistory: (entry: Omit<HistoryEntry, 'id' | 'timestamp'>) => void;
  clearHistory: () => void;
  sendAIMessage: (message: string) => Promise<void>;
}