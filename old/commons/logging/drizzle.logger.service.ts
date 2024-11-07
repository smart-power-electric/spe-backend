import { Inject, Injectable } from '@nestjs/common';
import { Logger } from 'drizzle-orm';
import { ILogger } from './logger.interface';
import { newContext } from '../app-context/context.entity';

@Injectable()
export class DrizzleLogger implements Logger {
  constructor(@Inject(ILogger) private readonly logger: ILogger) {
    this.logger.init(DrizzleLogger.name, 'debug');
    this.logger.info(newContext(), 'DrizzleLogger initialized');
  }

  logQuery(query: string, params: unknown[]): void {
    const ctx = newContext();
    this.logger.info(ctx, query, ...params);
  }
}
