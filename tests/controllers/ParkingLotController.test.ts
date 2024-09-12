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

  it('should park vehicle in parking lot', () => {
    const parkingLot = new ParkingLot(6);
    const controller = new ParkingLotController(parkingLot);

    const commandOne = 'park KA-01-HH-1234 White';
    const commandTwo = 'park KA-01-BB-0001 Black';
    const commandThree = 'park KA-01-HH-7777 Red';

    const messageOne = controller.processCommand(commandOne);
    const messageTwo = controller.processCommand(commandTwo);
    const messageThree = controller.processCommand(commandThree);

    expect(messageOne).toBe('Allocated slot number: 1');
    expect(messageTwo).toBe('Allocated slot number: 2');
    expect(messageThree).toBe('Allocated slot number: 3');
  });

  it('should leave parked vehicle from parking lot', () => {
    const parkingLot = new ParkingLot(3);
    const controller = new ParkingLotController(parkingLot);

    const commandOne = 'park KA-01-HH-1234 White';
    const commandTwo = 'park KA-01-BB-0001 Black';
    const commandThree = 'leave 2';

    controller.processCommand(commandOne);
    controller.processCommand(commandTwo);
    const message = controller.processCommand(commandThree);

    expect(message).toBe('Slot number 2 is free');
  });

  it('should give parking lot status', () => {
    const parkingLot = new ParkingLot(3);
    const controller = new ParkingLotController(parkingLot);

    const commandOne = 'park KA-01-HH-1234 White';
    const commandTwo = 'park KA-01-BB-0001 Black';
    const commandThree = 'park KA-01-HH-7777 Red';
    const commandFour = 'status';

    controller.processCommand(commandOne);
    controller.processCommand(commandTwo);
    controller.processCommand(commandThree);

    const message = controller.processCommand(commandFour);
    const lineOne = 'Slot No.\tRegistration No\tColour';
    const lineTwo = '1\tKA-01-HH-1234\tWhite';
    const lineThree = '2\tKA-01-BB-0001\tBlack';
    const lineFour = '3\tKA-01-HH-7777\tRed';
    const expectedMessage = [lineOne, lineTwo, lineThree, lineFour].join('\n');

    expect(message).toBe(expectedMessage);
  });
});
