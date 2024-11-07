import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { PlatformError } from 'src/commons/http-exception/Error.entity';
import { GetAllServiceQuery } from '../get-all-service.query';
import { ServiceRepository } from 'src/infrastructure/repositories/service.respository';

@QueryHandler(GetAllServiceQuery)
export class GetAllServiceHandler implements IQueryHandler<GetAllServiceQuery> {
  constructor(private readonly serviceRepository: ServiceRepository) {}

  async execute(query: GetAllServiceQuery) {
    const result = await this.serviceRepository.getAll(query.ctx, query.filters, query.offset, query.limit);
    if (!result) {
      throw PlatformError.NotFound('Service not found');
    }
    return result;
  }
}