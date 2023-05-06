import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import { firebaseGetAllConsumptions } from '../firebase/consumption.firebase';
import { firebaseGetAllItems } from '../firebase/items.firebase';
import { firebaseGetWeightHistory } from '../firebase/statistics.firebase';
import { CustomError } from '../types/error';
import { Consumption, Item } from '../types/item';

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

/**
 * exports items and consumptions to a json file
 *
 * @param items
 * @param consumptions
 */
export const exportData = async (
  items: Realm.Results<Item & Realm.Object<unknown, never>>,
  consumptions: Realm.Results<Consumption & Realm.Object<unknown, never>>,
): Promise<void> => {
  try {
    const toShare = { consumptions, items };
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

// TODO dokumentation hinzufügen
export const importData = async (): Promise<void> => {
  try {
    const result = await DocumentPicker.getDocumentAsync({
      copyToCacheDirectory: true,
      type: 'application/json',
    });

    if (result.type !== 'success') {
      throw new CustomError('unableToOpenFile');
    }

    const content = await FileSystem.readAsStringAsync(result.uri);
    const jsonData = JSON.parse(content);

    console.log(jsonData);
    // TODO daten weiterverarbeiten
    // - Datenvalidierung mit zod (oder realm, falls möglich)
  } catch (error) {
    throw new CustomError('unableToImportData');
  }
};
