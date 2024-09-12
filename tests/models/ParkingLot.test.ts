import { ParkingLot } from '../../src/models/ParkingLot';
import { Vehicle } from '../../src/models/Vehicle';

describe('Parking Lot', () => {
  it('should create parking lot with the given capacity ', () => {
    const parkingLot = new ParkingLot(5);
    expect(parkingLot.getCapacity()).toBe(5);
  });

  it('Should create parking spots with default availability true', () => {
    const parkingLot = new ParkingLot(5);

    const spots = parkingLot.getParkingSpots();
    for (let i = 0; i < 5; i++) {
      expect(spots[i].isAvailable()).toBe(true);
    }
  });

  it('Should park vehicle at the earlier spot', () => {
    const parkingLot = new ParkingLot(5);
    const vehicleOne = new Vehicle('xyz-123', 'White');
    const vehicleTwo = new Vehicle('abc-123', 'Black');

    const vehicleOnePosition = parkingLot.parkVehicle(vehicleOne);
    const vehicleTwoPosition = parkingLot.parkVehicle(vehicleTwo);

    expect(vehicleOnePosition).toBe(1);
    expect(vehicleTwoPosition).toBe(2);
  });
});
