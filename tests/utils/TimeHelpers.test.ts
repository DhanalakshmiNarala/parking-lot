import {
  getTimeDifferenceInHours,
  isISOFormatDateString as isValidISODateString,
} from '../../src/utils/TimeHelpers';

describe('getTimeDifferenceInHours', () => {
  it('should return 1 hour difference', () => {
    const startTime = new Date('2024-09-17T12:00:00'); // 12:00 PM
    const endTime = new Date('2024-09-17T13:00:00'); // 1:00 PM
    const result = getTimeDifferenceInHours(startTime, endTime);
    expect(result).toBe(1);
  });

  it('should return 0 hour difference for same time', () => {
    const startTime = new Date('2024-09-17T12:00:00');
    const endTime = new Date('2024-09-17T12:00:00');
    const result = getTimeDifferenceInHours(startTime, endTime);
    expect(result).toBe(0);
  });

  it('should handle time difference spanning multiple hours', () => {
    const startTime = new Date('2024-09-17T10:00:00'); // 10:00 AM
    const endTime = new Date('2024-09-17T16:00:00'); // 4:00 PM
    const result = getTimeDifferenceInHours(startTime, endTime);
    expect(result).toBe(6);
  });

  it('should process "2024-09-18T08:24:56.123Z" as valid iso date string', () => {
    const result = isValidISODateString('2024-09-18T08:24:56.123Z');
    expect(result).toBe(true);
  });

  it('should process "2024-09-18 08:24:56" as invalid iso date string', () => {
    const result = isValidISODateString('2024-09-18 08:24:56');
    expect(result).toBe(false);
  });

  it('should process "xyz" as invalid iso date string', () => {
    const result = isValidISODateString('xyz');
    expect(result).toBe(false);
  });
});
