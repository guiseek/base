import { ServerConfigService } from '@base/server/config';

export const jwtFactoryConfig = (configService: ServerConfigService) => {
  return {
    global: true,
    secret: configService.jwt.secret,
    signOptions: configService.jwt.options,
  };
};
