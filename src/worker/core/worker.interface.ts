import { Context } from 'src/common/core/context.entity';
import { CreateWorkerDto, UpdateWorkerDto } from './worker.dto';
import { Worker } from './worker.entity';
import { WorkerResponse } from '../infrastructure/worker.swagger';

export type WorkerFilter = {
  name?: string;
};
export interface WorkerRepository {
  insert(ctx: Context, row: Worker): Promise<Worker | null>;
  getAll(
    ctx: Context,
    limit: number,
    offset: number,
    filter: WorkerFilter,
  ): Promise<{
    data: Worker[];
    total: number;
  }>;
  getById(ctx: Context, id: string): Promise<Worker | null>;
  update(ctx: Context, id: string, row: Worker): Promise<Worker | null>;
  delete(ctx: Context, id: string): Promise<Worker | null>;
}
export const WorkerRepository = Symbol('WorkerRepository');

export interface WorkerUseCases {
  create(ctx: Context, dto: CreateWorkerDto): Promise<WorkerResponse>;
  getAll(
    ctx: Context,
    limit: number,
    offset: number,
    filter: WorkerFilter,
  ): Promise<{
    data: Worker[];
    total: number;
  }>;
  getById(ctx: Context, id: string): Promise<Worker>;
  update(ctx: Context, id: string, row: UpdateWorkerDto): Promise<Worker>;
  delete(ctx: Context, id: string): Promise<Worker>;
}
export const WorkerUseCases = Symbol('WorkerUseCases');
