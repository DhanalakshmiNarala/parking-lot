import { ParkingSlot } from '../../src/models/ParkingSlot';
import { Vehicle } from '../../src/models/Vehicle';

describe('Parking Slot', () => {
  it('should create parking slot', () => {
    const parkingSlot = new ParkingSlot(1);
    expect(parkingSlot.getPosition()).toBe(1);
    expect(parkingSlot.isAvailable()).toBe(true);
  });

  it('should assign vehicle to the slot', () => {
    const parkingSlot = new ParkingSlot(1);
    const vehicle = new Vehicle('xyz-123', 'White');

    parkingSlot.parkVehicle(vehicle);

    expect(parkingSlot.getVehicle()).toBe(vehicle);
    expect(parkingSlot.getVehicle()).toBe(vehicle);
  });

  it('should give availability as false if slot is allocated', () => {
    const parkingSlot = new ParkingSlot(1);
    const vehicle = new Vehicle('xyz-123', 'White');

    parkingSlot.parkVehicle(vehicle);

    expect(parkingSlot.isAvailable()).toBe(false);
  });

  it('should remove vehicle from the slot', () => {
    const parkingSlot = new ParkingSlot(1);
    const vehicle = new Vehicle('xyz-123', 'White');

    parkingSlot.parkVehicle(vehicle);
    parkingSlot.removeVehicle();

    expect(parkingSlot.getVehicle()).toBe(null);
  });
});
