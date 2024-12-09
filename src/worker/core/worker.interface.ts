import { Context } from 'src/common/core/context.entity';
import { CreateWorkerDto, UpdateWorkerDto } from './worker.dto';
import { Worker, WorkerKeysType } from './worker.entity';

export type WorkerFilter = {
  name?: string;
  sortField?: WorkerKeysType;
  sortOrder?: 'ASC' | 'DESC';
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
  create(ctx: Context, dto: CreateWorkerDto): Promise<Worker>;
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
