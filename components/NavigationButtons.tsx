import { View, StyleSheet } from 'react-native';
import RemoteButton from './RemoteButton';
import { Chrome as Home, ArrowLeft, Option } from 'lucide-react-native';

export default function NavigationButtons() {
  return (
    <View style={styles.container}>
      <RemoteButton
        icon={ArrowLeft}
        label="Back"
        command="back"
      />
      
      <RemoteButton
        icon={Home}
        label="Home"
        command="home"
        colorType="primary"
      />
      
      <RemoteButton
        icon={Option}
        label="Options"
        command="options"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    marginVertical: 24,
  },
});