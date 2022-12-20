import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Material } from './material.entity';
import { DigitalOceanService } from '@mimir/api-util';
import { FileService } from '../../file/file.service';
import { readLocalFile } from '@mimir/helper-functions';

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, Material[]> {
  constructor(
    private digitalOceanService: DigitalOceanService,
    private fileService: FileService
  ) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler
  ): Observable<Material[]> {
    return next.handle().pipe(
      map((items: Material[]) =>
        items.map((item) => {
          if (item.picture.includes('localhost')) {
            const file = readLocalFile(item.picture);
            if (file.buffer) {
              this.digitalOceanService
                .createFile({
                  originalname: file.originalname,
                  buffer: file.buffer,
                })
                .then((newName) => {
                  Material.update(item.id, { picture: newName.toString() });
                });
              setTimeout(() => {
                this.fileService.removeFile(item.picture.split('/').pop());
              }, 5000);
            }
          }
          return item;
        })
      )
    );
  }
}
