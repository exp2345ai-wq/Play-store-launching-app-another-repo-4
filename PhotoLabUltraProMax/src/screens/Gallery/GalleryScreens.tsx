// =====================================================
// PHOTOLAB ULTRA PRO MAX - GALLERY TAB
// Level 1: Photos Grid by Date, Albums, Favorites
// =====================================================

import React, { useState, useCallback, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Animated,
  ScrollView,
  FlatList,
  RefreshControl,
  TextInput,
  Modal,
  Pressable,
  SectionList,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Haptics from 'expo-haptics';
import BottomSheet, { BottomSheetBackdrop, BottomSheetScrollView, BottomSheetFlatList } from '@gorhom/bottom-sheet';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../../contexts/ThemeContext';
import { useApp } from '../../contexts/AppContext';
import { Icon, Card, Button, Slider, Header, GradientBackground, BottomSheetModal, Skeleton, PhotoGridItem, EmptyState } from '../../components/UI';
import { FloatingAIButton } from '../../components/AIAssistant';
import { PhotoItem, Album } from '../../types';
import { mockPhotos, mockAlbums, getPhotosPaginated, simulateLoading } from '../../utils/mockData';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const GRID_COLUMNS = 3;
const GRID_ITEM_SIZE = (SCREEN_WIDTH - 32 - (GRID_COLUMNS - 1) * 4) / GRID_COLUMNS;

// ============ GALLERY HOME SCREEN (Level 1) ============
export const GalleryHomeScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const { colors, spacing, borderRadius, typography } = useTheme();
  const { triggerHaptic, favorites, addFavorite, removeFavorite, isFavorite } = useApp();
  
  const [photos, setPhotos] = useState<PhotoItem[]>([]);
  const [albums, setAlbums] = useState<Album[]>(mockAlbums);
  const [selectedAlbum, setSelectedAlbum] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'albums' | 'favorites'>('grid');
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [searchText, setSearchText] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const bottomSheetRef = useRef<BottomSheet>(null);

  useEffect(() => {
    loadPhotos();
  }, []);

  const loadPhotos = async (refresh: boolean = false) => {
    setIsLoading(true);
    try {
      const newPage = refresh ? 1 : page;
      const newPhotos = await getPhotosPaginated(newPage, 30);
      if (refresh) {
        setPhotos(newPhotos);
        setPage(2);
      } else {
        setPhotos(prev => [...prev, ...newPhotos]);
        setPage(prev => prev + 1);
      }
      setHasMore(newPhotos.length === 30);
    } catch (error) {
      console.error('Error loading photos:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await loadPhotos(true);
    setIsRefreshing(false);
  };

  const handleLoadMore = async () => {
    if (!isLoading && hasMore) {
      await loadPhotos(false);
    }
  };

  const handlePhotoPress = async (photo: PhotoItem) => {
    await triggerHaptic();
    navigation.navigate('PhotoViewer', { photoId: photo.id, photos: photos });
  };

  const handleAlbumPress = async (album: Album) => {
    await triggerHaptic();
    setSelectedAlbum(album.id);
    navigation.navigate('AlbumPhotos', { albumId: album.id, albumName: album.name });
  };

  const handleFavoritePress = async () => {
    await triggerHaptic();
    const favPhotos = mockPhotos.filter(p => favorites.includes(p.id));
    navigation.navigate('Favorites', { photos: favPhotos });
  };

  const toggleFavorite = async (photoId: string) => {
    await triggerHaptic();
    if (isFavorite(photoId)) {
      removeFavorite(photoId);
    } else {
      addFavorite(photoId);
    }
  };

  const renderPhotoItem = ({ item, index }: { item: PhotoItem; index: number }) => (
    <View style={[styles.photoItemWrapper, { marginRight: (index + 1) % GRID_COLUMNS === 0 ? 0 : 4 }]}>
      <TouchableOpacity
        onPress={() => handlePhotoPress(item)}
        onLongPress={() => toggleFavorite(item.id)}
        style={styles.photoItem}
      >
        <View style={[styles.photoPlaceholder, { width: GRID_ITEM_SIZE, height: GRID_ITEM_SIZE }]}>
          <Text style={{ fontSize: GRID_ITEM_SIZE * 0.3 }}>🖼️</Text>
          {isFavorite(item.id) && (
            <View style={[styles.favoriteIcon]}>
              <Text style={{ fontSize: 16 }}>❤️</Text>
            </View>
          )}
        </View>
      </TouchableOpacity>
    </View>
  );

  const renderHeader = () => (
    <View style={{ padding: spacing.md }}>
      <View style={[styles.searchBar, { backgroundColor: colors.card, borderRadius: borderRadius.lg }]}>
        <Icon name="search" size={20} color={colors.textSecondary} />
        <TextInput
          value={searchText}
          onChangeText={setSearchText}
          placeholder="Search photos..."
          placeholderTextColor={colors.textSecondary}
          style={[styles.searchInput, { color: colors.text }]}
        />
      </View>

      <View style={[styles.viewTabs, { marginTop: spacing.md }]}>
        <TouchableOpacity
          onPress={() => setViewMode('grid')}
          style={[
            styles.viewTab,
            { backgroundColor: viewMode === 'grid' ? colors.primary : colors.card },
          ]}
        >
          <Text style={[typography.body, { color: viewMode === 'grid' ? '#FFFFFF' : colors.text }]}>
            Photos
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setViewMode('albums')}
          style={[
            styles.viewTab,
            { backgroundColor: viewMode === 'albums' ? colors.primary : colors.card },
          ]}
        >
          <Text style={[typography.body, { color: viewMode === 'albums' ? '#FFFFFF' : colors.text }]}>
            Albums
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setViewMode('favorites')}
          style={[
            styles.viewTab,
            { backgroundColor: viewMode === 'favorites' ? colors.primary : colors.card },
          ]}
        >
          <Text style={[typography.body, { color: viewMode === 'favorites' ? '#FFFFFF' : colors.text }]}>
            Favorites
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  if (viewMode === 'albums') {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <Header title="Albums" />
        <FlatList
          data={albums}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => handleAlbumPress(item)}
              style={[styles.albumCard, { backgroundColor: colors.card, margin: spacing.md }]}
            >
              <View style={[styles.albumCover, { backgroundColor: colors.surface }]}>
                <Text style={{ fontSize: 40 }}>📁</Text>
              </View>
              <View style={styles.albumInfo}>
                <Text style={[typography.h3, { color: colors.text }]}>{item.name}</Text>
                <Text style={[typography.caption, { color: colors.textSecondary }]}>
                  {item.photoCount} photos
                </Text>
              </View>
              <Text style={{ fontSize: 20 }}>›</Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id}
          ListHeaderComponent={renderHeader}
        />
        <FloatingAIButton onPress={() => {}} />
      </View>
    );
  }

  if (viewMode === 'favorites') {
    const favPhotos = mockPhotos.filter(p => favorites.includes(p.id));
    if (favPhotos.length === 0) {
      return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
          <Header title="Favorites" />
          <EmptyState
            icon="❤️"
            title="No Favorites Yet"
            message="Tap and hold on any photo to add it to favorites"
            actionLabel="Browse Photos"
            onAction={() => setViewMode('grid')}
          />
        </View>
      );
    }
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <Header title="Favorites" />
        <FlatList
          data={favPhotos}
          renderItem={renderPhotoItem}
          keyExtractor={(item) => item.id}
          numColumns={GRID_COLUMNS}
          columnWrapperStyle={styles.row}
          ListHeaderComponent={renderHeader}
          contentContainerStyle={{ padding: spacing.md }}
        />
        <FloatingAIButton onPress={() => {}} />
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <GradientBackground>
        <Header title="Gallery" transparent />
        
        <FlatList
          data={photos}
          renderItem={renderPhotoItem}
          keyExtractor={(item) => item.id}
          numColumns={GRID_COLUMNS}
          columnWrapperStyle={styles.row}
          ListHeaderComponent={renderHeader}
          contentContainerStyle={{ paddingBottom: 120 }}
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={handleRefresh}
              tintColor={colors.primary}
            />
          }
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.5}
          ListEmptyComponent={
            isLoading ? (
              <View style={styles.skeletonContainer}>
                {Array.from({ length: 9 }).map((_, i) => (
                  <Skeleton
                    key={i}
                    width={GRID_ITEM_SIZE}
                    height={GRID_ITEM_SIZE}
                    borderRadius={8}
                    style={{ margin: 2 }}
                  />
                ))}
              </View>
            ) : null
          }
        />

        <FloatingAIButton onPress={() => {}} />
      </GradientBackground>
    </View>
  );
};

