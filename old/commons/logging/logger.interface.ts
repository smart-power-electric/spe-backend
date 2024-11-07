import winston from 'winston';
import { Context } from '../app-context/context.entity';
import { LogLevelType } from './logger.entity';

export type LogMode = 'LOCAL' | 'SERVER';
export interface AWSCloudWatchConfig {
  region: string;
  awsKey: string;
  awsSecret: string;
  logGroup: string;
  logStream: string;
  MODE: LogMode;
}

/**
 * This interface is used to define the Logger
 *
 * @export
 * @interface ILogger
 */
export interface ILogger {
  init(contextName: string, logLevel: LogLevelType): void;
  info(context: Context | null, message: unknown, ...arg2: unknown[]): void;
  error(context: Context | null, message: unknown, ...arg2: unknown[]): void;
  warn(context: Context | null, message: unknown, ...arg2: unknown[]): void;
  debug(context: Context | null, message: unknown, ...arg2: unknown[]): void;
  verbose(context: Context | null, message: unknown, ...arg2: unknown[]): void;
  http(context: Context | null, message: unknown, ...arg2: unknown[]): void;
  silly(context: Context | null, message: unknown, ...arg2: unknown[]): void;
  getTransportLayer(): winston.transport[];
}
export const ILogger = Symbol('ILogger');
