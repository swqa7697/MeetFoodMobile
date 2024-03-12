import {
  Alert,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { FC, useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuthenticator } from '@aws-amplify/ui-react-native';
import axios from 'axios';
import * as FileSystem from 'expo-file-system';
import * as ImagePicker from 'expo-image-picker';
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { CreateContentStep } from '../../util/types';
import { colors } from '../../util/constants';
import { BASE_URL } from '../../util/devUtils';
import { LoadingIndicator } from '../LoadingIndicator';

const VIDEO_SIZE_LIMIT = 200 * 1e6;
const COVER_IMAGE_SIZE_LIMIT = 2 * 1e6;

interface PublishStepProps {
  videoUri: string;
  setStep: (newStep: CreateContentStep) => void;
}

interface FileInfoWithSize {
  size: number;
}

interface UploadVideoApiRes {
  videoUrl: string;
}

interface UploadCoverImageApiRes {
  imageUrl: string;
}

export const PublishStep: FC<PublishStepProps> = ({ videoUri, setStep }) => {
  const [postTitle, setPostTitle] = useState('');
  const [restaurantName, setRestaurantName] = useState('');
  const [imageUri, setImageUri] = useState('');
  const [canUpload, setCanUpload] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const { user } = useAuthenticator((context) => [context.user]);

  useEffect(() => {
    if (
      postTitle.length > 0 &&
      restaurantName.length > 0 &&
      imageUri.length > 0
    ) {
      setCanUpload(true);
    } else {
      setCanUpload(false);
    }
  }, [postTitle, restaurantName, imageUri]);

  const pickCoverImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  const publishHandler = () => {
    if (!canUpload) {
      requiredFieldAlert();
    } else {
      confirmAlert();
    }
  };

  const requiredFieldAlert = () => {
    Alert.alert(
      'Missing Required Field(s)',
      'Fields below are required:\npost name, restaurant name, cover image',
      [{ text: 'OK' }],
    );
  };

  const confirmAlert = () => {
    Alert.alert('Confirm to proceed', 'Upload files and create the new post', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'OK', onPress: createNewPost },
    ]);
  };

  const videoSizeAlert = () => {
    Alert.alert('Video File Size Invalid', 'Video size: 0 - 200 MB', [
      { text: 'OK' },
    ]);
  };

  const imageSizeAlert = () => {
    Alert.alert('Image File Size Invalid', 'Image size: 0 - 2 MB', [
      { text: 'OK' },
    ]);
  };

  const createNewPost = async () => {
    // File Size Check - Limits: Video 200 MB, Image 2 MB
    const videoInfo = (await FileSystem.getInfoAsync(videoUri, {
      size: true,
    })) as FileInfoWithSize;

    if (videoInfo.size > VIDEO_SIZE_LIMIT) {
      videoSizeAlert();
      return;
    }

    const imageInfo = (await FileSystem.getInfoAsync(imageUri, {
      size: true,
    })) as FileInfoWithSize;

    if (imageInfo.size > COVER_IMAGE_SIZE_LIMIT) {
      imageSizeAlert();
      return;
    }

    // Get Access Token
    const accessToken = user
      ?.getSignInUserSession()
      ?.getAccessToken()
      .getJwtToken() as string;

    try {
      setIsUploading(true);

      // Upload Video - /api/v1/video/upload
      const uploadVideoRes = await FileSystem.uploadAsync(
        `${BASE_URL}/api/v1/video/upload`,
        videoUri,
        {
          fieldName: 'video-content',
          httpMethod: 'POST',
          uploadType: FileSystem.FileSystemUploadType.MULTIPART,
          headers: {
            'cognito-token': accessToken,
          },
        },
      );

      const { videoUrl } = JSON.parse(uploadVideoRes.body) as UploadVideoApiRes;

      // Upload Cover Image - /api/v1/video/coverImage
      const uploadImageRes = await FileSystem.uploadAsync(
        `${BASE_URL}/api/v1/video/coverImage`,
        imageUri,
        {
          fieldName: 'cover-image',
          httpMethod: 'POST',
          uploadType: FileSystem.FileSystemUploadType.MULTIPART,
          headers: {
            'cognito-token': accessToken,
          },
        },
      );

      const { imageUrl } = JSON.parse(
        uploadImageRes.body,
      ) as UploadCoverImageApiRes;

      // Create New Video Post - /api/v1/video/new
      await axios.post(
        `${BASE_URL}/api/v1/video/new`,
        {
          postTitle,
          imageUrl,
          videoUrl,
          restaurantName,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'cognito-token': accessToken,
          },
        },
      );

      // New Post Created Successfully
      setIsUploading(false);
      setStep(CreateContentStep.success);
    } catch (err) {
      setIsUploading(false);
      Alert.alert(
        'Error',
        err instanceof Error ? err.message : 'Unknown Error',
        [{ text: 'OK' }],
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {isUploading ? (
        <View style={styles.loadingContainer}>
          <Text style={{ fontSize: 20 }}>
            Publishing your video post now...
          </Text>
          <LoadingIndicator duration={2000} spinnerSize={60} />
        </View>
      ) : (
        <>
          {/* Back Button */}
          <View style={{ height: 65 }}>
            <View style={styles.backButtonContainer}>
              <Ionicons.Button
                name="arrow-back"
                size={26}
                borderRadius={26}
                color={colors.focused}
                backgroundColor={colors.defaultBg}
                iconStyle={{ marginRight: 0 }}
                style={{ padding: 10, margin: 0 }}
                onPress={() => {
                  setStep(CreateContentStep.review);
                }}
              />
            </View>
          </View>
          {/* Header */}
          <SafeAreaView style={styles.headerContainer}>
            <Text style={styles.headerText}>New Post</Text>
          </SafeAreaView>
          {/* Forms */}
          <View style={{ flex: 1 }}>
            <Text style={styles.promptText}>Post Title</Text>
            <TextInput
              value={postTitle}
              onChangeText={setPostTitle}
              placeholder="Enter post title (up to 50 characters)"
              maxLength={50}
              style={styles.inputField}
            />
            <Text style={styles.promptText}>Restaurant Name</Text>
            <TextInput
              value={restaurantName}
              onChangeText={setRestaurantName}
              placeholder="Enter the name of the restaurant"
              maxLength={50}
              style={styles.inputField}
            />
            <Pressable style={styles.coverImageButton} onPress={pickCoverImage}>
              <FontAwesome name="photo" color={colors.defaultTheme} size={24} />
              <Text style={{ color: colors.defaultTheme, fontSize: 16 }}>
                Set Cover Image
              </Text>
            </Pressable>
            {imageUri.length > 0 && (
              <Image source={{ uri: imageUri }} style={styles.imagePreview} />
            )}
            <Pressable
              style={{
                ...styles.publishButton,
                backgroundColor: canUpload ? colors.defaultTheme : 'grey',
              }}
              onPress={publishHandler}
            >
              <Text style={styles.publishButtonText}>Publish</Text>
            </Pressable>
          </View>
        </>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.defaultBg,
  },
  backButtonContainer: {
    position: 'absolute',
    top: 10,
    left: 10,
  },
  headerContainer: {
    position: 'absolute',
    pointerEvents: 'box-none',
    alignItems: 'center',
    width: '100%',
    top: 18.5,
  },
  headerText: {
    fontSize: 20,
    fontWeight: '500',
  },
  promptText: {
    fontSize: 16,
    left: 9,
  },
  inputField: {
    borderWidth: 1,
    borderColor: 'grey',
    backgroundColor: '#fff',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    fontSize: 16,
    marginTop: 12,
    marginBottom: 18,
    marginHorizontal: 9,
  },
  coverImageButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    left: 9,
  },
  imagePreview: {
    alignSelf: 'center',
    height: '50%',
    width: '80%',
    marginTop: 15,
    resizeMode: 'contain',
  },
  publishButton: {
    marginTop: 'auto',
    marginBottom: '15%',
    marginHorizontal: 12,
    alignItems: 'center',
    padding: 12,
    borderRadius: 18,
  },
  publishButtonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '500',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 15,
  },
});
