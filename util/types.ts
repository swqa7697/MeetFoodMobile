import { NavigationProp } from '@react-navigation/native';

type RootStackParamList = {
  index: undefined;
  createContent: undefined;
  userProfile: undefined;
  'video/[id]': { id: string };
};

export type ScreenNavigationProps = NavigationProp<RootStackParamList>;

export interface VideoPostItem {
  _id: string;
  countLike: number;
  postTitle: string;
  videoUrl: string;
  coverImageUrl: string;
  restaurantName: string;
}

export enum CreateContentStep {
  record,
  review,
  publish,
  success,
}
