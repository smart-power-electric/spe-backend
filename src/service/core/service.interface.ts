import { Context } from 'src/common/core/context.entity';
import { Service, ServiceKeysType } from './service.entity';
import { CreateServiceDto, UpdateServiceDto } from './service.dto';

export type ServiceFilter = {
  name?: string;
  sortField: ServiceKeysType;
  sortOrder: 'ASC' | 'DESC';
};
export interface ServiceRepository {
  insert(ctx: Context, row: Service): Promise<Service | null>;
  getAll(
    ctx: Context,
    limit: number,
    offset: number,
    filter: ServiceFilter,
  ): Promise<{
    data: Service[];
    total: number;
  }>;
  getById(ctx: Context, id: string): Promise<Service | null>;
  update(ctx: Context, id: string, row: Service): Promise<Service | null>;
  delete(ctx: Context, id: string): Promise<Service | null>;
}
export const ServiceRepository = Symbol('ServiceRepository');

export interface ServiceUseCases {
  create(ctx: Context, dto: CreateServiceDto): Promise<Service>;
  getAll(
    ctx: Context,
    limit: number,
    offset: number,
    filter: ServiceFilter,
  ): Promise<{
    data: Service[];
    total: number;
  }>;
  getById(ctx: Context, id: string): Promise<Service>;
  update(ctx: Context, id: string, row: UpdateServiceDto): Promise<Service>;
  delete(ctx: Context, id: string): Promise<Service>;
}
export const ServiceUseCases = Symbol('ServiceUseCases');
