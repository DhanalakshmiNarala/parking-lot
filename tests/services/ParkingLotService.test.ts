import { ParkingLotService } from '../../src/services/ParkingLotService';

describe('ParkingLotService', () => {
  describe('create parking lot', () => {
    it('should handle invalid capacity', () => {
      const service = new ParkingLotService();
      expect(() => {
        service.createParkingLot(-1);
      }).toThrow('Invalid parking lot size');
    });

    it('should create parking lot with given capacity', () => {
      const service = new ParkingLotService();

      const responseOne = service.createParkingLot(6);
      const responseTwo = service.createParkingLot(2);

      expect(responseOne).toBe('Created a parking lot with 6 slots');
      expect(responseTwo).toBe('Created a parking lot with 2 slots');
    });
  });
});
