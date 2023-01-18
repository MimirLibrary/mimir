import { Module } from '@nestjs/common';
import { DataTransferController } from './data-transfer.controller';
import { DataTransferService } from './data-transfer.service';
import { DigitalOceanModule } from '@mimir/api-util';
import { FileModule } from '../file/file.module';

@Module({
  imports: [DigitalOceanModule, FileModule],
  controllers: [DataTransferController],
  providers: [DataTransferService],
})
export class DataTransferModule {}
