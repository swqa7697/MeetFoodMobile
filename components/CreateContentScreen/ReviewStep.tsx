import { ResizeMode, Video } from 'expo-av';
import { StatusBar } from 'expo-status-bar';
import { FC } from 'react';
import { StyleSheet, View, useWindowDimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from '@expo/vector-icons/Ionicons';
import { CreateContentStep } from '../../util/types';
import { colors } from '../../util/constants';

interface ReviewStepProps {
  videoUri: string;
  setStep: (newStep: CreateContentStep) => void;
  setVideoUri: (uri: string) => void;
}

export const ReviewStep: FC<ReviewStepProps> = ({
  videoUri,
  setStep,
  setVideoUri,
}) => {
  const { height, width } = useWindowDimensions();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <Video
        source={{ uri: videoUri }}
        style={{ height: (width * 16) / 9, width: width }}
        resizeMode={ResizeMode.CONTAIN}
        useNativeControls={false}
        shouldPlay
        isLooping
      />
      <SafeAreaView style={styles.backButtonContainer}>
        <Ionicons.Button
          name="arrow-back-circle"
          size={45}
          borderRadius={45}
          color="rgba(120, 120, 120, 0.9)"
          backgroundColor="rgba(0, 0, 0, 0.4)"
          style={{ padding: 0, margin: 0 }}
          iconStyle={{ marginRight: 0 }}
          onPress={() => {
            setVideoUri('');
            setStep(CreateContentStep.record);
          }}
        />
      </SafeAreaView>
      <View
        style={{
          ...styles.forwardButtonContainer,
          height: height - (width * 16) / 9,
        }}
      >
        <Ionicons.Button
          name="arrow-forward-circle"
          size={45}
          borderRadius={45}
          color={colors.defaultTheme}
          backgroundColor="rgba(255, 255, 255, 0.6)"
          style={{ padding: 0, margin: 0 }}
          iconStyle={{ marginRight: 0 }}
          onPress={() => {
            setStep(CreateContentStep.publish);
          }}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  backButtonContainer: {
    position: 'absolute',
    top: 10,
    left: 10,
  },
  forwardButtonContainer: {
    position: 'absolute',
    justifyContent: 'center',
    bottom: 0,
    right: 15,
  },
});
