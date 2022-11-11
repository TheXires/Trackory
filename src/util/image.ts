import { Alert } from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { i18n } from '../i18n/i18n';
import { CustomError } from '../types/error';

/**
 * opens camera to take a picture
 *
 * @returns image file url on success, otherwise undefined
 */
export const takeImage = async (): Promise<string | undefined> => {
  try {
    const res = await launchCamera({
      cameraType: 'back',
      maxHeight: 400,
      maxWidth: 400,
      mediaType: 'photo',
      quality: 0.9,
    });
    if (res.didCancel) return undefined;
    if (res.errorCode) throw new CustomError(res.errorCode);
    if (!res.assets) return undefined;
    return res.assets[0].uri;
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
    const res = await launchImageLibrary({
      maxHeight: 400,
      maxWidth: 400,
      mediaType: 'photo',
      quality: 0.9,
      selectionLimit: 1,
    });
    if (res.didCancel) return undefined;
    if (res.errorCode) throw new CustomError(res.errorCode);
    if (!res.assets) return undefined;
    return res.assets[0].uri;
  } catch (error: any) {
    Alert.alert(
      i18n.t('errorTitle'),
      i18n.t(error.code, { defaults: [{ scope: 'unexpectedError' }] }),
    );
  }
  return undefined;
};
