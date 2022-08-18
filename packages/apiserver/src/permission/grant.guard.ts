import {
  CanActivate,
  ExecutionContext,
  HttpStatus,
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
    const roles = this.reflector.get<Permissions[]>(
      'roles',
      context.getHandler()
    );

    if (!roles) return true;

    const {} = Person.findOne();

    return true;
  }
}
