import { ParkingLotService } from '../../src/services/ParkingLotService';

describe('ParkingLotService', () => {
  const service = new ParkingLotService();

  describe('create parking lot', () => {
    it('should handle invalid capacity', () => {
      expect(() => {
        service.createParkingLot(-1);
      }).toThrow('Invalid parking lot size');
    });

    it('should create parking lot with given capacity', () => {
      const responseOne = service.createParkingLot(6);
      const responseTwo = service.createParkingLot(2);

      expect(responseOne).toBe('Created a parking lot with 6 slots');
      expect(responseTwo).toBe('Created a parking lot with 2 slots');
    });
  });

  it('should park vehicle in parking lot', () => {
    service.createParkingLot(2);

    const messageOne = service.parkVehicle('KA-01-HH-1234', 'White');
    const messageTwo = service.parkVehicle('KA-01-BB-0001', 'Red');
    const messageThree = service.parkVehicle('KA-01-HH-3141', 'Black');

    expect(messageOne).toBe('Allocated slot number: 1');
    expect(messageTwo).toBe('Allocated slot number: 2');
    expect(messageThree).toBe('Sorry, parking lot is full');
  });
});
