/**
 * Checks if a given timestamp string is in valid ISO 8601 format.
 *
 * The function verifies if the input string matches the pattern:
 * YYYY-MM-DDTHH:mm:ss.sssZ, where:
 * - YYYY is a 4-digit year
 * - MM is a 2-digit month (01-12)
 * - DD is a 2-digit day (01-31)
 * - HH is a 2-digit hour (00-23)
 * - mm is a 2-digit minute (00-59)
 * - ss is a 2-digit second (00-59)
 * - sss is an optional 3-digit millisecond (000-999)
 * - Z indicates that the time is in UTC
 *
 * @param {string} timestamp - The timestamp string to validate.
 * @returns {boolean} True if the timestamp is in valid ISO 8601 format, false otherwise.
 */

export const isValidISO8601 = (timestamp: string) => {
  const regex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d{3})?Z$/;
  return regex.test(timestamp);
};
