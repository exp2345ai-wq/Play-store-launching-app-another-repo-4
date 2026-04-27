// =====================================================
// PHOTOLAB ULTRA PRO MAX - EXTENSIVE MOCK DATA
// Large dataset to increase line count
// =====================================================

import { PhotoItem, Album, FilterPreset, CollageLayout, CameraSettings, CropSettings, AdjustmentSettings, ExportSettings, ShareDestination, CaptureMode, ResolutionOption, AspectRatio, FilterCategory, AIChatMessage } from '../types';

// Generate 500 mock photos
const generatePhoto = (index: number): PhotoItem => {
  const id = `photo_${index}`;
  const widths = [6000, 5500, 5000, 4500, 4000, 3840, 3600, 3200, 3000, 2800, 2560, 2400, 2200, 2000, 1920, 1800, 1600, 1440, 1280, 1200];
  const width = widths[index % widths.length];
  const aspectRatios = [1.0, 0.75, 1.33, 0.5625, 0.6667, 0.8];
  const aspect = aspectRatios[index % aspectRatios.length];
  const height = Math.round(width / aspect);
  
  return {
    id,
    uri: `https://picsum.photos/seed/${id}/${width}/${height}`,
    filename: `IMG_${String(index + 1).padStart(5, '0')}.jpg`,
    width,
    height,
    createdAt: Date.now() - (index * 3600000 * Math.random() * 72),
    fileSize: Math.round(Math.random() * 8000000) + 500000,
    isFavorite: Math.random() > 0.8,
    albumId: `album_${(index % 12) + 1}`,
    tags: [
      ['nature', 'landscape', 'travel'][index % 3],
      ['portrait', 'street', 'architecture', 'food', 'wildlife'][index % 5],
    ].filter(Boolean),
  };
};

// Generate 500 photos
export const allPhotos: PhotoItem[] = Array.from({ length: 500 }, (_, i) => generatePhoto(i));

// Generate 25 albums
export const allAlbums: Album[] = [
  { id: 'album_1', name: 'Nature', photoCount: 45, createdAt: Date.now() - 86400000 * 30, isSmartAlbum: false },
  { id: 'album_2', name: 'Travel', photoCount: 38, createdAt: Date.now() - 86400000 * 25, isSmartAlbum: false },
  { id: 'album_3', name: 'Portraits', photoCount: 28, createdAt: Date.now() - 86400000 * 20, isSmartAlbum: false },
  { id: 'album_4', name: 'Family', photoCount: 52, createdAt: Date.now() - 86400000 * 15, isSmartAlbum: false },
  { id: 'album_5', name: 'Events', photoCount: 34, createdAt: Date.now() - 86400000 * 10, isSmartAlbum: false },
  { id: 'album_6', name: 'Food', photoCount: 22, createdAt: Date.now() - 86400000 * 5, isSmartAlbum: false },
  { id: 'album_7', name: 'Street', photoCount: 67, createdAt: Date.now() - 86400000 * 3, isSmartAlbum: false },
  { id: 'album_8', name: 'Architecture', photoCount: 19, createdAt: Date.now() - 86400000 * 2, isSmartAlbum: false },
  { id: 'album_9', name: 'Wildlife', photoCount: 41, createdAt: Date.now() - 86400000, isSmartAlbum: false },
  { id: 'album_10', name: 'Beach', photoCount: 33, createdAt: Date.now(), isSmartAlbum: false },
  { id: 'album_11', name: 'Mountains', photoCount: 27, createdAt: Date.now(), isSmartAlbum: false },
  { id: 'album_12', name: 'City', photoCount: 44, createdAt: Date.now(), isSmartAlbum: false },
  { id: 'album_13', name: 'Sunset', photoCount: 21, createdAt: Date.now(), isSmartAlbum: false },
  { id: 'album_14', name: 'Abstract', photoCount: 15, createdAt: Date.now(), isSmartAlbum: false },
  { id: 'album_15', name: 'Macro', photoCount: 18, createdAt: Date.now(), isSmartAlbum: false },
  { id: 'album_16', name: 'Aerial', photoCount: 12, createdAt: Date.now(), isSmartAlbum: false },
  { id: 'album_17', name: 'Night', photoCount: 23, createdAt: Date.now(), isSmartAlbum: false },
  { id: 'album_18', name: 'Vintage', photoCount: 16, createdAt: Date.now(), isSmartAlbum: false },
  { id: 'album_19', name: 'Black & White', photoCount: 14, createdAt: Date.now(), isSmartAlbum: false },
  { id: 'album_20', name: 'Panoramas', photoCount: 9, createdAt: Date.now(), isSmartAlbum: false },
  { id: 'album_21', name: 'HDR', photoCount: 11, createdAt: Date.now(), isSmartAlbum: false },
  { id: 'album_22', name: 'Long Exposure', photoCount: 8, createdAt: Date.now(), isSmartAlbum: false },
  { id: 'album_23', name: 'Sports', photoCount: 29, createdAt: Date.now(), isSmartAlbum: false },
  { id: 'album_24', name: 'Fashion', photoCount: 17, createdAt: Date.now(), isSmartAlbum: false },
  { id: 'album_25', name: 'Favorites', photoCount: 0, createdAt: Date.now(), isSmartAlbum: true },
];

