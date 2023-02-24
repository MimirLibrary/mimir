import { BadRequestException, Injectable } from '@nestjs/common';
import axios from 'axios';
import { Prisma } from '@prisma/client';
import { Bundle } from '../../types';
import { DigitalOceanService } from '@mimir/api-util';

@Injectable()
export class ChitaiGorodService {
  constructor(private readonly digitalOceanService: DigitalOceanService) {}
  private READER_ID = 'Сhitai-gorod';
  private readonly rootUrlSearch =
    'https://search-v2.chitai-gorod.ru/api/v3/search/';
  private readonly rootUrlList =
    'https://webapi.chitai-gorod.ru/web/goods/extension/list/';

  private async readData(identifier: string) {
    try {
      const resultOfId = await axios.post(this.rootUrlSearch, {
        index: 'goods',
        query: identifier,
        type: 'common',
        from: 0,
        per_page: 24,
        'filters[available]': false,
      });
      const ids = resultOfId.data.ids[0];
      const infoOfBook = await axios.post(this.rootUrlList, {
        token: 123,
        action: 'read',
        data: [ids],
      });
      return infoOfBook.data.result[ids];
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
  private async parseData(result): Promise<Bundle> {
    const pic = await axios.get(`https://img-gorod.ru${result.image_url}`, {
      responseType: 'arraybuffer',
    });
    const img = await this.digitalOceanService.createFile({
      originalname: `https://img-gorod.ru${result.image_url}`,
      buffer: pic.data,
      mimetype: pic.headers['content-type'],
    });
    if (!result) return null;
    const material: Prisma.MaterialCreateInput = {
      title: result.name,
      cover: String(img),
      yearPublishedAt: result.year,
      monthPublishedAt: 0,
      description: result.detail_text,
      meta: {
        price: result.price,
        sku: result.book_id,
        taxonomy: result.section_names,
      },
    };

    const authors: Array<Prisma.AuthorCreateInput> = Array.isArray(
      result.author
    )
      ? result.author.map((author) => ({
          name: author,
          referenceId: this.READER_ID + ':' + result.book_id,
          meta: {},
        }))
      : new Array(result.author).map((author) => ({
          name: author,
          referenceId: this.READER_ID + ':' + result.book_id,
          meta: {},
        }));

    const publisher: Prisma.PublisherCreateInput = {
      name: result.publisher,
      referenceId: this.READER_ID + ':' + result.book_id,
      meta: {},
    };

    return { material, authors, publisher };
  }

  async getData(isbn: string): Promise<Bundle> {
    const result = await this.readData(isbn);

    return this.parseData(result);
  }
}
