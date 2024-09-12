import * as fs from 'fs';
import { ParkingLot } from '../models/ParkingLot';
import { ParkingLotController } from '../controllers/ParkingLotController';

const parkingLot = new ParkingLot(10);
const controller = new ParkingLotController(parkingLot);

export const executeCommandsFromFile = (filePath: string) => {
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading file:', err);
      return;
    }

    const commands = data.split('\n');
    commands.forEach((command) => {
      console.log(controller.processCommand(command.trim()));
    });
  });
};
