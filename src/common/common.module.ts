import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { LoggingService } from './infrastructure/logging/logging.service';
import { DrizzleLogger } from './infrastructure/logging/drizzle.logger.service';

import { AppContextMiddleware } from './infrastructure/http/middleware/context.middleware';
import { Database } from './infrastructure/database/dbConnect';
import { DrizzleDb } from './infrastructure/database/drizzleDb';
import configuration from './application/application-config/configuration';
import { ILogger } from './core/logger.interface';
import { LoggingMiddleware } from './infrastructure/http/middleware/logging.middleware';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true, load: [configuration] })],
  controllers: [],
  providers: [
    { provide: ILogger, useClass: LoggingService },
    DrizzleLogger,
    //Service
    LoggingService,
    LoggingMiddleware,
    AppContextMiddleware,
    Database,
    DrizzleDb,
  ],
  exports: [
    ILogger,
    LoggingService,
    LoggingMiddleware,
    AppContextMiddleware,
    Database,
    DrizzleDb,
  ],
})
export class CommonModule {}
