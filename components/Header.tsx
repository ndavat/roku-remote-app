import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '@/hooks/useTheme';

interface HeaderProps {
  title: string;
}

export default function Header({ title }: HeaderProps) {
  const { colors } = useTheme();
  
  return (
    <View style={[styles.container, { borderBottomColor: colors.border }]}>
      <Text style={[styles.title, { color: colors.text }]}>
        {title}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 60,
    paddingHorizontal: 16,
    justifyContent: 'center',
    borderBottomWidth: 1,
  },
  title: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
  },
});