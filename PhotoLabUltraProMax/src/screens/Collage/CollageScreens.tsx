// =====================================================
// PHOTOLAB ULTRA PRO MAX - COLLAGE TAB
// Level 1: Layout Selection
// =====================================================

import React, { useState, useCallback, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Dimensions,
  Animated,
  TextInput,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Haptics from 'expo-haptics';
import BottomSheet, { BottomSheetBackdrop, BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../../contexts/ThemeContext';
import { useApp } from '../../contexts/AppContext';
import { Icon, Card, Button, Slider, Header, GradientBackground } from '../../components/UI';
import { FloatingAIButton } from '../../components/AIAssistant';
import { CollageLayout, CollageBackground } from '../../types';
import { collagesLayouts, mockPhotos } from '../../utils/mockData';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// ============ COLLAGE HOME SCREEN (Level 1) ============
export const CollageHomeScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const { colors, spacing, borderRadius, typography } = useTheme();
  const { triggerHaptic } = useApp();

  const categoryFilters = [
    { id: 'all', name: 'All', count: '200+' },
    { id: 'grid', name: 'Grid', count: '50' },
    { id: 'masonry', name: 'Masonry', count: '40' },
    { id: 'artistic', name: 'Artistic', count: '60' },
    { id: 'freestyle', name: 'Freestyle', count: '50' },
  ];

  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchText, setSearchText] = useState('');

  const filteredLayouts = selectedCategory === 'all'
    ? collagesLayouts
    : collagesLayouts.filter(l => l.category === selectedCategory);

  const handleSelectLayout = async (layout: CollageLayout) => {
    await triggerHaptic();
    navigation.navigate('CollageEditor', { layout });
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <GradientBackground>
        <Header title="Collage Templates" />

        <View style={[styles.searchContainer, { padding: spacing.md }]}>
          <View style={[styles.searchBar, { backgroundColor: colors.card, borderRadius: borderRadius.lg }]}>
            <Icon name="search" size={20} color={colors.textSecondary} />
            <TextInput
              value={searchText}
              onChangeText={setSearchText}
              placeholder="Search templates..."
              placeholderTextColor={colors.textSecondary}
              style={[styles.searchInput, { color: colors.text }]}
            />
          </View>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryScroll}>
          {categoryFilters.map((cat) => (
            <TouchableOpacity
              key={cat.id}
              onPress={() => {
                triggerHaptic();
                setSelectedCategory(cat.id);
              }}
              style={[
                styles.categoryChip,
                {
                  backgroundColor: selectedCategory === cat.id ? colors.primary : colors.card,
                },
              ]}
            >
              <Text style={[typography.body, { color: selectedCategory === cat.id ? '#FFFFFF' : colors.text }]}>
                {cat.name}
              </Text>
              <Text style={[typography.caption, { color: selectedCategory === cat.id ? '#FFFFFF' : colors.textSecondary, marginLeft: 4 }]}>
                {cat.count}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <FlatList
          data={filteredLayouts}
          numColumns={2}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => handleSelectLayout(item)}
              style={[styles.layoutCard, { backgroundColor: colors.card }]}
            >
              <View style={[styles.layoutPreview, { backgroundColor: colors.surface }]}>
                <View style={styles.layoutGridPreview}>
                  {Array.from({ length: item.cells }).map((_, i) => (
                    <View key={i} style={[styles.layoutCell, { backgroundColor: colors.primary }]} />
                  ))}
                </View>
              </View>
              <Text style={[typography.body, { color: colors.text, marginTop: spacing.sm }]}>{item.name}</Text>
              <Text style={[typography.caption, { color: colors.textSecondary }]}>
                {item.cells} photos • {item.rows}×{item.cols}
              </Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ padding: spacing.md }}
        />

        <FloatingAIButton onPress={() => {}} />
      </GradientBackground>
    </View>
  );
};

