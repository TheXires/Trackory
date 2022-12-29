import { Camera, CameraCapturedPicture } from 'expo-camera';
import * as ImageManipulator from 'expo-image-manipulator';
import * as ImagePicker from 'expo-image-picker';
import { Alert } from 'react-native';
import { i18n } from '../i18n/i18n';
import { CustomError } from '../types/error';

/**
 * takes a picture
 *
 * @returns image file url on success, otherwise undefined
 */
export const takeImage = async (camera: Camera | null): Promise<string | null> => {
  try {
    if (!camera) throw new CustomError('unexpectedError');
    const image = await camera.takePictureAsync({ quality: 0.5 });
    const optimizedImage = await optimizeImage(image);
    return optimizedImage;
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
export const selectImage = async (): Promise<string | null> => {
  try {
    const selectedImage = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [1, 1],
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.5,
    });
    if (selectedImage.cancelled) return null;
    const optimizedImage = await optimizeImage(selectedImage);
    return optimizedImage;
  } catch (error: any) {
    Alert.alert(
      i18n.t('errorTitle'),
      i18n.t(error.code, { defaults: [{ scope: 'unexpectedError' }] }),
    );
  }
  return null;
};

// TODO add documentation
export const optimizeImage = async (
  image: ImagePicker.ImageInfo | CameraCapturedPicture,
): Promise<string> => {
  const squareSize = 400;
  const result = await ImageManipulator.manipulateAsync(
    image.uri,
    [
      { resize: { width: squareSize } },
      {
        crop: {
          height: squareSize,
          originX: 0,
          // calculates the height of the bar over the 1:1 image
          originY: (image.height * (squareSize / image.width) - squareSize) / 2,
          width: squareSize,
        },
      },
    ],
    {
      compress: 0.5,
      format: ImageManipulator.SaveFormat.JPEG,
    },
  );
  return result.uri;
};

// TODO add documentation
export const getBestAspectRatio = async (camera: Camera | null): Promise<string> => {
  let bestAspectRatio = '4:3';
  const availableRatios = await camera?.getSupportedRatiosAsync();

  ['4:3', '1:1', '3:2', '5:3', '16:9'].every((ratio) => {
    if (availableRatios?.includes(ratio)) {
      bestAspectRatio = ratio;
      return false;
    }
    return true;
  });
  return bestAspectRatio;
};

// TODO add documentation
export const calculateAspectRatio = (ratio: string) => {
  const [width, height] = ratio.split(':').map(Number);
  return height / width;
};
