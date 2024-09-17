import { getTimeDifferenceInHours } from '../utils/TimeHelpers';
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

  parkVehicle(vehicle: Vehicle): void {
    this.vehicle = vehicle;
    this.vehicleParkedTime = new Date();
  }

  removeVehicle(): number {
    this.vehicle = null;
    return getTimeDifferenceInHours(this.vehicleParkedTime as Date, new Date());
  }
}
