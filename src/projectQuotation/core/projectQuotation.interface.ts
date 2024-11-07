import { Context } from 'src/common/core/context.entity';
import { ProjectQuotation } from './projectQuotation.entity';
import {
  CreateProjectQuotationDto,
  UpdateProjectQuotationDto,
} from './projectQuotation.dto';

export interface ProjectQuotationRepository {
  insert(ctx: Context, row: ProjectQuotation): Promise<ProjectQuotation | null>;
  getAll(
    ctx: Context,
    limit: number,
    offset: number,
  ): Promise<{
    data: ProjectQuotation[];
    total: number;
  }>;
  getById(ctx: Context, id: string): Promise<ProjectQuotation | null>;
  update(
    ctx: Context,
    id: string,
    row: ProjectQuotation,
  ): Promise<ProjectQuotation | null>;
  delete(ctx: Context, id: string): Promise<ProjectQuotation | null>;
}
export const ProjectQuotationRepository = Symbol('ProjectQuotationRepository');

export interface ProjectQuotationUseCases {
  create(
    ctx: Context,
    dto: CreateProjectQuotationDto,
  ): Promise<ProjectQuotation>;
  getAll(
    ctx: Context,
    limit: number,
    offset: number,
  ): Promise<{
    data: ProjectQuotation[];
    total: number;
  }>;
  getById(ctx: Context, id: string): Promise<ProjectQuotation>;
  update(
    ctx: Context,
    id: string,
    row: UpdateProjectQuotationDto,
  ): Promise<ProjectQuotation>;
  delete(ctx: Context, id: string): Promise<ProjectQuotation>;
}
export const ProjectQuotationUseCases = Symbol('ProjectQuotationUseCases');
