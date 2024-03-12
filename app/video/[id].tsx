import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useLocalSearchParams } from 'expo-router';
import { VideoList } from '../../components/VideoList';

export default function App() {
  const { id } = useLocalSearchParams();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <VideoList currVideoId={id as string} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
