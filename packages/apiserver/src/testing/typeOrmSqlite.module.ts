import { TypeOrmModule } from '@nestjs/typeorm';
import { Status } from '../resources/statuses/status.entity';
import { Material } from '../resources/materials/material.entity';
import { Notification } from '../resources/notifications/notification.entity';
import { Person } from '../resources/persons/person.entity';
import { Message } from '../resources/messages/message.entity';
import { BlockedUsers } from '../resources/blocked-users/blocked-users.entity';
import { Location } from '../resources/locations/location.entity';

const TypeOrmTestingModule = () => [
  TypeOrmModule.forRoot({
    name: 'testing',
    type: 'postgres',
    host: 'localhost',
    database: process.env.APISERVER_TEST_DB,
    port: parseInt(process.env.APISERVER_TEST_DB_PORT, 10),
    username: process.env.APISERVER_TEST_DB_USER,
    password: process.env.APISERVER_TEST_DB_PASSWORD,
    dropSchema: true,
    synchronize: true,
    keepConnectionAlive: false,
    entities: [Status, Material, Notification, Person, Message, BlockedUsers, Location],
  }),
  TypeOrmModule.forFeature([Material, Status]),
];

export { TypeOrmTestingModule };
