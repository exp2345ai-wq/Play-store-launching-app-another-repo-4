// =====================================================
// PHOTOLAB ULTRA PRO MAX - EXPORT TAB
// Level 1: Quality Selection
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
  Share,
  ActivityIndicator,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Haptics from 'expo-haptics';
import * as FileSystem from 'expo-file-system';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../../contexts/ThemeContext';
import { useApp } from '../../contexts/AppContext';
import { Icon, Card, Button, Slider, Header, GradientBackground, BottomSheetModal } from '../../components/UI';
import { FloatingAIButton } from '../../components/AIAssistant';
import { ExportSettings, ShareDestination, PhotoItem } from '../../types';
import { defaultExportSettings, exportQualities, exportFormats, shareDestinations, mockPhotos, simulateLoading } from '../../utils/mockData';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// ============ EXPORT HOME SCREEN (Level 1) ============
export const ExportHomeScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const { colors, spacing, borderRadius, typography } = useTheme();
  const { triggerHaptic, addToHistory } = useApp();

  const [selectedPhotos, setSelectedPhotos] = useState<string[]>([]);
  const [showPhotoSelector, setShowPhotoSelector] = useState(false);

  const recentPhotos = mockPhotos.slice(0, 20);
  const selectedCount = selectedPhotos.length;

  const handleSelectPhotos = async () => {
    await triggerHaptic();
    setShowPhotoSelector(true);
  };

  const handleTogglePhoto = async (photoId: string) => {
    await triggerHaptic();
    if (selectedPhotos.includes(photoId)) {
      setSelectedPhotos(prev => prev.filter(id => id !== photoId));
    } else {
      setSelectedPhotos(prev => [...prev, photoId]);
    }
  };

  const handleExport = async () => {
    await triggerHaptic();
    await addToHistory({
      action: 'export',
      parameters: { photoCount: selectedPhotos.length, exportSettings: defaultExportSettings },
    });
    navigation.navigate('ExportSettings', { photoIds: selectedPhotos });
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <GradientBackground>
        <Header title="Export & Share" />

        <ScrollView contentContainerStyle={{ padding: spacing.lg }}>
          <Card style={{ marginBottom: spacing.lg }}>
            <Text style={[typography.h3, { color: colors.text, marginBottom: spacing.md }]}>
              Selected Photos ({selectedCount})
            </Text>
            
            {selectedCount === 0 ? (
              <View style={[styles.emptySelection, { backgroundColor: colors.surface, borderRadius: borderRadius.md }]}>
                <Text style={{ fontSize: 32 }}>📷</Text>
                <Text style={[typography.body, { color: colors.textSecondary, marginTop: spacing.sm }]}>
                  No photos selected
                </Text>
                <Button
                  title="Select Photos"
                  onPress={handleSelectPhotos}
                  variant="outline"
                  style={{ marginTop: spacing.md }}
                />
              </View>
            ) : (
              <View style={styles.selectedGrid}>
                {selectedPhotos.slice(0, 6).map((photoId) => (
                  <View
                    key={photoId}
                    style={[styles.selectedThumbnail, { backgroundColor: colors.surface }]}
                  >
                    <Text style={{ fontSize: 24 }}>📷</Text>
                    <TouchableOpacity
                      onPress={() => handleTogglePhoto(photoId)}
                      style={styles.removeButton}
                    >
                      <Text style={{ fontSize: 14, color: colors.error }}>✕</Text>
                    </TouchableOpacity>
                  </View>
                ))}
                {selectedCount > 6 && (
                  <TouchableOpacity
                    onPress={handleSelectPhotos}
                    style={[styles.moreThumb, { backgroundColor: colors.surface }]}
                  >
                    <Text style={[typography.h2, { color: colors.text }]}>+{selectedCount - 6}</Text>
                  </TouchableOpacity>
                )}
              </View>
            )}
          </Card>

          <Card style={{ marginBottom: spacing.lg }}>
            <Text style={[typography.h3, { color: colors.text, marginBottom: spacing.md }]}>
              Recent Exports
            </Text>
            <View style={styles.recentExports}>
              {Array.from({ length: 3 }).map((_, i) => (
                <TouchableOpacity
                  key={i}
                  onPress={() => {
                    triggerHaptic();
                    navigation.navigate('ExportSettings');
                  }}
                  style={[styles.recentExportItem, { backgroundColor: colors.surface }]}
                >
                  <Text style={{ fontSize: 24 }}>📤</Text>
                  <Text style={[typography.caption, { color: colors.textSecondary }]}>
                    {i + 1 > 1 ? `${i + 1} photos` : '1 photo'}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </Card>

          <Card style={{ marginBottom: spacing.lg }}>
            <Text style={[typography.h3, { color: colors.text, marginBottom: spacing.md }]}>
              Batch Export
            </Text>
            <Text style={[typography.body, { color: colors.textSecondary, marginBottom: spacing.md }]}>
              Select multiple photos for batch processing
            </Text>
            <Button
              title="Batch Export"
              onPress={() => {
                triggerHaptic();
                navigation.navigate('BatchExport');
              }}
              variant="outline"
              icon={<Text style={{ fontSize: 18 }}>📚</Text>}
            />
          </Card>

          {selectedCount > 0 && (
            <Button
              title="Continue to Export"
              onPress={handleExport}
              variant="primary"
              size="large"
              icon={<Text style={{ fontSize: 20 }}>📤</Text>}
            />
          )}
        </ScrollView>

        {showPhotoSelector && (
          <View style={[styles.photoSelectorModal, { backgroundColor: colors.surface }]}>
            <View style={[styles.modalHeader, { borderBottomColor: colors.border }]}>
              <Text style={[typography.h3, { color: colors.text }]}>Select Photos</Text>
              <TouchableOpacity onPress={() => setShowPhotoSelector(false)}>
                <Icon name="close" size={24} color={colors.text} />
              </TouchableOpacity>
            </View>
            <FlatList
              data={recentPhotos}
              numColumns={4}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => handleTogglePhoto(item.id)}
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
            <View style={{ padding: spacing.md }}>
              <Button
                title={`Select (${selectedCount})`}
                onPress={() => setShowPhotoSelector(false)}
                variant="primary"
              />
            </View>
          </View>
        )}

        <FloatingAIButton onPress={() => {}} />
      </GradientBackground>
    </View>
  );
};

// ============ EXPORT SETTINGS SCREEN (Level 2) ============
export const ExportSettingsScreen: React.FC = ({ route, navigation }: any) => {
  const { photoIds } = route.params || {};
  const { colors, spacing, borderRadius, typography } = useTheme();
  const { triggerHaptic } = useApp();

  const [quality, setQuality] = useState(90);
  const [format, setFormat] = useState<'jpeg' | 'png' | 'webp'>('jpeg');
  const [resizeMode, setResizeMode] = useState<'original' | '1080p' | '720p' | 'custom'>('original');
  const [customWidth, setCustomWidth] = useState(1920);
  const [customHeight, setCustomHeight] = useState(1080);
  const [includeMetadata, setIncludeMetadata] = useState(true);

  const handleContinue = async () => {
    await triggerHaptic();
    navigation.navigate('ExportShare');
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <GradientBackground>
        <Header
          title="Export Settings"
          leftIcon="close"
          onLeftPress={() => navigation.goBack()}
        />

        <ScrollView contentContainerStyle={{ padding: spacing.lg }}>
          <Text style={[typography.h3, { color: colors.text, marginBottom: spacing.md }]}>
            Quality
          </Text>
          <Card style={{ marginBottom: spacing.lg }}>
            <View style={styles.qualityGrid}>
              {exportQualities.map((q) => (
                <TouchableOpacity
                  key={q.id}
                  onPress={() => {
                    triggerHaptic();
                    setQuality(q.id);
                  }}
                  style={[
                    styles.qualityOption,
                    {
                      backgroundColor: quality === q.id ? colors.primary : colors.card,
                    },
                  ]}
                >
                  <Text style={[typography.h3, { color: quality === q.id ? '#FFFFFF' : colors.text }]}>
                    {q.percentage}%
                  </Text>
                  <Text style={[typography.caption, { color: quality === q.id ? '#FFFFFF' : colors.textSecondary }]}>
                    {q.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </Card>

          <Text style={[typography.h3, { color: colors.text, marginBottom: spacing.md }]}>
            Format
          </Text>
          <Card style={{ marginBottom: spacing.lg }}>
            <View style={styles.formatGrid}>
              {exportFormats.map((f) => (
                <TouchableOpacity
                  key={f.id}
                  onPress={() => {
                    triggerHaptic();
                    setFormat(f.id as any);
                  }}
                  style={[
                    styles.formatOption,
                    {
                      backgroundColor: format === f.id ? colors.primary : colors.card,
                    },
                  ]}
                >
                  <Text style={[typography.body, { color: format === f.id ? '#FFFFFF' : colors.text }]}>
                    {f.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </Card>

          <Text style={[typography.h3, { color: colors.text, marginBottom: spacing.md }]}>
            Resize
          </Text>
          <Card style={{ marginBottom: spacing.lg }}>
            <View style={styles.resizeGrid}>
              {['original', '1080p', '720p', 'custom'].map((mode) => (
                <TouchableOpacity
                  key={mode}
                  onPress={() => {
                    triggerHaptic();
                    setResizeMode(mode as any);
                  }}
                  style={[
                    styles.resizeOption,
                    {
                      backgroundColor: resizeMode === mode ? colors.primary : colors.card,
                    },
                  ]}
                >
                  <Text style={[typography.body, { color: resizeMode === mode ? '#FFFFFF' : colors.text }]}>
                    {mode === 'original' ? 'Original' : mode === '1080p' ? '1080p' : mode === '720p' ? '720p' : 'Custom'}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </Card>

          {resizeMode === 'custom' && (
            <Card style={{ marginBottom: spacing.lg }}>
              <Text style={[typography.body, { color: colors.text, marginBottom: spacing.sm }]}>
                Custom Dimensions
              </Text>
              <View style={styles.customDims}>
                <View style={[styles.dimInput, { backgroundColor: colors.surface, borderColor: colors.border }]}>
                  <Text style={[typography.caption, { color: colors.textSecondary }]}>Width</Text>
                  <Text style={[typography.body, { color: colors.text }]}>{customWidth}</Text>
                </View>
                <Text style={[typography.body, { color: colors.textSecondary }]}>×</Text>
                <View style={[styles.dimInput, { backgroundColor: colors.surface, borderColor: colors.border }]}>
                  <Text style={[typography.caption, { color: colors.textSecondary }]}>Height</Text>
                  <Text style={[typography.body, { color: colors.text }]}>{customHeight}</Text>
                </View>
              </View>
            </Card>
          )}

          <Card style={{ marginBottom: spacing.lg }}>
            <View style={styles.metadataRow}>
              <Text style={[typography.body, { color: colors.text, flex: 1 }]}>
                Include Metadata
              </Text>
              <TouchableOpacity
                onPress={() => {
                  triggerHaptic();
                  setIncludeMetadata(!includeMetadata);
                }}
                style={[
                  styles.toggle,
                  { backgroundColor: includeMetadata ? colors.primary : colors.border },
                ]}
              >
                <View style={[styles.toggleDot, { backgroundColor: '#FFFFFF', marginLeft: includeMetadata ? 20 : 0 }]} />
              </TouchableOpacity>
            </View>
          </Card>

          <Button
            title="Continue to Share"
            onPress={handleContinue}
            variant="primary"
            size="large"
            icon={<Text style={{ fontSize: 20 }}>📤</Text>}
          />
        </ScrollView>
      </GradientBackground>
    </View>
  );
};

// ============ EXPORT SHARE SCREEN (Level 3) ============
export const ExportShareScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const { colors, spacing, borderRadius, typography } = useTheme();
  const { triggerHaptic } = useApp();

  const [isExporting, setIsExporting] = useState(false);

  const handleShare = async (destination: ShareDestination) => {
    await triggerHaptic();
    if (destination.id === 'save') {
      setIsExporting(true);
      await simulateLoading(2000);
      setIsExporting(false);
      return;
    }
    
    try {
      await Share.share({
        message: 'Check out this photo!',
      });
    } catch (error) {
      console.error('Share error:', error);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <GradientBackground>
        <Header
          title="Share"
          leftIcon="close"
          onLeftPress={() => navigation.goBack()}
        />

        <View style={[styles.exportPreview, { backgroundColor: colors.card }]}>
          <Text style={{ fontSize: 100 }}>📷</Text>
          <Text style={[typography.caption, { color: colors.textSecondary, marginTop: spacing.sm }]}>
            Ready to export
          </Text>
        </View>

        <View style={{ padding: spacing.lg }}>
          <Text style={[typography.h3, { color: colors.text, marginBottom: spacing.md }]}>
            Share To
          </Text>
          
          <View style={styles.shareGrid}>
            {shareDestinations.map((dest) => (
              <TouchableOpacity
                key={dest.id}
                onPress={() => handleShare(dest)}
                style={[styles.shareOption, { backgroundColor: colors.card }]}
                disabled={!dest.enabled}
              >
                <Text style={{ fontSize: 32 }}>
                  {dest.id === 'instagram' ? '📸' : dest.id === 'whatsapp' ? '💬' : dest.id === 'messages' ? '💭' : dest.id === 'email' ? '📧' : dest.id === 'airdrop' ? '📤' : '💾'}
                </Text>
                <Text style={[typography.caption, { color: colors.text, marginTop: spacing.xs }]}>
                  {dest.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <Card style={{ marginTop: spacing.lg, marginBottom: spacing.lg }}>
            <View style={styles.downloadRow}>
              <Text style={{ fontSize: 32 }}>💾</Text>
              <View style={{ flex: 1, marginLeft: spacing.md }}>
                <Text style={[typography.body, { color: colors.text }]}>Save to Device</Text>
                <Text style={[typography.caption, { color: colors.textSecondary }]}>
                  High quality (90%)
                </Text>
              </View>
              <Button
                title="Save"
                onPress={() => handleShare(shareDestinations.find(d => d.id === 'save')!)}
                variant="primary"
                loading={isExporting}
              />
            </View>
          </Card>

          <Button
            title="Copy to Clipboard"
            onPress={() => handleShare({ id: 'copy', name: 'Copy', icon: 'copy', enabled: false } as any)}
            variant="outline"
            icon={<Text style={{ fontSize: 18 }}>📋</Text>}
          />
        </View>
      </GradientBackground>
    </View>
  );
};

// ============ BATCH EXPORT SCREEN (Level 4) ============
export const BatchExportScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const { colors, spacing, borderRadius, typography } = useTheme();
  const { triggerHaptic } = useApp();

  const [selectedPhotos, setSelectedPhotos] = useState<string[]>([]);
  const [selectMode, setSelectMode] = useState<'all' | 'album' | 'date'>('all');

  const photos = mockPhotos.slice(0, 50);

  const handleTogglePhoto = async (photoId: string) => {
    await triggerHaptic();
    if (selectedPhotos.includes(photoId)) {
      setSelectedPhotos(prev => prev.filter(id => id !== photoId));
    } else {
      setSelectedPhotos(prev => [...prev, photoId]);
    }
  };

  const handleSelectAll = async () => {
    await triggerHaptic();
    if (selectMode === 'all') {
      setSelectedPhotos(photos.map(p => p.id));
    } else {
      setSelectedPhotos(photos.filter(p => p.albumId === 'album_1').map(p => p.id));
    }
  };

  const handleBatchExport = async () => {
    await triggerHaptic();
    await new Promise(resolve => setTimeout(resolve, 2000));
    navigation.goBack();
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <GradientBackground>
        <Header
          title="Batch Export"
          leftIcon="close"
          onLeftPress={() => navigation.goBack()}
          rightIcon="check"
          onRightPress={() => {
            triggerHaptic();
            navigation.goBack();
          }}
        />

        <View style={[styles.selectModeBar, { backgroundColor: colors.card, marginBottom: spacing.md }]}>
          {['all', 'album', 'date'].map((mode) => (
            <TouchableOpacity
              key={mode}
              onPress={() => {
                triggerHaptic();
                setSelectMode(mode as any);
              }}
              style={[
                styles.selectModeOption,
                {
                  backgroundColor: selectMode === mode ? colors.primary : 'transparent',
                },
              ]}
            >
              <Text style={[typography.body, { color: selectMode === mode ? '#FFFFFF' : colors.text }]}>
                {mode === 'all' ? 'All Photos' : mode === 'album' ? 'By Album' : 'By Date'}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Card style={[styles.selectionInfo, { marginBottom: spacing.md }]}>
          <View style={styles.infoRow}>
            <Text style={[typography.body, { color: colors.text }]}>
              {selectedPhotos.length} photos selected
            </Text>
            <Button
              title={selectMode === 'all' ? 'Select All' : 'Select Album'}
              onPress={handleSelectAll}
              variant="ghost"
              size="small"
            />
          </View>
        </Card>

        <FlatList
          data={photos}
          numColumns={5}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => handleTogglePhoto(item.id)}
              style={[
                styles.batchPhotoItem,
                {
                  backgroundColor: selectedPhotos.includes(item.id) ? colors.primary : colors.card,
                },
              ]}
            >
              <View style={[styles.batchThumb, { backgroundColor: colors.surface }]}>
                <Text style={{ fontSize: 12 }}>🖼️</Text>
                {selectedPhotos.includes(item.id) && (
                  <View style={[styles.selectedBadge, { backgroundColor: colors.success }]}>
                    <Text style={{ fontSize: 10, color: '#FFFFFF' }}>✓</Text>
                  </View>
                )}
              </View>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ padding: spacing.md }}
        />

        {selectedPhotos.length > 0 && (
          <View style={[styles.batchFooter, { backgroundColor: colors.surface }]}>
            <Button
              title={`Export ${selectedPhotos.length} Photos`}
              onPress={handleBatchExport}
              variant="primary"
              size="large"
              icon={<Text style={{ fontSize: 20 }}>⚡</Text>}
            />
          </View>
        )}
      </GradientBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  emptySelection: {
    padding: 30,
    alignItems: 'center',
  },
  selectedGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  selectedThumbnail: {
    width: 70,
    height: 70,
    borderRadius: 8,
    marginRight: 8,
    marginBottom: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  removeButton: {
    position: 'absolute',
    top: -4,
    right: -4,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  moreThumb: {
    width: 70,
    height: 70,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  recentExports: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  recentExportItem: {
    width: '30%',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  photoSelectorModal: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '60%',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  modalHeader: {
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
  qualityGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  qualityOption: {
    flex: 1,
    marginHorizontal: 4,
    padding: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  formatGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  formatOption: {
    flex: 1,
    marginHorizontal: 4,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  resizeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  resizeOption: {
    width: '48%',
    padding: 12,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 8,
  },
  customDims: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dimInput: {
    width: 100,
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
  },
  metadataRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  toggle: {
    width: 50,
    height: 30,
    borderRadius: 15,
    padding: 2,
  },
  toggleDot: {
    width: 26,
    height: 26,
    borderRadius: 13,
  },
  exportPreview: {
    height: 250,
    margin: 16,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  shareGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  shareOption: {
    width: '31%',
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
    marginBottom: 12,
  },
  downloadRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  selectModeBar: {
    flexDirection: 'row',
    borderRadius: 12,
    marginHorizontal: 16,
    marginTop: 16,
    padding: 4,
  },
  selectModeOption: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  selectionInfo: {
    marginHorizontal: 16,
    borderRadius: 12,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  batchPhotoItem: {
    width: '19%',
    margin: '0.5%',
    borderRadius: 8,
  },
  batchThumb: {
    height: 50,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedBadge: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 16,
    height: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  batchFooter: {
    padding: 16,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
});

export default {
  ExportHomeScreen,
  ExportSettingsScreen,
  ExportShareScreen,
  BatchExportScreen,
};