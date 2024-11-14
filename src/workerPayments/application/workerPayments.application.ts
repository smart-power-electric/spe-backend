import { Inject, Injectable } from '@nestjs/common';
import { ILogger } from 'src/common/core/logger.interface';
import { Context } from 'src/common/core/context.entity';
import {
  InternalErrorException,
  NotFoundException,
} from 'src/common/core/exception';
import {
  WorkerPaymentsFilters,
  WorkerPaymentsRepository,
  WorkerPaymentsUseCases,
} from '../core/workerPayments.interface';
import {
  CreateWorkerPaymentsDto,
  UpdateWorkerPaymentsDto,
} from '../core/workerPayments.dto';
import { WorkerPayments } from '../core/workerPayments.entity';
import { CreateDtoToWorkerPayments } from '../infrastructure/workerPayments.mapper';

@Injectable()
export class WorkerPaymentsApplication implements WorkerPaymentsUseCases {
  constructor(
    @Inject(WorkerPaymentsRepository)
    private readonly repository: WorkerPaymentsRepository,
    @Inject(ILogger) private readonly logger: ILogger,
  ) {
    this.logger.init(WorkerPaymentsApplication.name, 'info');
  }

  async create(
    ctx: Context,
    dto: CreateWorkerPaymentsDto,
  ): Promise<WorkerPayments> {
    this.logger.info(
      ctx,
      WorkerPaymentsApplication.name,
      'create',
      'Creating new workerPayments',
    );
    const workerPayments = CreateDtoToWorkerPayments(dto);
    const newWorkerPayments = await this.repository.insert(ctx, workerPayments);
    if (!newWorkerPayments) {
      throw new InternalErrorException(ctx, 'WorkerPayments already exists');
    }
    return newWorkerPayments;
  }

  async getAll(
    ctx: Context,
    limit: number,
    offset: number,
    filter: WorkerPaymentsFilters,
  ): Promise<{ data: WorkerPayments[]; total: number }> {
    this.logger.info(
      ctx,
      WorkerPaymentsApplication.name,
      'getAll',
      'Getting all workerPaymentss',
    );
    const result = await this.repository.getAll(ctx, limit, offset, filter);
    return result;
  }

  async getById(ctx: Context, id: string): Promise<WorkerPayments> {
    this.logger.info(
      ctx,
      WorkerPaymentsApplication.name,
      'getById',
      'Getting workerPayments',
    );
    const workerPayments = await this.repository.getById(ctx, id);
    if (!workerPayments) {
      throw new NotFoundException(ctx, 'WorkerPayments not found');
    }
    return workerPayments;
  }

  async update(
    ctx: Context,
    id: string,
    row: UpdateWorkerPaymentsDto,
  ): Promise<WorkerPayments> {
    this.logger.info(
      ctx,
      WorkerPaymentsApplication.name,
      'update',
      'Updating workerPayments',
    );
    const workerPayments = await this.repository.getById(ctx, id);
    if (!workerPayments) {
      throw new NotFoundException(ctx, 'WorkerPayments not found');
    }
    const updatedWorkerPayments = new WorkerPayments({
      ...workerPayments,
      ...row,
    });
    const updated = await this.repository.update(
      ctx,
      id,
      updatedWorkerPayments,
    );
    if (!updated) {
      throw new InternalErrorException(ctx, 'WorkerPayments not updated');
    }
    return updated;
  }

  async delete(ctx: Context, id: string): Promise<WorkerPayments> {
    this.logger.info(
      ctx,
      WorkerPaymentsApplication.name,
      'delete',
      'Deleting workerPayments',
    );
    const workerPayments = await this.repository.getById(ctx, id);
    if (!workerPayments) {
      throw new NotFoundException(ctx, 'WorkerPayments not found');
    }
    const deleted = await this.repository.delete(ctx, id);
    if (!deleted) {
      throw new InternalErrorException(ctx, 'WorkerPayments not deleted');
    }
    return deleted;
  }
}
