import { Inject, Injectable } from '@nestjs/common';
import { CreateProjectDto, UpdateProjectDto } from '../core/project.dto';
import {
  ProjectGetAllFilters,
  ProjectRepository,
  ProjectUseCases,
} from '../core/project.interface';
import { ILogger } from 'src/common/core/logger.interface';
import { Context } from 'src/common/core/context.entity';
import { Project } from '../core/project.entity';
import { CreateDtoToProject } from '../infrastructure/project.mapper';
import {
  InternalErrorException,
  NotFoundException,
} from 'src/common/core/exception';

@Injectable()
export class ProjectApplication implements ProjectUseCases {
  constructor(
    @Inject(ProjectRepository) private readonly repository: ProjectRepository,
    @Inject(ILogger) private readonly logger: ILogger,
  ) {
    this.logger.init(ProjectApplication.name, 'info');
  }

  async create(ctx: Context, dto: CreateProjectDto): Promise<Project> {
    this.logger.info(
      ctx,
      ProjectApplication.name,
      'create',
      'Creating new project',
    );
    const project = CreateDtoToProject(dto);
    const newProject = await this.repository.insert(ctx, project);
    if (!newProject) {
      throw new InternalErrorException(ctx, 'Project already exists');
    }
    return newProject;
  }

  async getAll(
    ctx: Context,
    limit: number,
    offset: number,
    filters: ProjectGetAllFilters,
  ): Promise<{ data: Project[]; total: number }> {
    this.logger.info(
      ctx,
      ProjectApplication.name,
      'getAll',
      'Getting all projects',
    );
    const result = await this.repository.getAll(ctx, limit, offset, filters);
    return result;
  }

  async getById(ctx: Context, id: string): Promise<Project> {
    this.logger.info(
      ctx,
      ProjectApplication.name,
      'getById',
      'Getting project',
    );
    const project = await this.repository.getById(ctx, id);
    if (!project) {
      throw new NotFoundException(ctx, 'Project not found');
    }
    return project;
  }

  async update(
    ctx: Context,
    id: string,
    row: UpdateProjectDto,
  ): Promise<Project> {
    this.logger.info(
      ctx,
      ProjectApplication.name,
      'update',
      'Updating project',
    );
    const project = await this.repository.getById(ctx, id);
    if (!project) {
      throw new NotFoundException(ctx, 'Project not found');
    }
    const updatedProject = new Project({
      ...project,
      ...row,
    });
    const updated = await this.repository.update(ctx, id, updatedProject);
    if (!updated) {
      throw new InternalErrorException(ctx, 'Project not updated');
    }
    return updated;
  }

  async delete(ctx: Context, id: string): Promise<Project> {
    this.logger.info(
      ctx,
      ProjectApplication.name,
      'delete',
      'Deleting project',
    );
    const project = await this.repository.getById(ctx, id);
    if (!project) {
      throw new NotFoundException(ctx, 'Project not found');
    }
    const deleted = await this.repository.delete(ctx, id);
    if (!deleted) {
      throw new InternalErrorException(ctx, 'Project not deleted');
    }
    return deleted;
  }
}
