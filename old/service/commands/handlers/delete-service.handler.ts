import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { PlatformError } from 'src/commons/http-exception/Error.entity';
import { DeleteServiceCommand } from '../delete-service.command';
import { ServiceRepository } from 'src/infrastructure/repositories/service.respository';

@CommandHandler(DeleteServiceCommand)
export class DeleteServiceHandler implements ICommandHandler<DeleteServiceCommand> {
  constructor(private readonly serviceRepository: ServiceRepository) {}

  async execute(command: DeleteServiceCommand) {
    const result = await this.serviceRepository.delete(command.ctx, command.id);
    
    if (!result) {
        throw PlatformError.BadRequest('Service not updated');
    }
    return result;    
  }
}