// ============ COLLAGE EDITOR SCREEN (Level 2) ============
export const CollageEditorScreen: React.FC = ({ route, navigation }: any) => {
  const { layout } = route.params;
  const { colors, spacing, borderRadius, typography } = useTheme();
  const { triggerHaptic } = useApp();

  const [selectedPhotos, setSelectedPhotos] = useState<string[]>([]);
  const [showPhotoPicker, setShowPhotoPicker] = useState(false);

  const handleAddPhoto = async (photoId: string) => {
    await triggerHaptic();
    if (!selectedPhotos.includes(photoId) && selectedPhotos.length < layout.cells) {
      setSelectedPhotos([...selectedPhotos, photoId]);
    }
    if (selectedPhotos.length + 1 === layout.cells) {
      setShowPhotoPicker(false);
    }
  };

  const handleRemovePhoto = async (index: number) => {
    await triggerHaptic();
    const newPhotos = [...selectedPhotos];
    newPhotos.splice(index, 1);
    setSelectedPhotos(newPhotos);
  };

  const isComplete = selectedPhotos.length === layout.cells;

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <GradientBackground>
        <Header
          title={layout?.name || 'Collage'}
          leftIcon="close"
          onLeftPress={() => navigation.goBack()}
          rightIcon="check"
          onRightPress={() => {
            triggerHaptic();
            navigation.goBack();
          }}
        />

        <View style={[styles.collagePreview, { backgroundColor: colors.card }]}>
          <View style={styles.collageGrid}>
            {Array.from({ length: layout?.cells || 4 }).map((_, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => {
                  if (selectedPhotos[index]) {
                    handleRemovePhoto(index);
                  } else {
                    setShowPhotoPicker(true);
                  }
                }}
                style={[styles.collageCell, { backgroundColor: selectedPhotos[index] ? colors.primary : colors.surface }]}
              >
                {selectedPhotos[index] ? (
                  <Text style={{ fontSize: 32 }}>📷</Text>
                ) : (
                  <View style={styles.addPhotoPlaceholder}>
                    <Text style={{ fontSize: 24 }}>➕</Text>
                    <Text style={[typography.caption, { color: colors.textSecondary }]}>Add</Text>
                  </View>
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <Card style={[styles.progressCard, { margin: spacing.md }]}>
          <View style={styles.progressRow}>
            <Text style={[typography.body, { color: colors.text }]}>
              Photos: {selectedPhotos.length}/{layout?.cells || 4}
            </Text>
            <View style={[styles.progressBar, { backgroundColor: colors.border }]}>
              <View
                style={[
                  styles.progressFill,
                  {
                    backgroundColor: colors.primary,
                    width: `${(selectedPhotos.length / (layout?.cells || 4)) * 100}%`,
                  },
                ]}
              />
            </View>
          </View>
        </Card>

        {!isComplete && (
          <View style={{ padding: spacing.lg }}>
            <Button
              title="Select Photos"
              onPress={() => setShowPhotoPicker(true)}
              variant="primary"
              size="large"
              icon={<Text style={{ fontSize: 20 }}>🖼️</Text>}
            />
          </View>
        )}

        {isComplete && (
          <View style={{ padding: spacing.lg }}>
            <Button
              title="Select Background"
              onPress={() => navigation.navigate('CollageBackground')}
              variant="primary"
              size="large"
              icon={<Text style={{ fontSize: 20 }}>🎨</Text>}
              style={{ marginBottom: spacing.md }}
            />
            <Button
              title="Export Collage"
              onPress={() => navigation.navigate('Export')}
              variant="outline"
              size="large"
              icon={<Text style={{ fontSize: 20 }}>📤</Text>}
            />
          </View>
        )}

        {showPhotoPicker && (
          <View style={[styles.photoPickerModal, { backgroundColor: colors.surface }]}>
            <View style={[styles.photoPickerHeader, { borderBottomColor: colors.border }]}>
              <Text style={[typography.h3, { color: colors.text }]}>Select Photos</Text>
              <TouchableOpacity onPress={() => setShowPhotoPicker(false)}>
                <Icon name="close" size={24} color={colors.text} />
              </TouchableOpacity>
            </View>
            <FlatList
              data={mockPhotos.slice(0, 30)}
              numColumns={4}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => handleAddPhoto(item.id)}
                  style={[
                    styles.photoSelectItem,
                    {
                      backgroundColor: selectedPhotos.includes(item.id) ? colors.primary : colors.card,
                    },
                  ]}
                >
                  <View style={[styles.photoThumb, { backgroundColor: colors.surface }]}>
                    <Text style={{ fontSize: 14 }}>🖼️</Text>
                  </View>
                </TouchableOpacity>
              )}
              keyExtractor={(item) => item.id}
            />
          </View>
        )}
      </GradientBackground>
    </View>
  );
};

