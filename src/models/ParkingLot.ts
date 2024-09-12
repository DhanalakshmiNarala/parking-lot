import { ParkingSpot } from './ParkingSpot';
import { Vehicle } from './Vehicle';

export class ParkingLot {
  private capacity: number;
  private spots: ParkingSpot[];

  constructor(capacity: number) {
    this.capacity = capacity;
    this.spots = this.createParkingSpots();
  }

  private createParkingSpots(): ParkingSpot[] {
    const spots: ParkingSpot[] = [];
    for (let i = 0; i < this.capacity; i++) {
      spots[i] = new ParkingSpot(i + 1, true);
    }
    return spots;
  }

  getCapacity(): number {
    return this.capacity;
  }

  getParkingSpots(): ParkingSpot[] {
    return this.spots;
  }

  parkVehicle(vehicle: Vehicle): number {
    for (let i = 0; i < this.capacity; i++) {
      if (this.spots[i].isAvailable()) {
        this.spots[i].assignVehicle(vehicle);
        return this.spots[i].getPosition();
      }
    }
    return -1;
  }

  isSpotAvailable(spotNumber: number): boolean {
    return this.spots[spotNumber - 1].isAvailable();
  }
}
