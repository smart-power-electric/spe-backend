import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { PlatformError } from 'src/commons/http-exception/Error.entity';
import { CreateServiceCommand } from '../create-service.command';
import { ServiceRepository } from 'src/infrastructure/repositories/service.respository';
import { ServiceInsert } from 'src/core/entities/service.entity';

@CommandHandler(CreateServiceCommand)
export class CreateServiceHandler implements ICommandHandler<CreateServiceCommand> {
  constructor(private readonly serviceRepository: ServiceRepository) {}

  async execute(command: CreateServiceCommand) {
    const service: ServiceInsert = {
        name: command.service.name,
        description: command.service.description,
        unitCost: command.service.unitCost ?? '0',
        createdAt: new Date(),
        updatedAt: null
    }
    const result = await this.serviceRepository.create(command.ctx, service);
    
    if (!result) {
        throw PlatformError.BadRequest('Service not created');
    }
    return result;    
  }
}