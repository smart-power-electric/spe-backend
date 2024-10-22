import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientModule } from './client/client.module';
import { ConfigModule } from '@nestjs/config';
import configuration from './commons/application-config/configuration';
import { AppContextMiddleware } from './commons/app-context/context.middleware';
import { Database } from './commons/database/dbConnect';
import { DrizzleDb } from './commons/database/drizzleDb';
import { DrizzleLogger } from './commons/logging/drizzle.logger.service';
import { ILogger } from './commons/logging/logger.interface';
import { LoggingMiddleware } from './commons/logging/logging.middleware';
import { LoggingService } from './commons/logging/logging.service';
import { VersionController } from './version/version.controller';
import { ServiceModule } from './service/service.module';
import { ProjectModule } from './project/project.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [configuration] }),
    ClientModule,
    ServiceModule,
    ProjectModule,
  ],
  controllers: [AppController, VersionController],
  providers: [
    AppService,
    { provide: ILogger, useClass: LoggingService },
    DrizzleLogger,
    //Service
    LoggingService,
    LoggingMiddleware,
    AppContextMiddleware,
    Database,
    DrizzleDb,
  ],
})
export class AppModule {}
