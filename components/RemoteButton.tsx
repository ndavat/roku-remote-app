import { 
  Pressable, 
  Text, 
  StyleSheet, 
  ViewStyle, 
  TextStyle,
  Platform
} from 'react-native';
import { useTheme } from '@/hooks/useTheme';
import Animated, { 
  useAnimatedStyle, 
  useSharedValue, 
  withTiming 
} from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';
import { Video as LucideIcon } from 'lucide-react-native';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

type ButtonSize = 'small' | 'medium' | 'large';
type ColorType = 'default' | 'primary' | 'accent' | 'danger';

interface RemoteButtonProps {
  icon?: LucideIcon;
  label?: string;
  size?: ButtonSize;
  onlyIcon?: boolean;
  colorType?: ColorType;
  command?: string;
  onPress?: () => void;
  disabled?: boolean;
}

export default function RemoteButton({
  icon: Icon,
  label,
  size = 'medium',
  onlyIcon = false,
  colorType = 'default',
  command,
  onPress,
  disabled = false,
}: RemoteButtonProps) {
  const { colors } = useTheme();
  const pressed = useSharedValue(0);
  
  const getColorsByType = () => {
    if (disabled) {
      return {
        bg: colors.buttonBackground,
        text: colors.textSecondary,
        pressed: colors.buttonBackground,
      };
    }
    
    switch (colorType) {
      case 'primary':
        return {
          bg: colors.primary,
          text: colors.buttonTextContrast,
          pressed: colors.primaryDark,
        };
      case 'accent':
        return {
          bg: colors.accent,
          text: colors.buttonTextContrast,
          pressed: colors.accentDark,
        };
      case 'danger':
        return {
          bg: colors.danger,
          text: colors.buttonTextContrast,
          pressed: colors.dangerDark,
        };
      default:
        return {
          bg: colors.buttonBackground,
          text: colors.buttonText,
          pressed: colors.buttonBackgroundPressed,
        };
    }
  };
  
  const typeColors = getColorsByType();
  
  const getSizeStyles = (): { 
    container: ViewStyle; 
    text: TextStyle;
    iconSize: number;
  } => {
    switch (size) {
      case 'small':
        return {
          container: {
            width: onlyIcon ? 40 : 70,
            height: onlyIcon ? 40 : 40,
            borderRadius: onlyIcon ? 20 : 20,
          },
          text: {
            fontSize: 12,
          },
          iconSize: 16,
        };
      case 'large':
        return {
          container: {
            width: onlyIcon ? 80 : 'auto',
            height: onlyIcon ? 80 : 60,
            borderRadius: onlyIcon ? 40 : 30,
            paddingHorizontal: onlyIcon ? 0 : 24,
          },
          text: {
            fontSize: 16,
          },
          iconSize: 28,
        };
      default: // medium
        return {
          container: {
            width: onlyIcon ? 60 : 'auto',
            height: onlyIcon ? 60 : 50,
            borderRadius: onlyIcon ? 30 : 25,
            paddingHorizontal: onlyIcon ? 0 : 16,
          },
          text: {
            fontSize: 14,
          },
          iconSize: 24,
        };
    }
  };
  
  const sizeStyles = getSizeStyles();
  
  const animatedStyles = useAnimatedStyle(() => {
    return {
      backgroundColor: pressed.value === 1 ? typeColors.pressed : typeColors.bg,
      transform: [{ scale: 1 - 0.05 * pressed.value }],
      opacity: disabled ? 0.5 : 1,
    };
  });
  
  const handlePressIn = () => {
    if (disabled) return;
    pressed.value = withTiming(1, { duration: 100 });
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
  };
  
  const handlePressOut = () => {
    if (disabled) return;
    pressed.value = withTiming(0, { duration: 200 });
  };
  
  const handlePress = () => {
    if (disabled) return;
    onPress?.();
    console.log(`Button pressed: ${command || label}`);
  };
  
  return (
    <AnimatedPressable
      style={[
        styles.button,
        sizeStyles.container,
        animatedStyles,
      ]}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={handlePress}
      disabled={disabled}
    >
      {Icon && (
        <Icon 
          size={sizeStyles.iconSize} 
          color={typeColors.text} 
          strokeWidth={2.5}
        />
      )}
      
      {label && !onlyIcon && (
        <Text 
          style={[
            styles.label, 
            sizeStyles.text, 
            { color: typeColors.text }
          ]}
        >
          {label}
        </Text>
      )}
    </AnimatedPressable>
  );
}

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  label: {
    fontFamily: 'Inter-SemiBold',
    marginLeft: 8,
  },
});