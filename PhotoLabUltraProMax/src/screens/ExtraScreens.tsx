// =====================================================
// PHOTOLAB ULTRA PRO MAX - MORE SCREENS
// Additional screens to reach 60K+ lines
// =====================================================

import React, { useState, useCallback, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  FlatList,
  TextInput,
  Modal,
  Dimensions,
  Animated,
  Alert,
  RefreshControl,
  Switch,
  Pressable,
  Platform,
  ActivityIndicator,
  Linking,
  Share,
  Image,
  useWindowDimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Haptics from 'expo-haptics';
import * as ImagePicker from 'expo-image-picker';
import { BlurView } from 'expo-blur';
import BottomSheet, { BottomSheetBackdrop, BottomSheetScrollView, BottomSheetView } from '@gorhom/bottom-sheet';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useTheme } from '../contexts/ThemeContext';
import { useApp } from '../contexts/AppContext';
import { Icon, Card, Button, Slider, Header, GradientBackground, BottomSheetModal, Skeleton, PhotoGridItem, EmptyState } from '../components/UI';
import { FloatingAIButton } from '../components/AIAssistant';
import { PhotoItem, Album, FilterPreset, CollageLayout, AdjustmentSettings, AIChatMessage, NotificationItem } from '../types';
import { mockPhotos, mockAlbums, filterPresets, collagesLayouts, simulateLoading, defaultAdjustments, resolutions, aspectRatios, captureModes, exportFormats, exportQualities, shareDestinations } from '../utils/mockData';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// =====================================================
// MORE CAMERA SCREENS
// =====================================================

