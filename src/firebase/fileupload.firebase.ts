import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import { CustomError } from '../types/error';
import { auth } from './init.firebase';

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
    const currentUserId = auth.currentUser?.uid;
    if (!currentUserId) throw new CustomError('auth/no-valid-user');

    // https://github.com/expo/expo/issues/2402#issuecomment-443726662
    const blob: Blob = await new Promise((resolve) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = () => {
        resolve(xhr.response);
      };
      xhr.onerror = (error) => {
        console.error(error);
        throw new CustomError('unable-to-upload-image');
      };
      xhr.responseType = 'blob';
      xhr.open('GET', imageUri, true);
      xhr.send(null);
    });

    const fileRef = ref(getStorage(), `${currentUserId}/images/${Date.now()}.jpg`);
    await uploadBytes(fileRef, blob);

    const downloadUrl = await getDownloadURL(fileRef);
    return downloadUrl;
  } catch (error: any) {
    console.error(error);
    if (error.code != null) throw new CustomError(error.code, error.message);
    throw new CustomError('unable-to-upload-image', error);
  }
};

/**
 * get the array buffer of the file at the uri
 *
 * @param fileUri
 * @returns
 */
export const getArrayBuffer = async (fileUri: string): Promise<ArrayBuffer> => {
  // https://github.com/expo/expo/issues/2402#issuecomment-443726662
  const buffer: ArrayBuffer = await new Promise((resolve) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = () => {
      resolve(xhr.response);
    };
    xhr.onerror = (error) => {
      console.error(error);
      throw new CustomError('unable-to-upload-image');
    };
    xhr.responseType = 'arraybuffer';
    xhr.open('GET', fileUri, true);
    xhr.send(null);
  });

  return buffer;
};
