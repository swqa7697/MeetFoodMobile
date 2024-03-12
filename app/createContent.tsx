import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from 'expo-router';
import { useAtomValue } from 'jotai';
import Ionicons from '@expo/vector-icons/Ionicons';
import { AuthGuard } from '../components/AuthGuard';
import { CreateContentScreen } from '../components/CreateContentScreen';
import { isCreateContentScreenAuthedAtom } from '../util/atoms';
import { colors } from '../util/constants';

export default function App() {
  const navigation = useNavigation();
  const isAuth = useAtomValue(isCreateContentScreenAuthedAtom);

  return (
    <View style={{ flex: 1, backgroundColor: colors.defaultBg }}>
      <AuthGuard>
        <CreateContentScreen />
      </AuthGuard>
      {isAuth ? null : (
        <SafeAreaView style={{ position: 'absolute', top: 0 }}>
          <Ionicons
            name="close"
            size={35}
            style={{ padding: 10 }}
            color="rgba(0, 0, 0, 0.65)"
            onPress={() => {
              navigation.goBack();
            }}
          />
        </SafeAreaView>
      )}
    </View>
  );
}
