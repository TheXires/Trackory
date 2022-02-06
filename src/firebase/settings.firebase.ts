import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { Settings } from '../interfaces/settings';

/**
 * get the settings for the current user
 *
 * @returns the settings of the user or undefined when an error occurred
 */
export const firebaseGetUserSettings = async (): Promise<Settings | undefined> => {
  try {
    const userId = auth().currentUser?.uid;
    if (!userId) throw 'no current user found';
    const userDoc = await firestore().collection('users').doc(userId).get();
    const userData = userDoc.data();
    if (!userData) throw 'no data for current user found';
    return userData.settings;
  } catch (error) {
    console.error(error);
  }
  return undefined;
};

/**
 * set the settings for the current user in firestore
 *
 * @param settings the new settings to set
 * @returns 1 on success, otherwise -1
 */
export const firebaseUpdateUserSettings = async (settings: Settings): Promise<1 | -1> => {
  try {
    const userId = auth().currentUser?.uid;
    if (!userId) throw 'no current user found';
    await firestore().collection('users').doc(userId).update({ settings });
    return 1;
  } catch (error) {
    console.error(error);
  }
  return -1;
};