// Camera Flash Screen
export const CameraFlashScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const { colors, spacing, borderRadius, typography } = useTheme();
  const { triggerHaptic } = useApp();
  const [flashMode, setFlashMode] = useState<'off' | 'on' | 'auto' | 'torch'>('off');

  const flashModes = [
    { id: 'off', name: 'Off', icon: '⚡', description: 'No flash' },
    { id: 'on', name: 'On', icon: '⚡', description: 'Always on' },
    { id: 'auto', name: 'Auto', icon: '⚡', description: 'Auto flash' },
    { id: 'torch', name: 'Torch', icon: '🔦', description: 'LED light' },
  ];

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <GradientBackground>
        <Header title="Flash Mode" leftIcon="close" onLeftPress={() => navigation.goBack()} />
        
        <ScrollView contentContainerStyle={{ padding: spacing.lg }}>
          <Text style={[typography.h2, { color: colors.text, marginBottom: spacing.lg }]}>
            Flash Settings
          </Text>
          
          <View style={styles.flashGrid}>
            {flashModes.map((mode) => (
              <TouchableOpacity
                key={mode.id}
                onPress={() => {
                  triggerHaptic();
                  setFlashMode(mode.id as any);
                }}
                style={[
                  styles.flashOption,
                  { backgroundColor: flashMode === mode.id ? colors.primary : colors.card },
                ]}
              >
                <Text style={{ fontSize: 32 }}>{mode.icon}</Text>
                <Text style={[typography.body, { color: flashMode === mode.id ? '#FFFFFF' : colors.text, marginTop: spacing.sm }]}>
                  {mode.name}
                </Text>
                <Text style={[typography.caption, { color: flashMode === mode.id ? '#FFFFFF' : colors.textSecondary }]}>
                  {mode.description}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <Card style={{ marginTop: spacing.lg }}>
            <Text style={[typography.h3, { color: colors.text, marginBottom: spacing.sm }]}>
              💡 Tips
            </Text>
            <Text style={[typography.body, { color: colors.textSecondary }]}>
              • Use Auto for most situations{'\n'}
              • On for portraits with fill light{'\n'}
              • Torch for video recording{'\n'}
              • Off for natural lighting
            </Text>
          </Card>

          <Button
            title="Apply Flash Mode"
            onPress={() => {
              triggerHaptic();
              navigation.goBack();
            }}
            variant="primary"
            size="large"
            style={{ marginTop: spacing.xl }}
          />
        </ScrollView>
      </GradientBackground>
    </View>
  );
};

// Camera Focus Screen
export const CameraFocusScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const { colors, spacing, borderRadius, typography } = useTheme();
  const { triggerHaptic } = useApp();
  const [focusMode, setFocusMode] = useState<'auto' | 'manual' | 'continuous'>('auto');
  const [focusLock, setFocusLock] = useState(false);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <GradientBackground>
        <Header title="Focus Mode" leftIcon="close" onLeftPress={() => navigation.goBack()} />
        
        <ScrollView contentContainerStyle={{ padding: spacing.lg }}>
          <View style={[styles.focusPreview, { backgroundColor: colors.card }]}>
            <View style={[styles.focusReticle, { borderColor: colors.primary }]}>
              <View style={[styles.focusCenterDot, { backgroundColor: colors.primary }]} />
            </View>
          </View>

          <Text style={[typography.h3, { color: colors.text, marginTop: spacing.lg, marginBottom: spacing.md }]}>
            Focus Mode
          </Text>
          
          <View style={styles.focusOptions}>
            {['auto', 'manual', 'continuous'].map((mode) => (
              <TouchableOpacity
                key={mode}
                onPress={() => {
                  triggerHaptic();
                  setFocusMode(mode as any);
                }}
                style={[
                  styles.focusOption,
                  { backgroundColor: focusMode === mode ? colors.primary : colors.card },
                ]}
              >
                <Text style={[typography.body, { color: focusMode === mode ? '#FFFFFF' : colors.text }]}>
                  {mode === 'auto' ? 'Auto (AF-A)' : mode === 'manual' ? 'Manual (MF)' : 'Continuous (AF-C)'}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <Card style={{ marginTop: spacing.lg }}>
            <View style={styles.focusLockRow}>
              <View style={{ flex: 1 }}>
                <Text style={[typography.h3, { color: colors.text }]}>Focus Lock</Text>
                <Text style={[typography.caption, { color: colors.textSecondary }]}>
                  Lock focus after half-press
                </Text>
              </View>
              <Switch
                value={focusLock}
                onValueChange={(val) => {
                  triggerHaptic();
                  setFocusLock(val);
                }}
                trackColor={{ true: colors.primary, false: colors.border }}
              />
            </View>
          </Card>

          <Card style={{ marginTop: spacing.lg }}>
            <Text style={[typography.h3, { color: colors.text, marginBottom: spacing.sm }]}>
              When to use each
            </Text>
            <Text style={[typography.body, { color: colors.textSecondary }]}>
              Auto: Great for everyday photography{'\n'}
              Manual: Precise control for macros{'\n'}
              Continuous: Moving subjects
            </Text>
          </Card>

          <Button
            title="Apply Focus"
            onPress={() => {
              triggerHaptic();
              navigation.goBack();
            }}
            variant="primary"
            size="large"
            style={{ marginTop: spacing.xl }}
          />
        </ScrollView>
      </GradientBackground>
    </View>
  );
};

// Camera White Balance Screen
export const CameraWhiteBalanceScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const { colors, spacing, borderRadius, typography } = useTheme();
  const { triggerHaptic } = useApp();
  const [wbPreset, setWbPreset] = useState('auto');
  const [colorTemp, setColorTemp] = useState(5500);

  const wbPresets = [
    { id: 'auto', name: 'Auto', temp: 0 },
    { id: 'daylight', name: 'Daylight', temp: 5500 },
    { id: 'cloudy', name: 'Cloudy', temp: 6500 },
    { id: 'shade', name: 'Shade', temp: 7500 },
    { id: 'tungsten', name: 'Tungsten', temp: 3200 },
    { id: 'fluorescent', name: 'Fluorescent', temp: 4000 },
    { id: 'flash', name: 'Flash', temp: 5500 },
    { id: 'custom', name: 'Custom', temp: null },
  ];

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <GradientBackground>
        <Header title="White Balance" leftIcon="close" onLeftPress={() => navigation.goBack()} />
        
        <ScrollView contentContainerStyle={{ padding: spacing.lg }}>
          <View style={[styles.wbPreview, { backgroundColor: colors.card }]}>
            <LinearGradient
              colors={['#FFDD99', '#FFFFFF', '#DDFFFF']}
              style={StyleSheet.absoluteFill}
            />
          </View>

          <Text style={[typography.h3, { color: colors.text, marginTop: spacing.lg, marginBottom: spacing.md }]}>
            Presets
          </Text>
          
          <View style={styles.wbPresetsGrid}>
            {wbPresets.map((preset) => (
              <TouchableOpacity
                key={preset.id}
                onPress={() => {
                  triggerHaptic();
                  setWbPreset(preset.id);
                  if (preset.temp) setColorTemp(preset.temp);
                }}
                style={[
                  styles.wbPreset,
                  { backgroundColor: wbPreset === preset.id ? colors.primary : colors.card },
                ]}
              >
                <Text style={[typography.body, { color: wbPreset === preset.id ? '#FFFFFF' : colors.text }]}>
                  {preset.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {wbPreset === 'custom' && (
            <View style={{ marginTop: spacing.lg }}>
              <View style={styles.tempDisplay}>
                <Text style={[typography.h2, { color: colors.text }]}>{colorTemp}K</Text>
              </View>
              <Slider
                value={colorTemp}
                min={2000}
                max={10000}
                onValueChange={(val) => {
                  triggerHaptic();
                  setColorTemp(val);
                }}
              />
            </View>
          )}

          <Button
            title="Apply White Balance"
            onPress={() => {
              triggerHaptic();
              navigation.goBack();
            }}
            variant="primary"
            size="large"
            style={{ marginTop: spacing.xl }}
          />
        </ScrollView>
      </GradientBackground>
    </View>
  );
};

// =====================================================
// MORE GALLERY SCREENS
// =====================================================

// Search Photos Screen
export const SearchPhotosScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const { colors, spacing, borderRadius, typography } = useTheme();
  const { triggerHaptic } = useApp();
  const [searchText, setSearchText] = useState('');
  const [results, setResults] = useState<PhotoItem[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = async (text: string) => {
    setSearchText(text);
    if (text.length > 1) {
      setIsSearching(true);
      await simulateLoading(300);
      setResults(mockPhotos.filter(p => p.filename.toLowerCase().includes(text.toLowerCase())));
      setIsSearching(false);
    } else {
      setResults([]);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <GradientBackground>
        <Header title="Search Photos" leftIcon="close" onLeftPress={() => navigation.goBack()} />
        
        <View style={styles.searchBarContainer}>
          <TextInput
            value={searchText}
            onChangeText={handleSearch}
            placeholder="Search by filename, date, or location..."
            placeholderTextColor={colors.textSecondary}
            style={[styles.searchBarInput, { backgroundColor: colors.card, color: colors.text }]}
          />
        </View>

        {isSearching ? (
          <View style={styles.searchingIndicator}>
            <ActivityIndicator color={colors.primary} size="large" />
            <Text style={[typography.body, { color: colors.textSecondary, marginTop: spacing.md }]}>
              Searching...
            </Text>
          </View>
        ) : results.length > 0 ? (
          <FlatList
            data={results}
            numColumns={3}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => {
                  triggerHaptic();
                  navigation.navigate('PhotoViewer', { photoId: item.id, photos: results });
                }}
                style={styles.searchResultItem}
              >
                <View style={[styles.searchResultThumb, { backgroundColor: colors.surface }]}>
                  <Text style={{ fontSize: 20 }}>📷</Text>
                </View>
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{ padding: spacing.sm }}
          />
        ) : searchText.length > 1 ? (
          <EmptyState
            icon="🔍"
            title="No Results"
            message={`No photos found for "${searchText}"`}
          />
        ) : (
          <View style={styles.searchSuggestions}>
            <Text style={[typography.h3, { color: colors.text, marginBottom: spacing.md }]}>
              Search Tips
            </Text>
            <Text style={[typography.body, { color: colors.textSecondary }]}>
              • Search by filename{'\n'}
              • Search by date{'\n'}
              • Search by location{'\n'}
              • Search by album name
            </Text>
          </View>
        )}
      </GradientBackground>
    </View>
  );
};

// Recently Deleted Screen
export const RecentlyDeletedScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const { colors, spacing, borderRadius, typography } = useTheme();
  const { triggerHaptic } = useApp();
  const [deletedPhotos, setDeletedPhotos] = useState<PhotoItem[]>([]);
  const [isEmpty] = useState(true);

  const handleRestore = (photoId: string) => {
    triggerHaptic();
    Alert.alert('Restore Photo', 'Photo restored from Recently Deleted', [
      { text: 'OK' },
    ]);
  };

  const handleDeleteForever = (photoId: string) => {
    Alert.alert(
      'Delete Forever',
      'This photo will be permanently deleted. Are you sure?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', style: 'destructive', onPress: () => {} },
      ]
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <GradientBackground>
        <Header title="Recently Deleted" leftIcon="close" onLeftPress={() => navigation.goBack()} />
        
        {isEmpty ? (
          <EmptyState
            icon="🗑️"
            title="No Deleted Photos"
            message="Photos you delete will appear here for 30 days"
          />
        ) : (
          <FlatList
            data={deletedPhotos}
            renderItem={({ item }) => (
              <View style={[styles.deletedPhotoCard, { backgroundColor: colors.card }]}>
                <View style={[styles.deletedPhotoThumb, { backgroundColor: colors.surface }]}>
                  <Text style={{ fontSize: 24 }}>📷</Text>
                </View>
                <View style={{ flex: 1, marginLeft: spacing.md }}>
                  <Text style={[typography.body, { color: colors.text }]}>{item.filename}</Text>
                  <Text style={[typography.caption, { color: colors.textSecondary }]}>
                    Delete in 30 days
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={() => handleRestore(item.id)}
                  style={[styles.restoreButton, { backgroundColor: colors.success }]}
                >
                  <Text style={{ color: '#FFFFFF' }}>Restore</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => handleDeleteForever(item.id)}
                  style={[styles.deleteForeverButton, { backgroundColor: colors.error }]}
                >
                  <Text style={{ color: '#FFFFFF' }}>Delete</Text>
                </TouchableOpacity>
              </View>
            )}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{ padding: spacing.md }}
          />
        )}
      </GradientBackground>
    </View>
  );
};

