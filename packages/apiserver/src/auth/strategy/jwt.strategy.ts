import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { passportJwtSecret } from 'jwks-rsa';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService) {
    super({
      secretOrKeyProvider: passportJwtSecret({
        cache: true,
        cacheMaxAge: 3600000,
        rateLimit: true,
        jwksRequestsPerMinute: 10,
        jwksUri: `${configService.get<string>(
          'jwt.oidcServerUrl'
        )}/.well-known/openid-configuration/jwks`,
      }),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      audience: configService.get<string>('jwt.clientId'),
      algorithms: ['RS256'],
    });
  }

  async validate(payload: any) {
    console.log(payload);
    return true;
  }
}
