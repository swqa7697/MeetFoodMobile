import { FC, useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Video, ResizeMode, AVPlaybackStatusSuccess } from 'expo-av';
import { useNavigation } from 'expo-router';
import FontAwesome from '@expo/vector-icons/Ionicons';
import { ScreenNavigationProps } from '../util/types';

interface VideoPlayerProps {
  videoUrl: string;
  dishTitle: string;
  restaurantName: string;
  videoHeight: number;
  posterUrl: string;
  thisIndex: number;
  activeVideoIndex: number;
}

export const VideoPlayer: FC<VideoPlayerProps> = ({
  videoUrl,
  dishTitle,
  restaurantName,
  videoHeight,
  posterUrl,
  thisIndex,
  activeVideoIndex,
}) => {
  const video = useRef<Video>(null);
  const [status, setStatus] = useState<Partial<AVPlaybackStatusSuccess>>({});
  const navigation = useNavigation<ScreenNavigationProps>();
  const insets = useSafeAreaInsets();

  const toggleVideoPlay = () => {
    if (video.current) {
      status.isPlaying ? video.current.pauseAsync() : video.current.playAsync();
    }
  };

  useEffect(() => {
    thisIndex === activeVideoIndex
      ? video.current?.playAsync()
      : video.current?.pauseAsync();
  }, [activeVideoIndex]);

  return (
    <View style={{ ...styles.container, height: videoHeight }}>
      <Video
        ref={video}
        style={styles.video}
        source={{ uri: videoUrl }}
        resizeMode={ResizeMode.COVER}
        useNativeControls={false}
        isLooping
        usePoster={true}
        posterSource={{ uri: posterUrl }}
        posterStyle={{ height: videoHeight, resizeMode: 'cover' }}
        onPlaybackStatusUpdate={(status) => {
          if (status.isLoaded) {
            setStatus(status);
          }
        }}
      />
      <View
        style={{ ...styles.controlContainer, ...styles.playButtonContainer }}
      >
        {status.isPlaying ? null : (
          <FontAwesome
            name="play-circle"
            size={80}
            color="rgba(0, 0, 0, 0.65)"
            backgroundColor="transparent"
          />
        )}
      </View>
      <View
        style={{
          ...styles.controlContainer,
          bottom: insets.bottom,
          paddingBottom: 15,
          paddingLeft: 12,
        }}
      >
        <Text style={styles.dishTitle}>{dishTitle}</Text>
        <Text style={styles.restaurantName}>{restaurantName}</Text>
      </View>
      <View
        style={{
          ...styles.controlContainer,
          height: '100%',
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          padding: 10,
        }}
      >
        <Pressable
          style={{ height: '100%', width: '100%' }}
          onPress={toggleVideoPlay}
        />
      </View>
      <View style={{ ...styles.controlContainer, left: insets.left }}>
        <FontAwesome.Button
          name="arrow-back"
          size={26}
          backgroundColor="transparent"
          color="rgba(120, 120, 120, 0.9)"
          style={{ padding: 20 }}
          onPress={() => {
            navigation.navigate('index');
            video.current?.pauseAsync();
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  video: {
    height: '100%',
    width: '100%',
  },
  controlContainer: {
    position: 'absolute',
    pointerEvents: 'box-none',
  },
  playButtonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%',
  },
  dishTitle: {
    fontSize: 18,
    color: '#fff',
    fontWeight: '500',
  },
  restaurantName: {
    color: '#fff',
  },
});