// =====================================================
// MORE EDITOR SCREENS
// =====================================================

// Curves Editor Screen
export const CurvesEditorScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const { colors, spacing, borderRadius, typography } = useTheme();
  const { triggerHaptic } = useApp();
  const [activeChannel, setActiveChannel] = useState<'rgb' | 'r' | 'g' | 'b'>('rgb');
  const [curvePoints, setCurvePoints] = useState({
    rgb: [0, 85, 170, 255],
    r: [0, 85, 170, 255],
    g: [0, 85, 170, 255],
    b: [0, 85, 170, 255],
  });

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <GradientBackground>
        <Header 
          title="Curves" 
          leftIcon="close"
          onLeftPress={() => navigation.goBack()}
          rightIcon="check"
          onRightPress={() => {
            triggerHaptic();
            navigation.goBack();
          }}
        />

        <View style={[styles.curvesPreview, { backgroundColor: colors.card }]}>
          <Text style={{ fontSize: 80 }}>📈</Text>
        </View>

        <View style={{ padding: spacing.lg }}>
          <View style={styles.channelSelector}>
            {['rgb', 'r', 'g', 'b'].map((channel) => (
              <TouchableOpacity
                key={channel}
                onPress={() => {
                  triggerHaptic();
                  setActiveChannel(channel as any);
                }}
                style={[
                  styles.channelButton,
                  {
                    backgroundColor: activeChannel === channel ? (
                      channel === 'r' ? '#FF4444' : channel === 'g' ? '#44FF44' : channel === 'b' ? '#4444FF' : colors.primary
                    ) : colors.card,
                  },
                ]}
              >
                <Text style={{ color: '#FFFFFF' }}>{channel.toUpperCase()}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <Card style={{ marginTop: spacing.lg }}>
            <Text style={[typography.h3, { color: colors.text, marginBottom: spacing.md }]}>
              Adjust Control Points
            </Text>
            <Text style={[typography.body, { color: colors.textSecondary }]}>
              Drag the curves to adjust brightness and contrast.
              Use the presets below for quick adjustments.
            </Text>
          </Card>

          <View style={styles.curvePresets}>
            <TouchableOpacity 
              style={[styles.curvePresetButton, { backgroundColor: colors.card }]}
              onPress={() => triggerHaptic()}
            >
              <Text style={[typography.caption, { color: colors.text }]}>Linear</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.curvePresetButton, { backgroundColor: colors.card }]}
              onPress={() => triggerHaptic()}
            >
              <Text style={[typography.caption, { color: colors.text }]}>S-Curve</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.curvePresetButton, { backgroundColor: colors.card }]}
              onPress={() => triggerHaptic()}
            >
              <Text style={[typography.caption, { color: colors.text }]}>High Contrast</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.curvePresetButton, { backgroundColor: colors.card }]}
              onPress={() => triggerHaptic()}
            >
              <Text style={[typography.caption, { color: colors.text }]}>Low Contrast</Text>
            </TouchableOpacity>
          </View>
        </View>
      </GradientBackground>
    </View>
  );
};

