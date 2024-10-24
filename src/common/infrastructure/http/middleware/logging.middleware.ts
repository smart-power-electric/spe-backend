import { Injectable, NestMiddleware } from '@nestjs/common';
import { Logger, createLogger, format } from 'winston';
import { Request, Response, NextFunction } from 'express';
import { getConsoleTransport } from '../../logging/logging.service';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  private readonly logger: Logger;
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
