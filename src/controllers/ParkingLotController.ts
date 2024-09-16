import {
  CREATE_PARKING_LOT,
  LEAVE,
  PARK,
  REGISTRATION_NUMBERS_FOR_CARS_WITH_COLOUR,
  SLOT_NUMBER_FOR_REGISTRATION_NUMBER,
  SLOT_NUMBERS_FOR_CARS_WITH_COLOUR,
  STATUS,
} from '../constants/Commands';
import { ParkingLotService } from '../services/ParkingLotService';

export class ParkingLotController {
  private parkingLot: ParkingLotService;

  constructor(parkingLot = new ParkingLotService()) {
    this.parkingLot = parkingLot;
  }

  processCommand(userInput: string) {
    const [command, ...params] = userInput.split(' ');
    switch (command) {
      case CREATE_PARKING_LOT:
        return this.parkingLot.createParkingLot(parseInt(params[0]));
      case PARK:
        return this.parkingLot.parkVehicle(params[0], params[1]);
      case LEAVE:
        return this.parkingLot.removeVehicle(parseInt(params[0]));
      case STATUS:
        return this.parkingLot.status();
      case REGISTRATION_NUMBERS_FOR_CARS_WITH_COLOUR:
        return this.parkingLot.getVehicleRegisteredNumbersWithColor(params[0]);
      case SLOT_NUMBERS_FOR_CARS_WITH_COLOUR:
        return this.parkingLot.getSlotNumbersWithVehicleColor(params[0]);
      case SLOT_NUMBER_FOR_REGISTRATION_NUMBER:
        return this.parkingLot.getSlotNumberForRegisteredNumber(params[0]);
      default:
        throw new Error('Invalid parking lot command');
    }
  }
}
