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
      const filePath = path.resolve('storage', 'tmp');
      if (!fs.existsSync(filePath)) {
        fs.mkdirSync(filePath, { recursive: true });
      }
      fs.writeFileSync(path.resolve(filePath, fileName), file.buffer);
      return `${process.env['NX_API_ROOT_URL']}/tmp/${fileName}`;
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async removeFile(fileName: string) {
    try {
      fs.unlinkSync(path.resolve(process.cwd(), 'storage', 'tmp', fileName));
      return 'File was deleted';
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  moveFileInMainStorage(fileName: string | null, identifier: string) {
    if (!fileName) return null;
    if (/http/.test(fileName.split('//')[0])) return fileName;
    try {
      const onlyFileName = fileName.split('/').pop();
      const filePathToStorage = path.resolve(
        process.cwd(),
        'storage',
        'mainData'
      );
      const fileExtension = fileName.split('.').pop();
      if (!fs.existsSync(filePathToStorage)) {
        fs.mkdirSync(filePathToStorage, { recursive: true });
      }
      fs.copyFileSync(
        path.resolve(process.cwd(), 'storage', 'tmp', onlyFileName),
        path.resolve(process.cwd(), 'storage', 'mainData', onlyFileName)
      );
      fs.renameSync(
        path.resolve(process.cwd(), 'storage', 'mainData', onlyFileName),
        path.resolve(
          process.cwd(),
          'storage',
          'mainData',
          `${identifier}.${fileExtension}`
        )
      );
      fs.unlinkSync(
        path.resolve(process.cwd(), 'storage', 'tmp', onlyFileName)
      );
      return `${process.env['NX_API_ROOT_URL']}/mainData/${identifier}.${fileExtension}`;
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
