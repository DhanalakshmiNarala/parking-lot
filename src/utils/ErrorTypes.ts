export class ArgumentError extends Error {
  constructor(
    public argumentName: string,
    message: string
  ) {
    super(`Invalid '${argumentName}': ${message}`);
    this.name = 'ArgumentError';
  }
}
