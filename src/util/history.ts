import AsyncStorage from '@react-native-async-storage/async-storage';
import { HISTORY } from '../constants';
import { ConsumedItem } from '../interfaces/item';
import { StoredHistory } from '../interfaces/localStorage';
import { getStartOfDay } from './time';

/**
 * get the items of a specific history day from local storage
 *
 * @param daysInPast
 * @returns array of consumed items
 */
export const getHistoryFromStorage = async (
  daysInPast: number,
): Promise<StoredHistory | undefined> => {
  try {
    const historyString = await AsyncStorage.getItem(HISTORY);
    const history: StoredHistory[] | undefined = historyString
      ? JSON.parse(historyString)
      : undefined;
    if (!history) return undefined;
    const date = getStartOfDay(daysInPast);
    const result = history.find((element) => element.date === date);
    return result;
  } catch (error) {
    console.error('getHistoryFromStorage:', error);
  }
  return undefined;
};

/**
 * saves consumed items of a specific day to local storage
 *
 * @param consumedItems
 * @param daysInPast
 */
export const saveHistoryToStorage = async (
  daysInPast: number,
  lastUpdated?: number,
  consumedItems?: ConsumedItem[],
) => {
  try {
    const date = getStartOfDay(daysInPast);
    const historyString = await AsyncStorage.getItem(HISTORY);
    const history: StoredHistory[] | undefined = historyString
      ? JSON.parse(historyString)
      : undefined;
    if (!history) {
      return await AsyncStorage.setItem(
        HISTORY,
        JSON.stringify([
          { consumedItems: consumedItems ?? [], date, lastUpdated: lastUpdated ?? 0 },
        ]),
      );
    }
    const index = history.findIndex((element) => element.date === date);
    if (index === -1) {
      history.push({ consumedItems: consumedItems ?? [], date, lastUpdated: lastUpdated ?? 0 });
    } else {
      history[index] = { consumedItems: consumedItems ?? [], date, lastUpdated: lastUpdated ?? 0 };
    }
    await AsyncStorage.setItem(HISTORY, JSON.stringify(history));
  } catch (error) {
    console.error('saveHistoryToStorage:', error);
  }
};
