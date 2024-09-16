import { Vehicle } from './Vehicle';

export class ParkingSlot {
  private position: number;
  private vehicle: Vehicle | null = null;

  constructor(position: number, available: boolean) {
    this.position = position;
  }

  getPosition(): number {
    return this.position;
  }

  getAssignedVehicle(): Vehicle | null {
    return this.vehicle;
  }

  isAvailable(): boolean {
    return this.vehicle == null;
  }

  parkVehicle(vehicle: Vehicle): void {
    this.vehicle = vehicle;
  }

  removeVehicle(): void {
    this.vehicle = null;
  }
}
