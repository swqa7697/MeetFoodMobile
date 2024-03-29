import { Image, Text, View, StyleSheet, Pressable } from 'react-native';
import { FC } from 'react';
import { useNavigation } from 'expo-router';
import { ScreenNavigationProps } from '../util/types';

interface ItemCardProps {
  id: string;
  imgSource: string;
  dishTitle: string;
  restaurantName: string;
}

export const ItemCard: FC<ItemCardProps> = ({
  id,
  imgSource,
  dishTitle,
  restaurantName,
}) => {
  const navigation = useNavigation<ScreenNavigationProps>();

  return (
    <View style={styles.container}>
      <Pressable
        onPress={() => {
          navigation.navigate('video/[id]', { id: id });
        }}
      >
        <Image
          source={{
            uri: imgSource,
          }}
          height={240}
          style={styles.img}
        />
      </Pressable>
      <View style={styles.textContainer}>
        <Text style={styles.dishTitle}>{dishTitle}</Text>
        <Text style={styles.restaurantName}>{restaurantName}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexBasis: '46%',
    marginBottom: 15,
    marginHorizontal: '2%',
  },
  img: {
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  textContainer: {
    backgroundColor: '#fff',
    paddingBottom: 12,
    paddingHorizontal: 6,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  dishTitle: {
    fontSize: 18,
    fontWeight: '600',
    lineHeight: 30,
  },
  restaurantName: {
    fontWeight: '500',
    marginTop: 6,
  },
});
