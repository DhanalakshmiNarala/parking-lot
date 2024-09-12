import { CLIView } from './views/CLIView';

const args = process.argv.slice(2);
if (args.length > 0) {
  console.log('File handling');
} else {
  CLIView();
}