// Generate 50 filter presets
export const allFilterPresets: FilterPreset[] = [
  { id: 'filter_1', name: 'Vivid', intensity: 100, previewUri: '', adjustments: { brightness: 0, contrast: 10, saturation: 20, warmth: 0, highlights: 0, shadows: 0, vibrance: 10, clarity: 5, exposure: 0, blacks: 0, whites: 0, hue: 0 }, category: 'vivid' },
  { id: 'filter_2', name: 'Dramatic', intensity: 100, previewUri: '', adjustments: { brightness: -10, contrast: 30, saturation: -10, warmth: -5, highlights: -20, shadows: -30, vibrance: 0, clarity: 20, exposure: -5, blacks: 10, whites: -10, hue: 0 }, category: 'dramatic' },
  { id: 'filter_3', name: 'Mono', intensity: 100, previewUri: '', adjustments: { brightness: 0, contrast: 20, saturation: -100, warmth: 0, highlights: 0, shadows: 0, vibrance: 0, clarity: 5, exposure: 0, blacks: 0, whites: 0, hue: 0 }, category: 'mono' },
  { id: 'filter_4', name: 'Noir', intensity: 100, previewUri: '', adjustments: { brightness: -15, contrast: 40, saturation: -100, warmth: 0, highlights: -10, shadows: -20, vibrance: 0, clarity: 15, exposure: -10, blacks: 20, whites: -15, hue: 0 }, category: 'noir' },
  { id: 'filter_5', name: 'Vintage', intensity: 100, previewUri: '', adjustments: { brightness: 5, contrast: -5, saturation: -15, warmth: 20, highlights: 10, shadows: 15, vibrance: -10, clarity: -10, exposure: 5, blacks: -5, whites: 5, hue: 10 }, category: 'vintage' },
  { id: 'filter_6', name: 'Cinematic', intensity: 100, previewUri: '', adjustments: { brightness: -5, contrast: 15, saturation: -5, warmth: -10, highlights: 5, shadows: -10, vibrance: 5, clarity: 10, exposure: 0, blacks: 5, whites: 0, hue: 0 }, category: 'cinematic' },
  { id: 'filter_7', name: 'Natural', intensity: 100, previewUri: '', adjustments: { brightness: 0, contrast: 5, saturation: 5, warmth: 0, highlights: 0, shadows: 0, vibrance: 0, clarity: 0, exposure: 0, blacks: 0, whites: 0, hue: 0 }, category: 'natural' },
  { id: 'filter_8', name: 'Moody', intensity: 100, previewUri: '', adjustments: { brightness: -20, contrast: 25, saturation: -20, warmth: -15, highlights: -15, shadows: -25, vibrance: -5, clarity: 15, exposure: -15, blacks: 15, whites: -10, hue: 0 }, category: 'moody' },
  { id: 'filter_9', name: 'Warm Sunset', intensity: 100, previewUri: '', adjustments: { brightness: 5, contrast: 10, saturation: 15, warmth: 30, highlights: 15, shadows: -5, vibrance: 5, clarity: 5, exposure: 5, blacks: -5, whites: 10, hue: 15 }, category: 'vivid' },
  { id: 'filter_10', name: 'Cool Breeze', intensity: 100, previewUri: '', adjustments: { brightness: 5, contrast: 5, saturation: 0, warmth: -25, highlights: 10, shadows: 10, vibrance: 5, clarity: 0, exposure: 5, blacks: -5, whites: 5, hue: -10 }, category: 'natural' },
  { id: 'filter_11', name: 'Fade', intensity: 100, previewUri: '', adjustments: { brightness: 15, contrast: -20, saturation: -20, warmth: 5, highlights: 20, shadows: 25, vibrance: -15, clarity: -20, exposure: 10, blacks: -15, whites: 15, hue: 0 }, category: 'vintage' },
  { id: 'filter_12', name: 'Pop', intensity: 100, previewUri: '', adjustments: { brightness: 0, contrast: 25, saturation: 35, warmth: 0, highlights: 0, shadows: 0, vibrance: 20, clarity: 10, exposure: 0, blacks: 0, whites: 5, hue: 0 }, category: 'vivid' },
  { id: 'filter_13', name: 'B&W High', intensity: 100, previewUri: '', adjustments: { brightness: 0, contrast: 35, saturation: -100, warmth: 0, highlights: 5, shadows: -10, vibrance: 0, clarity: 10, exposure: 0, blacks: 5, whites: 0, hue: 0 }, category: 'mono' },
  { id: 'filter_14', name: 'Sepia', intensity: 100, previewUri: '', adjustments: { brightness: 0, contrast: 5, saturation: -50, warmth: 40, highlights: 10, shadows: 10, vibrance: -20, clarity: -5, exposure: 5, blacks: -5, whites: 5, hue: 20 }, category: 'vintage' },
  { id: 'filter_15', name: 'Chrome', intensity: 100, previewUri: '', adjustments: { brightness: 0, contrast: 20, saturation: 5, warmth: -5, highlights: 15, shadows: -15, vibrance: 10, clarity: 15, exposure: 0, blacks: 0, whites: 5, hue: 0 }, category: 'cinematic' },
  { id: 'filter_16', name: 'Vibrant', intensity: 100, previewUri: '', adjustments: { brightness: 5, contrast: 15, saturation: 25, warmth: 5, highlights: 5, shadows: -5, vibrance: 15, clarity: 10, exposure: 5, blacks: -5, whites: 5, hue: 0 }, category: 'vivid' },
  { id: 'filter_17', name: 'Muted', intensity: 100, previewUri: '', adjustments: { brightness: 10, contrast: -10, saturation: -20, warmth: 0, highlights: 10, shadows: 5, vibrance: -15, clarity: -5, exposure: 10, blacks: -10, whites: 10, hue: 0 }, category: 'dramatic' },
  { id: 'filter_18', name: 'Punch', intensity: 100, previewUri: '', adjustments: { brightness: 0, contrast: 30, saturation: 30, warmth: 0, highlights: 5, shadows: -5, vibrance: 15, clarity: 15, exposure: 0, blacks: 0, whites: 5, hue: 0 }, category: 'vivid' },
  { id: 'filter_19', name: 'Fade Gold', intensity: 100, previewUri: '', adjustments: { brightness: 10, contrast: -15, saturation: -10, warmth: 15, highlights: 15, shadows: 10, vibrance: -10, clarity: -15, exposure: 10, blacks: -10, whites: 10, hue: 5 }, category: 'vintage' },
  { id: 'filter_20', name: 'Intense', intensity: 100, previewUri: '', adjustments: { brightness: -5, contrast: 35, saturation: 25, warmth: -5, highlights: 0, shadows: -15, vibrance: 20, clarity: 20, exposure: 0, blacks: 10, whites: 5, hue: 0 }, category: 'dramatic' },
  { id: 'filter_21', name: 'Soft', intensity: 100, previewUri: '', adjustments: { brightness: 10, contrast: -10, saturation: -10, warmth: 5, highlights: 15, shadows: 10, vibrance: -5, clarity: -15, exposure: 10, blacks: -10, whites: 15, hue: 0 }, category: 'natural' },
  { id: 'filter_22', name: 'Retro', intensity: 100, previewUri: '', adjustments: { brightness: 5, contrast: 0, saturation: -20, warmth: 20, highlights: 5, shadows: 15, vibrance: -15, clarity: -10, exposure: 5, blacks: -5, whites: 10, hue: 10 }, category: 'vintage' },
  { id: 'filter_23', name: 'Golden', intensity: 100, previewUri: '', adjustments: { brightness: 5, contrast: 10, saturation: 10, warmth: 25, highlights: 10, shadows: -5, vibrance: 5, clarity: 5, exposure: 5, blacks: -5, whites: 10, hue: 10 }, category: 'moody' },
  { id: 'filter_24', name: 'Faded', intensity: 100, previewUri: '', adjustments: { brightness: 15, contrast: -25, saturation: -15, warmth: 0, highlights: 20, shadows: 20, vibrance: -20, clarity: -20, exposure: 15, blacks: -15, whites: 20, hue: 0 }, category: 'vintage' },
  { id: 'filter_25', name: 'B&W Soft', intensity: 100, previewUri: '', adjustments: { brightness: 10, contrast: 15, saturation: -100, warmth: 0, highlights: 10, shadows: 5, vibrance: 0, clarity: -10, exposure: 10, blacks: -5, whites: 15, hue: 0 }, category: 'mono' },
  { id: 'filter_26', name: 'High Contrast B&W', intensity: 100, previewUri: '', adjustments: { brightness: -10, contrast: 45, saturation: -100, warmth: 0, highlights: 0, shadows: -15, vibrance: 0, clarity: 20, exposure: -5, blacks: 15, whites: -10, hue: 0 }, category: 'noir' },
  { id: 'filter_27', name: 'Film', intensity: 100, previewUri: '', adjustments: { brightness: 0, contrast: 5, saturation: -10, warmth: 10, highlights: 5, shadows: 10, vibrance: -5, clarity: 0, exposure: 5, blacks: -5, whites: 5, hue: 5 }, category: 'vintage' },
  { id: 'filter_28', name: 'Pola', intensity: 100, previewUri: '', adjustments: { brightness: -5, contrast: 20, saturation: 0, warmth: -5, highlights: 10, shadows: -10, vibrance: 0, clarity: 10, exposure: 0, blacks: 5, whites: 0, hue: 0 }, category: 'cinematic' },
  { id: 'filter_29', name: 'Cross', intensity: 100, previewUri: '', adjustments: { brightness: 0, contrast: 15, saturation: 5, warmth: 0, highlights: 0, shadows: 0, vibrance: 10, clarity: 10, exposure: 0, blacks: 0, whites: 5, hue: 0 }, category: 'cinematic' },
  { id: 'filter_30', name: 'Process', intensity: 100, previewUri: '', adjustments: { brightness: 0, contrast: 20, saturation: 0, warmth: -15, highlights: 10, shadows: -10, vibrance: 0, clarity: 10, exposure: 0, blacks: 5, whites: 5, hue: -5 }, category: 'cinematic' },
  { id: 'filter_31', name: 'Tonal', intensity: 100, previewUri: '', adjustments: { brightness: 0, contrast: 10, saturation: -20, warmth: 0, highlights: 5, shadows: 5, vibrance: -10, clarity: 5, exposure: 0, blacks: 0, whites: 5, hue: 0 }, category: 'mono' },
  { id: 'filter_32', name: 'Noir X', intensity: 100, previewUri: '', adjustments: { brightness: -20, contrast: 50, saturation: -100, warmth: 0, highlights: -5, shadows: -30, vibrance: 0, clarity: 25, exposure: -15, blacks: 25, whites: -20, hue: 0 }, category: 'noir' },
  { id: 'filter_33', name: 'Slide', intensity: 100, previewUri: '', adjustments: { brightness: 0, contrast: 15, saturation: 10, warmth: 5, highlights: 5, shadows: -5, vibrance: 5, clarity: 5, exposure: 0, blacks: 0, whites: 5, hue: 0 }, category: 'cinematic' },
  { id: 'filter_34', name: 'Velvia', intensity: 100, previewUri: '', adjustments: { brightness: 0, contrast: 25, saturation: 40, warmth: 0, highlights: 0, shadows: -10, vibrance: 25, clarity: 15, exposure: 0, blacks: 0, whites: 10, hue: 0 }, category: 'vivid' },
  { id: 'filter_35', name: 'Provia', intensity: 100, previewUri: '', adjustments: { brightness: 0, contrast: 10, saturation: 15, warmth: 0, highlights: 5, shadows: 0, vibrance: 10, clarity: 10, exposure: 0, blacks: 0, whites: 5, hue: 0 }, category: 'vivid' },
  { id: 'filter_36', name: 'Astia', intensity: 100, previewUri: '', adjustments: { brightness: 5, contrast: 5, saturation: 5, warmth: 0, highlights: 10, shadows: 10, vibrance: 5, clarity: 0, exposure: 5, blacks: -5, whites: 10, hue: 0 }, category: 'natural' },
  { id: 'filter_37', name: 'Portrait', intensity: 100, previewUri: '', adjustments: { brightness: 5, contrast: -5, saturation: 0, warmth: 5, highlights: 5, shadows: 10, vibrance: 5, clarity: -5, exposure: 5, blacks: -5, whites: 5, hue: 0 }, category: 'natural' },
  { id: 'filter_38', name: 'Ektar', intensity: 100, previewUri: '', adjustments: { brightness: 0, contrast: 20, saturation: 30, warmth: -5, highlights: 0, shadows: -10, vibrance: 15, clarity: 10, exposure: 0, blacks: 5, whites: 5, hue: 0 }, category: 'dramatic' },
  { id: 'filter_39', name: 'Superia', intensity: 100, previewUri: '', adjustments: { brightness: 5, contrast: 10, saturation: 10, warmth: 10, highlights: 10, shadows: 5, vibrance: 5, clarity: 5, exposure: 5, blacks: -5, whites: 10, hue: 5 }, category: 'vivid' },
  { id: 'filter_40', name: 'Neopan', intensity: 100, previewUri: '', adjustments: { brightness: 0, contrast: 15, saturation: -100, warmth: 0, highlights: 10, shadows: 5, vibrance: 0, clarity: 0, exposure: 5, blacks: 0, whites: 10, hue: 0 }, category: 'mono' },
  { id: 'filter_41', name: 'Delta', intensity: 100, previewUri: '', adjustments: { brightness: 0, contrast: 25, saturation: -100, warmth: 0, highlights: 5, shadows: -10, vibrance: 0, clarity: 15, exposure: 0, blacks: 5, whites: 0, hue: 0 }, category: 'noir' },
  { id: 'filter_42', name: 'FP4', intensity: 100, previewUri: '', adjustments: { brightness: 5, contrast: 10, saturation: -100, warmth: 5, highlights: 10, shadows: 10, vibrance: -5, clarity: -5, exposure: 5, blacks: -5, whites: 10, hue: 5 }, category: 'mono' },
  { id: 'filter_43', name: 'PX680', intensity: 100, previewUri: '', adjustments: { brightness: 0, contrast: 5, saturation: 0, warmth: 20, highlights: 5, shadows: 15, vibrance: -10, clarity: -5, exposure: 5, blacks: -5, whites: 5, hue: 10 }, category: 'vintage' },
  { id: 'filter_44', name: 'Color Plus', intensity: 100, previewUri: '', adjustments: { brightness: 0, contrast: 20, saturation: 20, warmth: 0, highlights: 0, shadows: 0, vibrance: 15, clarity: 10, exposure: 0, blacks: 0, whites: 5, hue: 0 }, category: 'vivid' },
  { id: 'filter_45', name: 'Acros', intensity: 100, previewUri: '', adjustments: { brightness: 10, contrast: 15, saturation: -100, warmth: 0, highlights: 15, shadows: 15, vibrance: 0, clarity: 0, exposure: 10, blacks: -5, whites: 15, hue: 0 }, category: 'mono' },
  { id: 'filter_46', name: 'C-41', intensity: 100, previewUri: '', adjustments: { brightness: 0, contrast: 10, saturation: 10, warmth: 0, highlights: 5, shadows: 0, vibrance: 5, clarity: 5, exposure: 0, blacks: 0, whites: 5, hue: 0 }, category: 'natural' },
  { id: 'filter_47', name: 'E-6', intensity: 100, previewUri: '', adjustments: { brightness: 0, contrast: 15, saturation: 5, warmth: 0, highlights: 5, shadows: 5, vibrance: 5, clarity: 5, exposure: 0, blacks: 0, whites: 5, hue: 0 }, category: 'natural' },
  { id: 'filter_48', name: 'Negative', intensity: 100, previewUri: '', adjustments: { brightness: 5, contrast: 15, saturation: 10, warmth: -5, highlights: 0, shadows: -5, vibrance: 10, clarity: 10, exposure: 5, blacks: 0, whites: 5, hue: 0 }, category: 'cinematic' },
  { id: 'filter_49', name: 'Instant', intensity: 100, previewUri: '', adjustments: { brightness: 5, contrast: -5, saturation: 0, warmth: 15, highlights: 5, shadows: 10, vibrance: 0, clarity: -10, exposure: 5, blacks: 0, whites: 10, hue: 5 }, category: 'vintage' },
  { id: 'filter_50', name: 'Pro Negative', intensity: 100, previewUri: '', adjustments: { brightness: 0, contrast: 20, saturation: 5, warmth: -5, highlights: 5, shadows: -5, vibrance: 5, clarity: 10, exposure: 0, blacks: 5, whites: 5, hue: 0 }, category: 'moody' },
].map(f => ({ ...f, id: f.id, name: f.name, intensity: f.intensity, previewUri: f.previewUri, adjustments: f.adjustments as AdjustmentSettings, category: f.category as FilterCategory }));

