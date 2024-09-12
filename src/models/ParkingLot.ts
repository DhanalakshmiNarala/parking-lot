export class ParkingLot {
  private capacity: number;

  constructor(capacity: number) {
    this.capacity = capacity;
  }

  getCapacity(): number {
    return this.capacity;
  }
}
