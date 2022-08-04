import { BadRequestException, Injectable } from '@nestjs/common';
import axios from 'axios';
import { Prisma } from '@prisma/client';
import cheerio from 'cheerio';

type Bundle = {
  material: Prisma.MaterialCreateInput;
  authors: Array<Prisma.AuthorCreateInput>;
  publisher: Prisma.PublisherCreateInput;
};

const READER_ID = 'LABIRINT';

@Injectable()
export class LabirintService {
  private readonly rootUrl = 'https://www.labirint.ru';
  private readonly rootUrlSearch = 'https://www.labirint.ru/search/';

  async readData(identifier: string) {
    try {
      const firstResponse = await axios.get(
        `${this.rootUrlSearch}${identifier}/?stype=0`
      );
      const $ = cheerio.load(firstResponse.data, null, false);
      const id = $('.product-title-link').attr('href');
      const secondResponse = await axios.get(`${this.rootUrl}${id}`);
      return secondResponse.data;
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  parseData(result): Bundle {
    const $ = cheerio.load(result, null, false);
    if (cheerio.html($('.search-error'))) {
      console.log('wrong ISBN');
      return;
    }
    const title = $('#product-title').find('h1').text().split(':')[1];
    const author = $('.authors').first().text().split(':')[1].split(',');
    const price = $('.buying-priceold-val-number').text();
    const about = $('#product-about').text();
    const image = $('.book-img-cover').attr('src');
    const publishers = $('.publisher').find('a').text();
    const date = $('.publisher').text().split(',')[1].split('г')[0];
    const genres = $('.thermo-item').text().split('/');
    const itemId = $('.articul').text().split(':')[1];
    const material: Prisma.MaterialCreateInput = {
      title: title,
      yearPublishedAt: Number(date),
      monthPublishedAt: 0,
      description: about,
      cover: image,
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
}
