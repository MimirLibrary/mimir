import { Injectable } from '@nestjs/common';
import { DbService } from './db.service';
import { OzbyService } from './ozby.service';

@Injectable()
export class ReaderService {
  constructor(private db: DbService, private ozbyReader: OzbyService) {}

  async lookup(isbn: string) {
    const existing = await this.db.findMaterial(isbn);
    // Log access action. Don't await
    if (existing !== null) {
      this.db.logAccess(existing.id);

      if (existing.material === null) {
        console.log('The identifier was previously requested, but not found!');
      } else {
        console.log('Matched!');
        return existing;
      }
    }

    const startedAt = new Date();
    let obj = undefined;
    try {
      const content = await this.ozbyReader.readData(isbn);
      obj = this.ozbyReader.parseData(content);
    } catch (e) {
      console.error(`Identifier "${isbn}" not found!`);
    }

    if (obj !== undefined) {
      // Save item in local DB
      await this.db.syncMaterial(isbn, obj, startedAt);
    } else {
      // Log missing item
      if (existing === null) {
        this.db.saveMissingISBN(isbn, startedAt);
      }
    }

    return obj;
  }
}
