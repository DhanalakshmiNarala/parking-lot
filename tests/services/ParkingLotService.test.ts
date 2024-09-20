import { ParkingLotService } from '../../src/services/ParkingLotService';

describe('ParkingLotService', () => {
  const service = new ParkingLotService();

  describe('create parking lot', () => {
    it('should handle invalid capacity', () => {
      expect(() => {
        service.createParkingLot(-1);
      }).toThrow("Invalid 'Capacity': It must be greater than 0.");
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

    const currentDateTime = new Date().toISOString();
    const messageOne = service.parkVehicle(
      'KA-01-HH-1234',
      'White',
      currentDateTime
    );
    const messageTwo = service.parkVehicle(
      'KA-01-BB-0001',
      'Red',
      currentDateTime
    );
    const messageThree = service.parkVehicle(
      'KA-01-HH-3141',
      'Black',
      currentDateTime
    );

    expect(messageOne).toBe('Allocated slot number: 1');
    expect(messageTwo).toBe('Allocated slot number: 2');
    expect(messageThree).toBe('Sorry, parking lot is full');
  });

  it('should leave parked vehicle from parking lot', () => {
    service.createParkingLot(3);
    const currentDateTime = new Date().toISOString();
    service.parkVehicle('KA-01-HH-1234', 'White', currentDateTime);
    service.parkVehicle('KA-01-BB-0001', 'Black', '2024-09-18T10:35:12.123Z'); // 10 am

    const message = service.removeVehicle(2, '2024-09-18T12:35:12.123Z'); // 12 pm

    const lineOne = 'Slot number 2 is free';
    const lineTwo = 'Total parking cost: 200'; // 50 + 1.5 * 100
    const expectedMessage = [lineOne, lineTwo].join('\n');

    expect(message).toBe(expectedMessage);
  });

  it('should give parking lot status', () => {
    service.createParkingLot(3);
    const currentDateTime = new Date().toISOString();
    service.parkVehicle('KA-01-HH-1234', 'White', currentDateTime);
    service.parkVehicle('KA-01-BB-0001', 'Black', currentDateTime);

    const message = service.status();
    const lineOne = 'Slot No.\tRegistration No\tColour';
    const lineTwo = '1\tKA-01-HH-1234\tWhite';
    const lineThree = '2\tKA-01-BB-0001\tBlack';
    const expectedMessage = [lineOne, lineTwo, lineThree].join('\n');

    expect(message).toBe(expectedMessage);
  });

  it('should give vehicle registration numbers for the given vehicle color', () => {
    service.createParkingLot(3);
    const currentDateTime = new Date().toISOString();
    service.parkVehicle('KA-01-HH-1234', 'White', currentDateTime);
    service.parkVehicle('KA-01-BB-0001', 'Black', currentDateTime);
    service.parkVehicle('KA-01-HH-7777', 'White', currentDateTime);

    const message = service.getVehicleRegisteredNumbersWithColor('White');
    const expectedMessage = ['KA-01-HH-1234', 'KA-01-HH-7777'].join(', ');
    expect(message).toBe(expectedMessage);
  });

  it('should give slot numbers for the given vehicle color', () => {
    service.createParkingLot(3);
    const currentDateTime = new Date().toISOString();
    service.parkVehicle('KA-01-HH-1234', 'White', currentDateTime);
    service.parkVehicle('KA-01-BB-0001', 'Black', currentDateTime);
    service.parkVehicle('KA-01-HH-7777', 'White', currentDateTime);

    const message = service.getSlotNumbersWithVehicleColor('White');
    expect(message).toBe(`1, 3`);
  });

  it('should give slot numbers for the given vehicle registraction number', () => {
    service.createParkingLot(3);
    const currentDateTime = new Date().toISOString();
    service.parkVehicle('KA-01-HH-1234', 'White', currentDateTime);
    service.parkVehicle('KA-01-BB-0001', 'Black', currentDateTime);

    const messageOne =
      service.getSlotNumberForRegisteredNumber('KA-01-BB-0001');
    const messageTwo = service.getSlotNumberForRegisteredNumber('KA-01-P-333');

    expect(messageOne).toBe('2');
    expect(messageTwo).toBe('Not found');
  });
});
