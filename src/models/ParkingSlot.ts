import { Vehicle } from './Vehicle';

export class ParkingSlot {
  private position: number;
  private available: boolean;
  private vehicle: Vehicle | null = null;

  constructor(position: number, available: boolean) {
    this.position = position;
    this.available = available;
  }

  getPosition(): number {
    return this.position;
  }

  isAvailable(): boolean {
    return this.available;
  }

  assignVehicle(vehicle: Vehicle): void {
    this.vehicle = vehicle;
    this.available = false;
  }

  removeVehicle(): void {
    this.vehicle = null;
    this.available = true;
  }

  getAssignedVehicle(): Vehicle | null {
    return this.vehicle;
  }
}
