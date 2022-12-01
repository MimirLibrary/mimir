import { Module } from '@nestjs/common';
import { FileService } from './file.service';
import { FileController } from './file.controller';
import { DigitalSpaceModule } from '@mimir/digital-space';

@Module({
  imports: [DigitalSpaceModule],
  controllers: [FileController],
  providers: [FileService],
})
export class FileModule {}
