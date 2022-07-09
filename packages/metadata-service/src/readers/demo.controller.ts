import { Controller, Get, Param } from '@nestjs/common';
import { ReaderService } from './reader.service';

@Controller()
export class DemoController {
  constructor(private readonly readerService: ReaderService) {}

  @Get('/search/:isbn')
  test(@Param('isbn') isbn: string) {
    return this.readerService.lookup(isbn);
  }
}
