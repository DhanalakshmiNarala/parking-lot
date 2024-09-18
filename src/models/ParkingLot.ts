import { ParkingSlot } from './ParkingSlot';

export class ParkingLot {
  private capacity: number;
  private slots: ParkingSlot[];

  constructor(capacity = 0) {
    this.capacity = capacity;
    this.slots = this.createParkingSlots(capacity);
  }

  setCapacity(capacity: number): void {
    this.capacity = capacity;
    this.slots = this.createParkingSlots(capacity);
  }

  getCapacity(): number {
    return this.capacity;
  }

  getParkingSlots(): ParkingSlot[] {
    return this.slots;
  }

  isSlotAvailable(slotNumber: number): boolean {
    return this.slots[slotNumber - 1].isAvailable();
  }

  private createParkingSlots(capacity: number): ParkingSlot[] {
    const slots: ParkingSlot[] = [];
    for (let i = 0; i < capacity; i++) {
      slots[i] = new ParkingSlot(i + 1);
    }
    return slots;
  }
}
