// import * as dotenv from 'dotenv';
// import * as path from 'path';

// dotenv.config({
//   path: path.join(__dirname, '.env'),
// });

import { ConnectionOptions } from 'typeorm';

export default {
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: parseInt(process.env.POSTGRES_PORT),
  cache: false,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  synchronize: false,
  logging: false,
  entities: ['src/resources/**/**.entity{.ts,.js}'],
  migrations: ['src/migrations/*.ts'],
} as ConnectionOptions;
