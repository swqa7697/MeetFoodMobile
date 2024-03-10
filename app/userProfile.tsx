import { Button, StyleSheet, Text, View } from 'react-native';
import { useAuthenticator } from '@aws-amplify/ui-react-native';
import { AuthGuard } from '../components/AuthGuard';

const SignOutButton = () => {
  const { user, signOut } = useAuthenticator((context) => [context.user]);
  const email = user?.attributes?.email;

  return (
    <View style={styles.container}>
      <Text>
        Welcome to MeetFood, {email?.substring(0, email.lastIndexOf('@'))}
      </Text>
      <Button title="Sign Out" onPress={signOut} />
    </View>
  );
};

export default function App() {
  return (
    <AuthGuard>
      <SignOutButton />
    </AuthGuard>
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