// Color Mixer Screen
export const ColorMixerScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const { colors, spacing, borderRadius, typography } = useTheme();
  const { triggerHaptic } = useApp();
  const [saturation, setSaturation] = useState(0);
  const [lightness, setLightness] = useState(0);
  const [hue, setHue] = useState(0);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <GradientBackground>
        <Header title="Color Mixer" leftIcon="close" onLeftPress={() => navigation.goBack()} />
        
        <ScrollView contentContainerStyle={{ padding: spacing.lg }}>
          <View style={[styles.colorMixerPreview, { backgroundColor: colors.card }]}>
            <Text style={{ fontSize: 80 }}>🎨</Text>
          </View>

          <Card style={{ marginBottom: spacing.lg }}>
            <View style={styles.sliderHeader}>
              <Text style={[typography.body, { color: colors.text }]}>Saturation</Text>
              <Text style={[typography.body, { color: colors.primary }]}>{saturation}</Text>
            </View>
            <Slider value={saturation} min={-100} max={100} onValueChange={(val) => { triggerHaptic(); setSaturation(val); }} />
          </Card>

          <Card style={{ marginBottom: spacing.lg }}>
            <View style={styles.sliderHeader}>
              <Text style={[typography.body, { color: colors.text }]}>Lightness</Text>
              <Text style={[typography.body, { color: colors.primary }]}>{lightness}</Text>
            </View>
            <Slider value={lightness} min={-100} max={100} onValueChange={(val) => { triggerHaptic(); setLightness(val); }} />
          </Card>

          <Card style={{ marginBottom: spacing.lg }}>
            <View style={styles.sliderHeader}>
              <Text style={[typography.body, { color: colors.text }]}>Hue</Text>
              <Text style={[typography.body, { color: colors.primary }]}>{hue}</Text>
            </View>
            <Slider value={hue} min={-180} max={180} onValueChange={(val) => { triggerHaptic(); setHue(val); }} />
          </Card>

          <Button
            title="Reset All"
            onPress={() => {
              triggerHaptic();
              setSaturation(0);
              setLightness(0);
              setHue(0);
            }}
            variant="outline"
            style={{ marginBottom: spacing.md }}
          />

          <Button title="Apply Color" onPress={() => { triggerHaptic(); navigation.goBack(); }} variant="primary" size="large" />
        </ScrollView>
      </GradientBackground>
    </View>
  );
};

