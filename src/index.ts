import { FileProcessor } from './utils/FileProcessor';
import { CLIView } from './views/CliView';

const main = () => {
  const args = process.argv.slice(2);
  if (args.length > 0) {
    const fileProcessor = new FileProcessor();
    fileProcessor.processFile(args[0]);
  } else {
    const cliView = new CLIView();
    cliView.display();
  }
};

main();
