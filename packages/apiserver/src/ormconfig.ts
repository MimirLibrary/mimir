import { ConnectionOptions } from 'typeorm';

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
  entities: ['packages/apiserver/src/**/*.entity.ts'],
  seeds: ['packages/apiserver/src/seeding/seeds/**/*.ts'],
  factories: ['packages/apiserver/src/seeding/factories/**/*.ts'],
  migrations: ['packages/apiserver/src/migrations/**/*.ts'],
  cli: {
    migrationsDir: 'packages/apiserver/src/migrations',
  },
} as ConnectionOptions;
