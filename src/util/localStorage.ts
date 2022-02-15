import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  DAILY_STATISTICS,
  DAILY_STATISTICS_LAST_UPDATED,
  ITEMS,
  ITEMS_LAST_UPDATED,
} from '../constants';
import { Item } from '../interfaces/item';

/**
 * get the time of the last item fetch saved in the asyncStroage of the device
 *
 * @returns time of last update in ms or 0
 */
export const getItemLastUpdateTimeFromStorage = async (): Promise<number> => {
  const lastUpdatedString = await AsyncStorage.getItem(ITEMS_LAST_UPDATED);
  const lastUpdated: number = !lastUpdatedString ? 0 : JSON.parse(lastUpdatedString);
  return lastUpdated;
};

/**
 * get all items saved in the asyncStroage of the device
 *
 * @returns
 */
export const getItemsFromStorage = async (): Promise<Item[]> => {
  const itemsString = await AsyncStorage.getItem(ITEMS);
  const items: Item[] = !itemsString ? [] : JSON.parse(itemsString);
  return items;
};

/**
 * get the time of the last daily statistics fetch saved in the asyncStroage of the device
 *
 * @returns time of last update in ms or 0
 */
export const getDailyStatisticsUpdateTimeFromStorage = async (): Promise<number> => {
  const lastUpdatedString = await AsyncStorage.getItem(DAILY_STATISTICS_LAST_UPDATED);
  const lastUpdated: number = !lastUpdatedString ? 0 : JSON.parse(lastUpdatedString);
  return lastUpdated;
};

/**
 * get daily statistics saved in the asyncStroage of the device
 *
 * @returns
 */
export const getDailyStatisticsFromStorage = async () => {
  const dailyStatisticsString = await AsyncStorage.getItem(DAILY_STATISTICS);
  const dailyStatistics: Item[] = !dailyStatisticsString ? [] : JSON.parse(dailyStatisticsString);
  return dailyStatistics;
};
