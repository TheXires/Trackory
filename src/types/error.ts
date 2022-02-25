// eslint-disable-next-line import/prefer-default-export
export class CustomError {
  code: string;

  message?: string;

  constructor(code: string, message?: string) {
    this.code = code;
    this.message = message;
  }
}
