import { View, StyleSheet, Text, Image } from 'react-native';
import RemoteButton from './RemoteButton';
import { useTheme } from '@/hooks/useTheme';
import Animated, { 
  FadeInUp, 
  Layout 
} from 'react-native-reanimated';

const CHANNEL_SHORTCUTS = [
  { id: 'netflix', name: 'Netflix', iconUrl: 'https://images.pexels.com/photos/5053740/pexels-photo-5053740.jpeg?cs=srgb&dl=pexels-cottonbro-studio-5053740.jpg&fm=jpg&w=10&h=10&fit=crop' },
  { id: 'hulu', name: 'Hulu', iconUrl: 'https://images.pexels.com/photos/5053740/pexels-photo-5053740.jpeg?cs=srgb&dl=pexels-cottonbro-studio-5053740.jpg&fm=jpg&w=10&h=10&fit=crop' },
  { id: 'disney', name: 'Disney+', iconUrl: 'https://images.pexels.com/photos/5053740/pexels-photo-5053740.jpeg?cs=srgb&dl=pexels-cottonbro-studio-5053740.jpg&fm=jpg&w=10&h=10&fit=crop' },
  { id: 'prime', name: 'Prime', iconUrl: 'https://images.pexels.com/photos/5053740/pexels-photo-5053740.jpeg?cs=srgb&dl=pexels-cottonbro-studio-5053740.jpg&fm=jpg&w=10&h=10&fit=crop' },
];

export default function ChannelButtons() {
  const { colors } = useTheme();
  
  return (
    <Animated.View 
      style={styles.container}
      layout={Layout.springify()}
    >
      <Text style={[styles.sectionTitle, { color: colors.textSecondary }]}>
        Channel Shortcuts
      </Text>
      
      <View style={styles.grid}>
        {CHANNEL_SHORTCUTS.map((channel, index) => (
          <Animated.View 
            key={channel.id}
            entering={FadeInUp.delay(100 * index).duration(500)}
            style={styles.channelWrapper}
          >
            <View 
              style={[
                styles.channelButton, 
                { backgroundColor: colors.buttonBackground }
              ]}
            >
              <Text 
                style={[
                  styles.channelName, 
                  { color: colors.buttonText }
                ]}
              >
                {channel.name}
              </Text>
            </View>
          </Animated.View>
        ))}
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginTop: 16,
  },
  sectionTitle: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    marginBottom: 8,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  channelWrapper: {
    width: '48%',
    marginBottom: 16,
  },
  channelButton: {
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  channelLogo: {
    width: 24,
    height: 24,
    marginBottom: 4,
  },
  channelName: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
  },
});