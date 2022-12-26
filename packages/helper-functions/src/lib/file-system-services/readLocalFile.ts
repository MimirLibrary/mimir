import * as fs from 'fs';
import * as path from 'path';

interface File {
  originalname: string;
  buffer: Buffer;
}

export const readLocalFile = async (fileUrl: string): Promise<File> => {
  return new Promise((resolve, reject) => {
    const location = new URL(fileUrl);
    const filePath: string = path.resolve(
      'storage',
      ...location.pathname.split('/')
    );
    const fileName: string = filePath.split('/').pop() as string;

    try {
      const file = fs.readFileSync(filePath);
      resolve({ originalname: fileName, buffer: file });
    } catch (err) {
      err instanceof Error
        ? reject(new Error(`Can't read file. ${err.message}`))
        : reject(new Error('Unknown error'));
    }
  });
};
