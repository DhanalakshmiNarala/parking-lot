import * as readline from 'readline';
import { ParkingLotController } from '../controllers/ParkingLotController';

export class CLIView {
  private controller = new ParkingLotController();

  private inputReader = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  displayView() {
    this.inputReader.on('line', (input) => {
      try {
        console.log(this.controller.processCommand(input.trim()));
      } catch (error) {
        console.log(error);
      }
    });
  }
}
