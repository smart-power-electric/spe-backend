import { Context } from 'src/common/core/context.entity';
import { Stage } from './stage.entity';
import { CreateStageDto, UpdateStageDto } from './stage.dto';

export interface StageRepository {
  insert(ctx: Context, row: Stage): Promise<Stage | null>;
  getAll(
    ctx: Context,
    limit: number,
    offset: number,
  ): Promise<{
    data: Stage[];
    total: number;
  }>;
  getById(ctx: Context, id: string): Promise<Stage | null>;
  update(ctx: Context, id: string, row: Stage): Promise<Stage | null>;
  delete(ctx: Context, id: string): Promise<Stage | null>;
}
export const StageRepository = Symbol('StageRepository');

export interface StageUseCases {
  create(ctx: Context, dto: CreateStageDto): Promise<Stage>;
  getAll(
    ctx: Context,
    limit: number,
    offset: number,
  ): Promise<{
    data: Stage[];
    total: number;
  }>;
  getById(ctx: Context, id: string): Promise<Stage>;
  update(ctx: Context, id: string, row: UpdateStageDto): Promise<Stage>;
  delete(ctx: Context, id: string): Promise<Stage>;
}
export const StageUseCases = Symbol('StageUseCases');