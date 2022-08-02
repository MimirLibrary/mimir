import { BadRequestException, Injectable } from '@nestjs/common';
import axios from 'axios';
import { Prisma } from '@prisma/client';
import { Bundle } from '../../types';

@Injectable()
export class ChitaiGorodService {
  private READER_ID = 'Сhitai-gorod';
  private readonly rootUrlSearch =
    'https://search-v2.chitai-gorod.ru/api/v3/search/';
  private readonly rootUrlList =
    'https://webapi.chitai-gorod.ru/web/goods/extension/list/';

  async readData(identifier: string) {
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

  parseData(result): Bundle {
    if (!result) return null;
    const material: Prisma.MaterialCreateInput = {
      title: result.name,
      cover: `https://img-gorod.ru${result.image_url}`,
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
          referenceId: this.READER_ID + ':' + result.name,
          meta: {},
        }))
      : new Array(result.author).map((author) => ({
          name: author,
          referenceId: this.READER_ID + ':' + result.name,
          meta: {},
        }));

    const publisher: Prisma.PublisherCreateInput = {
      name: result.publisher,
      referenceId: this.READER_ID + result.name,
      meta: {},
    };

    return { material, authors, publisher };
  }
}
