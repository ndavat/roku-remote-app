import { View, Text, StyleSheet, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useEffect, useState } from 'react';
import Header from '@/components/Header';
import DeviceListItem from '@/components/DeviceListItem';
import { useDevices } from '@/hooks/useDevices';
import EmptyDeviceList from '@/components/EmptyDeviceList';
import BluetoothScanner from '@/components/BluetoothScanner';
import { useTheme } from '@/hooks/useTheme';

export default function DevicesScreen() {
  const { colors } = useTheme();
  const { devices, isScanning, startScan, stopScan, connectToDevice, selectedDevice } = useDevices();
  
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <Header title="Roku Devices" />
      
      <BluetoothScanner 
        isScanning={isScanning} 
        onStartScan={startScan} 
        onStopScan={stopScan} 
      />
      
      {devices.length > 0 ? (
        <FlatList
          data={devices}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <DeviceListItem 
              device={item} 
              onPress={() => connectToDevice(item)}
              isSelected={selectedDevice?.id === item.id}
            />
          )}
          contentContainerStyle={styles.listContent}
        />
      ) : (
        <EmptyDeviceList isScanning={isScanning} />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContent: {
    padding: 16,
    flexGrow: 1,
  },
});