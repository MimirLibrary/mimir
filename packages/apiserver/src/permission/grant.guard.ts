import {
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  Injectable,
} from '@nestjs/common';
import { Person } from '../resources/persons/person.entity';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Reflector } from '@nestjs/core';
import { Permissions } from '@mimir/global-types';

@Injectable()
export class GrantGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context);
    const {
      req: { headers },
    } = ctx.getContext();
    const grants = this.reflector.get<Permissions[]>(
      'grants',
      context.getHandler()
    );

    if (!grants) return true;

    const bufB64 = Buffer.from(headers['id-token'].split('.')[1], 'base64');
    const result = JSON.parse(bufB64.toString());

    const { permissions } = await Person.findOne({
      where: { smg_id: result.sub },
    });

    if (permissions && grants.every((grant) => permissions.includes(grant)))
      return true;

    throw new UnauthorizedException("You don't have access");
  }
}
