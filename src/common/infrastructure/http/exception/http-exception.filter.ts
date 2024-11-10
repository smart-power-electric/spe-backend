import { ArgumentsHost, Catch, HttpException } from '@nestjs/common';
import { AbstractHttpAdapter, BaseExceptionFilter } from '@nestjs/core';
import { ApplicationException } from 'src/common/core/exception';
import { LoggingService } from '../../logging/logging.service';
import { Request, Response } from 'express';
import { ILogger } from 'src/common/core/logger.interface';

@Catch()
@Catch(HttpException)
@Catch(Error)
@Catch(ApplicationException)
export class ErrorHandlerFilter extends BaseExceptionFilter {
  private readonly logger: ILogger;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(httpAdapterHost: AbstractHttpAdapter<any, any, any>) {
    super(httpAdapterHost);
    this.logger = new LoggingService();
    this.logger.init(ErrorHandlerFilter.name, 'info');
  }

  override catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const errorParsed = parseError(exception);

    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();

    const responseBody = {
      statusCode: errorParsed.code,
      timestamp: errorParsed.error.timestamp,
      message: errorParsed.error.message,
      name: errorParsed.error.type,
      path: request.url,
      requestId: errorParsed.error.requestId ?? request.appContext?.requestId,
    };
    if (responseBody.statusCode === 500) {
      const message = exception['message'] || null;
      const stack = exception['stack'] || null;
      if (message || stack) {
        this.logger.error(
          request.appContext,
          message,
          stack,
          JSON.stringify(exception),
        );
      } else {
        this.logger.error(
          request.appContext,
          JSON.stringify(errorParsed.error.toJSON()),
        );
      }
    }
    response.status(errorParsed.code).json(responseBody);
  }
}

function parseError(exception: any): {
  code: number;
  error: ApplicationException;
} {
  if (exception instanceof ApplicationException) {
    switch (exception.type) {
      case 'INVALID_FORMAT':
        return {
          code: 400,
          error: exception,
        };
      case 'NOT_FOUND':
        return {
          code: 404,
          error: exception,
        };
      case 'NOT_AUTHORIZED':
        return {
          code: 401,
          error: exception,
        };
      case 'FORBIDDEN':
        return {
          code: 403,
          error: exception,
        };
      case 'CONFLICT':
        return {
          code: 409,
          error: exception,
        };
      default:
        return {
          code: 500,
          error: exception,
        };
    }
  }
  if (exception instanceof HttpException) {
    return {
      code: exception.getStatus(),
      error: new ApplicationException(
        exception.message,
        'INTERNAL_ERROR',
        '00000000-0000-0000-0000-000000000000',
        new Date().toISOString(),
      ),
    };
  }
  if (exception instanceof Error) {
    return {
      code: 500,
      error: new ApplicationException(
        exception.message,
        'INTERNAL_ERROR',
        '00000000-0000-0000-0000-000000000000',
        new Date().toISOString(),
      ),
    };
  }
  return {
    code: 500,
    error: new ApplicationException(
      'Internal Server Error',
      'INTERNAL_ERROR',
      '00000000-0000-0000-0000-000000000000',
      new Date().toISOString(),
    ),
  };
}
