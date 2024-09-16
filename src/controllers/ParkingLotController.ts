import {
  CREATE_PARKING_LOT,
  LEAVE,
  PARK,
  REGISTRATION_NUMBERS_FOR_CARS_WITH_COLOUR,
  SLOT_NUMBER_FOR_REGISTRATION_NUMBER,
  SLOT_NUMBERS_FOR_CARS_WITH_COLOUR,
  STATUS,
} from '../constants/commands';
import { ParkingLot } from '../models/ParkingLot';
import { ParkingSlot } from '../models/ParkingSlot';
import { Vehicle } from '../models/Vehicle';
import { ParkingLotService } from '../services/ParkingLotService';

export class ParkingLotController {
  private parkingLot: ParkingLotService;

  constructor(parkingLot = new ParkingLotService()) {
    this.parkingLot = parkingLot;
  }

  processCommand(userInput: string) {
    const words = userInput.split(' ');
    switch (words[0]) {
      case CREATE_PARKING_LOT:
        return this.parkingLot.createParkingLot(parseInt(words[1]));
      case PARK:
        return this.parkingLot.parkVehicle(words[1], words[2]);
      case LEAVE:
        return this.parkingLot.removeVehicle(parseInt(words[1]));
      case STATUS:
        return this.parkingLot.status();
      case REGISTRATION_NUMBERS_FOR_CARS_WITH_COLOUR:
        return this.handleRegistractionNosForVehicleColor(words[1]);
      case SLOT_NUMBERS_FOR_CARS_WITH_COLOUR:
        return this.handleSlotNosForVehicleColor(words[1]);
      case SLOT_NUMBER_FOR_REGISTRATION_NUMBER:
        return this.handleSlotNoForVehicleRegistractionNo(words[1]);
      default:
        throw new Error('Invalid parking lot command');
    }
  }

  handleRegistractionNosForVehicleColor(color: string) {
    const registeredNumbers =
      this.parkingLot.getVehicleRegisteredNumbersWithColor(color);
    return registeredNumbers.join(', ');
  }

  handleSlotNosForVehicleColor(color: string) {
    const slotNumbers = this.parkingLot.getSlotNumbersWithVehicleColor(color);
    return slotNumbers.join(', ');
  }

  handleSlotNoForVehicleRegistractionNo(registeredNumber: string) {
    try {
      return this.parkingLot
        .getSlotNumberForRegisteredNumber(registeredNumber)
        .toString();
    } catch (error) {
      return 'Not found';
    }
  }
}
