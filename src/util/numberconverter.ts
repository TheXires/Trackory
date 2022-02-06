/**
 * converts a string to an integer
 *
 * @param text string to convert to number
 * @returns number from string or null if string is not a number
 */
export default function convertTextToInteger(text: string): number | null {
  return Number.isNaN(parseInt(text, 10)) ? null : parseInt(text, 10);
}
