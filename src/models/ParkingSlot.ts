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

  parkVehicle(vehicle: Vehicle, time = ''): void {
    this.vehicle = vehicle;
    this.vehicleParkedTime = time == '' ? new Date() : new Date(time);
  }

  removeVehicle(time = ''): number {
    this.vehicle = null;
    const leavingTime = time == '' ? new Date() : new Date(time);

    const duration = getTimeDifferenceInHours(
      this.vehicleParkedTime as Date,
      leavingTime
    );
    this.vehicleParkedTime = null;
    return duration;
  }
}
