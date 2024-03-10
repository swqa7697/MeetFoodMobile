import { Platform } from 'react-native';
import backendConfig from '../config/config.json';

// Only used for dev testing
const getLocalBaseUrl = () => {
  return Platform.OS === 'android'
    ? 'http://10.0.2.2:3000'
    : 'http://localhost:3000';
};

export const LOCAL_BASE_URL = getLocalBaseUrl();

export const BASE_URL = `http://${backendConfig.back_end_url}:${backendConfig.port}`;
