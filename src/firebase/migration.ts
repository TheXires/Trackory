/* eslint-disable no-console */
import dateformat from 'dateformat';
import { collection, doc, getDoc, getDocs, query, updateDoc, where } from 'firebase/firestore';
import { CustomError } from '../types/error';
import { ConsumedItem } from '../types/item';
import { auth, db } from './init.firebase';

/**
 * migration
 */
export const doMigration = async (): Promise<void> => {
  try {
    console.log('started migrations');
    await firebaseMigrateConsumptions(0);
    await firebaseMigrateDailyStatistics();
    await firebaseMigrateWeightStatistics();
  } catch (error: any) {
    console.error('doMigration error: ', error);
    if (error.code != null) throw new CustomError(error.code, error.message);
    throw new CustomError('unexpectedError', error);
  }
};

/**
 * gets all consumptions of a specific day if they are modified after last update
 *
 * @param lastUpdated time of last update. 0 to fetch all
 * @param daysInThePast
 * @error unable-to-get-consumption
 * @returns array with new consumed items or undefined if there are no changes after last update
 */
const firebaseMigrateConsumptions = async (
  lastUpdated: number,
): Promise<ConsumedItem[] | undefined> => {
  try {
    const currentUserId = auth.currentUser?.uid;
    if (!currentUserId) throw new CustomError('auth/no-valid-user');
    const response = await getDocs(
      query(
        collection(db, 'users', currentUserId, 'consumptions'),
        where('lastModified', '>=', lastUpdated),
      ),
    );
    if (response.docs.length < 1) return undefined;
    if (response.docs[0].data().deleted) return [];
    console.log('********************');
    response.docs.forEach(async (singleDoc, i) => {
      console.log(
        `${i}: ${singleDoc.data().date} -> ${dateformat(singleDoc.data().date, 'yyyy-mm-dd')}`,
      );
      await updateDoc(singleDoc.ref, {
        date: dateformat(singleDoc.data().date, 'yyyy-mm-dd'),
        lastModified: Date.now(),
      });
    });
    console.log('total: ', response.docs.length);
    console.log('********************');
    return response.docs[0].data().items;
  } catch (error: any) {
    console.error(`getConsumptions error: ${error}`);
    if (error.code != null) throw new CustomError(error.code, error.message);
    throw new CustomError('unable-to-get-consumption', error);
  }
};

const firebaseMigrateDailyStatistics = async (): Promise<void> => {
  console.log('called firebaseMigrateStatistics');
  try {
    const currentUserId = auth.currentUser?.uid;
    if (!currentUserId) throw new CustomError('auth/no-valid-user');
    const response = await getDoc(doc(db, 'users', currentUserId, 'statistics', 'dailyStatistics'));
    if (!response.data()?.data) return undefined;
    console.log('first Entry: ', response.data()?.data[0]);
    const newData: any = [];
    console.log('********************');
    response.data()?.data.forEach((singleEntry: any) => {
      newData.push({ ...singleEntry, date: dateformat(singleEntry.date, 'yyyy-mm-dd') });
    });
    console.log('********************');
    console.log('first new Entry: ', newData[0]);
    await updateDoc(response.ref, {
      data: newData,
      lastModified: Date.now(),
    });
  } catch (error: any) {
    console.error(`getConsumptions error: ${error}`);
    if (error.code != null) throw new CustomError(error.code, error.message);
    throw new CustomError('unable-to-get-consumption', error);
  }
};

const firebaseMigrateWeightStatistics = async (): Promise<void> => {
  console.log('called firebaseMigrateWeightStatistics');
  try {
    const currentUserId = auth.currentUser?.uid;
    if (!currentUserId) throw new CustomError('auth/no-valid-user');
    const response = await getDoc(doc(db, 'users', currentUserId, 'statistics', 'weightStatistic'));
    console.log('test');
    if (!response.data()?.weightHistory) return undefined;
    console.log('test 2');
    console.log('first Entry: ', response.data()?.weightHistory[0]);
    const newData: any = [];
    console.log('********************');
    response.data()?.weightHistory.forEach((singleEntry: any) => {
      newData.push({ ...singleEntry, date: dateformat(singleEntry.date, 'yyyy-mm-dd') });
    });
    console.log('********************');
    console.log('first new Entry: ', newData);
    await updateDoc(response.ref, {
      lastModified: Date.now(),
      weightHistory: newData,
    });
  } catch (error: any) {
    console.error(`getConsumptions error: ${error}`);
    if (error.code != null) throw new CustomError(error.code, error.message);
    throw new CustomError('unable-to-get-consumption', error);
  }
};
