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
import { LocationsModule } from '../resources/locations/location.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ItemModule } from '../resources/item/item.module';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
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
import { Message } from '../resources/messages/messages.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    TypeOrmModule.forRoot({
      ...typeorm,
      entities: [Person, Material, Status, Notification, Message, Location],
      migrations: [`${__dirname}/packages/apiserver/src/migrations/*.ts`],
    }),
    MaterialModule,
    StatusModule,
    PersonModule,
    ItemModule,
    NotificationModule,
    MessageModule,
    LocationsModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      typePaths: ['./**/*.graphql'],
      typeDefs: [...scalarTypeDefs],
      resolvers: [scalarResolvers],
      definitions: {
        path: join(
          process.cwd(),
          './packages/global-types/src/lib/global-types.ts'
        ),
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService, AppResolver],
})
export class AppModule {}
