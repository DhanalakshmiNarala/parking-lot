import { ParkingLotService } from '../../src/services/ParkingLotService';
import { getCostForParkingHours } from '../../src/utils/CostCalculator';
import { getTimeDifferenceInHours } from '../../src/utils/TimeHelpers';

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

    const messageOne = service.parkVehicle('KA-01-HH-1234', 'White');
    const messageTwo = service.parkVehicle('KA-01-BB-0001', 'Red');
    const messageThree = service.parkVehicle('KA-01-HH-3141', 'Black');

    expect(messageOne).toBe('Allocated slot number: 1');
    expect(messageTwo).toBe('Allocated slot number: 2');
    expect(messageThree).toBe('Sorry, parking lot is full');
  });

  it('should leave parked vehicle from parking lot', () => {
    service.createParkingLot(3);
    service.parkVehicle('KA-01-HH-1234', 'White');
    const vehicleTwoParkedTime = new Date();
    service.parkVehicle('KA-01-BB-0001', 'Black');

    const vehicleTwoRemovedTime = new Date();
    const message = service.removeVehicle(2);
    const duration = getTimeDifferenceInHours(
      vehicleTwoParkedTime,
      vehicleTwoRemovedTime
    );
    const expectedCost = getCostForParkingHours(duration);

    const lineOne = 'Slot number 2 is free';
    const lineTwo = `Total parking cost: ${expectedCost}`;
    const expectedMessage = [lineOne, lineTwo].join('\n');

    expect(message).toBe(expectedMessage);
  });

  it('should give parking lot status', () => {
    service.createParkingLot(3);
    service.parkVehicle('KA-01-HH-1234', 'White');
    service.parkVehicle('KA-01-BB-0001', 'Black');

    const message = service.status();
    const lineOne = 'Slot No.\tRegistration No\tColour';
    const lineTwo = '1\tKA-01-HH-1234\tWhite';
    const lineThree = '2\tKA-01-BB-0001\tBlack';
    const expectedMessage = [lineOne, lineTwo, lineThree].join('\n');

    expect(message).toBe(expectedMessage);
  });

  it('should give vehicle registration numbers for the given vehicle color', () => {
    service.createParkingLot(3);
    service.parkVehicle('KA-01-HH-1234', 'White');
    service.parkVehicle('KA-01-BB-0001', 'Black');
    service.parkVehicle('KA-01-HH-7777', 'White');

    const message = service.getVehicleRegisteredNumbersWithColor('White');
    const expectedMessage = ['KA-01-HH-1234', 'KA-01-HH-7777'].join(', ');
    expect(message).toBe(expectedMessage);
  });

  it('should give slot numbers for the given vehicle color', () => {
    service.createParkingLot(3);
    service.parkVehicle('KA-01-HH-1234', 'White');
    service.parkVehicle('KA-01-BB-0001', 'Black');
    service.parkVehicle('KA-01-HH-7777', 'White');

    const message = service.getSlotNumbersWithVehicleColor('White');
    expect(message).toBe(`1, 3`);
  });

  it('should give slot numbers for the given vehicle registraction number', () => {
    service.createParkingLot(3);
    service.parkVehicle('KA-01-HH-1234', 'White');
    service.parkVehicle('KA-01-BB-0001', 'Black');

    const messageOne =
      service.getSlotNumberForRegisteredNumber('KA-01-BB-0001');
    const messageTwo = service.getSlotNumberForRegisteredNumber('KA-01-P-333');

    expect(messageOne).toBe('2');
    expect(messageTwo).toBe('Not found');
  });
});
