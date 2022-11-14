import {
  Controller,
  Delete,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
  Body,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Multer } from 'multer';
import { FileService } from './file.service';
import { SkipBlock } from '../resources/blocked-users/skipBlock.decorator';
import { allowUnauthorizedRequest } from '../auth/allowUnauthorizedRequest.decorator';

@Controller('/file')
export class FileController {
  constructor(private fileService: FileService) {}

  @Post('/create')
  @SkipBlock()
  @allowUnauthorizedRequest()
  @UseInterceptors(FileInterceptor('file'))
  async createFile(@UploadedFile() file: Express.Multer.File) {
    return this.fileService.createFileForTmp(file);
  }

  @Post('/create-from-link')
  @SkipBlock()
  @allowUnauthorizedRequest()
  async createFileFromLink(@Body() body: { file?: string }) {
    // const tmpFileLink = await this.fileService.createTmpFileFromLink(body.file)
    // return this.fileService.moveFileInMainStorage(tmpFileLink, 'how-do-you-want-to-call-it')
    return this.fileService.createTmpFileFromLink(body.file);
  }

  @Delete('/delete/:fileName')
  @SkipBlock()
  @allowUnauthorizedRequest()
  async deleteFile(@Param('fileName') fileName: string) {
    return this.fileService.removeFile(fileName);
  }
}
