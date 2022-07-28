import { Controller, Get, NotFoundException, Param } from '@nestjs/common';
import { ReaderService } from './reader.service';
import { ChitaiGorodService } from './chitai-gorod.service';

@Controller()
export class SearchController {
  constructor(
    private readonly readerService: ReaderService // private readonly chitaiGorodService: ChitaiGorodService
  ) {}

  @Get('/search/:isbn')
  async search(@Param('isbn') isbn: string) {
    const item = await this.readerService.lookup(isbn);
    if (item === undefined) {
      console.error('Not Found!');
      throw new NotFoundException(`Identifier "${isbn}" not found!`);
    }
    return item;
  }

  // @Get('/search1/:isbn')
  // async search1(@Param('isbn') isbn: string) {
  //   const item = await this.chitaiGorodService.readData(isbn);
  //   if (item === undefined) {
  //     console.error('Not Found!');
  //     throw new NotFoundException(`Identifier "${isbn}" not found!`);
  //   }
  //   return item;
  // }
}
