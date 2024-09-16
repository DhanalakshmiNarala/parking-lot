import { ParkingLot } from '../models/ParkingLot';
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
}
