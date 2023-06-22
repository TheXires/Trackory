import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import { CustomError } from '../types/error';
import { Consumption, Item } from '../types/item';
import { validateJsonData } from './validation';

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
export const readAndValidate = async (): Promise<{
  consumptions: Consumption[];
  items: Item[];
}> => {
  try {
    // file selection
    const result = await DocumentPicker.getDocumentAsync({
      copyToCacheDirectory: true,
      type: 'application/json',
    });

    if (result.type !== 'success') {
      throw new CustomError('unableToOpenFile');
    }

    // data import
    const content = await FileSystem.readAsStringAsync(result.uri);
    const jsonData = JSON.parse(content);

    // data validation
    if (!validateJsonData(jsonData)) {
      throw new CustomError('invalidData');
    }

    return { consumptions: jsonData.consumptions, items: jsonData.items };
  } catch (error: any) {
    throw new CustomError(error.code);
  }
};
