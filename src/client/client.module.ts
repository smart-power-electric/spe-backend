import { Module } from '@nestjs/common';
import { ClientController } from './client.controller';
import { CqrsModule } from '@nestjs/cqrs';
import { ClientRepository } from 'src/infrastructure/repositories/client.respository';
import { ILogger } from 'src/commons/logging/logger.interface';
import { LoggingService } from 'src/commons/logging/logging.service';
import { DrizzleLogger } from 'src/commons/logging/drizzle.logger.service';
import { Database } from 'src/commons/database/dbConnect';
import { DrizzleDb } from 'src/commons/database/drizzleDb';
import { CreateClientHandler } from './commands/handlers/create-client.handler';
import { GetClientHandler } from './queries/handlers/get-client.handler';
import { GetAllClientHandler } from './queries/handlers/get-all-client.handler';

export const CommandHandlers = [CreateClientHandler];
export const QueryHandlers = [GetClientHandler, GetAllClientHandler];

@Module({
  imports: [CqrsModule],
  controllers: [ClientController],
  providers: [
    { provide: ILogger, useClass: LoggingService },
    DrizzleLogger,
    Database,
    DrizzleDb,
    //Service
    LoggingService,
    ...CommandHandlers,
    ...QueryHandlers,
    ClientRepository,
  ],
  exports: [],
})
export class ClientModule {}
