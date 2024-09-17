import { calculateCostOfParkingHours } from '../../src/utils/CostCalculator';

describe('calculateCostForParkingHours', () => {
  it('should cost 50 for half an hour', () => {
    const cost = calculateCostOfParkingHours(0.5);
    expect(cost).toBe(50);
  });

  it('should cost 50 for for 10 mins', () => {
    const parkingHours = 10 / 60;
    const cost = calculateCostOfParkingHours(parkingHours);
    expect(cost).toBe(50);
  });

  it('should cost 150 for for one and half hour', () => {
    const parkingHours = 1.5;
    const cost = calculateCostOfParkingHours(parkingHours);
    expect(cost).toBe(150);
  });

  it('should cost 200 for for two hours', () => {
    const parkingHours = 2;
    const cost = calculateCostOfParkingHours(parkingHours);
    expect(cost).toBe(200);
  });
});