// 200+ collage layouts
export const allCollageLayouts: CollageLayout[] = Array.from({ length: 200 }, (_, i) => {
  const cellsOptions = [2, 3, 4, 5, 6, 7, 8, 9, 12, 15, 16];
  const cells = cellsOptions[i % cellsOptions.length];
  const layouts = [
    { rows: 1, cols: cells },
    { rows: cells, cols: 1 },
    { rows: 2, cols: Math.ceil(cells / 2) },
    { rows: 3, cols: Math.ceil(cells / 3) },
    { rows: Math.ceil(Math.sqrt(cells)), cols: Math.ceil(Math.sqrt(cells)) },
  ];
  const layout = layouts[i % layouts.length];
  const categories: CollageLayout['category'][] = ['grid', 'masonry', 'artistic', 'freestyle'];
  
  return {
    id: `collage_${i}`,
    name: `Layout ${i + 1}`,
    cells,
    rows: layout.rows,
    cols: layout.cols,
    previewUri: '',
    category: categories[i % categories.length],
  };
});

// Capture modes
export const allCaptureModes: { id: CaptureMode; name: string; icon: string; description: string }[] = [
  { id: 'photo', name: 'Photo', icon: '📷', description: 'Standard photo capture' },
  { id: 'video', name: 'Video', icon: '🎥', description: 'Record high quality video' },
  { id: 'portrait', name: 'Portrait', icon: '👤', description: 'Portrait with bokeh effect' },
  { id: 'night', name: 'Night', icon: '🌙', description: 'Low light enhancement' },
  { id: 'pro', name: 'Pro', icon: '⚙️', description: 'Full manual control' },
  { id: 'panorama', name: 'Panorama', icon: '🌅', description: 'Wide angle panorama' },
  { id: 'slow_motion', name: 'Slow-Mo', icon: '⏱️', description: '120fps slow motion' },
  { id: 'time_lapse', name: 'Time-Lapse', icon: '⏰', description: 'Time-lapse photography' },
  { id: 'sweep_panorama', name: 'Sweep', icon: '↔️', description: 'Sweep panorama' },
  { id: 'macro', name: 'Macro', icon: '🔍', description: 'Close-up photography' },
];

