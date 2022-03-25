// import * as dotenv from 'dotenv';
// import * as path from 'path';

// dotenv.config({
//   path: path.join(__dirname, '.env'),
// });

import { ConnectionOptions } from 'typeorm';
import { PersonEntity } from './resources/persons/person.entity';
import { MaterialEntity } from './resources/materials/material.entity';
import { StatusEntity } from './resources/statuses/status.entity';

export default {
  type: 'postgres',
  host: process.env.POSTGRES_HOST as string,
  port: parseInt(process.env.POSTGRES_PORT as string, 10) as number,
  cache: false,
  username: process.env.POSTGRES_USER as string,
  password: process.env.POSTGRES_PASSWORD as string,
  database: process.env.POSTGRES_DB as string,
  synchronize: false,
  logging: false,
  entities: [PersonEntity, MaterialEntity, StatusEntity],
  migrations: ['packages/apiserver/src/migrations/*.ts'],
  cli: {
    migrationsDir: 'packages/apiserver/src/migrations',
  },
} as ConnectionOptions;
