import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Device } from '@/types';
import { Check, Bluetooth } from 'lucide-react-native';
import { useTheme } from '@/hooks/useTheme';
import Animated, { 
  useAnimatedStyle, 
  useSharedValue, 
  withTiming,
  FadeIn,
  Layout,
} from 'react-native-reanimated';

interface DeviceListItemProps {
  device: Device;
  onPress: () => void;
  isSelected: boolean;
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export default function DeviceListItem({ 
  device, 
  onPress,
  isSelected,
}: DeviceListItemProps) {
  const { colors } = useTheme();
  const pressed = useSharedValue(0);
  
  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{ scale: 1 - 0.02 * pressed.value }],
      backgroundColor: pressed.value === 1 
        ? colors.buttonBackgroundPressed 
        : colors.cardBackground,
    };
  });
  
  const handlePressIn = () => {
    pressed.value = withTiming(1, { duration: 100 });
  };
  
  const handlePressOut = () => {
    pressed.value = withTiming(0, { duration: 200 });
  };
  
  return (
    <AnimatedPressable
      style={[
        styles.container,
        animatedStyles,
        { borderColor: isSelected ? colors.primary : colors.border }
      ]}
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      layout={Layout.springify()}
      entering={FadeIn.duration(300)}
    >
      <View style={styles.iconContainer}>
        <Bluetooth size={24} color={isSelected ? colors.primary : colors.textSecondary} />
      </View>
      
      <View style={styles.infoContainer}>
        <Text style={[styles.deviceName, { color: colors.text }]}>
          {device.name}
        </Text>
        <Text style={[styles.deviceInfo, { color: colors.textSecondary }]}>
          {device.isConnected ? 'Connected' : 'Available'} • ID: {device.id.substring(0, 8)}
        </Text>
      </View>
      
      {isSelected && (
        <View style={[styles.checkmark, { backgroundColor: colors.primary }]}>
          <Check size={16} color={colors.buttonTextContrast} />
        </View>
      )}
    </AnimatedPressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  iconContainer: {
    marginRight: 16,
  },
  infoContainer: {
    flex: 1,
  },
  deviceName: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    marginBottom: 4,
  },
  deviceInfo: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
  },
  checkmark: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
});