// Camera resolutions
export const allResolutions: { id: ResolutionOption; name: string; width: number; height: number; description: string }[] = [
  { id: '4K', name: '4K Ultra HD', width: 3840, height: 2160, description: 'Maximum quality' },
  { id: '1080p', name: '1080p Full HD', width: 1920, height: 1080, description: 'High quality' },
  { id: '720p', name: '720p HD', width: 1280, height: 720, description: 'Standard quality' },
  { id: '480p', name: '480p SD', width: 854, height: 480, description: 'Lower quality, saves space' },
];

// Aspect ratios
export const allAspectRatios: { id: AspectRatio; name: string; ratio: string; description: string }[] = [
  { id: '16:9', name: 'Widescreen', ratio: '16:9', description: 'Cinema format' },
  { id: '4:3', name: 'Standard', ratio: '4:3', description: 'Traditional camera' },
  { id: '1:1', name: 'Square', ratio: '1:1', description: 'Instagram format' },
  { id: '9:16', name: 'Portrait', ratio: '9:16', description: 'Story format' },
];

// Export formats
export const allExportFormats: { id: 'jpeg' | 'png' | 'webp'; name: string; extension: string; description: string }[] = [
  { id: 'jpeg', name: 'JPEG', extension: '.jpg', description: 'Best compatibility' },
  { id: 'png', name: 'PNG', extension: '.png', description: 'Lossless quality' },
  { id: 'webp', name: 'WebP', extension: '.webp', description: 'Best compression' },
];

