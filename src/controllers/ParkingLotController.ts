import { ParkingLot } from '../models/ParkingLot';

export class ParkingLotController {
  private parkingLot: ParkingLot;

  COMMANDS = {
    CREATE_PARKING_LOT: 'create_parking_lot',
  };

  constructor(parkingLot: ParkingLot) {
    this.parkingLot = parkingLot;
  }

  processCommand(userInput: string) {
    const words = userInput.split(' ');
    switch (words[0]) {
      case this.COMMANDS.CREATE_PARKING_LOT:
        return this.handleCreateParkingLot(parseInt(words[1]));
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
}
