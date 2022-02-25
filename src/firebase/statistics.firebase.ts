import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import functions from '@react-native-firebase/functions';
import { DAILY_STATISTICS_LAST_UPDATED } from '../constants';
import { CustomError } from '../types/error';
import { DailyStatistic } from '../types/statistics';

/**
 * calling cloudfunction to create and update daily statistics
 */
export const firebaseUpdateStatistics = async () => {
  try {
    await functions().httpsCallable('createDailyStatistics')();
  } catch (error: any) {
    console.error('updateStatistics', error);
    if (error.code != null) throw new CustomError(error.code, error.message);
    throw new CustomError('unable-to-update-statistics', error);
  }
};

/**
 * gets the daily statistics of the logged in user if modified after last update
 *
 * @param lastUpdated time of last update in ms or 0 if first call
 * @returns array of
 */
export const firebaseGetDailyStatistics = async (): Promise<DailyStatistic[] | null> => {
  try {
    const currentUserId = auth().currentUser?.uid;
    if (!currentUserId) throw new CustomError('auth/no-valid-user');
    const response = await firestore()
      .collection('users')
      .doc(currentUserId)
      .collection('statistics')
      .doc('dailyStatistics')
      .get();
    AsyncStorage.setItem(DAILY_STATISTICS_LAST_UPDATED, Date.now().toString());
    if (!response.data()?.data) return null;
    return response.data()?.data;
  } catch (error: any) {
    console.error('firebaseGetDailyStatistics error: ', error);
    if (error.code != null) throw new CustomError(error.code, error.message);
    throw new CustomError('unable-to-get-statistics', error);
  }
};
