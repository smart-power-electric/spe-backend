import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ClientRepository } from 'src/infrastructure/repositories/client.respository'
import { ClientDto } from 'src/infrastructure/dtos/client.dto';
import { PlatformError } from 'src/commons/http-exception/Error.entity';
import { DeleteClientCommand } from '../delete-client.command';

@CommandHandler(DeleteClientCommand)
export class DeleteClientHandler implements ICommandHandler<DeleteClientCommand> {
  constructor(private readonly clientRepository: ClientRepository) {}

  async execute(command: DeleteClientCommand) {
    const result = await this.clientRepository.delete(command.ctx, command.id);
    
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