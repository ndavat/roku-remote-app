import { View, StyleSheet } from 'react-native';
import DirectionalPad from './DirectionalPad';
import RemoteButton from './RemoteButton';
import NavigationButtons from './NavigationButtons';
import ChannelButtons from './ChannelButtons';
import MediaButtons from './MediaButtons';
import { useTheme } from '@/hooks/useTheme';
import { Power, Volume as VolumeMinus, Volume as VolumePlus, Mic } from 'lucide-react-native';
import Animated, { 
  FadeInDown, 
  Layout 
} from 'react-native-reanimated';

export default function RemoteControl() {
  const { colors } = useTheme();
  
  return (
    <Animated.ScrollView 
      contentContainerStyle={styles.container}
      entering={FadeInDown.duration(500).springify()}
      layout={Layout.springify()}
    >
      <View style={styles.topSection}>
        <RemoteButton
          icon={Power}
          size="medium"
          label="Power"
          colorType="danger"
        />
        
        <RemoteButton
          icon={Mic}
          size="medium"
          label="Voice"
          colorType="accent"
        />
      </View>
      
      <NavigationButtons />
      
      <DirectionalPad />
      
      <View style={styles.volumeRow}>
        <RemoteButton
          icon={VolumeMinus}
          size="medium"
          label="Vol -"
        />
        <View style={styles.spacer} />
        <RemoteButton
          icon={VolumePlus}
          size="medium"
          label="Vol +"
        />
      </View>
      
      <MediaButtons />
      
      <ChannelButtons />
    </Animated.ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingBottom: 100,
    flexGrow: 1,
    alignItems: 'center',
  },
  topSection: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  volumeRow: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    marginVertical: 24,
  },
  spacer: {
    width: 16,
  },
});