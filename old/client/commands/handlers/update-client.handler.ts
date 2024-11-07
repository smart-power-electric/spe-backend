import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ClientRepository } from 'src/infrastructure/repositories/client.respository'
import { ClientDto } from 'src/infrastructure/dtos/client.dto';
import { PlatformError } from 'src/commons/http-exception/Error.entity';
import { UpdateClientCommand } from '../update-client.command';

@CommandHandler(UpdateClientCommand)
export class UpdateClientHandler implements ICommandHandler<UpdateClientCommand> {
  constructor(private readonly clientRepository: ClientRepository) {}

  async execute(command: UpdateClientCommand) {
    const result = await this.clientRepository.update(command.ctx, command.id, command.client);
    
    if (!result) {
        throw PlatformError.BadRequest('Client not updated');
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