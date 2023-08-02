import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ServerConfigService } from '@base/server/config';
import { AuthPayload } from '../interfaces/auth-payload';
import { ServerAuthService } from '../server-auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    configService: ServerConfigService,
    authService: ServerAuthService
  ) {
    super({
      // jwtFromRequest: authService.returnJwtExtractor(),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.jwt.secret,
    });
  }

  async validate(payload: AuthPayload) {
    return {
      id: payload.sub,
      email: payload.email,
      username: payload.username,
    };
  }
}