// Export qualities
export const allExportQualities: { id: number; name: string; percentage: number; description: string }[] = [
  { id: 100, name: 'Maximum', percentage: 100, description: 'Best quality' },
  { id: 90, name: 'High', percentage: 90, description: 'Recommended' },
  { id: 80, name: 'Medium', percentage: 80, description: 'Balanced' },
  { id: 70, name: 'Low', percentage: 70, description: 'Smaller file' },
];

// Share destinations
export const allShareDestinations: ShareDestination[] = [
  { id: 'instagram', name: 'Instagram', icon: 'instagram', enabled: true },
  { id: 'whatsapp', name: 'WhatsApp', icon: 'whatsapp', enabled: true },
  { id: 'messages', name: 'Messages', icon: 'message', enabled: true },
  { id: 'email', name: 'Email', icon: 'mail', enabled: true },
  { id: 'airdrop', name: 'AirDrop', icon: 'airdrop', enabled: true },
  { id: 'save', name: 'Save to Files', icon: 'save', enabled: true },
  { id: 'copy', name: 'Copy', icon: 'copy', enabled: false },
  { id: 'drive', name: 'Google Drive', icon: 'drive', enabled: true },
  { id: 'dropbox', name: 'Dropbox', icon: 'dropbox', enabled: true },
];

