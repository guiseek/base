export interface JwtSignOptions {
  expiresIn: string;
}
export interface JwtConfig {
  secret: string;
  encryptJwtSecret: string;
  options: JwtSignOptions;
}

export interface EnvConfig {
  jwt: JwtConfig;
}
