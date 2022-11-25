import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import { v4 as uuidv4 } from 'uuid';

const spacesEndpoint = new AWS.Endpoint(`${process.env['SPACE_ENDPOINT']}`);

@Injectable()
export class FileService {
  s3 = new AWS.S3({
    endpoint: `${spacesEndpoint.href}/bookPictures`,
    credentials: new AWS.Credentials({
      accessKeyId: `${process.env['SPACE_ID']}`,
      secretAccessKey: `${process.env['SPACE_SECRET']}`,
    }),
  });

  createFile(file) {
    try {
      const fileExtension = file.originalname.split('.').pop();
      const fileName = uuidv4() + '.' + fileExtension;
      return new Promise((resolve, reject) => {
        this.s3.putObject(
          {
            Bucket: 'mimir-content',
            Key: fileName,
            Body: file.buffer,
            ACL: 'public-read',
          },
          (error: AWS.AWSError) => {
            if (!error) {
              resolve(
                `${process.env['NX_API_SPACES']}/bookPictures/${fileName}`
              );
            } else {
              reject(
                new Error(
                  `SpacesService_ERROR: ${
                    error.message || 'Something went wrong'
                  }`
                )
              );
            }
          }
        );
      });
      return fileExtension;
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async removeFile(fileName: string) {
    try {
      return new Promise((resolve, reject) => {
        this.s3.deleteObject(
          {
            Bucket: 'mimir-content',
            Key: fileName,
          },
          (error: AWS.AWSError) => {
            if (!error) {
              resolve(`successfully deleted`);
            } else {
              reject(
                new Error(
                  `SpacesService_ERROR: ${
                    error.message || 'Something went wrong'
                  }`
                )
              );
            }
          }
        );
      });
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
