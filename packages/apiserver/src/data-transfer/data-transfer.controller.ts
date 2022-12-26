import { Controller, Get } from '@nestjs/common';
import { DataTransferService } from './data-transfer.service';
import { allowUnauthorizedRequest } from '../auth/allowUnauthorizedRequest.decorator';
import { SkipBlock } from '../resources/blocked-users/skipBlock.decorator';
import { DataTransferOut } from './data-transfer';

@Controller('data-transfer')
export class DataTransferController {
  constructor(private dataTransfer: DataTransferService) {}

  @Get()
  @allowUnauthorizedRequest()
  @SkipBlock()
  TransferData(): Promise<DataTransferOut> {
    return this.dataTransfer.move();
  }
}
