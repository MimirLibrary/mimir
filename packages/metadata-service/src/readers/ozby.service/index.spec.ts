import * as fs from 'fs';
import { Test } from '@nestjs/testing';
import axios from 'axios';
import cheerio from 'cheerio';
import { OzbyService } from './index';
import { DigitalSpaceService } from '../../digitalSpace/digitalSpace.service';

jest.mock('axios');
jest.mock('cheerio');

describe('OzbyService', () => {
  let service: OzbyService;

  beforeAll(async () => {
    const app = await Test.createTestingModule({
      providers: [OzbyService, DigitalSpaceService],
    }).compile();

    service = app.get<OzbyService>(OzbyService);
  });

  describe('readData', () => {
    it('check url', async () => {
      const isbn = '123';

      (axios.get as jest.Mock).mockResolvedValue('val');
      (cheerio.load as jest.Mock).mockReturnValue('val');
      await service.readData(isbn);
    });
  });

  describe('getData', () => {
    it('Parses', () => {
      const rootPath = `${__dirname}/snapshots/`;
      const snapshots = fs.readdirSync(rootPath);
      snapshots.map(function (snapshot) {
        const path = `${rootPath}/${snapshot}`;
        const content = fs.readFileSync(`${path}/index.html`);
        const result = JSON.parse(
          fs.readFileSync(`${path}/result.json`, 'utf-8')
        );
        expect(service.parseData(content, 'img')).toEqual(result);
      });
    });
  });
});
