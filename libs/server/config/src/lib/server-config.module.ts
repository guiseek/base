import { Module, Global } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ServerConfigService } from './server-config.service';
import { configuration } from './configuration';

const loadFactory = () => ({ ENV_CONFIG: configuration('config/env.yaml') });

@Global()
@Module({
  imports: [ConfigModule.forRoot({ load: [loadFactory] })],
  providers: [
    {
      provide: ServerConfigService,
      useFactory: (service: ConfigService) => {
        return new ServerConfigService(service);
      },
      inject: [ConfigService],
    },
  ],
  exports: [ServerConfigService],
})
export class ServerConfigModule {}
