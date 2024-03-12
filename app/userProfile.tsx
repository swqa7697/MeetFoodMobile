import { Button, StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuthenticator } from '@aws-amplify/ui-react-native';
import { AuthGuard } from '../components/AuthGuard';
import { colors } from '../util/constants';

const UserProfileScreen = () => {
  const { user, signOut } = useAuthenticator((context) => [context.user]);
  const email = user?.attributes?.email;

  return (
    <SafeAreaView style={styles.container}>
      <Text>
        Welcome to MeetFood, {email?.substring(0, email.lastIndexOf('@'))}
      </Text>
      <Button title="Sign Out" onPress={signOut} />
    </SafeAreaView>
  );
};

export default function App() {
  return (
    <AuthGuard>
      <UserProfileScreen />
    </AuthGuard>
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
