import { Controller, Post, Body, Res } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post()
  async authenticate(@Body() code: string, @Res() res: Response) {
    const user = await this.authService.authenticate(code);
    res.json(user);
  }

  @Post('/refresh-token')
  async refreshToken(
    @Body() tokens: { refresh_token: string },
    @Res() res: Response
  ) {
    const credentials = await this.authService.refreshToken(
      tokens.refresh_token
    );
    res.json(credentials);
  }
}
