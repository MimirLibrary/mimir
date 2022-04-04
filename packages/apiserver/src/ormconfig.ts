import { Status } from './resources/statuses/status.entity';
import { Person } from './resources/persons/person.entity';
import { ConnectionOptions } from 'typeorm';
import { Material } from './resources/materials/material.entity';

/* export default {
  type: 'postgres',
  host: process.env.POSTGRES_HOST as string,
  port: parseInt(process.env.POSTGRES_PORT as string, 10) as number,
  cache: false,
  username: process.env.POSTGRES_USER as string,
  password: process.env.POSTGRES_PASSWORD as string,
  database: process.env.POSTGRES_DB as string,
  synchronize: false,
  logging: false,
  migrations: ['packages/apiserver/src/migrations/*.ts'],
  cli: {
    migrationsDir: 'packages/apiserver/src/migrations',
  },
} as ConnectionOptions; */

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
  entities: ['src/resources/materials/material.entity.ts'],
  seeds: ['src/seeding/seeds/**/*.ts'],
  factories: ['src/seeding/factories/**/*.ts'],
  migrations: ['packages/apiserver/src/migrations/*.ts'],
  cli: {
    migrationsDir: 'packages/apiserver/src/migrations',
  },
} as ConnectionOptions;
