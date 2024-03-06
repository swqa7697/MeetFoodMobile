import { FlatList } from 'react-native';
import { useEffect, useState } from 'react';
import axios from 'axios';
import FontAwesome from '@expo/vector-icons/Ionicons';
import { ItemCard } from './ItemCard';
import { BASE_URL } from '../utils';

interface VideoPostItem {
  _id: string;
  countLike: number;
  postTitle: string;
  videoUrl: string;
  coverImageUrl: string;
  restaurantName: string;
}

export const ItemList = () => {
  const [videoPosts, setVideoPosts] = useState<VideoPostItem[]>([]);
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
      renderItem={({ item, index }) => (
        <ItemCard
          key={index}
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
