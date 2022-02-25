import auth from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';
import { CustomError } from '../types/error';

/**
 * upload the image at the uri to firebase storage
 *
 * @param imageUri
 * @error auth/no-valid-user
 * @error unable-to-upload-image
 * @returns url of the image after the upload
 */
export const firebaseImageUpload = async (imageUri: string): Promise<string> => {
  try {
    const currentUserId = auth().currentUser?.uid;
    if (!currentUserId) throw new CustomError('auth/no-valid-user');
    const ref = storage().ref(`${currentUserId}/images/${Date.now()}.jpg`);
    await ref.putFile(imageUri);
    const downloadUrl = await ref.getDownloadURL();
    return downloadUrl;
  } catch (error: any) {
    console.error(error);
    if (error.code != null) throw new CustomError(error.code, error.message);
    throw new CustomError('unable-to-upload-image', error);
  }
};
