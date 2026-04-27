// =====================================================
// PHOTOLAB ULTRA PRO MAX - EDITOR TAB (30+ tools)
// Level 1: Tool Categories
// =====================================================

import React, { useState, useCallback, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Animated,
  TextInput,
  FlatList,
  Pressable,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Haptics from 'expo-haptics';
import BottomSheet, { BottomSheetBackdrop, BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../../contexts/ThemeContext';
import { useApp } from '../../contexts/AppContext';
import { Icon, Card, Button, Slider, Header, GradientBackground, BottomSheetModal } from '../../components/UI';
import { FloatingAIButton } from '../../components/AIAssistant';
import { AdjustmentSettings, FilterPreset } from '../../types';
import { filterPresets, defaultAdjustments } from '../../utils/mockData';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// ============ EDITOR HOME SCREEN (Level 1) ============
export const EditorHomeScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const { colors, spacing, borderRadius, typography } = useTheme();
  const { triggerHaptic, addToHistory } = useApp();

  const toolCategories = [
    { id: 'adjust', name: 'Adjust', icon: '📊', color: '#6366F1', count: 9 },
    { id: 'filters', name: 'Filters', icon: '🎨', color: '#EC4899', count: 50 },
    { id: 'crop', name: 'Crop', icon: '✂️', color: '#22C55E', count: 6 },
    { id: 'retouch', name: 'Retouch', icon: '✨', color: '#F59E0B', count: 5 },
    { id: 'text', name: 'Text', icon: 'Aa', color: '#8B5CF6', count: 20 },
    { id: 'stickers', name: 'Stickers', icon: '💫', color: '#06B6D4', count: 40 },
    { id: 'frames', name: 'Frames', icon: '🖼️', color: '#EF4444', count: 15 },
    { id: 'effects', name: 'Effects', icon: '🔮', color: '#F472C6', count: 12 },
  ];

  const handleSelectCategory = async (category: typeof toolCategories[0]) => {
    await triggerHaptic();
    await addToHistory({
      action: 'edit',
      parameters: { category: category.id },
    });

    switch (category.id) {
      case 'adjust':
        navigation.navigate('AdjustPanel');
        break;
      case 'filters':
        navigation.navigate('FiltersPanel');
        break;
      case 'crop':
        navigation.navigate('CropPanel');
        break;
      case 'retouch':
        navigation.navigate('RetouchPanel');
        break;
      case 'text':
        navigation.navigate('TextPanel');
        break;
      case 'stickers':
        navigation.navigate('StickersPanel');
        break;
      case 'frames':
        navigation.navigate('FramesPanel');
        break;
      case 'effects':
        navigation.navigate('EffectsPanel');
        break;
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <GradientBackground>
        <Header title="file_editor" transparent />

        <ScrollView contentContainerStyle={{ padding: spacing.lg }}>
          <View style={{ paddingTop: spacing.xl }}>
            <Text style={[typography.h2, { color: colors.text, marginBottom: spacing.sm }]}>
              Select a Tool
            </Text>
            <Text style={[typography.body, { color: colors.textSecondary, marginBottom: spacing.lg }]}>
              30+ professional editing tools
            </Text>

            <View style={styles.toolGrid}>
              {toolCategories.map((category, index) => (
                <TouchableOpacity
                  key={category.id}
                  onPress={() => handleSelectCategory(category)}
                  style={[styles.toolCard, { backgroundColor: colors.card }]}
                >
                  <LinearGradient
                    colors={[category.color, category.color + '80']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.toolIconGradient}
                  >
                    <Text style={{ fontSize: 32 }}>{category.icon}</Text>
                  </LinearGradient>
                  <Text style={[typography.body, { color: colors.text, marginTop: spacing.sm }]}>
                    {category.name}
                  </Text>
                  <Text style={[typography.caption, { color: colors.textSecondary }]}>
                    {category.count} tools
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <Card style={[styles.recentEdits, { marginTop: spacing.lg }]}>
              <Text style={[typography.h3, { color: colors.text, marginBottom: spacing.md }]}>
                📝 Recent Edits
              </Text>
              <View style={styles.recentEditsList}>
                <TouchableOpacity style={[styles.recentEditItem, { backgroundColor: colors.surface }]}>
                  <Text style={{ fontSize: 24 }}>🎨</Text>
                  <Text style={[typography.caption, { color: colors.text }]}>Vivid Filter</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.recentEditItem, { backgroundColor: colors.surface }]}>
                  <Text style={{ fontSize: 24 }}>☀️</Text>
                  <Text style={[typography.caption, { color: colors.text }]}>Brightness</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.recentEditItem, { backgroundColor: colors.surface }]}>
                  <Text style={{ fontSize: 24 }}>✂️</Text>
                  <Text style={[typography.caption, { color: colors.text }]}>Crop 1:1</Text>
                </TouchableOpacity>
              </View>
            </Card>
          </View>
        </ScrollView>

        <FloatingAIButton onPress={() => {}} />
      </GradientBackground>
    </View>
  );
};

// ============ ADJUST PANEL (Level 2) ============
export const AdjustPanelScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const { colors, spacing, borderRadius, typography } = useTheme();
  const { triggerHaptic } = useApp();

  const [adjustments, setAdjustments] = useState<AdjustmentSettings>(defaultAdjustments);

  const adjustmentTools = [
    { id: 'brightness', name: 'Brightness', icon: '☀️', value: adjustments.brightness, setValue: (val: number) => setAdjustments(prev => ({ ...prev, brightness: val })), min: -100, max: 100 },
    { id: 'contrast', name: 'Contrast', icon: '◐', value: adjustments.contrast, setValue: (val: number) => setAdjustments(prev => ({ ...prev, contrast: val })), min: -100, max: 100 },
    { id: 'saturation', name: 'Saturation', icon: '🎨', value: adjustments.saturation, setValue: (val: number) => setAdjustments(prev => ({ ...prev, saturation: val })), min: -100, max: 100 },
    { id: 'warmth', name: 'Warmth', icon: '🌡️', value: adjustments.warmth, setValue: (val: number) => setAdjustments(prev => ({ ...prev, warmth: val })), min: -100, max: 100 },
    { id: 'highlights', name: 'Highlights', icon: '🌞', value: adjustments.highlights, setValue: (val: number) => setAdjustments(prev => ({ ...prev, highlights: val })), min: -100, max: 100 },
    { id: 'shadows', name: 'Shadows', icon: '🌑', value: adjustments.shadows, setValue: (val: number) => setAdjustments(prev => ({ ...prev, shadows: val })), min: -100, max: 100 },
    { id: 'vibrance', name: 'Vibrance', icon: '🌈', value: adjustments.vibrance, setValue: (val: number) => setAdjustments(prev => ({ ...prev, vibrance: val })), min: -100, max: 100 },
    { id: 'clarity', name: 'Clarity', icon: '✨', value: adjustments.clarity, setValue: (val: number) => setAdjustments(prev => ({ ...prev, clarity: val })), min: 0, max: 100 },
    { id: 'exposure', name: 'Exposure', icon: '💡', value: adjustments.exposure, setValue: (val: number) => setAdjustments(prev => ({ ...prev, exposure: val })), min: -50, max: 50 },
    { id: 'blacks', name: 'Blacks', icon: '⚫', value: adjustments.blacks, setValue: (val: number) => setAdjustments(prev => ({ ...prev, blacks: val })), min: 0, max: 50 },
    { id: 'whites', name: 'Whites', icon: '⚪', value: adjustments.whites, setValue: (val: number) => setAdjustments(prev => ({ ...prev, whites: val })), min: 0, max: 50 },
    { id: 'hue', name: 'Hue', icon: '🎭', value: adjustments.hue, setValue: (val: number) => setAdjustments(prev => ({ ...prev, hue: val })), min: -180, max: 180 },
  ];

  const handleAdvanced = async () => {
    await triggerHaptic();
    navigation.navigate('AdvancedAdjust');
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <GradientBackground>
        <Header 
          title="Adjustments" 
          leftIcon="close"
          onLeftPress={() => navigation.goBack()}
          rightIcon="check"
          onRightPress={() => {
            triggerHaptic();
            navigation.goBack();
          }}
        />

        <View style={[styles.adjustPreview, { backgroundColor: colors.card }]}>
          <Text style={{ fontSize: 100 }}>📷</Text>
        </View>

        <ScrollView contentContainerStyle={{ padding: spacing.lg }}>
          {adjustmentTools.map((tool) => (
            <Card key={tool.id} style={{ marginBottom: spacing.md }}>
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
            </Card>
          ))}

          <Button
            title="Advanced Controls"
            onPress={handleAdvanced}
            variant="outline"
            icon={<Text style={{ fontSize: 18 }}>⚙️</Text>}
            style={{ marginTop: spacing.md }}
          />
        </ScrollView>
      </GradientBackground>

      <FloatingAIButton onPress={() => {}} />
    </View>
  );
};

