import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import * as path from 'path';
import * as fs from 'fs';
import { File } from './file';
import * as process from 'process';

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

  removeFile(fileUrl: string): void {
    const location = this.parseFileLocation(fileUrl);
    const filePath: string = path.resolve(
      process.cwd(),
      'storage',
      ...location.pathname.split('/')
    );
    try {
      fs.unlinkSync(filePath);
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  readFile(fileUrl: string): File {
    const location = this.parseFileLocation(fileUrl);
    const filePath: string = path.resolve(
      'storage',
      ...location.pathname.split('/')
    );
    const fileName: string = filePath.split('/').pop() as string;

    try {
      const file = fs.readFileSync(filePath);
      return { originalname: fileName, buffer: file };
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

  private parseFileLocation(path: string): URL {
    try {
      return new URL(path);
    } catch (e) {
      return new URL(path, process.env['NX_API_ROOT_URL']);
    }
  }
}
