import { ConfigService } from '@nestjs/config';
import { EnvConfig, JwtConfig } from './interfaces/env-config';

export class ServerConfigService {
  static ENV: EnvConfig;

  readonly env: EnvConfig;

  readonly jwt: JwtConfig;

  constructor(private readonly _configService: ConfigService) {
    ServerConfigService.ENV =
      this._configService.getOrThrow<EnvConfig>('ENV_CONFIG');

    this.env = this._configService.getOrThrow<EnvConfig>('ENV_CONFIG');

    this.jwt = this.env.jwt;
  }

  pick<K extends keyof Omit<this, 'pick'>>(scope: K, prop: keyof this[K]) {
    return this[scope][prop];
  }
}
