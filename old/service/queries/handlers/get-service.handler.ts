import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { PlatformError } from 'src/commons/http-exception/Error.entity';
import { GetServiceQuery } from '../get-service.query';
import { ServiceRepository } from 'src/infrastructure/repositories/service.respository';

@QueryHandler(GetServiceQuery)
export class GetServiceHandler implements IQueryHandler<GetServiceQuery> {
  constructor(private readonly serviceRepository: ServiceRepository) {}

  async execute(query: GetServiceQuery) {
    const result = await this.serviceRepository.getById(query.ctx, query.id);
    if (!result) {
      throw PlatformError.NotFound('Service not found');
    }
    return result;
  }
}