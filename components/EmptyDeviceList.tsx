import { View, Text, StyleSheet, Image } from 'react-native';
import { useTheme } from '@/hooks/useTheme';
import { Bluetooth } from 'lucide-react-native';

interface EmptyDeviceListProps {
  isScanning: boolean;
}

export default function EmptyDeviceList({ isScanning }: EmptyDeviceListProps) {
  const { colors } = useTheme();
  
  return (
    <View style={styles.container}>
      <View style={[styles.iconCircle, { backgroundColor: colors.cardBackground }]}>
        <Bluetooth 
          size={40} 
          color={colors.textSecondary} 
        />
      </View>
      
      <Text style={[styles.title, { color: colors.text }]}>
        {isScanning ? 'Searching for devices...' : 'No Roku devices found'}
      </Text>
      
      <Text style={[styles.description, { color: colors.textSecondary }]}>
        {isScanning 
          ? 'Make sure your Roku device is turned on and within range'
          : 'Try scanning again or check that your Roku device is turned on and Bluetooth is enabled'
        }
      </Text>
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
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    marginBottom: 8,
    textAlign: 'center',
  },
  description: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    textAlign: 'center',
    maxWidth: 280,
  },
});