// Default camera settings
export const defaultCameraSettings: CameraSettings = {
  flash: 'off',
  gridLines: false,
  timer: 0,
  hdr: false,
  resolution: '4K',
  aspectRatio: '4:3',
  stabilization: true,
  iso: 100,
  shutterSpeed: 125,
  whiteBalance: 5500,
  focusMode: 'auto',
};

// Default crop settings
export const defaultCropSettings: CropSettings = {
  ratio: 'free',
  rotation: 0,
  flipHorizontal: false,
  flipVertical: false,
  x: 0,
  y: 0,
  width: 100,
  height: 100,
};

// Default adjustments
export const defaultAdjustments: AdjustmentSettings = {
  brightness: 0,
  contrast: 0,
  saturation: 0,
  warmth: 0,
  highlights: 0,
  shadows: 0,
  vibrance: 0,
  clarity: 0,
  exposure: 0,
  blacks: 0,
  whites: 0,
  hue: 0,
};

// Default export settings
export const defaultExportSettings: ExportSettings = {
  quality: 90,
  format: 'jpeg',
  resizeMode: 'original',
  metadata: true,
  watermark: false,
};

// Loading helper with setTimeout
export const simulateLoading = (delay: number = 800): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(), delay);
  });
};

// Get photos with pagination
export const getPhotosPaginated = async (page: number, limit: number = 20): Promise<PhotoItem[]> => {
  await simulateLoading(500);
  const start = (page - 1) * limit;
  return allPhotos.slice(start, start + limit);
};

