import { View, Text, StyleSheet, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import RemoteControl from '@/components/RemoteControl';
import Header from '@/components/Header';
import { useEffect, useState } from 'react';
import { useDevices } from '@/hooks/useDevices';
import NoDeviceConnected from '@/components/NoDeviceConnected';
import DeviceStatusBar from '@/components/DeviceStatusBar';
import { useTheme } from '@/hooks/useTheme';

export default function RemoteScreen() {
  const { colors } = useTheme();
  const { selectedDevice } = useDevices();
  const [showControls, setShowControls] = useState(false);

  useEffect(() => {
    // Simulate device connection status for demo
    if (selectedDevice) {
      setShowControls(true);
    } else {
      setShowControls(false);
    }
  }, [selectedDevice]);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <Header title="Remote Control" />
      <DeviceStatusBar />
      
      {showControls ? (
        <RemoteControl />
      ) : (
        <NoDeviceConnected />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});