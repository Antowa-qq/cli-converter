import * as path from 'node:path';
import * as sharp from 'sharp';
import * as fsp from 'fs/promises';
import { isPathExist } from './system';
import { SUPPORT_FILE_EXTENSION } from './constants';

const converter = async (inputPath: string, outputPath: string) => {
  const files = await fsp.readdir(inputPath);
  for await (const file of files) {
    const ext = path.parse(file).ext;
    if (!SUPPORT_FILE_EXTENSION.includes(ext)) return;
    const name = `${path.parse(file).name}.webp`;
    const input = path.join(inputPath, file);
    const output = path.join(outputPath, name);
    sharp(input).webp().toFile(output);
  }
};

const action = async (input: string, output: string) => {
  await Promise.all([isPathExist(input), isPathExist(output)]);
  await converter(input, output);
};

export { action, converter };
