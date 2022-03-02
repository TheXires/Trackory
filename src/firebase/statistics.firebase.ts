import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import functions from '@react-native-firebase/functions';
import { CustomError } from '../types/error';
import { DailyStatistic, WeightHistory } from '../types/statistics';

/**
 * calling cloudfunction to create and update daily statistics
 */
export const firebaseUpdateStatistics = async () => {
  try {
    await functions().httpsCallable('createDailyStatistics')();
  } catch (error: any) {
    console.error('updateStatistics', error);
    if (error.code != null) throw new CustomError(error.code, error.message);
    throw new CustomError('unable-to-update-statistics', error.message);
  }
};

/**
 * gets the daily statistics of the current user
 *
 * @returns array of daily statistics
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
    if (!response.data()?.data) return null;
    return response.data()?.data;
  } catch (error: any) {
    console.error('firebaseGetDailyStatistics error: ', error);
    if (error.code != null) throw new CustomError(error.code, error.message);
    throw new CustomError('unable-to-get-statistics', error.message);
  }
};

/**
 * gets the weight history of the current user
 *
 * @returns
 */
export const firebaseGetWeightHistory = async (): Promise<WeightHistory[] | null> => {
  try {
    const currentUserId = auth().currentUser?.uid;
    if (!currentUserId) throw new CustomError('auth/no-valid-user');
    const response = await firestore()
      .collection('users')
      .doc(currentUserId)
      .collection('statistics')
      .doc('weightStatistic')
      .get();
    if (!response.data()?.weightHistory) return null;
    return response.data()?.weightHistory;
  } catch (error: any) {
    console.error('firebaseGetWeightHistory error:', error);
    if (error.code != null) throw new CustomError(error.code, error.message);
    throw new CustomError('unable-to-get-statistics', error.message);
  }
};
