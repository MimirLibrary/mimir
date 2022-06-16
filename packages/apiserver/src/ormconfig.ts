import { ConnectionOptions } from 'typeorm';
import { Status } from './resources/statuses/status.entity';
import { Material } from './resources/materials/material.entity';
import { Person } from './resources/persons/person.entity';
import { Message } from './resources/messages/messages.entity';
import { Notification } from './resources/notifications/notification.entity';

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
  entities: [Status, Material, Person, Notification, Message],
  seeds: ['packages/apiserver/src/seeding/seeds/**/*.ts'],
  factories: ['packages/apiserver/src/seeding/factories/**/*.ts'],
  migrations: ['packages/apiserver/src/migrations/**/*.ts'],
  cli: {
    migrationsDir: 'packages/apiserver/src/migrations',
  },
} as ConnectionOptions;
