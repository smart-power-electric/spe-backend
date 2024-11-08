import { Context } from 'src/common/core/context.entity';
import {
  CreateServiceSheetsDto,
  UpdateServiceSheetsDto,
} from './serviceSheets.dto';
import { ServiceSheets } from './serviceSheets.entity';

export interface ServiceSheetsRepository {
  insert(ctx: Context, row: ServiceSheets): Promise<ServiceSheets | null>;
  getAll(
    ctx: Context,
    limit: number,
    offset: number,
  ): Promise<{
    data: ServiceSheets[];
    total: number;
  }>;
  getById(ctx: Context, id: string): Promise<ServiceSheets | null>;
  update(
    ctx: Context,
    id: string,
    row: ServiceSheets,
  ): Promise<ServiceSheets | null>;
  delete(ctx: Context, id: string): Promise<ServiceSheets | null>;
}
export const ServiceSheetsRepository = Symbol('ServiceSheetsRepository');

export interface ServiceSheetsUseCases {
  create(ctx: Context, dto: CreateServiceSheetsDto): Promise<ServiceSheets>;
  getAll(
    ctx: Context,
    limit: number,
    offset: number,
  ): Promise<{
    data: ServiceSheets[];
    total: number;
  }>;
  getById(ctx: Context, id: string): Promise<ServiceSheets>;
  update(
    ctx: Context,
    id: string,
    row: UpdateServiceSheetsDto,
  ): Promise<ServiceSheets>;
  delete(ctx: Context, id: string): Promise<ServiceSheets>;
}
export const ServiceSheetsUseCases = Symbol('ServiceSheetsUseCases');
