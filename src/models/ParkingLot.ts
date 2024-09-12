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
    const availableSpot = this.spots.find((spot) => spot.isAvailable());
    if (availableSpot) {
      availableSpot.assignVehicle(vehicle);
      return availableSpot.getPosition();
    }

    throw new Error('Parking lot is fully occupied');
  }

  isSpotAvailable(spotNumber: number): boolean {
    return this.spots[spotNumber - 1].isAvailable();
  }

  removeVehicle(vehicle: Vehicle): void {
    const allocatedSpot = this.spots.find(
      (spot) =>
        spot.getAssignedVehicle()?.getRegisteredNumber() ==
        vehicle.getRegisteredNumber()
    );

    if (allocatedSpot) {
      return allocatedSpot.removeVehicle();
    }

    throw new Error('Vehicle not found in parking lot');
  }

  getVehicleRegisteredNumbersWithColor(color: string) {
    return this.spots
      .filter((spot) => spot.getAssignedVehicle()?.getColor() == color)
      .map((spot) => spot.getAssignedVehicle()?.getRegisteredNumber());
  }

  getSpotNumbersWithVehicleColor(color: string): number[] {
    return this.spots
      .filter((spot) => spot.getAssignedVehicle()?.getColor() == color)
      .map((spot) => spot.getPosition());
  }

  getSpotNumberForRegisteredNumber(registeredNumber: string): number {
    const allocatedSpot = this.spots.find(
      (spot) =>
        spot.getAssignedVehicle()?.getRegisteredNumber() == registeredNumber
    );
    if (allocatedSpot) {
      return allocatedSpot.getPosition();
    }

    throw new Error(
      'Vehicle with given registered number not found in parking lot'
    );
  }
}
