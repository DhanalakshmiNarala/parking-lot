export class Vehicle {
  private registeredNumber: string;
  private color: string;

  constructor(registeredNumber: string, color: string) {
    this.registeredNumber = registeredNumber;
    this.color = color;
  }

  getRegisteredNumber(): string {
    return this.registeredNumber;
  }

  getColor(): string {
    return this.color;
  }
}
