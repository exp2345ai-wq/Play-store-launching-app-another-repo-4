// =====================================================
// PHOTOLAB ULTRA PRO MAX - CAMERA TAB
// Level 1: Viewfinder Screen
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
  TextInput,
  Modal,
  Pressable,
  FlatList,
  RefreshControl,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import * as Haptics from 'expo-haptics';
import BottomSheet, { BottomSheetBackdrop, BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../../contexts/ThemeContext';
import { useApp } from '../../contexts/AppContext';
import { Icon, Card, Button, Slider, Header, GradientBackground, BottomSheetModal, Skeleton } from '../../components/UI';
import { FloatingAIButton } from '../../components/AIAssistant';
import { CameraSettings, CaptureMode, ResolutionOption, AspectRatio } from '../../types';
import { defaultCameraSettings, captureModes, resolutions, aspectRatios } from '../../utils/mockData';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// ============ CAMERA VIEWFINDER SCREEN (Level 1) ============
export const CameraViewfinderScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const { colors, spacing, borderRadius, typography } = useTheme();
  const { triggerHaptic } = useApp();
  
  const [cameraSettings, setCameraSettings] = useState<CameraSettings>(defaultCameraSettings);
  const [captureMode, setCaptureMode] = useState<CaptureMode>('photo');
  const [isCapturing, setIsCapturing] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showMode, setShowMode] = useState(false);
  const [showTimer, setShowTimer] = useState(false);
  const [timerCount, setTimerCount] = useState(0);
  const [flashOn, setFlashOn] = useState(false);
  const [gridOn, setGridOn] = useState(false);
  const [hdrOn, setHdrOn] = useState(false);
  const bottomSheetRef = useRef<BottomSheet>(null);

  const captureScale = useRef(new Animated.Value(1)).current;

  const handleCapture = async () => {
    await triggerHaptic(Haptics.ImpactFeedbackStyle.Heavy);
    
    if (timerCount > 0) {
      for (let i = timerCount; i > 0; i--) {
        setTimerCount(i);
        await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }
    
    setIsCapturing(true);
    Animated.sequence([
      Animated.timing(captureScale, {
        toValue: 0.8,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(captureScale, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();

    await new Promise(resolve => setTimeout(resolve, 500));
    setIsCapturing(false);
    
    navigation.navigate('CameraPreview');
  };

  const handleFlashToggle = async () => {
    await triggerHaptic();
    const newFlash = flashOn ? 'off' : 'on';
    setCameraSettings(prev => ({ ...prev, flash: newFlash as any }));
    setFlashOn(!flashOn);
  };

  const handleGridToggle = async () => {
    await triggerHaptic();
    setGridOn(!gridOn);
    setCameraSettings(prev => ({ ...prev, gridLines: !gridOn }));
  };

  const handleHDRToggle = async () => {
    await triggerHaptic();
    setHdrOn(!hdrOn);
    setCameraSettings(prev => ({ ...prev, hdr: !hdrOn }));
  };

  const handleOpenSettings = async () => {
    await triggerHaptic();
    setShowSettings(true);
    bottomSheetRef.current?.expand();
  };

  const handleOpenMode = async () => {
    await triggerHaptic();
    setShowMode(true);
    navigation.navigate('CameraModeSelect');
  };

  const handleProMode = async () => {
    await triggerHaptic();
    navigation.navigate('CameraProSettings');
  };

  const modes = captureModes.filter(m => m.id !== 'pro');
  const currentMode = captureModes.find(m => m.id === captureMode);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <GradientBackground>
        {/* Header Controls */}
        <View style={[styles.topControls, { paddingTop: spacing.xl + 20 }]}>
          <TouchableOpacity
            onPress={handleFlashToggle}
            style={[styles.controlButton, { backgroundColor: flashOn ? colors.primary : colors.card }]}
          >
            <Icon name="flash" size={24} color={flashOn ? '#FFFFFF' : colors.text} />
            <Text style={[typography.caption, { color: colors.text }]}>⚡</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            onPress={handleGridToggle}
            style={[styles.controlButton, { backgroundColor: gridOn ? colors.primary : colors.card }]}
          >
            <Icon name="grid" size={24} color={gridOn ? '#FFFFFF' : colors.text} />
          </TouchableOpacity>
          
          <TouchableOpacity
            onPress={() => setTimerCount(timerCount === 10 ? 0 : 10)}
            style={[styles.controlButton, { backgroundColor: timerCount > 0 ? colors.primary : colors.card }]}
          >
            <Icon name="timer" size={24} color={timerCount > 0 ? '#FFFFFF' : colors.text} />
            {timerCount > 0 && (
              <Text style={[typography.caption, { color: '#FFFFFF', position: 'absolute', top: -8, right: -8 }]}>
                {timerCount}
              </Text>
            )}
          </TouchableOpacity>
          
          <TouchableOpacity
            onPress={handleHDRToggle}
            style={[styles.controlButton, { backgroundColor: hdrOn ? colors.primary : colors.card }]}
          >
            <Icon name="hdr" size={24} color={hdrOn ? '#FFFFFF' : colors.text} />
          </TouchableOpacity>
        </View>

        {/* Grid Overlay */}
        {gridOn && (
          <View style={styles.gridOverlay}>
            <View style={[styles.gridLine, styles.gridVertical, { left: '33%' }]} />
            <View style={[styles.gridLine, styles.gridVertical, { left: '66%' }]} />
            <View style={[styles.gridLine, { top: '33%' }]} />
            <View style={[styles.gridLine, { top: '66%' }]} />
          </View>
        )}

        {/* Mode Bar */}
        <View style={[styles.modeBar, { bottom: 180 }]}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <TouchableOpacity onPress={handleOpenMode} style={[styles.modeButton, { backgroundColor: colors.card }]}>
              <Text style={{ fontSize: 28 }}>{currentMode?.icon === 'camera' ? '📷' : currentMode?.icon === 'video' ? '🎥' : currentMode?.icon === 'person' ? '👤' : '🌙'}</Text>
              <Text style={[typography.caption, { color: colors.text, marginTop: spacing.xs }]}>
                {currentMode?.name || 'Photo'}
              </Text>
            </TouchableOpacity>
            
            {captureModes.map((mode) => (
              <TouchableOpacity
                key={mode.id}
                onPress={() => setCaptureMode(mode.id)}
                style={[
                  styles.modeItem,
                  { backgroundColor: captureMode === mode.id ? colors.primary : colors.card },
                ]}
              >
                <Text style={{ fontSize: mode.id === captureMode ? 26 : 20 }}>
                  {mode.icon === 'camera' ? '📷' : mode.icon === 'video' ? '🎥' : mode.icon === 'person' ? '👤' : mode.icon === 'moon' ? '🌙' : mode.icon === 'settings' ? '⚙️' : mode.icon === 'panorama' ? '🌅' : '⏱️'}
                </Text>
              </TouchableOpacity>
            ))}
            
            {captureMode === 'pro' && (
              <TouchableOpacity
                onPress={handleProMode}
                style={[styles.proButton, { backgroundColor: colors.accent }]}
              >
                <Text style={[typography.button, { color: '#FFFFFF' }]}>PRO</Text>
              </TouchableOpacity>
            )}
          </ScrollView>
        </View>

        {/* Bottom Controls */}
        <View style={[styles.bottomControls, { paddingBottom: spacing.xxl }]}>
          <TouchableOpacity
            onPress={handleOpenSettings}
            style={[styles.settingsButton, { backgroundColor: colors.card }]}
          >
            <Icon name="settings" size={24} color={colors.text} />
          </TouchableOpacity>
          
          <Animated.View style={{ transform: [{ scale: captureScale }] }}>
            <TouchableOpacity
              onPress={handleCapture}
              disabled={isCapturing}
              style={[styles.captureButton, { borderColor: colors.primary }]}
            >
              <LinearGradient
                colors={isCapturing ? ['#FF4444', '#FF6666'] : [colors.primary, colors.secondary]}
                style={styles.captureGradient}
              >
                <View style={[styles.captureInner, { backgroundColor: isCapturing ? '#FF4444' : '#FFFFFF' }]} />
              </LinearGradient>
            </TouchableOpacity>
          </Animated.View>
          
          <TouchableOpacity
            onPress={() => navigation.navigate('Gallery')}
            style={[styles.galleryButton, { backgroundColor: colors.card }]}
          >
            <Text style={{ fontSize: 28 }}>🖼️</Text>
          </TouchableOpacity>
        </View>
      </GradientBackground>

      {/* Settings Sheet */}
      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        snapPoints={['50%']}
        enablePanDownToClose
        onClose={() => setShowSettings(false)}
        backgroundStyle={{ backgroundColor: colors.surface }}
        handleIndicatorStyle={{ backgroundColor: colors.border }}
      >
        <BottomSheetScrollView contentContainerStyle={{ padding: spacing.lg }}>
          <Text style={[typography.h3, { color: colors.text, marginBottom: spacing.lg }]}>
            Camera Settings
          </Text>
          
          <Card style={{ marginBottom: spacing.md }}>
            <Text style={[typography.body, { color: colors.text, marginBottom: spacing.sm }]}>
              Resolution: {cameraSettings.resolution}
            </Text>
            <View style={styles.optionRow}>
              {resolutions.map((res) => (
                <TouchableOpacity
                  key={res.id}
                  onPress={() => {
                    triggerHaptic();
                    setCameraSettings(prev => ({ ...prev, resolution: res.id as ResolutionOption }));
                  }}
                  style={[
                    styles.optionButton,
                    {
                      backgroundColor: cameraSettings.resolution === res.id ? colors.primary : colors.card,
                    },
                  ]}
                >
                  <Text style={[typography.caption, { color: cameraSettings.resolution === res.id ? '#FFFFFF' : colors.text }]}>
                    {res.id}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </Card>

          <Card style={{ marginBottom: spacing.md }}>
            <Text style={[typography.body, { color: colors.text, marginBottom: spacing.sm }]}>
              Aspect Ratio: {cameraSettings.aspectRatio}
            </Text>
            <View style={styles.optionRow}>
              {aspectRatios.map((ratio) => (
                <TouchableOpacity
                  key={ratio.id}
                  onPress={() => {
                    triggerHaptic();
                    setCameraSettings(prev => ({ ...prev, aspectRatio: ratio.ratio as AspectRatio }));
                  }}
                  style={[
                    styles.optionButton,
                    {
                      backgroundColor: cameraSettings.aspectRatio === ratio.ratio ? colors.primary : colors.card,
                    },
                  ]}
                >
                  <Text style={[typography.caption, { color: cameraSettings.aspectRatio === ratio.ratio ? '#FFFFFF' : colors.text }]}>
                    {ratio.ratio}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </Card>

          <Card>
            <View style={styles.settingRow}>
              <Text style={[typography.body, { color: colors.text }]}>Stabilization</Text>
              <TouchableOpacity
                onPress={() => {
                  triggerHaptic();
                  setCameraSettings(prev => ({ ...prev, stabilization: !prev.stabilization }));
                }}
                style={[
                  styles.toggle,
                  { backgroundColor: cameraSettings.stabilization ? colors.primary : colors.border },
                ]}
              >
                <View style={[styles.toggleDot, { backgroundColor: '#FFFFFF', marginLeft: cameraSettings.stabilization ? 20 : 0 }]} />
              </TouchableOpacity>
            </View>
          </Card>
        </BottomSheetScrollView>
      </BottomSheet>

      <FloatingAIButton onPress={() => {}} />
    </View>
  );
};

// ============ CAMERA SETTINGS SCREEN (Level 2) - Opens from Settings button ============
export const CameraSettingsScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const { colors, spacing, borderRadius, typography } = useTheme();
  const { triggerHaptic } = useApp();
  
  const [cameraSettings, setCameraSettings] = useState<CameraSettings>(defaultCameraSettings);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Header 
        title="Camera Settings" 
        leftIcon="close"
        onLeftPress={() => navigation.goBack()}
      />
      
      <ScrollView contentContainerStyle={{ padding: spacing.lg }}>
        <Card style={{ marginBottom: spacing.lg }}>
          <Text style={[typography.h3, { color: colors.text, marginBottom: spacing.md }]}>
            Resolution
          </Text>
          <View style={styles.optionRow}>
            {resolutions.map((res) => (
              <TouchableOpacity
                key={res.id}
                onPress={() => {
                  triggerHaptic();
                  setCameraSettings(prev => ({ ...prev, resolution: res.id as ResolutionOption }));
                }}
                style={[
                  styles.optionButton,
                  {
                    backgroundColor: cameraSettings.resolution === res.id ? colors.primary : colors.card,
                    flex: 1,
                    marginHorizontal: 4,
                  },
                ]}
              >
                <Text style={[typography.body, { color: cameraSettings.resolution === res.id ? '#FFFFFF' : colors.text }]}>
                  {res.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </Card>

        <Card style={{ marginBottom: spacing.lg }}>
          <Text style={[typography.h3, { color: colors.text, marginBottom: spacing.md }]}>
            Aspect Ratio
          </Text>
          <View style={styles.optionRow}>
            {aspectRatios.map((ratio) => (
              <TouchableOpacity
                key={ratio.id}
                onPress={() => {
                  triggerHaptic();
                  setCameraSettings(prev => ({ ...prev, aspectRatio: ratio.ratio as AspectRatio }));
                }}
                style={[
                  styles.optionButton,
                  {
                    backgroundColor: cameraSettings.aspectRatio === ratio.ratio ? colors.primary : colors.card,
                  },
                ]}
              >
                <Text style={[typography.body, { color: cameraSettings.aspectRatio === ratio.ratio ? '#FFFFFF' : colors.text }]}>
                  {ratio.name}
                </Text>
                <Text style={[typography.caption, { color: colors.textSecondary }]}>
                  ({ratio.ratio})
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </Card>

        <Card style={{ marginBottom: spacing.lg }}>
          <Text style={[typography.h3, { color: colors.text, marginBottom: spacing.md }]}>
            Video Stabilization
          </Text>
          <TouchableOpacity
            onPress={() => {
              triggerHaptic();
              setCameraSettings(prev => ({ ...prev, stabilization: !prev.stabilization }));
            }}
            style={[
              styles.toggleRow,
              { backgroundColor: cameraSettings.stabilization ? colors.primary : colors.card },
            ]}
          >
            <Text style={[typography.body, { color: colors.text }]}>
              Enable Video Stabilization
            </Text>
            <View style={[styles.toggle, { backgroundColor: cameraSettings.stabilization ? colors.success : colors.border }]}>
              <View style={[styles.toggleDot, { backgroundColor: '#FFFFFF', marginLeft: cameraSettings.stabilization ? 20 : 0 }]} />
            </View>
          </TouchableOpacity>
        </Card>

        <Button
          title="Advanced Pro Settings"
          onPress={() => navigation.navigate('CameraProSettings')}
          variant="outline"
          icon={<Text style={{ fontSize: 18 }}>⚙️</Text>}
        />
      </ScrollView>
    </View>
  );
};

// ============ CAMERA MODE SELECT SCREEN (Level 2) ============
export const CameraModeSelectScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const { colors, spacing, borderRadius, typography } = useTheme();
  const { triggerHaptic } = useApp();
  
  const [captureMode, setCaptureMode] = useState<CaptureMode>('photo');

  const handleSelectMode = async (mode: CaptureMode) => {
    await triggerHaptic();
    setCaptureMode(mode);
    if (mode === 'pro') {
      navigation.navigate('CameraProSettings');
    } else {
      navigation.goBack();
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Header 
        title="Capture Mode" 
        leftIcon="close"
        onLeftPress={() => navigation.goBack()}
      />
      
      <ScrollView contentContainerStyle={{ padding: spacing.lg }}>
        {captureModes.map((mode, index) => (
          <TouchableOpacity
            key={mode.id}
            onPress={() => handleSelectMode(mode.id)}
            style={[styles.modeCard, { backgroundColor: colors.card, marginBottom: spacing.md }]}
          >
            <View style={[styles.modeIconContainer, { backgroundColor: captureMode === mode.id ? colors.primary : colors.surface }]}>
              <Text style={{ fontSize: 32 }}>
                {mode.icon === 'camera' ? '📷' : mode.icon === 'video' ? '🎥' : mode.icon === 'person' ? '👤' : mode.icon === 'moon' ? '🌙' : mode.icon === 'settings' ? '⚙️' : mode.icon === 'panorama' ? '🌅' : '⏱️'}
              </Text>
            </View>
            <View style={styles.modeInfo}>
              <Text style={[typography.h3, { color: colors.text }]}>{mode.name}</Text>
              <Text style={[typography.caption, { color: colors.textSecondary }]}>
                {mode.id === 'photo' && 'Standard photo capture mode'}
                {mode.id === 'video' && 'Record high quality video'}
                {mode.id === 'portrait' && 'Portrait with bokeh effect'}
                {mode.id === 'night' && 'Low light enhancement'}
                {mode.id === 'pro' && 'Full manual control →'}
                {mode.id === 'panorama' && 'Wide angle panorama'}
                {mode.id === 'slow_motion' && '120fps slow motion'}
              </Text>
            </View>
            {captureMode === mode.id && (
              <View style={[styles.checkmark, { backgroundColor: colors.primary }]}>
                <Text style={{ color: '#FFFFFF' }}>✓</Text>
              </View>
            )}
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

// ============ CAMERA PRO SETTINGS SCREEN (Level 3/4) ============
export const CameraProSettingsScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const { colors, spacing, borderRadius, typography } = useTheme();
  const { triggerHaptic } = useApp();
  
  const [settings, setSettings] = useState<CameraSettings>(defaultCameraSettings);
  const [showISO, setShowISO] = useState(false);
  const [showShutter, setShowShutter] = useState(false);
  const [showWB, setShowWB] = useState(false);
  const [showFocus, setShowFocus] = useState(false);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <GradientBackground>
        <Header 
          title="Pro Mode" 
          leftIcon="close"
          onLeftPress={() => navigation.goBack()}
        />

        <ScrollView contentContainerStyle={{ padding: spacing.lg }}>
          <View style={[styles.proHeader, { backgroundColor: colors.glass }]}>
            <Text style={[typography.h1, { color: colors.text }]}>PRO</Text>
            <Text style={[typography.caption, { color: colors.primary }]}>Full Manual Control</Text>
          </View>

          <Text style={[typography.h3, { color: colors.text, marginTop: spacing.xl }]}>
            ISO: {settings.iso}
          </Text>
          <Card style={{ marginBottom: spacing.lg }}>
            <View style={styles.sliderContainer}>
              <Text style={[typography.caption, { color: colors.textSecondary }]}>Min: 100</Text>
              <Slider
                value={settings.iso}
                min={100}
                max={3200}
                onValueChange={(val) => {
                  triggerHaptic();
                  setSettings(prev => ({ ...prev, iso: val }));
                }}
              />
              <Text style={[typography.caption, { color: colors.textSecondary }]}>Max: 3200</Text>
            </View>
          </Card>

          <Text style={[typography.h3, { color: colors.text }]}>
            Shutter Speed: 1/{settings.shutterSpeed}
          </Text>
          <Card style={{ marginBottom: spacing.lg }}>
            <View style={styles.sliderContainer}>
              <Text style={[typography.caption, { color: colors.textSecondary }]}>1/4000</Text>
              <Slider
                value={settings.shutterSpeed}
                min={1}
                max={1000}
                onValueChange={(val) => {
                  triggerHaptic();
                  setSettings(prev => ({ ...prev, shutterSpeed: val }));
                }}
              />
              <Text style={[typography.caption, { color: colors.textSecondary }]}>1/1</Text>
            </View>
          </Card>

          <Text style={[typography.h3, { color: colors.text }]}>
            White Balance: {settings.whiteBalance}K
          </Text>
          <Card style={{ marginBottom: spacing.lg }}>
            <View style={styles.optionRow}>
              {['2500', '4000', '5500', '6500', '7500'].map((wb) => (
                <TouchableOpacity
                  key={wb}
                  onPress={() => {
                    triggerHaptic();
                    setSettings(prev => ({ ...prev, whiteBalance: parseInt(wb) }));
                  }}
                  style={[
                    styles.wbButton,
                    {
                      backgroundColor: settings.whiteBalance === parseInt(wb) ? colors.primary : colors.card,
                    },
                  ]}
                >
                  <Text style={[typography.caption, { color: settings.whiteBalance === parseInt(wb) ? '#FFFFFF' : colors.text }]}>
                    {wb}K
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </Card>

          <Text style={[typography.h3, { color: colors.text }]}>
            Focus Mode
          </Text>
          <Card style={{ marginBottom: spacing.lg }}>
            <View style={styles.optionRow}>
              {['auto', 'manual', 'continuous'].map((fm) => (
                <TouchableOpacity
                  key={fm}
                  onPress={() => {
                    triggerHaptic();
                    setSettings(prev => ({ ...prev, focusMode: fm as any }));
                  }}
                  style={[
                    styles.focusButton,
                    {
                      backgroundColor: settings.focusMode === fm ? colors.primary : colors.card,
                    },
                  ]}
                >
                  <Text style={[typography.body, { color: settings.focusMode === fm ? '#FFFFFF' : colors.text }]}>
                    {fm.charAt(0).toUpperCase() + fm.slice(1)}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </Card>

          <Button
            title="Capture Photo"
            onPress={() => navigation.navigate('CameraPreview')}
            variant="primary"
            size="large"
            icon={<Text style={{ fontSize: 20 }}>📷</Text>}
            style={{ marginTop: spacing.lg }}
          />

          <View style={styles.proTips}>
            <Text style={[typography.h3, { color: colors.text }]}>💡 Pro Tips</Text>
            <Text style={[typography.body, { color: colors.textSecondary, marginTop: spacing.sm }]}>
              • Lower ISO for cleaner images in bright light{'\n'}
              • Faster shutter freezes motion{'\n'}
              • Manual WB corrects color casts{'\n'}
              • Use AF-C for moving subjects
            </Text>
          </View>
        </ScrollView>
      </GradientBackground>
      
      <FloatingAIButton onPress={() => {}} />
    </View>
  );
};

// ============ CAMERA PREVIEW SCREEN (Level 5) ============
export const CameraPreviewScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const { colors, spacing, borderRadius, typography } = useTheme();
  const { triggerHaptic } = useApp();
  
  const [photoUri, setPhotoUri] = useState<string>('');

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <GradientBackground>
        <View style={[styles.previewContainer, { backgroundColor: colors.card }]}>
          <Text style={{ fontSize: 120 }}>📷</Text>
        </View>

        <View style={[styles.previewActions, { paddingBottom: spacing.xxl }]}>
          <View style={styles.actionRow}>
            <TouchableOpacity
              onPress={() => {
                triggerHaptic();
                navigation.goBack();
              }}
              style={[styles.actionButton, { backgroundColor: colors.error }]}
            >
              <Text style={{ fontSize: 28 }}>🗑️</Text>
              <Text style={[typography.caption, { color: '#FFFFFF' }]}>Delete</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              onPress={() => {
                triggerHaptic();
                navigation.navigate('EditorWorkplace');
              }}
              style={[styles.actionButton, { backgroundColor: colors.primary }]}
            >
              <Text style={{ fontSize: 28 }}>✏️</Text>
              <Text style={[typography.caption, { color: '#FFFFFF' }]}>file_editor</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              onPress={() => {
                triggerHaptic();
                navigation.navigate('Export');
              }}
              style={[styles.actionButton, { backgroundColor: colors.success }]}
            >
              <Text style={{ fontSize: 28 }}>📤</Text>
              <Text style={[typography.caption, { color: '#FFFFFF' }]}>Share</Text>
            </TouchableOpacity>
          </View>
        </View>
      </GradientBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topControls: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    zIndex: 10,
    paddingTop: 60,
  },
  controlButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  gridOverlay: {
    ...StyleSheet.absoluteFillObject,
    top: 100,
    bottom: 200,
  },
  gridLine: {
    position: 'absolute',
    backgroundColor: 'rgba(255,255,255,0.3)',
  },
  gridVertical: {
    width: 1,
    top: 0,
    bottom: 0,
  },
  modeBar: {
    position: 'absolute',
    left: 0,
    right: 0,
    paddingHorizontal: 16,
  },
  modeButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  modeItem: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 4,
  },
  proButton: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomControls: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingBottom: 40,
  },
  settingsButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  captureButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  captureGradient: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  captureInner: {
    width: 56,
    height: 56,
    borderRadius: 28,
  },
  galleryButton: {
    width: 56,
    height: 56,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  optionRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  optionButton: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 8,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
  modeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 16,
  },
  modeIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modeInfo: {
    flex: 1,
    marginLeft: 16,
  },
  checkmark: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sliderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  wbButton: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  focusButton: {
    flex: 1,
    paddingVertical: 12,
    marginHorizontal: 4,
    borderRadius: 12,
    alignItems: 'center',
  },
  proHeader: {
    padding: 24,
    borderRadius: 16,
    alignItems: 'center',
  },
  proTips: {
    padding: 20,
    marginTop: 30,
    borderRadius: 16,
    backgroundColor: 'rgba(99, 102, 241, 0.1)',
  },
  previewContainer: {
    flex: 1,
    margin: 20,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  previewActions: {
    paddingHorizontal: 20,
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  actionButton: {
    width: 100,
    height: 80,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default {
  CameraViewfinderScreen,
  CameraSettingsScreen,
  CameraModeSelectScreen,
  CameraProSettingsScreen,
  CameraPreviewScreen,
};