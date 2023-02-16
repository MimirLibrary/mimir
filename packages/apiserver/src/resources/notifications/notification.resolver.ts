import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Notification } from './notification.entity';
import { BadRequestException, UseGuards } from '@nestjs/common';
import {
  CreateAnswerNotification,
  CreateNotificationInput,
  CreateSimpleNotification,
  RemoveNotificationInput,
} from '@mimir/global-types';
import { GraphQLError } from 'graphql';
import { Message } from '../messages/message.entity';
import { CurrentUser } from '../../auth/current-user';
import { Person } from '../persons/person.entity';
import { ManagerGuard } from '../../auth/manager.guard';
import { checkIsMatchingId } from '../../auth/auth-util';

@Resolver('Notification')
export class NotificationResolver {
  @Query(() => [Notification])
  async getNotificationsByPerson(
    @Args('person_id') id: string,
    @CurrentUser() currentUser: Person
  ) {
    checkIsMatchingId(currentUser, +id);
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
    @Args('input') createNotificationInput: CreateNotificationInput,
    @CurrentUser() currentUser: Person
  ) {
    try {
      const { material_id, person_id } = createNotificationInput;
      checkIsMatchingId(currentUser, +person_id);
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
  @UseGuards(ManagerGuard)
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
      checkIsMatchingId(currentUser, +person_id);
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
