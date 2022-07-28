import { Injectable } from '@nestjs/common';
import { DbService } from './db.service';
import { OzbyService } from './ozby.service';
import { ChitaiGorodService } from './chitai-gorod.service';

@Injectable()
export class ReaderService {
  constructor(
    private db: DbService,
    private ozbyReader: OzbyService,
    private chitaiGorodService: ChitaiGorodService
  ) {}

  async lookup(isbn: string) {
    const existing = await this.db.findMaterial(isbn);
    // Log access action. Don't await
    if (existing !== null) {
      await this.db.logAccess(existing.id);

      if (existing.material === null) {
        console.log('The identifier was previously requested, but not found!');
      } else {
        console.log('Matched!');
        return existing;
      }
    }

    const startedAt = new Date();
    let obj = undefined;
    let content = undefined;

    const arrayOfServices = ['chitaiGorodService', 'ozbyReader'];

    for (let i = 0; i <= arrayOfServices.length; i++) {
      try {
        content = await this[arrayOfServices[i]].readData(isbn);
        if (content) {
          obj = this[arrayOfServices[i]].parseData(content);
          break;
        }
      } catch (e) {
        console.error(`Identifier "${isbn}" not found!`);
      }
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
