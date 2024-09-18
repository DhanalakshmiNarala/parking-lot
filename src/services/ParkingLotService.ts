import { ParkingLot } from '../models/ParkingLot';
import { ParkingSlot } from '../models/ParkingSlot';
import { Vehicle } from '../models/Vehicle';
import { calculateCostOfParkingHours } from '../utils/CostCalculator';
import { ArgumentError } from '../utils/ErrorTypes';
import {
  getTimeDifferenceInHours,
  isISOFormatDateString,
} from '../utils/TimeHelpers';

export class ParkingLotService {
  private parkingLot: ParkingLot;

  constructor(parkingLot = new ParkingLot()) {
    this.parkingLot = parkingLot;
  }

  createParkingLot(capacity: number) {
    if (capacity < 0) {
      throw new ArgumentError('Capacity', 'It must be greater than 0.');
    }

    this.parkingLot.setCapacity(capacity);
    return `Created a parking lot with ${capacity} slots`;
  }

  parkVehicle(
    registeredNumber: string,
    color: string,
    dateTime: string
  ): string {
    this.validateDateString(dateTime);

    const slots = this.parkingLot.getParkingSlots();

    const availableSlot = slots.find((slot) => slot.isAvailable());
    if (availableSlot) {
      const vehicle = new Vehicle(registeredNumber, color);
      availableSlot.parkVehicle(vehicle, new Date(dateTime));
      return `Allocated slot number: ${availableSlot.getPosition()}`;
    }

    return `Sorry, parking lot is full`;
  }

  removeVehicle(slotNumber: number, dateTime: string): string {
    this.validateSlotNumber(slotNumber);
    this.validateDateString(dateTime);

    const slots = this.parkingLot.getParkingSlots();
    const slot = slots[slotNumber - 1];
    slot.removeVehicle(new Date(dateTime));
    const cost = this.calculateParkingCostOfSlot(slot);

    const lineOne = `Slot number ${slotNumber} is free`;
    const lineTwo = `Total parking cost: ${cost}`;
    return [lineOne, lineTwo].join('\n');
  }

  status() {
    const header = 'Slot No.\tRegistration No\tColour\n';

    const slots: ParkingSlot[] = this.parkingLot.getParkingSlots();
    const vehiclesInfo = slots
      .filter((slot) => !slot.isAvailable())
      .map((slot) => {
        const vehicle = slot.getVehicle();
        return `${slot.getPosition()}\t${vehicle?.getRegisteredNumber()}\t${vehicle?.getColor()}`;
      })
      .join('\n');

    return header + vehiclesInfo;
  }

  getVehicleRegisteredNumbersWithColor(color: string) {
    const slots = this.parkingLot.getParkingSlots();

    const registeredNumbers = slots
      .filter((slot) => slot.getVehicle()?.getColor() == color)
      .map((slot) => slot.getVehicle()?.getRegisteredNumber());

    return registeredNumbers.join(', ');
  }

  getSlotNumbersWithVehicleColor(color: string): string {
    const slots = this.parkingLot.getParkingSlots();

    const slotNumbers = slots
      .filter((slot) => slot.getVehicle()?.getColor() == color)
      .map((slot) => slot.getPosition());
    return slotNumbers.join(', ');
  }

  getSlotNumberForRegisteredNumber(registeredNumber: string): string {
    const slots = this.parkingLot.getParkingSlots();

    const allocatedSlot = slots.find(
      (slot) => slot.getVehicle()?.getRegisteredNumber() == registeredNumber
    );
    if (allocatedSlot) {
      return allocatedSlot.getPosition().toString();
    }

    return 'Not found';
  }

  private validateDateString(dateString: string) {
    if (!isISOFormatDateString(dateString)) {
      throw new ArgumentError('DateTime', 'Should be in ISO format');
    }
  }

  private validateSlotNumber(slotNumber: number) {
    if (slotNumber < 0 || slotNumber > this.parkingLot.getCapacity()) {
      throw new ArgumentError(
        'Slot number',
        'It must be greater than 0 and less than parking lot size.'
      );
    }
  }

  private calculateParkingCostOfSlot(slot: ParkingSlot) {
    const duration = getTimeDifferenceInHours(
      slot.getParkedTime() as Date,
      slot.getRemovedTime() as Date
    );
    return calculateCostOfParkingHours(duration);
  }
}
