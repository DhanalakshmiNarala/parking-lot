import { ParkingLot } from '../models/ParkingLot';
import { ParkingSlot } from '../models/ParkingSlot';
import { Vehicle } from '../models/Vehicle';

export class ParkingLotService {
  private parkingLot: ParkingLot;

  constructor(parkingLot = new ParkingLot()) {
    this.parkingLot = parkingLot;
  }

  createParkingLot(capacity: number) {
    if (capacity < 0) {
      throw new Error('Invalid parking lot size');
    }

    this.parkingLot.setCapacity(capacity);
    return `Created a parking lot with ${capacity} slots`;
  }

  parkVehicle(registeredNumber: string, color: string): string {
    const slots = this.parkingLot.getParkingSlots();

    const availableSlot = slots.find((slot) => slot.isAvailable());
    if (availableSlot) {
      const vehicle = new Vehicle(registeredNumber, color);
      availableSlot.parkVehicle(vehicle);
      return `Allocated slot number: ${availableSlot.getPosition()}`;
    }

    return `Sorry, parking lot is full`;
  }

  removeVehicle(slotNumber: number): string {
    if (slotNumber < 0 || slotNumber > this.parkingLot.getCapacity()) {
      throw new Error('Invalid slot number');
    }

    const slots = this.parkingLot.getParkingSlots();
    slots[slotNumber - 1].removeVehicle();
    return `Slot number ${slotNumber} is free`;
  }

  status() {
    const header = 'Slot No.\tRegistration No\tColour\n';

    const slots: ParkingSlot[] = this.parkingLot.getParkingSlots();
    const vehiclesInfo = slots
      .filter((slot) => !slot.isAvailable())
      .map((slot) => {
        const vehicle = slot.getAssignedVehicle();
        return `${slot.getPosition()}\t${vehicle?.getRegisteredNumber()}\t${vehicle?.getColor()}`;
      })
      .join('\n');

    return header + vehiclesInfo;
  }

  getVehicleRegisteredNumbersWithColor(color: string) {
    const slots = this.parkingLot.getParkingSlots();

    const registeredNumbers = slots
      .filter((slot) => slot.getAssignedVehicle()?.getColor() == color)
      .map((slot) => slot.getAssignedVehicle()?.getRegisteredNumber());

    return registeredNumbers.join(', ');
  }

  getSlotNumbersWithVehicleColor(color: string): string {
    const slots = this.parkingLot.getParkingSlots();

    const slotNumbers = slots
      .filter((slot) => slot.getAssignedVehicle()?.getColor() == color)
      .map((slot) => slot.getPosition());
    return slotNumbers.join(', ');
  }

  getSlotNumberForRegisteredNumber(registeredNumber: string): string {
    const slots = this.parkingLot.getParkingSlots();

    const allocatedSlot = slots.find(
      (slot) =>
        slot.getAssignedVehicle()?.getRegisteredNumber() == registeredNumber
    );
    if (allocatedSlot) {
      return allocatedSlot.getPosition().toString();
    }

    return 'Not found';
  }
}
