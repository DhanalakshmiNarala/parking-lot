import { ParkingLotController } from '../../src/controllers/ParkingLotController';

describe('ParkingLotController', () => {
  it.only('should create parking lot with given capacity', () => {
    const controller = new ParkingLotController();

    const commandOne = 'create_parking_lot 6';
    const commandTwo = 'create_parking_lot 2';

    const messageOne = controller.processCommand(commandOne);
    const messageTwo = controller.processCommand(commandTwo);

    expect(messageOne).toBe('Created a parking lot with 6 slots');
    expect(messageTwo).toBe('Created a parking lot with 2 slots');
  });

  it('should park vehicle in parking lot', () => {
    const controller = new ParkingLotController();

    const commandOne = 'park KA-01-HH-1234 White';
    const commandTwo = 'park KA-01-BB-0001 Black';
    const commandThree = 'park KA-01-HH-7777 Red';
    const commandFour = 'park KA-01-HH-3141 Black';

    const messageOne = controller.processCommand(commandOne);
    const messageTwo = controller.processCommand(commandTwo);
    const messageThree = controller.processCommand(commandThree);
    const messageFour = controller.processCommand(commandFour);

    expect(messageOne).toBe('Allocated slot number: 1');
    expect(messageTwo).toBe('Allocated slot number: 2');
    expect(messageThree).toBe('Allocated slot number: 3');
    expect(messageFour).toBe('Sorry, parking lot is full');
  });

  it('should leave parked vehicle from parking lot', () => {
    const controller = new ParkingLotController();

    const commandOne = 'park KA-01-HH-1234 White';
    const commandTwo = 'park KA-01-BB-0001 Black';
    const commandThree = 'leave 2';

    controller.processCommand(commandOne);
    controller.processCommand(commandTwo);
    const message = controller.processCommand(commandThree);

    expect(message).toBe('Slot number 2 is free');
  });

  it('should give parking lot status', () => {
    const controller = new ParkingLotController();

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

  it('should give vehicle registration numbers for the given vehicle color', () => {
    const controller = new ParkingLotController();

    const commandOne = 'park KA-01-HH-1234 White';
    const commandTwo = 'park KA-01-BB-0001 Black';
    const commandThree = 'park KA-01-HH-7777 White';
    const commandFour = 'registration_numbers_for_cars_with_colour White';

    controller.processCommand(commandOne);
    controller.processCommand(commandTwo);
    controller.processCommand(commandThree);

    const message = controller.processCommand(commandFour);
    const expectedMessage = ['KA-01-HH-1234', 'KA-01-HH-7777'].join(', ');

    expect(message).toBe(expectedMessage);
  });

  it('should give slot numbers for the given vehicle color', () => {
    const controller = new ParkingLotController();

    const commandOne = 'park KA-01-HH-1234 White';
    const commandTwo = 'park KA-01-BB-0001 Black';
    const commandThree = 'park KA-01-HH-7777 White';
    const commandFour = 'slot_numbers_for_cars_with_colour White';

    controller.processCommand(commandOne);
    controller.processCommand(commandTwo);
    controller.processCommand(commandThree);

    const message = controller.processCommand(commandFour);
    expect(message).toBe(`1, 3`);
  });

  it('should give slot numbers for the given vehicle registraction number', () => {
    const controller = new ParkingLotController();

    const commandOne = 'park KA-01-HH-1234 White';
    const commandTwo = 'park KA-01-BB-0001 Black';
    const commandThree = 'slot_number_for_registration_number KA-01-BB-0001';
    const commandFour = 'slot_number_for_registration_number KA-01-P-333';

    controller.processCommand(commandOne);
    controller.processCommand(commandTwo);

    const messageOne = controller.processCommand(commandThree);
    const messageTwo = controller.processCommand(commandFour);

    expect(messageOne).toBe('2');
    expect(messageTwo).toBe('Not found');
  });
});
