import { ConnectionOptions } from 'typeorm';

export default {
  type: 'postgres',
  host: process.env.DB_HOST as string,
  port: parseInt(process.env.DB_PORT as string, 10) as number,
  cache: false,
  username: process.env.DB_USER as string,
  password: process.env.DB_PASSWORD as string,
  database: process.env.DB_NAME as string,
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
