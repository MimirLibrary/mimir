import { Test, TestingModule } from '@nestjs/testing';
import { Response } from 'express';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let app: TestingModule;

  const responseMock = {
    status: jest.fn((x) => ({
      send: jest.fn((y) => y),
    })),
    send: jest.fn((x) => x),
  } as unknown as Response;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();
  });

  describe('sendEmail', () => {
    const emailCorrectExample = {
      from: '"Mimir App" <app@mimirapp.xyz>',
      to: 'maksim.staliarou@itechart-group.com',
      subject: 'Overdue books | Mimir App',
      html: '<p>Super text</p>',
    };

    const emailWrongExample = {
      from: '',
      to: 'maksim.staliarou@itechart-group.com',
      subject: 'Overdue books | Mimir App',
      html: '<p>Super text</p>',
    };

    it('should return status of 200', () => {
      const appController = app.get<AppController>(AppController);
      appController.sendEmail(emailCorrectExample, responseMock);
      expect(responseMock.status).toHaveBeenCalledWith(200);
    });

    it('should return status of 404', () => {
      const appController = app.get<AppController>(AppController);
      appController.sendEmail(emailWrongExample, responseMock);
      expect(responseMock.status).toHaveBeenCalledWith(404);
    });
  });
});
