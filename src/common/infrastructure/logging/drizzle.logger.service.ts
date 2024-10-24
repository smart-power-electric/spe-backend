import { Inject, Injectable } from '@nestjs/common';
import { Logger } from 'drizzle-orm';
import { newContext } from 'src/common/core/context.entity';
import { ILogger } from 'src/common/core/logger.interface';

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
