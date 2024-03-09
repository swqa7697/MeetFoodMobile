import { FlatList } from 'react-native';
import { useEffect, useState } from 'react';
import { useAtom } from 'jotai';
import axios from 'axios';
import FontAwesome from '@expo/vector-icons/Ionicons';
import { ItemCard } from './ItemCard';
import { BASE_URL } from '../util/devUtils';
import { VideoPostItem } from '../util/types';
import { videoItemListAtom } from '../util/atom';

export const ItemList = () => {
  const [videoPosts, setVideoPosts] = useAtom(videoItemListAtom);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get<VideoPostItem[]>(`${BASE_URL}/api/v1/video/videos`)
      .then((result) => {
        setVideoPosts(result.data);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <FontAwesome name="reload" size={60} />;
  }

  return (
    <FlatList
      data={videoPosts}
      renderItem={({ item }) => (
        <ItemCard
          key={item._id}
          id={item._id}
          imgSource={item.coverImageUrl}
          dishTitle={item.postTitle}
          restaurantName={item.restaurantName}
        />
      )}
      numColumns={2}
    />
  );
};
