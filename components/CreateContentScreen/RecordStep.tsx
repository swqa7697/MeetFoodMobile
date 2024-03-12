import {
  Platform,
  Pressable,
  StyleSheet,
  View,
  useWindowDimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FC, useRef, useState } from 'react';
import { Camera, CameraType } from 'expo-camera';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import * as MediaLibrary from 'expo-media-library';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { CountdownProgressBar } from '../CountdownProgressBar';
import { CreateContentStep } from '../../util/types';
import { colors } from '../../util/constants';

const MAX_DURATION = 15;
const SHUTTER_BTN_SIZE = 60;

interface RecordStepProps {
  setStep: (newStep: CreateContentStep) => void;
  setVideoUri: (uri: string) => void;
}

export const RecordStep: FC<RecordStepProps> = ({ setStep, setVideoUri }) => {
  const camRef = useRef<Camera>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [type, setType] = useState(CameraType.back);
  const [camPerm, requestCamPerm] = Camera.useCameraPermissions();
  const [micPerm, requestMicPerm] = Camera.useMicrophonePermissions();
  const [mediaPerm, requestMediaPerm] = MediaLibrary.usePermissions({
    writeOnly: true,
  });
  const { width } = useWindowDimensions();
  const navigation = useNavigation();

  if (!camPerm || !micPerm || !mediaPerm) {
    // Permissions are still loading
    return <View />;
  }

  if (!camPerm.granted) {
    // Camera permissions are not granted yet
    requestCamPerm();
  }

  if (!micPerm.granted) {
    // Microphone permissions are not granted yet
    requestMicPerm();
  }

  if (!mediaPerm.granted) {
    // Media permissions are not granted yet
    requestMediaPerm();
  }

  const toggleCameraType = () => {
    type === CameraType.back
      ? setType(CameraType.front)
      : setType(CameraType.back);
  };

  const pickVideo = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
    });

    if (!result.canceled) {
      setVideoUri(result.assets[0].uri);
      setStep(CreateContentStep.review);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <Camera
        style={{ height: (width * 16) / 9, width: width }}
        type={type}
        ratio="16:9"
        ref={camRef}
      />
      <SafeAreaView style={{ position: 'absolute', top: 0 }}>
        {isRecording ? (
          <CountdownProgressBar duration={MAX_DURATION * 1000} />
        ) : (
          <Ionicons
            name="close"
            size={45}
            style={{ padding: 10 }}
            color="rgba(120, 120, 120, 0.9)"
            onPress={() => {
              navigation.goBack();
            }}
          />
        )}
      </SafeAreaView>
      <View style={{ ...styles.buttonContainer, width: width }}>
        <MaterialIcons.Button
          name="video-collection"
          size={40}
          color="#fff"
          iconStyle={{ padding: 0, marginRight: 0 }}
          backgroundColor="transparent"
          onPress={pickVideo}
        />
        <Pressable
          style={{ ...styles.shutterContainer, padding: isRecording ? 12 : 4 }}
          onPress={() => {
            if (!isRecording) {
              setIsRecording(true);
              camRef.current
                ?.recordAsync({
                  maxDuration: MAX_DURATION,
                })
                .then((output) => {
                  setVideoUri(output.uri);
                  MediaLibrary.saveToLibraryAsync(output.uri);
                  setIsRecording(false);
                  setStep(CreateContentStep.review);
                });
            } else {
              camRef.current?.stopRecording();
              setIsRecording(false);
            }
          }}
        >
          <View
            style={{
              ...styles.shutterButton,
              borderRadius: isRecording ? 9 : SHUTTER_BTN_SIZE,
            }}
          />
        </Pressable>
        <MaterialIcons.Button
          name={
            Platform.OS === 'android'
              ? 'flip-camera-android'
              : 'flip-camera-ios'
          }
          size={40}
          color="#fff"
          iconStyle={{ padding: 0, marginRight: 0 }}
          backgroundColor="transparent"
          onPress={toggleCameraType}
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
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#000',
    position: 'absolute',
    bottom: 0,
    height: '12%',
    paddingLeft: '3%',
    paddingRight: '3%',
  },
  shutterContainer: {
    height: SHUTTER_BTN_SIZE,
    width: SHUTTER_BTN_SIZE,
    borderRadius: SHUTTER_BTN_SIZE,
    borderWidth: 3,
    borderColor: '#fff',
  },
  shutterButton: {
    flex: 1,
    backgroundColor: colors.defaultTheme,
  },
});
