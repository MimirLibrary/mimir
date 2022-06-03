import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Notification } from './notification.entity';
import { BadRequestException } from '@nestjs/common';
import { CreateNotificationInput } from '@mimir/global-types';

@Resolver('Notification')
export class NotificationResolver {
  @Query(() => [Notification])
  async getNotificationsByPerson(@Args('person_id') id: string) {
    return await Notification.find({ where: { person_id: id } });
  }

  @Query(() => [Notification])
  async getNotificationsByMaterial(@Args('material_id') id: string) {
    return await Notification.find({ where: { material_id: id } });
  }

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
  async removeNotification(
    @Args('input') removeNotificationInput: CreateNotificationInput
  ) {
    try {
      const { material_id, person_id } = removeNotificationInput;
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
