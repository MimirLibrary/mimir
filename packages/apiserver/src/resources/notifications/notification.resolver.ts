import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Notification } from './notification.entity';
import {
  BadRequestException,
  ForbiddenException,
  UseGuards,
} from '@nestjs/common';
import {
  CreateAnswerNotification,
  CreateNotificationInput,
  CreateSimpleNotification,
  RemoveNotificationInput,
  RolesTypes,
} from '@mimir/global-types';
import { GraphQLError } from 'graphql';
import { Message } from '../messages/message.entity';
import { CurrentUser } from '../../auth/current-user';
import { Person } from '../persons/person.entity';
import { ManagerGuard } from '../../auth/manager.guard';

@Resolver('Notification')
export class NotificationResolver {
  @Query(() => [Notification])
  async getNotificationsByPerson(
    @Args('person_id') id: string,
    @CurrentUser() currentUser: Person
  ) {
    if (currentUser.type !== RolesTypes.MANAGER && +id !== +currentUser.id) {
      return new ForbiddenException();
    }
    return await Notification.find({ where: { person_id: id } });
  }

  @Query(() => [Notification])
  @UseGuards(ManagerGuard)
  async getNotificationsByMaterial(@Args('material_id') id: string) {
    return await Notification.find({ where: { material_id: id } });
  }

  //TODO: combine 3 endpoints for creating a notification into single one
  @Mutation(() => Notification)
  async createNotification(
    @Args('input') createNotificationInput: CreateNotificationInput
  ) {
    try {
      const { material_id, person_id } = createNotificationInput;
      const isAlreadyExist = await Notification.findOne({
        where: { material_id, person_id },
      });
      if (isAlreadyExist) throw new Error();
      const notification = Notification.create(createNotificationInput);
      await Notification.save(notification);
      return notification;
    } catch (e) {
      throw new BadRequestException();
    }
  }

  @Mutation(() => Notification)
  async createAnswerNotification(
    @Args('input') createAnswerNotification: CreateAnswerNotification
  ) {
    try {
      await Message.delete(createAnswerNotification.id);
      const { id, ...createNotification } = createAnswerNotification;
      const notification = Notification.create(createNotification);
      return Notification.save(notification);
    } catch (e) {
      throw new GraphQLError(e.message);
    }
  }

  @Mutation(() => Notification)
  async createSimpleNotification(
    @Args('input') createSimpleNotification: CreateSimpleNotification
  ) {
    try {
      const notification = Notification.create(createSimpleNotification);
      return Notification.save(notification);
    } catch (e) {
      throw new GraphQLError(e.message);
    }
  }

  @Mutation(() => Notification)
  async removeNotification(
    @Args('input') removeNotificationInput: RemoveNotificationInput,
    @CurrentUser() currentUser: Person
  ) {
    try {
      const { material_id, person_id } = removeNotificationInput;
      if (
        currentUser.type !== RolesTypes.MANAGER &&
        +person_id !== +currentUser.id
      ) {
        return new ForbiddenException();
      }
      const notification = await Notification.findOneOrFail({
        where: { material_id, person_id },
      });
      await Notification.remove({ ...notification } as Notification);
      return notification;
    } catch (e) {
      throw new BadRequestException();
    }
  }
}
