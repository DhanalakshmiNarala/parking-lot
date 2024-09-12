import { ParkingLot } from '../../src/models/ParkingLot';
import { Vehicle } from '../../src/models/Vehicle';

describe('Parking Lot', () => {
  it('should create parking lot with the given capacity ', () => {
    const parkingLot = new ParkingLot(5);
    expect(parkingLot.getCapacity()).toBe(5);
  });

  it('should create parking spots with default availability true', () => {
    const parkingLot = new ParkingLot(5);

    const spots = parkingLot.getParkingSpots();
    for (let i = 0; i < 5; i++) {
      expect(spots[i].isAvailable()).toBe(true);
    }
  });

  it('should park vehicle at the earlier spot', () => {
    const parkingLot = new ParkingLot(5);
    const vehicleOne = new Vehicle('xyz-123', 'White');
    const vehicleTwo = new Vehicle('abc-123', 'Black');

    const vehicleOnePosition = parkingLot.parkVehicle(vehicleOne);
    const vehicleTwoPosition = parkingLot.parkVehicle(vehicleTwo);

    expect(vehicleOnePosition).toBe(1);
    expect(vehicleTwoPosition).toBe(2);
  });

  it('should return spot availability', () => {
    const parkingLot = new ParkingLot(5);
    const vehicleOne = new Vehicle('xyz-123', 'White');

    const vehicleOnePosition = parkingLot.parkVehicle(vehicleOne);

    expect(parkingLot.isSpotAvailable(vehicleOnePosition)).toBe(false);
    expect(parkingLot.isSpotAvailable(2)).toBe(true);
  });

  it('should remove vehicle from the spot', () => {
    const parkingLot = new ParkingLot(5);
    const vehicleOne = new Vehicle('xyz-123', 'White');
    const vehicleTwo = new Vehicle('abc-123', 'Black');

    const vehicleOnePosition = parkingLot.parkVehicle(vehicleOne);
    const vehicleTwoPosition = parkingLot.parkVehicle(vehicleTwo);

    parkingLot.removeVehicle(vehicleOne);

    expect(parkingLot.isSpotAvailable(vehicleOnePosition)).toBe(true);
    expect(parkingLot.isSpotAvailable(vehicleTwoPosition)).toBe(false);
  });

  it('should get vehicle registered numbers whose color is white', () => {
    const parkingLot = new ParkingLot(5);
    const vehicleOne = new Vehicle('xyz-123', 'White');
    const vehicleTwo = new Vehicle('abc-123', 'Black');
    const vehicleThree = new Vehicle('def-123', 'White');
    const vehicleFour = new Vehicle('uvf-123', 'Blue');

    parkingLot.parkVehicle(vehicleOne);
    parkingLot.parkVehicle(vehicleTwo);
    parkingLot.parkVehicle(vehicleThree);
    parkingLot.parkVehicle(vehicleFour);

    const registeredNumbers =
      parkingLot.getVehicleRegisteredNumbersWithColor('White');
    const expectedNumbers = ['xyz-123', 'def-123'];

    expect(registeredNumbers).toEqual(expectedNumbers);
  });
});
