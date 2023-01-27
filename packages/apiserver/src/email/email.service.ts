import { Inject, Injectable } from '@nestjs/common';
import { Material } from '../resources/materials/material.entity';
import { firstValueFrom } from 'rxjs';
import { ClientProxy } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';

const EMAIL_TEMPLATES = {
  RETURN_BOOK_REMINDER: 'return-book-reminder',
} as const;

const DEFAULT_COVER_IMAGE =
  'https://mimirapp.xyz/assets/MOC-data/BookImage.png';

@Injectable()
export class EmailService {
  constructor(
    @Inject('API_SERVICE') private readonly client: ClientProxy,
    private readonly config: ConfigService
  ) {}

  public sendReturnBookReminderEmail<Result = any>(
    email: string,
    material: Material
  ): Promise<Result> {
    return firstValueFrom(
      this.client.emit('send-email', {
        to: email,
        template: EMAIL_TEMPLATES.RETURN_BOOK_REMINDER,
        context: {
          bookName: material.title,
          bookCover: material.picture || DEFAULT_COVER_IMAGE,
          appUrl: this.config.get<string>('common.frontendUrl'),
        },
      })
    );
  }
}
