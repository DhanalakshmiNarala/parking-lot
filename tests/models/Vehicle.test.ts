import { Vehicle } from '../../src/models/Vehicle';

describe('Vehicle', () => {
  it('should create vehicle with given info', () => {
    const vehicle = new Vehicle('xyz-123', 'White');
    expect(vehicle.getRegisteredNumber()).toBe('xyz-123');
    expect(vehicle.getColor()).toBe('White');
  });
});
