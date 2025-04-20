import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useTheme } from '@/hooks/useTheme';
import { Router, Bluetooth } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import Animated, { 
  useAnimatedStyle, 
  useSharedValue, 
  withTiming 
} from 'react-native-reanimated';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export default function NoDeviceConnected() {
  const { colors } = useTheme();
  const router = useRouter();
  const pressed = useSharedValue(0);
  
  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{ scale: 1 - 0.05 * pressed.value }],
      backgroundColor: pressed.value === 1 
        ? colors.primaryDark 
        : colors.primary,
    };
  });
  
  const handlePressIn = () => {
    pressed.value = withTiming(1, { duration: 100 });
  };
  
  const handlePressOut = () => {
    pressed.value = withTiming(0, { duration: 200 });
  };
  
  const navigateToDevices = () => {
    router.push('/devices');
  };
  
  return (
    <View style={styles.container}>
      <View style={[styles.iconCircle, { backgroundColor: colors.cardBackground }]}>
        <Router 
          size={48} 
          color={colors.textSecondary} 
        />
      </View>
      
      <Text style={[styles.title, { color: colors.text }]}>
        No Roku Device Connected
      </Text>
      
      <Text style={[styles.description, { color: colors.textSecondary }]}>
        Connect to a Roku device to use the remote control
      </Text>
      
      <AnimatedPressable 
        style={[
          styles.button,
          animatedStyles,
        ]}
        onPress={navigateToDevices}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
      >
        <Bluetooth size={20} color={colors.buttonTextContrast} />
        <Text style={[styles.buttonText, { color: colors.buttonTextContrast }]}>
          Connect a Device
        </Text>
      </AnimatedPressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  iconCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    textAlign: 'center',
    marginBottom: 32,
    maxWidth: 300,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  buttonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    marginLeft: 8,
  },
});