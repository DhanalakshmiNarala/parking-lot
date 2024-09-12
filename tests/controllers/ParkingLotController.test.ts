import { ParkingLotController } from '../../src/controllers/ParkingLotController';
import { ParkingLot } from '../../src/models/ParkingLot';

describe('ParkingLotController', () => {
  it('should create parking lot with given capacity', () => {
    const parkingLot = new ParkingLot(0);
    const controller = new ParkingLotController(parkingLot);

    const commandOne = 'create_parking_lot 6';
    const commandTwo = 'create_parking_lot 2';

    const messageOne = controller.processCommand(commandOne);
    const messageTwo = controller.processCommand(commandTwo);

    expect(messageOne).toBe('Created a parking lot with 6 slots');
    expect(messageTwo).toBe('Created a parking lot with 2 slots');
  });
});
