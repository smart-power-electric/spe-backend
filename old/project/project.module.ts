import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { Database } from 'src/commons/database/dbConnect';
import { DrizzleDb } from 'src/commons/database/drizzleDb';
import { DrizzleLogger } from 'src/commons/logging/drizzle.logger.service';
import { ILogger } from 'src/commons/logging/logger.interface';
import { LoggingService } from 'src/commons/logging/logging.service';
import { ProjectController } from './project.controller';
import { CreateProjectHandler } from './commands/handlers/create-project.handler';
import { DeleteProjectHandler } from './commands/handlers/delete-project.handler';
import { UpdateProjectHandler } from './commands/handlers/update-project.handler';
import { ProjectRepository } from 'src/infrastructure/repositories/project.respository';
import { GetAllProjectHandler } from './queries/handlers/get-all-project.handler';
import { GetProjectHandler } from './queries/handlers/get-project.handler';

export const CommandHandlers = [CreateProjectHandler, UpdateProjectHandler, DeleteProjectHandler];
export const QueryHandlers = [ GetAllProjectHandler, GetProjectHandler];

@Module({
  imports: [CqrsModule],
  controllers: [ProjectController],
  providers: [
    { provide: ILogger, useClass: LoggingService },
    DrizzleLogger,
    Database,
    DrizzleDb,
    //Service
    LoggingService,
    ...CommandHandlers,
    ...QueryHandlers,
    // Repository
    ProjectRepository,
  ],
})
export class ProjectModule {}
