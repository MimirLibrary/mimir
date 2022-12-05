import * as fs from 'fs';
import { Test } from '@nestjs/testing';
import axios from 'axios';
import { OzbyService } from './index';
import { DigitalSpaceService } from '@mimir/digital-space';

jest.mock('axios');

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
      await service.readData(isbn);
    });
  });

  describe('getData', () => {
    it('Parses', () => {
      const rootPath = `${__dirname}/snapshots/`;
      const snapshots = fs.readdirSync(rootPath);
      snapshots.map(async function (snapshot) {
        const path = `${rootPath}/${snapshot}`;
        const content = fs.readFileSync(`${path}/index.html`);
        const result = JSON.parse(
          fs.readFileSync(`${path}/result.json`, 'utf-8')
        );
        expect(await service.parseData(content)).toEqual(result);
      });
    });
  });
});
