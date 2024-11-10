import { Context } from 'src/common/core/context.entity';
import { WorkerAssignment } from './workerAssignment.entity';
import {
  CreateWorkerAssignmentDto,
  UpdateWorkerAssignmentDto,
} from './workerAssignment.dto';

export type WorkerAssignmentFilter = {
  workerId?: string;
  projectId?: string;
  stageId?: string;
};
export interface WorkerAssignmentRepository {
  insert(ctx: Context, row: WorkerAssignment): Promise<WorkerAssignment | null>;
  getAll(
    ctx: Context,
    limit: number,
    offset: number,
    filter: WorkerAssignmentFilter,
  ): Promise<{
    data: WorkerAssignment[];
    total: number;
  }>;
  getById(ctx: Context, id: string): Promise<WorkerAssignment | null>;
  update(
    ctx: Context,
    id: string,
    row: WorkerAssignment,
  ): Promise<WorkerAssignment | null>;
  delete(ctx: Context, id: string): Promise<WorkerAssignment | null>;
}
export const WorkerAssignmentRepository = Symbol('WorkerAssignmentRepository');

export interface WorkerAssignmentUseCases {
  create(
    ctx: Context,
    dto: CreateWorkerAssignmentDto,
  ): Promise<WorkerAssignment>;
  getAll(
    ctx: Context,
    limit: number,
    offset: number,
    filter: WorkerAssignmentFilter,
  ): Promise<{
    data: WorkerAssignment[];
    total: number;
  }>;
  getById(ctx: Context, id: string): Promise<WorkerAssignment>;
  update(
    ctx: Context,
    id: string,
    row: UpdateWorkerAssignmentDto,
  ): Promise<WorkerAssignment>;
  delete(ctx: Context, id: string): Promise<WorkerAssignment>;
}
export const WorkerAssignmentUseCases = Symbol('WorkerAssignmentUseCases');
