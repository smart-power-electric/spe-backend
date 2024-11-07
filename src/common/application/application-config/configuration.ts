import { Config } from '../../core/configuration.entity';

export default function Config(): Config {
  const config = {
    applicationName: process.env.APPLICATION_NAME ?? 'NestJS Application',
    host: process.env.HOST ?? '127.0.0.1',
    port: parseInt(process.env.PORT ?? '3000', 10),
    maxFileSize: parseInt(process.env.MAX_FILE_SIZE ?? '15', 10) * 1024 * 1024,
    database: {
      host: process.env.DATABASE_HOST ?? 'postgres',
      port: parseInt(process.env.DATABASE_PORT ?? '5432', 10) || 5432,
      user: process.env.DATABASE_USER ?? 'admin',
      password: process.env.DATABASE_PASSWORD ?? '1234',
      database: process.env.DATABASE_NAME ?? 'spe_db',
      sslmode: process.env.DATABASE_SSL_MODE ?? 'disable',
    },
    jwt: {
      accessSecret: process.env.JWT_ACCESS_SECRET ?? 'access_secret_31fasd3f',
      refreshSecret: process.env.JWT_REFRESH_SECRET ?? 'refresh_secret_23f4gf4',
      expirationToken: process.env.JWT_EXPIRATION_TOKEN ?? '1h',
      expirationRefreshToken: process.env.JWT_EXPIRATION_REFRESH_TOKEN ?? '7d',
    },
  };

  return config;
}
