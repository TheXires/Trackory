import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { CustomError } from '../types/error';
import { Settings } from '../types/settings';

/**
 * get the settings for the current user
 *
 * @error auth/no-valid-user
 * @error unable-to-get-settings
 * @returns the settings of the user or undefined when an error occurred
 */
export const firebaseGetUserSettings = async (): Promise<Settings> => {
  try {
    const userId = auth().currentUser?.uid;
    if (!userId) throw new CustomError('auth/no-valid-user');
    const userDoc = await firestore().collection('users').doc(userId).get();
    const userData = userDoc.data();
    if (!userData) throw 'no data for current user found';
    return userData.settings;
  } catch (error: any) {
    console.error(error);
    if (error.code != null) throw new CustomError(error.code, error.message);
    throw new CustomError('unable-to-get-settings', error);
  }
};

/**
 * set the settings for the current user in firestore
 *
 * @param settings the new settings to set
 * @error auth/no-valid-user
 * @error unable-to-set-settings
 * @returns 1 on success, otherwise -1
 */
export const firebaseUpdateUserSettings = async (settings: Settings): Promise<void> => {
  try {
    const userId = auth().currentUser?.uid;
    if (!userId) throw new CustomError('auth/no-valid-user');
    await firestore().collection('users').doc(userId).update({ settings });
  } catch (error: any) {
    console.error(error);
    if (error.code != null) throw new CustomError(error.code, error.message);
    throw new CustomError('unable-to-set-settings', error);
  }
};