// ============ PHOTO VIEWER SCREEN (Level 2) ============
export const PhotoViewerScreen: React.FC = ({ route, navigation }: any) => {
  const { photoId } = route.params;
  const { colors, spacing, borderRadius, typography } = useTheme();
  const { triggerHaptic, addFavorite, removeFavorite, isFavorite } = useApp();
  
  const photo = mockPhotos.find(p => p.id === photoId);
  const [showControls, setShowControls] = useState(true);
  const [zoomLevel, setZoomLevel] = useState(1);

  const handlePress = async () => {
    await triggerHaptic();
    setShowControls(!showControls);
  };

  const handleEdit = async () => {
    await triggerHaptic();
    navigation.navigate('EditorWorkplace');
  };

  const handleShare = async () => {
    await triggerHaptic();
    navigation.navigate('Export');
  };

  const handleFavorite = async () => {
    await triggerHaptic();
    if (photo && isFavorite(photo.id)) {
      removeFavorite(photo.id);
    } else if (photo) {
      addFavorite(photo.id);
    }
  };

  if (!photo) return null;

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <TouchableOpacity activeOpacity={1} onPress={handlePress} style={styles.photoViewerContainer}>
        <View style={[styles.photoFullContainer, { backgroundColor: colors.card }]}>
          <Text style={{ fontSize: 200 }}>📷</Text>
          {isFavorite(photo.id) && (
            <View style={styles.favoriteOverlay}>
              <Text style={{ fontSize: 60 }}>❤️</Text>
            </View>
          )}
        </View>

        {showControls && (
          <>
            <View style={[styles.viewerHeader, { paddingTop: spacing.xl }]}>
              <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerButton}>
                <Icon name="close" size={28} color={colors.text} />
              </TouchableOpacity>
              <TouchableOpacity onPress={handleFavorite} style={styles.headerButton}>
                <Text style={{ fontSize: 28 }}>
                  {isFavorite(photo.id) ? '❤️' : '🤍'}
                </Text>
              </TouchableOpacity>
            </View>

            <View style={[styles.viewerFooter, { paddingBottom: spacing.xxl }]}>
              <TouchableOpacity onPress={handleShare} style={[styles.footerButton, { backgroundColor: colors.primary }]}>
                <Icon name="share" size={24} color="#FFFFFF" />
                <Text style={[typography.caption, { color: '#FFFFFF', marginTop: 4 }]}>Share</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleEdit} style={[styles.footerButton, { backgroundColor: colors.accent }]}>
                <Icon name="edit" size={24} color="#FFFFFF" />
                <Text style={[typography.caption, { color: '#FFFFFF', marginTop: 4 }]}>file_editor</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate('PhotoEditor')} style={[styles.footerButton, { backgroundColor: colors.warning }]}>
                <Text style={{ fontSize: 24 }}>🎨</Text>
                <Text style={[typography.caption, { color: '#FFFFFF', marginTop: 4 }]}>Filter</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </TouchableOpacity>
    </View>
  );
};

