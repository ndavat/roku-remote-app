import { useState, createContext, useContext, useEffect } from 'react';
import { Platform } from 'react-native';
import { Device } from '@/types';

interface DevicesContextType {
  devices: Device[];
  selectedDevice: Device | null;
  isScanning: boolean;
  startScan: () => Promise<void>;
  stopScan: () => void;
  connectToDevice: (device: Device) => Promise<void>;
  disconnectFromDevice: (deviceId: string) => Promise<void>;
  isBluetoothAvailable: boolean;
}

export const DevicesContext = createContext<DevicesContextType>({
  devices: [],
  selectedDevice: null,
  isScanning: false,
  startScan: async () => {},
  stopScan: () => {},
  connectToDevice: async () => {},
  disconnectFromDevice: async () => {},
  isBluetoothAvailable: false,
});

export function useDevices() {
  const context = useContext(DevicesContext);
  if (context === undefined) {
    throw new Error('useDevices must be used within a DevicesProvider');
  }
  return context;
}

export function DevicesProvider({ children }: { children: React.ReactNode }) {
  const [devices, setDevices] = useState<Device[]>([]);
  const [selectedDevice, setSelectedDevice] = useState<Device | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [isBluetoothAvailable, setIsBluetoothAvailable] = useState(false);

  // Check if Bluetooth is available
  useEffect(() => {
    if (Platform.OS === 'web') {
      setIsBluetoothAvailable('bluetooth' in navigator);
    }
  }, []);

  const startScan = async () => {
    if (!isBluetoothAvailable || Platform.OS !== 'web') {
      return;
    }

    setIsScanning(true);
    setDevices([]);

    try {
      const device = await (navigator as any).bluetooth.requestDevice({
        filters: [
          { namePrefix: 'Roku' },
          { services: ['00001800-0000-1000-8000-00805f9b34fb'] } // Generic Access service
        ],
        optionalServices: ['00001801-0000-1000-8000-00805f9b34fb'] // Generic Attribute service
      });

      const newDevice: Device = {
        id: device.id,
        name: device.name || 'Unknown Roku Device',
        model: 'Roku TV',
        isConnected: false,
      };

      setDevices(prev => [...prev, newDevice]);
    } catch (error) {
      console.error('Bluetooth scanning error:', error);
    } finally {
      setIsScanning(false);
    }
  };

  const stopScan = () => {
    setIsScanning(false);
  };

  const connectToDevice = async (device: Device) => {
    if (!isBluetoothAvailable || Platform.OS !== 'web') {
      return;
    }

    try {
      const bluetoothDevice = await (navigator as any).bluetooth.requestDevice({
        filters: [{ deviceId: device.id }]
      });

      const server = await bluetoothDevice.gatt.connect();
      
      // Update device status
      const updatedDevices = devices.map(d => ({
        ...d,
        isConnected: d.id === device.id,
      }));
      
      setDevices(updatedDevices);
      setSelectedDevice({
        ...device,
        isConnected: true,
      });
    } catch (error) {
      console.error('Connection error:', error);
      throw error;
    }
  };

  const disconnectFromDevice = async (deviceId: string) => {
    if (!isBluetoothAvailable || Platform.OS !== 'web') {
      return;
    }

    try {
      const device = devices.find(d => d.id === deviceId);
      if (!device) return;

      const bluetoothDevice = await (navigator as any).bluetooth.requestDevice({
        filters: [{ deviceId }]
      });

      if (bluetoothDevice.gatt.connected) {
        bluetoothDevice.gatt.disconnect();
      }

      const updatedDevices = devices.map(d => ({
        ...d,
        isConnected: d.id === deviceId ? false : d.isConnected,
      }));
      
      setDevices(updatedDevices);
      
      if (selectedDevice?.id === deviceId) {
        setSelectedDevice(null);
      }
    } catch (error) {
      console.error('Disconnection error:', error);
      throw error;
    }
  };

  const value = {
    devices,
    selectedDevice,
    isScanning,
    startScan,
    stopScan,
    connectToDevice,
    disconnectFromDevice,
    isBluetoothAvailable,
  };

  return <DevicesContext.Provider value={value}>{children}</DevicesContext.Provider>;
}