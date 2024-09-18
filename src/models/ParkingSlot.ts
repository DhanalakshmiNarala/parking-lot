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
  private vehicleRemovedTime: Date | null = null;

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

  parkVehicle(vehicle: Vehicle, dateTime: Date): void {
    this.vehicle = vehicle;
    this.vehicleParkedTime = dateTime;
  }

  removeVehicle(dateTime: Date): void {
    this.vehicle = null;
    this.vehicleRemovedTime = dateTime;
  }
}