// ============ ALBUM PHOTOS SCREEN (Level 2) ============
export const AlbumPhotosScreen: React.FC = ({ route, navigation }: any) => {
  const { albumId, albumName } = route.params;
  const { colors, spacing, borderRadius, typography } = useTheme();
  const { triggerHaptic } = useApp();
  
  const albumPhotos = mockPhotos.filter(p => p.albumId === albumId);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadPhotos();
  }, []);

  const loadPhotos = async () => {
    setIsLoading(true);
    await simulateLoading(500);
    setIsLoading(false);
  };

  const handlePhotoPress = async (photo: PhotoItem) => {
    await triggerHaptic();
    navigation.navigate('PhotoViewer', { photoId: photo.id, photos: albumPhotos });
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Header title={albumName} leftIcon="close" onLeftPress={() => navigation.goBack()} />
      
      <FlatList
        data={albumPhotos}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            onPress={() => handlePhotoPress(item)}
            style={[styles.albumPhotoCard, { backgroundColor: colors.card }]}
          >
            <View style={[styles.albumPhotoThumb, { backgroundColor: colors.surface }]}>
              <Text style={{ fontSize: 40 }}>🖼️</Text>
            </View>
            <View style={styles.albumPhotoInfo}>
              <Text style={[typography.body, { color: colors.text }]}>{item.filename}</Text>
              <Text style={[typography.caption, { color: colors.textSecondary }]}>
                {item.width} × {item.height}
              </Text>
            </View>
            <TouchableOpacity style={styles.moreButton}>
              <Text style={{ fontSize: 20 }}>⋮</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: spacing.md }}
        ListEmptyComponent={
          isLoading ? (
            <View style={styles.loadingContainer}>
              <Text style={{ fontSize: 48 }}>⏳</Text>
              <Text style={[typography.body, { color: colors.textSecondary, marginTop: spacing.md }]}>
                Loading photos...
              </Text>
            </View>
          ) : null
        }
      />
      <FloatingAIButton onPress={() => {}} />
    </View>
  );
};

