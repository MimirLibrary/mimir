import { ConnectionOptions } from 'typeorm';

export default {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'writer',
  password: 'password',
  database: 'metadata',
  synchronize: true,
  logging: ['error', 'schema'],
  migrations: ['src/migrations/*.ts'],
  entities: ['src/materials/entities/*.ts'],
  cli: {
    migrationsDir: 'src/migrations',
  },
} as ConnectionOptions;
