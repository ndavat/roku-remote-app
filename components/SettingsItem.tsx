import { View, Text, StyleSheet, Pressable, ViewStyle } from 'react-native';
import { useTheme } from '@/hooks/useTheme';
import Animated, { 
  useAnimatedStyle, 
  useSharedValue, 
  withTiming 
} from 'react-native-reanimated';
import { Video as LucideIcon } from 'lucide-react-native';
import { ReactNode } from 'react';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

interface SettingsItemProps {
  title: string;
  description?: string;
  icon?: string;
  onPress?: () => void;
  rightElement?: ReactNode;
  style?: ViewStyle;
}

export default function SettingsItem({
  title,
  description,
  icon,
  onPress,
  rightElement,
  style,
}: SettingsItemProps) {
  const { colors } = useTheme();
  const pressed = useSharedValue(0);
  
  const handlePressIn = () => {
    pressed.value = withTiming(1, { duration: 100 });
  };
  
  const handlePressOut = () => {
    pressed.value = withTiming(0, { duration: 200 });
  };
  
  const animatedStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: pressed.value === 1 
        ? colors.itemPressed 
        : 'transparent',
    };
  });
  
  // Dynamically import the icon from lucide-react-native
  const IconComponent = icon 
    ? require('lucide-react-native')[icon] 
    : null;
  
  return (
    <AnimatedPressable
      style={[
        styles.container,
        animatedStyle,
        style,
      ]}
      onPress={onPress}
      onPressIn={onPress ? handlePressIn : undefined}
      onPressOut={onPress ? handlePressOut : undefined}
      disabled={!onPress}
    >
      {IconComponent && (
        <View style={styles.iconContainer}>
          <IconComponent size={20} color={colors.textSecondary} />
        </View>
      )}
      
      <View style={styles.textContainer}>
        <Text style={[styles.title, { color: colors.text }]}>
          {title}
        </Text>
        
        {description && (
          <Text style={[styles.description, { color: colors.textSecondary }]}>
            {description}
          </Text>
        )}
      </View>
      
      {rightElement && (
        <View style={styles.rightElementContainer}>
          {rightElement}
        </View>
      )}
    </AnimatedPressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'rgba(0,0,0,0.1)',
  },
  iconContainer: {
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
  },
  description: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    marginTop: 4,
  },
  rightElementContainer: {
    marginLeft: 8,
  },
});