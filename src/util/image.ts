import * as ImageManipulator from 'expo-image-manipulator';
import * as ImagePicker from 'expo-image-picker';
import { Alert } from 'react-native';
import { i18n } from '../i18n/i18n';

/**
 * takes a picture
 *
 * @returns image file url on success, otherwise undefined
 */
export const takeImage = async (): Promise<string | undefined> => {
  try {
    const capturedImage = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      base64: true,
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.5,
    });
    if (!capturedImage.assets || !capturedImage.assets[0].base64) return undefined;
    const optimizedImage = await ImageManipulator.manipulateAsync(
      capturedImage.assets[0].base64,
      [{ resize: { width: 400 } }],
      {
        base64: true,
        compress: 0.5,
        format: ImageManipulator.SaveFormat.JPEG,
      },
    );
    return `data:image/jpeg;base64,${optimizedImage.base64}`;
  } catch (error: any) {
    Alert.alert(
      i18n.t('errorTitle'),
      i18n.t(error.code, { defaults: [{ scope: 'unexpectedError' }] }),
    );
  }
  return undefined;
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
    if (!selectedImage.assets) return undefined;
    const optimizedImage = await ImageManipulator.manipulateAsync(
      selectedImage.assets[0].uri,
      [{ resize: { width: 300 } }],
      {
        base64: true,
        compress: 0.5,
        format: ImageManipulator.SaveFormat.JPEG,
      },
    );
    return `data:image/jpeg;base64,${optimizedImage.base64}`;
  } catch (error: any) {
    Alert.alert(
      i18n.t('errorTitle'),
      i18n.t(error.code, { defaults: [{ scope: 'unexpectedError' }] }),
    );
    console.error(error);
  }
  return undefined;
};
