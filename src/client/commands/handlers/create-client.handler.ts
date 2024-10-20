import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateClientCommand } from '../create-client.command';
import { ClientRepository } from 'src/infrastructure/repositories/client.respository'
import { ClientInsert } from 'src/core/entities/client.entity';
import { ClientDto } from 'src/infrastructure/dtos/client.dto';
import { PlatformError } from 'src/commons/http-exception/Error.entity';

@CommandHandler(CreateClientCommand)
export class CreateClientHandler implements ICommandHandler<CreateClientCommand> {
  constructor(private readonly clientRepository: ClientRepository) {}

  async execute(command: CreateClientCommand) {
    const client: ClientInsert = {
        name: command.client.name,
        email: command.client.email,
        phone: command.client.phone ?? null,
        address: command.client.address ?? null,
        city: command.client.city ?? null,
        state: command.client.state ?? null,
        zip: command.client.zip ?? null,
        contact: null,
        createdAt: new Date(),
        updatedAt: null
    }
    const result = await this.clientRepository.create(command.ctx, client);
    
    if (!result) {
        throw PlatformError.BadRequest('Client not created');
    }
    return new ClientDto(
        result.id,
        result.name ?? '',
        result.email ?? '',
        result.phone ?? '',
        result.address ?? '',
        result.city ?? '',
        result.state ?? '',
        result.zip ?? '',
    );
    
  }
}