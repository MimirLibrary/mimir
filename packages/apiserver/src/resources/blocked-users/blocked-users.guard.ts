import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { BlockedUsers } from './blocked-users.entity';

@Injectable()
export class BlockedUsersGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context);
    const {
      req: { headers },
    } = ctx.getContext();
    const SkipBlock = this.reflector.get<boolean>(
      'skipBlock',
      context.getHandler()
    );
    if (!SkipBlock) {
      const bufB64 = Buffer.from(headers['id-token'].split('.')[1], 'base64');
      const result = JSON.parse(bufB64.toString());
      const state = await BlockedUsers.createQueryBuilder('state')
        .leftJoinAndSelect('state.person', 'person')
        .where('person.email = :email', { email: result.email })
        .orderBy('state.id', 'DESC')
        .getOne();
      if (state !== undefined)
        if (state.state)
          throw new HttpException('user is blocked', HttpStatus.BAD_REQUEST);
    }
    return true;
  }
}
