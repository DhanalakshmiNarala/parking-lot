import { ParkingLot } from '../../src/models/ParkingLot';

describe('Parking Lot', () => {
  test('should create parking lot with the given capacity', () => {
    const parkingLot = new ParkingLot(5);
    expect(parkingLot.getCapacity()).toBe(5);
  });
});
