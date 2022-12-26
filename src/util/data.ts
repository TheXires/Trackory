import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import { firebaseGetAllConsumptions } from '../firebase/consumption.firebase';
import { firebaseGetAllItems } from '../firebase/items.firebase';
import { firebaseGetWeightHistory } from '../firebase/statistics.firebase';
import { CustomError } from '../types/error';

/**
 * Exports all data of a user to a file
 */
export const exportUserData = async (): Promise<void> => {
  try {
    const items = (await firebaseGetAllItems(0)).updatedItems;
    const consumptions = await firebaseGetAllConsumptions();
    const weightHistory = await firebaseGetWeightHistory();
    const toShare = {
      consumptions,
      items,
      weightHistory,
    };
    const path = `${FileSystem.documentDirectory}/data-export-${Date.now()}.json`;
    await FileSystem.writeAsStringAsync(path, JSON.stringify(toShare), {
      encoding: FileSystem.EncodingType.UTF8,
    });
    await Sharing.shareAsync(path);
    await FileSystem.deleteAsync(path);
  } catch (error: any) {
    console.error(`export error: ${error}`);
    throw new CustomError('exportError', error);
  }
};
