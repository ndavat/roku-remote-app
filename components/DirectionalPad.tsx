import { View, StyleSheet, Pressable } from 'react-native';
import Animated, { 
  useAnimatedStyle, 
  useSharedValue, 
  withTiming, 
  interpolateColor 
} from 'react-native-reanimated';
import { useMemo } from 'react';
import { useTheme } from '@/hooks/useTheme';
import { ChevronDown, ChevronLeft, ChevronRight, ChevronUp } from 'lucide-react-native';
import RemoteButton from './RemoteButton';
import * as Haptics from 'expo-haptics';
import { Platform } from 'react-native';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export default function DirectionalPad() {
  const { colors } = useTheme();
  const centerPressed = useSharedValue(0);
  
  const centerStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: interpolateColor(
        centerPressed.value,
        [0, 1],
        [colors.buttonBackground, colors.primary]
      ),
      transform: [{ scale: 1 - 0.05 * centerPressed.value }],
    };
  });
  
  const handlePressIn = () => {
    centerPressed.value = withTiming(1, { duration: 100 });
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }
  };
  
  const handlePressOut = () => {
    centerPressed.value = withTiming(0, { duration: 200 });
  };
  
  return (
    <View style={[styles.container, { backgroundColor: colors.cardBackground }]}>
      <View style={styles.dpadRow}>
        <View style={styles.spacer} />
        <RemoteButton
          icon={ChevronUp}
          size="medium"
          onlyIcon={true}
          command="up"
        />
        <View style={styles.spacer} />
      </View>
      
      <View style={styles.dpadRow}>
        <RemoteButton
          icon={ChevronLeft}
          size="medium"
          onlyIcon={true}
          command="left"
        />
        
        <AnimatedPressable 
          style={[styles.okButton, centerStyle]} 
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
        >
          <Animated.Text style={[styles.okText, { color: colors.buttonText }]}>
            OK
          </Animated.Text>
        </AnimatedPressable>
        
        <RemoteButton
          icon={ChevronRight}
          size="medium"
          onlyIcon={true}
          command="right"
        />
      </View>
      
      <View style={styles.dpadRow}>
        <View style={styles.spacer} />
        <RemoteButton
          icon={ChevronDown}
          size="medium"
          onlyIcon={true}
          command="down"
        />
        <View style={styles.spacer} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 220,
    height: 220,
    borderRadius: 110,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  dpadRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 16,
  },
  okButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  okText: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
  },
  spacer: {
    width: 70,
    height: 70,
  },
});