import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '@/components/Header';
import SettingsSection from '@/components/SettingsSection';
import SettingsItem from '@/components/SettingsItem';
import { useTheme } from '@/hooks/useTheme';
import { Toggle } from '@/components/Toggle';

export default function SettingsScreen() {
  const { colors, isDark, toggleTheme } = useTheme();
  
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <Header title="Settings" />
      
      <ScrollView contentContainerStyle={styles.content}>
        <SettingsSection title="Appearance">
          <SettingsItem 
            title="Dark Mode" 
            icon="moon" 
            rightElement={
              <Toggle value={isDark} onValueChange={toggleTheme} />
            }
          />
          <SettingsItem 
            title="Button Haptics" 
            icon="vibrate" 
            rightElement={
              <Toggle value={true} onValueChange={() => {}} />
            }
          />
        </SettingsSection>
        
        <SettingsSection title="Roku Remote">
          <SettingsItem
            title="Channel Shortcuts"
            icon="bookmark"
            rightElement={
              <Text style={[styles.settingValue, { color: colors.textSecondary }]}>
                4 Configured
              </Text>
            }
          />
          <SettingsItem
            title="Button Layout"
            icon="layout"
            rightElement={
              <Text style={[styles.settingValue, { color: colors.textSecondary }]}>
                Standard
              </Text>
            }
          />
        </SettingsSection>
        
        <SettingsSection title="Bluetooth">
          <SettingsItem
            title="Auto-Connect"
            icon="bluetooth"
            rightElement={
              <Toggle value={true} onValueChange={() => {}} />
            }
          />
          <SettingsItem
            title="Connection Timeout"
            icon="timer"
            rightElement={
              <Text style={[styles.settingValue, { color: colors.textSecondary }]}>
                30 seconds
              </Text>
            }
          />
        </SettingsSection>
        
        <SettingsSection title="About">
          <SettingsItem
            title="App Version"
            icon="info"
            rightElement={
              <Text style={[styles.settingValue, { color: colors.textSecondary }]}>
                1.0.0
              </Text>
            }
          />
          <SettingsItem
            title="Help & Support"
            icon="help-circle"
          />
        </SettingsSection>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 16,
    paddingBottom: 32,
  },
  settingValue: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
  },
});