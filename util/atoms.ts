import { atom } from 'jotai';
import { VideoPostItem } from './types';

export const videoItemListAtom = atom<VideoPostItem[]>([]);

// Only used for not strict (low risk) conditions
export const isCreateContentScreenAuthedAtom = atom<boolean>(false);
