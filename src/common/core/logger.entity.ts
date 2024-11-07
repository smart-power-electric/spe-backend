import { transports } from 'winston';
/**
 * Defines log levels as constants.
 * @typedef {Object} LogLevel
 * @property {string} error - The error log level.
 * @property {string} warn - The warn log level.
 * @property {string} info - The info log level.
 * @property {string} http - The http log level.
 * @property {string} verbose - The verbose log level.
 * @property {string} debug - The debug log level.
 * @property {string} silly - The silly log level.
 */
export const LogLevel = {
  error: 'error',
  warn: 'warn',
  info: 'info',
  http: 'http',
  verbose: 'verbose',
  debug: 'debug',
  silly: 'silly',
} as const;

/**
 * Type for LogLevel constant keys.
 * @typedef {string} LogLevelType
 */
export type LogLevelType = (typeof LogLevel)[keyof typeof LogLevel];

export type Transport = {
  transport:
    | transports.FileTransportInstance
    | transports.ConsoleTransportInstance
    | transports.HttpTransportInstance
  params: Record<
    string,
    string | number | boolean | { username: string; password: string } | Record<string, any>
  >;
};

//#endregion
