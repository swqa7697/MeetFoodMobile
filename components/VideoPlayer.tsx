import { useRef, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Video, ResizeMode } from 'expo-av';

export const VideoPlayer = () => {
  const video = useRef(null);
  const [status, setStatus] = useState({});

  return (
    <View>
      <Video></Video>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  video: {},
});
