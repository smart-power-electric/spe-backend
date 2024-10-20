import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetAllClientQuery } from '../get-all-client.query';
import { ClientRepository } from 'src/infrastructure/repositories/client.respository';
import { PlatformError } from 'src/commons/http-exception/Error.entity';

@QueryHandler(GetAllClientQuery)
export class GetAllClientHandler implements IQueryHandler<GetAllClientQuery> {
  constructor(private readonly clientRepository: ClientRepository) {}

  async execute(query: GetAllClientQuery) {
    const result = await this.clientRepository.getAll(query.ctx, query.filters, query.offset, query.limit);
    if (!result) {
      throw PlatformError.NotFound('Client not found');
    }
    return result;
  }
}