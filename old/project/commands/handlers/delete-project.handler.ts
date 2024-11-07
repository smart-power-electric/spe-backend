import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { PlatformError } from 'src/commons/http-exception/Error.entity';
import { DeleteProjectCommand } from '../delete-project.command';
import { ProjectRepository } from 'src/infrastructure/repositories/project.respository';

@CommandHandler(DeleteProjectCommand)
export class DeleteProjectHandler implements ICommandHandler<DeleteProjectCommand> {
  constructor(private readonly projectRepository: ProjectRepository) {}

  async execute(command: DeleteProjectCommand) {
    const result = await this.projectRepository.delete(command.ctx, command.id);
    
    if (!result) {
        throw PlatformError.BadRequest('Project not updated');
    }
    return result;    
  }
}