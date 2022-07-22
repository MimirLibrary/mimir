import { Injectable } from '@nestjs/common';
import { DbService } from './db.service';
import { OzbyService } from './ozby.service';

@Injectable()
export class ReaderService {
  constructor(private db: DbService, private ozbyReader: OzbyService) {}

  async lookup(isbn: string) {
    const existing = await this.db.findMaterial(isbn);
    if (existing !== null) {
      console.log('Matched!');
      return existing;
    }
    // const j = require('./ozby.service/snapshots/2022-07-06--1/result.json');

    const content = await this.ozbyReader.readData(isbn);
    const obj = this.ozbyReader.parseData(content);
    await this.db.syncMaterial(isbn, obj);
    return obj;
  }
}
