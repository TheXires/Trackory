import dateFormat from 'dateformat';
import { DAY_IN_MS } from '../constants';
import { ConsumedItem, Consumption } from '../types/item';
import { WeightHistory } from '../types/statistics';
import { getWeeklyLabels } from './time';

/**
 * separates the dailyStatistic data into single nutrition, with 0 as default if no other values
 *
 * @param data
 * @param weeksInPast
 * @returns one array for each nutrition with values for each day
 */
export const separateDailyStatisticData = (
  consumptionHistory: Realm.Results<Consumption & Realm.Object<unknown, never>>,
  weeksInPast: number,
) => {
  const calories: number[] = [];
  const carbohydrates: number[] = [];
  const fat: number[] = [];
  const protein: number[] = [];

  getWeeklyLabels(weeksInPast, 'yyyy-mm-dd').forEach((label) => {
    let sumCalories = 0;
    let sumCarbohydrates = 0;
    let sumFat = 0;
    let sumProtein = 0;
    const consumptionsOfSelectedDay = consumptionHistory.find(
      (consumption) => consumption?.date === label,
    );
    consumptionsOfSelectedDay?.items.forEach((item: ConsumedItem) => {
      sumCalories += item.calories * item.quantity;
      sumCarbohydrates += item.carbohydrates * item.quantity;
      sumFat += item.fat * item.quantity;
      sumProtein += item.protein * item.quantity;
    });
    calories.push(sumCalories);
    carbohydrates.push(sumCarbohydrates);
    fat.push(sumFat);
    protein.push(sumProtein);
  });

  return { calories, carbohydrates, fat, protein };
};

/**
 * separates the weigth from the weightHistory array into a new array
 *
 * @param weightHistory
 * @returns array with 12 entries (one value per month)
 */
export const separateWeightStatisticData = (weightHistory: WeightHistory[]) => {
  const yearArray: number[] = Array(365).fill(0);
  let weight = 0;
  yearArray.forEach((_, index) => {
    const date = dateFormat(Date.now() - (365 - index) * DAY_IN_MS, 'yyy-mm-dd');
    const foundWeight = weightHistory.find((weightElement) => weightElement.date === date);
    if (foundWeight) weight = foundWeight.weight;
    yearArray[index] = weight;
  });
  const result: number[] = Array(12).fill(0);
  // moving every 31th element from yearArray into a new 12 element array starting from last entry on both
  let j = 11;
  for (let i = yearArray.length - 1; i >= 0; i -= 31) {
    result[j] = yearArray[i];
    j -= 1;
  }
  return result;
};
