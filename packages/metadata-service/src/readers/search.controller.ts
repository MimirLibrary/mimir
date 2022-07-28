import { Controller, Get, NotFoundException, Param } from '@nestjs/common';
import { ReaderService } from './reader.service';

@Controller()
export class SearchController {
  constructor(private readonly readerService: ReaderService) {}

  @Get('/search/:isbn')
  async search(@Param('isbn') isbn: string) {
    const item = await this.readerService.lookup(isbn);
    if (item === undefined) {
      console.error('Not Found!');
      throw new NotFoundException(`Identifier "${isbn}" not found!`);
    }
    return item;
  }
}
