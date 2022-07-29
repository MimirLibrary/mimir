import {
  Controller,
  Delete,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Multer } from 'multer';
import { FileService } from './file.service';
import { SkipBlock } from '../resources/blocked-users/skipBlock.decorator';

@Controller('/file')
export class FileController {
  constructor(private fileService: FileService) {}

  @Post('/create')
  @UseInterceptors(FileInterceptor('file'))
  @SkipBlock()
  async createFile(@UploadedFile() file: Express.Multer.File) {
    return this.fileService.createFileForTmp(file);
  }

  @Delete('/delete/:fileName')
  @SkipBlock()
  async deleteFile(@Param('fileName') fileName: string) {
    return this.fileService.removeFile(fileName);
  }
}
