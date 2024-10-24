import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { PlatformError } from 'src/commons/http-exception/Error.entity';
import { UpdateProjectCommand } from '../update-project.command';
import { ProjectRepository } from 'src/infrastructure/repositories/project.respository';

@CommandHandler(UpdateProjectCommand)
export class UpdateProjectHandler
  implements ICommandHandler<UpdateProjectCommand>
{
  constructor(private readonly projectRepository: ProjectRepository) {}

  async execute(command: UpdateProjectCommand) {
    const result = await this.projectRepository.update(
      command.ctx,
      command.id,
      command.project,
    );

    if (!result) {
      throw PlatformError.BadRequest('Project not updated');
    }
    return result;
  }
}