// ============ PHOTO EDITOR SCREEN (Level 3/4) ============
export const PhotoEditorScreen: React.FC = ({ route, navigation }: any) => {
  const { photoId } = route.params;
  const { colors, spacing, borderRadius, typography } = useTheme();
  const { triggerHaptic } = useApp();
  
  const [brightness, setBrightness] = useState(0);
  const [contrast, setContrast] = useState(0);
  const [saturation, setSaturation] = useState(0);
  const [warmth, setWarmth] = useState(0);
  const [showFilters, setShowFilters] = useState(false);

  const adjustmentTools = [
    { id: 'brightness', name: 'Brightness', icon: '☀️', value: brightness, setValue: setBrightness, min: -100, max: 100 },
    { id: 'contrast', name: 'Contrast', icon: '◐', value: contrast, setValue: setContrast, min: -100, max: 100 },
    { id: 'saturation', name: 'Saturation', icon: '🎨', value: saturation, setValue: setSaturation, min: -100, max: 100 },
    { id: 'warmth', name: 'Warmth', icon: '🌡️', value: warmth, setValue: setWarmth, min: -100, max: 100 },
    { id: 'highlights', name: 'Highlights', icon: '🌞', value: 0, setValue: () => {}, min: -100, max: 100 },
    { id: 'shadows', name: 'Shadows', icon: '🌑', value: 0, setValue: () => {}, min: -100, max: 100 },
    { id: 'clarity', name: 'Clarity', icon: '✨', value: 0, setValue: () => {}, min: 0, max: 100 },
    { id: 'vibrance', name: 'Vibrance', icon: '🌈', value: 0, setValue: () => {}, min: -100, max: 100 },
    { id: 'exposure', name: 'Exposure', icon: '💡', value: 0, setValue: () => {}, min: -50, max: 50 },
  ];

  const renderAdjustments = (tools: typeof adjustmentTools) => (
    <View style={{ padding: spacing.md }}>
      {tools.map((tool, index) => (
        <View key={tool.id} style={[styles.adjustmentCard, { backgroundColor: colors.card, marginBottom: spacing.md }]}>
          <View style={styles.adjustmentHeader}>
            <Text style={{ fontSize: 24 }}>{tool.icon}</Text>
            <Text style={[typography.body, { color: colors.text, flex: 1, marginLeft: spacing.md }]}>
              {tool.name}
            </Text>
            <Text style={[typography.body, { color: colors.primary }]}>{tool.value}</Text>
          </View>
          <Slider
            value={tool.value}
            min={tool.min}
            max={tool.max}
            onValueChange={(val) => {
              triggerHaptic();
              tool.setValue(val);
            }}
          />
        </View>
      ))}
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <GradientBackground>
        <Header 
          title="file_editor" 
          leftIcon="close"
          onLeftPress={() => navigation.goBack()}
          rightIcon="check"
          onRightPress={() => {
            triggerHaptic();
            navigation.goBack();
          }}
        />

        <View style={[styles.editorPreview, { backgroundColor: colors.card }]}>
          <Text style={{ fontSize: 120 }}>📷</Text>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.toolsScroll}>
          <TouchableOpacity
            onPress={() => setShowFilters(false)}
            style={[
              styles.toolTab,
              { backgroundColor: showFilters ? colors.card : colors.primary },
            ]}
          >
            <Icon name="sliders" size={20} color={showFilters ? colors.text : '#FFFFFF'} />
            <Text style={[typography.caption, { color: showFilters ? colors.text : '#FFFFFF', marginTop: 4 }]}>
              Adjust
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            onPress={() => setShowFilters(true)}
            style={[
              styles.toolTab,
              { backgroundColor: showFilters ? colors.primary : colors.card },
            ]}
          >
            <Text style={{ fontSize: 20 }}>🎨</Text>
            <Text style={[typography.caption, { color: showFilters ? '#FFFFFF' : colors.text, marginTop: 4 }]}>
              Filters
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            onPress={() => navigation.navigate('CropScreen')}
            style={[styles.toolTab, { backgroundColor: colors.card }]}
          >
            <Icon name="crop" size={20} color={colors.text} />
            <Text style={[typography.caption, { color: colors.text, marginTop: 4 }]}>Crop</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={[styles.toolTab, { backgroundColor: colors.card }]}>
            <Text style={{ fontSize: 20 }}>Aa</Text>
            <Text style={[typography.caption, { color: colors.text, marginTop: 4 }]}>Text</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={[styles.toolTab, { backgroundColor: colors.card }]}>
            <Text style={{ fontSize: 20 }}>💫</Text>
            <Text style={[typography.caption, { color: colors.text, marginTop: 4 }]}>Stickers</Text>
          </TouchableOpacity>
        </ScrollView>

        <ScrollView style={{ flex: 1 }}>
          {!showFilters ? (
            renderAdjustments(adjustmentTools)
          ) : (
            <View style={[styles.filtersGrid, { padding: spacing.md }]}>
              {Array.from({ length: 20 }).map((_, i) => (
                <TouchableOpacity
                  key={i}
                  onPress={() => triggerHaptic()}
                  style={[styles.filterCard, { backgroundColor: colors.card }]}
                >
                  <View style={[styles.filterPreview, { backgroundColor: colors.surface }]}>
                    <Text style={{ fontSize: 24 }}>🎨</Text>
                  </View>
                  <Text style={[typography.caption, { color: colors.text, marginTop: 4 }]}>
                    Filter {i + 1}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </ScrollView>

        <View style={[styles.editorActions, { paddingBottom: spacing.xl }]}>
          <Button
            title="Reset"
            onPress={() => {
              triggerHaptic();
              setBrightness(0);
              setContrast(0);
              setSaturation(0);
              setWarmth(0);
            }}
            variant="outline"
            style={{ flex: 1, marginRight: spacing.sm }}
          />
          <Button
            title="Apply"
            onPress={() => {
              triggerHaptic();
              navigation.goBack();
            }}
            variant="primary"
            style={{ flex: 1 }}
          />
        </View>
      </GradientBackground>
      
      <FloatingAIButton onPress={() => {}} />
    </View>
  );
};

// ============ CROP SCREEN (Level 4/5) ============
export const CropScreen: React.FC = ({ route, navigation }: any) => {
  const { colors, spacing, borderRadius, typography } = useTheme();
  const { triggerHaptic } = useApp();
  
  const cropRatios = [
    { id: 'free', name: 'Free' },
    { id: '1:1', name: '1:1' },
    { id: '4:3', name: '4:3' },
    { id: '16:9', name: '16:9' },
    { id: '9:16', name: '9:16' },
    { id: '3:2', name: '3:2' },
  ];
  const [selectedRatio, setSelectedRatio] = useState('free');
  const [rotation, setRotation] = useState(0);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <GradientBackground>
        <Header title="Crop & Rotate" leftIcon="close" onLeftPress={() => navigation.goBack()} />
        
        <View style={[styles.cropPreview, { backgroundColor: colors.card }]}>
          <Text style={{ fontSize: 100 }}>📷</Text>
        </View>

        <View style={[styles.ratioSelector, { padding: spacing.md }]}>
          <Text style={[typography.h3, { color: colors.text, marginBottom: spacing.md }]}>
            Aspect Ratio
          </Text>
          <View style={styles.ratioRow}>
            {cropRatios.map((ratio) => (
              <TouchableOpacity
                key={ratio.id}
                onPress={() => {
                  triggerHaptic();
                  setSelectedRatio(ratio.id);
                }}
                style={[
                  styles.ratioButton,
                  {
                    backgroundColor: selectedRatio === ratio.id ? colors.primary : colors.card,
                  },
                ]}
              >
                <Text style={[typography.body, { color: selectedRatio === ratio.id ? '#FFFFFF' : colors.text }]}>
                  {ratio.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={[styles.rotateSection, { padding: spacing.md }]}>
          <Text style={[typography.h3, { color: colors.text, marginBottom: spacing.md }]}>
            Rotation
          </Text>
          <View style={styles.rotateControls}>
            <TouchableOpacity
              onPress={() => {
                triggerHaptic();
                setRotation(rotation - 90);
              }}
              style={[styles.rotateButton, { backgroundColor: colors.card }]}
            >
              <Text style={{ fontSize: 32 }}>↺</Text>
            </TouchableOpacity>
            <Text style={[typography.h2, { color: colors.text }]}>{rotation}°</Text>
            <TouchableOpacity
              onPress={() => {
                triggerHaptic();
                setRotation(rotation + 90);
              }}
              style={[styles.rotateButton, { backgroundColor: colors.card }]}
            >
              <Text style={{ fontSize: 32 }}>↻</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={[styles.cropActions, { padding: spacing.lg }]}>
          <Button
            title="Apply Crop"
            onPress={() => {
              triggerHaptic();
              navigation.goBack();
            }}
            variant="primary"
            size="large"
            icon={<Text style={{ fontSize: 20 }}>✓</Text>}
          />
        </View>
      </GradientBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  row: { justifyContent: 'flex-start' },
  photoItemWrapper: { marginBottom: 4 },
  photoItem: {
    width: GRID_ITEM_SIZE,
    height: GRID_ITEM_SIZE,
    borderRadius: 8,
    overflow: 'hidden',
  },
  photoPlaceholder: {
    backgroundColor: '#2A2A3A',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
  favoriteIcon: {
    position: 'absolute',
    top: 8,
    right: 8,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
  },
  viewTabs: {
    flexDirection: 'row',
    borderRadius: 12,
    padding: 4,
  },
  viewTab: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  albumCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 16,
  },
  albumCover: {
    width: 70,
    height: 70,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  albumInfo: {
    flex: 1,
    marginLeft: 16,
  },
  skeletonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 16,
  },
  photoViewerContainer: {
    flex: 1,
    backgroundColor: '#000',
  },
  photoFullContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  favoriteOverlay: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewerHeader: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
  },
  headerButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  viewerFooter: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 16,
  },
  footerButton: {
    width: 70,
    height: 70,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  albumPhotoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
    marginBottom: 8,
  },
  albumPhotoThumb: {
    width: 60,
    height: 60,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  albumPhotoInfo: {
    flex: 1,
    marginLeft: 12,
  },
  moreButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 100,
  },
  editorPreview: {
    height: 250,
    margin: 16,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  toolsScroll: {
    maxHeight: 80,
    paddingHorizontal: 16,
  },
  toolTab: {
    width: 70,
    height: 70,
    marginRight: 8,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  adjustmentCard: {
    padding: 16,
    borderRadius: 12,
  },
  adjustmentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  filtersGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  filterCard: {
    width: '48%',
    marginBottom: 16,
    padding: 8,
    borderRadius: 12,
    alignItems: 'center',
  },
  filterPreview: {
    width: '100%',
    height: 80,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  editorActions: {
    flexDirection: 'row',
    paddingHorizontal: 16,
  },
  cropPreview: {
    height: 250,
    margin: 16,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ratioSelector: {},
  ratioRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  ratioButton: {
    width: '30%',
    paddingVertical: 12,
    marginBottom: 8,
    borderRadius: 10,
    alignItems: 'center',
  },
  rotateSection: {},
  rotateControls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  rotateButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cropActions: {
    padding: 16,
  },
});

export default {
  GalleryHomeScreen,
  PhotoViewerScreen,
  AlbumPhotosScreen,
  PhotoEditorScreen,
  CropScreen,
};