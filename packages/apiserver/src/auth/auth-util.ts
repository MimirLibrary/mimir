import { Person } from '../resources/persons/person.entity';
import { RolesTypes } from '@mimir/global-types';
import { ForbiddenException } from '@nestjs/common';

export const checkIsManagerOrMatchingId = (
  currentUser: Person,
  userId: number
): void => {
  if (currentUser.type !== RolesTypes.MANAGER && userId !== +currentUser.id) {
    throw new ForbiddenException();
  }
};

export const checkIsMatchingId = (
  currentUser: Person,
  userId: number
): void => {
  if (userId !== +currentUser.id) {
    throw new ForbiddenException();
  }
};
