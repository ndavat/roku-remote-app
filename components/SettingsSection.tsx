import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '@/hooks/useTheme';
import { ReactNode } from 'react';

interface SettingsSectionProps {
  title: string;
  children: ReactNode;
}

export default function SettingsSection({ title, children }: SettingsSectionProps) {
  const { colors } = useTheme();
  
  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: colors.textSecondary }]}>
        {title}
      </Text>
      
      <View style={[styles.content, { backgroundColor: colors.cardBackground }]}>
        {children}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  title: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    marginBottom: 8,
    marginLeft: 8,
    textTransform: 'uppercase',
  },
  content: {
    borderRadius: 12,
    overflow: 'hidden',
  },
});