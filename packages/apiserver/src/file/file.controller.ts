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
import { SkipBlock } from '../resources/blocked-users/skipBlock.decorator';
import { allowUnauthorizedRequest } from '../auth/allowUnauthorizedRequest.decorator';
import { DigitalOceanService } from '@mimir/api-util';
@Controller('/file')
export class FileController {
  constructor(private digitalOceanService: DigitalOceanService) {}

  @Post('/create')
  @SkipBlock()
  @allowUnauthorizedRequest()
  @UseInterceptors(FileInterceptor('file'))
  async createFile(@UploadedFile() file: Express.Multer.File) {
    return this.digitalOceanService.createFile(file);
  }

  @Delete('/delete/:fileName')
  @SkipBlock()
  @allowUnauthorizedRequest()
  async deleteFile(@Param('fileName') fileName: string) {
    return this.digitalOceanService.removeFile(fileName);
  }
}
