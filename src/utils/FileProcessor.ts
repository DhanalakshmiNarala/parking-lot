import * as fs from 'fs';
import { ParkingLotController } from '../controllers/ParkingLotController';

export class FileProcessor {
  private controller = new ParkingLotController();

  processFile(filePath: string) {
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        console.log('Error reading file:', err);
        return;
      }

      const commands = data.split('\n');
      this.processCommands(commands);
    });
  }

  private processCommands(commands: string[]) {
    commands.forEach((command) => {
      const message = this.controller.processCommand(command.trim());
      console.log(message);
    });
  }
}
