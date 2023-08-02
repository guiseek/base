import { PassportModule } from '@nestjs/passport';
import { MongooseModule } from '@nestjs/mongoose';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { Module } from '@nestjs/common';

import { ServerConfigModule, ServerConfigService } from '@base/server/config';
import { ServerUserModule } from '@base/server/user';
import { RefreshToken, RefreshTokenSchema } from './schemas';
import { ServerAuthController } from './server-auth.controller';
import { ServerAuthService } from './server-auth.service';
import { LocalStrategy } from './strategies/local';
import { JwtAuthGuard } from './guards/jwt-auth';
import { JwtStrategy } from './strategies/jwt';
import { jwtFactoryConfig } from './factories';

@Module({
  imports: [
    PassportModule,
    ServerConfigModule,
    MongooseModule.forFeature([
      { name: RefreshToken.name, schema: RefreshTokenSchema },
    ]),
    JwtModule.registerAsync({
      imports: [ServerConfigModule],
      inject: [ServerConfigService],
      useFactory: jwtFactoryConfig,
    }),
    ServerUserModule,
  ],
  controllers: [ServerAuthController],
  providers: [
    ServerAuthService,
    LocalStrategy,
    JwtStrategy,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
  exports: [ServerAuthService],
})
export class ServerAuthModule {}
