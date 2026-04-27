// PhotoLab Ultra Pro Max - Animation Utilities
// Micro-animations: scale, spring, fade, slide

import { Animated, Easing, Pressable, ViewStyle, TextStyle } from 'react-native';
import * as Haptics from 'expo-haptics';

// Scale Animation Values
export const useScaleAnimation = (
  initialValue: number = 1,
  pressedValue: number = 0.95
) => {
  const scale = React.useRef(new Animated.Value(initialValue)).current;

  const onPressIn = () => {
    Animated.spring(scale, {
      toValue: pressedValue,
      useNativeDriver: true,
      damping: 15,
      stiffness: 400,
    }).start();
  };

  const onPressOut = () => {
    Animated.spring(scale, {
      toValue: initialValue,
      useNativeDriver: true,
      damping: 15,
      stiffness: 400,
    }).start();
  };

  return { scale, onPressIn, onPressOut };
};

// Fade Animation
export const useFadeAnimation = (initialValue: number = 0) => {
  const opacity = React.useRef(new Animated.Value(initialValue)).current;

  const fadeIn = (duration: number = 300) => {
    Animated.timing(opacity, {
      toValue: 1,
      duration,
      useNativeDriver: true,
      easing: Easing.inOut(Easing.ease),
    }).start();
  };

  const fadeOut = (duration: number = 300) => {
    Animated.timing(opacity, {
      toValue: 0,
      duration,
      useNativeDriver: true,
      easing: Easing.inOut(Easing.ease),
    }).start();
  };

  return { opacity, fadeIn, fadeOut };
};

// Slide Animation
export const useSlideAnimation = (
  initialValue: number = 100,
  direction: 'left' | 'right' | 'up' | 'down' = 'up'
) => {
  const getTranslateValue = (value: number, dir: string) => {
    switch (dir) {
      case 'left': return { translateX: value };
      case 'right': return { translateX: -value };
      case 'up': return { translateY: value };
      case 'down': return { translateY: -value };
      default: return { translateY: value };
    }
  };

  const translate = React.useRef(
    new Animated.Value(getTranslateValue(initialValue, direction))
  ).current;

  const slideIn = (duration: number = 300) => {
    Animated.timing(translate, {
      toValue: 0,
      duration,
      useNativeDriver: true,
      easing: Easing.out(Easing.back(1.5)),
    }).start();
  };

  const slideOut = (duration: number = 300, toValue?: number) => {
    Animated.timing(translate, {
      toValue: toValue || getTranslateValue(initialValue, direction),
      duration,
      useNativeDriver: true,
      easing: Easing.in(Easing.back(1.5)),
    }).start();
  };

  return { translate, slideIn, slideOut };
};

// Spring Bounce Animation
export const useSpringAnimation = (initialValue: number = 0) => {
  const animatedValue = React.useRef(new Animated.Value(initialValue)).current;

  const bounce = () => {
    Animated.sequence([
      Animated.spring(animatedValue, {
        toValue: 1,
        useNativeDriver: true,
        damping: 3,
        stiffness: 300,
      }),
      Animated.spring(animatedValue, {
        toValue: 0,
        useNativeDriver: true,
        damping: 10,
        stiffness: 200,
      }),
    ]).start();
  };

  return { animatedValue, bounce };
};

// Rotate Animation
export const useRotateAnimation = (
  fromValue: number = 0,
  toValue: number = 360
) => {
  const rotate = React.useRef(new Animated.Value(fromValue)).current;

  const rotateAnim = (duration: number = 500, callback?: () => void) => {
    Animated.timing(rotate, {
      toValue,
      duration,
      useNativeDriver: true,
      easing: Easing.inOut(Easing.ease),
    }).start(callback ? () => callback() : undefined);
  };

  const rotateInterpolate = rotate.interpolate({
    inputRange: [0, 360],
    outputRange: ['0deg', '360deg'],
  });

  return { rotate, rotateAnim, rotateInterpolate };
};

