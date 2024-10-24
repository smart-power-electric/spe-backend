import { Module } from '@nestjs/common';
import { CreateServiceHandler } from './commands/handlers/create-service.handler';
import { UpdateServiceHandler } from './commands/handlers/update-service.handler';
import { DeleteServiceHandler } from './commands/handlers/delete-service.handler';
import { GetAllServiceHandler } from './queries/handlers/get-all-service.handler';
import { CqrsModule } from '@nestjs/cqrs';
import { ServiceController } from './service.controller';
import { Database } from 'src/commons/database/dbConnect';
import { DrizzleDb } from 'src/commons/database/drizzleDb';
import { DrizzleLogger } from 'src/commons/logging/drizzle.logger.service';
import { ILogger } from 'src/commons/logging/logger.interface';
import { LoggingService } from 'src/commons/logging/logging.service';
import { ServiceRepository } from 'src/infrastructure/repositories/service.respository';
import { GetServiceHandler } from './queries/handlers/get-service.handler';

export const CommandHandlers = [
  CreateServiceHandler,
  UpdateServiceHandler,
  DeleteServiceHandler,
];
export const QueryHandlers = [GetAllServiceHandler, GetServiceHandler];

@Module({
  imports: [CqrsModule],
  controllers: [ServiceController],
  providers: [
    { provide: ILogger, useClass: LoggingService },
    DrizzleLogger,
    Database,
    DrizzleDb,
    //Service
    LoggingService,
    ...CommandHandlers,
    ...QueryHandlers,
    ServiceRepository,
  ],
})
export class ServiceModule {}
