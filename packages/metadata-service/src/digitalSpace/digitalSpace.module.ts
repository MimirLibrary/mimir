import { Module } from '@nestjs/common';
import { DigitalSpaceService } from './digitalSpace.service';
@Module({
  providers: [DigitalSpaceService],
  exports: [DigitalSpaceService],
})
export class DigitalSpaceModule {}