// Pulse Animation (for loading indicators)
export const usePulseAnimation = () => {
  const pulse = React.useRef(new Animated.Value(1)).current;

  const startPulse = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, {
          toValue: 0.5,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(pulse, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
      ])
    ).start();
  };

  const stopPulse = () => {
    pulse.stopAnimation();
    pulse.setValue(1);
  };

  return { pulse, startPulse, stopPulse };
};

// Skeleton Loading Animation
export const useSkeletonAnimation = () => {
  const shimmer = React.useRef(new Animated.Value(-1)).current;

  const startShimmer = () => {
    Animated.loop(
      Animated.timing(shimmer, {
        toValue: 2,
        duration: 1500,
        useNativeDriver: true,
      })
    ).start();
  };

  const opacity = shimmer.interpolate({
    inputRange: [-1, 0, 1, 2],
    outputRange: [0.3, 0.5, 0.5, 0.3],
  });

  return { shimmer, startShimmer, opacity };
};

// Animated Pressable Wrapper
interface AnimatedPressableProps {
  onPress?: () => void;
  style?: ViewStyle;
  disabled?: boolean;
  children: React.ReactNode;
}

export const AnimatedPressable: React.FC<AnimatedPressableProps> = ({
  onPress,
  style,
  disabled,
  children,
}) => {
  const scale = React.useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scale, {
      toValue: 0.96,
      useNativeDriver: true,
      damping: 15,
      stiffness: 400,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
      damping: 15,
      stiffness: 400,
    }).start();
  };

  return (
    <Animated.View style={[style, { transform: [{ scale }] }]}>
      <Pressable
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        disabled={disabled}
      >
        {children}
      </Pressable>
    </Animated.View>
  );
};

// Animation Hook for Button Press
export const useButtonAnimation = (
  onPress?: () => void,
  hapticType: Haptics.ImpactFeedbackStyle = Haptics.ImpactFeedbackStyle.Medium
) => {
  const [isPressed, setIsPressed] = React.useState(false);
  const scale = React.useRef(new Animated.Value(1)).current;

  const handlePressIn = async () => {
    setIsPressed(true);
    await Haptics.impactAsync(hapticType);
    scale.addListener(({ value }) => {
      // Listener setup would happen here in real implementation
    });
    Animated.spring(scale, {
      toValue: 0.94,
      useNativeDriver: true,
      damping: 15,
      stiffness: 400,
    }).start();
  };

  const handlePressOut = async () => {
    setIsPressed(false);
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
      damping: 15,
      stiffness: 400,
      friction: 3,
    }).start();
    if (onPress) {
      onPress();
    }
  };

  return {
    isPressed,
    scale,
    handlePressIn,
    handlePressOut,
  };
};

// Shake Animation (for error feedback)
export const useShakeAnimation = () => {
  const translateX = React.useRef(new Animated.Value(0)).current;

  const shake = async () => {
    await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
    
    const shakeSequence = [
      { value: 10 },
      { value: -10 },
      { value: 8 },
      { value: -8 },
      { value: 5 },
      { value: -5 },
      { value: 0 },
    ];

    for (const item of shakeSequence) {
      await new Promise(resolve => {
        Animated.timing(translateX, {
          toValue: item.value,
          duration: 50,
          useNativeDriver: true,
        }).start(resolve);
      });
    }
  };

  return { translateX, shake };
};

// Wobble Animation (for success feedback)
export const useWobbleAnimation = () => {
  const rotate = React.useRef(new Animated.Value(0)).current;

  const wobble = async () => {
    await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    
    Animated.loop(
      Animated.sequence([
        Animated.timing(rotate, {
          toValue: 3,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(rotate, {
          toValue: -3,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(rotate, {
          toValue: 0,
          duration: 100,
          useNativeDriver: true,
        }),
      ]),
      2
    ).start();
  };

  const rotateInterpolate = rotate.interpolate({
    inputRange: [-3, 0, 3],
    outputRange: ['-3deg', '0deg', '3deg'],
  });

  return { rotate, wobble, rotateInterpolate };
};

// Export common animations
export const createAnimationStyle = (animatedValue: Animated.Value, outputRange: number[], inputRange?: number[]) => {
  return animatedValue.interpolate({
    inputRange: inputRange || [0, 1],
    outputRange: outputRange,
  });
};

export {Animated, Easing};