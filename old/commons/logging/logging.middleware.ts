import { Injectable, NestMiddleware } from '@nestjs/common';
import { getConsoleTransport } from './logging.service';
import { Logger, createLogger, format } from 'winston';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  private logger: Logger;
  constructor() {
    const transportLayer = getConsoleTransport();
    this.logger = createLogger({
      format: format.json(),
      defaultMeta: true,
    });
    for (const transport of transportLayer) {
      const params = transport.params;
      params.format = format.json();
      this.logger.add(new transport.transport(transport.params));
    }
  }
  use(req: Request, res: Response, next: NextFunction) {
    this.logger.info(`HTTP ${req.method} ${req.url}`);
    next();
  }
}
