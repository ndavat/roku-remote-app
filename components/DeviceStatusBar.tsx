import { View, Text, StyleSheet } from 'react-native';
import { useDevices } from '@/hooks/useDevices';
import { useTheme } from '@/hooks/useTheme';
import { Bluetooth, Wifi } from 'lucide-react-native';
import Animated, { 
  FadeIn, 
  FadeOut 
} from 'react-native-reanimated';

export default function DeviceStatusBar() {
  const { colors } = useTheme();
  const { selectedDevice } = useDevices();
  
  if (!selectedDevice) return null;
  
  return (
    <Animated.View 
      style={[
        styles.container, 
        { backgroundColor: colors.cardBackground, borderColor: colors.border }
      ]}
      entering={FadeIn.duration(300)}
      exiting={FadeOut.duration(300)}
    >
      <View style={styles.iconContainer}>
        <Bluetooth size={16} color={colors.primary} />
      </View>
      <Text style={[styles.deviceName, { color: colors.text }]}>
        {selectedDevice.name}
      </Text>
      <View style={[styles.statusDot, { backgroundColor: colors.success }]} />
      <Text style={[styles.statusText, { color: colors.textSecondary }]}>
        Connected
      </Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    paddingHorizontal: 12,
    marginHorizontal: 16,
    marginTop: 8,
    marginBottom: 4,
    borderRadius: 20,
    borderWidth: 1,
  },
  iconContainer: {
    marginRight: 8,
  },
  deviceName: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 8,
  },
  statusText: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
  },
});