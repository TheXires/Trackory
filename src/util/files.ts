import { CustomError } from '../types/error';

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
