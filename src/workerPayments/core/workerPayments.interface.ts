import { Context } from 'src/common/core/context.entity';
import {
  CreateWorkerPaymentsDto,
  UpdateWorkerPaymentsDto,
} from './workerPayments.dto';
import {
  WorkerPayments,
  WorkerPaymentsKeysType,
} from './workerPayments.entity';

export type WorkerPaymentsFilters = {
  workerId?: string;
  serviceSheetId?: string;
  sortField?: WorkerPaymentsKeysType;
  sortOrder?: 'ASC' | 'DESC';
};
export interface WorkerPaymentsRepository {
  insert(ctx: Context, row: WorkerPayments): Promise<WorkerPayments | null>;
  getAll(
    ctx: Context,
    limit: number,
    offset: number,
    filters: WorkerPaymentsFilters,
  ): Promise<{
    data: WorkerPayments[];
    total: number;
  }>;
  getById(ctx: Context, id: string): Promise<WorkerPayments | null>;
  update(
    ctx: Context,
    id: string,
    row: WorkerPayments,
  ): Promise<WorkerPayments | null>;
  delete(ctx: Context, id: string): Promise<WorkerPayments | null>;
}
export const WorkerPaymentsRepository = Symbol('WorkerPaymentsRepository');

export interface WorkerPaymentsUseCases {
  create(ctx: Context, dto: CreateWorkerPaymentsDto): Promise<WorkerPayments>;
  getAll(
    ctx: Context,
    limit: number,
    offset: number,
    filters: WorkerPaymentsFilters,
  ): Promise<{
    data: WorkerPayments[];
    total: number;
  }>;
  getById(ctx: Context, id: string): Promise<WorkerPayments>;
  update(
    ctx: Context,
    id: string,
    row: UpdateWorkerPaymentsDto,
  ): Promise<WorkerPayments>;
  delete(ctx: Context, id: string): Promise<WorkerPayments>;
}
export const WorkerPaymentsUseCases = Symbol('WorkerPaymentsUseCases');
