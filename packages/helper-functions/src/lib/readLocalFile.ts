import * as fs from 'fs';
import * as path from 'path';

export const readLocalFile = (
  fileUrl: string
): { originalname: string; buffer?: Buffer } => {
  const filePath: string = path.resolve(
    'storage',
    fileUrl.replace('http://localhost:3333/', '')
  );
  const fileName: string = fileUrl.replace('http://localhost:3333/tmp/', '');
  try {
    const file = fs.readFileSync(filePath);
    return { originalname: fileName, buffer: file };
  } catch (e) {
    console.error(e);
    return { originalname: '', buffer: undefined };
  }
};
