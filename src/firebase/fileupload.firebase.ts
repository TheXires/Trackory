import auth from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';
import { CustomError } from '../interfaces/error';

/**
 * upload the image at the uri to firebase storage
 *
 * @param itemId
 * @param imageUri
 * @error auth/no-valid-user
 * @returns url of the image after the upload
 */
export const firebaseImageUpload = async (
  itemId: string,
  imageUri: string,
): Promise<string> => {
  try {
    const currentUserId = auth().currentUser?.uid;
    if (!currentUserId) throw new CustomError('auth/no-valid-user');
    await storage().ref(`${currentUserId}/images/${itemId}.jpg`).putFile(imageUri);
    const downloadUrl = await storage()
      .ref(`${currentUserId}/images/${itemId}.jpg`)
      .getDownloadURL();
    return downloadUrl;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