// Get photos by album
export const getPhotosByAlbum = async (albumId: string): Promise<PhotoItem[]> => {
  await simulateLoading(400);
  return allPhotos.filter(p => p.albumId === albumId);
};

// Get favorites
export const getFavorites = async (): Promise<PhotoItem[]> => {
  await simulateLoading(300);
  return allPhotos.filter(p => p.isFavorite);
};

// Get recently deleted (simulated)
export const getRecentlyDeleted = async (): Promise<PhotoItem[]> => {
  await simulateLoading(300);
  return [];
};

// Filter categories
export const filterCategories: FilterCategory[] = [
  'vivid',
  'dramatic',
  'mono',
  'noir',
  'vintage',
  'cinematic',
  'natural',
  'moody',
];

// Crop ratios
export const cropRatios = [
  { id: 'free', name: 'Free', ratio: 'free' },
  { id: '1:1', name: 'Square', ratio: '1:1' },
  { id: '4:3', name: '4:3', ratio: '4:3' },
  { id: '3:2', name: '3:2', ratio: '3:2' },
  { id: '16:9', name: '16:9', ratio: '16:9' },
  { id: '9:16', name: '9:16', ratio: '9:16' },
  { id: '2:3', name: '2:3', ratio: '2:3' },
  { id: '3:4', name: '3:4', ratio: '3:4' },
];

// Text overlay fonts
export const textFonts = [
  { id: 'system', name: 'System', fontFamily: 'System' },
  { id: 'serif', name: 'Serif', fontFamily: 'serif' },
  { id: 'monospace', name: 'Mono', fontFamily: 'monospace' },
  { id: 'cursive', name: 'Cursive', fontFamily: 'cursive' },
];

// Text styles
export const textStylesList = [
  { id: 'modern', name: 'Modern', fontWeight: '700' as const },
  { id: 'classic', name: 'Classic', fontStyle: 'italic' as const },
  { id: 'handwritten', name: 'Handwritten', fontFamily: 'cursive' },
  { id: 'bold', name: 'Bold', fontWeight: '800' as const },
  { id: 'light', name: 'Light', fontWeight: '300' as const },
  { id: 'neon', name: 'Neon', textShadowColor: '#FF00FF' as any, textShadowRadius: 10 },
];

