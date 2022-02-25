import { DAY_IN_MS } from '../constants';
import { DailyStatistic } from '../types/statistics';
import { getStartOfDay } from './time';

export const separateDailyStatisticData = (data: DailyStatistic[], weeksInPast: number) => {
  const startDay = weeksInPast >= 0 ? 7 * weeksInPast : 0;
  const startTime = getStartOfDay(startDay);

  const calories: number[] = [];
  const carbohydrates: number[] = [];
  const fat: number[] = [];
  const protein: number[] = [];

  for (let i = 6; i >= 0; i -= 1) {
    const res = data.find((element) => element.date === startTime - i * DAY_IN_MS);
    calories.push(res ? res.calories : 0);
    carbohydrates.push(res ? res.carbohydrates : 0);
    fat.push(res ? res.fat : 0);
    protein.push(res ? res.protein : 0);
  }

  return { calories, carbohydrates, fat, protein };
};
