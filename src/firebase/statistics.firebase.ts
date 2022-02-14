import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import functions from '@react-native-firebase/functions';
import { DAILY_STATISTICS_LAST_UPDATED } from '../constants';
import { CustomError } from '../interfaces/error';
import { DailyStatistic } from '../interfaces/statistics';

/**
 * calling cloudfunction to create and update daily statistics
 */
export const firebaseUpdateStatistics = async () => {
  try {
    await functions().httpsCallable('createStatistics')();
  } catch (error) {
    console.error('updateStatistics', error);
  }
};

/**
 * gets the daily statistics of the logged in user if modified after last update
 *
 * @param lastUpdated time of last update in ms or 0 if first call
 * @returns array of
 */
export const firebaseGetDailyStatistics = async (
  lastUpdated: number,
): Promise<DailyStatistic[]> => {
  try {
    const currentUserId = auth().currentUser?.uid;
    if (!currentUserId) throw new CustomError('auth/no-valid-user');
    const response = await firestore()
      .collection('users')
      .doc(currentUserId)
      .collection('statistics')
      .where('lastModified', '>=', lastUpdated)
      .get();
    AsyncStorage.setItem(DAILY_STATISTICS_LAST_UPDATED, Date.now().toString());
    if (!response.docs[0]) return [];
    return response.docs[0].data().data;
  } catch (error) {
    console.error('firebaseGetDailyStatistics error: ', error);
  }
  return [];
};
