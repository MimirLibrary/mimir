import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class FileService {
  createFileForTmp(file) {
    try {
      const fileExtension = file.originalname.split('.').pop();
      const fileName = uuidv4() + '.' + fileExtension;
      const filePath = path.resolve('./packages', 'apiserver', 'tmp');
      if (!fs.existsSync(filePath)) {
        fs.mkdirSync(filePath, { recursive: true });
      }
      fs.writeFileSync(path.resolve(filePath, fileName), file.buffer);
      return fileName;
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async removeFile(fileName: string) {
    try {
      fs.unlinkSync(path.resolve('./packages', 'apiserver', 'tmp', fileName));
      return 'File was deleted';
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  moveFileInMainStorage(fileName: string, identifier: string) {
    console.log(process.cwd());
    try {
      const filePathToStorage = path.resolve(process.cwd(), 'storage');
      const fileExtension = fileName.split('.').pop();
      if (!fs.existsSync(filePathToStorage)) {
        fs.mkdirSync(filePathToStorage, { recursive: true });
      }
      fs.copyFileSync(
        path.resolve('./packages', 'apiserver', 'tmp', fileName),
        path.resolve(process.cwd(), 'storage', fileName)
      );
      fs.renameSync(
        path.resolve(process.cwd(), 'storage', fileName),
        path.resolve(process.cwd(), 'storage', `${identifier}.${fileExtension}`)
      );
      return `${identifier}.${fileExtension}`;
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