// ============ ADVANCED ADJUST (Level 3/4) ============
export const AdvancedAdjustScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const { colors, spacing, borderRadius, typography } = useTheme();
  const { triggerHaptic } = useApp();

  const [curvesData, setCurvesData] = useState([50, 50, 50, 50, 50, 50, 50, 50]);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <GradientBackground>
        <Header 
          title="Advanced Adjustments" 
          leftIcon="close"
          onLeftPress={() => navigation.goBack()}
          rightIcon="check"
          onRightPress={() => {
            triggerHaptic();
            navigation.goBack();
          }}
        />

        <ScrollView contentContainerStyle={{ padding: spacing.lg }}>
          <Card style={{ marginBottom: spacing.lg }}>
            <Text style={[typography.h3, { color: colors.text, marginBottom: spacing.md }]}>
              📈 Curves
            </Text>
            <Text style={[typography.caption, { color: colors.textSecondary, marginBottom: spacing.md }]}>
              Adjust tone curve for precise control
            </Text>
            <View style={[styles.curvesContainer, { backgroundColor: colors.surface }]}>
              <View style={styles.curvesLine}>
                {['0', '40', '80', '120', '160', '200', '240'].map((val, i) => (
                  <TouchableOpacity
                    key={i}
                    onPress={() => {
                      triggerHaptic();
                      const newData = [...curvesData];
                      newData[i] = (newData[i] + 20) % 100;
                      setCurvesData(newData);
                    }}
                    style={[styles.curvePoint, { backgroundColor: colors.primary }]}
                  />
                ))}
              </View>
            </View>
          </Card>

          <Card style={{ marginBottom: spacing.lg }}>
            <Text style={[typography.h3, { color: colors.text, marginBottom: spacing.md }]}>
              🎨 HSL (Hue, Saturation, Lightness)
            </Text>
            <View style={styles.hslControls}>
              {['Reds', 'Oranges', 'Yellows', 'Greens', 'Cyans', 'Blues', 'Purples', 'Magentas'].map((color, i) => (
                <TouchableOpacity key={i} style={[styles.hslButton, { backgroundColor: colors.card }]}>
                  <View style={[styles.hslColorPreview, { backgroundColor: colors.primary }]} />
                  <Text style={[typography.caption, { color: colors.text }]}>{color}</Text>
                  <View style={styles.hslSliders}>
                    <Text style={[typography.caption, { color: colors.textSecondary }]}>H</Text>
                    <Text style={[typography.caption, { color: colors.textSecondary }]}>S</Text>
                    <Text style={[typography.caption, { color: colors.textSecondary }]}>L</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </Card>

          <Card style={{ marginBottom: spacing.lg }}>
            <Text style={[typography.h3, { color: colors.text, marginBottom: spacing.md }]}>
              🔘 Color Balance
            </Text>
            <Slider
              value={0}
              min={-50}
              max={50}
              label="Cyan ↔ Red"
              onValueChange={() => {}}
            />
            <Slider
              value={0}
              min={-50}
              max={50}
              label="Magenta ↔ Green"
              onValueChange={() => {}}
            />
            <Slider
              value={0}
              min={-50}
              max={50}
              label="Yellow ↔ Blue"
              onValueChange={() => {}}
            />
          </Card>
        </ScrollView>
      </GradientBackground>

      <FloatingAIButton onPress={() => {}} />
    </View>
  );
};

// ============ FILTERS PANEL (Level 2) ============
export const FiltersPanelScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const { colors, spacing, borderRadius, typography } = useTheme();
  const { triggerHaptic } = useApp();

  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);
  const [intensity, setIntensity] = useState(100);

  const categories = ['All', 'Vivid', 'Dramatic', 'Mono', 'Vintage', 'Cinematic', 'Moody'];
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredFilters = selectedCategory === 'All' 
    ? filterPresets 
    : filterPresets.filter(f => f.category === selectedCategory.toLowerCase());

  const handleSelectFilter = async (filter: FilterPreset) => {
    await triggerHaptic();
    setSelectedFilter(filter.id);
    navigation.navigate('FilterIntensity', { filter });
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <GradientBackground>
        <Header 
          title="Filters" 
          leftIcon="close"
          onLeftPress={() => navigation.goBack()}
        />

        <View style={[styles.filterPreview, { backgroundColor: colors.card }]}>
          <Text style={{ fontSize: 80 }}>📷</Text>
          {selectedFilter && (
            <Text style={[typography.h3, { color: colors.primary, marginTop: spacing.md }]}>
              {filterPresets.find(f => f.id === selectedFilter)?.name}
            </Text>
          )}
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryScroll}>
          {categories.map((cat) => (
            <TouchableOpacity
              key={cat}
              onPress={() => {
                triggerHaptic();
                setSelectedCategory(cat);
              }}
              style={[
                styles.categoryButton,
                { backgroundColor: selectedCategory === cat ? colors.primary : colors.card },
              ]}
            >
              <Text style={[typography.body, { color: selectedCategory === cat ? '#FFFFFF' : colors.text }]}>
                {cat}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <FlatList
          data={filteredFilters}
          numColumns={4}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => handleSelectFilter(item)}
              style={[styles.filterItem, { backgroundColor: colors.card }]}
            >
              <View style={[styles.filterThumbnail, { backgroundColor: colors.surface }]}>
                <Text style={{ fontSize: 24 }}>🎨</Text>
              </View>
              <Text style={[typography.caption, { color: colors.text, marginTop: 4 }]} numberOfLines={1}>
                {item.name}
              </Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ padding: spacing.md }}
        />
      </GradientBackground>

      <FloatingAIButton onPress={() => {}} />
    </View>
  );
};

