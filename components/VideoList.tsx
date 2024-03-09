import { FlatList, Image, useWindowDimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { FC, useState } from 'react';
import { useAtomValue } from 'jotai';
import { VideoPlayer } from './VideoPlayer';
import { videoItemListAtom } from '../util/atom';

interface VideoListProps {
  currVideoId: string;
}

export const VideoList: FC<VideoListProps> = ({ currVideoId }) => {
  const { height } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const videoHeight = height - insets.top - insets.bottom;

  const videoPosts = useAtomValue(videoItemListAtom);
  const [activeVideoIndex, setActiveVideoIndex] = useState(-1);

  return (
    <FlatList
      style={{ width: '100%' }}
      contentContainerStyle={{ width: '100%' }}
      snapToInterval={videoHeight}
      decelerationRate="fast"
      viewabilityConfig={{
        itemVisiblePercentThreshold: 90,
      }}
      onViewableItemsChanged={({ viewableItems }) => {
        if (viewableItems.length > 0) {
          setActiveVideoIndex(viewableItems[0].index as number);
        }
      }}
      data={videoPosts}
      initialScrollIndex={videoPosts.findIndex((v) => v._id === currVideoId)}
      getItemLayout={(data, index) => ({
        length: videoHeight,
        offset: videoHeight * index,
        index,
      })}
      renderItem={({ item, index }) => {
        return Math.abs(activeVideoIndex - index) <= 1 ? (
          <VideoPlayer
            key={item._id}
            videoUrl={item.videoUrl}
            dishTitle={item.postTitle}
            restaurantName={item.restaurantName}
            videoHeight={videoHeight}
            posterUrl={item.coverImageUrl}
            thisIndex={index}
            activeVideoIndex={activeVideoIndex}
          />
        ) : (
          <Image
            source={{ uri: item.coverImageUrl }}
            height={videoHeight}
            resizeMode="cover"
          />
        );
      }}
    />
  );
};
