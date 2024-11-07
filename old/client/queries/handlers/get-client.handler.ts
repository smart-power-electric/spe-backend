import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetClientQuery } from '../get-client.query';
import { ClientRepository } from 'src/infrastructure/repositories/client.respository';
import { PlatformError } from 'src/commons/http-exception/Error.entity';
import { ClientDto } from 'src/infrastructure/dtos/client.dto';

@QueryHandler(GetClientQuery)
export class GetClientHandler implements IQueryHandler<GetClientQuery> {
  constructor(private readonly clientRepository: ClientRepository) {}

  async execute(query: GetClientQuery) {
    const result = await this.clientRepository.getById(query.ctx, query.id);
    if (!result) {
      throw PlatformError.NotFound('Client not found');
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