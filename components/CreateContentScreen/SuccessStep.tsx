import { Pressable, StyleSheet, Text, View } from 'react-native';
import { FC } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from 'expo-router';
import { colors } from '../../util/constants';
import { CreateContentStep, ScreenNavigationProps } from '../../util/types';

interface SuccessStepProps {
  setStep: (newStep: CreateContentStep) => void;
  setVideoUri: (uri: string) => void;
}

export const SuccessStep: FC<SuccessStepProps> = ({ setStep, setVideoUri }) => {
  const navigation = useNavigation<ScreenNavigationProps>();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Success</Text>
      </View>
      <View style={styles.messageContainer}>
        <Text style={{ fontSize: 20 }}>Video post published successfully!</Text>
      </View>
      <View style={styles.footerContainer}>
        <Pressable
          style={styles.createMoreButton}
          onPress={() => {
            setVideoUri('');
            setStep(CreateContentStep.record);
          }}
        >
          <Text style={styles.buttonText}>Create More Posts</Text>
        </Pressable>
        <Pressable
          style={styles.returnButton}
          onPress={() => {
            navigation.navigate('index');
          }}
        >
          <Text style={styles.buttonText}>Return to Home</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.defaultBg,
  },
  headerContainer: {
    alignItems: 'center',
    width: '100%',
    top: 18.5,
  },
  headerText: {
    fontSize: 20,
    fontWeight: '500',
  },
  messageContainer: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%',
  },
  footerContainer: {
    position: 'absolute',
    height: '50%',
    width: '100%',
    justifyContent: 'flex-end',
    bottom: 0,
    gap: 15,
  },
  createMoreButton: {
    marginHorizontal: 12,
    alignItems: 'center',
    padding: 12,
    borderRadius: 18,
    backgroundColor: colors.defaultTheme,
  },
  returnButton: {
    marginBottom: '8%',
    marginHorizontal: 12,
    alignItems: 'center',
    padding: 12,
    borderRadius: 18,
    backgroundColor: '#90aefb',
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '500',
  },
});
