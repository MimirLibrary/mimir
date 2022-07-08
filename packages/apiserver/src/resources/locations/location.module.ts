import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Location } from './location.entity';
import { LocationResolver } from './location.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Location])],
  providers: [LocationResolver],
})
export class LocationModule {}
