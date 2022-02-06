/**
 * get the start time of a day in the past in ms.
 * When daysInPast less than 0, get the start time of today in ms
 *
 * @param daysInPast amount of days in the past.
 * @returns start of day in the past
 */
export const getStartOfDayInPast = (daysInPast: number): number => {
  const todayStart = new Date();
  todayStart.setUTCHours(0, 0, 0, 0);
  if (daysInPast < 0) {
    return todayStart.getTime();
  }
  return todayStart.getTime() - 1000 * 60 * 60 * 24 * daysInPast;
};

/**
 * get the end time of a day in the past in ms.
 * When daysInPast less than 0, get the end time of today in ms
 *
 * @param daysInPast amount of days in the past.
 * @returns end of day in the past
 */
export const getEndOfDayInPast = (daysInPast: number): number => {
  const todayEnd = new Date();
  todayEnd.setUTCHours(23, 59, 59, 999);
  if (daysInPast < 0) {
    return todayEnd.getTime();
  }
  return todayEnd.getTime() - 1000 * 60 * 60 * 24 * daysInPast;
};
