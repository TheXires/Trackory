import { doc, getDoc } from 'firebase/firestore';
import { CustomError } from '../types/error';
import { DailyStatistic, WeightHistory } from '../types/statistics';
import { auth, db } from './init.firebase';

/**
 * calling cloudfunction to create and update daily statistics
 */
export const firebaseUpdateStatistics = async () => {
  try {
    // TODO to be fixed
    throw new CustomError('functionCurrentlyDisabled');
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
    const currentUserId = auth.currentUser?.uid;
    if (!currentUserId) throw new CustomError('auth/no-valid-user');
    const response = await getDoc(doc(db, 'users', currentUserId, 'statistics', 'dailyStatistics'));
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
 * @returns array of the users weight history
 */
export const firebaseGetWeightHistory = async (): Promise<WeightHistory[] | null> => {
  try {
    const currentUserId = auth.currentUser?.uid;
    if (!currentUserId) throw new CustomError('auth/no-valid-user');
    const response = await getDoc(doc(db, 'users', currentUserId, 'statistics', 'weightStatistic'));
    if (!response.data()?.weightHistory) return null;
    return response.data()?.weightHistory;
  } catch (error: any) {
    console.error('firebaseGetWeightHistory error:', error);
    if (error.code != null) throw new CustomError(error.code, error.message);
    throw new CustomError('unable-to-get-statistics', error.message);
  }
};
