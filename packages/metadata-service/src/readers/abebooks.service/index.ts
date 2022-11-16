import { BadRequestException, Injectable } from '@nestjs/common';
import axios from 'axios';
import { Prisma } from '@prisma/client';
import cheerio from 'cheerio';
import { Bundle } from '../../types';

const READER_ID = 'ABEBOOKS';

@Injectable()
export class AbeBooksService {
  private readonly rootUrl = 'https://www.abebooks.com';

  private async readData(identifier: string) {
    try {
      const website = await axios.get(
        `https://www.abebooks.com/servlet/SearchResults?kn=${identifier}&sts=t&cm_sp=SearchF-_-topnav-_-Results`
      );
      const firstResponse = await axios.get(
        `https://www.abebooks.com/servlet/HighlightInventory?ds=20&kn=${identifier}&sortby=17`
      );
      return {
        url: firstResponse.data.highlightedItemsMap.SORT_MODE_FEATURED[0],
        website: website.data,
      };
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  private parseData({ url, website }): Bundle {
    const $ = cheerio.load(website, null, false);
    const date = $('.opt-publish-date').text().slice(0, 4);
    const publishedBy = $('.opt-publisher').text().slice(0, -1);
    const title = url.title;
    const author = url.author.split(',');
    const image = url.imageUrl;
    const itemId = url.listingId;
    const price = url.priceInDomainCurrency;
    const material: Prisma.MaterialCreateInput = {
      title: title,
      yearPublishedAt: Number(date),
      monthPublishedAt: 0,
      description: 'not provided',
      cover: image,
      meta: {
        sku: itemId,
        price: price,
        taxonomy: price,
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
      name: publishedBy,
      referenceId: READER_ID + ':' + itemId,
      meta: {},
    };
    return { material, authors, publisher };
  }

  async getData(isbn: string): Promise<Bundle> {
    const result = await this.readData(isbn);
    return this.parseData(result);
  }
}