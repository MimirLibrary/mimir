import { Module } from '@nestjs/common';
import { BookResolver } from './book.resolver';

@Module({
  providers: [BookResolver],
})
export class BookModule {}