// ============ FILTER INTENSITY (Level 3) ============
export const FilterIntensityScreen: React.FC = ({ route, navigation }: any) => {
  const { filter } = route.params;
  const { colors, spacing, borderRadius, typography } = useTheme();
  const { triggerHaptic } = useApp();

  const [intensity, setIntensity] = useState(100);
  const [showCompare, setShowCompare] = useState(false);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <GradientBackground>
        <Header 
          title={filter?.name || 'Filter'} 
          leftIcon="close"
          onLeftPress={() => navigation.goBack()}
          rightIcon="check"
          onRightPress={() => {
            triggerHaptic();
            navigation.goBack();
          }}
        />

        <TouchableOpacity 
          onPress={() => setShowCompare(!showCompare)}
          style={[styles.compareView, { backgroundColor: colors.card }]}
        >
          <View style={styles.compareHalf}>
            <Text style={{ fontSize: 60 }}>📷</Text>
            <Text style={[typography.body, { color: colors.text, marginTop: spacing.md }]}>Before</Text>
          </View>
          <View style={styles.compareHalf}>
            <Text style={{ fontSize: 60 }}>🎨</Text>
            <Text style={[typography.body, { color: colors.primary, marginTop: spacing.md }]}>After</Text>
          </View>
          <View style={[styles.compareSlider, { backgroundColor: colors.border }]}>
            <View style={[styles.compareHandle, { backgroundColor: colors.primary }]} />
          </View>
        </TouchableOpacity>

        <View style={{ padding: spacing.lg }}>
          <Card style={{ marginBottom: spacing.lg }}>
            <View style={styles.intensityHeader}>
              <Text style={[typography.h3, { color: colors.text }]}>Intensity</Text>
              <Text style={[typography.h3, { color: colors.primary }]}>{intensity}%</Text>
            </View>
            <Slider
              value={intensity}
              min={0}
              max={100}
              onValueChange={(val) => {
                triggerHaptic();
                setIntensity(val);
              }}
            />
          </Card>

          <Button
            title="Save as Preset"
            onPress={() => {
              triggerHaptic();
              navigation.navigate('SavePreset');
            }}
            variant="outline"
            icon={<Text style={{ fontSize: 18 }}>💾</Text>}
            style={{ marginBottom: spacing.md }}
          />

          <Button
            title="Apply Filter"
            onPress={() => {
              triggerHaptic();
              navigation.goBack();
            }}
            variant="primary"
            size="large"
          />
        </View>
      </GradientBackground>
    </View>
  );
};

