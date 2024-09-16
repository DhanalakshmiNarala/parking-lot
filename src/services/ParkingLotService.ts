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

  parkVehicle(registeredNumber: string, color: string) {
    try {
      const vehicle = new Vehicle(registeredNumber, color);
      const slotNumber = this.parkingLot?.parkVehicle(vehicle);
      return `Allocated slot number: ${slotNumber}`;
    } catch (error) {
      return `Sorry, parking lot is full`;
    }
  }

  removeVehicle(slotNumber: number): string {
    this.parkingLot.removeVehicle(slotNumber);
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
}
