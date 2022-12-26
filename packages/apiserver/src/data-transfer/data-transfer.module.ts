import { Module } from '@nestjs/common';
import { DataTransferController } from './data-transfer.controller';
import { DataTransferService } from './data-transfer.service';
import { DigitalOceanModule } from '@mimir/api-util';

@Module({
  imports: [DigitalOceanModule],
  controllers: [DataTransferController],
  providers: [DataTransferService],
})
export class DataTransferModule {}
