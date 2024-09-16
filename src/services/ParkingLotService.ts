import { ParkingLot } from '../models/ParkingLot';

export class ParkingLotService {
  private parkingLot: ParkingLot | null;

  constructor(parkingLot = null) {
    this.parkingLot = parkingLot;
  }

  createParkingLot(capacity: number) {
    if (capacity < 0) {
      throw new Error('Invalid parking lot size');
    }

    this.parkingLot = new ParkingLot(capacity);
    return `Created a parking lot with ${capacity} slots`;
  }
}
