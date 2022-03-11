import AsyncStorage from '@react-native-async-storage/async-storage';
import { ITEMS, ITEMS_LAST_UPDATED } from '../constants';
import { Item } from '../types/item';

/**
 * get the time of the last item fetch saved in the asyncStorage of the device
 *
 * @returns time of last update in ms or 0
 */
export const getItemLastUpdateTimeFromStorage = async (): Promise<number> => {
  const lastUpdatedString = await AsyncStorage.getItem(ITEMS_LAST_UPDATED);
  const lastUpdated: number = lastUpdatedString ? JSON.parse(lastUpdatedString) : 0;
  return lastUpdated;
};

/**
 * get all items saved in the asyncStorage of the device
 *
 * @returns
 */
export const getItemsFromStorage = async (): Promise<Item[]> => {
  const itemsString = await AsyncStorage.getItem(ITEMS);
  const items: Item[] = itemsString ? JSON.parse(itemsString) : [];
  return items;
};
