import { Command } from 'commander';
import { action } from './converter';
import { OptionArgs } from './types';

const program = new Command();

program
  .name('cli-converter')
  .description('Convert png, jpeg, jpg files to webp format')
  .version('1.0.0');

program
  .requiredOption('-i, --input <path>', 'Input folder path')
  .requiredOption('-o, --output <path>', 'Output folder path')
  .action(async ({ input, output }: OptionArgs) => {
    try {
      await action(input, output);
    } catch (e) {
      program.error(e as string);
    }
  })
  .parse(process.argv);
