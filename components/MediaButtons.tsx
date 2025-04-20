import { View, StyleSheet } from 'react-native';
import RemoteButton from './RemoteButton';
import { Rewind, Play, Pause, FastForward, Asterisk } from 'lucide-react-native';

export default function MediaButtons() {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <RemoteButton
          icon={Rewind}
          size="medium"
          command="reverse"
          onlyIcon={true}
        />
        
        <View style={styles.playPauseContainer}>
          <RemoteButton
            icon={Play}
            size="medium"
            command="play"
            onlyIcon={true}
          />
          <View style={styles.buttonSpacer} />
          <RemoteButton
            icon={Pause}
            size="medium"
            command="pause"
            onlyIcon={true}
          />
        </View>
        
        <RemoteButton
          icon={FastForward}
          size="medium"
          command="forward"
          onlyIcon={true}
        />
      </View>
      
      <View style={styles.row}>
        <RemoteButton
          icon={Asterisk}
          size="small"
          command="replay"
          onlyIcon={true}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 16,
  },
  playPauseContainer: {
    flexDirection: 'row',
    marginHorizontal: 16,
  },
  buttonSpacer: {
    width: 12,
  },
});