// ============ SAVE PRESET (Level 4/5) ============
export const SavePresetScreen: React.FC = ({ route, navigation }: any) => {
  const { filter } = route.params;
  const { colors, spacing, borderRadius, typography } = useTheme();
  const { triggerHaptic } = useApp();

  const [presetName, setPresetName] = useState('');
  const [selectedIcon, setSelectedIcon] = useState('🎨');

  const icons = ['🎨', '🌅', '🌙', '✨', '🔥', '💫', '🌈', '🎭', '📸', '🖼️'];

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <GradientBackground>
        <Header 
          title="Save as Preset" 
          leftIcon="close"
          onLeftPress={() => navigation.goBack()}
        />

        <View style={{ padding: spacing.lg }}>
          <Card style={{ marginBottom: spacing.lg }}>
            <Text style={[typography.body, { color: colors.textSecondary, marginBottom: spacing.sm }]}>
              Select Icon
            </Text>
            <View style={styles.iconPicker}>
              {icons.map((icon) => (
                <TouchableOpacity
                  key={icon}
                  onPress={() => {
                    triggerHaptic();
                    setSelectedIcon(icon);
                  }}
                  style={[
                    styles.iconOption,
                    {
                      backgroundColor: selectedIcon === icon ? colors.primary : colors.card,
                    },
                  ]}
                >
                  <Text style={{ fontSize: 24 }}>{icon}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </Card>

          <Card style={{ marginBottom: spacing.lg }}>
            <Text style={[typography.body, { color: colors.textSecondary, marginBottom: spacing.sm }]}>
              Preset Name
            </Text>
            <TextInput
              value={presetName}
              onChangeText={setPresetName}
              placeholder="Enter preset name..."
              placeholderTextColor={colors.textSecondary}
              style={[styles.presetInput, { backgroundColor: colors.surface, color: colors.text }]}
            />
          </Card>

          <Button
            title="Save Preset"
            onPress={() => {
              triggerHaptic();
              navigation.goBack();
            }}
            variant="primary"
            size="large"
            disabled={!presetName.trim()}
            icon={<Text style={{ fontSize: 20 }}>💾</Text>}
          />
        </View>
      </GradientBackground>
    </View>
  );
};

// ============ CROP PANEL ============
export const CropPanelScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const { colors, spacing, borderRadius, typography } = useTheme();
  const { triggerHaptic } = useApp();

  const [selectedRatio, setSelectedRatio] = useState('free');
  const [rotation, setRotation] = useState(0);

  const ratios = [
    { id: 'free', name: 'Free', ratio: 'free' },
    { id: '1:1', name: 'Square', ratio: '1:1' },
    { id: '4:3', name: 'Standard', ratio: '4:3' },
    { id: '3:2', name: 'Photo', ratio: '3:2' },
    { id: '16:9', name: 'Wide', ratio: '16:9' },
    { id: '9:16', name: 'Story', ratio: '9:16' },
  ];

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <GradientBackground>
        <Header 
          title="Crop & Rotate" 
          leftIcon="close"
          onLeftPress={() => navigation.goBack()}
          rightIcon="check"
          onRightPress={() => {
            triggerHaptic();
            navigation.goBack();
          }}
        />

        <View style={[styles.cropPreview, { backgroundColor: colors.card }]}>
          <Text style={{ fontSize: 80 }}>✂️</Text>
        </View>

        <View style={{ padding: spacing.lg }}>
          <Text style={[typography.h3, { color: colors.text, marginBottom: spacing.md }]}>
            Aspect Ratio
          </Text>
          <View style={styles.ratioGrid}>
            {ratios.map((ratio) => (
              <TouchableOpacity
                key={ratio.id}
                onPress={() => {
                  triggerHaptic();
                  setSelectedRatio(ratio.id);
                }}
                style={[
                  styles.ratioItem,
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

        <View style={{ padding: spacing.lg }}>
          <Text style={[typography.h3, { color: colors.text, marginBottom: spacing.md }]}>
            Rotation: {rotation}°
          </Text>
          <View style={styles.rotationControls}>
            <TouchableOpacity
              onPress={() => {
                triggerHaptic();
                setRotation(rotation - 90);
              }}
              style={[styles.rotateBtn, { backgroundColor: colors.card }]}
            >
              <Text style={{ fontSize: 32 }}>↺</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                triggerHaptic();
                setRotation(0);
              }}
              style={[styles.rotateBtn, { backgroundColor: colors.card }]}
            >
              <Text style={{ fontSize: 16 }}>Reset</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                triggerHaptic();
                setRotation(rotation + 90);
              }}
              style={[styles.rotateBtn, { backgroundColor: colors.card }]}
            >
              <Text style={{ fontSize: 32 }}>↻</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={{ padding: spacing.lg }}>
          <Button
            title="Apply Crop"
            onPress={() => {
              triggerHaptic();
              navigation.goBack();
            }}
            variant="primary"
            size="large"
          />
        </View>
      </GradientBackground>
    </View>
  );
};

// ============ RETOUCH PANEL ============
export const RetouchPanelScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const { colors, spacing, borderRadius, typography } = useTheme();
  const { triggerHaptic } = useApp();

  const retouchTools = [
    { id: 'heal', name: 'Heal', icon: '🩹', description: 'Remove blemishes and objects' },
    { id: 'clone', name: 'Clone', icon: '📋', description: 'Copy area to another' },
    { id: 'blur', name: 'Blur', icon: '🌫️', description: 'Blur sensitive areas' },
    { id: 'dodge', name: 'Dodge', icon: '☀️', description: 'Lighten areas' },
    { id: 'burn', name: 'Burn', icon: '🔥', description: 'Darken areas' },
  ];

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <GradientBackground>
        <Header 
          title="Retouch Tools" 
          leftIcon="close"
          onLeftPress={() => navigation.goBack()}
        />

        <View style={[styles.retouchPreview, { backgroundColor: colors.card }]}>
          <Text style={{ fontSize: 100 }}>✨</Text>
        </View>

        <View style={{ padding: spacing.lg }}>
          {retouchTools.map((tool) => (
            <TouchableOpacity
              key={tool.id}
              onPress={() => {
                triggerHaptic();
                navigation.navigate('RetouchTool', { tool });
              }}
              style={[styles.retouchTool, { backgroundColor: colors.card, marginBottom: spacing.md }]}
            >
              <Text style={{ fontSize: 32 }}>{tool.icon}</Text>
              <View style={{ flex: 1, marginLeft: spacing.md }}>
                <Text style={[typography.h3, { color: colors.text }]}>{tool.name}</Text>
                <Text style={[typography.caption, { color: colors.textSecondary }]}>
                  {tool.description}
                </Text>
              </View>
              <Text style={{ fontSize: 20 }}>›</Text>
            </TouchableOpacity>
          ))}
        </View>
      </GradientBackground>
    </View>
  );
};

