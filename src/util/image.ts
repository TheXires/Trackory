import * as ImageManipulator from 'expo-image-manipulator';
import * as ImagePicker from 'expo-image-picker';
import { Alert } from 'react-native';
import { i18n } from '../i18n/i18n';

/**
 * takes a picture
 *
 * @returns image file url on success, otherwise undefined
 */
export const takeImage = async (): Promise<string | null> => {
  try {
    const capturedImage = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.5,
    });
    if (capturedImage.cancelled) return null;
    const optimizedImage = await ImageManipulator.manipulateAsync(
      capturedImage.uri,
      [{ resize: { width: 400 } }],
      {
        compress: 0.5,
        format: ImageManipulator.SaveFormat.JPEG,
      },
    );
    return optimizedImage.uri;
  } catch (error: any) {
    Alert.alert(
      i18n.t('errorTitle'),
      i18n.t(error.code, { defaults: [{ scope: 'unexpectedError' }] }),
    );
  }
  return null;
};

/**
 * opens gallery to select a picture
 *
 * @returns image file url on success, otherwise undefined
 */
export const selectImage = async (): Promise<string | undefined> => {
  try {
    const selectedImage = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [1, 1],
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.5,
    });
    if (selectedImage.cancelled) return undefined;
    const optimizedImage = await ImageManipulator.manipulateAsync(
      selectedImage.uri,
      [{ resize: { width: 400 } }],
      {
        compress: 0.5,
        format: ImageManipulator.SaveFormat.JPEG,
      },
    );
    return optimizedImage.uri;
  } catch (error: any) {
    Alert.alert(
      i18n.t('errorTitle'),
      i18n.t(error.code, { defaults: [{ scope: 'unexpectedError' }] }),
    );
  }
  return undefined;
};
