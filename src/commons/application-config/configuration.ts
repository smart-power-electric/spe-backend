import { Config } from './configuration.entity';

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
    keycloak: {
      baseUrl: process.env.KEYCLOAK_BASE_URL ?? 'http://localhost:8080/auth',
      realmName: process.env.KEYCLOAK_REALM_NAME ?? 'spe',
      clientId: process.env.KEYCLOAK_CLIENT_ID ?? 'spe-client',
      secret: process.env.KEYCLOAK_SECRET ?? 'secret',
      grantType: process.env.KEYCLOAK_GRANT_TYPE ?? 'client_credentials',
    },
  };

  return config;
}