// ============ TEXT PANEL ============
export const TextPanelScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const { colors, spacing, borderRadius, typography } = useTheme();
  const { triggerHaptic } = useApp();

  const textStyles = [
    { id: 'modern', name: 'Modern', font: 'System', style: 'bold' },
    { id: 'classic', name: 'Classic', font: 'Serif', style: 'italic' },
    { id: 'handwritten', name: 'Handwritten', font: 'Cursive', style: 'normal' },
    { id: 'neon', name: 'Neon', font: 'System', style: 'bold' },
    { id: 'vintage', name: 'Vintage', font: 'Serif', style: 'italic' },
  ];

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <GradientBackground>
        <Header 
          title="Add Text" 
          leftIcon="close"
          onLeftPress={() => navigation.goBack()}
        />

        <View style={{ padding: spacing.lg }}>
          <Text style={[typography.h3, { color: colors.text, marginBottom: spacing.md }]}>
            Text Styles
          </Text>
          <View style={styles.textStyleGrid}>
            {textStyles.map((style) => (
              <TouchableOpacity
                key={style.id}
                onPress={() => {
                  triggerHaptic();
                  navigation.navigate('TextEditor', { style });
                }}
                style={[styles.textStyleCard, { backgroundColor: colors.card }]}
              >
                <Text style={{ fontSize: 24 }}>Aa</Text>
                <Text style={[typography.caption, { color: colors.text, marginTop: spacing.xs }]}>
                  {style.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </GradientBackground>
    </View>
  );
};

// ============ STICKERS PANEL ============
export const StickersPanelScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const { colors, spacing, borderRadius, typography } = useTheme();
  const { triggerHaptic } = useApp();

  const stickerPacks = [
    { id: 'emoji', name: 'Emoji', count: 100 },
    { id: 'shapes', name: 'Shapes', count: 50 },
    { id: 'arrows', name: 'Arrows', count: 30 },
    { id: 'speech', name: 'Speech Bubbles', count: 20 },
    { id: 'frames', name: 'Frames', count: 40 },
    { id: 'celebration', name: 'Celebration', count: 25 },
  ];

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <GradientBackground>
        <Header 
          title="Stickers" 
          leftIcon="close"
          onLeftPress={() => navigation.goBack()}
        />

        <FlatList
          data={stickerPacks}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => {
                triggerHaptic();
                navigation.navigate('StickerPack', { pack: item });
              }}
              style={[styles.stickerPack, { backgroundColor: colors.card }]}
            >
              <Text style={{ fontSize: 40 }}>💫</Text>
              <View style={{ flex: 1, marginLeft: spacing.md }}>
                <Text style={[typography.h3, { color: colors.text }]}>{item.name}</Text>
                <Text style={[typography.caption, { color: colors.textSecondary }]}>
                  {item.count} stickers
                </Text>
              </View>
              <Text style={{ fontSize: 20 }}>›</Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ padding: spacing.md }}
        />
      </GradientBackground>
    </View>
  );
};

