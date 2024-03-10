import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams } from 'expo-router';
import { VideoList } from '../../components/VideoList';

export default function App() {
  const { id } = useLocalSearchParams();

  return (
    <SafeAreaView style={styles.container}>
      <VideoList currVideoId={id as string} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6f6f6',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
