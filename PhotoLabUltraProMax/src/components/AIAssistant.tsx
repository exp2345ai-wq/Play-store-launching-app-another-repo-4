// PhotoLab Ultra Pro Max - AI Assistant Component
// Floating AI assistant bottom sheet that appears on every screen

import React, { useState, useCallback, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Animated,
  Pressable,
} from 'react-native';
import { BlurView } from 'expo-blur';
import * as Haptics from 'expo-haptics';
import BottomSheet, { BottomSheetBackdrop, BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { useTheme } from '../contexts/ThemeContext';
import { useApp } from '../contexts/AppContext';
import { AIChatMessage } from '../types';
import { Icon } from './UI';

interface AIAssistantProps {
  visible: boolean;
  onClose: () => void;
}

export const AIAssistant: React.FC<AIAssistantProps> = ({ visible, onClose }) => {
  const { colors, spacing, borderRadius, typography } = useTheme();
  const { aiMessages, sendAIMessage, clearAIMessages, settings } = useApp();
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const bottomSheetRef = useRef<BottomSheet>(null);
  const slideAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      bottomSheetRef.current?.expand();
      Animated.spring(slideAnim, {
        toValue: 1,
        useNativeDriver: true,
        damping: 15,
        stiffness: 200,
      }).start();
    } else {
      bottomSheetRef.current?.close();
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }
  }, [visible, slideAnim]);

  const handleSend = useCallback(async () => {
    if (!inputText.trim() || isLoading || !settings.aiAssistantEnabled) return;

    const message = inputText.trim();
    setInputText('');
    setIsLoading(true);
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

    try {
      await sendAIMessage(message);
    } catch (error) {
      console.error('Error sending AI message:', error);
    } finally {
      setIsLoading(false);
    }
  }, [inputText, isLoading, settings.aiAssistantEnabled, sendAIMessage]);

  const handleQuickAction = useCallback(async (action: string) => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setIsLoading(true);
    try {
      await sendAIMessage(action);
    } catch (error) {
      console.error('Error sending AI message:', error);
    } finally {
      setIsLoading(false);
    }
  }, [sendAIMessage]);

  const handleClear = useCallback(async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    clearAIMessages();
  }, [clearAIMessages]);

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        pressBehavior="close"
      />
    ),
    []
  );

  const quickActions = [
    { label: 'Enhance', icon: '✨', message: 'Enhance this image with AI improvements' },
    { label: 'Remove BG', icon: '🎯', message: 'Remove the background from this image' },
    { label: 'Filter', icon: '🎨', message: 'Suggest a filter for this photo' },
    { label: 'Fix Light', icon: '☀️', message: 'Fix the lighting in this image' },
  ];

  const renderMessage = ({ item }: { item: AIChatMessage }) => {
    const isUser = item.role === 'user';

    return (
      <View
        style={[
          styles.messageBubble,
          {
            backgroundColor: isUser ? colors.primary : colors.card,
            alignSelf: isUser ? 'flex-end' : 'flex-start',
            marginLeft: isUser ? spacing.xl : spacing.md,
            marginRight: isUser ? spacing.md : spacing.xl,
          },
        ]}
      >
        <Text
          style={[
            typography.body,
            { color: isUser ? '#FFFFFF' : colors.text },
          ]}
        >
          {item.content}
        </Text>
        <Text
          style={[
            styles.timestamp,
            { color: isUser ? 'rgba(255,255,255,0.7)' : colors.textSecondary },
          ]}
        >
          {new Date(item.timestamp).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </Text>
      </View>
    );
  };

  if (!settings.aiAssistantEnabled) {
    return null;
  }

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={-1}
      snapPoints={['70%']}
      enablePanDownToClose
      backdropComponent={renderBackdrop}
      onClose={onClose}
      backgroundStyle={{ backgroundColor: colors.surface }}
      handleIndicatorStyle={{ backgroundColor: colors.border }}
    >
      <View style={[styles.container, { padding: spacing.md }]}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Text style={{ fontSize: 32 }}>🤖</Text>
            <View style={styles.headerText}>
              <Text style={[typography.h3, { color: colors.text }]}>
                AI Assistant
              </Text>
              <Text
                style={[
                  typography.caption,
                  { color: colors.success },
                ]}
              >
                ● Online
              </Text>
            </View>
          </View>
          <View style={styles.headerRight}>
            <TouchableOpacity
              onPress={handleClear}
              style={[styles.clearButton, { backgroundColor: colors.card }]}
            >
              <Icon name="trash" size={18} color={colors.textSecondary} />
            </TouchableOpacity>
          </View>
        </View>

        {aiMessages.length === 0 && (
          <View style={[styles.quickActions, { marginBottom: spacing.md }]}>
            <Text
              style={[
                typography.caption,
                { color: colors.textSecondary, marginBottom: spacing.sm },
              ]}
            >
              Quick Actions
            </Text>
            <View style={styles.quickActionsGrid}>
              {quickActions.map((action, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => handleQuickAction(action.message)}
                  style={[
                    styles.quickActionButton,
                    { backgroundColor: colors.card, borderRadius: borderRadius.md },
                  ]}
                  disabled={isLoading}
                >
                  <Text style={{ fontSize: 24 }}>{action.icon}</Text>
                  <Text
                    style={[
                      typography.caption,
                      { color: colors.text, marginTop: spacing.xs },
                    ]}
                  >
                    {action.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text
              style={[
                typography.body,
                {
                  color: colors.text,
                  marginTop: spacing.lg,
                  textAlign: 'center',
                },
              ]}
            >
              👋 Hi! I'm your AI photo assistant.
            </Text>
            <Text
              style={[
                typography.body,
                {
                  color: colors.textSecondary,
                  marginTop: spacing.sm,
                  textAlign: 'center',
                },
              ]}
            >
              Ask me anything about editing, enhancing, or creating amazing photos!
            </Text>
          </View>
        )}

        {/* Messages */}
        <FlatList
          data={aiMessages}
          renderItem={renderMessage}
          keyExtractor={(item) => item.id}
          style={styles.messagesList}
          showsVerticalScrollIndicator={false}
          inverted={false}
        />

        {/* Input */}
        <View style={[styles.inputContainer, { backgroundColor: colors.card, borderRadius: borderRadius.lg }]}>
          <TextInput
            value={inputText}
            onChangeText={setInputText}
            placeholder="Ask AI assistant..."
            placeholderTextColor={colors.textSecondary}
            style={[styles.input, { color: colors.text }]}
            multiline
            maxLength={500}
          />
          <TouchableOpacity
            onPress={handleSend}
            disabled={!inputText.trim() || isLoading}
            style={[
              styles.sendButton,
              {
                backgroundColor: inputText.trim()
                  ? colors.primary
                  : colors.border,
                opacity: inputText.trim() ? 1 : 0.5,
              },
            ]}
          >
            <Text style={{ fontSize: 20 }}>➤</Text>
          </TouchableOpacity>
        </View>
      </View>
    </BottomSheet>
  );
};

// Floating AI Button (appears on every screen)
interface FloatingAIButtonProps {
  onPress: () => void;
}

export const FloatingAIButton: React.FC<FloatingAIButtonProps> = ({ onPress }) => {
  const { colors, spacing, borderRadius } = useTheme();
  const { settings } = useApp();
  const [scale] = useState(new Animated.Value(1));

  const handlePressIn = async () => {
    if (!settings.aiAssistantEnabled) return;
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    Animated.spring(scale, {
      toValue: 0.9,
      useNativeDriver: true,
      damping: 10,
      stiffness: 400,
    }).start();
  };

  const handlePressOut = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
      damping: 10,
      stiffness: 400,
    }).start();
  };

  if (!settings.aiAssistantEnabled) {
    return null;
  }

  return (
    <Animated.View
      style={[
        styles.floatingButton,
        {
          transform: [{ scale }],
          bottom: spacing.xxl + 80,
          right: spacing.lg,
        },
      ]}
    >
      <Pressable
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={[
          styles.floatingButtonInner,
          {
            backgroundColor: colors.primary,
            borderRadius: borderRadius.full,
          },
        ]}
      >
        <BlurView intensity={80} style={StyleSheet.absoluteFill}>
          <View style={styles.floatingButtonContent}>
            <Text style={{ fontSize: 24 }}>🤖</Text>
          </View>
        </BlurView>
      </Pressable>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerText: {
    marginLeft: 12,
  },
  headerRight: {
    flexDirection: 'row',
  },
  clearButton: {
    padding: 12,
    borderRadius: 12,
  },
  quickActions: {},
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  quickActionButton: {
    width: '48%',
    padding: 16,
    alignItems: 'center',
    marginBottom: 8,
  },
  messagesList: {
    flex: 1,
  },
  messageBubble: {
    padding: 12,
    borderRadius: 16,
    marginVertical: 4,
    maxWidth: '80%',
  },
  timestamp: {
    fontSize: 10,
    marginTop: 4,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    marginTop: 8,
  },
  input: {
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 16,
    maxHeight: 100,
  },
  sendButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  floatingButton: {
    position: 'absolute',
    zIndex: 1000,
  },
  floatingButtonInner: {
    width: 56,
    height: 56,
    overflow: 'hidden',
  },
  floatingButtonContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default { AIAssistant, FloatingAIButton };