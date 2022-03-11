/**
 * Statistics for a specific day
 */
export interface DailyStatistic {
  calories: number;
  carbohydrates: number;
  date: number;
  fat: number;
  protein: number;
}

/**
 * Weight history of the user
 */
export interface WeightHistory {
  date: number;
  weight: number;
}
