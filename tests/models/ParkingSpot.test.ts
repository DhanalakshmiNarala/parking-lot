import { ParkingSpot } from '../../src/models/ParkingSpot';

describe('Parking Spot', () => {
  it('should create parking spot', () => {
    const parkingSpot = new ParkingSpot(1, true);
    expect(parkingSpot.getPosition()).toBe(1);
    expect(parkingSpot.isAvailable()).toBe(true);
  });
});
