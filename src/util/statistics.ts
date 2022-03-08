import { DAY_IN_MS } from '../constants';
import { DailyStatistic, WeightHistory } from '../types/statistics';
import { getStartOfDay } from './time';

/**
 * separates the dailyStatistic data into single nutrition, with 0 as default if no other values
 *
 * @param data
 * @param weeksInPast
 * @returns one array for each nutrition with values for each day
 */
export const separateDailyStatisticData = (data: DailyStatistic[], weeksInPast: number) => {
  const startDay = weeksInPast >= 0 ? 7 * weeksInPast : 0;
  const startTime = getStartOfDay(startDay);

  const calories: number[] = [];
  const carbohydrates: number[] = [];
  const fat: number[] = [];
  const protein: number[] = [];

  for (let i = 6; i >= 0; i -= 1) {
    const res = data.find((element) => element.date === startTime - i * DAY_IN_MS);
    calories.push(res?.calories ? res.calories : 0);
    carbohydrates.push(res?.carbohydrates ? res.carbohydrates : 0);
    fat.push(res?.fat ? res.fat : 0);
    protein.push(res?.protein ? res.protein : 0);
  }

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
    const date = getStartOfDay(365 - index);
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
