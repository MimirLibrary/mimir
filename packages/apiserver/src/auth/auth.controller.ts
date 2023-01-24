import { Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SkipBlock } from '../resources/blocked-users/skipBlock.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/create-user')
  @SkipBlock()
  async createUser() {
    return this.authService.createPerson();
  }
}
