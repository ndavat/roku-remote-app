import { View } from 'react-native';
import { ThemeProvider } from '@/hooks/useTheme';
import { DevicesProvider } from '@/hooks/useDevices';

export default function App({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <DevicesProvider>
        {children}
      </DevicesProvider>
    </ThemeProvider>
  );
}