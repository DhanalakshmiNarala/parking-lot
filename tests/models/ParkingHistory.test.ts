import {
  ParkingHistory,
  ParkingTimings,
} from '../../src/models/ParkingHistory';

describe('Parking History', () => {
  it('should store parking time for vehicle based on slot and registration number', () => {
    const parkingHistory = new ParkingHistory();
    const currentDate = new Date();
    parkingHistory.addVehicleParkingTime(1, 'xyz', currentDate);

    const parkingTimings: ParkingTimings =
      parkingHistory.getVehicleParkingTimings(1, 'xyz');
    expect(parkingTimings.parkedTime).toBe(currentDate);
  });

  it('should store leaving time for vehicle based on slot and registration number', () => {
    const parkingHistory = new ParkingHistory();
    const currentDate = new Date();
    parkingHistory.addVehicleParkingTime(1, 'xyz', currentDate);
    parkingHistory.addVehicleRemovedTime(1, 'xyz', currentDate);

    const parkingTimings: ParkingTimings =
      parkingHistory.getVehicleParkingTimings(1, 'xyz');
    expect(parkingTimings.leftTime).toBe(currentDate);
  });
});
