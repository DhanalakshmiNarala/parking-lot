import { ParkingLot } from '../../src/models/ParkingLot';

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
});
