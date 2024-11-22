/**
 * Represents the database configuration object.
 *
 * @export
 * @type DatabaseConfig
 */
/**
 * Configuration object for the PostgreSQL connection.
 */
export type DatabaseConfig = {
  user: string;
  password: string;
  database: string;
  host: string;
  port: number;
  sslmode: string;
};
export type JwtConfig = {
  accessSecret: string;
  refreshSecret: string;
  expirationToken: string;
  expirationRefreshToken: string;
};
export type GmailEmailConfig = {
  senderEmail: string;
  senderName: string;
  senderPassword: string;
};
/**
 * Represents the configuration object.
 *
 * @export
 * @type Config
 */
export type Config = {
  environment: string;
  port: number;
  host: string;
  applicationName: string;
  maxFileSize: number;
  database: DatabaseConfig;
  jwt: JwtConfig;
  gmailEmail: GmailEmailConfig;
};
