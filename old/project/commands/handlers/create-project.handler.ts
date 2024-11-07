import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { PlatformError } from 'src/commons/http-exception/Error.entity';
import { CreateProjectCommand } from '../create-project.command';
import { ProjectRepository } from 'src/infrastructure/repositories/project.respository';
import { ProjectInsert } from 'src/core/entities/project.entity';

@CommandHandler(CreateProjectCommand)
export class CreateProjectHandler
  implements ICommandHandler<CreateProjectCommand>
{
  constructor(private readonly projectRepository: ProjectRepository) {}

  async execute(command: CreateProjectCommand) {
    const project: ProjectInsert = {
      name: command.project.name,
      description: command.project.description,
      clientId: command.project.clientId,
      location: command.project.location,
      startDate: command.project.startDate,
      endDate: command.project.endDate,
      createdAt: new Date(),
      updatedAt: null,
    };
    const result = await this.projectRepository.create(command.ctx, project);

    if (!result) {
      throw PlatformError.BadRequest('Project not created');
    }
    return result;
  }
}
