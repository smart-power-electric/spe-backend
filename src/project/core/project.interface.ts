import { Context } from 'src/common/core/context.entity';
import { Project, ProjectKeysType } from './project.entity';
import { CreateProjectDto, UpdateProjectDto } from './project.dto';
import { UpdateStageDto } from 'src/stage/core/stage.dto';
import { Stage } from 'src/stage/core/stage.entity';

export type ProjectGetAllFilters = {
  clientId?: string;
  sortField: ProjectKeysType;
  sortOrder: 'ASC' | 'DESC';
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
  updateStageBulk(
    ctx: Context,
    projectId: string,
    rows: UpdateStageDto[],
  ): Promise<Stage[]>;
}
export const ProjectUseCases = Symbol('ProjectUseCases');
