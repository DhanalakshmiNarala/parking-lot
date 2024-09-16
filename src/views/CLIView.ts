import * as readline from 'readline';
import { ParkingLotController } from '../controllers/ParkingLotController';
import { EXIT } from '../constants/Commands';

export class CLIView {
  private controller = new ParkingLotController();

  private inputReader = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  display() {
    this.inputReader.on('line', (input) => {
      try {
        const command = input.trim();
        if (command.toLowerCase() === EXIT) {
          this.handleExitCommand();
        }

        const message = this.controller.processCommand(command);
        console.log(message);
      } catch (error) {
        console.log((error as Error).message);
      }
    });
  }

  private handleExitCommand() {
    console.log('Exiting CLI...');
    this.inputReader.close();
    process.exit(0);
  }
}
