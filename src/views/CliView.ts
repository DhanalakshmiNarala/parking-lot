import * as readline from 'readline';
import { ParkingLotController } from '../controllers/ParkingLotController';
import { ParkingLot } from '../models/ParkingLot';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const parkingLot = new ParkingLot(10);
const controller = new ParkingLotController(parkingLot);

export const CLIView = () => {
  rl.on('line', (input) => {
    try {
      console.log(controller.processCommand(input.trim()));
    } catch (error) {
      console.log(error);
    }
  });
};
