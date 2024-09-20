export class ParkingHistory {
  private history: History;

  constructor() {
    this.history = {};
  }

  addVehicleParkingTime(
    slotNumber: number,
    vehicleNumber: string,
    dateTime: Date
  ) {
    this.history[slotNumber] = {
      [vehicleNumber]: {
        parkedTime: dateTime,
      },
    };
  }

  addVehicleRemovedTime(
    slotNumber: number,
    vehicleNumber: string,
    dateTime: Date
  ) {
    this.history[slotNumber] = {
      [vehicleNumber]: {
        ...this.history[slotNumber][vehicleNumber],
        leftTime: dateTime,
      },
    };
  }

  getVehicleParkingTimings(slotNumber: number, vehicleNumber: string) {
    return this.history[slotNumber][vehicleNumber];
  }
}

export interface History {
  [slotNumber: number]: {
    [vehicleNo: string]: ParkingTimings;
  };
}

export interface ParkingTimings {
  parkedTime: Date;
  leftTime?: Date;
}
