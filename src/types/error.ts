/**
 * Custom class for errors
 */
export class CustomError {
  /**
   * error code for error handling
   */
  code: string;

  /**
   * error message for debugging
   */
  message?: string;

  constructor(code: string, message?: string) {
    this.code = code;
    this.message = message;
  }
}
