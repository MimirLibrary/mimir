import { BadRequestException, Injectable } from '@nestjs/common';
import { DbService } from './db.service';
import { OzbyService } from './ozby.service';
import { LabirintService } from './labirint.service';
import { ChitaiGorodService } from './chitai-gorod.service';
import { AbeBooksService } from './abebooks.service';
import { Identifier, Material, Author, Publisher } from '@prisma/client';

type ReturnLookUpType = Identifier & {
  material: Material & {
    identifiers: Identifier[];
    authors: Author[];
    publisher: Publisher;
  };
};

@Injectable()
export class ReaderService {
  constructor(
    private db: DbService,
    private ozbyReader: OzbyService,
    private labirintService: LabirintService,
    private chitaiGorodService: ChitaiGorodService,
    private abeBooksService: AbeBooksService
  ) {}

  async lookup(isbn: string): Promise<ReturnLookUpType> {
    try {
      const existing = await this.findExistingMaterial(isbn);
      if (existing) return existing;

      const startedAt = new Date();
      const result = await this.getDataFromServices(isbn);
      if (result) {
        await this.db.syncMaterial(isbn, result, startedAt);
        return this.db.findMaterial(isbn);
      } else {
        if (!existing) {
          this.db.saveMissingISBN(isbn, startedAt);
        }
      }
    } catch (e) {
      console.error('Something went wrong!');
    }
  }

  private async getDataFromServices(isbn: string) {
    try {
      const result = await Promise.any([
        this.chitaiGorodService.getData(isbn),
        this.ozbyReader.getData(isbn),
        this.labirintService.getData(isbn),
        this.abeBooksService.getData(isbn),
      ]);
      return result;
    } catch (e) {
      console.log(`Identifier "${isbn}" not found!`);
      throw new BadRequestException(`Identifier "${isbn}" not found!`);
    }
  }

  private async findExistingMaterial(isbn: string) {
    const existing = await this.db.findMaterial(isbn);
    if (existing) {
      this.db.logAccess(existing.id);

      if (!existing.material) {
        console.log('The identifier was previously requested, but not found!');
        return;
      } else {
        console.log('Matched!');
        return existing;
      }
    }
  }
}