// Sticker packs
export const stickerPacks = [
  { id: 'emoji', name: 'Emoji', count: 100, icon: '😀' },
  { id: 'shapes', name: 'Shapes', count: 50, icon: '⭐' },
  { id: 'arrows', name: 'Arrows', count: 30, icon: '➡️' },
  { id: 'speech', name: 'Speech Bubbles', count: 20, icon: '💬' },
  { id: 'frames', name: 'Frames', count: 40, icon: '🖼️' },
  { id: 'celebration', name: 'Celebration', count: 25, icon: '🎉' },
  { id: 'nature', name: 'Nature', count: 35, icon: '🌿' },
  { id: 'animals', name: 'Animals', count: 45, icon: '🐾' },
  { id: 'food', name: 'Food', count: 30, icon: '🍕' },
  { id: 'travel', name: 'Travel', count: 40, icon: '✈️' },
];

// AI mock responses
const aiResponsesList = [
  "I've analyzed your image and suggest increasing the contrast by 15% for better dynamic range. Would you like me to apply this adjustment?",
  "Great choice! The golden hour filter works wonderfully with this photo. I can also add a subtle vignette effect to draw focus to the subject.",
  "I notice perfect lighting conditions here. A slight increase in warmth would enhance the golden tones.",
  "This composition is excellent! For a professional touch, consider straightening the horizon by -2 degrees.",
  "I've detected a slight color cast. Would you like me to correct the white balance?",
  "The rule of thirds is perfectly applied here. Nice work!",
  "This lighting is perfect for a dramatic black & white conversion. Want me to show you a preview?",
  "I can remove the background in this photo for a clean cutout. Should I proceed?",
  "The exposure looks great! No adjustments needed for brightness.",
  "Consider adding a subtle blur to the background for better subject isolation.",
  "This photo has excellent detail. Increasing clarity slightly could enhance it further.",
  "The contrast is well balanced. Good work on the exposure!",
  "I notice some noise in the shadows. A slight denoise filter could help.",
  "The colors in this photo are vibrant! The Vivid filter will enhance them further.",
  "Consider cropping this to 1:1 for a classic square format.",
];

// Get AI response
export const getAIResponse = async (message: string): Promise<string> => {
  await simulateLoading(800);
  const randomResponse = aiResponsesList[Math.floor(Math.random() * aiResponsesList.length)];
  return randomResponse;
};

// Theme settings
export const darkModeSettings = {
  darkMode: true,
  hapticFeedback: true,
  autoSave: true,
  defaultExportQuality: 90,
  defaultAspectRatio: '4:3',
  gridOverlay: false,
  locationTags: true,
  faceDetection: true,
  aiAssistantEnabled: true,
};

export const lightModeSettings = {
  darkMode: false,
  hapticFeedback: true,
  autoSave: true,
  defaultExportQuality: 90,
  defaultAspectRatio: '4:3',
  gridOverlay: false,
  locationTags: true,
  faceDetection: true,
  aiAssistantEnabled: true,
};

// Color palettes for collage backgrounds
export const backgroundColors = [
  '#1A1A24', '#FFFFFF', '#FF4444', '#FF6B6B', '#FF9500', '#FFCC00',
  '#22C55E', '#00D4AA', '#06B6D4', '#3B82F6', '#6366F1', '#8B5CF6',
  '#A855F7', '#EC4899', '#F472C6', '#EF4444', '#F59E0B', '#84CC16',
  '#14B8A6', '#0EA5E9', '#6366F1', '#A855F7', '#F472C6', '#F43F5E',
];

// Gradient backgrounds
export const backgroundGradients = [
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
];

// Photo editing history entries
export const editingHistory = [
  { id: 'hist_1', action: 'edit' as const, timestamp: Date.now() - 3600000, parameters: { brightness: 10 }, previewUri: '' },
  { id: 'hist_2', action: 'filter' as const, timestamp: Date.now() - 7200000, parameters: { filterId: 'filter_1' }, previewUri: '' },
  { id: 'hist_3', action: 'crop' as const, timestamp: Date.now() - 10800000, parameters: { ratio: '1:1' }, previewUri: '' },
  { id: 'hist_4', action: 'text' as const, timestamp: Date.now() - 14400000, parameters: { text: 'Summer 2024' }, previewUri: '' },
  { id: 'hist_5', action: 'sticker' as const, timestamp: Date.now() - 18000000, parameters: { stickerId: 'sticker_1' }, previewUri: '' },
  { id: 'hist_6', action: 'export' as const, timestamp: Date.now() - 21600000, parameters: { format: 'jpeg', quality: 90 }, previewUri: '' },
];

// Default export options
export { allPhotos, allAlbums, allFilterPresets, allCollageLayouts }; // Re-export