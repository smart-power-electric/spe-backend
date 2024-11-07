import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { PlatformError } from 'src/commons/http-exception/Error.entity';
import { GetProjectQuery } from '../get-project.query';
import { ProjectRepository } from 'src/infrastructure/repositories/project.respository';

@QueryHandler(GetProjectQuery)
export class GetProjectHandler implements IQueryHandler<GetProjectQuery> {
  constructor(private readonly projectRepository: ProjectRepository) {}

  async execute(query: GetProjectQuery) {
    const result = await this.projectRepository.getById(query.ctx, query.id);
    if (!result) {
      throw PlatformError.NotFound('Project not found');
    }
    return result;
  }
}