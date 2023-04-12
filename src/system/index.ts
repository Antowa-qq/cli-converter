import * as fsp from 'fs/promises';

export const isPathExist = async (path: string) => {
  try {
    await fsp.access(path);
  } catch (e) {
    throw new Error(`"${path}" path does not exist`);
  }
};
