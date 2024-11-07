import { Context } from 'src/common/core/context.entity';
import { Material } from './material.entity';
import { CreateMaterialDto, UpdateMaterialDto } from './material.dto';

export interface MaterialRepository {
  insert(ctx: Context, row: Material): Promise<Material | null>;
  getAll(
    ctx: Context,
    limit: number,
    offset: number,
  ): Promise<{
    data: Material[];
    total: number;
  }>;
  getById(ctx: Context, id: string): Promise<Material | null>;
  update(ctx: Context, id: string, row: Material): Promise<Material | null>;
  delete(ctx: Context, id: string): Promise<Material | null>;
}
export const MaterialRepository = Symbol('MaterialRepository');

export interface MaterialUseCases {
  create(ctx: Context, dto: CreateMaterialDto): Promise<Material>;
  getAll(
    ctx: Context,
    limit: number,
    offset: number,
  ): Promise<{
    data: Material[];
    total: number;
  }>;
  getById(ctx: Context, id: string): Promise<Material>;
  update(ctx: Context, id: string, row: UpdateMaterialDto): Promise<Material>;
  delete(ctx: Context, id: string): Promise<Material>;
}
export const MaterialUseCases = Symbol('MaterialUseCases');
