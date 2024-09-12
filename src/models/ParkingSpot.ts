export class ParkingSpot {
  private position: number;
  private available: boolean;

  constructor(position: number, available: boolean) {
    this.position = position;
    this.available = available;
  }

  getPosition(): number {
    return this.position;
  }

  isAvailable(): boolean {
    return this.available;
  }
}
