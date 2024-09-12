import { ParkingLot } from '../models/ParkingLot';
import { Vehicle } from '../models/Vehicle';

export class ParkingLotController {
  private parkingLot: ParkingLot;

  COMMANDS = {
    CREATE_PARKING_LOT: 'create_parking_lot',
    PARK: 'park',
  };

  constructor(parkingLot: ParkingLot) {
    this.parkingLot = parkingLot;
  }

  processCommand(userInput: string) {
    const words = userInput.split(' ');
    switch (words[0]) {
      case this.COMMANDS.CREATE_PARKING_LOT:
        return this.handleCreateParkingLot(parseInt(words[1]));
      case this.COMMANDS.PARK:
        return this.handleVehicleParking(words[1], words[2]);
      default:
        throw new Error('Invalid parking lot command');
    }
  }

  handleCreateParkingLot(capacity: number) {
    if (capacity < 0) {
      throw new Error('Invalid parking lot size');
    }

    this.parkingLot = new ParkingLot(capacity);
    return `Created a parking lot with ${capacity} slots`;
  }

  handleVehicleParking(registeredNumber: string, color: string) {
    const vehicle = new Vehicle(registeredNumber, color);
    const slotNumber = this.parkingLot.parkVehicle(vehicle);
    return `Allocated slot number: ${slotNumber}`;
  }
}
