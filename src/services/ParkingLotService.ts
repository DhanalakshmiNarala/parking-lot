import { ParkingHistory } from '../models/ParkingHistory';
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
  private parkingHistory: ParkingHistory;

  constructor(
    parkingLot = new ParkingLot(),
    parkingHistory = new ParkingHistory()
  ) {
    this.parkingLot = parkingLot;
    this.parkingHistory = parkingHistory;
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
      availableSlot.parkVehicle(vehicle);
      this.parkingHistory.addVehicleParkingTime(
        availableSlot.getPosition(),
        vehicle.getRegisteredNumber(),
        new Date(dateTime)
      );
      return `Allocated slot number: ${availableSlot.getPosition()}`;
    }

    return `Sorry, parking lot is full`;
  }

  removeVehicle(slotNumber: number, dateTime: string): string {
    this.validateRemoveVehicleParams(slotNumber, dateTime);
    const vehicleNumber = this.removeVehicleFromSlot(slotNumber, dateTime);

    const cost = this.calculateParkingCostOfSlot(slotNumber, vehicleNumber);
    return this.getRemoveVehicleMessage(slotNumber, cost);
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

  private validateRemoveVehicleParams(slotNumber: number, dateTime: string) {
    if (slotNumber < 0 || slotNumber > this.parkingLot.getCapacity()) {
      throw new ArgumentError(
        'Slot number',
        'It must be greater than 0 and less than parking lot size.'
      );
    }

    this.validateDateString(dateTime);
  }

  private calculateParkingCostOfSlot(
    slotNumber: number,
    vehicleNumber: string
  ) {
    const parkingTimings = this.parkingHistory.getVehicleParkingTimings(
      slotNumber,
      vehicleNumber
    );
    const duration = getTimeDifferenceInHours(
      parkingTimings.parkedTime,
      parkingTimings.leftTime as Date
    );
    return calculateCostOfParkingHours(duration);
  }

  private removeVehicleFromSlot(slotNumber: number, dateTime: string): string {
    const slot = this.parkingLot
      .getParkingSlots()
      .at(slotNumber - 1) as ParkingSlot;
    const vehicleNumber = slot.getVehicle()?.getRegisteredNumber() as string;
    slot.removeVehicle();

    this.parkingHistory.addVehicleRemovedTime(
      slotNumber,
      vehicleNumber,
      new Date(dateTime)
    );

    return vehicleNumber;
  }

  private getRemoveVehicleMessage(slotNumber: number, cost: number): string {
    const lineOne = `Slot number ${slotNumber} is free`;
    const lineTwo = `Total parking cost: ${cost}`;
    return [lineOne, lineTwo].join('\n');
  }
}