// ============ FRAMES PANEL ============
export const FramesPanelScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const { colors, spacing, borderRadius, typography } = useTheme();
  const { triggerHaptic } = useApp();

  const frames = Array.from({ length: 15 }, (_, i) => ({ id: `frame_${i}`, name: `Frame ${i + 1}` }));

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <GradientBackground>
        <Header 
          title="Frames" 
          leftIcon="close"
          onLeftPress={() => navigation.goBack()}
        />

        <FlatList
          data={frames}
          numColumns={3}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => {
                triggerHaptic();
                navigation.goBack();
              }}
              style={[styles.frameItem, { backgroundColor: colors.card }]}
            >
              <View style={[styles.framePreview, { backgroundColor: colors.surface }]}>
                <Text style={{ fontSize: 24 }}>🖼️</Text>
              </View>
              <Text style={[typography.caption, { color: colors.text }]}>{item.name}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ padding: spacing.md }}
        />
      </GradientBackground>
    </View>
  );
};

// ============ EFFECTS PANEL ============
export const EffectsPanelScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const { colors, spacing, borderRadius, typography } = useTheme();
  const { triggerHaptic } = useApp();

  const effects = [
    { id: 'vignette', name: 'Vignette', icon: '🔘' },
    { id: 'grain', name: 'Film Grain', icon: '🎞️' },
    { id: 'halo', name: 'Halo', icon: '🌟' },
    { id: 'bokeh', name: 'Bokeh', icon: '💮' },
    { id: 'chromatic', name: 'Chromatic', icon: '🌈' },
    { id: 'tilt', name: 'Tilt Shift', icon: '📷' },
    { id: 'duotone', name: 'Duotone', icon: '🎭' },
    { id: 'noise', name: 'Noise', icon: '📺' },
  ];

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <GradientBackground>
        <Header 
          title="Effects" 
          leftIcon="close"
          onLeftPress={() => navigation.goBack()}
        />

        <FlatList
          data={effects}
          numColumns={2}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => {
                triggerHaptic();
                navigation.goBack();
              }}
              style={[styles.effectCard, { backgroundColor: colors.card }]}
            >
              <Text style={{ fontSize: 40 }}>{item.icon}</Text>
              <Text style={[typography.body, { color: colors.text, marginTop: spacing.sm }]}>{item.name}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ padding: spacing.md }}
        />
      </GradientBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  toolGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  toolCard: {
    width: '48%',
    marginBottom: 16,
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
  },
  toolIconGradient: {
    width: 60,
    height: 60,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  recentEdits: {
    padding: 16,
    borderRadius: 16,
  },
  recentEditsList: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  recentEditItem: {
    width: '30%',
    padding: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  adjustPreview: {
    height: 200,
    margin: 16,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  adjustmentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  curvesContainer: {
    height: 200,
    borderRadius: 12,
    padding: 16,
  },
  curvesLine: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    height: '100%',
  },
  curvePoint: {
    width: 20,
    height: 20,
    borderRadius: 10,
  },
  hslControls: {},
  hslButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
    marginBottom: 8,
  },
  hslColorPreview: {
    width: 24,
    height: 24,
    borderRadius: 12,
  },
  hslSliders: {
    flexDirection: 'row',
    marginLeft: 'auto',
  },
  filterPreview: {
    height: 200,
    margin: 16,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoryScroll: {
    maxHeight: 50,
    paddingHorizontal: 16,
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
  },
  filterItem: {
    width: '24%',
    margin: '0.5%',
    padding: 8,
    borderRadius: 12,
    alignItems: 'center',
  },
  filterThumbnail: {
    width: '100%',
    height: 60,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  compareView: {
    flex: 1,
    margin: 16,
    borderRadius: 16,
    overflow: 'hidden',
  },
  compareHalf: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  compareSlider: {
    height: 40,
    marginHorizontal: 40,
    borderRadius: 20,
  },
  compareHandle: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  intensityHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  iconPicker: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  iconOption: {
    width: '18%',
    aspectRatio: 1,
    marginBottom: 8,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  presetInput: {
    padding: 16,
    borderRadius: 12,
    fontSize: 16,
  },
  cropPreview: {
    height: 250,
    margin: 16,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ratioGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  ratioItem: {
    width: '31%',
    paddingVertical: 16,
    marginBottom: 8,
    borderRadius: 12,
    alignItems: 'center',
  },
  rotationControls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  rotateBtn: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  retouchPreview: {
    height: 200,
    margin: 16,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  retouchTool: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 16,
  },
  textStyleGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  textStyleCard: {
    width: '31%',
    marginBottom: 12,
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
  },
  stickerPack: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 16,
    marginBottom: 8,
  },
  frameItem: {
    width: '32%',
    margin: '0.5%',
    padding: 8,
    borderRadius: 12,
    alignItems: 'center',
  },
  framePreview: {
    width: '100%',
    height: 80,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  effectCard: {
    width: '48%',
    margin: '1%',
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
  },
});

export default {
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
};