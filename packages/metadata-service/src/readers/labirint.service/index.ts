import { BadRequestException, Injectable } from '@nestjs/common';
import axios from 'axios';
import { Prisma } from '@prisma/client';
import cheerio from 'cheerio';
import { Bundle } from '../../types';
import { DigitalSpaceService } from '../../digitalSpace/digitalSpace.service';

const READER_ID = 'LABIRINT';

@Injectable()
export class LabirintService {
  constructor(private readonly digitalSpaceService: DigitalSpaceService) {}
  private readonly rootUrl = 'https://www.labirint.ru';
  private readonly rootUrlSearch = 'https://www.labirint.ru/search/';

  private async readData(identifier: string) {
    try {
      const firstResponse = await axios.get(
        `${this.rootUrlSearch}${identifier}/?stype=0`
      );
      const $ = cheerio.load(firstResponse.data, null, false);
      const id = $('.product-title-link').attr('href');
      const secondResponse = await axios.get(`${this.rootUrl}${id}`);
      const second$ = cheerio.load(secondResponse.data);
      const pic = await axios.get(second$('.book-img-cover').attr('src'), {
        responseType: 'arraybuffer',
      });
      const extension = second$('.book-img-cover').attr('src').split('.').pop();
      return {
        result: secondResponse.data,
        image: pic.data,
        extension: extension,
      };
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  private parseData(result, img): Bundle {
    const $ = cheerio.load(result, null, false);
    if (cheerio.html($('.search-error'))) {
      console.log('incorrect ISBN');
      return;
    }
    const title = $('#product-title').find('h1').text().split(': ')[1];
    const author = $('.authors').first().text().split(': ')[1].split(',');
    const price = $('.buying-priceold-val-number').text();
    const about = cheerio.html($('#fullannotation'))
      ? $('#fullannotation').find('p').text().trim()
      : $('#product-about').find('p').text().trim();
    const publishers = $('.publisher').find('a').text();
    const date = $('.publisher').text().split(',')[1].split('г')[0];
    const genres = $('.thermo-item').text().split('/');
    const itemId = $('.articul').text().split(': ')[1];
    const material: Prisma.MaterialCreateInput = {
      title: title,
      yearPublishedAt: Number(date),
      monthPublishedAt: 0,
      description: about,
      cover: img,
      meta: {
        sku: itemId,
        price: price,
        taxonomy: genres,
      },
    };

    const authors: Array<Prisma.AuthorCreateInput> = author.map(function (
      singleAuthor
    ) {
      return {
        name: singleAuthor,
        referenceId: READER_ID + ':' + itemId,
        meta: {},
      };
    });

    const publisher: Prisma.PublisherCreateInput = {
      name: publishers,
      referenceId: READER_ID + ':' + itemId,
      meta: {},
    };

    return { material, authors, publisher };
  }

  async getData(isbn: string): Promise<Bundle> {
    const result = await this.readData(isbn);
    const img = await this.digitalSpaceService.createFile({
      fileExtension: result.extension,
      buffer: result.image,
    });
    return this.parseData(result.result, img);
  }
}