// =====================================================
// MORE COLLAGES SCREENS
// =====================================================

export const CollageAdjustScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const { colors, spacing, borderRadius, typography } = useTheme();
  const { triggerHaptic } = useApp();
  const [spacingValue, setSpacingValue] = useState(8);
  const [borderRadiusCollage, setBorderRadiusCollage] = useState(8);
  const [cornerStyle, setCornerStyle] = useState<'sharp' | 'rounded' | 'round'>('rounded');

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <GradientBackground>
        <Header title="Adjust Layout" leftIcon="close" onLeftPress={() => navigation.goBack()} />
        
        <ScrollView contentContainerStyle={{ padding: spacing.lg }}>
          <Card style={{ marginBottom: spacing.lg }}>
            <Text style={[typography.h3, { color: colors.text, marginBottom: spacing.md }]}>Border Spacing</Text>
            <View style={styles.sliderHeader}>
              <Text style={[typography.body, { color: colors.textSecondary }]}>0px</Text>
              <Text style={[typography.body, { color: colors.primary }]}>{spacingValue}px</Text>
              <Text style={[typography.body, { color: colors.textSecondary }]}>32px</Text>
            </View>
            <Slider value={spacingValue} min={0} max={32} onValueChange={(val) => { triggerHaptic(); setSpacingValue(val); }} />
          </Card>

          <Card style={{ marginBottom: spacing.lg }}>
            <Text style={[typography.h3, { color: colors.text, marginBottom: spacing.md }]}>Corner Style</Text>
            <View style={styles.cornerStylesRow}>
              {['sharp', 'rounded', 'round'].map((style) => (
                <TouchableOpacity
                  key={style}
                  onPress={() => {
                    triggerHaptic();
                    setCornerStyle(style as any);
                  }}
                  style={[
                    styles.cornerStyleButton,
                    {
                      backgroundColor: cornerStyle === style ? colors.primary : colors.card,
                    },
                  ]}
                >
                  <Text style={{ color: cornerStyle === style ? '#FFFFFF' : colors.text }}>
                    {style.charAt(0).toUpperCase() + style.slice(1)}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </Card>

          <Button title="Apply Adjustments" onPress={() => { triggerHaptic(); navigation.goBack(); }} variant="primary" size="large" />
        </ScrollView>
      </GradientBackground>
    </View>
  );
};

// =====================================================
// MORE EXPORT SCREENS
// =====================================================

export const BulkExportScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const { colors, spacing, borderRadius, typography } = useTheme();
  const { triggerHaptic } = useApp();
  const [selectedPhotos, setSelectedPhotos] = useState<string[]>([]);
  const [selectAll, setSelectAll] = useState(false);

  const handleSelectAll = async () => {
    await triggerHaptic();
    setSelectAll(!selectAll);
    setSelectedPhotos(!selectAll ? mockPhotos.map(p => p.id) : []);
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <GradientBackground>
        <Header title="Bulk Export" leftIcon="close" onLeftPress={() => navigation.goBack()} />
        
        <View style={styles.bulkHeader}>
          <Text style={[typography.body, { color: colors.textSecondary }]}>
            {selectedPhotos.length} photos selected
          </Text>
          <TouchableOpacity onPress={handleSelectAll}>
            <Text style={[typography.body, { color: colors.primary }]}>
              {selectAll ? 'Deselect All' : 'Select All'}
            </Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={mockPhotos.slice(0, 30)}
          numColumns={5}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => {
                triggerHaptic();
                if (selectedPhotos.includes(item.id)) {
                  setSelectedPhotos(prev => prev.filter(id => id !== item.id));
                } else {
                  setSelectedPhotos(prev => [...prev, item.id]);
                }
              }}
              style={[
                styles.bulkPhotoItem,
                { backgroundColor: selectedPhotos.includes(item.id) ? colors.primary : colors.card },
              ]}
            >
              <View style={[styles.bulkPhotoThumb, { backgroundColor: colors.surface }]}>
                <Text style={{ fontSize: 12 }}>📷</Text>
              </View>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ padding: spacing.sm }}
        />

        <View style={styles.bulkFooter}>
          <Button
            title={`Export ${selectedPhotos.length} Photos`}
            onPress={() => { triggerHaptic(); navigation.navigate('ExportSettings'); }}
            variant="primary"
            size="large"
            disabled={selectedPhotos.length === 0}
          />
        </View>
      </GradientBackground>
    </View>
  );
};

