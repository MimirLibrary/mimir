import { Module } from '@nestjs/common';
import { DigitalSpaceService } from './digital-space.service';
@Module({
  providers: [DigitalSpaceService],
  exports: [DigitalSpaceService],
})
export class DigitalSpaceModule {}
