export default class UserDataValidationError extends Error {
  public data: object;

  constructor(message: string, failedData: object) {
    super(message);

    this.data = failedData;
  }
}
