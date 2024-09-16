import { ParkingSlot } from './ParkingSlot';
import { Vehicle } from './Vehicle';

export class ParkingLot {
  private capacity: number;
  private slots: ParkingSlot[];

  constructor(capacity = 0) {
    this.capacity = capacity;
    this.slots = this.createParkingSlots();
  }

  private createParkingSlots(): ParkingSlot[] {
    const slots: ParkingSlot[] = [];
    for (let i = 0; i < this.capacity; i++) {
      slots[i] = new ParkingSlot(i + 1, true);
    }
    return slots;
  }

  setCapacity(capacity: number): void {
    this.capacity = capacity;
    this.slots = this.createParkingSlots();
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
}
