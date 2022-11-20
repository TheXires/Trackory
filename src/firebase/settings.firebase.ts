import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { CustomError } from '../types/error';
import { Settings } from '../types/settings';
import { auth, db } from './init.firebase';

/**
 * get the settings for the current user
 *
 * @error auth/no-valid-user
 * @error unable-to-get-settings
 * @returns the settings of the user or undefined when an error occurred
 */
export const firebaseGetUserSettings = async (): Promise<Settings> => {
  try {
    const userId = auth.currentUser?.uid;
    if (!userId) throw new CustomError('auth/no-valid-user');
    // const userDoc = await firestore().collection('users').doc(userId).get();
    const userDoc = await getDoc(doc(db, 'users', userId));
    const userData = userDoc.data();
    console.log('userData: ', userData);
    if (!userData?.settings)
      throw new CustomError('unable-to-get-settings', 'no data for current user found');
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
    const userId = auth.currentUser?.uid;
    if (!userId) throw new CustomError('auth/no-valid-user');
    // await firestore().collection('users').doc(userId).update({ settings });
    await updateDoc(doc(db, 'users', userId), { settings });
  } catch (error: any) {
    console.error(error);
    if (error.code != null) throw new CustomError(error.code, error.message);
    throw new CustomError('unable-to-set-settings', error);
  }
};
