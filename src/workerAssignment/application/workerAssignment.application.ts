import { Inject, Injectable } from '@nestjs/common';
import { ILogger } from 'src/common/core/logger.interface';
import { Context } from 'src/common/core/context.entity';
import {
  InternalErrorException,
  NotFoundException,
} from 'src/common/core/exception';
import {
  WorkerAssignmentFilter,
  WorkerAssignmentRepository,
  WorkerAssignmentUseCases,
} from '../core/workerAssignment.interface';
import { WorkerAssignment } from '../core/workerAssignment.entity';
import { CreateDtoToWorkerAssignment } from '../infrastructure/workerAssignment.mapper';
import {
  CreateWorkerAssignmentDto,
  UpdateWorkerAssignmentDto,
} from '../core/workerAssignment.dto';

@Injectable()
export class WorkerAssignmentApplication implements WorkerAssignmentUseCases {
  constructor(
    @Inject(WorkerAssignmentRepository)
    private readonly repository: WorkerAssignmentRepository,
    @Inject(ILogger) private readonly logger: ILogger,
  ) {
    this.logger.init(WorkerAssignmentApplication.name, 'info');
  }

  async create(
    ctx: Context,
    dto: CreateWorkerAssignmentDto,
  ): Promise<WorkerAssignment> {
    this.logger.info(
      ctx,
      WorkerAssignmentApplication.name,
      'create',
      'Creating new workerAssignment',
    );
    const workerAssignment = CreateDtoToWorkerAssignment(dto);
    const newWorkerAssignment = await this.repository.insert(
      ctx,
      workerAssignment,
    );
    if (!newWorkerAssignment) {
      throw new InternalErrorException(ctx, 'WorkerAssignment already exists');
    }
    return newWorkerAssignment;
  }

  async getAll(
    ctx: Context,
    limit: number,
    offset: number,
    filters: WorkerAssignmentFilter,
  ): Promise<{ data: WorkerAssignment[]; total: number }> {
    this.logger.info(
      ctx,
      WorkerAssignmentApplication.name,
      'getAll',
      'Getting all workerAssignments',
    );
    const result = await this.repository.getAll(ctx, limit, offset, filters);
    return result;
  }

  async getById(ctx: Context, id: string): Promise<WorkerAssignment> {
    this.logger.info(
      ctx,
      WorkerAssignmentApplication.name,
      'getById',
      'Getting workerAssignment',
    );
    const workerAssignment = await this.repository.getById(ctx, id);
    if (!workerAssignment) {
      throw new NotFoundException(ctx, 'WorkerAssignment not found');
    }
    return workerAssignment;
  }

  async update(
    ctx: Context,
    id: string,
    row: UpdateWorkerAssignmentDto,
  ): Promise<WorkerAssignment> {
    this.logger.info(
      ctx,
      WorkerAssignmentApplication.name,
      'update',
      'Updating workerAssignment',
    );
    const workerAssignment = await this.repository.getById(ctx, id);
    if (!workerAssignment) {
      throw new NotFoundException(ctx, 'WorkerAssignment not found');
    }
    const updatedWorkerAssignment = new WorkerAssignment({
      ...workerAssignment,
      ...row,
    });
    const updated = await this.repository.update(
      ctx,
      id,
      updatedWorkerAssignment,
    );
    if (!updated) {
      throw new InternalErrorException(ctx, 'WorkerAssignment not updated');
    }
    return updated;
  }

  async delete(ctx: Context, id: string): Promise<WorkerAssignment> {
    this.logger.info(
      ctx,
      WorkerAssignmentApplication.name,
      'delete',
      'Deleting workerAssignment',
    );
    const workerAssignment = await this.repository.getById(ctx, id);
    if (!workerAssignment) {
      throw new NotFoundException(ctx, 'WorkerAssignment not found');
    }
    const deleted = await this.repository.delete(ctx, id);
    if (!deleted) {
      throw new InternalErrorException(ctx, 'WorkerAssignment not deleted');
    }
    return deleted;
  }
}
