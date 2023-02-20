import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { BlockedUsersLoaderFactoryService } from './resources/blocked-users/blocked-users-loader-factory.service';
import { MaterialsLoaderFactoryService } from './resources/materials/materials-loader-factory.service';
import { MessagesLoaderFactoryService } from './resources/messages/messages-loader-factory.service';
import { NotificationsLoaderFactoryService } from './resources/notifications/notifications-loader-factory.service';
import { PersonsLoaderFactoryService } from './resources/persons/persons-loader-factory.service';
import { StatusesLoaderFactoryService } from './resources/statuses/statuses-loader-factory.service';
import {
  resolvers as scalarResolvers,
  typeDefs as scalarTypeDefs,
} from 'graphql-scalars';
import { join } from 'path';
import DataLoaders from './data-loaders';
import { BlockedUsersModule } from './resources/blocked-users/blocked-users.module';
import { MaterialModule } from './resources/materials/material.module';
import { MessageModule } from './resources/messages/message.module';
import { NotificationModule } from './resources/notifications/notification.module';
import { PersonModule } from './resources/persons/person.module';
import { StatusModule } from './resources/statuses/status.module';

export default {
  driver: ApolloDriver,
  imports: [
    BlockedUsersModule,
    MaterialModule,
    MessageModule,
    NotificationModule,
    PersonModule,
    StatusModule,
  ],
  inject: [
    BlockedUsersLoaderFactoryService,
    MaterialsLoaderFactoryService,
    MessagesLoaderFactoryService,
    NotificationsLoaderFactoryService,
    PersonsLoaderFactoryService,
    StatusesLoaderFactoryService,
  ],
  useFactory: (
    blockedUsersLoaderFactoryService: BlockedUsersLoaderFactoryService,
    materialsLoaderFactoryService: MaterialsLoaderFactoryService,
    messageLoaderFactoryService: MessagesLoaderFactoryService,
    notificationLoaderFactoryService: NotificationsLoaderFactoryService,
    personLoaderFactoryService: PersonsLoaderFactoryService,
    statusLoaderFactoryService: StatusesLoaderFactoryService
  ) => {
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
        [DataLoaders.statusesLoader]:
          statusLoaderFactoryService.createStatusesLoader(),
        [DataLoaders.materialsStatusesLoader]:
          statusLoaderFactoryService.createMaterialsStatusesLoader(),
        [DataLoaders.materialsNotificationsLoader]:
          notificationLoaderFactoryService.createMaterialsNotificationsLoader(),
        [DataLoaders.materialsMessagesLoader]:
          messageLoaderFactoryService.createMaterialsMessagesLoader(),
        [DataLoaders.personsLoader]:
          personLoaderFactoryService.createPersonsLoader(),
        [DataLoaders.personsStatusesLoader]:
          statusLoaderFactoryService.createPersonsStatusesLoader(),
        [DataLoaders.personsNotificationsLoader]:
          notificationLoaderFactoryService.createPersonsNotificationsLoader(),
        [DataLoaders.personsMessagesLoader]:
          messageLoaderFactoryService.createPersonsMessagesLoader(),
        [DataLoaders.blockedUsersLoader]:
          blockedUsersLoaderFactoryService.createBlockedUsersLoader(),
        [DataLoaders.materialsLoader]:
          materialsLoaderFactoryService.createMaterialsLoader(),
      }),
    };
  },
} as ApolloDriverConfig;
