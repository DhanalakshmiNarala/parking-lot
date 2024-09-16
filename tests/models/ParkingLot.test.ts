import { ParkingLot } from '../../src/models/ParkingLot';
import { Vehicle } from '../../src/models/Vehicle';

describe('Parking Lot', () => {
  it('should create parking lot with the given capacity ', () => {
    const parkingLot = new ParkingLot(5);
    expect(parkingLot.getCapacity()).toBe(5);
  });

  it('should create parking slots with default availability true', () => {
    const parkingLot = new ParkingLot(5);

    const slots = parkingLot.getParkingSlots();
    for (let i = 0; i < 5; i++) {
      expect(slots[i].isAvailable()).toBe(true);
    }
  });

  it('should park vehicle at the earlier slot', () => {
    const parkingLot = new ParkingLot(5);
    const vehicleOne = new Vehicle('xyz-123', 'White');
    const vehicleTwo = new Vehicle('abc-123', 'Black');

    const vehicleOnePosition = parkingLot.parkVehicle(vehicleOne);
    const vehicleTwoPosition = parkingLot.parkVehicle(vehicleTwo);

    expect(vehicleOnePosition).toBe(1);
    expect(vehicleTwoPosition).toBe(2);
  });

  it('should return slot availability', () => {
    const parkingLot = new ParkingLot(5);
    const vehicleOne = new Vehicle('xyz-123', 'White');

    const vehicleOnePosition = parkingLot.parkVehicle(vehicleOne);

    expect(parkingLot.isSlotAvailable(vehicleOnePosition)).toBe(false);
    expect(parkingLot.isSlotAvailable(2)).toBe(true);
  });

  it('should remove vehicle from the slot', () => {
    const parkingLot = new ParkingLot(5);
    const vehicleOne = new Vehicle('xyz-123', 'White');
    const vehicleTwo = new Vehicle('abc-123', 'Black');

    const vehicleOnePosition = parkingLot.parkVehicle(vehicleOne);
    const vehicleTwoPosition = parkingLot.parkVehicle(vehicleTwo);

    parkingLot.removeVehicle(1);

    expect(parkingLot.isSlotAvailable(vehicleOnePosition)).toBe(true);
    expect(parkingLot.isSlotAvailable(vehicleTwoPosition)).toBe(false);
  });

  it('should get parking lot slot number for given vehicle registered number', () => {
    const parkingLot = new ParkingLot(5);
    const vehicleOne = new Vehicle('xyz-123', 'White');
    const vehicleTwo = new Vehicle('abc-123', 'Black');
    const vehicleThree = new Vehicle('def-123', 'White');

    parkingLot.parkVehicle(vehicleOne);
    parkingLot.parkVehicle(vehicleTwo);
    parkingLot.parkVehicle(vehicleThree);

    const slotNumber = parkingLot.getSlotNumberForRegisteredNumber('abc-123');

    expect(slotNumber).toEqual(2);
  });
});
