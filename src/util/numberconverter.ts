/**
 * converts a string to an integer
 *
 * @param value string to convert to number
 * @returns number from value or undefined if value is not a number
 */
export const convertTextToInteger = (value: string | undefined): number | undefined => {
  if (value === undefined) return undefined;
  return Number.isNaN(parseInt(value, 10)) ? undefined : parseInt(value, 10);
};
