import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '@/hooks/useTheme';
import RemoteButton from './RemoteButton';
import { Bluetooth, CircleStop as StopCircle } from 'lucide-react-native';
import Animated, { 
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
  cancelAnimation,
  Easing,
} from 'react-native-reanimated';
import { useEffect, useState } from 'react';
import { useDevices } from '@/hooks/useDevices';

interface BluetoothScannerProps {
  isScanning: boolean;
  onStartScan: () => void;
  onStopScan: () => void;
}

export default function BluetoothScanner({
  isScanning,
  onStartScan,
  onStopScan,
}: BluetoothScannerProps) {
  const { colors } = useTheme();
  const { isBluetoothAvailable } = useDevices();
  const [error, setError] = useState<string | null>(null);
  const pulseValue = useSharedValue(0);
  
  useEffect(() => {
    if (isScanning) {
      pulseValue.value = 0;
      pulseValue.value = withRepeat(
        withTiming(1, { duration: 1500, easing: Easing.ease }),
        -1,
        true
      );
    } else {
      cancelAnimation(pulseValue);
    }
    
    return () => {
      cancelAnimation(pulseValue);
    };
  }, [isScanning]);
  
  const pulseStyle = useAnimatedStyle(() => {
    return {
      opacity: 0.7 - pulseValue.value * 0.5,
      transform: [{ scale: 1 + pulseValue.value * 0.2 }],
    };
  });

  const handleStartScan = async () => {
    try {
      setError(null);
      await onStartScan();
    } catch (err) {
      setError('Failed to start scanning. Please try again.');
    }
  };
  
  return (
    <View style={[
      styles.container, 
      { backgroundColor: colors.cardBackground, borderColor: colors.border }
    ]}>
      <View style={styles.content}>
        {!isBluetoothAvailable ? (
          <Text style={[styles.errorText, { color: colors.danger }]}>
            Bluetooth is not available on this device
          </Text>
        ) : error ? (
          <Text style={[styles.errorText, { color: colors.danger }]}>
            {error}
          </Text>
        ) : isScanning ? (
          <View style={styles.scanningInfo}>
            <Animated.View style={[styles.pulseCircle, pulseStyle]}>
              <Bluetooth 
                size={28} 
                color={colors.primary} 
              />
            </Animated.View>
            <Text style={[styles.scanningText, { color: colors.text }]}>
              Scanning for Roku devices...
            </Text>
          </View>
        ) : (
          <Text style={[styles.infoText, { color: colors.textSecondary }]}>
            Scan to find Roku devices nearby
          </Text>
        )}
      </View>
      
      <View style={styles.buttonContainer}>
        {isScanning ? (
          <RemoteButton
            icon={StopCircle}
            label="Stop"
            size="medium"
            colorType="danger"
            onPress={onStopScan}
          />
        ) : (
          <RemoteButton
            icon={Bluetooth}
            label="Scan"
            size="medium"
            colorType="primary"
            onPress={handleStartScan}
            disabled={!isBluetoothAvailable}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    margin: 16,
    borderRadius: 12,
    borderWidth: 1,
  },
  content: {
    flex: 1,
  },
  scanningInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pulseCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  infoText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
  },
  scanningText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
  },
  errorText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
  },
  buttonContainer: {
    marginLeft: 8,
  },
});