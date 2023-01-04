import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import typeorm from '../ormconfig';
import { MaterialModule } from '../resources/materials/material.module';
import { StatusModule } from '../resources/statuses/status.module';
import { PersonModule } from '../resources/persons/person.module';
import { NotificationModule } from '../resources/notifications/notification.module';
import { LocationModule } from '../resources/locations/location.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ItemModule } from '../resources/item/item.module';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join, resolve } from 'path';
import { AppResolver } from './app.resolver';
import { Person } from '../resources/persons/person.entity';
import { Material } from '../resources/materials/material.entity';
import { Status } from '../resources/statuses/status.entity';
import { Notification } from '../resources/notifications/notification.entity';
import { Location } from '../resources/locations/location.entity';
import {
  typeDefs as scalarTypeDefs,
  resolvers as scalarResolvers,
} from 'graphql-scalars';
import { MessageModule } from '../resources/messages/message.module';
import { Message } from '../resources/messages/message.entity';
import { FileModule } from '../file/file.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { BlockedUsersModule } from '../resources/blocked-users/blocked-users.module';
import { BlockedUsers } from '../resources/blocked-users/blocked-users.entity';
import { AuthModule } from '../auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from '../auth/auth.guard';
import { BlockedUsersGuard } from '../resources/blocked-users/blocked-users.guard';
import { GrantGuard } from '../permission/grant.guard';
import { DataTransferModule } from '../data-transfer/data-transfer.module';
import { StatusSubscriber } from '../resources/statuses/status.subscriber';
import createStatusesLoader from '../resources/statuses/statuses.loader';
import createPersonsLoader from '../resources/persons/persons.loader';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    TypeOrmModule.forRoot({
      ...typeorm,
      entities: [
        Person,
        Material,
        Status,
        Notification,
        Message,
        Location,
        BlockedUsers,
      ],
      subscribers: [StatusSubscriber],
      migrations: [`${__dirname}/migrations/*.js`],
    }),
    MaterialModule,
    DataTransferModule,
    StatusModule,
    PersonModule,
    ItemModule,
    NotificationModule,
    MessageModule,
    BlockedUsersModule,
    LocationModule,
    AuthModule,
    FileModule,
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      useFactory: () => {
        return {
          typePaths: [`${__dirname}/**/*.graphql`],
          typeDefs: [...scalarTypeDefs],
          resolvers: [scalarResolvers],
          definitions: {
            path: join(
              process.cwd(),
              './packages/global-types/src/lib/global-types.ts'
            ),
          },
          context: () => ({
            statusesLoader: createStatusesLoader(),
            personsLoader: createPersonsLoader(),
          }),
        };
      },
    }),
    ServeStaticModule.forRoot({
      rootPath: resolve(process.cwd(), 'storage'),
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    AppResolver,
    { provide: APP_GUARD, useClass: AuthGuard },
    { provide: APP_GUARD, useClass: BlockedUsersGuard },
    { provide: APP_GUARD, useClass: GrantGuard },
  ],
})
export class AppModule {}
