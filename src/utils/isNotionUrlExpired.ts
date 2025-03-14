import { isValidISO8601 } from "./isValidISO8601";

/**
 * Checks if a Notion image URL from an AWS Bucket has expired based on the provided expiry time.
 *
 * This function first validates that the provided expiryTime is a string and conforms to
 * the ISO 8601 format. If the validation fails or if the type is incorrect, the function
 * logs a warning or error and returns true, indicating that the URL is considered expired.
 * Otherwise, it compares the current date and time with the expiry date and returns
 * true if the current date is past the expiry date.
 *
 * @param {string} expiryTime - The expiry time in ISO 8601 format to check against the current date.
 * @returns {boolean} True if the URL has expired or if the input is invalid, false otherwise.
 */

export const isNotionUrlExpired = (expiryTime: string): boolean => {
  if (typeof expiryTime !== "string") {
    console.warn(
      `The expiryTime type is not a string. Current type: ${typeof expiryTime}`
    );

    return true;
  }

  if (!isValidISO8601(expiryTime)) {
    console.error(
      `The expiryTime timestamp which is ${expiryTime} is not an ISO 8601 string`
    );

    return true;
  }

  const expiryDate = new Date(expiryTime);
  const currentDate = new Date();
  return currentDate > expiryDate;
};
