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

  parkVehicle(vehicle: Vehicle): number {
    const availableSlot = this.slots.find((slot) => slot.isAvailable());
    if (availableSlot) {
      availableSlot.assignVehicle(vehicle);
      return availableSlot.getPosition();
    }

    throw new Error('Parking lot is fully occupied');
  }

  isSlotAvailable(slotNumber: number): boolean {
    return this.slots[slotNumber - 1].isAvailable();
  }

  removeVehicle(slotNumber: number): void {
    if (slotNumber < 0 || slotNumber > this.capacity) {
      throw new Error('Invalid slot number');
    }

    return this.slots[slotNumber - 1].removeVehicle();
  }
}
