import { ArgumentsHost, Catch, HttpException } from '@nestjs/common';
import { AbstractHttpAdapter, BaseExceptionFilter } from '@nestjs/core';
import { Request, Response } from 'express';
import { Logger, createLogger, format } from 'winston';
import { PlatformError } from '../Error.entity';
import { generateTransportLayer } from '../../logging/logging.service';
import { parseError } from './ErrorParser';

@Catch()
@Catch(HttpException)
@Catch(Error)
@Catch(PlatformError)
export class ErrorHandlerFilter extends BaseExceptionFilter {
  private readonly logger!: Logger;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(httpAdapterHost: AbstractHttpAdapter<any, any, any>) {
    super(httpAdapterHost);
    const transportLayer = generateTransportLayer();

    this.logger = createLogger({
      level: 'error',
      defaultMeta: { service: 'ErrorHandlerFilter' },
      format: format.combine(
        format.timestamp(),
        format.json(),
        format.metadata({
          fillExcept: ['message', 'level', 'timestamp', 'label'],
        }),
      ),
    });
    for (const transport of transportLayer) {
      this.logger.add(new transport.transport(transport.params));
    }
  }

  override catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const errorParsed = parseError(exception);

    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();

    const responseBody = {
      statusCode: errorParsed.code,
      timestamp: new Date().toISOString(),
      message: errorParsed.message,
      name: errorParsed.name,
      path: request.url,
      requestId: request.appContext?.requestId,
    };
    const message = exception['message'] || null;
    const stack = exception['stack'] || null;
    this.logger.error(message, request.appContext);
    this.logger.error(stack, request.appContext);
    this.logger.error(JSON.stringify(exception), request.appContext);
    this.logger.error(JSON.stringify(responseBody), request.appContext);
    response.status(errorParsed.code).json(responseBody);
  }
}
