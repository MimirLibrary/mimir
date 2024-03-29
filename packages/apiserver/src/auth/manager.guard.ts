import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Person } from '../resources/persons/person.entity';
import { getUserSubFromToken } from './token-util';
import { RolesTypes } from '@mimir/global-types';

@Injectable()
export class ManagerGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context);
    const req = ctx.getContext().req;
    const idToken = req.headers?.['id-token'];
    const userSub = getUserSubFromToken(idToken);
    if (!userSub) {
      return false;
    }
    const authPerson = await Person.findOne({
      where: {
        smg_id: userSub,
      },
    });
    req.currentUser = authPerson;
    return authPerson?.type === RolesTypes.MANAGER;
  }
}
