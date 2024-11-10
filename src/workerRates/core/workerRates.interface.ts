import { Context } from 'src/common/core/context.entity';
import { WorkerRates } from './workerRates.entity';
import { CreateWorkerRatesDto, UpdateWorkerRatesDto } from './workerRates.dto';

export type WorkerRatesFilters = {
  workerId?: string;
};
export interface WorkerRatesRepository {
  insert(ctx: Context, row: WorkerRates): Promise<WorkerRates | null>;
  getAll(
    ctx: Context,
    limit: number,
    offset: number,
    filters: WorkerRatesFilters,
  ): Promise<{
    data: WorkerRates[];
    total: number;
  }>;
  getById(ctx: Context, id: string): Promise<WorkerRates | null>;
  update(
    ctx: Context,
    id: string,
    row: WorkerRates,
  ): Promise<WorkerRates | null>;
  delete(ctx: Context, id: string): Promise<WorkerRates | null>;
}
export const WorkerRatesRepository = Symbol('WorkerRatesRepository');

export interface WorkerRatesUseCases {
  create(ctx: Context, dto: CreateWorkerRatesDto): Promise<WorkerRates>;
  getAll(
    ctx: Context,
    limit: number,
    offset: number,
    filters: WorkerRatesFilters,
  ): Promise<{
    data: WorkerRates[];
    total: number;
  }>;
  getById(ctx: Context, id: string): Promise<WorkerRates>;
  update(
    ctx: Context,
    id: string,
    row: UpdateWorkerRatesDto,
  ): Promise<WorkerRates>;
  delete(ctx: Context, id: string): Promise<WorkerRates>;
}
export const WorkerRatesUseCases = Symbol('WorkerRatesUseCases');
