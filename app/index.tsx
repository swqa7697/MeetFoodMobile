import { StyleSheet, Text, View } from 'react-native';
import { ItemList } from '../components/ItemList';

export default function App() {
  return (
    <View style={styles.container}>
      <ItemList />
    </View>
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
