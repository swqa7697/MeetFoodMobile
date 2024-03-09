import { atom } from 'jotai';
import { VideoPostItem } from './types';

export const videoItemListAtom = atom<VideoPostItem[]>([]);
