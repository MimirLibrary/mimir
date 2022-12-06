import { Module } from '@nestjs/common';
import { DigitalOceanService } from './digital-ocean.service';
@Module({
  providers: [DigitalOceanService],
  exports: [DigitalOceanService],
})
export class DigitalOceanModule {}
