import { FlatList, RefreshControl } from 'react-native';
import { useEffect, useState } from 'react';
import { useAtom } from 'jotai';
import axios from 'axios';
import { ItemCard } from './ItemCard';
import { BASE_URL } from '../util/devUtils';
import { VideoPostItem } from '../util/types';
import { videoItemListAtom } from '../util/atoms';
import { LoadingIndicator } from './LoadingIndicator';

// Only for dev, will be moved to settings
const MAX_LENGTH = 10;

export const ItemList = () => {
  const [videoPosts, setVideoPosts] = useAtom(videoItemListAtom);
  const [loading, setLoading] = useState(false);

  const fetchVideoPosts = () => {
    setLoading(true);
    axios
      .get<VideoPostItem[]>(
        `${BASE_URL}/api/v1/video/videos?size=${MAX_LENGTH}`,
      )
      .then((result) => {
        setVideoPosts(result.data);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchVideoPosts();
  }, []);

  if (loading) {
    return <LoadingIndicator duration={2000} spinnerSize={60} />;
  }

  return (
    <FlatList
      data={videoPosts}
      numColumns={2}
      renderItem={({ item, index }) => (
        <ItemCard
          key={index}
          id={item._id}
          imgSource={item.coverImageUrl}
          dishTitle={item.postTitle}
          restaurantName={item.restaurantName}
        />
      )}
      refreshControl={
        <RefreshControl refreshing={loading} onRefresh={fetchVideoPosts} />
      }
    />
  );
};
