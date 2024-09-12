import { executeCommandsFromFile } from './utils/fileCommands';
import { CLIView } from './views/CLIView';

const args = process.argv.slice(2);
if (args.length > 0) {
  executeCommandsFromFile(args[0]);
} else {
  CLIView();
}