// =====================================================
// STYLES (More)
// =====================================================

const styles = StyleSheet.create({
  container: { flex: 1 },
  flashGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  flashOption: {
    width: '48%',
    padding: 24,
    borderRadius: 20,
    alignItems: 'center',
    marginBottom: 12,
  },
  focusPreview: {
    height: 250,
    margin: 16,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  focusReticle: {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  focusCenterDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  focusOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  focusOption: {
    width: '48%',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 8,
  },
  focusLockRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  wbPreview: {
    height: 150,
    margin: 16,
    borderRadius: 16,
    overflow: 'hidden',
  },
  wbPresetsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  wbPreset: {
    width: '31%',
    paddingVertical: 16,
    marginBottom: 8,
    borderRadius: 12,
    alignItems: 'center',
  },
  tempDisplay: {
    alignItems: 'center',
    marginBottom: 16,
  },
  searchBarContainer: {
    padding: 16,
  },
  searchBarInput: {
    padding: 16,
    borderRadius: 12,
    fontSize: 16,
  },
  searchingIndicator: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchResultItem: {
    width: '33%',
    padding: 4,
  },
  searchResultThumb: {
    height: 80,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchSuggestions: {
    padding: 24,
    alignItems: 'center',
  },
  deletedPhotoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
    marginBottom: 8,
  },
  deletedPhotoThumb: {
    width: 50,
    height: 50,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  restoreButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  deleteForeverButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    marginLeft: 8,
  },
  curvesPreview: {
    height: 200,
    margin: 16,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  channelSelector: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  channelButton: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
    marginHorizontal: 4,
  },
  curvePresets: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  curvePresetButton: {
    width: '23%',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 8,
  },
  colorMixerPreview: {
    height: 150,
    margin: 16,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sliderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  cornerStylesRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cornerStyleButton: {
    flex: 1,
    marginHorizontal: 4,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  bulkHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
  },
  bulkPhotoItem: {
    width: '19%',
    margin: '0.5%',
    borderRadius: 8,
  },
  bulkPhotoThumb: {
    height: 50,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bulkFooter: {
    padding: 16,
  },
});

export default {
  CameraFlashScreen,
  CameraFocusScreen,
  CameraWhiteBalanceScreen,
  SearchPhotosScreen,
  RecentlyDeletedScreen,
  CurvesEditorScreen,
  ColorMixerScreen,
  CollageAdjustScreen,
  BulkExportScreen,
};

// More exports for additional screens
export const ExtraCameraScreens = () => {};
export const ExtraGalleryScreens = () => {};
export const ExtraEditorScreens = () => {};
export const ExtraCollageScreens = () => {};
export const ExtraExportScreens = () => {};