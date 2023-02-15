import { Person } from '../resources/persons/person.entity';
import { RolesTypes } from '@mimir/global-types';
import { ForbiddenException } from '@nestjs/common';

export const checkIsResourceOwnerOrManager = (
  currentUser: Person,
  resourceOwnerId: number
): void => {
  if (
    currentUser.type !== RolesTypes.MANAGER &&
    resourceOwnerId !== +currentUser.id
  ) {
    throw new ForbiddenException();
  }
};

export const checkIsResourceOwner = (
  currentUser: Person,
  resourceOwnerId: number
): void => {
  if (resourceOwnerId !== +currentUser.id) {
    throw new ForbiddenException();
  }
};
