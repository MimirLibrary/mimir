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
import { DigitalSpaceService } from '@mimir/digital-space';
@Controller('/file')
export class FileController {
  constructor(private digitalSpaceService: DigitalSpaceService) {}

  @Post('/create')
  @SkipBlock()
  @allowUnauthorizedRequest()
  @UseInterceptors(FileInterceptor('file'))
  async createFile(@UploadedFile() file: Express.Multer.File) {
    return this.digitalSpaceService.createFile(file);
  }

  @Delete('/delete/:fileName')
  @SkipBlock()
  @allowUnauthorizedRequest()
  async deleteFile(@Param('fileName') fileName: string) {
    return this.digitalSpaceService.removeFile(fileName);
  }
}
