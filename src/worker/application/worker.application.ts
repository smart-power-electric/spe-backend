import { Inject, Injectable } from '@nestjs/common';
import { ILogger } from 'src/common/core/logger.interface';
import { Context } from 'src/common/core/context.entity';
import {
  InternalErrorException,
  NotFoundException,
} from 'src/common/core/exception';
import {
  WorkerFilter,
  WorkerRepository,
  WorkerUseCases,
} from '../core/worker.interface';
import { CreateWorkerDto, UpdateWorkerDto } from '../core/worker.dto';
import { Worker } from '../core/worker.entity';
import { CreateDtoToWorker } from '../infrastructure/worker.mapper';
import { WorkerResponse } from '../infrastructure/worker.swagger';

@Injectable()
export class WorkerApplication implements WorkerUseCases {
  constructor(
    @Inject(WorkerRepository) private readonly repository: WorkerRepository,
    @Inject(ILogger) private readonly logger: ILogger,
  ) {
    this.logger.init(WorkerApplication.name, 'info');
  }

  async create(ctx: Context, dto: CreateWorkerDto): Promise<WorkerResponse> {
    this.logger.info(
      ctx,
      WorkerApplication.name,
      'create',
      'Creating new worker',
    );
    const worker = CreateDtoToWorker(dto);
    const newWorker = await this.repository.insert(ctx, worker);
    if (!newWorker) {
      throw new InternalErrorException(ctx, 'Worker already exists');
    }
    return newWorker;
  }

  async getAll(
    ctx: Context,
    limit: number,
    offset: number,
    filters: WorkerFilter,
  ): Promise<{ data: Worker[]; total: number }> {
    this.logger.info(
      ctx,
      WorkerApplication.name,
      'getAll',
      'Getting all workers',
    );
    const result = await this.repository.getAll(ctx, limit, offset, filters);
    return result;
  }

  async getById(ctx: Context, id: string): Promise<Worker> {
    this.logger.info(ctx, WorkerApplication.name, 'getById', 'Getting worker');
    const worker = await this.repository.getById(ctx, id);
    if (!worker) {
      throw new NotFoundException(ctx, 'Worker not found');
    }
    return worker;
  }

  async update(
    ctx: Context,
    id: string,
    row: UpdateWorkerDto,
  ): Promise<Worker> {
    this.logger.info(ctx, WorkerApplication.name, 'update', 'Updating worker');
    const worker = await this.repository.getById(ctx, id);
    if (!worker) {
      throw new NotFoundException(ctx, 'Worker not found');
    }
    const updatedWorker = new Worker({
      ...worker,
      ...row,
    });
    const updated = await this.repository.update(ctx, id, updatedWorker);
    if (!updated) {
      throw new InternalErrorException(ctx, 'Worker not updated');
    }
    return updated;
  }

  async delete(ctx: Context, id: string): Promise<Worker> {
    this.logger.info(ctx, WorkerApplication.name, 'delete', 'Deleting worker');
    const worker = await this.repository.getById(ctx, id);
    if (!worker) {
      throw new NotFoundException(ctx, 'Worker not found');
    }
    const deleted = await this.repository.delete(ctx, id);
    if (!deleted) {
      throw new InternalErrorException(ctx, 'Worker not deleted');
    }
    return deleted;
  }
}
