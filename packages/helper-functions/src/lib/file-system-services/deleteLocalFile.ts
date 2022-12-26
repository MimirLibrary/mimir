import * as fs from 'fs';
import * as path from 'path';

export const deleteLocalFile = async (fileUrl: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const location = new URL(fileUrl);
    const filePath: string = path.resolve(
      process.cwd(),
      'storage',
      ...location.pathname.split('/')
    );
    try {
      fs.unlinkSync(filePath);
      resolve();
    } catch (err) {
      err instanceof Error
        ? reject(new Error(`Can't read file. ${err.message}`))
        : reject(new Error('Unknown error'));
    }
  });
};
