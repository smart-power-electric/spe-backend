import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { PlatformError } from 'src/commons/http-exception/Error.entity';
import { UpdateServiceCommand } from '../update-service.command';
import { ServiceRepository } from 'src/infrastructure/repositories/service.respository';

@CommandHandler(UpdateServiceCommand)
export class UpdateServiceHandler implements ICommandHandler<UpdateServiceCommand> {
  constructor(private readonly serviceRepository: ServiceRepository) {}

  async execute(command: UpdateServiceCommand) {
    
    const result = await this.serviceRepository.update(command.ctx, command.id, command.service);
    
    if (!result) {
        throw PlatformError.BadRequest('Service not updated');
    }
    return result;
    
  }
}