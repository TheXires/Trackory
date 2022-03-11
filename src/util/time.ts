import dateformat from 'dateformat';
import { DAY_IN_MS } from '../constants';

/**
 * get the start time of a day in the past in ms.
 * When daysInPast less than 0, get the start time of today in ms
 *
 * @param daysInPast amount of days in the past.
 * @returns start of day in the past
 */
export const getStartOfDay = (daysInPast: number): number => {
  const todayStart = new Date();
  todayStart.setUTCHours(0, 0, 0, 0);
  if (daysInPast < 0) {
    return todayStart.getTime();
  }
  return todayStart.getTime() - DAY_IN_MS * daysInPast;
};

/**
 * get the end time of a day in the past in ms.
 * When daysInPast less than 0, get the end time of today in ms
 *
 * @param daysInPast amount of days in the past.
 * @returns end of day in the past
 */
export const getEndOfDay = (daysInPast: number): number => {
  const todayEnd = new Date();
  todayEnd.setUTCHours(23, 59, 59, 999);
  if (daysInPast < 0) {
    return todayEnd.getTime();
  }
  return todayEnd.getTime() - DAY_IN_MS * daysInPast;
};

/**
 * get date label for 7 days in format 'dd.mm', starting with date most in the past
 *
 * @param weeksInPast 0 for current week or number of weeks in the past
 * @returns string array with labels for 7 days
 */
export const getWeeklyLabels = (weeksInPast: number) => {
  const startDay = weeksInPast >= 0 ? 7 * weeksInPast : 0;
  const startTime = getStartOfDay(startDay);
  const labels: string[] = [];
  for (let i = 6; i >= 0; i -= 1) {
    labels.push(dateformat(startTime - i * DAY_IN_MS, 'dd.mm'));
  }
  return labels;
};

/**
 * get label with month number for last 12 month
 *
 * @returns string array with month labels for last 12 month, like: ["04", "05", "06", "07", "08", "09", "10", "11", "12", "01", "02", "03"]
 */
export const getMonthlyLabels = () => {
  const startTime = getStartOfDay(0);
  const labels: string[] = [];
  for (let i = 11; i >= 0; i -= 1) {
    labels.push(dateformat(startTime - i * 30 * DAY_IN_MS, 'mm'));
  }
  return labels;
};

/**
 * get the start time of the day at least one week in the past
 * 
 * @param weeksInPast 
 * @returns start time in ms
 */
export const getFirstDateOfWeek = (weeksInPast: number): number => {
  const day = weeksInPast < 1 ? 6 : 7 * weeksInPast + 6;
  const startTime = getStartOfDay(day);
  return startTime;
};

/**
 * get the end time of the day at least one week in the past
 * 
 * @param weeksInPast 
 * @returns start time in ms
 */
export const getLastDateOfWeek = (weeksInPast: number): number => {
  const day = weeksInPast < 1 ? 0 : 7 * weeksInPast;
  const startTime = getStartOfDay(day);
  return startTime;
};
