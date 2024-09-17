import { getCostForParkingHours } from '../../src/utils/CostCalculator';

describe('Cost Calculator', () => {
  it('should cost 50 for half an hour', () => {
    const cost = getCostForParkingHours(0.5);
    expect(cost).toBe(50);
  });

  it('should cost 50 for for 10 mins', () => {
    const duration = 10 / 60;
    const cost = getCostForParkingHours(duration);
    expect(cost).toBe(50);
  });

  it('should cost 150 for for one and half hour', () => {
    const duration = 1.5;
    const cost = getCostForParkingHours(duration);
    expect(cost).toBe(150);
  });

  it('should cost 200 for for two hours', () => {
    const duration = 2;
    const cost = getCostForParkingHours(duration);
    expect(cost).toBe(200);
  });
});
