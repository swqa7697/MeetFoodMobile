import { Platform } from 'react-native';
import { back_end_url, port, isTest } from '../config/config.json';

// Only used for dev testing
const getLocalBaseUrl = () => {
  return Platform.OS === 'android'
    ? 'http://10.0.2.2:3000'
    : 'http://localhost:3000';
};

const getBaseUrl = () => {
  return `http://${back_end_url}:${port}`;
};

export const BASE_URL = isTest ? getLocalBaseUrl() : getBaseUrl();
