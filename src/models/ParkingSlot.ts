import { ArgumentError } from '../utils/ErrorTypes';
import {
  getTimeDifferenceInHours,
  isISOFormatDateString,
} from '../utils/TimeHelpers';
import { Vehicle } from './Vehicle';

export class ParkingSlot {
  private position: number;
  private vehicle: Vehicle | null = null;
  private vehicleParkedTime: Date | null = null;

  constructor(position: number) {
    this.position = position;
  }

  getPosition(): number {
    return this.position;
  }

  getVehicle(): Vehicle | null {
    return this.vehicle;
  }

  isAvailable(): boolean {
    return this.vehicle == null;
  }

  parkVehicle(vehicle: Vehicle, dateTime = ''): void {
    this.validateDateTimeString(dateTime);
    this.vehicleParkedTime = this.getDateTime(dateTime);

    this.vehicle = vehicle;
  }

  removeVehicle(dateTime = ''): number {
    this.validateDateTimeString(dateTime);

    this.vehicle = null;
    const leavingTime = this.getDateTime(dateTime);

    const parkedHours = getTimeDifferenceInHours(
      this.vehicleParkedTime as Date,
      leavingTime
    );

    this.afterRemovingVehicle();
    return parkedHours;
  }

  private validateDateTimeString(dateString: string): void {
    if (dateString != '' && !isISOFormatDateString(dateString)) {
      throw new ArgumentError('DateTime', 'Should be in ISO format');
    }
  }

  private getDateTime(dateString: string): Date {
    if (dateString) {
      return new Date(dateString);
    }

    return new Date(); // Current time as default time.
  }

  private afterRemovingVehicle(): void {
    this.vehicleParkedTime = null;
  }
}
