import { BackHandler, StyleSheet, View } from 'react-native';
import { useFocusEffect } from 'expo-router';
import { ItemList } from '../components/ItemList';
import { colors } from '../util/constants';

export default function App() {
  useFocusEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => true,
    );
    return () => backHandler.remove();
  });

  return (
    <View style={styles.container}>
      <ItemList />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.defaultBg,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