// ============ COLLAGE BACKGROUND SCREEN (Level 3) ============
export const CollageBackgroundScreen: React.FC = ({ route, navigation }: any) => {
  const { colors, spacing, borderRadius, typography } = useTheme();
  const { triggerHaptic } = useApp();

  const [backgroundType, setBackgroundType] = useState<'color' | 'gradient'>('color');
  const [selectedColor, setSelectedColor] = useState('#1A1A24');
  const [selectedGradient, setSelectedGradient] = useState(['#6366F1', '#8B5CF6']);

  const colorsList = [
    '#1A1A24', '#FFFFFF', '#FF4444', '#FF6B6B', '#FF9500', '#FFCC00',
    '#22C55E', '#00D4AA', '#06B6D4', '#3B82F6', '#6366F1', '#8B5CF6',
    '#A855F7', '#EC4899', '#F472C6', '#EF4444', '#F59E0B', '#84CC16',
  ];

  const gradientsList = [
    ['#6366F1', '#8B5CF6'],
    ['#EC4899', '#F472C6'],
    ['#22C55E', '#00D4AA'],
    ['#06B6D4', '#3B82F6'],
    ['#F59E0B', '#FF9500'],
    ['#EF4444', '#FF6B6B'],
    ['#A855F7', '#6366F1'],
    ['#F59E0B', '#84CC16'],
  ];

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Header
        title="Background"
        leftIcon="close"
        onLeftPress={() => navigation.goBack()}
        rightIcon="check"
        onRightPress={() => {
          triggerHaptic();
          navigation.goBack();
        }}
      />

      <ScrollView contentContainerStyle={{ padding: spacing.lg }}>
        <View style={[styles.toggleGroup, { backgroundColor: colors.card, borderRadius: borderRadius.lg }]}>
          <TouchableOpacity
            onPress={() => setBackgroundType('color')}
            style={[
              styles.toggleOption,
              { backgroundColor: backgroundType === 'color' ? colors.primary : 'transparent' },
            ]}
          >
            <Text style={[typography.body, { color: backgroundType === 'color' ? '#FFFFFF' : colors.text }]}>
              Solid Color
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setBackgroundType('gradient')}
            style={[
              styles.toggleOption,
              { backgroundColor: backgroundType === 'gradient' ? colors.primary : 'transparent' },
            ]}
          >
            <Text style={[typography.body, { color: backgroundType === 'gradient' ? '#FFFFFF' : colors.text }]}>
              Gradient
            </Text>
          </TouchableOpacity>
        </View>

        <Text style={[typography.h3, { color: colors.text, marginTop: spacing.lg, marginBottom: spacing.md }]}>
          {backgroundType === 'color' ? 'Solid Colors' : 'Gradients'}
        </Text>

        <View style={styles.colorGrid}>
          {(backgroundType === 'color' ? colorsList : gradientsList).map((item, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => {
                triggerHaptic();
                if (backgroundType === 'color') {
                  setSelectedColor(item as string);
                } else {
                  setSelectedGradient(item as string[]);
                }
              }}
              style={[
                styles.colorItem,
                {
                  backgroundColor: backgroundType === 'color' ? item : (item as string[])[0],
                  borderColor: (backgroundType === 'color' ? selectedColor === item : selectedGradient[0] === (item as string[])[0])
                    ? colors.primary
                    : 'transparent',
                  borderWidth: 3,
                },
              ]}
            >
              {backgroundType === 'gradient' && (
                <LinearGradient
                  colors={item as [string, string]}
                  style={StyleSheet.absoluteFill}
                />
              )}
            </TouchableOpacity>
          ))}
        </View>

        <Text style={[typography.h3, { color: colors.text, marginTop: spacing.lg }]}>
          Patterns
        </Text>

        <View style={styles.patternGrid}>
          {Array.from({ length: 8 }).map((_, i) => (
            <TouchableOpacity
              key={i}
              onPress={() => triggerHaptic()}
              style={[styles.patternItem, { backgroundColor: colors.card }]}
            >
              <Text style={{ fontSize: 24 }}>🔲</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Button
          title="Apply Background"
          onPress={() => {
            triggerHaptic();
            navigation.navigate('Export');
          }}
          variant="primary"
          size="large"
          style={{ marginTop: spacing.xl }}
        />
      </ScrollView>
    </View>
  );
};

// ============ COLLAGE EXPORT SCREEN (Level 4/5) ============
export const CollageExportScreen: React.FC = ({ route, navigation }: any) => {
  const { colors, spacing, borderRadius, typography } = useTheme();
  const { triggerHaptic } = useApp();

  const [quality, setQuality] = useState(100);
  const [format, setFormat] = useState<'jpg' | 'png' | 'webp'>('jpg');

  const handleExport = async () => {
    await triggerHaptic();
    await new Promise(resolve => setTimeout(resolve, 1500));
    navigation.replace('CollageHome');
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <GradientBackground>
        <Header title="Export Collage" />

        <View style={[styles.exportPreview, { backgroundColor: colors.card }]}>
          <Text style={{ fontSize: 80 }}>🎨</Text>
        </View>

        <View style={{ padding: spacing.lg }}>
          <Text style={[typography.h3, { color: colors.text, marginBottom: spacing.md }]}>Quality</Text>
          <Card style={{ marginBottom: spacing.lg }}>
            <View style={styles.qualityOptions}>
              {[100, 90, 80, 70].map((q) => (
                <TouchableOpacity
                  key={q}
                  onPress={() => {
                    triggerHaptic();
                    setQuality(q);
                  }}
                  style={[
                    styles.qualityButton,
                    {
                      backgroundColor: quality === q ? colors.primary : colors.card,
                    },
                  ]}
                >
                  <Text style={[typography.body, { color: quality === q ? '#FFFFFF' : colors.text }]}>
                    {q}%
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </Card>

          <Text style={[typography.h3, { color: colors.text, marginBottom: spacing.md }]}>Format</Text>
          <Card style={{ marginBottom: spacing.lg }}>
            <View style={styles.formatOptions}>
              {['jpg', 'png', 'webp'].map((f) => (
                <TouchableOpacity
                  key={f}
                  onPress={() => {
                    triggerHaptic();
                    setFormat(f as any);
                  }}
                  style={[
                    styles.formatButton,
                    {
                      backgroundColor: format === f ? colors.primary : colors.card,
                    },
                  ]}
                >
                  <Text style={[typography.body, { color: format === f ? '#FFFFFF' : colors.text }]}>
                    {f.toUpperCase()}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </Card>

          <Button
            title="Export Collage"
            onPress={handleExport}
            variant="primary"
            size="large"
            icon={<Text style={{ fontSize: 20 }}>📤</Text>}
          />
        </View>
      </GradientBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchContainer: {},
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
  categoryScroll: {
    maxHeight: 50,
    paddingHorizontal: 16,
  },
  categoryChip: {
    flexDirection: 'row',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    alignItems: 'center',
  },
  layoutCard: {
    width: '48%',
    margin: '1%',
    padding: 12,
    borderRadius: 16,
    alignItems: 'center',
  },
  layoutPreview: {
    width: '100%',
    height: 100,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  layoutGridPreview: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '80%',
    justifyContent: 'space-between',
  },
  layoutCell: {
    width: '45%',
    height: 30,
    marginBottom: 4,
    borderRadius: 4,
  },
  collagePreview: {
    flex: 1,
    margin: 16,
    borderRadius: 16,
  },
  collageGrid: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    margin: 8,
  },
  collageCell: {
    width: '45%',
    height: '45%',
    margin: '2.5%',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addPhotoPlaceholder: {
    alignItems: 'center',
  },
  progressCard: {
    borderRadius: 16,
  },
  progressRow: {},
  progressBar: {
    height: 8,
    borderRadius: 4,
    marginTop: 8,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
  photoPickerModal: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '50%',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  photoPickerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
  },
  photoSelectItem: {
    width: '25%',
    padding: 4,
  },
  photoThumb: {
    height: 60,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  toggleGroup: {
    flexDirection: 'row',
    borderRadius: 12,
    padding: 4,
  },
  toggleOption: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  colorGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  colorItem: {
    width: '18%',
    aspectRatio: 1,
    borderRadius: 12,
    marginBottom: 8,
    overflow: 'hidden',
  },
  patternGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  patternItem: {
    width: '23%',
    aspectRatio: 1,
    borderRadius: 12,
    marginBottom: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  exportPreview: {
    height: 200,
    margin: 16,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  qualityOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  qualityButton: {
    flex: 1,
    marginHorizontal: 4,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  formatOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  formatButton: {
    flex: 1,
    marginHorizontal: 4,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
});

export default {
  CollageHomeScreen,
  CollageEditorScreen,
  CollageBackgroundScreen,
  CollageExportScreen,
};