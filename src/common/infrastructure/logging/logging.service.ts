/* eslint-disable no-use-before-define */
import { Injectable, Scope } from '@nestjs/common';
import { config } from 'dotenv';
import { Logger, createLogger, format, transports } from 'winston';
import { LogLevel, LogLevelType, Transport } from '../../core/logger.entity';
import { ILogger } from 'src/common/core/logger.interface';
import { Context } from 'src/common/core/context.entity';

@Injectable({ scope: Scope.TRANSIENT })
export class LoggingService implements ILogger {
  private contextName!: string;
  private contextMode!: LogLevelType;
  private logger!: Logger;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private transportLayer!: { transport: any; params?: any }[];

  constructor() {
    config();
  }

  /**
   * Create a new instance of the Logger class.
   * @param {string} contextName - The name of the logger context.
   * @param {LogLevelType} [logLevel=LogLevel.info] - The log level to be set for the logger.
   */
  init(contextName: string, logLevel: LogLevelType = LogLevel.info) {
    this.contextName = contextName;
    this.contextMode = logLevel;

    this.transportLayer = generateTransportLayer();

    this.logger = createLogger({
      level: this.contextMode,
      defaultMeta: { service: this.contextName },
      format: format.combine(
        format.timestamp(),
        format.json(),
        format.metadata({
          fillExcept: ['message', 'level', 'timestamp', 'label'],
        }),
      ),
    });
    for (const transport of this.transportLayer) {
      this.logger.add(new transport.transport(transport.params));
    }
  }

  //#region Static Config Methods

  //#endregion

  //#region Log Methods
  /**
   * Log an info message.
   * @param {unknown} message - The message to be logged.
   * @param {Context} [context] - Optional context information.
   */
  public info(context: Context | null, message: unknown, ...arg2: unknown[]) {
    this.log(message, this.logger.info, context, arg2);
  }

  /**
   * Log an error message.
   * @param {unknown} message - The message to be logged.
   * @param {Context} [context] - Optional context information.
   */
  public error(context: Context | null, message: unknown, ...arg2: unknown[]) {
    this.log(message, this.logger.error, context, arg2);
  }

  /**
   * Log a warning message.
   * @param {unknown} message - The message to be logged.
   * @param {Context} [context] - Optional context information.
   */
  public warn(context: Context | null, message: unknown, ...arg2: unknown[]) {
    this.log(message, this.logger.warn, context, arg2);
  }

  /**
   * Log a debug message.
   * @param {unknown} message - The message to be logged.
   * @param {Context} [context] - Optional context information.
   */
  public debug(context: Context | null, message: unknown, ...arg2: unknown[]) {
    this.log(message, this.logger.debug, context, arg2);
  }

  /**
   * Log a verbose message.
   * @param {unknown} message - The message to be logged.
   * @param {Context} [context] - Optional context information.
   */
  public verbose(
    context: Context | null,
    message: unknown,
    ...arg2: unknown[]
  ) {
    this.log(message, this.logger.verbose, context, arg2);
  }

  /**
   * Log an http message.
   * @param {unknown} message - The message to be logged.
   * @param {Context} [context] - Optional context information.
   */
  public http(context: Context | null, message: unknown, ...arg2: unknown[]) {
    this.log(message, this.logger.http, context, arg2);
  }

  /**
   * Log a silly message.
   * @param {unknown} message - The message to be logged.
   * @param {Context} [context] - Optional context information.
   */
  public silly(context: Context | null, message: unknown, ...arg2: unknown[]) {
    this.log(message, this.logger.silly, context, arg2);
  }
  //#endregion

  /*
   * Get the transport layer of the logger.
   * @returns {winston.transport[]} - The transport layer of the logger.
   */
  public getTransportLayer() {
    return this.logger.transports;
  }

  /**
   * Private method to handle logging messages with the given log function.
   * @param {string | unknown} message - The message to be logged.
   * @param {(message: string, ...meta: unknown[]) => void} logFunction - The log function to be used for logging.
   * @param {Context} [context] - Optional context information.
   * @private
   */
  private log(
    message: unknown,
    logFunction: (message: string, ...meta: unknown[]) => void,
    context: Context | null,
    ...arg2: unknown[]
  ) {
    if (!logFunction) return;
    const logLine = this.messageParser(message);
    const args = arg2.map((arg) => this.messageParser(arg)).join(' ');
    const argLine = args.length > 0 ? ` args: ${args}` : '';
    const elapsed = context
      ? new Date().getTime() - context.startTime.getTime()
      : null;
    const requestId = context ? context.requestId : null;
    logFunction(`${logLine}${argLine}`, {
      requestId: requestId,
      elapsedTime: elapsed,
    });
  }
  private messageParser(message: unknown) {
    switch (typeof message) {
      case 'string':
        return message;
      case 'object':
        return JSON.stringify(message);
      case 'number':
        return message.toString();
      case 'boolean':
        return message.toString();
      case 'undefined':
        return 'undefined';
      default:
        return 'Unknown Error';
    }
  }
}

/**
 * Retrieves the appropriate transport layer based on the environment.
 * @returns {Array} An array of winston transports.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function generateTransportLayer(): { transport: any; params: any }[] {
  return getLocalTransport();
}

/**
 * Retrieves the transport layer for the development environment.
 * @returns {Array} An array of winston transports for development.
 */
function getLocalTransport() {
  const transport1: Transport = {
    transport: transports.Console,
    params: {
      level: 'debug',
      format: customFormat(),
    },
  };
  const transport2: Transport = {
    transport: transports.File,
    params: {
      filename: './log/error.log',
      level: 'error',
      maxsize: 5242880,
      maxFiles: 10,
    },
  };
  const transport3: Transport = {
    transport: transports.File,
    params: {
      filename: './log/all.log',
      level: 'debug',
      maxsize: 5242880,
      maxFiles: 10,
    },
  };

  const transportsArray = [transport1, transport2, transport3];

  return transportsArray;
}

/**
 * Defines a custom log format for winston.
 * @returns {winston.Logform.Format} The custom log format.
 */
function customFormat() {
  return format.printf(
    ({ level, message, timestamp, stack, metadata }) =>
      `${metadata ? metadata.service : 'HttpServer'} [${level.toUpperCase()}] ${metadata.requestId ?? ''} ${timestamp || new Date().toISOString()} ${metadata.elapsedTime ?? 0}ms : ${stack || message} ${metadata ? JSON.stringify({ ...metadata, service: undefined, requestId: undefined, elapsedTime: undefined }) : ''}`,
  );
}

export function getConsoleTransport() {
  const transport3 = {
    transport: transports.Console,
    params: {
      level: 'error',
      format: customFormat(),
    },
  };
  return [transport3];
}
