import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { Reflector } from '@nestjs/core';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private AuthService: AuthService, private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context);
    const {
      req: { headers },
    } = ctx.getContext();
    const allowUnauthorizedRequest = this.reflector.get<boolean>(
      'allowUnauthorizedRequest',
      context.getHandler()
    );
    if (!allowUnauthorizedRequest) {
      if (!headers.authorization || !headers['id-token'])
        throw new HttpException(
          'Necessary tokens are not provided',
          HttpStatus.BAD_REQUEST
        );

      if (headers['id-token'] === 'null')
        throw new HttpException('id-token is null', HttpStatus.BAD_REQUEST);

      await this.AuthService.verifyToken(headers['id-token']);
    }
    return true;
  }
}
