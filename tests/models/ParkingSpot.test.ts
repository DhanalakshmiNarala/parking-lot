import { ParkingSpot } from '../../src/models/ParkingSpot';
import { Vehicle } from '../../src/models/Vehicle';

describe('Parking Spot', () => {
  it('should create parking spot', () => {
    const parkingSpot = new ParkingSpot(1, true);
    expect(parkingSpot.getPosition()).toBe(1);
    expect(parkingSpot.isAvailable()).toBe(true);
  });

  it('should assign vehicle to the spot', () => {
    const parkingSpot = new ParkingSpot(1, true);
    const vehicle = new Vehicle('xyz-123', 'White');

    parkingSpot.assignVehicle(vehicle);

    expect(parkingSpot.getAssignedVehicle()).toBe(vehicle);
    expect(parkingSpot.getAssignedVehicle()).toBe(vehicle);
  });

  it('should give availability as false if spot is allocated', () => {
    const parkingSpot = new ParkingSpot(1, true);
    const vehicle = new Vehicle('xyz-123', 'White');

    parkingSpot.assignVehicle(vehicle);

    expect(parkingSpot.isAvailable()).toBe(false);
  });

  it('should remove vehicle from the spot', () => {
    const parkingSpot = new ParkingSpot(1, true);
    const vehicle = new Vehicle('xyz-123', 'White');

    parkingSpot.assignVehicle(vehicle);
    parkingSpot.removeVehicle();

    expect(parkingSpot.getAssignedVehicle()).toBe(null);
  });
});
