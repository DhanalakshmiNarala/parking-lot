import { executeCommandsFromFile } from './utils/FileCommands';
import { CLIView } from './views/CliView';

const args = process.argv.slice(2);
if (args.length > 0) {
  executeCommandsFromFile(args[0]);
} else {
  CLIView();
}
