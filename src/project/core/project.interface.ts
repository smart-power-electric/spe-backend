import { Context } from 'src/common/core/context.entity';
import { Project } from './project.entity';
import { CreateProjectDto, UpdateProjectDto } from './project.dto';

export type ProjectGetAllFilters = {
  clientId?: string;
};
export interface ProjectRepository {
  insert(ctx: Context, row: Project): Promise<Project | null>;
  getAll(
    ctx: Context,
    limit: number,
    offset: number,
    filters: ProjectGetAllFilters,
  ): Promise<{
    data: Project[];
    total: number;
  }>;
  getById(ctx: Context, id: string): Promise<Project | null>;
  update(ctx: Context, id: string, row: Project): Promise<Project | null>;
  delete(ctx: Context, id: string): Promise<Project | null>;
}
export const ProjectRepository = Symbol('ProjectRepository');

export interface ProjectUseCases {
  create(ctx: Context, dto: CreateProjectDto): Promise<Project>;
  getAll(
    ctx: Context,
    limit: number,
    offset: number,
    filters: ProjectGetAllFilters,
  ): Promise<{
    data: Project[];
    total: number;
  }>;
  getById(ctx: Context, id: string): Promise<Project>;
  update(ctx: Context, id: string, row: UpdateProjectDto): Promise<Project>;
  delete(ctx: Context, id: string): Promise<Project>;
}
export const ProjectUseCases = Symbol('ProjectUseCases');
