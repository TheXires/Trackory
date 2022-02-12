import AsyncStorage from '@react-native-async-storage/async-storage';
import { ITEMS, ITEMS_LAST_UPDATED } from '../constants';
import { Item } from '../interfaces/item';

/**
 * get the time of the last item fetch saved in the asyncStroage of the device
 */
export const getItemLastUpdateTimeFromStorage = async (): Promise<number> => {
  const lastUpdatedString = await AsyncStorage.getItem(ITEMS_LAST_UPDATED);
  const lastUpdated: number = !lastUpdatedString ? 0 : JSON.parse(lastUpdatedString);
  return lastUpdated;
};

/**
 * get all items saved in the asyncStroage of the device
 */
export const getItemsFromStorage = async (): Promise<Item[]> => {
  const storedItemsString = await AsyncStorage.getItem(ITEMS);
  const storedItems = !storedItemsString ? [] : JSON.parse(storedItemsString);
  return storedItems;
};
