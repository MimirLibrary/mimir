import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { DbService } from './db.service';
import { SearchController } from './search.controller';
import { OzbyService } from './ozby.service';
import { LabirintService } from './labirint.service';
import { ReaderService } from './reader.service';
import { ChitaiGorodService } from './chitai-gorod.service';

@Module({
  providers: [
    ReaderService,
    DbService,
    OzbyService,
    PrismaService,
    LabirintService,
    ChitaiGorodService,
  ],
  controllers: [SearchController],
})
export class ReadersModules {}
