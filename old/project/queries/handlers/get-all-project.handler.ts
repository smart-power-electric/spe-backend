import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { PlatformError } from 'src/commons/http-exception/Error.entity';
import { GetAllProjectQuery } from '../get-all-project.query';
import { ProjectRepository } from 'src/infrastructure/repositories/project.respository';

@QueryHandler(GetAllProjectQuery)
export class GetAllProjectHandler implements IQueryHandler<GetAllProjectQuery> {
  constructor(private readonly projectRepository: ProjectRepository) {}

  async execute(query: GetAllProjectQuery) {
    const result = await this.projectRepository.getAll(query.ctx, query.filters, query.offset, query.limit);
    if (!result) {
      throw PlatformError.NotFound('Project not found');
    }
    return result;
  }
}