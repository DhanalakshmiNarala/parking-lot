import { ParkingLot } from '../models/ParkingLot';
import { ParkingSlot } from '../models/ParkingSlot';
import { Vehicle } from '../models/Vehicle';

export class ParkingLotController {
  private parkingLot: ParkingLot;

  COMMANDS = {
    CREATE_PARKING_LOT: 'create_parking_lot',
    PARK: 'park',
    LEAVE: 'leave',
    STATUS: 'status',
    REGISTRATION_NUMBERS_FOR_CARS_WITH_COLOUR:
      'registration_numbers_for_cars_with_colour',
    SLOT_NUMBERS_FOR_CARS_WITH_COLOUR: 'slot_numbers_for_cars_with_colour',
    SLOT_NUMBER_FOR_REGISTRATION_NUMBER: 'slot_number_for_registration_number',
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
      case this.COMMANDS.LEAVE:
        return this.handleRemoveVehicle(parseInt(words[1]));
      case this.COMMANDS.STATUS:
        return this.handleParkinglotStatus();
      case this.COMMANDS.REGISTRATION_NUMBERS_FOR_CARS_WITH_COLOUR:
        return this.handleRegistractionNosForVehicleColor(words[1]);
      case this.COMMANDS.SLOT_NUMBERS_FOR_CARS_WITH_COLOUR:
        return this.handleSlotNosForVehicleColor(words[1]);
      case this.COMMANDS.SLOT_NUMBER_FOR_REGISTRATION_NUMBER:
        return this.handleSlotNoForVehicleRegistractionNo(words[1]);
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
    try {
      const vehicle = new Vehicle(registeredNumber, color);
      const slotNumber = this.parkingLot.parkVehicle(vehicle);
      return `Allocated slot number: ${slotNumber}`;
    } catch (error) {
      return `Sorry, parking lot is full`;
    }
  }

  handleRemoveVehicle(slotNumber: number) {
    this.parkingLot.removeVehicle(slotNumber);
    return `Slot number ${slotNumber} is free`;
  }

  handleParkinglotStatus() {
    const header = 'Slot No.\tRegistration No\tColour\n';

    const slots: ParkingSlot[] = this.parkingLot.getParkingSlots();
    const vehiclesInfo = slots
      .map((slot) => {
        const vehicle = slot.getAssignedVehicle();
        return `${slot.getPosition()}\t${vehicle?.getRegisteredNumber()}\t${vehicle?.getColor()}`;
      })
      .join('\n');

    return header + vehiclesInfo;
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
