import { Pressable, StyleSheet, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  interpolateColor,
} from 'react-native-reanimated';
import { useTheme } from '@/hooks/useTheme';
import { useEffect } from 'react';
import * as Haptics from 'expo-haptics';
import { Platform } from 'react-native';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
const AnimatedView = Animated.createAnimatedComponent(View);

interface ToggleProps {
  value: boolean;
  onValueChange: (value: boolean) => void;
  disabled?: boolean;
}

export function Toggle({ value, onValueChange, disabled = false }: ToggleProps) {
  const { colors } = useTheme();
  const togglePosition = useSharedValue(value ? 1 : 0);

  useEffect(() => {
    togglePosition.value = withTiming(value ? 1 : 0, {
      duration: 200,
    });
  }, [value]);

  const handlePress = () => {
    if (disabled) return;
    
    const newValue = !value;
    onValueChange(newValue);
    
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
  };

  const toggleContainerStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: interpolateColor(
        togglePosition.value,
        [0, 1],
        [colors.toggleBgOff, colors.primary]
      ),
    };
  });

  const toggleCircleStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: withTiming(togglePosition.value * 20, {
            duration: 200,
          }),
        },
      ],
    };
  });

  return (
    <AnimatedPressable
      style={[
        styles.toggleContainer,
        toggleContainerStyle,
        disabled && styles.disabled,
      ]}
      onPress={handlePress}
      disabled={disabled}
    >
      <AnimatedView
        style={[
          styles.toggleCircle,
          toggleCircleStyle,
          { backgroundColor: colors.toggleCircle },
        ]}
      />
    </AnimatedPressable>
  );
}

const styles = StyleSheet.create({
  toggleContainer: {
    width: 46,
    height: 26,
    borderRadius: 13,
    padding: 3,
    justifyContent: 'center',
  },
  toggleCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    shadowColor: 'rgba(0,0,0,0.3)',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 2,
  },
  disabled: {
    opacity: 0.5,
  },
});