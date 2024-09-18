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

  parkVehicle(vehicle: Vehicle, time = ''): void {
    if (time != '' && !isISOFormatDateString(time)) {
      throw new ArgumentError('DateTime', 'Should be in ISO format');
    }

    this.vehicleParkedTime = time == '' ? new Date() : new Date(time);

    this.vehicle = vehicle;
  }

  removeVehicle(time = ''): number {
    if (time != '' && !isISOFormatDateString(time)) {
      throw new ArgumentError('DateTime', 'Should be in ISO format');
    }
    const leavingTime = time == '' ? new Date() : new Date(time);

    this.vehicle = null;

    const duration = getTimeDifferenceInHours(
      this.vehicleParkedTime as Date,
      leavingTime
    );
    this.vehicleParkedTime = null;
    return duration;
  }
}
